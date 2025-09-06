"use client";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { HeroGradientBackground } from "@/components/ui/hero-gradient-background";
import { motion } from "framer-motion";

export default function GradientDemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Custom Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroGradientBackground />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Animated Gradient
              <span className="block bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Background Demo
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Experience the beautiful animated gradient background with colors that match your reference image.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Default Gradient Demo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradientBackground 
          Breathing={true}
          animationSpeed={0.02}
          breathingRange={10}
        />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Default Gradient
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
              This is the default animated gradient with breathing effect enabled.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom Color Gradient Demo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedGradientBackground 
          gradientColors={[
            "#1a1a2e",
            "#16213e", 
            "#0f3460",
            "#533483",
            "#e94560"
          ]}
          gradientStops={[0, 30, 60, 80, 100]}
          Breathing={true}
          animationSpeed={0.015}
          breathingRange={12}
        />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Custom Colors
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
              Custom gradient colors with different animation settings.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
