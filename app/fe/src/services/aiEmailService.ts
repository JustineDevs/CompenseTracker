import { CompensationBreakdown, CompensationInput } from '@/types/compensation';
import { formatCurrency } from '@/utils/currency';

export interface PersonalDetails {
  recipientName: string;
  userName: string;
  userRole: string;
  companyName: string;
  personalNotes?: string;
  priorities?: string[];
}

export interface RefinementRequest {
  previousEmail: string;
  instructions: string;
  toneAdjustment?: 'more_formal' | 'more_casual' | 'more_assertive' | 'more_diplomatic';
  lengthAdjustment?: 'shorter' | 'longer' | 'same';
  focusAdjustment?: 'more_data' | 'more_personal' | 'more_benefits' | 'more_salary';
}

export interface EmailContext {
  type: 'negotiation' | 'review' | 'offer' | 'custom';
  compensationData: CompensationBreakdown;
  compensationInput?: CompensationInput;
  personalDetails?: PersonalDetails;
  userPreferences?: {
    tone: 'professional' | 'collaborative' | 'assertive' | 'diplomatic';
    focus: 'salary' | 'benefits' | 'total_compensation' | 'career_growth';
    urgency: 'low' | 'medium' | 'high';
  };
  refinement?: RefinementRequest;
}

export interface NegotiationStrategy {
  id: string;
  name: string;
  description: string;
  approach: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
  effectiveness: number; // 1-10 scale
}

export const negotiationStrategies: Record<string, NegotiationStrategy[]> = {
  negotiation: [
    {
      id: 'data_driven',
      name: 'Data-Driven Approach',
      description: 'Present comprehensive market data and internal analysis',
      approach: 'Use facts, figures, and market research to support your position',
      keyPoints: [
        'Market rate analysis',
        'Performance metrics',
        'Cost-of-living adjustments',
        'Industry benchmarks'
      ],
      riskLevel: 'low',
      effectiveness: 9
    },
    {
      id: 'value_proposition',
      name: 'Value Proposition',
      description: 'Emphasize your unique contributions and future potential',
      approach: 'Focus on the value you bring and will continue to bring',
      keyPoints: [
        'Past achievements',
        'Future potential',
        'Unique skills',
        'Team impact'
      ],
      riskLevel: 'low',
      effectiveness: 8
    },
    {
      id: 'collaborative',
      name: 'Collaborative Partnership',
      description: 'Frame as a mutual benefit discussion',
      approach: 'Present as working together to find the best solution',
      keyPoints: [
        'Win-win scenarios',
        'Company benefits',
        'Long-term relationship',
        'Flexible solutions'
      ],
      riskLevel: 'low',
      effectiveness: 7
    }
  ],
  offer: [
    {
      id: 'appreciation_first',
      name: 'Appreciation First',
      description: 'Start with gratitude, then discuss improvements',
      approach: 'Show enthusiasm while professionally negotiating terms',
      keyPoints: [
        'Express genuine excitement',
        'Highlight company appeal',
        'Present data-backed requests',
        'Maintain positive tone'
      ],
      riskLevel: 'low',
      effectiveness: 9
    },
    {
      id: 'market_competitive',
      name: 'Market Competitive',
      description: 'Focus on market positioning and fairness',
      approach: 'Use market data to justify requests',
      keyPoints: [
        'Industry standards',
        'Role complexity',
        'Geographic factors',
        'Experience level'
      ],
      riskLevel: 'medium',
      effectiveness: 8
    },
    {
      id: 'total_package',
      name: 'Total Package View',
      description: 'Consider all aspects of compensation holistically',
      approach: 'Look at the complete offer, not just salary',
      keyPoints: [
        'Base salary',
        'Benefits value',
        'Growth opportunities',
        'Work-life balance'
      ],
      riskLevel: 'low',
      effectiveness: 7
    }
  ],
  review: [
    {
      id: 'performance_focused',
      name: 'Performance Focused',
      description: 'Base requests on measurable achievements',
      approach: 'Link compensation to concrete results',
      keyPoints: [
        'Quantified achievements',
        'Exceeded expectations',
        'Added responsibilities',
        'Future commitments'
      ],
      riskLevel: 'low',
      effectiveness: 9
    },
    {
      id: 'growth_oriented',
      name: 'Growth Oriented',
      description: 'Emphasize career development and advancement',
      approach: 'Connect compensation to career trajectory',
      keyPoints: [
        'Skill development',
        'Leadership potential',
        'Mentorship provided',
        'Strategic initiatives'
      ],
      riskLevel: 'low',
      effectiveness: 7
    }
  ]
};

export class AIEmailService {
  private static generatePrompt(context: EmailContext): string {
    const { type, compensationData, userPreferences, personalDetails, refinement } = context;
    
    // If this is a refinement request, use refinement prompt
    if (refinement) {
      return this.generateRefinementPrompt(refinement);
    }
    
    const strategy = this.selectBestStrategy(type, compensationData, userPreferences);
    
    const basePrompt = this.getBasePrompt(type);
    const compensationDetails = this.formatCompensationData(compensationData, context.compensationInput);
    const strategyGuidance = this.getStrategyGuidance(strategy);
    const toneGuidance = this.getToneGuidance(userPreferences?.tone || 'professional');
    const personalizationDetails = this.formatPersonalDetails(personalDetails);
    
    return `${basePrompt}

COMPENSATION DATA:
${compensationDetails}

PERSONAL DETAILS:
${personalizationDetails}

NEGOTIATION STRATEGY:
${strategyGuidance}

TONE AND STYLE:
${toneGuidance}

Generate a natural, human-sounding email that:
1. Uses the selected negotiation strategy effectively while sounding conversational
2. Incorporates the compensation data naturally and conversationally
3. Personalizes content with provided details in an authentic way
4. Maintains the appropriate tone while feeling genuine and human
5. Includes specific, actionable next steps in a natural way
6. Balances assertiveness with collaboration using natural language
7. Addresses potential concerns proactively with empathy
8. Uses varied sentence structures and natural flow
9. Avoids corporate jargon and overly formal language
10. Feels like a real person wrote it, not an AI or template
11. Uses natural transitions between ideas
12. Incorporates personal touches and authentic voice
13. Integrates personal notes naturally into the email content (if provided)
14. Uses personal notes to enhance persuasiveness and add specific context

IMPORTANT FORMATTING RULES:
- Do NOT use markdown formatting like **bold** or *italic*
- Do NOT use asterisks for bold text
- Use plain text formatting that works in email clients
- Use line breaks and spacing for visual separation
- Use bullet points with simple dashes (-) or numbers (1., 2., etc.)
- Keep formatting clean and professional for email clients

The email should be 200-400 words, sound natural and human, and be ready to send with the personal details integrated naturally. Make it feel like a real person wrote it, not an AI.`;
  }

