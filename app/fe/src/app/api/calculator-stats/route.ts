import { NextRequest, NextResponse } from 'next/server';

interface CalculatorStats {
  totalCalculations: number;
  totalUsers: number;
  averageSalary: number;
  mostPopularCurrency: string;
  calculationsByDay: { day: string; count: number }[];
  salaryRanges: { range: string; count: number }[];
  recentCalculations: {
    id: string;
    salary: number;
    currency: string;
    timestamp: string;
  }[];
}

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data based on calculator interactions
    // In a real app, this would fetch from your database
    const mockStats: CalculatorStats = {
      totalCalculations: 0, // Will be updated when users start using calculator
      totalUsers: 0,
      averageSalary: 0,
      mostPopularCurrency: 'USD',
      calculationsByDay: [
        { day: 'M', count: 0 },
        { day: 'T', count: 0 },
        { day: 'W', count: 0 },
        { day: 'T', count: 0 },
        { day: 'F', count: 0 },
        { day: 'S', count: 0 },
        { day: 'S', count: 0 },
      ],
      salaryRanges: [
        { range: '$0-50k', count: 0 },
        { range: '$50k-100k', count: 0 },
        { range: '$100k-150k', count: 0 },
        { range: '$150k+', count: 0 },
      ],
      recentCalculations: []
    };

    return NextResponse.json({
      data: mockStats,
      source: 'calculator-interactions',
      message: 'No calculator interactions yet - data will appear when users start using the calculator'
    });

  } catch (error) {
    console.error('Calculator stats API error:', error);
    
    return NextResponse.json({
      data: null,
      source: 'error',
      message: 'Failed to fetch calculator statistics'
    }, { status: 500 });
  }
}
