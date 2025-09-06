const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { logger } = require('../utils/logger');

const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email, password, and name are required'
      });
    }

    logger.info('User registration attempt', { email });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      logger.error('User registration failed', { error: error.message, email });
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    logger.info('User registered successfully', { userId: data.user?.id, email });

    res.status(201).json({
      success: true,
      data: {
        user: data.user,
        message: 'Registration successful. Please check your email for verification.'
      }
    });
  } catch (error) {
    logger.error('User registration error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: error.message
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    logger.info('User login attempt', { email });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      logger.error('User login failed', { error: error.message, email });
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    logger.info('User logged in successfully', { userId: data.user?.id, email });

    res.status(200).json({
      success: true,
      data: {
        user: data.user,
        session: data.session
      }
    });
  } catch (error) {
    logger.error('User login error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: error.message
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    logger.info('User logout attempt');

    const { error } = await supabase.auth.signOut({
      refreshToken: refresh_token
    });

    if (error) {
      logger.error('User logout failed', { error: error.message });
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    logger.info('User logged out successfully');

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    logger.error('User logout error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Logout failed',
      message: error.message
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user
 */
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authorization token required'
      });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      logger.error('Get user failed', { error: error.message });
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    logger.error('Get user error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Failed to get user',
      message: error.message
    });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token
    });

    if (error) {
      logger.error('Token refresh failed', { error: error.message });
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        session: data.session
      }
    });
  } catch (error) {
    logger.error('Token refresh error', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      error: 'Token refresh failed',
      message: error.message
    });
  }
});

module.exports = router;
