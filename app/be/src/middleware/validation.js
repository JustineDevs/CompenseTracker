const Joi = require('joi');
const { logger } = require('../utils/logger');
const DOMPurify = require('isomorphic-dompurify');

/**
 * Sanitize string input to prevent XSS attacks
 */
function sanitizeString(input) {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim();
}

/**
 * Sanitize object recursively
 */
function sanitizeObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return typeof obj === 'string' ? sanitizeString(obj) : obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = sanitizeObject(value);
  }
  return sanitized;
}

/**
 * Validate and sanitize request body
 */
function validateAndSanitize(schema, req, res, next) {
  // First sanitize the input
  req.body = sanitizeObject(req.body);
  
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
    convert: true
  });

  if (error) {
    logger.warn('Input validation failed', {
      errors: error.details.map(detail => detail.message),
      userId: req.user?.id,
      path: req.path,
      method: req.method
    });

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  req.body = value;
  next();
}

/**
 * Validation schema for compensation input
 */
const compensationInputSchema = Joi.object({
  // Base compensation
  baseSalary: Joi.number().min(0).required(),
  performanceBonus: Joi.number().min(0).default(0),
  guaranteedIncrease: Joi.number().min(0).default(0),
  
  // Benefits
  healthInsurance: Joi.number().min(0).default(0),
  dentalInsurance: Joi.number().min(0).default(0),
  visionInsurance: Joi.number().min(0).default(0),
  lifeInsurance: Joi.number().min(0).default(0),
  disabilityInsurance: Joi.number().min(0).default(0),
  retirement401k: Joi.number().min(0).default(0),
  retirementMatch: Joi.number().min(0).default(0),
  
  // Government benefits
  socialSecurity: Joi.number().min(0).default(0),
  medicare: Joi.number().min(0).default(0),
  unemploymentInsurance: Joi.number().min(0).default(0),
  workersCompensation: Joi.number().min(0).default(0),
  
  // Real-life costs
  commutingCost: Joi.number().min(0).default(0),
  parkingCost: Joi.number().min(0).default(0),
  fuelCost: Joi.number().min(0).default(0),
  foodCost: Joi.number().min(0).default(0),
  utilitiesCost: Joi.number().min(0).default(0),
  extraHoursCost: Joi.number().min(0).default(0),
  
  // Additional factors
  riskFactor: Joi.number().min(0).default(0),
  upkeepCost: Joi.number().min(0).default(0),
  otherBenefits: Joi.number().min(0).default(0),
  
  // Personalization data (optional)
  personalDetails: Joi.object({
    recipientName: Joi.string().max(100).allow('').optional(),
    userName: Joi.string().max(100).allow('').optional(),
    userRole: Joi.string().max(100).allow('').optional(),
    companyName: Joi.string().max(100).allow('').optional(),
    personalNotes: Joi.string().max(1000).allow('').optional(),
    priorities: Joi.array().items(Joi.string().max(200)).max(10).optional()
  }).optional()
});

/**
 * Validation schema for profile creation
 */
const profileCreateSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  input: compensationInputSchema.required(),
  breakdown: Joi.object().required(),
  aiInsights: Joi.object().optional()
});

/**
 * Validation schema for profile update
 */
const profileUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  input: compensationInputSchema.optional(),
  breakdown: Joi.object().optional(),
  aiInsights: Joi.object().optional()
});

/**
 * Validation schema for email generation
 */
const emailGenerationSchema = Joi.object({
  breakdown: Joi.object().required(),
  templateType: Joi.string().valid('negotiation', 'review', 'offer', 'custom').default('negotiation'),
  customPrompt: Joi.string().max(500).optional()
});

/**
 * Validation schema for AI insights
 */
const aiInsightsSchema = Joi.object({
  breakdown: Joi.object().required()
});

/**
 * Validation schema for AI analysis
 */
const aiAnalysisSchema = Joi.object({
  breakdown: Joi.object().required(),
  analysisType: Joi.string().valid('comprehensive', 'basic', 'detailed').default('comprehensive')
});

/**
 * Middleware to validate compensation input
 */
function validateCompensationInput(req, res, next) {
  validateAndSanitize(compensationInputSchema, req, res, next);
}

/**
 * Middleware to validate profile creation
 */
function validateProfileCreate(req, res, next) {
  validateAndSanitize(profileCreateSchema, req, res, next);
}

/**
 * Middleware to validate profile update
 */
function validateProfileUpdate(req, res, next) {
  validateAndSanitize(profileUpdateSchema, req, res, next);
}

/**
 * Middleware to validate email generation
 */
function validateEmailGeneration(req, res, next) {
  validateAndSanitize(emailGenerationSchema, req, res, next);
}

/**
 * Middleware to validate AI insights
 */
function validateAIInsights(req, res, next) {
  validateAndSanitize(aiInsightsSchema, req, res, next);
}

/**
 * Middleware to validate AI analysis
 */
function validateAIAnalysis(req, res, next) {
  validateAndSanitize(aiAnalysisSchema, req, res, next);
}

module.exports = {
  validateCompensationInput,
  validateProfileCreate,
  validateProfileUpdate,
  validateEmailGeneration,
  validateAIInsights,
  validateAIAnalysis
};
