'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calculator, DollarSign, Shield, Car, Home, Clock, User, Brain, CheckCircle, Globe } from 'lucide-react';
import { CompensationInput } from '@/types/compensation';
import { SUPPORTED_CURRENCIES, formatCurrency, getCurrencySymbol } from '@/utils/currency';
import { CurrencySelector } from '@/components/currency-selector';

const compensationSchema = z.object({
  // Currency preference
  currency: z.string().min(1, 'Currency is required'),
  
  // Base compensation
  baseSalary: z.number().min(0, 'Base salary must be positive'),
  performanceBonus: z.number().min(0, 'Performance bonus must be positive'),
  guaranteedIncrease: z.number().min(0, 'Guaranteed increase must be positive'),
  
  // Benefits
  healthInsurance: z.number().min(0, 'Health insurance must be positive'),
  dentalInsurance: z.number().min(0, 'Dental insurance must be positive'),
  visionInsurance: z.number().min(0, 'Vision insurance must be positive'),
  lifeInsurance: z.number().min(0, 'Life insurance must be positive'),
  disabilityInsurance: z.number().min(0, 'Disability insurance must be positive'),
  retirement401k: z.number().min(0, '401k contribution must be positive'),
  retirementMatch: z.number().min(0, '401k match must be positive'),
  
  // Government benefits
  socialSecurity: z.number().min(0, 'Social Security must be positive'),
  medicare: z.number().min(0, 'Medicare must be positive'),
  unemploymentInsurance: z.number().min(0, 'Unemployment insurance must be positive'),
  workersCompensation: z.number().min(0, 'Workers compensation must be positive'),
  
  // Real-life costs
  commutingCost: z.number().min(0, 'Commuting cost must be positive'),
  parkingCost: z.number().min(0, 'Parking cost must be positive'),
  fuelCost: z.number().min(0, 'Fuel cost must be positive'),
  foodCost: z.number().min(0, 'Food cost must be positive'),
  utilitiesCost: z.number().min(0, 'Utilities cost must be positive'),
  extraHoursCost: z.number().min(0, 'Extra hours cost must be positive'),
  
  // Additional factors
  riskFactor: z.number().min(0, 'Risk factor must be positive'),
  upkeepCost: z.number().min(0, 'Upkeep cost must be positive'),
  otherBenefits: z.number().min(0, 'Other benefits must be positive'),
  
  // Performance highlights (optional)
  performanceHighlights: z.string().optional(),
});

type CompensationFormData = z.infer<typeof compensationSchema>;

interface CompensationFormProps {
  onSubmit: (data: CompensationInput) => void;
  onPersonalize: (data: CompensationInput) => void;
  isLoading: boolean;
  isPersonalizing: boolean;
  initialData?: CompensationInput | null;
}

