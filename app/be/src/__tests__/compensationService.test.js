const { calculateCompensation, validateCompensationInput } = require('../services/compensationService');

describe('CompensationService', () => {
  describe('calculateCompensation', () => {
    it('should calculate compensation correctly with valid input', async () => {
      const input = {
        baseSalary: 100000,
        performanceBonus: 10000,
        healthInsurance: 12000,
        retirement401k: 6000,
        retirementMatch: 3000,
        socialSecurity: 6200,
        medicare: 1450,
        commutingCost: 200,
        parkingCost: 100,
        fuelCost: 150
      };

      const result = await calculateCompensation(input);

      expect(result).toHaveProperty('grossPay', 110000);
      expect(result).toHaveProperty('netPay');
      expect(result).toHaveProperty('trueCostToCompany');
      expect(result).toHaveProperty('baseCompensation');
      expect(result).toHaveProperty('benefits');
      expect(result).toHaveProperty('governmentBenefits');
      expect(result).toHaveProperty('realLifeCosts');
      expect(result).toHaveProperty('percentageBreakdown');
    });

    it('should handle missing optional fields', async () => {
      const input = {
        baseSalary: 50000
      };

      const result = await calculateCompensation(input);

      expect(result.grossPay).toBe(50000);
      expect(result.baseCompensation.subtotal).toBe(50000);
      expect(result.benefits.subtotal).toBe(0);
    });

    it('should convert monthly costs to annual', async () => {
      const input = {
        baseSalary: 60000,
        commutingCost: 200,
        parkingCost: 100,
        fuelCost: 150
      };

      const result = await calculateCompensation(input);

      expect(result.realLifeCosts.commutingCost).toBe(2400);
      expect(result.realLifeCosts.parkingCost).toBe(1200);
      expect(result.realLifeCosts.fuelCost).toBe(1800);
      expect(result.realLifeCosts.subtotal).toBe(5400);
    });
  });

  describe('validateCompensationInput', () => {
    it('should validate correct input', () => {
      const input = {
        baseSalary: 75000,
        performanceBonus: 5000,
        healthInsurance: 10000
      };

      const result = validateCompensationInput(input);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject negative values', () => {
      const input = {
        baseSalary: 75000,
        performanceBonus: -1000,
        healthInsurance: 10000
      };

      const result = validateCompensationInput(input);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('performanceBonus cannot be negative');
    });

    it('should reject missing base salary', () => {
      const input = {
        performanceBonus: 5000,
        healthInsurance: 10000
      };

      const result = validateCompensationInput(input);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Base salary is required and must be positive');
    });

    it('should reject unreasonably high salary', () => {
      const input = {
        baseSalary: 50000000,
        performanceBonus: 5000
      };

      const result = validateCompensationInput(input);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Base salary seems unreasonably high');
    });
  });
});
