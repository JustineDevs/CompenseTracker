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
    // Get Vercel Analytics data
    const vercelToken = process.env.VERCEL_ANALYTICS_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    
    if (!vercelToken || !projectId) {
      // Return mock data if Vercel Analytics is not configured
      const mockData: VercelAnalyticsData[] = [
        { day: 'M', visitors: 45, pageviews: 67, bounceRate: 0.32 },
        { day: 'T', visitors: 78, pageviews: 112, bounceRate: 0.28 },
        { day: 'W', visitors: 92, pageviews: 134, bounceRate: 0.31 },
        { day: 'T', visitors: 156, pageviews: 201, bounceRate: 0.25 },
        { day: 'F', visitors: 203, pageviews: 267, bounceRate: 0.29 },
        { day: 'S', visitors: 187, pageviews: 245, bounceRate: 0.33 },
        { day: 'S', visitors: 234, pageviews: 298, bounceRate: 0.27 },
      ];

      const totalVisitors = mockData.reduce((sum, item) => sum + item.visitors, 0);
      const totalPageviews = mockData.reduce((sum, item) => sum + item.pageviews, 0);

      return NextResponse.json({
        data: mockData,
        totalVisitors,
        totalPageviews,
        period: 'Last 7 days',
        source: 'mock'
      });
    }

    // Fetch real Vercel Analytics data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const vercelApiUrl = `https://vercel.com/api/v1/analytics/${projectId}`;
    
    const response = await fetch(vercelApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      // Add query parameters for date range and metrics
      // Note: Vercel Analytics API structure may vary
    });

    if (!response.ok) {
      throw new Error(`Vercel Analytics API error: ${response.status}`);
    }

    const vercelData = await response.json();
    
    // Transform Vercel data to our format
    const transformedData: VercelAnalyticsData[] = vercelData.data?.map((item: any, index: number) => ({
      day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index] || 'N',
      visitors: item.visitors || 0,
      pageviews: item.pageviews || 0,
      bounceRate: item.bounceRate || 0,
    })) || [];

    const totalVisitors = transformedData.reduce((sum, item) => sum + item.visitors, 0);
    const totalPageviews = transformedData.reduce((sum, item) => sum + item.pageviews, 0);

    return NextResponse.json({
      data: transformedData,
      totalVisitors,
      totalPageviews,
      period: 'Last 7 days',
      source: 'vercel'
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    
    // Fallback to mock data on error
    const mockData: VercelAnalyticsData[] = [
      { day: 'M', visitors: 45, pageviews: 67, bounceRate: 0.32 },
      { day: 'T', visitors: 78, pageviews: 112, bounceRate: 0.28 },
      { day: 'W', visitors: 92, pageviews: 134, bounceRate: 0.31 },
      { day: 'T', visitors: 156, pageviews: 201, bounceRate: 0.25 },
      { day: 'F', visitors: 203, pageviews: 267, bounceRate: 0.29 },
      { day: 'S', visitors: 187, pageviews: 245, bounceRate: 0.33 },
      { day: 'S', visitors: 234, pageviews: 298, bounceRate: 0.27 },
    ];

    const totalVisitors = mockData.reduce((sum, item) => sum + item.visitors, 0);
    const totalPageviews = mockData.reduce((sum, item) => sum + item.pageviews, 0);

    return NextResponse.json({
      data: mockData,
      totalVisitors,
      totalPageviews,
      period: 'Last 7 days',
      source: 'fallback'
    });
  }
}
