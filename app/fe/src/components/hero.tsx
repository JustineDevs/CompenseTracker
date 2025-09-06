'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitHubStarButton } from '@/components/github-star-button';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [titleNumber, setTitleNumber] = useState(0);
  const [subtitleNumber, setSubtitleNumber] = useState(0);

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
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <GitHubStarButton 
          repo="JustineDevs/CompenseTracker"
          className="shadow-2xl scale-75 sm:scale-100"
        />
      </div>

      {/* Content with proper spacing and scrolling */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full py-16 sm:py-20 md:py-24 overflow-y-auto max-h-screen">
        <div className="text-center">

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
            className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3">
              <span className="whitespace-nowrap">Discover Your</span>
              <span className="relative inline-block overflow-hidden text-center min-h-[1.2em] sm:min-h-[1.1em] w-full sm:w-auto">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute left-0 right-0 font-semibold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent whitespace-nowrap"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? "-100%" : "100%",
                            opacity: 0,
                          }
                    }
                  >
                    {title} Compensation
                  </motion.span>
                ))}
              </span>
            </div>
          </h1>

          {/* Subheading */}
          <div 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-800 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="relative flex w-full justify-center overflow-hidden text-center min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem]">
              {subtitles.map((subtitle, index) => (
                <motion.p
                  key={index}
                  className="absolute font-medium px-2 sm:px-4 text-center"
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
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 group"
            >
              <span className="group-hover:tracking-wide transition-all duration-300">Get Started</span>
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
