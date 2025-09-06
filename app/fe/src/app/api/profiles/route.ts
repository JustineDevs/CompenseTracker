import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data
    // In production, this would call the backend API
    const mockProfiles = [
      {
        id: '1',
        name: 'Software Engineer Profile',
        input: {
          baseSalary: 120000,
          performanceBonus: 15000,
          healthInsurance: 12000,
          retirement401k: 6000,
          retirementMatch: 3000
        },
        breakdown: {
          grossPay: 135000,
          netPay: 120000,
          trueCostToCompany: 156000
        },
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockProfiles
    });
  } catch (error) {
    console.error('Profiles fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch profiles' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // For now, return mock success
    // In production, this would call the backend API
    const mockProfile = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: mockProfile
    });
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create profile' 
      },
      { status: 500 }
    );
  }
}