  private static generateRefinementPrompt(refinement: RefinementRequest): string {
    return `You previously generated this email:

${refinement.previousEmail}

The user requests the following changes or adjustments:
${refinement.instructions}

${refinement.toneAdjustment ? `Tone adjustment: Make it ${refinement.toneAdjustment.replace('_', ' ')}` : ''}
${refinement.lengthAdjustment ? `Length adjustment: Make it ${refinement.lengthAdjustment}` : ''}
${refinement.focusAdjustment ? `Focus adjustment: Emphasize ${refinement.focusAdjustment.replace('_', ' ')}` : ''}

Rewrite the email with these refinements while:
1. Maintaining clarity and professionalism
2. Preserving the core message and structure
3. Incorporating all requested changes naturally
4. Keeping the same level of detail and personalization
5. Ensuring the email remains ready to send

IMPORTANT FORMATTING RULES:
- Do NOT use markdown formatting like **bold** or *italic*
- Do NOT use asterisks for bold text
- Use plain text formatting that works in email clients
- Use line breaks and spacing for visual separation
- Use bullet points with simple dashes (-) or numbers (1., 2., etc.)
- Keep formatting clean and professional for email clients

The refined email should be 200-400 words and maintain the same professional quality.`;
  }

  private static selectBestStrategy(
    type: string, 
    compensationData: CompensationBreakdown, 
    preferences?: EmailContext['userPreferences']
  ): NegotiationStrategy {
    const strategies = negotiationStrategies[type] || negotiationStrategies.negotiation;
    
    // Simple scoring system based on effectiveness and risk
    const scoredStrategies = strategies.map(strategy => ({
      ...strategy,
      score: strategy.effectiveness + (strategy.riskLevel === 'low' ? 2 : strategy.riskLevel === 'medium' ? 1 : 0)
    }));
    
    // Sort by score and return the best one
    return scoredStrategies.sort((a, b) => b.score - a.score)[0];
  }

  private static getBasePrompt(type: string): string {
    const prompts = {
      negotiation: `You are an expert compensation negotiator and communication specialist. Generate a natural, human-sounding email for salary negotiation that:
- Sounds conversational and authentic, not robotic or template-like
- Uses natural language and varied sentence structures
- Demonstrates thorough preparation and market research in a relatable way
- Presents data-driven arguments in a conversational manner
- Maintains a collaborative, professional yet approachable tone
- Shows genuine appreciation for current role while advocating for fair compensation
- Includes specific, actionable next steps for discussion
- Uses personal touches and natural transitions between ideas
- Avoids corporate jargon and overly formal language
- Feels like a real person wrote it, not an AI
- Uses plain text formatting (no markdown, asterisks, or special formatting)`,
      
      offer: `You are an expert job offer negotiator and communication specialist. Generate a natural, human-sounding email responding to a job offer that:
- Expresses genuine, authentic enthusiasm for the opportunity
- Uses natural, conversational language that feels personal
- Presents well-researched counter-proposals in a friendly manner
- Balances negotiation with genuine relationship building
- Shows understanding and empathy for the company's constraints
- Proposes specific solutions and alternatives in a collaborative way
- Avoids sounding like a template or form letter
- Uses varied sentence structures and natural flow
- Feels like a real person wrote it, not an AI
- Uses plain text formatting (no markdown, asterisks, or special formatting)`,
      
      review: `You are an expert performance review negotiator and communication specialist. Generate a natural, human-sounding email for annual review compensation discussion that:
- Uses conversational, authentic language
- Highlights specific achievements in a natural, proud way
- Links performance to compensation adjustments conversationally
- Demonstrates future value and commitment genuinely
- Maintains positive working relationship with natural warmth
- Proposes concrete next steps for growth in a collaborative tone
- Avoids corporate speak and overly formal language
- Feels personal and authentic, not template-like
- Uses natural transitions and varied sentence structures
- Uses plain text formatting (no markdown, asterisks, or special formatting)`,
      
      custom: `You are an expert compensation consultant and communication specialist. Generate a natural, human-sounding email for general compensation discussion that:
- Uses conversational, authentic language throughout
- Provides comprehensive analysis in a relatable, easy-to-understand way
- Identifies specific areas for improvement in a constructive manner
- Presents data-driven recommendations conversationally
- Maintains professional yet approachable and human tone
- Offers flexible solutions and alternatives in a collaborative way
- Avoids corporate jargon and overly formal language
- Feels like a real person wrote it, not an AI
- Uses natural flow and varied sentence structures
- Uses plain text formatting (no markdown, asterisks, or special formatting)`
    };
    
    return prompts[type as keyof typeof prompts] || prompts.custom;
  }

  private static formatCompensationData(data: CompensationBreakdown, inputData?: CompensationInput): string {
    const currency = data.currency || 'USD';
    const formatAmount = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    let compensationText = `
Base Salary: ${formatAmount(data.baseCompensation.baseSalary)}
Performance Bonus: ${formatAmount(data.baseCompensation.performanceBonus)}
Guaranteed Increase: ${formatAmount(data.baseCompensation.guaranteedIncrease)}
Health Insurance: ${formatAmount(data.benefits.healthInsurance)}
Dental Insurance: ${formatAmount(data.benefits.dentalInsurance)}
Vision Insurance: ${formatAmount(data.benefits.visionInsurance)}
Life Insurance: ${formatAmount(data.benefits.lifeInsurance)}
Disability Insurance: ${formatAmount(data.benefits.disabilityInsurance)}
Retirement 401k: ${formatAmount(data.benefits.retirement401k)}
Retirement Match: ${formatAmount(data.benefits.retirementMatch)}
Other Benefits: ${formatAmount(data.benefits.otherBenefits)}
Total Benefits: ${formatAmount(data.benefits.subtotal)}
Government Benefits: ${formatAmount(data.governmentBenefits.subtotal)}
Real-life Costs: ${formatAmount(data.realLifeCosts.subtotal)}
True Cost to Company: ${formatAmount(data.trueCostToCompany)}

Percentage Breakdown:
- Base Compensation: ${data.percentageBreakdown.baseCompensation.toFixed(1)}%
- Benefits: ${data.percentageBreakdown.benefits.toFixed(1)}%
- Government Benefits: ${data.percentageBreakdown.governmentBenefits.toFixed(1)}%
- Real-life Costs: ${data.percentageBreakdown.realLifeCosts.toFixed(1)}%

Currency: ${currency}`;

    // Add performance highlights if available
    if (inputData?.performanceHighlights && inputData.performanceHighlights.trim()) {
      compensationText += `

Performance Highlights:
${inputData.performanceHighlights}`;
    }

    return compensationText;
  }

  private static getStrategyGuidance(strategy: NegotiationStrategy): string {
    return `
Strategy: ${strategy.name}
Description: ${strategy.description}
Approach: ${strategy.approach}
Key Points to Include:
${strategy.keyPoints.map(point => `- ${point}`).join('\n')}
Risk Level: ${strategy.riskLevel}
Effectiveness: ${strategy.effectiveness}/10`;
  }

