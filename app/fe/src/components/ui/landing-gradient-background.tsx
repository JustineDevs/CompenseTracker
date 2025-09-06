"use client";
import { motion } from "framer-motion";
import { SmoothGradientTransitions } from "./smooth-gradient-transitions";

interface LandingGradientBackgroundProps {
  section: 'features' | 'how-it-works' | 'cta' | 'footer';
  className?: string;
}

/**
 * LandingGradientBackground
 * 
 * Creates ultra-smooth gradient transitions between landing page sections
 * with overlapping gradients and seamless blending
 */
export function LandingGradientBackground({ section, className = "" }: LandingGradientBackgroundProps) {
  return (
    <SmoothGradientTransitions 
      section={section} 
      className={className} 
    />
  );
}
