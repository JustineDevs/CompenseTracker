'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Edit3, 
  Palette, 
  Layout, 
  Zap, 
  Users, 
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Award,
  BookOpen,
  Search,
  Eye,
  Heart,
  Share2
} from 'lucide-react';

export default function TemplatePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Templates', icon: FileText },
    { id: 'harvard', name: 'Harvard Style', icon: BookOpen },
    { id: 'modern', name: 'Modern', icon: Zap },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'traditional', name: 'Traditional', icon: Layout },
    { id: 'ats', name: 'ATS-Friendly', icon: Target }
  ];

  const templateFeatures = [
    {
      icon: FileText,
      title: 'Built-in Professional Templates',
      description: 'Pre-designed templates including popular styles like Harvard formatting and creative, modern, or traditional layouts.',
      status: 'coming-soon'
    },
    {
      icon: Target,
      title: 'ATS-Friendly Formatting',
      description: 'Templates optimized for Applicant Tracking Systems to ensure resumes pass automated screening.',
      status: 'coming-soon'
    },
    {
      icon: Layout,
      title: 'Custom Layout Options',
      description: 'Ability to rearrange sections, add/remove content blocks, and personalize the structure to suit user needs.',
      status: 'coming-soon'
    },
    {
      icon: Palette,
      title: 'Font and Theme Customization',
      description: 'Selection of professional fonts and color themes to match personal branding.',
      status: 'coming-soon'
    },
    {
      icon: Edit3,
      title: 'Easy Editing Interface',
      description: 'User-friendly editor with drag-and-drop or form-based input for quick content updates.',
      status: 'coming-soon'
    },
    {
      icon: Download,
      title: 'Download Options',
      description: 'Export resumes in formats such as PDF, Word, or TXT for different application requirements.',
      status: 'coming-soon'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Suggestions',
      description: 'Suggestions for content improvement, such as bullet points or summaries based on job title.',
      status: 'future'
    },
    {
      icon: FileText,
      title: 'Ready-to-Use Cover Letters',
      description: 'Matching cover letter templates coordinated with the resume designs.',
      status: 'coming-soon'
    },
    {
      icon: Users,
      title: 'Multi-Industry Templates',
      description: 'Templates tailored for various fields, experience levels, and career stages.',
      status: 'coming-soon'
    },
    {
      icon: Award,
      title: 'Print-Ready and Digital Versions',
      description: 'Optimized for both print and digital submission formats.',
      status: 'coming-soon'
    }
  ];

  const sampleTemplates = [
    {
      id: 1,
      name: 'Harvard Professional',
      category: 'harvard',
      description: 'Classic academic style with clean typography and structured layout',
      preview: '/api/placeholder/300/400',
      downloads: 1250,
      rating: 4.8,
      strengths: ['ATS-Friendly', 'Academic Credibility', 'Clean Layout'],
      bestFor: ['Academia', 'Research', 'Consulting', 'Corporate'],
      features: ['Two-column layout', 'Professional typography', 'Skills section', 'Education emphasis'],
      industry: 'All Industries',
      experience: 'Mid to Senior Level'
    },
    {
      id: 2,
      name: 'Modern Minimalist',
      category: 'modern',
      description: 'Sleek design with bold headers and contemporary styling',
      preview: '/api/placeholder/300/400',
      downloads: 980,
      rating: 4.6,
      strengths: ['Visual Impact', 'Modern Appeal', 'Easy to Read'],
      bestFor: ['Tech', 'Design', 'Marketing', 'Startups'],
      features: ['Single column', 'Bold headers', 'Color accents', 'Minimal design'],
      industry: 'Creative & Tech',
      experience: 'All Levels'
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      category: 'creative',
      description: 'Eye-catching design perfect for creative professionals',
      preview: '/api/placeholder/300/400',
      downloads: 750,
      rating: 4.7,
      strengths: ['Visual Appeal', 'Portfolio Integration', 'Creative Freedom'],
      bestFor: ['Design', 'Art', 'Photography', 'Writing'],
      features: ['Portfolio section', 'Visual elements', 'Creative layout', 'Project showcase'],
      industry: 'Creative Arts',
      experience: 'All Levels'
    },
    {
      id: 4,
      name: 'ATS Optimized',
      category: 'ats',
      description: 'Designed to pass through Applicant Tracking Systems',
      preview: '/api/placeholder/300/400',
      downloads: 2100,
      rating: 4.9,
      strengths: ['ATS Compliance', 'Keyword Optimization', 'Universal Compatibility'],
      bestFor: ['Corporate', 'Government', 'Large Companies', 'All Industries'],
      features: ['Simple formatting', 'Standard sections', 'Keyword-friendly', 'PDF optimized'],
      industry: 'All Industries',
      experience: 'All Levels'
    }
  ];

  return (
    <div className="min-h-screen">
      <main className="landing-gradient-bg min-h-screen w-full">
        {/* Hero Section */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Resume Templates
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                Professional, ATS-friendly resume templates designed to help you land your dream job
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center border border-white/20">
                  <Clock className="w-5 h-5 mr-2" />
                  Coming Soon
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Banner */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-300 mr-2" />
              <p className="text-yellow-200 font-medium">
                Template feature is currently in development. Join our waitlist to be notified when it launches!
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search templates by name, industry, or style..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                            : 'bg-white/10 backdrop-blur-sm text-gray-200 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Templates Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Professional Resume Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleTemplates.map((template) => (
                <div key={template.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group border border-white/20">
                  <div className="aspect-[3/4] bg-white/5 flex items-center justify-center relative overflow-hidden">
                    <FileText className="w-16 h-16 text-gray-300" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => setSelectedTemplate(template)}
                        className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 border border-white/30"
                      >
                        <Eye className="w-4 h-4 mr-2 inline" />
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg text-white">{template.name}</h3>
                      <div className="flex items-center text-sm text-gray-300">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {template.rating}
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-sm mb-3">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.strengths.slice(0, 2).map((strength, index) => (
                        <span key={index} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                          {strength}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-3">
                      <div>Industry: {template.industry}</div>
                      <div>Level: {template.experience}</div>
                      <div>{template.downloads} downloads</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedTemplate(template)}
                        className="flex-1 bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-lg font-medium hover:bg-white/30 transition-colors text-sm border border-white/30"
                      >
                        View Details
                      </button>
                      <button className="bg-white/10 backdrop-blur-sm text-gray-300 py-2 px-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="bg-white/10 backdrop-blur-sm text-gray-300 py-2 px-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Template Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templateFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <feature.icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                      <div className="flex items-center mt-1">
                        {feature.status === 'coming-soon' ? (
                          <span className="bg-yellow-400/20 text-yellow-200 text-xs px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        ) : (
                          <span className="bg-purple-400/20 text-purple-200 text-xs px-2 py-1 rounded-full">
                            Future Feature
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-gray-200">
                Join our waitlist to be the first to access professional resume templates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center border border-white/30">
                  <Users className="w-5 h-5 mr-2" />
                  Join Waitlist
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedTemplate.name}</h2>
                  <p className="text-lg text-gray-600">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Template Preview</h3>
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="w-24 h-24 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Template Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.strengths.map((strength: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Best For</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.bestFor.map((item: string, index: number) => (
                          <span key={index} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {selectedTemplate.features.map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Industry:</span>
                        <span className="ml-2 text-gray-600">{selectedTemplate.industry}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Experience:</span>
                        <span className="ml-2 text-gray-600">{selectedTemplate.experience}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Rating:</span>
                        <span className="ml-2 text-gray-600 flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {selectedTemplate.rating}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Downloads:</span>
                        <span className="ml-2 text-gray-600">{selectedTemplate.downloads}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowEditor(true)}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  Customize Template
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Preview
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customization Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customize Template</h2>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800 font-medium">
                    Template customization editor is coming soon! This will include drag-and-drop editing, 
                    font customization, and real-time preview features.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Editor Features (Coming Soon)</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Drag-and-drop section reordering
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Font and color customization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Real-time preview
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Add/remove sections
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      AI-powered content suggestions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Export to PDF/Word
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setShowEditor(false)}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Join Waitlist for Early Access
                </button>
                <button 
                  onClick={() => setShowEditor(false)}
                  className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
