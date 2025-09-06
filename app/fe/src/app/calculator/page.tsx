'use client';

import React, { useState, useEffect } from 'react';
import { CompensationForm } from '@/components/calculator/compensation-form';
import { CompensationResults } from '@/components/calculator/compensation-results';
import { AIInsights } from '@/components/calculator/ai-insights';
import { EmailGenerator } from '@/components/calculator/email-generator';
import { CalculatorErrorBoundary } from '@/components/calculator/calculator-error-boundary';
import { CompensationInput, CompensationBreakdown } from '@/types/compensation';
import { monitoring } from '@/services/monitoring';
import { formatCurrency } from '@/utils/currency';
import { getOrCreateAnonymousId } from '@/utils/anonymous-user';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [compensationData, setCompensationData] = useState<CompensationInput | null>(null);
  const [breakdown, setBreakdown] = useState<CompensationBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'results' | 'insights' | 'email'>('form');

  // Track page view
  useEffect(() => {
    monitoring.trackPageView('calculator');
  }, []);

  const handleCalculate = async (data: CompensationInput) => {
    const startTime = Date.now();
    setIsCalculating(true);
    setCompensationData(data);
    
    try {
      monitoring.trackAction('calculation_started', 'calculator', {
        hasPersonalDetails: !!data.personalDetails,
        inputKeys: Object.keys(data),
      });

      // Call API to calculate compensation breakdown
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const duration = Date.now() - startTime;
      
      if (!response.ok) {
        throw new Error('Failed to calculate compensation');
      }
      
      const result = await response.json();
      setBreakdown(result.breakdown);
      setCurrentStep('results');

      // Save calculation to user history with anonymous user ID
      try {
        const anonymousUserId = getOrCreateAnonymousId();
        
        await fetch('/api/user/calculations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            baseSalary: data.baseSalary,
            totalCompensation: result.breakdown.trueCostToCompany,
            currency: data.currency,
            position: data.personalDetails?.userRole || 'Unknown Position',
            company: data.personalDetails?.companyName || 'Unknown Company',
            briefSummary: `Base + ${Math.round(((result.breakdown.trueCostToCompany - data.baseSalary) / data.baseSalary) * 100)}% total benefits`,
            fullBreakdown: {
              baseSalary: data.baseSalary,
              bonuses: data.performanceBonus + data.guaranteedIncrease,
              benefits: result.breakdown.benefits,
              equity: 0, // Not tracked in current form
              other: result.breakdown.otherCosts
            },
            anonymousUserId: anonymousUserId
          }),
        });
        
        console.log('Calculation saved for anonymous user:', anonymousUserId);
      } catch (saveError) {
        console.warn('Failed to save calculation to history:', saveError);
        // Don't fail the calculation if history save fails
      }

      // Track successful calculation
      monitoring.trackCalculation(data, result.breakdown, duration);
      monitoring.trackAction('calculation_completed', 'calculator', {
        grossPay: result.breakdown.grossPay,
        trueCostToCompany: result.breakdown.trueCostToCompany,
        duration,
      });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('Error calculating compensation:', error);
      
      // Track calculation error
      monitoring.trackCalculation(data, null, duration, error as Error);
      monitoring.captureException(error as Error, {
        component: 'calculator',
        action: 'calculate_compensation',
        metadata: { inputKeys: Object.keys(data) },
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handlePersonalize = async (data: CompensationInput) => {
    setIsPersonalizing(true);
    setCompensationData(data);
    
    try {
      // First calculate compensation if not already done
      if (!breakdown) {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error('Failed to calculate compensation');
        }
        
        const result = await response.json();
        setBreakdown(result.breakdown);
      }
      
      // Navigate directly to email generation
      setCurrentStep('email');
    } catch (error) {
      console.error('Error personalizing email:', error);
      // Handle error - show error message to user
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleSaveProfile = async () => {
    // Profile saving is disabled for non-authenticated users
    // This could be replaced with local storage or other non-auth storage
    console.log('Profile saving is not available without authentication');
  };

  // Check if user can proceed to a step
  const canProceedToStep = (stepId: string) => {
    switch (stepId) {
      case 'form':
        return true; // Always can go back to form
      case 'results':
        return !!breakdown; // Can proceed if calculation is done
      case 'insights':
        return !!breakdown; // Can proceed if calculation is done
      case 'email':
        return !!breakdown; // Can proceed if calculation is done
      default:
        return false;
    }
  };

  // Handle step navigation
  const handleStepClick = (stepId: string) => {
    if (canProceedToStep(stepId)) {
      setCurrentStep(stepId as any);
    }
  };

  return (
    <CalculatorErrorBoundary
      onBack={() => setCurrentStep('form')}
      onRetry={() => {
        setCompensationData(null);
        setBreakdown(null);
        setCurrentStep('form');
      }}
    >
        <div className="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden">
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
            </Link>
          </div>
              
              {/* Header */}
        <div className="text-center py-2">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Compensation Calculator
          </h1>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            Get a detailed analysis of your true cost-to-company with AI-powered insights
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-6 py-2">
        {[
          { id: 'form', label: 'Input Data', active: currentStep === 'form' },
          { id: 'results', label: 'Results', active: currentStep === 'results' },
          { id: 'insights', label: 'AI Insights', active: currentStep === 'insights' },
          { id: 'email', label: 'Generate Email', active: currentStep === 'email' },
        ].map((step, index) => (
          <button
            key={step.id}
            onClick={() => handleStepClick(step.id as any)}
            className="flex items-center hover:opacity-80 transition-opacity"
            disabled={!canProceedToStep(step.id as any)}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                step.active
                  ? 'bg-blue-600 text-white'
                  : canProceedToStep(step.id as any)
                  ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-1 text-xs font-medium ${
                step.active 
                  ? 'text-blue-600' 
                  : canProceedToStep(step.id as any)
                  ? 'text-gray-500 hover:text-gray-700'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
            {index < 3 && (
              <div className="w-6 h-0.5 bg-gray-200 mx-2" />
            )}
          </button>
        ))}
      </div>

              {/* Modern Bento Grid Layout - Responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-12 grid-rows-1 gap-2 flex-1 h-full w-full px-2">
        {/* Left - Compensation Form */}
        <div className="xl:col-span-4 xl:row-span-1">
          <CompensationForm
            onSubmit={handleCalculate}
            onPersonalize={handlePersonalize}
            isLoading={isCalculating}
            isPersonalizing={isPersonalizing}
            initialData={compensationData}
          />
        </div>

        {/* Right - Quick Overview with All Components */}
        <div className="xl:col-span-8 xl:row-span-1">
          <div className="bg-white rounded-lg shadow-sm p-2 h-full overflow-y-auto">
            {currentStep === 'results' && breakdown && (
              <CompensationResults
                breakdown={breakdown}
                onNext={() => setCurrentStep('insights')}
                onSave={handleSaveProfile}
              />
            )}
            {currentStep === 'form' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-lg sm:text-xl font-bold text-blue-600">
                      {compensationData?.baseSalary ? formatCurrency(compensationData.baseSalary, compensationData.currency) : '0'}
                    </div>
                    <div className="text-sm text-gray-600">Base Salary</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-lg sm:text-xl font-bold text-green-600">
                      {breakdown?.benefits?.subtotal ? formatCurrency(breakdown.benefits.subtotal, breakdown.currency) : '0'}
                    </div>
                    <div className="text-sm text-gray-600">Total Benefits</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-lg sm:text-xl font-bold text-purple-600">
                      {breakdown?.trueCostToCompany ? formatCurrency(breakdown.trueCostToCompany, breakdown.currency) : '0'}
                    </div>
                    <div className="text-sm text-gray-600">True CTC</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-lg sm:text-xl font-bold text-orange-600">
                      {breakdown?.percentageBreakdown?.benefits ? `${breakdown.percentageBreakdown.benefits.toFixed(1)}%` : '0%'}
                    </div>
                    <div className="text-sm text-gray-600">Benefits Ratio</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-base sm:text-lg font-bold text-gray-800">
                      {breakdown?.grossPay ? formatCurrency(breakdown.grossPay, breakdown.currency) : '0'}
                    </div>
                    <div className="text-sm text-gray-600">Gross Pay</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-base sm:text-lg font-bold text-gray-800">
                      {breakdown?.netPay ? formatCurrency(breakdown.netPay, breakdown.currency) : '0'}
                    </div>
                    <div className="text-sm text-gray-600">Net Pay</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-base sm:text-lg font-bold text-gray-800">
                      {breakdown?.trueCostToCompany ? formatCurrency(breakdown.trueCostToCompany, breakdown.currency) : '0'}
                    </div>
                    <div className="text-sm text-gray-600">True CTC</div>
                  </div>
                </div>
              </>
            )}
            {currentStep === 'insights' && breakdown && (
              <AIInsights
                breakdown={breakdown}
                onNext={() => setCurrentStep('email')}
                onBack={() => setCurrentStep('results')}
              />
            )}
            {currentStep === 'email' && breakdown && compensationData && (
              <EmailGenerator
                breakdown={breakdown}
                compensationInput={compensationData}
                onBack={() => setCurrentStep('insights')}
                personalDetails={compensationData.personalDetails}
              />
            )}
          </div>
        </div>


        </div>
      </div>
    </CalculatorErrorBoundary>
  );
}