'use client';

import { useState, useEffect } from 'react';
import { CompensationBreakdown } from '@/types/compensation';
import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  ArrowLeft, 
  ArrowRight,
  Loader2
} from 'lucide-react';

interface AIInsightsProps {
  breakdown: CompensationBreakdown;
  onNext: () => void;
  onBack: () => void;
}

interface AIInsight {
  type: 'tip' | 'comparison' | 'negotiation' | 'advice';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export function AIInsights({ breakdown, onNext, onBack }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Simulate AI analysis
    const generateInsights = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI insights based on compensation data
      const mockInsights: AIInsight[] = [
        {
          type: 'tip',
          title: 'Optimize Your 401k Contribution',
          description: 'Your 401k contribution is below the recommended 15% of your salary. Consider increasing it to maximize employer matching and tax benefits.',
          priority: 'high',
          category: 'retirement'
        },
        {
          type: 'comparison',
          title: 'Above Market Average',
          description: 'Your total compensation is 12% above the industry average for your position. This positions you well for future negotiations.',
          priority: 'medium',
          category: 'market'
        },
        {
          type: 'negotiation',
          title: 'Negotiate Health Insurance Coverage',
          description: 'Your health insurance costs are higher than average. Consider negotiating for better coverage or lower premiums.',
          priority: 'medium',
          category: 'benefits'
        },
        {
          type: 'advice',
          title: 'Consider Remote Work Benefits',
          description: 'Your commuting costs are significant. Negotiate for remote work options to reduce transportation expenses.',
          priority: 'high',
          category: 'work-life'
        },
        {
          type: 'tip',
          title: 'Maximize Performance Bonus',
          description: 'Your performance bonus structure looks competitive. Focus on meeting key performance indicators to maximize this component.',
          priority: 'low',
          category: 'performance'
        },
        {
          type: 'comparison',
          title: 'Benefits Package Analysis',
          description: 'Your benefits package is comprehensive, covering 85% of typical employee needs. This is above average for your industry.',
          priority: 'low',
          category: 'benefits'
        }
      ];
      
      setInsights(mockInsights);
      setIsLoading(false);
    };

    generateInsights();
  }, [breakdown]);

  const categories = [
    { id: 'all', label: 'All Insights', count: insights.length },
    { id: 'retirement', label: 'Retirement', count: insights.filter(i => i.category === 'retirement').length },
    { id: 'market', label: 'Market', count: insights.filter(i => i.category === 'market').length },
    { id: 'benefits', label: 'Benefits', count: insights.filter(i => i.category === 'benefits').length },
    { id: 'work-life', label: 'Work-Life', count: insights.filter(i => i.category === 'work-life').length },
    { id: 'performance', label: 'Performance', count: insights.filter(i => i.category === 'performance').length },
  ];

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="w-5 h-5" />;
      case 'comparison': return <TrendingUp className="w-5 h-5" />;
      case 'negotiation': return <Target className="w-5 h-5" />;
      case 'advice': return <Brain className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI is Analyzing Your Compensation
          </h3>
          <p className="text-gray-600">
            Our AI is processing your data to provide personalized insights and recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
            <p className="text-sm text-gray-600">Personalized recommendations based on your compensation data</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onNext}
              className="btn btn-primary flex items-center space-x-1 text-xs py-1 px-2"
            >
              <span>Generate Email</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={onBack}
              className="btn btn-outline flex items-center space-x-1 text-xs py-1 px-2"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Results</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {filteredInsights.map((insight, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {getTypeIcon(insight.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                  {insight.priority}
                </span>
              </div>
              <p className="text-xs text-gray-600">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{insights.length}</div>
            <div className="text-xs text-gray-600">Total Insights</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {insights.filter(i => i.priority === 'high').length}
            </div>
            <div className="text-xs text-gray-600">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">
              {categories.length - 1}
            </div>
            <div className="text-xs text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
}
