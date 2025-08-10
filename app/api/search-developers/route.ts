import { NextRequest, NextResponse } from 'next/server';
import { githubConfig, getGitHubHeaders } from '../../../config/github';

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

interface GitHubRepo {
  stargazers_count: number;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubUser[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const page = searchParams.get('page') || '1';
    const sort = searchParams.get('sort') || 'stars';

    if (!location) {
      return NextResponse.json(
        { error: 'Location parameter is required' },
        { status: 400 }
      );
    }

    // Check if page number is within limits
    const pageNum = parseInt(page);
    if (pageNum > githubConfig.search.maxPages) {
      return NextResponse.json(
        { error: `Page number cannot exceed ${githubConfig.search.maxPages}` },
        { status: 400 }
      );
    }

    // Get GitHub token from environment
    const token = process.env.GITHUB_TOKEN;
    const headers = getGitHubHeaders(token);

    // Search for users by location
    const searchUrl = `${githubConfig.baseUrl}/search/users?q=location:"${encodeURIComponent(location)}"&page=${page}&per_page=${githubConfig.search.maxResultsPerPage}&sort=repositories&order=desc`;
    
    const searchResponse = await fetch(searchUrl, { headers });

    if (!searchResponse.ok) {
      if (searchResponse.status === 403) {
        return NextResponse.json(
          { error: 'GitHub API rate limit exceeded. Please try again later or add a GitHub token.' },
          { status: 429 }
        );
      }
      throw new Error(`GitHub API error: ${searchResponse.status}`);
    }

    const searchData: GitHubSearchResponse = await searchResponse.json();
    
    // Fetch detailed user information and calculate total stars
    const enrichedUsers = await Promise.all(
      searchData.items.map(async (user) => {
        try {
          // Get user details
          const userResponse = await fetch(`${githubConfig.baseUrl}/users/${user.login}`, {
            headers,
          });

          if (!userResponse.ok) {
            console.warn(`Failed to fetch user ${user.login}: ${userResponse.status}`);
            return {
              ...user,
              total_stars: 0,
              bio: null,
              location: null,
              public_repos: 0,
              followers: 0,
            };
          }

          const userDetails = await userResponse.json();

          // Get user's repositories to calculate total stars
          const reposResponse = await fetch(
            `${githubConfig.baseUrl}/users/${user.login}/repos?per_page=${githubConfig.repositories.maxPerUser}&sort=${githubConfig.repositories.sortBy}&order=${githubConfig.repositories.order}`,
            { headers }
          );

          let totalStars = 0;
          if (reposResponse.ok) {
            const repos: GitHubRepo[] = await reposResponse.json();
            totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
          }

          return {
            ...userDetails,
            total_stars: totalStars,
          };
        } catch (error) {
          console.error(`Error processing user ${user.login}:`, error);
          return {
            ...user,
            total_stars: 0,
            bio: null,
            location: null,
            public_repos: 0,
            followers: 0,
          };
        }
      })
    );

    // Sort users based on the requested criteria
    const sortedUsers = enrichedUsers.sort((a, b) => {
      switch (sort) {
        case 'stars':
          return b.total_stars - a.total_stars;
        case 'repos':
          return b.public_repos - a.public_repos;
        case 'followers':
          return b.followers - a.followers;
        default:
          return b.total_stars - a.total_stars;
      }
    });

    return NextResponse.json({
      total_count: searchData.total_count,
      items: sortedUsers,
      page: pageNum,
      has_more: searchData.items.length === githubConfig.search.maxResultsPerPage && pageNum < githubConfig.search.maxPages,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 