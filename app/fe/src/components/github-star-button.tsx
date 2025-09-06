'use client';

import { useState, useEffect } from 'react';
import { Github, Star } from 'lucide-react';

interface GitHubStarButtonProps {
  repo: string; // Format: "owner/repo"
  className?: string;
}

export function GitHubStarButton({ repo, className = '' }: GitHubStarButtonProps) {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        setStarCount(data.stargazers_count);
      } catch (err) {
        console.error('Failed to fetch GitHub stars:', err);
        setError('Failed to load stars');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStarCount();
  }, [repo]);

  const handleClick = () => {
    window.open(`https://github.com/${repo}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-black hover:bg-gray-800 
        text-white text-sm font-medium
        rounded-lg shadow-lg hover:shadow-xl
        transition-all duration-300 
        hover:scale-105 hover:-translate-y-1
        border border-gray-700 hover:border-gray-600
        group
        ${className}
      `}
      disabled={isLoading}
    >
      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      
      {isLoading ? (
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </span>
      ) : error ? (
        <span className="text-red-300">Error</span>
      ) : (
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {starCount !== null ? starCount.toLocaleString() : '0'}
        </span>
      )}
    </button>
  );
}
