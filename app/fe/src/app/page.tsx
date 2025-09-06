import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { CTA } from '@/components/cta';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="landing-gradient-bg min-h-screen w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
