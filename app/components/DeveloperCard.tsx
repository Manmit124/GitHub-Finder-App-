import { Star, GitBranch, Users } from 'lucide-react';

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

interface DeveloperCardProps {
  developer: Developer;
  rank: number;
  location: string;
}

export default function DeveloperCard({ developer, rank, location }: DeveloperCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={developer.avatar_url}
            alt={developer.login}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
              {developer.login}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
              #{rank} in {location}
            </p>
          </div>
        </div>
        
        {developer.bio && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 transition-colors">
            {developer.bio}
          </p>
        )}
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-600 dark:text-yellow-400 mb-1 transition-colors">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">{developer.total_stars.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Total Stars</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1 transition-colors">
              <GitBranch className="h-4 w-4" />
              <span className="text-sm font-medium">{developer.public_repos.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Repositories</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1 transition-colors">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">{developer.followers.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Followers</p>
          </div>
        </div>
        
        <a
          href={developer.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
  );
} 