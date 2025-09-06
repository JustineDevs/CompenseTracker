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
 * GET /api/profiles
 * Get user's compensation profiles
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    logger.info('Fetching user profiles', { userId });

    const { data, error } = await supabase
      .from('compensation_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Failed to fetch profiles', { error: error.message, userId });
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch profiles'
      });
    }

    logger.info('Profiles fetched successfully', { userId, count: data.length });

    res.status(200).json({
      success: true,
      data: data || []
    });
  } catch (error) {
    logger.error('Error fetching profiles', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to fetch profiles',
      message: error.message
    });
  }
});

/**
 * POST /api/profiles
 * Create a new compensation profile
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, input, breakdown, aiInsights } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    if (!name || !input || !breakdown) {
      return res.status(400).json({
        success: false,
        error: 'Name, input, and breakdown are required'
      });
    }

    logger.info('Creating new profile', { userId, name });

    const profileData = {
      user_id: userId,
      name,
      input_data: input,
      breakdown_data: breakdown,
      ai_insights: aiInsights || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('compensation_profiles')
      .insert([profileData])
      .select()
      .single();

    if (error) {
      logger.error('Failed to create profile', { error: error.message, userId });
      return res.status(500).json({
        success: false,
        error: 'Failed to create profile'
      });
    }

    logger.info('Profile created successfully', { userId, profileId: data.id });

    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    logger.error('Error creating profile', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to create profile',
      message: error.message
    });
  }
});

/**
 * GET /api/profiles/:id
 * Get a specific compensation profile
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user?.id;
    const profileId = req.params.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    logger.info('Fetching profile', { userId, profileId });

    const { data, error } = await supabase
      .from('compensation_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('user_id', userId)
      .single();

    if (error) {
      logger.error('Failed to fetch profile', { error: error.message, userId, profileId });
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    logger.info('Profile fetched successfully', { userId, profileId });

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    logger.error('Error fetching profile', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      profileId: req.params.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      message: error.message
    });
  }
});

/**
 * PUT /api/profiles/:id
 * Update a compensation profile
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user?.id;
    const profileId = req.params.id;
    const { name, input, breakdown, aiInsights } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    logger.info('Updating profile', { userId, profileId });

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (name) updateData.name = name;
    if (input) updateData.input_data = input;
    if (breakdown) updateData.breakdown_data = breakdown;
    if (aiInsights) updateData.ai_insights = aiInsights;

    const { data, error } = await supabase
      .from('compensation_profiles')
      .update(updateData)
      .eq('id', profileId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update profile', { error: error.message, userId, profileId });
      return res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }

    logger.info('Profile updated successfully', { userId, profileId });

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    logger.error('Error updating profile', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      profileId: req.params.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

/**
 * DELETE /api/profiles/:id
 * Delete a compensation profile
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user?.id;
    const profileId = req.params.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }

    logger.info('Deleting profile', { userId, profileId });

    const { error } = await supabase
      .from('compensation_profiles')
      .delete()
      .eq('id', profileId)
      .eq('user_id', userId);

    if (error) {
      logger.error('Failed to delete profile', { error: error.message, userId, profileId });
      return res.status(500).json({
        success: false,
        error: 'Failed to delete profile'
      });
    }

    logger.info('Profile deleted successfully', { userId, profileId });

    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting profile', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      profileId: req.params.id
    });

    res.status(500).json({
      success: false,
      error: 'Failed to delete profile',
      message: error.message
    });
  }
});

module.exports = router;
