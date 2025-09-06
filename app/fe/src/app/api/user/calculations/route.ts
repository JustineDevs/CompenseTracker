import { NextRequest, NextResponse } from 'next/server';

interface CalculationRecord {
  id: string;
  userId: string;
  createdAt: string;
  baseSalary: number;
  totalCompensation: number;
  currency: string;
  position: string;
  company: string;
  briefSummary: string;
  fullBreakdown: {
    baseSalary: number;
    bonuses: number;
    benefits: number;
    equity: number;
    other: number;
  };
}

// Mock data for now - in production this would come from database
const mockCalculations: CalculationRecord[] = [
  {
    id: 'calc_001',
    userId: 'user_123',
    createdAt: '2024-01-20T10:30:00Z',
    baseSalary: 75000,
    totalCompensation: 101000,
    currency: 'USD',
    position: 'Software Engineer',
    company: 'Tech Corp',
    briefSummary: 'Base + 15% bonus + benefits',
    fullBreakdown: {
      baseSalary: 75000,
      bonuses: 11250,
      benefits: 8750,
      equity: 5000,
      other: 0
    }
  },
  {
    id: 'calc_002',
    userId: 'user_123',
    createdAt: '2024-01-18T14:15:00Z',
    baseSalary: 95000,
    totalCompensation: 128000,
    currency: 'USD',
    position: 'Senior Developer',
    company: 'StartupXYZ',
    briefSummary: 'Base + 20% bonus + equity',
    fullBreakdown: {
      baseSalary: 95000,
      bonuses: 19000,
      benefits: 12000,
      equity: 2000,
      other: 0
    }
  },
  {
    id: 'calc_003',
    userId: 'user_123',
    createdAt: '2024-01-15T09:45:00Z',
    baseSalary: 110000,
    totalCompensation: 145000,
    currency: 'USD',
    position: 'Tech Lead',
    company: 'BigTech Inc',
    briefSummary: 'Base + 25% bonus + RSUs',
    fullBreakdown: {
      baseSalary: 110000,
      bonuses: 27500,
      benefits: 15000,
      equity: 7500,
      other: 0
    }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const anonymousUserId = searchParams.get('anonymousUserId');
    
    // Support both authenticated users and anonymous users
    if (!anonymousUserId) {
      return NextResponse.json({
        error: 'Missing anonymousUserId parameter',
        records: [],
        total: 0,
        hasMore: false
      }, { status: 400 });
    }
    
    // In production, you would:
    // 1. Query database for calculations by anonymousUserId
    // 2. Apply pagination
    // 3. Return only data for this anonymous user
    
    // For now, filter mock data by anonymous user ID
    // In production: const calculations = await db.query(
    //   'SELECT * FROM calculation_records WHERE anonymous_user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    //   [anonymousUserId, limit, offset]
    // );
    
    const userCalculations = mockCalculations.filter(calc => 
      calc.userId === anonymousUserId || calc.userId === 'user_123' // Fallback for demo
    );
    
    const calculations = userCalculations
      .slice(offset, offset + limit)
      .map(calc => ({
        id: calc.id,
        createdAt: calc.createdAt,
        baseSalary: calc.baseSalary,
        totalCompensation: calc.totalCompensation,
        currency: calc.currency,
        position: calc.position,
        company: calc.company,
        briefSummary: calc.briefSummary
      }));

    return NextResponse.json({
      records: calculations,
      total: userCalculations.length,
      hasMore: offset + limit < userCalculations.length,
      pagination: {
        limit,
        offset,
        total: userCalculations.length
      },
      anonymousUserId: anonymousUserId
    });

  } catch (error) {
    console.error('User calculations API error:', error);
    
    return NextResponse.json({
      error: 'Failed to fetch calculation history',
      records: [],
      total: 0,
      hasMore: false
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      baseSalary,
      totalCompensation,
      currency,
      position,
      company,
      briefSummary,
      fullBreakdown,
      anonymousUserId
    } = body;

    // Validate required fields
    if (!baseSalary || !totalCompensation || !currency) {
      return NextResponse.json({
        error: 'Missing required fields: baseSalary, totalCompensation, currency',
        success: false
      }, { status: 400 });
    }

    // Validate anonymous user ID
    if (!anonymousUserId) {
      return NextResponse.json({
        error: 'Missing anonymousUserId',
        success: false
      }, { status: 400 });
    }

    // In production, you would:
    // 1. Validate input data
    // 2. Insert into database with anonymousUserId
    // 3. Return created record

    const newCalculation: CalculationRecord = {
      id: `calc_${Date.now()}`,
      userId: anonymousUserId, // Use anonymous user ID
      createdAt: new Date().toISOString(),
      baseSalary,
      totalCompensation,
      currency,
      position: position || 'Unknown Position',
      company: company || 'Unknown Company',
      briefSummary: briefSummary || 'Compensation calculation',
      fullBreakdown: fullBreakdown || {
        baseSalary,
        bonuses: 0,
        benefits: 0,
        equity: 0,
        other: 0
      }
    };

    // Add to mock data (in production: save to database)
    mockCalculations.unshift(newCalculation);

    return NextResponse.json({
      success: true,
      record: {
        id: newCalculation.id,
        createdAt: newCalculation.createdAt,
        baseSalary: newCalculation.baseSalary,
        totalCompensation: newCalculation.totalCompensation,
        currency: newCalculation.currency,
        position: newCalculation.position,
        company: newCalculation.company,
        briefSummary: newCalculation.briefSummary
      },
      anonymousUserId: anonymousUserId
    }, { status: 201 });

  } catch (error) {
    console.error('Create calculation API error:', error);
    
    return NextResponse.json({
      error: 'Failed to save calculation',
      success: false
    }, { status: 500 });
  }
}
