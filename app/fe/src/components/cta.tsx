'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedChartCard from '@/components/ui/animated-chart-card';

export function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="section-no-gap relative overflow-hidden">
      {/* Content with proper spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-y-auto">
        <div className="text-center">
          <div 
            className={`inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 transition-all duration-700 ease-out transform hover:scale-105 hover:bg-white/30 group ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Ready to Get Started?
          </div>

          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Discover Your True Compensation Value
          </h2>

          <p 
            className={`text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Join thousands of professionals who have gained clarity on their compensation 
            with our AI-powered analysis platform. Start your free analysis today.
          </p>

          {/* Analytics Chart Card */}
          <div 
            className={`flex justify-center mb-12 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <AnimatedChartCard
              data={[
                { day: 'Mon', visitors: 0 },
                { day: 'Tue', visitors: 0 },
                { day: 'Wed', visitors: 0 },
                { day: 'Thu', visitors: 0 },
                { day: 'Fri', visitors: 0 },
                { day: 'Sat', visitors: 0 },
                { day: 'Sun', visitors: 0 },
              ]}
              title="Weekly Visitors (Live)"
              linkHref="/dashboard"
              linkText="View Full Analytics"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Trust indicators */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div 
              className="text-center transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 group"
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">0</div>
              <div className="text-blue-100 group-hover:text-blue-200 transition-colors duration-300">Professionals Analyzed</div>
            </div>
            <div 
              className="text-center transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 group"
              style={{ transitionDelay: '1200ms' }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors duration-300">$0</div>
              <div className="text-blue-100 group-hover:text-green-200 transition-colors duration-300">Compensation Optimized</div>
            </div>
            <div 
              className="text-center transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 group"
              style={{ transitionDelay: '1400ms' }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">0/5</div>
              <div className="text-blue-100 group-hover:text-purple-200 transition-colors duration-300">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
