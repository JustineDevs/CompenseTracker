import { NextRequest, NextResponse } from 'next/server';
import { AIEmailService, EmailContext } from '@/services/aiEmailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      type, 
      compensationData, 
      personalDetails, 
      userPreferences, 
      refinement 
    } = body;

    // Validate required fields
    if (!type || !compensationData) {
      return NextResponse.json(
        { error: 'Missing required fields: type and compensationData' },
        { status: 400 }
      );
    }

    // Create email context
    const context: EmailContext = {
      type,
      compensationData,
      personalDetails,
      userPreferences: userPreferences || {
        tone: 'professional',
        focus: 'total_compensation',
        urgency: 'medium'
      },
      refinement
    };

    // Generate email using AI service
    const generatedEmail = await AIEmailService.generateEmail(context);

    return NextResponse.json({
      success: true,
      email: generatedEmail,
      strategy: {
        type,
        tone: context.userPreferences?.tone,
        focus: context.userPreferences?.focus,
        urgency: context.userPreferences?.urgency,
        personalized: !!personalDetails?.recipientName,
        refined: !!refinement
      },
      personalization: personalDetails ? {
        recipientName: personalDetails.recipientName,
        userName: personalDetails.userName,
        userRole: personalDetails.userRole,
        companyName: personalDetails.companyName
      } : null
    });

  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email. Please try again.' },
      { status: 500 }
    );
  }
}
