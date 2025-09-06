const crypto = require('crypto');
const { logger } = require('../utils/logger');

/**
 * CSRF Protection Middleware
 * Generates and validates CSRF tokens for state-changing operations
 */

// Store active tokens in memory (in production, use Redis)
const activeTokens = new Map();

// Token expiration time (1 hour)
const TOKEN_EXPIRY = 60 * 60 * 1000;

/**
 * Generate a new CSRF token
 */
function generateToken() {
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now();
  
  activeTokens.set(token, {
    timestamp,
    used: false
  });
  
  // Clean up expired tokens
  cleanupExpiredTokens();
  
  return token;
}

/**
 * Validate a CSRF token
 */
function validateToken(token) {
  if (!token) return false;
  
  const tokenData = activeTokens.get(token);
  if (!tokenData) return false;
  
  // Check if token is expired
  if (Date.now() - tokenData.timestamp > TOKEN_EXPIRY) {
    activeTokens.delete(token);
    return false;
  }
  
  // Mark token as used
  tokenData.used = true;
  
  return true;
}

/**
 * Clean up expired tokens
 */
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, data] of activeTokens.entries()) {
    if (now - data.timestamp > TOKEN_EXPIRY) {
      activeTokens.delete(token);
    }
  }
}

/**
 * CSRF middleware for generating tokens
 */
function generateCSRFToken(req, res, next) {
  try {
    const token = generateToken();
    res.locals.csrfToken = token;
    next();
  } catch (error) {
    logger.error('CSRF token generation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate CSRF token'
    });
  }
}

/**
 * CSRF middleware for validating tokens
 */
function validateCSRFToken(req, res, next) {
  // Skip CSRF validation for GET requests
  if (req.method === 'GET') {
    return next();
  }
  
  // Skip CSRF validation for health checks and public endpoints
  if (req.path === '/health' || req.path.startsWith('/api/public/')) {
    return next();
  }
  
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  
  if (!validateToken(token)) {
    logger.warn('CSRF token validation failed', {
      path: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    return res.status(403).json({
      success: false,
      error: 'Invalid or missing CSRF token'
    });
  }
  
  next();
}

/**
 * Middleware to add CSRF token to response headers
 */
function addCSRFTokenToResponse(req, res, next) {
  if (res.locals.csrfToken) {
    res.set('X-CSRF-Token', res.locals.csrfToken);
  }
  next();
}

module.exports = {
  generateCSRFToken,
  validateCSRFToken,
  addCSRFTokenToResponse,
  generateToken,
  validateToken
};
