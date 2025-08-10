import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  location: string;
  onLocationChange: (location: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ location, onLocationChange, onSearch, loading }: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 transition-colors" />
            <input
              type="text"
              placeholder="Enter city or state (e.g., San Francisco, California)"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full text-black dark:text-white bg-white dark:bg-gray-700 pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            />
          </div>
        </div>
        <button
          onClick={onSearch}
          disabled={loading || !location.trim()}
          className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          Search
        </button>
      </div>
    </div>
  );
} 