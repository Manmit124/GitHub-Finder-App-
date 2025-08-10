export const githubConfig = {
  // Base URL for GitHub API
  baseUrl: 'https://api.github.com',
  
  // Default headers for API requests
  defaultHeaders: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': process.env.GITHUB_APP_NAME || 'GitHub-Finder-App',
  },
  
  // API rate limits (requests per hour)
  rateLimits: {
    unauthenticated: 60,
    authenticated: 5000,
  },
  
  // Search parameters
  search: {
    maxResultsPerPage: 30,
    maxPages: 10, // GitHub API allows up to 1000 results (30 * 34 pages)
  },
  
  // Repository fetching
  repositories: {
    maxPerUser: 100, // Maximum repositories to fetch per user for star calculation
    sortBy: 'stars',
    order: 'desc',
  },
};

// Helper function to get headers with optional authentication
export function getGitHubHeaders(token?: string) {
  const headers: Record<string, string> = { ...githubConfig.defaultHeaders };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  
  return headers;
} 