const express = require('express');
const { calculateCompensation } = require('../services/compensationService');
const { validateCompensationInput } = require('../middleware/validation');
const { rateLimiters } = require('../middleware/rateLimiter');
const { logger } = require('../utils/logger');

const router = express.Router();

/**
 * POST /api/calculate
 * Calculate compensation breakdown based on input data
 */
router.post('/', rateLimiters.calculation, validateCompensationInput, async (req, res) => {
  try {
    const inputData = req.body;
    
    logger.info('Compensation calculation request received', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });

    const breakdown = await calculateCompensation(inputData);
    
    logger.info('Compensation calculation completed successfully', {
      userId: req.user?.id,
      grossPay: breakdown.grossPay,
      trueCostToCompany: breakdown.trueCostToCompany
    });

    res.status(200).json({
      success: true,
      data: {
        breakdown,
        calculatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Compensation calculation failed', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to calculate compensation',
      message: error.message
    });
  }
});

/**
 * GET /api/calculate/templates
 * Get compensation calculation templates
 */
router.get('/templates', rateLimiters.general, async (req, res) => {
  try {
    const templates = [
      {
        id: 'software-engineer',
        name: 'Software Engineer',
        description: 'Template for software engineering positions',
        defaultValues: {
          baseSalary: 120000,
          performanceBonus: 15000,
          healthInsurance: 12000,
          retirement401k: 6000,
          retirementMatch: 3000,
          socialSecurity: 7440,
          medicare: 1740,
          commutingCost: 2400,
          parkingCost: 1200,
          fuelCost: 1800
        }
      },
      {
        id: 'marketing-manager',
        name: 'Marketing Manager',
        description: 'Template for marketing management positions',
        defaultValues: {
          baseSalary: 95000,
          performanceBonus: 10000,
          healthInsurance: 12000,
          retirement401k: 4750,
          retirementMatch: 2375,
          socialSecurity: 5890,
          medicare: 1378,
          commutingCost: 2400,
          parkingCost: 1200,
          fuelCost: 1800
        }
      },
      {
        id: 'sales-representative',
        name: 'Sales Representative',
        description: 'Template for sales positions',
        defaultValues: {
          baseSalary: 70000,
          performanceBonus: 25000,
          healthInsurance: 12000,
          retirement401k: 3500,
          retirementMatch: 1750,
          socialSecurity: 4340,
          medicare: 1015,
          commutingCost: 2400,
          parkingCost: 1200,
          fuelCost: 1800
        }
      }
    ];

    res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    logger.error('Failed to fetch compensation templates', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates',
      message: error.message
    });
  }
});

module.exports = router;
