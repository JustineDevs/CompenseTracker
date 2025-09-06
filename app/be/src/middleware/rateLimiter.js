const { logger } = require('../utils/logger');

// In-memory store for rate limiting (in production, use Redis)
const rateLimitStore = new Map();

/**
 * Rate limiting middleware
 * @param {Object} options - Rate limiting options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.max - Maximum number of requests per window
 * @param {string} options.message - Error message when limit exceeded
 * @param {Function} options.keyGenerator - Function to generate rate limit key
 * @param {boolean} options.skipSuccessfulRequests - Skip counting successful requests
 * @param {boolean} options.skipFailedRequests - Skip counting failed requests
 */
function createRateLimiter(options = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // 100 requests per window
    message = 'Too many requests, please try again later',
    keyGenerator = (req) => req.ip || 'anonymous',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
  } = options;

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get or create rate limit data for this key
    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, {
        requests: [],
        resetTime: now + windowMs,
      });
    }

    const rateLimitData = rateLimitStore.get(key);
    
    // Clean up old requests outside the window
    rateLimitData.requests = rateLimitData.requests.filter(
      timestamp => timestamp > windowStart
    );

    // Check if limit exceeded
    if (rateLimitData.requests.length >= max) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        key,
        requests: rateLimitData.requests.length,
        max,
        windowMs,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message,
        retryAfter: Math.ceil((rateLimitData.resetTime - now) / 1000),
        limit: max,
        remaining: 0,
        resetTime: rateLimitData.resetTime,
      });
    }

    // Add current request timestamp
    rateLimitData.requests.push(now);

    // Set rate limit headers
    res.set({
      'X-RateLimit-Limit': max,
      'X-RateLimit-Remaining': Math.max(0, max - rateLimitData.requests.length),
      'X-RateLimit-Reset': rateLimitData.resetTime,
    });

    // Store the original res.json to intercept responses
    const originalJson = res.json;
    res.json = function(data) {
      // Only count requests based on skip options
      const shouldCount = 
        (!skipSuccessfulRequests && !skipFailedRequests) ||
        (skipSuccessfulRequests && data.success === false) ||
        (skipFailedRequests && data.success === true);

      if (!shouldCount) {
        // Remove the last request if we shouldn't count it
        rateLimitData.requests.pop();
      }

      return originalJson.call(this, data);
    };

    next();
  };
}

// Predefined rate limiters for different endpoints
const rateLimiters = {
  // General API rate limiter
  general: createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: 'Too many requests, please try again later',
  }),

  // Strict rate limiter for AI endpoints
  ai: createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // 20 AI requests per hour
    message: 'AI request limit exceeded, please try again later',
  }),

  // Authentication rate limiter
  auth: createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 auth attempts per 15 minutes
    message: 'Too many authentication attempts, please try again later',
  }),

  // Compensation calculation rate limiter
  calculation: createRateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 calculations per 5 minutes
    message: 'Too many calculation requests, please try again later',
  }),

  // Profile management rate limiter
  profiles: createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // 30 profile operations per 15 minutes
    message: 'Too many profile operations, please try again later',
  }),
};

// Cleanup function to remove expired entries
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (data.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

module.exports = {
  createRateLimiter,
  rateLimiters,
  cleanupRateLimitStore,
};
