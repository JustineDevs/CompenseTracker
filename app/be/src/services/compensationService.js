const { logger } = require('../utils/logger');

/**
 * Calculate comprehensive compensation breakdown
 * @param {Object} input - Compensation input data
 * @returns {Object} Detailed compensation breakdown
 */
async function calculateCompensation(input) {
  try {
    logger.info('Starting compensation calculation', { inputKeys: Object.keys(input) });

    // Calculate base compensation
    const baseCompensation = {
      baseSalary: input.baseSalary || 0,
      performanceBonus: input.performanceBonus || 0,
      guaranteedIncrease: input.guaranteedIncrease || 0,
      subtotal: (input.baseSalary || 0) + (input.performanceBonus || 0) + (input.guaranteedIncrease || 0)
    };

    // Calculate benefits
    const benefits = {
      healthInsurance: input.healthInsurance || 0,
      dentalInsurance: input.dentalInsurance || 0,
      visionInsurance: input.visionInsurance || 0,
      lifeInsurance: input.lifeInsurance || 0,
      disabilityInsurance: input.disabilityInsurance || 0,
      retirement401k: input.retirement401k || 0,
      retirementMatch: input.retirementMatch || 0,
      otherBenefits: input.otherBenefits || 0,
      subtotal: (input.healthInsurance || 0) + 
                (input.dentalInsurance || 0) + 
                (input.visionInsurance || 0) + 
                (input.lifeInsurance || 0) + 
                (input.disabilityInsurance || 0) + 
                (input.retirement401k || 0) + 
                (input.retirementMatch || 0) + 
                (input.otherBenefits || 0)
    };

    // Calculate government benefits
    const governmentBenefits = {
      socialSecurity: input.socialSecurity || 0,
      medicare: input.medicare || 0,
      unemploymentInsurance: input.unemploymentInsurance || 0,
      workersCompensation: input.workersCompensation || 0,
      subtotal: (input.socialSecurity || 0) + 
                (input.medicare || 0) + 
                (input.unemploymentInsurance || 0) + 
                (input.workersCompensation || 0)
    };

    // Calculate real-life costs (convert monthly to annual)
    const realLifeCosts = {
      commutingCost: (input.commutingCost || 0) * 12,
      parkingCost: (input.parkingCost || 0) * 12,
      fuelCost: (input.fuelCost || 0) * 12,
      foodCost: (input.foodCost || 0) * 12,
      utilitiesCost: (input.utilitiesCost || 0) * 12,
      extraHoursCost: (input.extraHoursCost || 0) * 12,
      subtotal: ((input.commutingCost || 0) + 
                (input.parkingCost || 0) + 
                (input.fuelCost || 0) + 
                (input.foodCost || 0) + 
                (input.utilitiesCost || 0) + 
                (input.extraHoursCost || 0)) * 12
    };

    // Calculate additional factors
    const additionalFactors = {
      riskFactor: input.riskFactor || 0,
      upkeepCost: input.upkeepCost || 0,
      subtotal: (input.riskFactor || 0) + (input.upkeepCost || 0)
    };

    // Calculate totals
    const grossPay = baseCompensation.subtotal;
    const totalDeductions = realLifeCosts.subtotal + additionalFactors.subtotal;
    const netPay = grossPay - totalDeductions;
    const trueCostToCompany = baseCompensation.subtotal + 
                             benefits.subtotal + 
                             governmentBenefits.subtotal + 
                             realLifeCosts.subtotal + 
                             additionalFactors.subtotal;

    // Calculate percentage breakdown
    const totalValue = trueCostToCompany;
    const percentageBreakdown = {
      baseCompensation: totalValue > 0 ? (baseCompensation.subtotal / totalValue) * 100 : 0,
      benefits: totalValue > 0 ? (benefits.subtotal / totalValue) * 100 : 0,
      governmentBenefits: totalValue > 0 ? (governmentBenefits.subtotal / totalValue) * 100 : 0,
      realLifeCosts: totalValue > 0 ? (realLifeCosts.subtotal / totalValue) * 100 : 0,
      additionalFactors: totalValue > 0 ? (additionalFactors.subtotal / totalValue) * 100 : 0
    };

    const breakdown = {
      grossPay,
      netPay,
      trueCostToCompany,
      baseCompensation,
      benefits,
      governmentBenefits,
      realLifeCosts,
      additionalFactors,
      totalDeductions,
      netVsGrossDifference: grossPay - netPay,
      percentageBreakdown
    };

    logger.info('Compensation calculation completed', {
      grossPay,
      netPay,
      trueCostToCompany,
      totalDeductions
    });

    return breakdown;
  } catch (error) {
    logger.error('Error in compensation calculation', {
      error: error.message,
      stack: error.stack,
      input: input
    });
    throw error;
  }
}

