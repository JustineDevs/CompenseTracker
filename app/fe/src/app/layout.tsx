import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/error-boundary';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CompenseTracker - AI-Powered True Compensation Calculator',
  description: 'Transparent, detailed compensation calculation with AI-enhanced insights and personalized email generation',
  keywords: ['compensation', 'salary calculator', 'AI', 'benefits', 'cost analysis'],
  authors: [{ name: 'CompenseTracker Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'CompenseTracker - AI-Powered True Compensation Calculator',
    description: 'Transparent, detailed compensation calculation with AI-enhanced insights',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CompenseTracker - AI-Powered True Compensation Calculator',
    description: 'Transparent, detailed compensation calculation with AI-enhanced insights',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <ErrorBoundary>
          {children}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
