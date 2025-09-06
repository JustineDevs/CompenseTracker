"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { Calculator, FileText, Users, Info, BookOpen, DollarSign, BarChart3 } from "lucide-react";

export function AnimatedNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-6 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Calculator">
          <div className="flex flex-col space-y-3 text-sm">
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
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/community">Browse Collections</HoveredLink>
            <HoveredLink href="/community#trending">Trending</HoveredLink>
            <HoveredLink href="/community#featured">Featured</HoveredLink>
            <HoveredLink href="/community#publish">Publish Collection</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col space-y-3 text-sm">
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
