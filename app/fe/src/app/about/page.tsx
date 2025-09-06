'use client';

import React from 'react';
import { 
  Calculator, 
  Target, 
  Users, 
  Shield, 
  Lightbulb,
  Award,
  Globe,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const team = [
  {
    name: 'Justine Devs',
    role: 'Founder & CEO',
    bio: 'Sole proprietor and full-stack developer passionate about helping professionals understand their true compensation value through technology.',
    image: '/img/Profile-1.PNG'
  }
];

const values = [
  {
    icon: Target,
    title: 'Transparency',
    description: 'We believe in complete transparency when it comes to compensation. No hidden costs, no surprises.'
  },
  {
    icon: Shield,
    title: 'Privacy',
    description: 'Your data is yours. We use enterprise-grade security and never share your personal information.'
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description: 'Fair compensation for everyone. We\'re committed to closing the pay gap and promoting equity.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Leveraging AI and cutting-edge technology to provide insights that were previously impossible.'
  }
];

const stats = [
  { number: '50K+', label: 'Calculations Made' },
  { number: '10K+', label: 'Happy Users' },
  { number: '95%', label: 'Accuracy Rate' },
  { number: '24/7', label: 'Support Available' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="landing-gradient-bg min-h-screen w-full">
        {/* Hero Section */}
        <section className="section-no-gap">
          <div className="max-w-4xl mx-auto text-center py-20 px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About
              <span className="text-blue-300"> CompenseTracker</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              We're on a mission to bring transparency and fairness to compensation discussions 
              through AI-powered analysis and personalized insights.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-blue-300 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-no-gap">
          <div className="max-w-6xl mx-auto py-16 px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-200 mb-6">
                  CompenseTracker was born from a simple belief: everyone deserves to understand 
                  their true compensation value. Traditional salary discussions often miss the 
                  bigger picture, leaving employees undervalued and employers with incomplete data.
                </p>
                <p className="text-lg text-gray-200 mb-6">
                  We combine advanced AI technology with comprehensive market data to provide 
                  accurate, personalized compensation analysis that goes beyond just base salary. 
                  Our platform considers benefits, real-life costs, and market factors to give 
                  you the complete picture.
                </p>
                <div className="flex items-center text-blue-300 font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Built with transparency and fairness in mind</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-blue-300 mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-no-gap">
          <div className="max-w-6xl mx-auto py-20 px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                These core principles guide everything we do and every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <value.icon className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-200">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-no-gap">
          <div className="max-w-6xl mx-auto py-20 px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                A passionate sole proprietor working to revolutionize compensation transparency 
                through technology and community-driven solutions.
              </p>
            </div>

            <div className="flex justify-center">
              {team.map((member, index) => (
                <div key={index} className="text-center max-w-md">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover shadow-lg border-4 border-white/20"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-300 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-200 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-no-gap">
          <div className="max-w-4xl mx-auto py-20 px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Story
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-white/20">
                <p className="text-lg text-gray-200 mb-6">
                  CompenseTracker was born from a simple observation on a Facebook group. I saw someone 
                  posting about their 6-figure job offer, but what caught my attention was their personal 
                  insight about the true cost of their compensation package.
                </p>
                <p className="text-lg text-gray-200 mb-6">
                  They were breaking down not just the base salary, but the real costs: CTC (Cost to Company), 
                  PTB (Perks, Benefits, and Allowances), upkeep costs, risk factors, and all the hidden 
                  elements that most people never consider when evaluating an offer.
                </p>
                <p className="text-lg text-gray-200 mb-6">
                  That moment sparked an idea in my mind. I realized that most professionals, including myself, 
                  were making career decisions based on incomplete information. We were only seeing the tip 
                  of the iceberg when it came to our true compensation value.
                </p>
                <p className="text-lg text-gray-200 mb-6">
                  As a sole proprietor and full-stack developer, I decided to build this application for the 
                  community. I wanted to create a tool that would help everyone understand their complete 
                  compensation picture, not just the surface-level numbers.
                </p>
                <p className="text-lg text-gray-200">
                  Today, CompenseTracker is my contribution to helping professionals make informed decisions 
                  about their careers and compensation, promoting transparency and fairness in the workplace 
                  through technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-no-gap">
          <div className="max-w-4xl mx-auto text-center py-20 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Be part of the movement towards transparent, fair compensation. 
              Start your journey with CompenseTracker today.
            </p>
            <div className="flex justify-center">
              <a
                href="/calculator"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/20"
              >
                Start Calculating
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
}
