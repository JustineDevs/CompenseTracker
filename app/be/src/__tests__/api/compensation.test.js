const request = require('supertest');
const express = require('express');
const compensationRoutes = require('../../routes/compensation');
const { rateLimiters } = require('../../middleware/rateLimiter');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/calculate', compensationRoutes);

describe('Compensation API Tests', () => {
  beforeEach(() => {
    // Clear rate limit store before each test
    const { cleanupRateLimitStore } = require('../../middleware/rateLimiter');
    cleanupRateLimitStore();
  });

  describe('POST /api/calculate', () => {
    test('should calculate compensation successfully with valid input', async () => {
      const validInput = {
        baseSalary: 100000,
        performanceBonus: 10000,
        healthInsurance: 12000,
        dentalInsurance: 2000,
        socialSecurity: 6200,
        medicare: 1450,
        commutingCost: 200,
        parkingCost: 100,
        fuelCost: 150
      };

      const response = await request(app)
        .post('/api/calculate')
        .send(validInput)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.breakdown).toBeDefined();
      expect(response.body.data.breakdown.grossPay).toBe(110000);
      expect(response.body.data.breakdown.trueCostToCompany).toBeGreaterThan(110000);
    });

    test('should reject invalid input with validation errors', async () => {
      const invalidInput = {
        baseSalary: -1000, // Negative salary
        performanceBonus: 'invalid', // String instead of number
        healthInsurance: 12000
      };

      const response = await request(app)
        .post('/api/calculate')
        .send(invalidInput)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toBeDefined();
      expect(response.body.details.length).toBeGreaterThan(0);
    });

    test('should sanitize input to prevent XSS', async () => {
      const maliciousInput = {
        baseSalary: 100000,
        performanceBonus: 10000,
        healthInsurance: 12000,
        personalDetails: {
          recipientName: '<script>alert("xss")</script>John',
          userName: 'Jane<script>alert("xss")</script>',
          personalNotes: '<img src="x" onerror="alert(\'xss\')">'
        }
      };

      const response = await request(app)
        .post('/api/calculate')
        .send(maliciousInput)
        .expect(200);

      expect(response.body.success).toBe(true);
      
      // Check that malicious content is sanitized
      const personalDetails = response.body.data.breakdown.personalDetails;
      if (personalDetails) {
        expect(personalDetails.recipientName).not.toContain('<script>');
        expect(personalDetails.userName).not.toContain('<script>');
        expect(personalDetails.personalNotes).not.toContain('<img');
      }
    });

    test('should enforce rate limiting', async () => {
      const validInput = {
        baseSalary: 100000,
        performanceBonus: 10000,
        healthInsurance: 12000
      };

      // Make multiple requests to trigger rate limiting
      const promises = Array(15).fill().map(() => 
        request(app)
          .post('/api/calculate')
          .send(validInput)
      );

      const responses = await Promise.all(promises);
      
      // Some requests should be rate limited
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
      
      // Check rate limit headers
      const rateLimitedResponse = rateLimitedResponses[0];
      expect(rateLimitedResponse.headers['x-ratelimit-limit']).toBeDefined();
      expect(rateLimitedResponse.headers['x-ratelimit-remaining']).toBeDefined();
      expect(rateLimitedResponse.headers['x-ratelimit-reset']).toBeDefined();
    });

    test('should handle missing required fields', async () => {
      const incompleteInput = {
        performanceBonus: 10000,
        healthInsurance: 12000
        // Missing baseSalary
      };

      const response = await request(app)
        .post('/api/calculate')
        .send(incompleteInput)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.details).toContainEqual(
        expect.objectContaining({
          field: 'baseSalary',
          message: expect.stringContaining('required')
        })
      );
    });

    test('should handle extremely large numbers', async () => {
      const largeInput = {
        baseSalary: 999999999,
        performanceBonus: 999999999,
        healthInsurance: 999999999
      };

      const response = await request(app)
        .post('/api/calculate')
        .send(largeInput)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.breakdown.grossPay).toBe(1999999998);
    });
  });

  describe('GET /api/calculate/templates', () => {
    test('should return compensation templates', async () => {
      const response = await request(app)
        .get('/api/calculate/templates')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      // Check template structure
      const template = response.body.data[0];
      expect(template).toHaveProperty('id');
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('description');
      expect(template).toHaveProperty('defaultValues');
    });

    test('should enforce rate limiting on templates endpoint', async () => {
      // Make multiple requests
      const promises = Array(150).fill().map(() => 
        request(app).get('/api/calculate/templates')
      );

      const responses = await Promise.all(promises);
      
      // Some requests should be rate limited
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});
