const { logger } = require('../utils/logger');

/**
 * Generate AI-powered email based on compensation data
 * @param {Object} breakdown - Compensation breakdown data
 * @param {string} templateType - Type of email template
 * @param {string} customPrompt - Custom prompt for email generation
 * @returns {string} Generated email content
 */
async function generateEmail(breakdown, templateType = 'negotiation', customPrompt = null) {
  try {
    logger.info('Generating AI email', { templateType, customPrompt: !!customPrompt });

    // For now, return mock email content
    // In production, this would integrate with OpenAI, Google Gemini, etc.
    const emailTemplates = {
      negotiation: generateNegotiationEmail(breakdown),
      review: generateReviewEmail(breakdown),
      offer: generateOfferEmail(breakdown),
      custom: generateCustomEmail(breakdown, customPrompt)
    };

    const emailContent = emailTemplates[templateType] || emailTemplates.negotiation;
    
    logger.info('AI email generated successfully', { 
      templateType, 
      contentLength: emailContent.length 
    });

    return emailContent;
  } catch (error) {
    logger.error('Error generating AI email', {
      error: error.message,
      stack: error.stack,
      templateType
    });
    throw error;
  }
}

/**
 * Generate salary negotiation email
 */
function generateNegotiationEmail(breakdown) {
  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `Subject: Compensation Discussion - Request for Review

Dear [Manager's Name],

I hope this email finds you well. I wanted to schedule a time to discuss my compensation package and share some insights I've gathered about my current role and market value.

Based on my analysis of my total compensation package, I've identified several areas where I believe we can work together to ensure my package remains competitive and reflects my contributions to the team.

**Current Compensation Overview:**
• Base Salary: ${formatCurrency(breakdown.baseCompensation.baseSalary)}
• Total Benefits Value: ${formatCurrency(breakdown.benefits.subtotal)}
• True Cost to Company: ${formatCurrency(breakdown.trueCostToCompany)}

**Key Points for Discussion:**
1. Market competitiveness of my current package
2. Performance-based compensation opportunities
3. Benefits optimization and additional perks
4. Career development and growth trajectory

I've prepared a detailed analysis that I'd be happy to share during our meeting. I believe this data-driven approach will help us have a productive conversation about my compensation.

Would you be available for a 30-minute meeting next week to discuss this? I'm flexible with timing and can work around your schedule.

Thank you for your time and consideration. I look forward to our discussion.

Best regards,
[Your Name]`;
}

/**
 * Generate performance review email
 */
function generateReviewEmail(breakdown) {
  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `Subject: Annual Performance Review - Compensation Discussion

Dear [Manager's Name],

I hope you're doing well. As we approach my annual performance review, I wanted to share some comprehensive analysis of my compensation package and discuss potential adjustments for the coming year.

**Performance Highlights:**
• [Insert your key achievements]
• [Insert metrics and results]
• [Insert any additional contributions]

**Compensation Analysis:**
I've conducted a thorough analysis of my current compensation package, which includes:

• Base Salary: ${formatCurrency(breakdown.baseCompensation.baseSalary)}
• Performance Bonus: ${formatCurrency(breakdown.baseCompensation.performanceBonus)}
• Total Benefits: ${formatCurrency(breakdown.benefits.subtotal)}
• True Cost to Company: ${formatCurrency(breakdown.trueCostToCompany)}

**Areas for Discussion:**
1. Salary adjustment based on performance and market rates
2. Bonus structure optimization
3. Additional benefits or perks
4. Professional development opportunities

I believe my contributions over the past year warrant consideration for a compensation adjustment. I've prepared supporting documentation and market research to share during our review meeting.

I'm looking forward to our discussion and would appreciate the opportunity to present my case in detail.

Best regards,
[Your Name]`;
}

/**
 * Generate job offer response email
 */
function generateOfferEmail(breakdown) {
  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `Subject: Thank You for the Offer - Compensation Discussion

Dear [Hiring Manager's Name],

Thank you for extending the offer for the [Position Title] role. I'm excited about the opportunity to join [Company Name] and contribute to the team's success.

After careful consideration of the offer, I'd like to discuss the compensation package to ensure it aligns with my expectations and market value for this position.

**Current Offer Analysis:**
• Base Salary: ${formatCurrency(breakdown.baseCompensation.baseSalary)}
• Benefits Package: ${formatCurrency(breakdown.benefits.subtotal)}
• Total Compensation: ${formatCurrency(breakdown.trueCostToCompany)}

**Areas for Discussion:**
1. Base salary adjustment to reflect market rates
2. Performance bonus structure and criteria
3. Benefits package details and additional perks
4. Professional development and growth opportunities
5. Work-life balance considerations

I've prepared a comprehensive analysis of comparable positions in the market, and I believe there's room for discussion on several aspects of the compensation package.

I'm confident that we can reach a mutually beneficial agreement that reflects the value I'll bring to the role while meeting the company's compensation structure.

Would you be available for a brief call this week to discuss these points? I'm excited about the opportunity and eager to move forward once we align on the compensation details.

Thank you for your time and consideration.

Best regards,
[Your Name]`;
}

/**
 * Generate custom email based on prompt
 */
function generateCustomEmail(breakdown, customPrompt) {
  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  if (!customPrompt) {
    return generateNegotiationEmail(breakdown);
  }

  return `Subject: ${customPrompt}

Dear [Recipient's Name],

I hope this email finds you well. ${customPrompt}

**Compensation Overview:**
• Base Salary: ${formatCurrency(breakdown.baseCompensation.baseSalary)}
• Performance Bonus: ${formatCurrency(breakdown.baseCompensation.performanceBonus)}
• Benefits Value: ${formatCurrency(breakdown.benefits.subtotal)}
• Government Benefits: ${formatCurrency(breakdown.governmentBenefits.subtotal)}
• Real-life Costs: ${formatCurrency(breakdown.realLifeCosts.subtotal)}
• True Cost to Company: ${formatCurrency(breakdown.trueCostToCompany)}

**Key Insights:**
• My total compensation represents a significant investment by the company
• The benefits package is comprehensive and competitive
• There are opportunities to optimize certain components
• Market positioning is strong relative to industry standards

**Discussion Points:**
1. Compensation structure and market competitiveness
2. Performance-based incentives and growth opportunities
3. Benefits optimization and additional perks
4. Career development and advancement potential

I believe this data-driven approach will help us have a productive conversation about my compensation and future with the company.

I'm available to discuss this further at your convenience.

Best regards,
[Your Name]`;
}

/**
 * Generate AI insights for compensation data
 * @param {Object} breakdown - Compensation breakdown data
 * @returns {Array} Array of AI-generated insights
 */
function generateAIInsights(breakdown) {
  const insights = [];
  
  // 401k optimization insight
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
  
  // Benefits analysis insight
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
  
  // Commuting costs insight
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
  
  // Market positioning insight
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
  generateEmail,
  generateAIInsights
};
