const express = require('express');
const { generateEmail } = require('../services/aiService');
const { generateInsights } = require('../services/compensationService');
const { rateLimiters } = require('../middleware/rateLimiter');
const { validateEmailGeneration, validateAIInsights, validateAIAnalysis } = require('../middleware/validation');
const { logger } = require('../utils/logger');

const router = express.Router();

/**
 * POST /api/ai/email
 * Generate AI-powered email based on compensation data
 */
router.post('/email', rateLimiters.ai, validateEmailGeneration, async (req, res) => {
  try {
    const { breakdown, templateType = 'negotiation', customPrompt } = req.body;
    
    if (!breakdown) {
      return res.status(400).json({
        success: false,
        error: 'Compensation breakdown is required'
      });
    }

    logger.info('AI email generation request received', {
      templateType,
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });

    const emailContent = await generateEmail(breakdown, templateType, customPrompt);
    
    logger.info('AI email generation completed successfully', {
      templateType,
      userId: req.user?.id,
      contentLength: emailContent.length
    });

    res.status(200).json({
      success: true,
      data: {
        content: emailContent,
        templateType,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('AI email generation failed', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to generate email',
      message: error.message
    });
  }
});

/**
 * POST /api/ai/insights
 * Generate AI-powered insights based on compensation data
 */
router.post('/insights', rateLimiters.ai, validateAIInsights, async (req, res) => {
  try {
    const { breakdown } = req.body;
    
    if (!breakdown) {
      return res.status(400).json({
        success: false,
        error: 'Compensation breakdown is required'
      });
    }

    logger.info('AI insights generation request received', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });

    const insights = generateInsights(breakdown);
    
    logger.info('AI insights generation completed successfully', {
      userId: req.user?.id,
      insightsCount: insights.length
    });

    res.status(200).json({
      success: true,
      data: {
        insights,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('AI insights generation failed', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to generate insights',
      message: error.message
    });
  }
});

/**
 * POST /api/ai/analyze
 * Comprehensive AI analysis of compensation package
 */
router.post('/analyze', rateLimiters.ai, validateAIAnalysis, async (req, res) => {
  try {
    const { breakdown, analysisType = 'comprehensive' } = req.body;
    
    if (!breakdown) {
      return res.status(400).json({
        success: false,
        error: 'Compensation breakdown is required'
      });
    }

    logger.info('AI analysis request received', {
      analysisType,
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });

    // Generate insights
    const insights = generateInsights(breakdown);
    
    // Generate market comparison
    const marketComparison = {
      percentile: Math.min(85, Math.max(15, Math.random() * 70 + 15)), // Mock data
      industryAverage: breakdown.trueCostToCompany * (0.8 + Math.random() * 0.4), // Mock data
      recommendation: insights.length > 0 ? insights[0].description : 'Your compensation package is well-structured.'
    };
    
    // Generate negotiation points
    const negotiationPoints = [
      'Base salary adjustment based on market rates',
      'Performance bonus structure optimization',
      'Additional benefits and perks',
      'Professional development opportunities',
      'Work-life balance improvements'
    ];
    
    // Generate career advice
    const careerAdvice = [
      'Focus on developing skills that increase your market value',
      'Build a strong professional network in your industry',
      'Consider pursuing additional certifications or education',
      'Document your achievements and contributions regularly',
      'Stay updated with industry trends and salary benchmarks'
    ];

    const analysis = {
      insights,
      marketComparison,
      negotiationPoints,
      careerAdvice,
      summary: {
        totalInsights: insights.length,
        highPriorityItems: insights.filter(i => i.priority === 'high').length,
        overallScore: Math.min(100, Math.max(60, 70 + Math.random() * 30)) // Mock score
      }
    };
    
    logger.info('AI analysis completed successfully', {
      analysisType,
      userId: req.user?.id,
      insightsCount: insights.length
    });

    res.status(200).json({
      success: true,
      data: {
        analysis,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('AI analysis failed', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to perform analysis',
      message: error.message
    });
  }
});

module.exports = router;
