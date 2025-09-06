"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface SmoothGradientTransitionsProps {
  section: 'hero' | 'features' | 'how-it-works' | 'cta' | 'footer';
  className?: string;
}

/**
 * SmoothGradientTransitions
 * 
 * Creates ultra-smooth gradient transitions with overlapping gradients
 * and seamless blending between sections
 */
export function SmoothGradientTransitions({ section, className = "" }: SmoothGradientTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getGradientConfig = () => {
    switch (section) {
      case 'hero':
        return {
          primary: 'from-indigo-900 via-purple-600 to-pink-500',
          secondary: 'from-transparent via-purple-500/20 to-transparent',
          tertiary: 'from-pink-400/30 via-transparent to-blue-500/30',
          opacity: 1,
          animation: true
        };
      case 'features':
        return {
          primary: 'from-pink-500 via-purple-600 to-blue-500',
          secondary: 'from-blue-400/40 via-transparent to-indigo-500/40',
          tertiary: 'from-transparent via-pink-300/20 to-transparent',
          opacity: 1,
          animation: true
        };
      case 'how-it-works':
        return {
          primary: 'from-blue-500 via-blue-600 to-blue-700',
          secondary: 'from-indigo-500/30 via-transparent to-purple-500/30',
          tertiary: 'from-transparent via-blue-400/20 to-transparent',
          opacity: 1,
          animation: true
        };
      case 'cta':
        return {
          primary: 'from-blue-700 via-blue-800 to-blue-900',
          secondary: 'from-purple-600/30 via-transparent to-indigo-700/30',
          tertiary: 'from-transparent via-blue-500/20 to-transparent',
          opacity: 1,
          animation: true
        };
      case 'footer':
        return {
          primary: 'from-blue-900 via-indigo-900 to-gray-900',
          secondary: 'from-indigo-700/40 via-transparent to-gray-800/40',
          tertiary: 'from-transparent via-blue-600/20 to-transparent',
          opacity: 1,
          animation: false
        };
      default:
        return {
          primary: 'from-transparent to-white',
          secondary: 'from-transparent to-transparent',
          tertiary: 'from-transparent to-transparent',
          opacity: 0.8,
          animation: false
        };
    }
  };

  const config = getGradientConfig();

  useEffect(() => {
    if (!config.animation || !containerRef.current) return;

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      const container = containerRef.current;
      if (container) {
        // Create subtle breathing effect
        const scale = 1 + Math.sin(time) * 0.02;
        const opacity = 0.8 + Math.sin(time * 0.5) * 0.1;
        
        container.style.transform = `scale(${scale})`;
        container.style.opacity = opacity.toString();
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [config.animation]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Primary gradient layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: config.opacity }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-b ${config.primary}`}
      />
      
      {/* Secondary gradient layer for depth */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className={`absolute inset-0 bg-gradient-to-br ${config.secondary}`}
      />
      
      {/* Tertiary gradient layer for smooth blending */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className={`absolute inset-0 bg-gradient-to-t ${config.tertiary}`}
      />
      
      {/* Overlay for section transitions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
      />
    </div>
  );
}
