import { useState, useEffect } from 'react';

interface AnalyticsData {
  day: string;
  visitors: number;
  pageviews?: number;
  bounceRate?: number;
}

interface AnalyticsResponse {
  data: AnalyticsData[];
  totalVisitors: number;
  totalPageviews?: number;
  period: string;
  source: 'vercel' | 'mock' | 'fallback';
}

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [totalPageviews, setTotalPageviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'vercel' | 'mock' | 'fallback'>('mock');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/analytics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add cache control for real-time data
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const analyticsData: AnalyticsResponse = await response.json();
        
        setData(analyticsData.data);
        setTotalVisitors(analyticsData.totalVisitors);
        setTotalPageviews(analyticsData.totalPageviews || 0);
        setSource(analyticsData.source);
        
        console.log('Analytics data fetched:', {
          source: analyticsData.source,
          totalVisitors: analyticsData.totalVisitors,
          period: analyticsData.period
        });

      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics fetch error:', err);
        
        // Fallback to mock data on error
        const mockData: AnalyticsData[] = [
          { day: 'M', visitors: 45, pageviews: 67, bounceRate: 0.32 },
          { day: 'T', visitors: 78, pageviews: 112, bounceRate: 0.28 },
          { day: 'W', visitors: 92, pageviews: 134, bounceRate: 0.31 },
          { day: 'T', visitors: 156, pageviews: 201, bounceRate: 0.25 },
          { day: 'F', visitors: 203, pageviews: 267, bounceRate: 0.29 },
          { day: 'S', visitors: 187, pageviews: 245, bounceRate: 0.33 },
          { day: 'S', visitors: 234, pageviews: 298, bounceRate: 0.27 },
        ];
        
        setData(mockData);
        setTotalVisitors(mockData.reduce((sum, item) => sum + item.visitors, 0));
        setTotalPageviews(mockData.reduce((sum, item) => sum + (item.pageviews || 0), 0));
        setSource('fallback');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    data,
    totalVisitors,
    totalPageviews,
    loading,
    error,
    source,
    period: 'Last 7 days'
  };
};

// For Vercel Analytics integration, you would use something like:
/*
export const useVercelAnalytics = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVercelAnalytics = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/vercel-analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Vercel Analytics API parameters
            projectId: process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID,
            // Add other required parameters
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError('Failed to fetch Vercel analytics');
        console.error('Vercel Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVercelAnalytics();
  }, []);

  return { data, loading, error };
};
*/
