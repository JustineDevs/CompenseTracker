'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Settings, 
  Plus,
  Download,
  Share2,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  Activity
} from 'lucide-react';
import { RecentCalculations } from '@/components/dashboard/recent-calculations';

interface Calculation {
  id: string;
  title: string;
  baseSalary: number;
  totalCTC: number;
  createdAt: string;
  lastModified: string;
}

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

const mockCalculations: Calculation[] = [
  {
    id: '1',
    title: 'Software Engineer - Current Role',
    baseSalary: 75000,
    totalCTC: 101000,
    createdAt: '2024-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '2',
    title: 'Senior Developer - New Offer',
    baseSalary: 95000,
    totalCTC: 128000,
    createdAt: '2024-01-18',
    lastModified: '2024-01-19'
  },
  {
    id: '3',
    title: 'Tech Lead - Promotion',
    baseSalary: 110000,
    totalCTC: 145000,
    createdAt: '2024-01-10',
    lastModified: '2024-01-12'
  }
];

export default function DashboardPage() {
  const [calculations] = useState<Calculation[]>(mockCalculations);
  const [isVisible, setIsVisible] = useState(false);
  const [calculatorStats, setCalculatorStats] = useState<CalculatorStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchCalculatorStats();
  }, []);

  const fetchCalculatorStats = async () => {
    try {
      setStatsLoading(true);
      const response = await fetch('/api/calculator-stats');
      const data = await response.json();
      setCalculatorStats(data.data);
    } catch (error) {
      console.error('Failed to fetch calculator stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">CompenseTracker</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/calculator"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Calculation</span>
              </Link>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div 
          className={`mb-8 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Welcome back!</h1>
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Manage your compensation calculations and track your progress.</p>
        </div>

        {/* Calculator Stats Section */}
        <div 
          className={`mb-8 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Calculator Analytics</h2>
                  <p className="text-gray-600 text-sm">Real-time usage statistics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-gray-600">Live data</span>
              </div>
            </div>

            {statsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500">Loading calculator stats...</div>
              </div>
            ) : calculatorStats ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{calculatorStats.totalCalculations}</div>
                  <div className="text-sm text-blue-700 flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Total Calculations
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">{calculatorStats.totalUsers}</div>
                  <div className="text-sm text-green-700 flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    Active Users
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {calculatorStats.averageSalary > 0 ? `$${(calculatorStats.averageSalary / 1000).toFixed(0)}k` : '$0'}
                  </div>
                  <div className="text-sm text-purple-700 flex items-center justify-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Avg Salary
                  </div>
                </div>
                <div className="text-center p-4 rounded-xl bg-orange-50 border border-orange-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{calculatorStats.mostPopularCurrency}</div>
                  <div className="text-sm text-orange-700 flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Popular Currency
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No calculator data available yet
              </div>
            )}
          </div>
        </div>


        {/* Recent Calculations - Functional Transaction History */}
        <RecentCalculations />

        {/* Quick Actions */}
        <div 
          className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1400ms' }}
        >
          <Link
            href="/calculator"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-blue-200 hover:scale-105 group"
            style={{ transitionDelay: '1600ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Plus className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">New Calculation</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Start a new compensation analysis</p>
              </div>
            </div>
          </Link>

          <Link
            href="/templates"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-green-200 hover:scale-105 group"
            style={{ transitionDelay: '1700ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                <FileText className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Templates</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Use pre-built calculation templates</p>
              </div>
            </div>
          </Link>

          <Link
            href="/analytics"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-purple-200 hover:scale-105 group"
            style={{ transitionDelay: '1800ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Analytics</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">View detailed compensation insights</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
