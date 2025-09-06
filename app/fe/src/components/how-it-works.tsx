'use client';

import { 
  User, 
  Calculator, 
  Brain, 
  Mail, 
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  {
    step: 1,
    icon: User,
    title: 'Input Your Details',
    description: 'Enter your base salary, bonuses, benefits, and real-life cost factors like commuting and living expenses.',
    details: [
      'Base salary and performance bonuses',
      'Health insurance and other benefits',
      'Government-mandated benefits',
      'Commuting and transportation costs',
      'Living expenses and utilities'
    ]
  },
  {
    step: 2,
    icon: Calculator,
    title: 'AI Analysis & Calculation',
    description: 'Our advanced AI processes your data to calculate true cost-to-company with detailed breakdowns.',
    details: [
      'Comprehensive compensation analysis',
      'Hidden cost identification',
      'True cost-to-company calculation',
      'Percentage breakdown by category',
      'Visual data representation'
    ]
  },
  {
    step: 3,
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations and optimization tips powered by multiple AI models.',
    details: [
      'Compensation optimization suggestions',
      'Market comparison insights',
      'Negotiation strategy recommendations',
      'Career growth advice',
      'Industry-specific insights'
    ]
  },
  {
    step: 4,
    icon: Mail,
    title: 'Generate & Share',
    description: 'Create professional emails and reports to share your compensation analysis with stakeholders.',
    details: [
      'AI-generated email templates',
      'Professional report generation',
      'PDF and CSV export options',
      'Shareable dashboard links',
      'Automated follow-up suggestions'
    ]
  }
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="how-it-works" className="section-no-gap relative overflow-hidden">
      {/* Content with proper spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 
            className={`text-4xl sm:text-5xl font-bold text-white mb-6 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            How It Works
          </h2>
          <p 
            className={`text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Get started in minutes with our simple 4-step process that transforms 
            your compensation data into actionable insights.
          </p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop - centered on icons */}
          <div 
            className={`hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-white/30 via-white/50 to-white/30 transition-all duration-1000 ease-out ${
              isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          ></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.step} 
                className={`relative transition-all duration-700 ease-out transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + (index * 200)}ms` }}
              >
                {/* Step number and icon */}
                <div className="flex flex-col items-center mb-6 group">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-4 border-white/30 group-hover:bg-white/30 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                      <step.icon className="w-8 h-8 text-white group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white/50 group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300">
                      {step.step}
                    </div>
                  </div>
                </div>

                {/* Step content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 mb-4 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                    {step.description}
                  </p>
                  
                  {/* Step details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div 
                        key={detailIndex} 
                        className={`flex items-start space-x-2 text-sm text-gray-200 transition-all duration-500 ease-out transform ${
                          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'
                        }`}
                        style={{ transitionDelay: `${1000 + (index * 200) + (detailIndex * 100)}ms` }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-300 mt-0.5 flex-shrink-0 group-hover:text-green-200 transition-colors duration-300" />
                        <span className="group-hover:text-gray-100 transition-colors duration-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div 
                    className={`lg:hidden flex justify-center mt-8 transition-all duration-500 ease-out transform ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${1200 + (index * 200)}ms` }}
                  >
                    <div className="w-6 h-6 text-white/60 flex items-center justify-center hover:text-white/80 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
