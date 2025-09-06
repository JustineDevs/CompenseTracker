'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  ChevronDown,
  Calculator,
  FileText,
  Users,
  Settings,
  HelpCircle,
  ExternalLink,
  Code,
  Zap,
  Shield,
  BarChart3,
  Download
} from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const docSections = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { title: 'Quick Start Guide', href: '#quick-start', description: 'Get up and running in minutes' },
      { title: 'Account Setup', href: '#account-setup', description: 'Create and configure your account' },
      { title: 'First Calculation', href: '#first-calculation', description: 'Learn how to perform your first calculation' },
      { title: 'Understanding Results', href: '#understanding-results', description: 'How to interpret your compensation data' }
    ]
  },
  {
    title: 'Features',
    icon: Calculator,
    items: [
      { title: 'Compensation Calculator', href: '#calculator', description: 'Detailed breakdown of all calculation features' },
      { title: 'AI Insights', href: '#ai-insights', description: 'How our AI provides personalized recommendations' },
      { title: 'Email Generator', href: '#email-generator', description: 'Create professional compensation emails' },
      { title: 'Data Export', href: '#data-export', description: 'Export your calculations in various formats' }
    ]
  },
  {
    title: 'API Reference',
    icon: Code,
    items: [
      { title: 'Authentication', href: '#api-auth', description: 'How to authenticate with our API' },
      { title: 'Endpoints', href: '#api-endpoints', description: 'Complete list of available endpoints' },
      { title: 'Rate Limits', href: '#rate-limits', description: 'Understanding API rate limits' },
      { title: 'SDKs', href: '#sdk', description: 'Official SDKs and libraries' }
    ]
  },
  {
    title: 'Integrations',
    icon: Zap,
    items: [
      { title: 'HR Systems', href: '#hr-systems', description: 'Connect with popular HR platforms' },
      { title: 'Payroll Software', href: '#payroll', description: 'Integrate with payroll systems' },
      { title: 'Webhooks', href: '#webhooks', description: 'Real-time data synchronization' },
      { title: 'Custom Integrations', href: '#custom', description: 'Build your own integrations' }
    ]
  },
  {
    title: 'Security',
    icon: Shield,
    items: [
      { title: 'Data Protection', href: '#data-protection', description: 'How we protect your sensitive data' },
      { title: 'Compliance', href: '#compliance', description: 'SOC 2, GDPR, and other certifications' },
      { title: 'Best Practices', href: '#best-practices', description: 'Security recommendations for users' },
      { title: 'Incident Response', href: '#incident-response', description: 'Our security incident procedures' }
    ]
  },
  {
    title: 'Support',
    icon: HelpCircle,
    items: [
      { title: 'FAQ', href: '#faq', description: 'Frequently asked questions' },
      { title: 'Troubleshooting', href: '#troubleshooting', description: 'Common issues and solutions' },
      { title: 'Contact Support', href: '#contact-support', description: 'Get help from our support team' },
      { title: 'Community Forum', href: '#community', description: 'Connect with other users' }
    ]
  }
];

