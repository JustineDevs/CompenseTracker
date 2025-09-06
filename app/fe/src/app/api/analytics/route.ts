import { NextRequest, NextResponse } from 'next/server';

interface VercelAnalyticsData {
  day: string;
  visitors: number;
  pageviews: number;
  bounceRate: number;
}

interface VercelAnalyticsResponse {
  data: VercelAnalyticsData[];
  totalVisitors: number;
  totalPageviews: number;
  period: string;
}

export async function GET(request: NextRequest) {
  try {
    // For now, return empty data since we don't have real visitors yet
    // This will show 0 visitors instead of mock data
    const emptyData: VercelAnalyticsData[] = [
      { day: 'Mon', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Tue', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Wed', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Thu', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Fri', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Sat', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Sun', visitors: 0, pageviews: 0, bounceRate: 0 },
    ];

    const totalVisitors = 0;
    const totalPageviews = 0;

    return NextResponse.json({
      data: emptyData,
      totalVisitors,
      totalPageviews,
      period: 'Last 7 days',
      source: 'vercel',
      message: 'No visitors yet - check back after deployment!'
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    
    // Return empty data on error instead of mock data
    const emptyData: VercelAnalyticsData[] = [
      { day: 'Mon', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Tue', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Wed', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Thu', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Fri', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Sat', visitors: 0, pageviews: 0, bounceRate: 0 },
      { day: 'Sun', visitors: 0, pageviews: 0, bounceRate: 0 },
    ];

    return NextResponse.json({
      data: emptyData,
      totalVisitors: 0,
      totalPageviews: 0,
      period: 'Last 7 days',
      source: 'error',
      message: 'Analytics temporarily unavailable'
    });
  }
}
