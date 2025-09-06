"use client";
import { motion } from "framer-motion";

interface GradientOverlayProps {
  className?: string;
  opacity?: number;
}

/**
 * GradientOverlay
 * 
 * Creates a subtle overlay that enhances gradient blending
 * and creates smoother transitions between sections
 */
export function GradientOverlay({ className = "", opacity = 0.1 }: GradientOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/5" />
      
      {/* Middle highlight */}
      <div className="absolute top-1/2 left-0 right-0 h-64 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-white/5" />
      
      {/* Side gradients for depth */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-white/5" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-transparent to-white/5" />
    </motion.div>
  );
}
