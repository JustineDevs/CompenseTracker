'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Calculator } from 'lucide-react';
import { AnimatedNavbar } from '@/components/ui/animated-navbar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigation = [
    { name: 'Calculator', href: '/calculator' },
    { name: 'Template', href: '/template' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' },
    { name: 'Docs', href: '/docs' },
  ];

  return (
    <header className="relative">
      {/* Animated Navbar for Desktop */}
      <div className="hidden lg:block">
        <AnimatedNavbar />
      </div>

      {/* Traditional Header for Mobile and Tablet */}
      <div 
        className={`lg:hidden bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-700 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className={`flex items-center transition-all duration-500 ease-out transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calculator className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">CompenseTracker</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div 
              className={`md:hidden transition-all duration-500 ease-out transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2 hover:scale-110 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 hover:rotate-90 transition-transform duration-300" />
                )}
              </button>
            </div>

            {/* Tablet Navigation */}
            <nav 
              className={`hidden md:flex lg:hidden space-x-8 transition-all duration-500 ease-out transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-gray-100 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                  style={{ transitionDelay: `${800 + (index * 100)}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              className={`md:hidden transition-all duration-500 ease-out transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:translate-x-2 ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
