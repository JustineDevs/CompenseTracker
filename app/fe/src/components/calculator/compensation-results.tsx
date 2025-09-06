'use client';

import { CompensationBreakdown } from '@/types/compensation';
import { formatCurrency } from '@/utils/currency';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3,
  Download,
  Save,
  ArrowRight
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface CompensationResultsProps {
  breakdown: CompensationBreakdown;
  onNext: () => void;
  onSave: () => void;
}

export function CompensationResults({ breakdown, onNext, onSave }: CompensationResultsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    grossPay: 0,
    netPay: 0,
    trueCostToCompany: 0,
    baseCompensation: 0,
    benefits: 0,
    governmentBenefits: 0,
    realLifeCosts: 0,
    additionalFactors: 0,
  });

  const pieData = [
    { name: 'Base Compensation', value: breakdown.percentageBreakdown.baseCompensation, color: '#3B82F6' },
    { name: 'Benefits', value: breakdown.percentageBreakdown.benefits, color: '#10B981' },
    { name: 'Government', value: breakdown.percentageBreakdown.governmentBenefits, color: '#F59E0B' },
    { name: 'Real-life Costs', value: breakdown.percentageBreakdown.realLifeCosts, color: '#EF4444' },
    { name: 'Additional', value: breakdown.percentageBreakdown.additionalFactors, color: '#8B5CF6' },
  ];

  // Animation effect on mount
  useEffect(() => {
    setIsVisible(true);
    
    // Animate values with staggered timing
    const animateValues = () => {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        setAnimatedValues({
          grossPay: breakdown.grossPay * easeOut,
          netPay: breakdown.netPay * easeOut,
          trueCostToCompany: breakdown.trueCostToCompany * easeOut,
          baseCompensation: breakdown.percentageBreakdown.baseCompensation * easeOut,
          benefits: breakdown.percentageBreakdown.benefits * easeOut,
          governmentBenefits: breakdown.percentageBreakdown.governmentBenefits * easeOut,
          realLifeCosts: breakdown.percentageBreakdown.realLifeCosts * easeOut,
          additionalFactors: breakdown.percentageBreakdown.additionalFactors * easeOut,
        });
        
        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };
    
    const timer = setTimeout(animateValues, 300);
    return () => clearTimeout(timer);
  }, [breakdown]);

  const barData = [
    { name: 'Gross Pay', value: breakdown.grossPay },
    { name: 'Net Pay', value: breakdown.netPay },
    { name: 'True CTC', value: breakdown.trueCostToCompany },
  ];

  const formatCurrencyAmount = (amount: number) => {
    return formatCurrency(amount, breakdown.currency);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-2">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div 
          className={`bg-gray-50 rounded-lg p-2 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } hover:shadow-lg hover:scale-105 hover:bg-blue-50 group`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Gross Pay</p>
              <p className="text-sm font-bold text-gray-900 group-hover:text-blue-800 transition-colors">
                {formatCurrencyAmount(animatedValues.grossPay)}
              </p>
            </div>
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
              <DollarSign className="w-3 h-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
            </div>
          </div>
        </div>

        <div 
          className={`bg-gray-50 rounded-lg p-2 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } hover:shadow-lg hover:scale-105 hover:bg-green-50 group`}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 group-hover:text-green-600 transition-colors">Net Pay</p>
              <p className="text-sm font-bold text-gray-900 group-hover:text-green-800 transition-colors">
                {formatCurrencyAmount(animatedValues.netPay)}
              </p>
            </div>
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="w-3 h-3 text-green-600 group-hover:text-green-700 transition-colors" />
            </div>
          </div>
        </div>

        <div 
          className={`bg-gray-50 rounded-lg p-2 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } hover:shadow-lg hover:scale-105 hover:bg-purple-50 group`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 group-hover:text-purple-600 transition-colors">True Cost to Company</p>
              <p className="text-sm font-bold text-gray-900 group-hover:text-purple-800 transition-colors">
                {formatCurrencyAmount(animatedValues.trueCostToCompany)}
              </p>
            </div>
            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
              <BarChart3 className="w-3 h-3 text-purple-600 group-hover:text-purple-700 transition-colors" />
            </div>
          </div>
        </div>
      </div>

                     {/* Action Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-2 justify-between items-center pt-2 border-t border-gray-200 mb-4 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex space-x-2">
            <button
              onClick={onSave}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2 hover:scale-105 hover:shadow-md transition-all duration-300 group"
            >
              <Save className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
              <span>Save Profile</span>
            </button>
            <button className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2 hover:scale-105 hover:shadow-md transition-all duration-300 group">
              <Download className="w-3 h-3 group-hover:translate-y-[-2px] transition-transform duration-300" />
              <span>Export PDF</span>
            </button>
          </div>
          <button
            onClick={onNext}
            className="btn btn-primary flex items-center space-x-1 text-xs py-1 px-2 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
          >
            <span>Get AI Insights</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Compensation Breakdown - Bar Chart Only */}
        <div 
          className={`bg-gray-50 rounded-lg p-4 mb-4 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } hover:shadow-lg transition-shadow duration-300`}
          style={{ transitionDelay: '900ms' }}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Compensation Breakdown</h3>
          
          {/* Bar Chart */}
          <div className="h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => formatCurrencyAmount(Number(value))} />
                <Bar 
                  dataKey="value" 
                  fill="#3B82F6" 
                  className="hover:fill-blue-600 transition-colors duration-300"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2">
            {pieData.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between text-sm transition-all duration-500 ease-out transform hover:scale-105 hover:bg-white hover:shadow-sm hover:px-2 hover:py-1 hover:rounded-md group ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
                }`}
                style={{ transitionDelay: `${1200 + (index * 100)}ms` }}
              >
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {formatPercentage(animatedValues[item.name.toLowerCase().replace(/\s+/g, '') as keyof typeof animatedValues] || item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Breakdown - Bento Grid Design */}
        <div 
          className={`bg-gray-50 rounded-lg p-4 transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } hover:shadow-lg transition-shadow duration-300`}
          style={{ transitionDelay: '1800ms' }}
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Detailed Breakdown</h3>
          
          {/* Bento Grid Layout - 2x3 Grid */}
          <div className="grid grid-cols-2 grid-rows-3 gap-3 h-48">
            {/* Base Compensation - Top Left */}
            <div 
              className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '2000ms' }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-blue-200 rounded-bl-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-blue-600 font-medium mb-1 group-hover:text-blue-700 transition-colors">Base Compensation</div>
                <div className="text-lg font-bold text-blue-800 group-hover:text-blue-900 transition-colors">
                  {formatPercentage(animatedValues.baseCompensation)}
                </div>
                <div className="text-sm text-blue-700 group-hover:text-blue-800 transition-colors">
                  {formatCurrencyAmount(breakdown?.baseCompensation.subtotal || 0)}
                </div>
              </div>
            </div>

            {/* Benefits - Top Right */}
            <div 
              className={`bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '2200ms' }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-green-200 rounded-bl-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-green-600 font-medium mb-1 group-hover:text-green-700 transition-colors">Benefits</div>
                <div className="text-lg font-bold text-green-800 group-hover:text-green-900 transition-colors">
                  {formatPercentage(animatedValues.benefits)}
                </div>
                <div className="text-sm text-green-700 group-hover:text-green-800 transition-colors">
                  {formatCurrencyAmount(breakdown?.benefits.subtotal || 0)}
                </div>
              </div>
            </div>

            {/* Real-life Costs - Middle Left */}
            <div 
              className={`bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '2400ms' }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-red-200 rounded-bl-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-red-600 font-medium mb-1 group-hover:text-red-700 transition-colors">Real-life Costs</div>
                <div className="text-lg font-bold text-red-800 group-hover:text-red-900 transition-colors">
                  {formatPercentage(animatedValues.realLifeCosts)}
                </div>
                <div className="text-sm text-red-700 group-hover:text-red-800 transition-colors">
                  {formatCurrencyAmount(breakdown?.realLifeCosts.subtotal || 0)}
                </div>
              </div>
            </div>

            {/* Additional - Middle Right */}
            <div 
              className={`bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-3 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '2600ms' }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-200 rounded-bl-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-yellow-600 font-medium mb-1 group-hover:text-yellow-700 transition-colors">Additional</div>
                <div className="text-lg font-bold text-yellow-800 group-hover:text-yellow-900 transition-colors">
                  {formatPercentage(animatedValues.additionalFactors)}
                </div>
                <div className="text-sm text-yellow-700 group-hover:text-yellow-800 transition-colors">
                  {formatCurrencyAmount(breakdown?.additionalFactors.subtotal || 0)}
                </div>
                <div className="text-xs text-yellow-600 mt-1 group-hover:text-yellow-700 transition-colors">BENTO LAYOUT</div>
              </div>
            </div>

            {/* Total - Bottom Left */}
            <div 
              className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '2800ms' }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-gray-200 rounded-bl-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-gray-600 font-medium mb-1 group-hover:text-gray-700 transition-colors">Total</div>
                <div className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">100%</div>
                <div className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                  {formatCurrencyAmount(breakdown?.trueCostToCompany || 0)}
                </div>
              </div>
            </div>

            {/* Government - Bottom Right */}
            <div 
              className={`bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 relative overflow-hidden transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-lg group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '3000ms' }}
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-orange-200 rounded-bl-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10">
                <div className="text-xs text-orange-600 font-medium mb-1 group-hover:text-orange-700 transition-colors">Government</div>
                <div className="text-lg font-bold text-orange-800 group-hover:text-orange-900 transition-colors">
                  {formatPercentage(animatedValues.governmentBenefits)}
                </div>
                <div className="text-sm text-orange-700 group-hover:text-orange-800 transition-colors">
                  {formatCurrencyAmount(breakdown?.governmentBenefits.subtotal || 0)}
                </div>
              </div>
            </div>
          </div>
       </div>


    </div>
  );
}
