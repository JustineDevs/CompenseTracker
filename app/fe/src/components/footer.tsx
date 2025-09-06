'use client';

import Link from 'next/link';
import { Calculator, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { useState, useEffect } from 'react';

const navigation = {
  product: [
    { name: 'Calculator', href: '/calculator' },
    { name: 'Features', href: '#features' },
    { name: 'API', href: '/api-docs' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Community', href: '/community' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
  social: [
    { name: 'Twitter', href: 'https://x.com/https://x.com/Trader2G', icon: Twitter },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/justine-devs-444608295/', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/JustineDevs', icon: Github },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual newsletter signup logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="section-no-gap relative overflow-hidden text-white">
      {/* Content with proper spacing */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div 
            className={`lg:col-span-2 transition-all duration-700 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold group-hover:text-blue-200 transition-colors duration-300">CompenseTracker</span>
            </div>
            <p className="text-gray-200 mb-6 max-w-md group-hover:text-gray-100 transition-colors duration-300">
              AI-powered compensation analysis platform that provides transparent, 
              detailed insights into your true cost-to-company value.
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-200 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-5 h-5 hover:rotate-12 transition-transform duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product */}
          <div 
            className={`transition-all duration-700 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 group-hover:text-blue-200 transition-colors duration-300">
              Product
            </h3>
            <ul className="space-y-3">
              {navigation.product.map((item, index) => (
                <li 
                  key={item.name}
                  className={`transition-all duration-500 ease-out transform ${
                    isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${800 + (index * 100)}ms` }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-2 hover:scale-105"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-200 mb-4">
              Get the latest updates on compensation trends and new features.
            </p>
            {isSubscribed ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                <p className="text-green-200 font-medium">
                  ✅ Successfully subscribed! Thank you for joining our newsletter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !email}
                  className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors flex items-center border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-200 text-sm">
            © 2024 CompenseTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
