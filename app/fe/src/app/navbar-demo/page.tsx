"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Calculator, FileText, Users, Info, BookOpen, DollarSign, BarChart3, Settings, LogOut, User } from "lucide-react";

export default function NavbarDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background elements for glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"></div>
      
      <div className="relative w-full flex items-center justify-center py-20">
        <NavbarDemo />
      </div>
      
      {/* Content to demonstrate the navbar overlay */}
      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Glassmorphism Navbar Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Hover over the navigation items to see the smooth glassmorphism effects with enhanced blur and black text styling.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glassmorphism-dropdown rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Smooth spring animations with Framer Motion</li>
              <li>• Enhanced glassmorphism with strong blur effects</li>
              <li>• Black text styling for better contrast</li>
              <li>• Hover-triggered dropdown menus</li>
              <li>• Product showcase with images</li>
              <li>• Responsive design</li>
            </ul>
          </div>
          
          <div className="glassmorphism-dropdown rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Navigation Items</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Calculator:</strong> Compensation tools and insights</li>
              <li>• <strong>Templates:</strong> Resume templates with previews</li>
              <li>• <strong>Community:</strong> User collections and resources</li>
              <li>• <strong>Resources:</strong> Documentation and guides</li>
              <li>• <strong>Account:</strong> User profile and settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Calculator">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/calculator">Compensation Calculator</HoveredLink>
            <HoveredLink href="/calculator#insights">AI Insights</HoveredLink>
            <HoveredLink href="/calculator#email">Email Generator</HoveredLink>
            <HoveredLink href="/calculator#results">View Results</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Templates">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Harvard Professional"
              href="/template"
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=140&h=70&fit=crop&crop=center"
              description="Classic academic style with clean typography and structured layout"
            />
            <ProductItem
              title="Modern Minimalist"
              href="/template"
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=140&h=70&fit=crop&crop=center"
              description="Sleek design with bold headers and contemporary styling"
            />
            <ProductItem
              title="ATS Optimized"
              href="/template"
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=140&h=70&fit=crop&crop=center"
              description="Designed to pass through Applicant Tracking Systems"
            />
            <ProductItem
              title="Creative Portfolio"
              href="/template"
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=140&h=70&fit=crop&crop=center"
              description="Eye-catching design perfect for creative professionals"
            />
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Community">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/community">Browse Collections</HoveredLink>
            <HoveredLink href="/community#trending">Trending</HoveredLink>
            <HoveredLink href="/community#featured">Featured</HoveredLink>
            <HoveredLink href="/community#publish">Publish Collection</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">About Us</HoveredLink>
            <HoveredLink href="/docs">Documentation</HoveredLink>
            <HoveredLink href="/docs#api">API Reference</HoveredLink>
            <HoveredLink href="/docs#guides">User Guides</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
