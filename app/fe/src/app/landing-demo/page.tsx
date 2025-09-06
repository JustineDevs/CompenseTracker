"use client";
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { CTA } from '@/components/cta';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function LandingDemoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section with Animated Gradient */}
        <Hero />
        
        {/* Features Section with Smooth Blend */}
        <Features />
        
        {/* How It Works Section with Gradient Transition */}
        <HowItWorks />
        
        {/* CTA Section with Final Blend */}
        <CTA />
      </main>
      <Footer />
      
      {/* Demo Information */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Clean Professional Design</h3>
          <p className="text-sm text-gray-600 mb-2">
            Streamlined landing page with professional spacing:
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Removed action buttons for cleaner look</li>
            <li>• Professional spacing adjustments</li>
            <li>• Complete vertical gradient background</li>
            <li>• Zero gaps between all sections</li>
            <li>• Focus on content and trust indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