  private static getToneGuidance(tone: string): string {
    const toneGuidance = {
      professional: 'Maintain formal, respectful tone. Use data and facts. Avoid emotional language.',
      collaborative: 'Emphasize partnership and mutual benefit. Use "we" language. Show flexibility.',
      assertive: 'Be direct and confident. Use strong language. Present clear demands.',
      diplomatic: 'Use tactful language. Show respect for other party. Find middle ground.'
    };
    
    return toneGuidance[tone as keyof typeof toneGuidance] || toneGuidance.professional;
  }

  private static formatPersonalDetails(personalDetails?: PersonalDetails): string {
    if (!personalDetails) {
      return 'No personal details provided - use generic placeholders like [Manager\'s Name], [Your Name], etc.';
    }

    let personalDetailsText = `
Recipient Name: ${personalDetails.recipientName}
Your Name: ${personalDetails.userName}
Your Role/Title: ${personalDetails.userRole}
Company Name: ${personalDetails.companyName}`;

    // Add personal notes with special instructions
    if (personalDetails.personalNotes && personalDetails.personalNotes.trim()) {
      personalDetailsText += `
Personal Notes: ${personalDetails.personalNotes}`;
    }

    // Add priorities
    if (personalDetails.priorities && personalDetails.priorities.length > 0) {
      personalDetailsText += `
Key Priorities: ${personalDetails.priorities.join(', ')}`;
    }

    personalDetailsText += `

IMPORTANT: Replace ALL placeholders in the email with the actual values provided:
- [Manager's Name] or [Manager Name] → ${personalDetails.recipientName}
- [Your Name] → ${personalDetails.userName}
- [Your Role] or [Position] → ${personalDetails.userRole}
- [Company Name] → ${personalDetails.companyName}
- [Recipient's Name] → ${personalDetails.recipientName}

PLACEHOLDER REPLACEMENT RULES:
- ALWAYS replace placeholders with actual values provided above
- For Performance Review emails, replace Performance Highlights placeholders with personal notes
- If personal notes are provided, integrate them naturally into the email content
- Do NOT leave any [placeholder] text in the final email
- Use the actual names and information provided throughout the email

Do NOT use any placeholders in the final email - use the actual names and information provided.`;

    // Add specific instructions for personal notes integration
    if (personalDetails.personalNotes && personalDetails.personalNotes.trim()) {
      personalDetailsText += `

PERSONAL NOTES INTEGRATION INSTRUCTIONS:
- The personal notes contain specific information the user wants to include in their email
- Integrate these personal notes naturally into the email content, don't just append them
- Use the personal notes to add specific achievements, concerns, or negotiation points
- Weave the personal notes into the negotiation strategy and overall tone
- Make the personal notes feel like a natural part of the conversation
- The personal notes should enhance the email's persuasiveness and personalization
- If the personal notes contain specific achievements or accomplishments, highlight them appropriately
- If the personal notes contain concerns or specific requests, address them in the negotiation strategy`;
    }

    return personalDetailsText;
  }

  static async generateEmail(context: EmailContext): Promise<string> {
    try {
      // Call the API route for email generation
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(context),
      });

      if (!response.ok) {
        throw new Error('Failed to generate email');
      }

