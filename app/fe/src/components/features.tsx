'use client';

import { 
  Calculator, 
  Mail, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Zap,
  DollarSign,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Calculator,
    title: 'Detailed Compensation Analysis',
    description: 'Comprehensive breakdown of base salary, bonuses, benefits, and allowances with transparent calculations.',
  },
  {
    icon: DollarSign,
    title: 'True Cost-to-Company',
    description: 'Calculate the real cost your employer pays, including hidden expenses and government benefits.',
  },
  {
    icon: BarChart3,
    title: 'Visual Data Insights',
    description: 'Interactive charts and graphs to understand your compensation structure at a glance.',
  },
  {
    icon: Mail,
    title: 'AI-Powered Email Generation',
    description: 'Generate personalized emails for compensation discussions with AI assistance.',
  },
  {
    icon: FileText,
    title: 'Export & Reports',
    description: 'Download detailed reports in PDF or CSV format for your records and negotiations.',
  },
  {
    icon: Shield,
    title: 'Secure Data Storage',
    description: 'Your compensation data is encrypted and stored securely with enterprise-grade security.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Access your compensation analysis anywhere with our fully responsive design.',
  },
  {
    icon: Users,
    title: 'Multiple Profiles',
    description: 'Save and manage multiple compensation profiles for different roles or offers.',
  },
  {
    icon: TrendingUp,
    title: 'Optimization Tips',
    description: 'Get AI-driven recommendations to optimize your compensation package.',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Live calculations and instant updates as you modify your compensation details.',
  },
];

export function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="features" className="section-no-gap relative overflow-hidden">
      {/* Content with proper spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Powerful Features for Compensation Analysis
          </h2>
          <p 
            className={`text-xl text-gray-200 max-w-3xl mx-auto transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Everything you need to understand, analyze, and optimize your compensation package 
            with cutting-edge AI technology and comprehensive data insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:shadow-lg transition-all duration-500 border border-white/20 hover:border-white/30 transform hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + (index * 100)}ms` }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-white group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