export function CompensationForm({ onSubmit, onPersonalize, isLoading, isPersonalizing, initialData }: CompensationFormProps) {
  const [activeSection, setActiveSection] = useState('base');
  const [isVisible, setIsVisible] = useState(false);
  const [personalizeData, setPersonalizeData] = useState({
    recipientName: '',
    recipientEmail: '',
    userName: '',
    userRole: '',
    companyName: '',
    personalNotes: '',
    priorities: [] as string[]
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CompensationFormData>({
    resolver: zodResolver(compensationSchema),
    defaultValues: initialData || {
      currency: 'USD',
      baseSalary: 0,
      performanceBonus: 0,
      guaranteedIncrease: 0,
      healthInsurance: 0,
      dentalInsurance: 0,
      visionInsurance: 0,
      lifeInsurance: 0,
      disabilityInsurance: 0,
      retirement401k: 0,
      retirementMatch: 0,
      socialSecurity: 0,
      medicare: 0,
      unemploymentInsurance: 0,
      workersCompensation: 0,
      commutingCost: 0,
      parkingCost: 0,
      fuelCost: 0,
      foodCost: 0,
      utilitiesCost: 0,
      extraHoursCost: 0,
      riskFactor: 0,
      upkeepCost: 0,
      otherBenefits: 0,
      performanceHighlights: '',
    },
  });

  // Watch currency for dynamic formatting
  const selectedCurrency = watch('currency');
  const currencySymbol = getCurrencySymbol(selectedCurrency);

  const sections = [
    { id: 'base', label: 'Base Compensation', icon: DollarSign },
    { id: 'benefits', label: 'Benefits', icon: Shield },
    { id: 'government', label: 'Government', icon: Shield },
    { id: 'costs', label: 'Real-life Costs', icon: Car },
    { id: 'additional', label: 'Additional', icon: Clock },
    { id: 'personalize', label: 'Personalize (Optional)', icon: User },
  ];

  // Auto-fill function
  const handleAutoFill = () => {
    setValue('baseSalary', 75000);
    setValue('performanceBonus', 5000);
    setValue('guaranteedIncrease', 3000);
    
    setValue('healthInsurance', 12000);
    setValue('dentalInsurance', 1200);
    setValue('visionInsurance', 600);
    setValue('lifeInsurance', 800);
    setValue('disabilityInsurance', 400);
    setValue('retirement401k', 6000);
    setValue('retirementMatch', 3000);
    
    setValue('socialSecurity', 4650);
    setValue('medicare', 1087.5);
    setValue('unemploymentInsurance', 420);
    setValue('workersCompensation', 750);
    
    setValue('commutingCost', 2400);
    setValue('parkingCost', 1200);
    setValue('fuelCost', 1800);
    setValue('foodCost', 3600);
    setValue('utilitiesCost', 1200);
    setValue('extraHoursCost', 2400);
    
    setValue('riskFactor', 1000);
    setValue('upkeepCost', 500);
    setValue('otherBenefits', 2000);
  };

  // Handle Tab key press for auto-fill
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleAutoFill();
    }
  };

  const onFormSubmit = (data: CompensationFormData) => {
    // Include personalization data if any is filled
    const hasPersonalData = Object.values(personalizeData).some(value => 
      Array.isArray(value) ? value.length > 0 : value.trim() !== ''
    );
    
    const formData = {
      ...data,
      ...(hasPersonalData && { personalDetails: personalizeData })
    } as any;
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-full flex flex-col overflow-hidden min-h-0">
      <div className="flex items-center space-x-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Compensation Details</h2>
      </div>

      {/* Section Navigation */}
      <div className="mb-3">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-shrink-0 flex items-center justify-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors min-w-fit ${
                activeSection === section.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <section.icon className="w-3 h-3 flex-shrink-0" />
              <span className="hidden xs:block text-xs whitespace-nowrap">{section.label}</span>
              <span className="xs:hidden text-xs">{section.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

                      <form onSubmit={handleSubmit(onFormSubmit)} onKeyDown={handleKeyDown} className="space-y-3 flex-1 overflow-y-auto">
        {/* Base Compensation */}
        {activeSection === 'base' && (
          <div 
            className={`space-y-2 transition-all duration-500 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-base font-medium text-gray-900">Base Compensation</h3>
            
            {/* Currency Selection for Base Compensation */}
            <div className="mb-3">
              <CurrencySelector
                value={watch('currency')}
                onChange={(currency) => setValue('currency', currency)}
                error={errors.currency?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div 
                className={`transition-all duration-500 ease-out transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Salary (Annual) - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('baseSalary', { valueAsNumber: true })}
                  className="input w-full py-1.5 text-sm hover:border-blue-400 focus:border-blue-500 transition-colors duration-300"
                  placeholder="75000"
                />
                {errors.baseSalary && (
                  <p className="text-sm text-red-600 mt-1">{errors.baseSalary.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Performance Bonus - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('performanceBonus', { valueAsNumber: true })}
                  className="input w-full py-1.5 text-sm"
                  placeholder="5000"
                />
                {errors.performanceBonus && (
                  <p className="text-sm text-red-600 mt-1">{errors.performanceBonus.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guaranteed Increase - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('guaranteedIncrease', { valueAsNumber: true })}
                  className="input w-full py-1.5 text-sm"
                  placeholder="3000"
                />
                {errors.guaranteedIncrease && (
                  <p className="text-sm text-red-600 mt-1">{errors.guaranteedIncrease.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Benefits */}
        {activeSection === 'benefits' && (
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">Benefits</h3>
            
            {/* Currency Selection for Benefits */}
            <div className="mb-3">
              <CurrencySelector
                value={watch('currency')}
                onChange={(currency) => setValue('currency', currency)}
                error={errors.currency?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Health Insurance - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('healthInsurance', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="12000"
                />
                {errors.healthInsurance && (
                  <p className="text-sm text-red-600 mt-1">{errors.healthInsurance.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dental Insurance - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('dentalInsurance', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="1200"
                />
                {errors.dentalInsurance && (
                  <p className="text-sm text-red-600 mt-1">{errors.dentalInsurance.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vision Insurance - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('visionInsurance', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="600"
                />
                {errors.visionInsurance && (
                  <p className="text-sm text-red-600 mt-1">{errors.visionInsurance.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  401k Contribution - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('retirement401k', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="6000"
                />
                {errors.retirement401k && (
                  <p className="text-sm text-red-600 mt-1">{errors.retirement401k.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  401k Match - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('retirementMatch', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="3000"
                />
                {errors.retirementMatch && (
                  <p className="text-sm text-red-600 mt-1">{errors.retirementMatch.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Government Benefits */}
        {activeSection === 'government' && (
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">Government Benefits</h3>
            
            {/* Currency Selection for Government Benefits */}
            <div className="mb-3">
              <CurrencySelector
                value={watch('currency')}
                onChange={(currency) => setValue('currency', currency)}
                error={errors.currency?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Security - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('socialSecurity', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="4650"
                />
                {errors.socialSecurity && (
                  <p className="text-sm text-red-600 mt-1">{errors.socialSecurity.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicare - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('medicare', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="1088"
                />
                {errors.medicare && (
                  <p className="text-sm text-red-600 mt-1">{errors.medicare.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unemployment Insurance - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('unemploymentInsurance', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="420"
                />
                {errors.unemploymentInsurance && (
                  <p className="text-sm text-red-600 mt-1">{errors.unemploymentInsurance.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Real-life Costs */}
        {activeSection === 'costs' && (
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">Real-life Costs</h3>
            
            {/* Currency Selection for Real-life Costs */}
            <div className="mb-3">
              <CurrencySelector
                value={watch('currency')}
                onChange={(currency) => setValue('currency', currency)}
                error={errors.currency?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commuting Cost (Monthly) - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('commutingCost', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="200"
                />
                {errors.commutingCost && (
                  <p className="text-sm text-red-600 mt-1">{errors.commutingCost.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parking Cost (Monthly) - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('parkingCost', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="100"
                />
                {errors.parkingCost && (
                  <p className="text-sm text-red-600 mt-1">{errors.parkingCost.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Cost (Monthly) - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('fuelCost', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="150"
                />
                {errors.fuelCost && (
                  <p className="text-sm text-red-600 mt-1">{errors.fuelCost.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Cost (Monthly) - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('foodCost', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="300"
                />
                {errors.foodCost && (
                  <p className="text-sm text-red-600 mt-1">{errors.foodCost.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Additional Factors */}
        {activeSection === 'additional' && (
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">Additional Factors</h3>
            
            {/* Currency Selection for Additional Factors */}
            <div className="mb-3">
              <CurrencySelector
                value={watch('currency')}
                onChange={(currency) => setValue('currency', currency)}
                error={errors.currency?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Factor - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('riskFactor', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="1000"
                />
                {errors.riskFactor && (
                  <p className="text-sm text-red-600 mt-1">{errors.riskFactor.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upkeep Cost - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('upkeepCost', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="500"
                />
                {errors.upkeepCost && (
                  <p className="text-sm text-red-600 mt-1">{errors.upkeepCost.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Benefits - {currencySymbol}
                </label>
                <input
                  type="number"
                  {...register('otherBenefits', { valueAsNumber: true })}
                  className="input w-full"
                  placeholder="2000"
                />
                {errors.otherBenefits && (
                  <p className="text-sm text-red-600 mt-1">{errors.otherBenefits.message}</p>
                )}
              </div>
            </div>
            
            {/* Performance Highlights Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Highlights (Optional)</h4>
              <p className="text-xs text-gray-600 mb-3">
                Describe your key achievements, contributions, and accomplishments. This will be used to enhance your email content.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Achievements & Contributions
                </label>
                <textarea
                  {...register('performanceHighlights')}
                  className="input w-full py-2 px-3 resize-none"
                  placeholder="e.g., Led the team that increased revenue by 25% last quarter, completed major project ahead of schedule, mentored 3 junior developers..."
                  rows={4}
                />
                {errors.performanceHighlights && (
                  <p className="text-sm text-red-600 mt-1">{errors.performanceHighlights.message}</p>
                )}
              </div>
              <div className="mt-2 text-xs text-blue-600 bg-blue-50 rounded p-2">
                <strong>💡 Tip:</strong> Include specific metrics, achievements, and contributions that demonstrate your value to the organization.
              </div>
            </div>
          </div>
        )}

        {/* Personalization Section */}
        {activeSection === 'personalize' && (
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">Personalize Your Email (Optional)</h3>
            <p className="text-xs text-gray-600 mb-3">
              Add personal details to make your email more personalized. All fields are optional.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <h4 className="text-xs font-semibold text-blue-900 mb-2 flex items-center">
                <Brain className="w-3 h-3 mr-1" />
                How AI Will Use Your Details
              </h4>
              <div className="text-xs text-blue-800 space-y-1">
                <p>• <strong>Names:</strong> Replace placeholders like "[Manager's Name]" with actual names</p>
                <p>• <strong>Role & Company:</strong> Add context like "As a Senior Engineer at TechCorp"</p>
                <p>• <strong>Personal Notes:</strong> Incorporate your achievements and specific points</p>
                <p>• <strong>Priorities:</strong> Address your key concerns in the negotiation strategy</p>
                <p>• <strong>Generate personalized emails</strong> for compensation discussions with your details</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={personalizeData.recipientName}
                    onChange={(e) => setPersonalizeData(prev => ({ ...prev, recipientName: e.target.value }))}
                    placeholder="e.g., John Smith"
                    className="input w-full text-sm py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={personalizeData.recipientEmail}
                    onChange={(e) => setPersonalizeData(prev => ({ ...prev, recipientEmail: e.target.value }))}
                    placeholder="e.g., john.smith@company.com"
                    className="input w-full text-sm py-1.5"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={personalizeData.userName}
                    onChange={(e) => setPersonalizeData(prev => ({ ...prev, userName: e.target.value }))}
                    placeholder="e.g., Jane Doe"
                    className="input w-full text-sm py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={personalizeData.userRole}
                    onChange={(e) => setPersonalizeData(prev => ({ ...prev, userRole: e.target.value }))}
                    placeholder="e.g., Software Engineer"
                    className="input w-full text-sm py-1.5"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={personalizeData.companyName}
                    onChange={(e) => setPersonalizeData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="e.g., TechCorp Inc."
                    className="input w-full text-sm py-1.5"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Personal Notes (Optional)
                </label>
                <textarea
                  value={personalizeData.personalNotes}
                  onChange={(e) => setPersonalizeData(prev => ({ ...prev, personalNotes: e.target.value }))}
                  placeholder="Any specific points you want to mention..."
                  rows={4}
                  className="input w-full text-sm py-2 px-3 resize-none"
                />
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                <h4 className="text-xs font-medium text-green-900 mb-1 flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  AI Email Preview
                </h4>
                <div className="text-xs text-green-800 space-y-0.5">
                  <p><strong>Dear {personalizeData.recipientName || '[Manager\'s Name]'},</strong></p>
                  <p><strong>From:</strong> {personalizeData.userName || '[Your Name]'}</p>
                  <p><strong>Context:</strong> {personalizeData.userRole || '[Your Role]'} at {personalizeData.companyName || '[Company Name]'}</p>
                  {personalizeData.personalNotes && (
                    <p><strong>Key Points:</strong> {personalizeData.personalNotes}</p>
                  )}
                  <p className="text-green-600 font-medium mt-1">✓ AI will generate personalized compensation email using these details</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-200 space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full py-3 text-base font-semibold"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Calculating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Calculate Compensation</span>
              </div>
            )}
          </button>
          
        </div>
      </form>

    </div>
  );
}
