'use client';

import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, Globe } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: [
      'Personal Information: Name, email address, phone number, and job title when you create an account.',
      'Compensation Data: Salary, benefits, and other compensation-related information you input for calculations.',
      'Usage Data: Information about how you use our service, including pages visited and features used.',
      'Device Information: Browser type, operating system, and IP address for security and analytics purposes.',
      'Communication Data: Messages you send to us through support channels or feedback forms.'
    ]
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: [
      'Service Provision: To provide and maintain our compensation calculation services.',
      'Personalization: To customize your experience and provide relevant recommendations.',
      'Communication: To send you important updates, support responses, and service notifications.',
      'Analytics: To understand how our service is used and improve our features and functionality.',
      'Security: To protect against fraud, abuse, and unauthorized access to your account.',
      'Legal Compliance: To comply with applicable laws and regulations.'
    ]
  },
  {
    icon: Shield,
    title: 'Data Security',
    content: [
      'Encryption: All data is encrypted in transit and at rest using industry-standard encryption protocols.',
      'Access Controls: Strict access controls ensure only authorized personnel can access your data.',
      'Regular Audits: We conduct regular security audits and assessments to maintain our security standards.',
      'Secure Infrastructure: Our servers are hosted on secure, SOC 2 compliant cloud infrastructure.',
      'Data Backup: Regular backups ensure your data is protected against loss or corruption.',
      'Incident Response: We have procedures in place to respond quickly to any security incidents.'
    ]
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: [
      'Access: You can request access to all personal data we have about you.',
      'Correction: You can request correction of any inaccurate or incomplete data.',
      'Deletion: You can request deletion of your personal data, subject to legal requirements.',
      'Portability: You can request a copy of your data in a machine-readable format.',
      'Restriction: You can request restriction of processing in certain circumstances.',
      'Objection: You can object to processing based on legitimate interests or for marketing purposes.'
    ]
  },
  {
    icon: Globe,
    title: 'Data Sharing',
    content: [
      'No Sale: We never sell your personal data to third parties.',
      'Service Providers: We may share data with trusted service providers who help us operate our service.',
      'Legal Requirements: We may disclose data when required by law or to protect our rights.',
      'Business Transfers: In case of merger or acquisition, data may be transferred to the new entity.',
      'Consent: We only share data with third parties when you have given explicit consent.',
      'Anonymized Data: We may use anonymized, aggregated data for research and analytics purposes.'
    ]
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy
              <span className="text-blue-600"> Policy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
                <p className="text-gray-700">
                  At CompenseTracker, we are committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our compensation calculation service.
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                We understand that compensation data is sensitive and personal. That's why we've built 
                our service with privacy and security as core principles. We never sell your data, 
                and we use industry-standard security measures to protect your information.
              </p>

              <p className="text-lg text-gray-600">
                By using our service, you agree to the collection and use of information in accordance 
                with this Privacy Policy. If you do not agree with our policies and practices, 
                please do not use our service.
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

        {/* Additional Information */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 text-blue-600 mr-2" />
                  Cookies and Tracking
                </h3>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to enhance your experience, 
                  analyze usage patterns, and provide personalized content.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Essential cookies for service functionality</li>
                  <li>• Analytics cookies to improve our service</li>
                  <li>• Preference cookies to remember your settings</li>
                  <li>• You can control cookie settings in your browser</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-5 h-5 text-blue-600 mr-2" />
                  Data Retention
                </h3>
                <p className="text-gray-600 mb-4">
                  We retain your personal data only as long as necessary to provide our services 
                  and comply with legal obligations.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Account data: Until account deletion</li>
                  <li>• Calculation data: 7 years for tax purposes</li>
                  <li>• Support communications: 3 years</li>
                  <li>• Analytics data: 2 years (anonymized)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions About Privacy?</h2>
            <p className="text-xl text-gray-600 mb-8">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="mailto:privacy@compensetracker.com"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                Email Privacy Team
              </a>
            </div>
          </div>
        </section>

        {/* Updates */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our 
                practices or for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-gray-600 mb-4">
                When we make material changes, we will notify you by email or through a prominent 
                notice on our website before the changes take effect.
              </p>
              <p className="text-gray-600">
                We encourage you to review this Privacy Policy periodically to stay informed 
                about how we protect your information.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
