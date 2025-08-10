'use client';

import { useState, useEffect } from 'react';
import { MapPin, Loader2, Github } from 'lucide-react';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import DeveloperCard from './components/DeveloperCard';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';

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

interface SearchResult {
  total_count: number;
  items: Developer[];
}

export default function Home() {
  const [location, setLocation] = useState('chandrapur,Maharashtra');
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'repos' | 'followers'>('stars');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const searchDevelopers = async (resetPage = true) => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError('');
    setHasSearched(true);
    
    if (resetPage) {
      setPage(1);
      setDevelopers([]);
    }

    try {
      const response = await fetch(`/api/search-developers?location=${encodeURIComponent(location)}&page=${resetPage ? 1 : page}&sort=${sortBy}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch developers');
      }

      const data: SearchResult = await response.json();
      
      if (resetPage) {
        setDevelopers(data.items);
      } else {
        setDevelopers(prev => [...prev, ...data.items]);
      }
      
      setHasMore(data.items.length === 30); // GitHub API returns max 30 items per page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Auto-search on first load with default location
  useEffect(() => {
    if (!hasSearched) {
      searchDevelopers();
    }
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      searchDevelopers(false);
    }
  };

  const handleSort = (newSortBy: 'stars' | 'repos' | 'followers') => {
    setSortBy(newSortBy);
    setPage(1);
    searchDevelopers(true);
  };

  const sortedDevelopers = [...developers].sort((a, b) => {
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
                GitHub Finder
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 transition-colors">
                Discover top developers in your city or state
              </p>
              {/* <div className="flex justify-center gap-4">
                <a
                  href="/demo"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  View Demo
                </a>
              </div> */}
            </div>
            <div className="ml-4 flex items-center gap-3">
              {/* GitHub Repository Link */}
              <a
                href="https://github.com/Manmit124/GitHub-Finder-App-"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                title="View source code on GitHub"
              >
                <Github className="h-5 w-5" />
                {/* <span className="hidden sm:inline text-sm font-medium">Give us Star on GitHub</span> */}
              </a>
              {/* <ThemeToggle /> */}
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          location={location}
          onLocationChange={setLocation}
          onSearch={() => searchDevelopers()}
          loading={loading}
        />
      </div>

      {/* Results Section */}
      {developers.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <SortControls
            sortBy={sortBy}
            onSortChange={handleSort}
            developerCount={developers.length}
          />

          {/* Developer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDevelopers.map((developer, index) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                rank={index + 1}
                location={location}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Load More Developers'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && developers.length === 0 && hasSearched && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4 transition-colors" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors">
              No developers found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 transition-colors">
              Try searching for a different location or check your spelling.
            </p>
          </div>
        </div>
      )}

      {/* Loading State for Initial Search */}
      {loading && developers.length === 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner size="lg" text="Searching for developers in chandrapur,Maharashtra..." />
        </div>
      )}
    </div>
  );
}
