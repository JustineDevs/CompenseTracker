'use client';

import React from 'react';
import { FileText, Scale, AlertTriangle, Shield, Users, Globe } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using CompenseTracker, you agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, you may not use our service.',
      'We reserve the right to modify these terms at any time, and your continued use constitutes acceptance.',
      'These terms apply to all users, including visitors, registered users, and premium subscribers.',
      'You must be at least 18 years old to use our service.'
    ]
  },
  {
    icon: Users,
    title: 'User Accounts',
    content: [
      'You are responsible for maintaining the confidentiality of your account credentials.',
      'You must provide accurate and complete information when creating an account.',
      'You are responsible for all activities that occur under your account.',
      'You must notify us immediately of any unauthorized use of your account.',
      'We reserve the right to suspend or terminate accounts that violate these terms.'
    ]
  },
  {
    icon: Shield,
    title: 'Service Usage',
    content: [
      'You may use our service for lawful purposes only and in accordance with these terms.',
      'You may not use our service to violate any applicable laws or regulations.',
      'You may not attempt to gain unauthorized access to our systems or other users\' accounts.',
      'You may not use our service to transmit harmful or malicious code.',
      'You may not reverse engineer, decompile, or disassemble our software.',
      'You may not use our service for commercial purposes without our written permission.'
    ]
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content: [
      'The service and its original content, features, and functionality are owned by CompenseTracker.',
      'Our trademarks, logos, and service marks are protected by intellectual property laws.',
      'You may not use our intellectual property without our written permission.',
      'You retain ownership of any content you submit to our service.',
      'By submitting content, you grant us a license to use it for service provision.',
      'You are responsible for ensuring you have the right to submit any content you provide.'
    ]
  },
  {
    icon: AlertTriangle,
    title: 'Disclaimers and Limitations',
    content: [
      'Our service is provided "as is" without warranties of any kind.',
      'We do not guarantee the accuracy, completeness, or reliability of our calculations.',
      'Our compensation data is for informational purposes only and should not be the sole basis for decisions.',
      'We are not responsible for any decisions made based on our service.',
      'We do not guarantee uninterrupted or error-free service.',
      'Our liability is limited to the maximum extent permitted by law.'
    ]
  },
  {
    icon: Globe,
    title: 'Termination',
    content: [
      'You may terminate your account at any time by contacting us.',
      'We may terminate or suspend your account for violations of these terms.',
      'Upon termination, your right to use the service ceases immediately.',
      'We may delete your data after a reasonable period following termination.',
      'Provisions that by their nature should survive termination will remain in effect.',
      'Termination does not relieve you of any obligations incurred before termination.'
    ]
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms of
              <span className="text-blue-600"> Service</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Please read these terms carefully before using our compensation calculation service.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 15, 2024
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-700">
                  These Terms of Service ("Terms") govern your use of the CompenseTracker service 
                  ("Service") operated by CompenseTracker Inc. ("us", "we", or "our"). By accessing 
                  or using our Service, you agree to be bound by these Terms.
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                These Terms constitute a legally binding agreement between you and CompenseTracker. 
                If you do not agree to these Terms, you may not access or use our Service.
              </p>

              <p className="text-lg text-gray-600">
                We reserve the right to modify these Terms at any time. We will notify users of 
                any material changes by posting the new Terms on this page and updating the 
                "Last updated" date. Your continued use of the Service after such modifications 
                constitutes acceptance of the updated Terms.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <section.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Terms */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  Privacy and Data
                </h3>
                <p className="text-gray-600 mb-4">
                  Your privacy is important to us. Our collection and use of personal information 
                  is governed by our Privacy Policy.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• We collect only necessary information</li>
                  <li>• Your data is encrypted and secure</li>
                  <li>• We never sell your personal information</li>
                  <li>• You control your data and can delete it anytime</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
                  Limitation of Liability
                </h3>
                <p className="text-gray-600 mb-4">
                  To the maximum extent permitted by law, CompenseTracker shall not be liable 
                  for any indirect, incidental, special, or consequential damages.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Our service is for informational purposes only</li>
                  <li>• We do not provide financial or legal advice</li>
                  <li>• You use our service at your own risk</li>
                  <li>• Our liability is limited to the amount you paid us</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law and Disputes</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of 
                  the State of California, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising out of or relating to these Terms or the Service shall be 
                  resolved through binding arbitration in accordance with the rules of the 
                  American Arbitration Association.
                </p>
                <p>
                  You agree to waive any right to a jury trial and to participate in class action 
                  lawsuits or class-wide arbitration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Terms?</h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="mailto:legal@compensetracker.com"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Email Legal Team
              </a>
            </div>
          </div>
        </section>

        {/* Effective Date */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Effective Date</h3>
              <p className="text-gray-600">
                These Terms of Service are effective as of January 15, 2024, and will remain in effect 
                except with respect to any changes in their provisions in the future, which will be in 
                effect immediately after being posted on this page.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