const quickLinks = [
  { title: 'API Documentation', href: '/docs/api', icon: Code },
  { title: 'SDK Downloads', href: '/docs/sdk', icon: Download },
  { title: 'Status Page', href: '/status', icon: BarChart3 },
  { title: 'Changelog', href: '/docs/changelog', icon: FileText }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Getting Started']));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const filteredSections = docSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className={`text-center mb-12 transition-all duration-800 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div 
                className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300 group"
                style={{ transitionDelay: '400ms' }}
              >
                <BookOpen className="w-10 h-10 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h1 
                className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300"
                style={{ transitionDelay: '600ms' }}
              >
                Documentation
              </h1>
              <p 
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto group-hover:text-gray-200 transition-colors duration-300"
                style={{ transitionDelay: '800ms' }}
              >
                Everything you need to know about using CompenseTracker effectively. 
                From quick start guides to advanced API documentation.
              </p>
            </div>

            {/* Search Bar */}
            <div 
              className={`max-w-2xl mx-auto mb-12 transition-all duration-700 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-700 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center border border-white/20 group ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${1400 + (index * 100)}ms` }}
                >
                  <link.icon className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
                  <h3 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-300">{link.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-6 sticky top-8 border border-white/20">
                  <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
                  <nav className="space-y-2">
                    {docSections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <button
                          onClick={() => toggleSection(section.title)}
                          className="w-full flex items-center justify-between p-2 text-left hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <div className="flex items-center">
                            <section.icon className="w-4 h-4 text-white mr-2" />
                            <span className="font-medium text-white">{section.title}</span>
                          </div>
                          {expandedSections.has(section.title) ? (
                            <ChevronDown className="w-4 h-4 text-gray-300" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                          )}
                        </button>
                        {expandedSections.has(section.title) && (
                          <div className="ml-6 mt-2 space-y-1">
                            {section.items.map((item, itemIndex) => (
                              <Link
                                key={itemIndex}
                                href={item.href}
                                className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                {searchQuery ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Search Results for "{searchQuery}"
                    </h2>
                    {filteredSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                          <section.icon className="w-5 h-5 text-white mr-2" />
                          {section.title}
                        </h3>
                        <div className="space-y-3">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="border-l-4 border-white/30 pl-4">
                              <h4 className="font-medium text-white">{item.title}</h4>
                              <p className="text-sm text-gray-300">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {filteredSections.length === 0 && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-8 text-center border border-white/20">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                        <p className="text-gray-300">Try adjusting your search terms or browse our documentation sections.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Getting Started */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-white/20">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <BookOpen className="w-6 h-6 text-white mr-3" />
                        Getting Started
                      </h2>
                      <div className="prose max-w-none">
                        <p className="text-lg text-gray-300 mb-6">
                          Welcome to CompenseTracker! This guide will help you get started with our 
                          compensation calculation platform in just a few minutes.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-3">Quick Start</h3>
                            <ol className="text-sm text-gray-300 space-y-2">
                              <li>1. Create your account</li>
                              <li>2. Enter your compensation details</li>
                              <li>3. Review your calculation results</li>
                              <li>4. Generate AI insights</li>
                              <li>5. Create professional emails</li>
                            </ol>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <h3 className="text-lg font-semibold text-white mb-3">What You'll Learn</h3>
                            <ul className="text-sm text-gray-300 space-y-2">
                              <li>• How to input compensation data</li>
                              <li>• Understanding calculation results</li>
                              <li>• Using AI-powered insights</li>
                              <li>• Generating professional emails</li>
                              <li>• Exporting your data</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features Overview */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-white/20">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Calculator className="w-6 h-6 text-white mr-3" />
                        Key Features
                      </h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <Calculator className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">Advanced Calculator</h3>
                              <p className="text-sm text-gray-300">Comprehensive compensation analysis with real-time calculations</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">AI Insights</h3>
                              <p className="text-sm text-gray-300">Personalized recommendations powered by artificial intelligence</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">Email Generator</h3>
                              <p className="text-sm text-gray-300">Create professional compensation discussion emails</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <Shield className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">Secure & Private</h3>
                              <p className="text-sm text-gray-300">Enterprise-grade security for your sensitive data</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* API Information */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm p-8 border border-white/20">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Code className="w-6 h-6 text-white mr-3" />
                        API & Integrations
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Build powerful integrations with our RESTful API. Access all features programmatically 
                        and integrate CompenseTracker into your existing workflows.
                      </p>
                      <div className="bg-black/50 rounded-lg p-4 mb-6 border border-white/20">
                        <h3 className="font-semibold text-white mb-2">Quick API Example</h3>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST https://api.compensetracker.com/calculate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "baseSalary": 75000,
    "benefits": {...}
  }'`}
                        </pre>
                      </div>
                      <div className="flex space-x-4">
                        <Link
                          href="/docs/api"
                          className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors border border-white/30"
                        >
                          View API Docs
                        </Link>
                        <Link
                          href="/docs/sdk"
                          className="border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          Download SDKs
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need More Help?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
              >
                Contact Support
              </Link>
              <Link
                href="/docs/api"
                className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                API Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
