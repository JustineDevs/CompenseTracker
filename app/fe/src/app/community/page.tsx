'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  MessageSquare, 
  Search, 
  Filter, 
  TrendingUp, 
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Share2,
  Heart,
  Bookmark,
  Download,
  Eye,
  ThumbsUp,
  Edit3,
  Plus,
  Sparkles,
  FileText
} from 'lucide-react';

export default function CommunityPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [showPublishForm, setShowPublishForm] = useState(false);

  const filters = [
    { id: 'all', name: 'All Collections', icon: Users },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'featured', name: 'Featured', icon: Award },
    { id: 'templates', name: 'Templates', icon: Edit3 },
    { id: 'resources', name: 'Resources', icon: Bookmark },
    { id: 'guides', name: 'Guides', icon: MessageSquare }
  ];

  const communityFeatures = [
    {
      icon: Users,
      title: 'User-Published Collections',
      description: 'Allow community members to publish and share their curated collections of templates, resources, or relevant job/career content.',
      status: 'coming-soon'
    },
    {
      icon: Star,
      title: 'Rating and Feedback',
      description: 'Enable users to rate, comment, and provide feedback on shared collections.',
      status: 'coming-soon'
    },
    {
      icon: Search,
      title: 'Search and Filter',
      description: 'Searchable and filtered listings by template type, industry, or popularity.',
      status: 'coming-soon'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Options for community members to collaborate on collections or contribute improvements.',
      status: 'coming-soon'
    },
    {
      icon: Award,
      title: 'User Profiles and Portfolios',
      description: 'Profiles showcasing a user\'s shared collections and contributions.',
      status: 'coming-soon'
    },
    {
      icon: TrendingUp,
      title: 'Highlight Popular Collections',
      description: 'Special sections for trending or editor-picked community submissions.',
      status: 'coming-soon'
    },
    {
      icon: CheckCircle,
      title: 'Moderation and Quality Control',
      description: 'Systems to review and approve community content to maintain quality standards.',
      status: 'coming-soon'
    },
    {
      icon: MessageSquare,
      title: 'Community Forums',
      description: 'Space for conversation around career advice, template tips, and related topics.',
      status: 'future'
    },
    {
      icon: Share2,
      title: 'Sharing and Embedding',
      description: 'Easy sharing via links or embedding community collections in other platforms.',
      status: 'coming-soon'
    }
  ];

  const sampleCollections = [
    {
      id: 1,
      title: 'Tech Resume Templates',
      author: 'Sarah Chen',
      authorRole: 'Senior Software Engineer',
      authorAvatar: 'SC',
      description: 'A curated collection of ATS-friendly resume templates specifically designed for software engineers and tech professionals.',
      category: 'templates',
      likes: 245,
      downloads: 1200,
      rating: 4.8,
      tags: ['tech', 'software', 'ats-friendly', 'templates'],
      featured: true,
      items: 12,
      lastUpdated: '2 days ago',
      views: 3400,
      comments: 23
    },
    {
      id: 2,
      title: 'Marketing Career Resources',
      author: 'Mike Rodriguez',
      authorRole: 'Marketing Director',
      authorAvatar: 'MR',
      description: 'Comprehensive guide including resume templates, cover letter examples, and interview tips for marketing professionals.',
      category: 'resources',
      likes: 189,
      downloads: 890,
      rating: 4.6,
      tags: ['marketing', 'career', 'resources', 'guides'],
      featured: false,
      items: 8,
      lastUpdated: '1 week ago',
      views: 2100,
      comments: 15
    },
    {
      id: 3,
      title: 'Entry-Level Templates',
      author: 'Emily Johnson',
      authorRole: 'Career Counselor',
      authorAvatar: 'EJ',
      description: 'Perfect templates for recent graduates and entry-level professionals across various industries.',
      category: 'templates',
      likes: 312,
      downloads: 2100,
      rating: 4.9,
      tags: ['entry-level', 'graduate', 'beginner', 'templates'],
      featured: true,
      items: 15,
      lastUpdated: '3 days ago',
      views: 5200,
      comments: 31
    },
    {
      id: 4,
      title: 'Remote Work Guide',
      author: 'Alex Thompson',
      authorRole: 'Remote Work Consultant',
      authorAvatar: 'AT',
      description: 'Everything you need to know about finding and succeeding in remote work opportunities.',
      category: 'guides',
      likes: 156,
      downloads: 650,
      rating: 4.7,
      tags: ['remote-work', 'guide', 'career', 'tips'],
      featured: false,
      items: 6,
      lastUpdated: '5 days ago',
      views: 1800,
      comments: 12
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
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Community Hub
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                Share, discover, and collaborate on career resources with our growing community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center border border-white/20">
                  <Clock className="w-5 h-5 mr-2" />
                  Coming Soon
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
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
                Community features are currently in development. Join our waitlist to be notified when it launches!
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
                      placeholder="Search collections, templates, or resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {filters.map((filter) => {
                    const IconComponent = filter.icon;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                          selectedFilter === filter.id
                            ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                            : 'bg-white/10 backdrop-blur-sm text-gray-200 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {filter.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Collections Preview */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Featured Collections
              </h2>
              <button 
                onClick={() => setShowPublishForm(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center border border-white/30"
              >
                <Plus className="w-5 h-5 mr-2" />
                Publish Collection
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleCollections.map((collection) => (
                <div key={collection.id} className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group border border-white/20">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-xl text-white">{collection.title}</h3>
                          {collection.featured && (
                            <Award className="w-5 h-5 text-yellow-400 ml-2" />
                          )}
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-bold text-white">{collection.authorAvatar}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{collection.author}</p>
                            <p className="text-gray-300 text-xs">{collection.authorRole}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-200 mb-4">{collection.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {collection.tags.map((tag, index) => (
                        <span key={index} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" />
                        <span>{collection.rating} rating</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 text-green-400 mr-2" />
                        <span>{collection.downloads} downloads</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 text-red-400 mr-2" />
                        <span>{collection.likes} likes</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-blue-400 mr-2" />
                        <span>{collection.views} views</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-4">
                      <div className="flex items-center justify-between">
                        <span>{collection.items} items • Updated {collection.lastUpdated}</span>
                        <span>{collection.comments} comments</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedCollection(collection)}
                        className="flex-1 bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-lg font-medium hover:bg-white/30 transition-colors text-sm border border-white/30"
                      >
                        View Collection
                      </button>
                      <button className="bg-white/10 backdrop-blur-sm text-gray-300 py-2 px-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="bg-white/10 backdrop-blur-sm text-gray-300 py-2 px-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                        <Bookmark className="w-4 h-4" />
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
              Community Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communityFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <feature.icon className="w-6 h-6 text-green-300" />
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

        {/* Community Stats */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white border border-white/20">
              <h2 className="text-3xl font-bold text-center mb-8">Community Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">2,500+</div>
                  <div className="text-gray-200">Active Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">1,200+</div>
                  <div className="text-gray-200">Shared Collections</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">15,000+</div>
                  <div className="text-gray-200">Downloads</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">4.8</div>
                  <div className="text-gray-200">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-no-gap">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Join Our Community?</h2>
              <p className="text-xl mb-8 text-gray-200">
                Be part of a growing community of professionals sharing career resources and insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center border border-white/30">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
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

      {/* Collection Detail Modal */}
      {selectedCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedCollection.title}</h2>
                    {selectedCollection.featured && (
                      <Award className="w-6 h-6 text-yellow-500 ml-3" />
                    )}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-white">{selectedCollection.authorAvatar}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{selectedCollection.author}</p>
                      <p className="text-gray-500 text-sm">{selectedCollection.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600">{selectedCollection.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Collection Items</h3>
                  <div className="space-y-3">
                    {Array.from({ length: selectedCollection.items }, (_, i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Template {i + 1}</p>
                          <p className="text-sm text-gray-500">Resume template</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Collection Stats</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedCollection.rating}</div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedCollection.downloads}</div>
                        <div className="text-sm text-gray-600">Downloads</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{selectedCollection.likes}</div>
                        <div className="text-sm text-gray-600">Likes</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedCollection.views}</div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedCollection.tags.map((tag: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download All Items
                </button>
                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Like Collection
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

      {/* Publish Collection Modal */}
      {showPublishForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Publish Collection</h2>
                <button
                  onClick={() => setShowPublishForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800 font-medium">
                    Collection publishing is coming soon! This will allow you to share your curated templates and resources with the community.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Publishing Features (Coming Soon)</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Upload and organize template collections
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Add descriptions and tags for discoverability
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Set collection visibility and permissions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Track views, downloads, and engagement
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Moderate and approve community content
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Build reputation and follower base
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Collection Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Minimum 3 high-quality templates or resources</li>
                    <li>• Clear descriptions and appropriate tags</li>
                    <li>• Original content or properly attributed sources</li>
                    <li>• Professional presentation and formatting</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setShowPublishForm(false)}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Join Waitlist for Publishing Access
                </button>
                <button 
                  onClick={() => setShowPublishForm(false)}
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
