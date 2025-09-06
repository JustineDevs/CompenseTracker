'use client';

import React, { useEffect, useState } from 'react';
import { 
  Calculator, 
  Calendar, 
  DollarSign, 
  Building, 
  Briefcase,
  TrendingUp,
  Clock,
  AlertCircle,
  Info
} from 'lucide-react';
import { getOrCreateAnonymousId, getAnonymousUserInfo } from '@/utils/anonymous-user';

interface CalculationRecord {
  id: string;
  createdAt: string;
  baseSalary: number;
  totalCompensation: number;
  currency: string;
  position: string;
  company: string;
  briefSummary: string;
}

interface RecentCalculationsProps {
  className?: string;
}

export function RecentCalculations({ className = '' }: RecentCalculationsProps) {
  const [calculations, setCalculations] = useState<CalculationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    fetchCalculations();
  }, []);

  const fetchCalculations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get or create anonymous user ID
      const anonymousUserId = getOrCreateAnonymousId();
      
      const response = await fetch(`/api/user/calculations?limit=5&anonymousUserId=${anonymousUserId}`);
      if (!response.ok) {
        throw new Error('Failed to load calculations');
      }
      
      const data = await response.json();
      setCalculations(data.records || []);
    } catch (err) {
      console.error('Failed to fetch calculations:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div 
        className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-700 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${className}`}
        style={{ transitionDelay: '600ms' }}
      >
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading recent calculations...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-700 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        } ${className}`}
        style={{ transitionDelay: '600ms' }}
      >
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{ transitionDelay: '600ms' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Recent Calculations</h2>
            <p className="text-gray-600 text-sm">Your compensation analysis history</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">Transaction History</span>
        </div>
      </div>

      {/* Calculations List */}
      {calculations.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No calculations yet</h3>
          <p className="text-gray-600 mb-6">Start analyzing your compensation to see your history here.</p>
          <a
            href="/calculator"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Start Analysis
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {calculations.map((calc, index) => (
            <div
              key={calc.id}
              className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors duration-200"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{calc.position}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{calc.company}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-600">Base Salary:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {formatCurrency(calc.baseSalary, calc.currency)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="text-sm text-gray-600">Total Comp:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {formatCurrency(calc.totalCompensation, calc.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{calc.briefSummary}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(calc.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(calc.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Read-only indicator */}
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Read Only</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {calculations.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {calculations.length} recent calculations</span>
            <span className="text-gray-400">All data is read-only for security</span>
          </div>
        </div>
      )}

      {/* Anonymous User Notice */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Anonymous Session</p>
            <p className="text-xs">
              Your calculations are saved locally. Clearing browser data will remove your history. 
              No personal information is collected.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
