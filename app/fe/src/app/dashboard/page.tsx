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
  DollarSign
} from 'lucide-react';

interface Calculation {
  id: string;
  title: string;
  baseSalary: number;
  totalCTC: number;
  createdAt: string;
  lastModified: string;
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

        {/* Stats Cards */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            style={{ transitionDelay: '600ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Calculator className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Total Calculations</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{calculations.length}</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            style={{ transitionDelay: '700ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Highest CTC</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  {formatCurrency(Math.max(...calculations.map(c => c.totalCTC)))}
                </p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            style={{ transitionDelay: '800ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <DollarSign className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Average CTC</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  {formatCurrency(calculations.reduce((sum, c) => sum + c.totalCTC, 0) / calculations.length)}
                </p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            style={{ transitionDelay: '900ms' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                <Calendar className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">This Month</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {calculations.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Calculations */}
        <div 
          className={`bg-white rounded-lg shadow-sm transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Recent Calculations</h2>
              <Link
                href="/calculator"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:scale-105 transition-all duration-300"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {calculations.map((calculation, index) => (
              <div 
                key={calculation.id} 
                className={`p-6 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] group ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${1200 + (index * 100)}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{calculation.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 group-hover:bg-green-200 transition-colors duration-300">
                        Active
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                        <DollarSign className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                        <span>Base: {formatCurrency(calculation.baseSalary)}</span>
                      </div>
                      <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                        <TrendingUp className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                        <span>Total CTC: {formatCurrency(calculation.totalCTC)}</span>
                      </div>
                      <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                        <Calendar className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-300" />
                        <span>Modified: {formatDate(calculation.lastModified)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-300">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-300">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-300">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-600 hover:scale-110 transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-out transform ${
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
