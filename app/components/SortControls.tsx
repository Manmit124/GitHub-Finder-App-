interface SortControlsProps {
  sortBy: 'stars' | 'repos' | 'followers';
  onSortChange: (sortBy: 'stars' | 'repos' | 'followers') => void;
  developerCount: number;
}

export default function SortControls({ sortBy, onSortChange, developerCount }: SortControlsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-colors">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">
          Found {developerCount} developers
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => onSortChange('stars')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'stars'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Sort by Stars
          </button>
          <button
            onClick={() => onSortChange('repos')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'repos'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Sort by Repos
          </button>
          <button
            onClick={() => onSortChange('followers')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'followers'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Sort by Followers
          </button>
        </div>
      </div>
    </div>
  );
} 