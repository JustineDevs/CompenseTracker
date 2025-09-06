"use client";
import AnimatedGradientBackground from "./animated-gradient-background";

interface HeroGradientBackgroundProps {
  className?: string;
}

/**
 * HeroGradientBackground
 * 
 * A customized animated gradient background specifically designed for the hero section
 * with colors that match the reference image: black to blue to pink to orange
 */
export function HeroGradientBackground({ className = "" }: HeroGradientBackgroundProps) {
  return (
    <AnimatedGradientBackground
      startingGap={120}
      Breathing={true}
      gradientColors={[
        "#0f0f23", // Very dark indigo at top
        "#1a1a2e", // Dark indigo
        "#2d1b69", // Rich blue-purple
        "#4c1d95", // Purple-blue
        "#7c3aed", // Medium purple
        "#a855f7", // Light purple
        "#ec4899", // Pink
        "#f97316", // Orange-pink
        "#3b82f6"  // Blue at bottom
      ]}
      gradientStops={[0, 15, 25, 35, 45, 55, 65, 75, 100]}
      animationSpeed={0.015}
      breathingRange={8}
      topOffset={10}
      containerClassName={className}
    />
  );
}