/**
 * Validate compensation input data
 * @param {Object} input - Input data to validate
 * @returns {Object} Validation result
 */
function validateCompensationInput(input) {
  const errors = [];
  
  // Check required fields
  if (!input.baseSalary || input.baseSalary < 0) {
    errors.push('Base salary is required and must be positive');
  }
  
  // Check for reasonable values
  if (input.baseSalary && input.baseSalary > 10000000) {
    errors.push('Base salary seems unreasonably high');
  }
  
  // Check for negative values
  const numericFields = [
    'performanceBonus', 'guaranteedIncrease', 'healthInsurance',
    'dentalInsurance', 'visionInsurance', 'lifeInsurance',
    'disabilityInsurance', 'retirement401k', 'retirementMatch',
    'socialSecurity', 'medicare', 'unemploymentInsurance',
    'workersCompensation', 'commutingCost', 'parkingCost',
    'fuelCost', 'foodCost', 'utilitiesCost', 'extraHoursCost',
    'riskFactor', 'upkeepCost', 'otherBenefits'
  ];
  
  numericFields.forEach(field => {
    if (input[field] && input[field] < 0) {
      errors.push(`${field} cannot be negative`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generate compensation insights
 * @param {Object} breakdown - Compensation breakdown data
 * @returns {Object} AI-generated insights
 */
function generateInsights(breakdown) {
  const insights = [];
  
  // 401k optimization
  const retirementPercentage = (breakdown.benefits.retirement401k / breakdown.grossPay) * 100;
  if (retirementPercentage < 10) {
    insights.push({
      type: 'tip',
      title: 'Optimize Your 401k Contribution',
      description: `Your 401k contribution is ${retirementPercentage.toFixed(1)}% of your salary. Consider increasing it to at least 10-15% to maximize tax benefits and employer matching.`,
      priority: 'high',
      category: 'retirement'
    });
  }
  
  // Benefits analysis
  const benefitsPercentage = (breakdown.benefits.subtotal / breakdown.trueCostToCompany) * 100;
  if (benefitsPercentage > 25) {
    insights.push({
      type: 'comparison',
      title: 'Comprehensive Benefits Package',
      description: `Your benefits package represents ${benefitsPercentage.toFixed(1)}% of your total compensation, which is above average and shows strong employer investment in your well-being.`,
      priority: 'medium',
      category: 'benefits'
    });
  }
  
  // Commuting costs
  const commutingPercentage = (breakdown.realLifeCosts.commutingCost / breakdown.trueCostToCompany) * 100;
  if (commutingPercentage > 5) {
    insights.push({
      type: 'advice',
      title: 'Consider Remote Work Options',
      description: `Your commuting costs represent ${commutingPercentage.toFixed(1)}% of your total compensation. Consider negotiating for remote work options to reduce transportation expenses.`,
      priority: 'medium',
      category: 'work-life'
    });
  }
  
  // Market positioning
  if (breakdown.trueCostToCompany > 100000) {
    insights.push({
      type: 'comparison',
      title: 'Above Market Average',
      description: 'Your total compensation is above the market average, positioning you well for future negotiations and career advancement.',
      priority: 'low',
      category: 'market'
    });
  }
  
  return insights;
}

module.exports = {
  calculateCompensation,
  validateCompensationInput,
  generateInsights
};
