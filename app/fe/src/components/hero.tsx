'use client';

import { Sparkles, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedChartCard from '@/components/ui/animated-chart-card';
import { useAnalytics } from '@/hooks/useAnalytics';
import { GitHubStarButton } from '@/components/github-star-button';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const [subtitleNumber, setSubtitleNumber] = useState(0);
  const { data: analyticsData, totalVisitors, totalPageviews, loading: analyticsLoading, source, error: analyticsError } = useAnalytics();

  const titles = useMemo(
    () => ["True", "Real", "Actual", "Complete", "Total"],
    []
  );

  const subtitles = useMemo(
    () => [
      "Get transparent, detailed analysis of your true cost-to-company with AI-powered insights, personalized email generation, and comprehensive compensation breakdowns.",
      "Unlock the hidden value of your compensation package with data-driven insights and personalized negotiation strategies.",
      "Discover what you're really worth with comprehensive analysis of your total compensation and market positioning.",
      "Transform your compensation discussions with AI-generated emails and detailed breakdowns of your true value.",
      "Navigate salary negotiations with confidence using our advanced compensation analysis and personalized tools."
    ],
    []
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (subtitleNumber === subtitles.length - 1) {
        setSubtitleNumber(0);
      } else {
        setSubtitleNumber(subtitleNumber + 1);
      }
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [subtitleNumber, subtitles]);

  return (
    <section className="section-no-gap relative overflow-hidden min-h-screen flex items-center">
      {/* GitHub Star Button - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <GitHubStarButton 
          repo="JustineDevs/CompenseTracker"
          className="shadow-2xl"
        />
      </div>

      {/* Content with proper spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 sm:py-40">
        <div className="text-center">
          {/* Analytics Chart Card */}
          <div 
            className={`flex justify-center mb-8 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {analyticsLoading ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-3xl w-xs flex items-center justify-center">
                <div className="text-white/70 text-sm">Loading analytics...</div>
              </div>
            ) : (
              <AnimatedChartCard
                data={analyticsData}
                title={`Weekly Visitors ${source === 'vercel' ? '(Live)' : source === 'fallback' ? '(Demo)' : '(Mock)'}`}
                linkHref="/dashboard"
                linkText="View Full Analytics"
                className="hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* Badge */}
          <div 
            className={`inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-12 border border-white/30 transition-all duration-700 ease-out transform hover:scale-105 hover:bg-white/30 group ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            AI-Powered Compensation Analysis
          </div>

          {/* Main Heading */}
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Discover Your{' '}
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title} Compensation
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheading */}
          <div 
            className={`text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="relative flex w-full justify-center overflow-hidden text-center min-h-[3rem]">
              {subtitles.map((subtitle, index) => (
                <motion.p
                  key={index}
                  className="absolute font-medium"
                  initial={{ opacity: 0, y: "100" }}
                  transition={{ type: "spring", stiffness: 30, damping: 20 }}
                  animate={
                    subtitleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: subtitleNumber > index ? 100 : -100,
                          opacity: 0,
                        }
                  }
                >
                  {subtitle}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Get Started Button */}
          <div 
            className={`flex justify-center transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Link
              href="/calculator"
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 group"
            >
              <span className="group-hover:tracking-wide transition-all duration-300">Get Started</span>
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