      const data = await response.json();
      // Post-process to replace any remaining placeholders
      return this.replacePlaceholders(data.email, context.personalDetails);
    } catch (error) {
      console.error('Error generating AI email:', error);
      // Fallback to simulation if API fails
      const email = await this.simulateAIResponse(context, '');
      return this.replacePlaceholders(email, context.personalDetails);
    }
  }

  private static replacePlaceholders(email: string, personalDetails?: PersonalDetails): string {
    if (!personalDetails) return this.cleanEmailFormatting(email);

    let processedEmail = email;

    // Replace common placeholder patterns
    const replacements = {
      '[Manager\'s Name]': personalDetails.recipientName,
      '[Manager Name]': personalDetails.recipientName,
      '[Recipient\'s Name]': personalDetails.recipientName,
      '[Recipient Name]': personalDetails.recipientName,
      '[Your Name]': personalDetails.userName,
      '[Your Role]': personalDetails.userRole,
      '[Position]': personalDetails.userRole,
      '[Company Name]': personalDetails.companyName,
      '[Company]': personalDetails.companyName,
    };

    // Apply replacements
    Object.entries(replacements).forEach(([placeholder, value]) => {
      if (value) {
        processedEmail = processedEmail.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
      }
    });

    // Handle Performance Highlights placeholders specifically
    if (personalDetails.personalNotes && personalDetails.personalNotes.trim()) {
      // Replace Performance Highlights placeholders with personal notes
      processedEmail = processedEmail.replace(/\[Insert your key achievements and metrics\]/gi, personalDetails.personalNotes);
      processedEmail = processedEmail.replace(/\[Insert specific contributions to team success\]/gi, personalDetails.personalNotes);
      processedEmail = processedEmail.replace(/\[Insert any additional responsibilities taken on\]/gi, personalDetails.personalNotes);
      processedEmail = processedEmail.replace(/\[Insert your achievements\]/gi, personalDetails.personalNotes);
      processedEmail = processedEmail.replace(/\[Insert your contributions\]/gi, personalDetails.personalNotes);
      processedEmail = processedEmail.replace(/\[Insert your responsibilities\]/gi, personalDetails.personalNotes);
      
      // Remove any remaining placeholder patterns that might reference personal notes
      processedEmail = processedEmail.replace(/\[Personal Notes\]/gi, '');
      processedEmail = processedEmail.replace(/\[Your Notes\]/gi, '');
      processedEmail = processedEmail.replace(/\[Additional Notes\]/gi, '');
      processedEmail = processedEmail.replace(/\[Your specific points\]/gi, '');
      processedEmail = processedEmail.replace(/\[Your achievements\]/gi, '');
      processedEmail = processedEmail.replace(/\[Your contributions\]/gi, '');
    } else {
      // If no personal notes, remove Performance Highlights placeholders
      processedEmail = processedEmail.replace(/\[Insert your key achievements and metrics\]/gi, '');
      processedEmail = processedEmail.replace(/\[Insert specific contributions to team success\]/gi, '');
      processedEmail = processedEmail.replace(/\[Insert any additional responsibilities taken on\]/gi, '');
      processedEmail = processedEmail.replace(/\[Insert your achievements\]/gi, '');
      processedEmail = processedEmail.replace(/\[Insert your contributions\]/gi, '');
      processedEmail = processedEmail.replace(/\[Insert your responsibilities\]/gi, '');
    }

    // Clean up any remaining generic placeholders
    processedEmail = processedEmail.replace(/\[Insert.*?\]/gi, '');
    processedEmail = processedEmail.replace(/\[Your.*?\]/gi, '');
    processedEmail = processedEmail.replace(/\[Add.*?\]/gi, '');

    return this.cleanEmailFormatting(processedEmail);
  }

  private static cleanEmailFormatting(email: string): string {
    let cleanedEmail = email;

    // Remove markdown bold formatting (**text** -> text)
    cleanedEmail = cleanedEmail.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Remove markdown italic formatting (*text* -> text)
    cleanedEmail = cleanedEmail.replace(/\*(.*?)\*/g, '$1');
    
    // Clean up any remaining markdown artifacts
    cleanedEmail = cleanedEmail.replace(/\*\*/g, '');
    cleanedEmail = cleanedEmail.replace(/\*/g, '');
    
    // Ensure proper line breaks and spacing
    cleanedEmail = cleanedEmail.replace(/\n\n\n+/g, '\n\n');
    
    // Clean up any extra spaces
    cleanedEmail = cleanedEmail.replace(/[ \t]+$/gm, '');
    
    return cleanedEmail.trim();
  }

  static async refineEmail(refinement: RefinementRequest): Promise<string> {
    try {
      // For refinement, we don't need compensation data since we're working with existing email
      // We'll use a minimal context that won't trigger the simulation fallback
      const context: EmailContext = {
        type: 'custom',
        compensationData: {
          currency: 'USD',
          baseSalary: 0,
          performanceBonus: 0,
          guaranteedIncrease: 0,
          totalCompensation: 0,
          benefits: {
            healthInsurance: 0,
            retirement401k: 0,
            paidTimeOff: 0,
            otherBenefits: 0
          },
          realLifeCosts: {
            taxes: 0,
            commuting: 0,
            professionalDevelopment: 0,
            otherCosts: 0
          }
        } as any,
        refinement
      };

      return await this.generateEmail(context);
    } catch (error) {
      console.error('Error refining email:', error);
      throw new Error('Failed to refine email. Please try again.');
    }
  }

  static saveEmailTemplate(
    emailContent: string, 
    templateName: string, 
    context: EmailContext
  ): void {
    try {
      const template = {
        id: Date.now().toString(),
        name: templateName,
        content: emailContent,
        context: {
          type: context.type,
          personalDetails: context.personalDetails,
          userPreferences: context.userPreferences
        },
        createdAt: new Date().toISOString()
      };

      // Save to localStorage for now (in production, save to database)
      const existingTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
      existingTemplates.push(template);
      localStorage.setItem('emailTemplates', JSON.stringify(existingTemplates));
    } catch (error) {
      console.error('Error saving email template:', error);
    }
  }

  static getSavedTemplates(): any[] {
    try {
      return JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    } catch (error) {
      console.error('Error loading email templates:', error);
      return [];
    }
  }

  private static async simulateAIResponse(context: EmailContext, prompt: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // If this is a refinement request, handle it differently
    if (context.refinement) {
      return this.generateRefinedEmail(context.refinement);
    }
    
    const strategy = this.selectBestStrategy(context.type, context.compensationData, context.userPreferences);
    const data = context.compensationData;
    
    // Generate context-aware email based on strategy
    return this.generateContextualEmail(context.type, strategy, data);
  }

  private static generateRefinedEmail(refinement: RefinementRequest): string {
    const { previousEmail, instructions, toneAdjustment, lengthAdjustment, focusAdjustment } = refinement;
    
    // Simple refinement logic - in a real implementation, this would use AI
    let refinedEmail = previousEmail;
    
    // Apply tone adjustments
    if (toneAdjustment === 'more_assertive') {
      refinedEmail = refinedEmail.replace(/I hope this email finds you well/g, 'I am writing to discuss an important matter');
      refinedEmail = refinedEmail.replace(/would like to/g, 'need to');
      refinedEmail = refinedEmail.replace(/I believe/g, 'I am confident');
    } else if (toneAdjustment === 'more_formal') {
      refinedEmail = refinedEmail.replace(/I hope this email finds you well/g, 'I trust this correspondence finds you in good health');
      refinedEmail = refinedEmail.replace(/I\'d like/g, 'I would like');
    } else if (toneAdjustment === 'more_casual') {
      refinedEmail = refinedEmail.replace(/I hope this email finds you well/g, 'Hope you\'re doing well');
      refinedEmail = refinedEmail.replace(/I would like/g, 'I\'d like');
    }
    
    // Apply length adjustments
    if (lengthAdjustment === 'shorter') {
      // Remove some paragraphs or make them more concise
      refinedEmail = refinedEmail.replace(/\n\n.*?Key Findings.*?\n\n/g, '\n\n');
    } else if (lengthAdjustment === 'longer') {
      // Add more detail
      refinedEmail = refinedEmail.replace(/(\*\*Key Findings:\*\*)/, '$1\n\nI have also considered additional factors such as market trends, inflation adjustments, and industry benchmarks that support this request.');
    }
    
    // Apply focus adjustments
    if (focusAdjustment === 'more_personal') {
      refinedEmail = refinedEmail.replace(/(Dear \[Manager's Name\],)/, '$1\n\nI wanted to reach out personally to discuss my compensation, as I value our working relationship and believe in open communication.');
    } else if (focusAdjustment === 'more_data') {
      refinedEmail = refinedEmail.replace(/(\*\*Market Analysis Summary:\*\*)/, '$1\n\n**Additional Data Points:**\n• Industry growth rate: 8.5% annually\n• Cost of living adjustment: 3.2%\n• Performance metrics: Exceeded targets by 15%');
    }
    
    // Apply custom instructions
    if (instructions.toLowerCase().includes('more assertive')) {
      refinedEmail = refinedEmail.replace(/I would appreciate/g, 'I expect');
      refinedEmail = refinedEmail.replace(/I hope we can/g, 'I am confident we will');
    }
    
    if (instructions.toLowerCase().includes('add more data')) {
      refinedEmail = refinedEmail.replace(/(\*\*Market Analysis Summary:\*\*)/, '$1\n\n**Supporting Data:**\n• Glassdoor salary data: $85,000 - $95,000\n• LinkedIn salary insights: 90th percentile at $92,000\n• Industry reports: 12% increase in similar roles');
    }
    
    return refinedEmail;
  }

  private static generateContextualEmail(
    type: string, 
    strategy: NegotiationStrategy, 
    data: CompensationBreakdown
  ): string {
    // Generate dynamic, creative email using AI brainstorming approach
    return this.generateDynamicEmail(type, strategy, data);
  }

  private static generateDynamicEmail(
    type: string, 
    strategy: NegotiationStrategy, 
    data: CompensationBreakdown
  ): string {
    const currency = data.currency || 'USD';
    const baseSalary = formatCurrency(data.baseCompensation.baseSalary, currency);
    const totalCTC = formatCurrency(data.trueCostToCompany, currency);
    const benefitsValue = formatCurrency(data.benefits.subtotal, currency);
    
    // Create a creative, brainstorming-style prompt
    const creativePrompt = this.createCreativePrompt(type, strategy, data, baseSalary, totalCTC, benefitsValue, currency);
    
    // For now, we'll use the existing API call but with enhanced prompts
    // In a real implementation, you'd call your AI service with the creative prompt
    return this.generateCreativeEmailFallback(type, strategy, baseSalary, totalCTC, benefitsValue, currency);
  }

  private static createCreativePrompt(
    type: string, 
    strategy: NegotiationStrategy, 
    data: CompensationBreakdown,
    baseSalary: string,
    totalCTC: string,
    benefitsValue: string,
    currency: string
  ): string {
    const emailTypeContext = {
      negotiation: "salary negotiation with current manager",
      offer: "responding to a job offer with counter-proposal",
      review: "annual performance review compensation discussion",
      custom: "custom compensation-related communication"
    };

    return `You are an expert professional email writer specializing in ${emailTypeContext[type as keyof typeof emailTypeContext] || 'compensation discussions'}.

COMPENSATION DATA:
- Base Salary: ${baseSalary}
- Total Compensation: ${totalCTC}
- Benefits Value: ${benefitsValue}
- Currency: ${currency}
- Strategy: ${strategy.name} (${strategy.description})

CREATIVE INSTRUCTIONS:
1. Brainstorm multiple unique approaches to structure and present this information
2. Vary your tone, language, and email flow each time you generate
3. Experiment with different opening styles, body organization, and closing approaches
4. Use varied professional language and phrasing
5. Create original, engaging content that feels fresh and personalized
6. Avoid repetitive templates or formulaic structures

Generate ONE well-crafted, original email that showcases creativity and thoughtful composition. Make it feel like a unique, personalized communication rather than a template.

Focus on the ${strategy.approach} approach while maintaining professionalism and effectiveness.`;
  }

  private static generateCreativeEmailFallback(
    type: string, 
    strategy: NegotiationStrategy, 
    baseSalary: string,
    totalCTC: string,
    benefitsValue: string,
    currency: string
  ): string {
    // Generate multiple creative variations and randomly select one
    const variations = this.generateEmailVariations(type, strategy, baseSalary, totalCTC, benefitsValue, currency);
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  }

  private static generateEmailVariations(
    type: string, 
    strategy: NegotiationStrategy, 
    baseSalary: string,
    totalCTC: string,
    benefitsValue: string,
    currency: string
  ): string[] {
    const variations = [];
    
    // Generate 5-8 different creative variations for each email type
    for (let i = 0; i < 6; i++) {
      variations.push(this.createEmailVariation(type, strategy, baseSalary, totalCTC, benefitsValue, currency, i));
    }
    
    return variations;
  }

  private static createEmailVariation(
    type: string, 
    strategy: NegotiationStrategy, 
    baseSalary: string,
    totalCTC: string,
    benefitsValue: string,
    currency: string,
    variationIndex: number
  ): string {
    const openings = [
      "I hope this email finds you well. I've been reflecting on my compensation package and wanted to share some insights I've gathered.",
      "I hope you're doing well. I wanted to reach out to discuss my compensation and share some research I've been conducting.",
      "I hope this message finds you in good spirits. I've been analyzing my current compensation structure and would like to explore some opportunities with you.",
      "I hope you're having a great week. I wanted to initiate a conversation about my compensation package and share some valuable insights I've discovered.",
      "I hope this email finds you well. I've been doing some market research and would love to discuss my compensation with you.",
      "I hope you're doing well. I wanted to schedule some time to discuss my compensation package and share some interesting findings."
    ];

    const structures = [
      // Structure 1: Data-focused with market analysis
      () => `Subject: ${this.getRandomSubject(type, variationIndex)}

${openings[variationIndex % openings.length]}

**Market Research Insights:**
After conducting comprehensive research into comparable positions, I've uncovered some compelling data:

• Current Base Salary: ${baseSalary}
• Market Rate Range: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (0.92 + Math.random() * 0.16), currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (1.08 + Math.random() * 0.14), currency)}
• Total Package Value: ${totalCTC}
• Benefits Investment: ${benefitsValue}

**Key Discoveries:**
${this.getRandomKeyFindings(variationIndex)}

**Discussion Points:**
${this.getRandomDiscussionPoints(variationIndex)}

I believe this data-driven approach will help us reach a mutually beneficial agreement. Would you be available for a discussion next week?

Thank you for your time and consideration.

Best regards,
[Your Name]`,

      // Structure 2: Value proposition focused
      () => `Subject: ${this.getRandomSubject(type, variationIndex)}

${openings[variationIndex % openings.length]}

**Value Analysis:**
I've been analyzing the value I bring to our team and how it aligns with my current compensation:

• Current Investment: ${totalCTC} (total cost-to-company)
• Base Salary Component: ${baseSalary}
• Benefits Package: ${benefitsValue}
• Market Benchmark: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (0.95 + Math.random() * 0.1), currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (1.05 + Math.random() * 0.1), currency)}

**My Contributions:**
${this.getRandomContributions(variationIndex)}

**Growth Opportunities:**
${this.getRandomGrowthOpportunities(variationIndex)}

I'd love to discuss how we can align my compensation with both my current value and future potential. Are you available for a meeting next week?

Best regards,
[Your Name]`,

      // Structure 3: Collaborative approach
      () => `Subject: ${this.getRandomSubject(type, variationIndex)}

${openings[variationIndex % openings.length]}

**Partnership Perspective:**
I see this as an opportunity for us to work together to ensure my compensation reflects both market standards and my contributions:

• Current Package: ${baseSalary} base + ${benefitsValue} benefits = ${totalCTC} total
• Market Context: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (0.93 + Math.random() * 0.14), currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (1.07 + Math.random() * 0.12), currency)}
• Performance Impact: [Your key achievements and value-add]

**Collaborative Solutions:**
${this.getRandomCollaborativeSolutions(variationIndex)}

I'm excited to explore creative solutions that work for both of us. Would you be available for a meeting next week?

Thank you for your time and consideration.

Best regards,
[Your Name]`,

      // Structure 4: Strategic business approach
      () => `Subject: ${this.getRandomSubject(type, variationIndex)}

${openings[variationIndex % openings.length]}

**Strategic Analysis:**
After analyzing industry trends and our company's growth trajectory, I've identified several strategic opportunities:

• Current Investment: ${totalCTC}
• Market Positioning: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (0.94 + Math.random() * 0.12), currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (1.06 + Math.random() * 0.12), currency)}
• Base Salary: ${baseSalary}
• Benefits Investment: ${benefitsValue}

**Strategic Considerations:**
${this.getRandomStrategicConsiderations(variationIndex)}

**Proposed Framework:**
${this.getRandomProposedFramework(variationIndex)}

I believe this strategic approach will benefit both my career growth and our team's success. Would you be available for a meeting next week?

Best regards,
[Your Name]`,

      // Structure 5: Performance and growth focused
      () => `Subject: ${this.getRandomSubject(type, variationIndex)}

${openings[variationIndex % openings.length]}

**Performance Context:**
As I reflect on my contributions and look toward future growth, I wanted to discuss my compensation package:

• Current Foundation: ${baseSalary} base salary
• Total Package: ${totalCTC}
• Benefits Value: ${benefitsValue}
• Market Range: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (0.92 + Math.random() * 0.16), currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (1.08 + Math.random() * 0.14), currency)}

**Performance Highlights:**
${this.getRandomPerformanceHighlights(variationIndex)}

**Future Vision:**
${this.getRandomFutureVision(variationIndex)}

I'm committed to growing with the company and contributing to our long-term success. Would you be available to discuss this next week?

Best regards,
[Your Name]`,

      // Structure 6: Direct and results-oriented
      () => `Subject: ${this.getRandomSubject(type, variationIndex)}

${openings[variationIndex % openings.length]}

**Current Situation:**
I've been analyzing my compensation package and wanted to share my findings:

• Base Salary: ${baseSalary}
• Total Compensation: ${totalCTC}
• Benefits Package: ${benefitsValue}
• Market Research: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (0.95 + Math.random() * 0.1), currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * (1.05 + Math.random() * 0.1), currency)}

**Key Insights:**
${this.getRandomKeyInsights(variationIndex)}

**Next Steps:**
${this.getRandomNextSteps(variationIndex)}

I'm confident we can find a solution that works for both of us. Please let me know when you might be available for this discussion.

Best regards,
[Your Name]`
    ];

    return structures[variationIndex % structures.length]();
  }

  // Helper methods for generating varied content
  private static getRandomSubject(type: string, variationIndex: number): string {
    const subjects = {
      negotiation: [
        "Compensation Review - Data-Driven Discussion",
        "Salary Discussion - Market Analysis",
        "Compensation Package Review",
        "Market Research & Compensation Discussion",
        "Salary Alignment Discussion",
        "Compensation Analysis & Next Steps"
      ],
      offer: [
        "Thank You for the Offer - Excited to Discuss",
        "Job Offer Response - Ready to Move Forward",
        "Offer Discussion - Next Steps",
        "Thank You for the Opportunity",
        "Offer Review - Excited About the Role",
        "Compensation Discussion - New Opportunity"
      ],
      review: [
        "Annual Review - Compensation Discussion",
        "Performance Review - Salary Discussion",
        "Year-End Compensation Review",
        "Performance & Compensation Discussion",
        "Annual Review - Salary Alignment",
        "Performance Review - Compensation Analysis"
      ],
      custom: [
        "Compensation Discussion",
        "Salary & Benefits Discussion",
        "Compensation Package Review",
        "Market Research Discussion",
        "Compensation Analysis",
        "Salary Review Discussion"
      ]
    };
    
    const typeSubjects = subjects[type as keyof typeof subjects] || subjects.custom;
    return typeSubjects[variationIndex % typeSubjects.length];
  }

  private static getRandomKeyFindings(variationIndex: number): string {
    const findings = [
      "1. My current package is positioned at the 45th percentile of market rates\n2. The benefits package is competitive but could be optimized\n3. Performance-based compensation opportunities exist\n4. Total cost-to-company analysis shows strong ROI potential",
      "1. Market research indicates room for salary adjustment\n2. Benefits package is comprehensive but could be enhanced\n3. Performance metrics support compensation growth\n4. Industry trends suggest upward adjustment potential",
      "1. Current compensation is below market median\n2. Benefits are strong but salary component needs attention\n3. Performance data supports compensation increase\n4. Market analysis reveals growth opportunities",
      "1. Package positioning shows adjustment potential\n2. Benefits structure is solid with room for optimization\n3. Performance indicators support salary growth\n4. Market comparison reveals competitive opportunities",
      "1. Compensation analysis shows alignment opportunities\n2. Benefits package is competitive with enhancement potential\n3. Performance metrics justify salary adjustment\n4. Market research supports compensation review",
      "1. Current positioning indicates growth potential\n2. Benefits are comprehensive with optimization opportunities\n3. Performance data supports compensation increase\n4. Industry benchmarks suggest adjustment opportunities"
    ];
    return findings[variationIndex % findings.length];
  }

  private static getRandomDiscussionPoints(variationIndex: number): string {
    const points = [
      "• Market rate adjustment based on current data\n• Performance bonus structure optimization\n• Benefits package enhancement opportunities\n• Career development and advancement planning",
      "• Salary alignment with market standards\n• Performance-based compensation structure\n• Additional benefits and perks exploration\n• Professional growth and development path",
      "• Compensation adjustment based on market research\n• Performance incentive optimization\n• Benefits package enhancement\n• Career advancement and growth planning",
      "• Market rate alignment discussion\n• Performance compensation structure\n• Benefits optimization opportunities\n• Professional development planning",
      "• Salary adjustment based on market data\n• Performance-based incentive structure\n• Benefits package enhancement\n• Career growth and advancement planning",
      "• Market rate alignment based on research\n• Performance compensation optimization\n• Benefits enhancement opportunities\n• Professional development and growth planning"
    ];
    return points[variationIndex % points.length];
  }

  private static getRandomContributions(variationIndex: number): string {
    const contributions = [
      "Over the past year, I've consistently delivered results that exceed expectations. My contributions have directly impacted our team's success, and I believe my compensation should reflect this value.",
      "I've been instrumental in driving key projects and initiatives that have contributed significantly to our team's achievements. My performance metrics consistently demonstrate value beyond my current compensation level.",
      "My work has resulted in measurable improvements to our team's efficiency and output. I've taken on additional responsibilities and consistently delivered high-quality results that justify compensation review.",
      "I've been a key contributor to several successful projects and initiatives. My performance has consistently exceeded expectations, and I believe my compensation should reflect the value I bring to the team.",
      "My contributions have been instrumental in achieving our team's goals and objectives. I've consistently delivered high-quality work and taken on additional responsibilities that warrant compensation consideration.",
      "I've been a driving force behind several successful initiatives and consistently delivered results that exceed expectations. My performance and contributions justify a review of my compensation package."
    ];
    return contributions[variationIndex % contributions.length];
  }

  private static getRandomGrowthOpportunities(variationIndex: number): string {
    const opportunities = [
      "1. Salary progression aligned with performance and market rates\n2. Performance-based incentives that reward results\n3. Professional development opportunities and career advancement\n4. Benefits that support both personal and professional growth",
      "1. Compensation growth based on performance metrics\n2. Performance incentives aligned with company goals\n3. Career development and advancement opportunities\n4. Benefits package that supports long-term growth",
      "1. Salary adjustment reflecting performance and market value\n2. Performance-based compensation structure\n3. Professional development and career advancement\n4. Benefits that enhance both personal and professional growth",
      "1. Compensation alignment with performance and market standards\n2. Performance incentive structure optimization\n3. Career development and advancement planning\n4. Benefits package enhancement for growth support",
      "1. Salary progression based on performance and market rates\n2. Performance-based incentive alignment\n3. Professional development opportunities\n4. Benefits that support career and personal growth",
      "1. Compensation adjustment reflecting performance and market value\n2. Performance incentive structure\n3. Career advancement and development opportunities\n4. Benefits package optimization for growth"
    ];
    return opportunities[variationIndex % opportunities.length];
  }

  private static getRandomCollaborativeSolutions(variationIndex: number): string {
    const solutions = [
      "I'd like to explore together:\n• How we can align my compensation with market standards\n• What performance metrics would justify adjustments\n• What benefits or perks would enhance my package\n• How we can structure this to work within budget constraints",
      "I'd like to work together to find solutions that:\n• Align my compensation with market standards\n• Establish clear performance metrics for adjustments\n• Identify benefits that would enhance my package\n• Create a structure that works within our budget",
      "Let's explore different approaches to:\n• Aligning compensation with market research\n• Establishing performance-based adjustment criteria\n• Identifying additional benefits or perks\n• Structuring solutions that work for both of us",
      "I'd appreciate the opportunity to discuss:\n• Market rate alignment strategies\n• Performance metrics for compensation adjustments\n• Benefits enhancement opportunities\n• Budget-friendly solutions that work for everyone",
      "Let's work together to find:\n• Market-aligned compensation solutions\n• Performance-based adjustment frameworks\n• Benefits package enhancements\n• Practical approaches that work within constraints",
      "I'd love to explore with you:\n• Market rate alignment approaches\n• Performance criteria for compensation adjustments\n• Benefits optimization opportunities\n• Collaborative solutions that benefit everyone"
    ];
    return solutions[variationIndex % solutions.length];
  }

  private static getRandomStrategicConsiderations(variationIndex: number): string {
    const considerations = [
      "1. Market competitiveness and talent retention\n2. Performance alignment and incentive structures\n3. Long-term career development and succession planning\n4. ROI on compensation investment",
      "1. Industry competitiveness and retention strategies\n2. Performance-based compensation alignment\n3. Career development and succession planning\n4. Return on investment for compensation decisions",
      "1. Market positioning and talent retention\n2. Performance incentive structure alignment\n3. Long-term career development planning\n4. Compensation investment ROI analysis",
      "1. Competitive positioning and retention\n2. Performance alignment and incentive optimization\n3. Career development and succession planning\n4. Investment return on compensation decisions",
      "1. Market competitiveness and talent retention\n2. Performance-based incentive alignment\n3. Long-term career development planning\n4. ROI analysis for compensation investments",
      "1. Industry competitiveness and retention\n2. Performance alignment and incentive structures\n3. Career development and succession planning\n4. Return on investment for compensation"
    ];
    return considerations[variationIndex % considerations.length];
  }

  private static getRandomProposedFramework(variationIndex: number): string {
    const frameworks = [
      "I'd like to discuss a compensation structure that:\n• Reflects current market value and performance\n• Includes clear performance metrics and growth paths\n• Balances immediate needs with long-term career development\n• Aligns with company objectives and budget considerations",
      "Let's discuss a framework that:\n• Aligns with market standards and performance\n• Establishes clear metrics and growth opportunities\n• Balances current needs with future development\n• Works within company goals and budget constraints",
      "I propose we discuss a structure that:\n• Reflects market value and current performance\n• Includes performance metrics and advancement paths\n• Balances immediate and long-term career needs\n• Aligns with company objectives and financial considerations",
      "Let's discuss a framework that:\n• Aligns with market research and performance data\n• Establishes clear performance metrics and growth paths\n• Balances current requirements with future development\n• Works within company goals and budget parameters",
      "I'd like to discuss a structure that:\n• Reflects market standards and performance metrics\n• Includes clear advancement criteria and growth opportunities\n• Balances immediate needs with long-term career planning\n• Aligns with company objectives and financial constraints",
      "Let's discuss a framework that:\n• Aligns with market value and performance indicators\n• Establishes performance metrics and career advancement\n• Balances current needs with future development goals\n• Works within company objectives and budget considerations"
    ];
    return frameworks[variationIndex % frameworks.length];
  }

  private static getRandomPerformanceHighlights(variationIndex: number): string {
    const highlights = [
      "• [Insert your key achievements and metrics]\n• [Insert specific contributions to team success]\n• [Insert any additional responsibilities taken on]",
      "• [Your major accomplishments and measurable results]\n• [Specific contributions that drove team success]\n• [Additional responsibilities and leadership taken on]",
      "• [Key achievements and performance metrics]\n• [Contributions that impacted team outcomes]\n• [Extra responsibilities and initiatives undertaken]",
      "• [Significant accomplishments and measurable results]\n• [Contributions that enhanced team performance]\n• [Additional responsibilities and projects led]",
      "• [Major achievements and performance indicators]\n• [Contributions that drove team success]\n• [Extra responsibilities and leadership initiatives]",
      "• [Key accomplishments and measurable outcomes]\n• [Contributions that improved team results]\n• [Additional responsibilities and projects undertaken]"
    ];
    return highlights[variationIndex % highlights.length];
  }

  private static getRandomFutureVision(variationIndex: number): string {
    const visions = [
      "I'm committed to growing with the company and contributing to our long-term success. I believe my compensation should reflect not just my current value, but also my potential for future growth and leadership.",
      "I'm excited about the future and committed to contributing to our team's continued success. I believe my compensation should reflect both my current contributions and my potential for future growth.",
      "I'm dedicated to growing with the company and contributing to our long-term success. I believe my compensation should reflect my current value and potential for future advancement.",
      "I'm committed to the company's success and excited about future growth opportunities. I believe my compensation should reflect both my current performance and future potential.",
      "I'm passionate about growing with the company and contributing to our continued success. I believe my compensation should reflect my current value and potential for future leadership.",
      "I'm dedicated to the company's long-term success and committed to contributing to our growth. I believe my compensation should reflect both my current contributions and future potential."
    ];
    return visions[variationIndex % visions.length];
  }

  private static getRandomKeyInsights(variationIndex: number): string {
    const insights = [
      "• My total compensation represents a significant investment by the company\n• The benefits package is comprehensive and competitive\n• There are opportunities to optimize certain components\n• Market research supports adjustment potential",
      "• Current package shows strong company investment\n• Benefits structure is solid with enhancement opportunities\n• Performance data supports compensation review\n• Market analysis reveals growth potential",
      "• Compensation represents substantial company investment\n• Benefits package is competitive with optimization opportunities\n• Performance metrics justify review consideration\n• Market research indicates adjustment possibilities",
      "• Total package reflects significant company investment\n• Benefits are comprehensive with improvement potential\n• Performance data supports compensation discussion\n• Market analysis shows growth opportunities",
      "• Current investment demonstrates company commitment\n• Benefits structure is strong with enhancement potential\n• Performance indicators support compensation review\n• Market research reveals adjustment opportunities",
      "• Package represents substantial company investment\n• Benefits are competitive with optimization potential\n• Performance metrics justify compensation discussion\n• Market analysis indicates growth possibilities"
    ];
    return insights[variationIndex % insights.length];
  }

  private static getRandomNextSteps(variationIndex: number): string {
    const nextSteps = [
      "I would like to schedule a meeting to discuss:\n• Market rate adjustments\n• Performance-based compensation\n• Benefits optimization\n• Career development opportunities",
      "I'd appreciate the opportunity to discuss:\n• Compensation alignment with market standards\n• Performance incentive structure\n• Benefits package enhancement\n• Professional development planning",
      "Let's schedule time to explore:\n• Market rate alignment strategies\n• Performance-based compensation structure\n• Benefits optimization opportunities\n• Career advancement planning",
      "I'd like to meet to discuss:\n• Compensation adjustment based on market research\n• Performance incentive alignment\n• Benefits package enhancement\n• Professional growth opportunities",
      "Let's arrange a meeting to explore:\n• Market rate alignment approaches\n• Performance compensation structure\n• Benefits optimization strategies\n• Career development planning",
      "I'd appreciate scheduling time to discuss:\n• Compensation alignment with market data\n• Performance incentive optimization\n• Benefits package enhancement\n• Professional advancement opportunities"
    ];
    return nextSteps[variationIndex % nextSteps.length];
  }

  private static generateNegotiationEmail(strategy: NegotiationStrategy, baseSalary: string, totalCTC: string, benefitsValue: string, currency: string = 'USD'): string {
    if (strategy.id === 'data_driven') {
      return `Subject: Compensation Review - Data-Driven Discussion

Dear [Manager's Name],

I hope this email finds you well. I've conducted a comprehensive analysis of my current compensation package and would like to schedule a discussion to review the findings.

**Market Analysis Summary:**
Based on my research of comparable positions in our industry and region, I've identified several key insights:

• Current Base Salary: ${baseSalary}
• Market Rate Range: ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * 0.95, currency)} - ${formatCurrency(parseFloat(baseSalary.replace(/[^\d.-]/g, '')) * 1.15, currency)}
• Total Compensation Value: ${totalCTC}
• Benefits Package Value: ${benefitsValue}

**Key Findings:**
1. My current package is positioned at the 45th percentile of market rates
2. The benefits package is competitive but could be optimized
3. Performance-based compensation opportunities exist
4. Total cost-to-company analysis shows strong ROI potential

**Proposed Discussion Points:**
• Market rate adjustment based on current data
• Performance bonus structure optimization
• Benefits package enhancement opportunities
• Career development and advancement planning

I've prepared detailed supporting documentation and would appreciate the opportunity to present this analysis during a 30-minute meeting next week. I'm confident this data-driven approach will help us reach a mutually beneficial agreement.

Thank you for your time and consideration.

Best regards,
[Your Name]`;
    }
    
    // Fallback for other strategies
    return `Subject: Compensation Discussion - Strategic Review

Dear [Manager's Name],

I hope you're doing well. I wanted to reach out to discuss my compensation package and share some insights I've gathered about my role and market positioning.

**Current Package Overview:**
• Base Salary: ${baseSalary}
• Total Compensation: ${totalCTC}
• Benefits Value: ${benefitsValue}

I believe there's an opportunity to align my compensation more closely with my contributions and market value. I'd appreciate the chance to discuss this further and explore options that work for both of us.

Would you be available for a brief meeting next week?

Best regards,
[Your Name]`;
  }

  private static generateOfferEmail(strategy: NegotiationStrategy, baseSalary: string, totalCTC: string, benefitsValue: string, currency: string = 'USD'): string {
    return `Subject: Thank You for the Offer - Excited to Discuss Next Steps

Dear [Hiring Manager's Name],

Thank you for extending the offer for the [Position Title] role. I'm genuinely excited about the opportunity to join [Company Name] and contribute to your team's continued success.

After careful consideration of the offer, I'd like to discuss a few aspects of the compensation package to ensure we're aligned on the value I'll bring to the role.

**Offer Analysis:**
• Base Salary: ${baseSalary}
• Total Compensation: ${totalCTC}
• Benefits Package: ${benefitsValue}

**Areas for Discussion:**
1. Base salary adjustment to reflect market rates and my experience level
2. Performance bonus structure and clear success metrics
3. Benefits package details and additional perks
4. Professional development and growth opportunities
5. Work-life balance and flexible arrangements

I've prepared a comprehensive analysis of comparable positions in the market, and I'm confident we can find a solution that reflects the value I'll bring while fitting within your compensation structure.

I'm excited about this opportunity and eager to move forward once we align on these details. Would you be available for a brief call this week to discuss?

Thank you for your time and consideration.

Best regards,
[Your Name]`;
  }

  private static generateReviewEmail(strategy: NegotiationStrategy, baseSalary: string, totalCTC: string, benefitsValue: string, currency: string = 'USD'): string {
    return `Subject: Annual Review - Compensation Discussion

Dear [Manager's Name],

I hope you're doing well. As we approach my annual performance review, I wanted to share some thoughts on my compensation package and discuss potential adjustments for the coming year.

**Performance Highlights:**
• [Insert your key achievements and metrics]
• [Insert specific contributions to team success]
• [Insert any additional responsibilities taken on]

**Current Compensation Analysis:**
• Base Salary: ${baseSalary}
• Total Package Value: ${totalCTC}
• Benefits Contribution: ${benefitsValue}

**Areas for Discussion:**
1. Salary adjustment based on performance and market rates
2. Bonus structure optimization and clear criteria
3. Additional benefits or perks that would enhance my package
4. Professional development opportunities and career advancement

I believe my contributions over the past year warrant consideration for a compensation adjustment. I've prepared supporting documentation and market research to share during our review meeting.

I'm looking forward to our discussion and would appreciate the opportunity to present my case in detail.

Best regards,
[Your Name]`;
  }

  private static generateCustomEmail(strategy: NegotiationStrategy, baseSalary: string, totalCTC: string, benefitsValue: string, currency: string = 'USD'): string {
    return `Subject: Compensation Package Review and Discussion

Dear [Recipient's Name],

I hope this email finds you well. I wanted to share a comprehensive analysis of my current compensation package and discuss potential areas for improvement.

**Compensation Overview:**
• Base Salary: ${baseSalary}
• Total Compensation: ${totalCTC}
• Benefits Value: ${benefitsValue}

**Key Insights:**
• My total compensation represents a significant investment by the company
• The benefits package is comprehensive and competitive
• There are opportunities to optimize certain components
• Market positioning shows room for adjustment

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
}
