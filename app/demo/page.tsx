'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import SortControls from '../components/SortControls';
import DeveloperCard from '../components/DeveloperCard';
import ThemeToggle from '../components/ThemeToggle';

interface Developer {
  id: number;
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
  total_stars: number;
}

const sampleDevelopers: Developer[] = [
  {
    id: 1,
    login: 'alice-dev',
    avatar_url: 'https://github.com/github.png',
    bio: 'Full-stack developer passionate about React, Node.js, and open source. Building amazing web applications.',
    location: 'San Francisco, CA',
    public_repos: 45,
    followers: 1200,
    html_url: 'https://github.com/alice-dev',
    total_stars: 8500,
  },
  {
    id: 2,
    login: 'bob-coder',
    avatar_url: 'https://github.com/github.png',
    bio: 'Backend engineer specializing in Python, Django, and microservices. Love solving complex problems.',
    location: 'San Francisco, CA',
    public_repos: 32,
    followers: 890,
    html_url: 'https://github.com/bob-coder',
    total_stars: 6200,
  },
  {
    id: 3,
    login: 'charlie-js',
    avatar_url: 'https://github.com/github.png',
    bio: 'Frontend wizard with expertise in Vue.js, TypeScript, and modern CSS. Creating beautiful user experiences.',
    location: 'San Francisco, CA',
    public_repos: 67,
    followers: 2100,
    html_url: 'https://github.com/charlie-js',
    total_stars: 12400,
  },
  {
    id: 4,
    login: 'diana-mobile',
    avatar_url: 'https://github.com/github.png',
    bio: 'Mobile app developer focused on React Native and iOS. Building cross-platform solutions.',
    location: 'San Francisco, CA',
    public_repos: 28,
    followers: 750,
    html_url: 'https://github.com/diana-mobile',
    total_stars: 4800,
  },
  {
    id: 5,
    login: 'eric-ai',
    avatar_url: 'https://github.com/github.png',
    bio: 'Machine learning engineer working on computer vision and NLP. Exploring the future of AI.',
    location: 'San Francisco, CA',
    public_repos: 53,
    followers: 1800,
    html_url: 'https://github.com/eric-ai',
    total_stars: 9200,
  },
  {
    id: 6,
    login: 'fiona-devops',
    avatar_url: 'https://github.com/github.png',
    bio: 'DevOps engineer passionate about Kubernetes, Docker, and cloud infrastructure. Automating everything.',
    location: 'San Francisco, CA',
    public_repos: 41,
    followers: 1100,
    html_url: 'https://github.com/fiona-devops',
    total_stars: 6800,
  },
];

export default function DemoPage() {
  const [sortBy, setSortBy] = useState<'stars' | 'repos' | 'followers'>('stars');

  const sortedDevelopers = [...sampleDevelopers].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.total_stars - a.total_stars;
      case 'repos':
        return b.public_repos - a.public_repos;
      case 'followers':
        return b.followers - a.followers;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                GitHub Finder Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 transition-colors">
                See how the app works with sample data
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/"
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Try Live Search
                </a>
              </div>
            </div>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 transition-colors">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2 transition-colors">
            🎯 Demo Mode
          </h2>
          <p className="text-blue-800 dark:text-blue-200 transition-colors">
            This page shows sample developer data to demonstrate the app's features. 
            Try different sorting options to see how the ranking system works. 
            For real searches, go back to the main page and search for developers in your city!
          </p>
        </div>

        {/* Sort Controls */}
        <SortControls
          sortBy={sortBy}
          onSortChange={setSortBy}
          developerCount={sampleDevelopers.length}
        />

        {/* Developer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDevelopers.map((developer, index) => (
            <DeveloperCard
              key={developer.id}
              developer={developer}
              rank={index + 1}
              location="San Francisco, CA"
            />
          ))}
        </div>

        {/* Demo Footer */}
        <div className="text-center mt-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors">
              Ready to find real developers?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">
              Search for developers in your city or state using the GitHub API.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Start Searching
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 