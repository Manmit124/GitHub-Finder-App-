# GitHub Finder

A modern web application that helps users discover top GitHub developers in their city or state. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Location-based Search**: Search for developers by city or state
- **GitHub Profile Integration**: Fetch and display comprehensive developer information using the GitHub API
- **Smart Ranking System**: Sort developers by:
  - Total stars across repositories
  - Number of public repositories
  - Follower count
- **Beautiful Profile Cards**: Display developer avatars, usernames, bios, and key statistics
- **Infinite Scroll**: Load more developers with pagination support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Sorting**: Change ranking criteria on the fly

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **API**: GitHub REST API
- **Architecture**: App Router, Server Components, API Routes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Search by Location**: Enter a city or state name in the search bar
2. **View Results**: Browse through developer profiles with key metrics
3. **Sort Results**: Use the sort controls to rank developers by different criteria
4. **Load More**: Click "Load More Developers" to see additional results
5. **View Profiles**: Click "View Profile" to visit a developer's GitHub page

## API Endpoints

- `GET /api/search-developers` - Search for developers by location
  - Query parameters:
    - `location` (required): City or state to search in
    - `page` (optional): Page number for pagination
    - `sort` (optional): Sort criteria (stars, repos, followers)

## GitHub API Integration

The application uses the GitHub REST API to:
- Search users by location
- Fetch detailed user profiles
- Retrieve repository information
- Calculate total star counts

**Note**: For production use, consider adding a GitHub Personal Access Token to increase API rate limits.

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── DeveloperCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── SearchBar.tsx
│   └── SortControls.tsx
├── api/                # API routes
│   └── search-developers/
│       └── route.ts
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Main page component
```

## Features in Detail

### Search Functionality
- Real-time location input with suggestions
- Error handling for invalid locations
- Loading states and user feedback

### Developer Cards
- Profile pictures and usernames
- Bio information (when available)
- Key metrics display:
  - Total repository stars
  - Public repository count
  - Follower count
- Direct links to GitHub profiles

### Ranking System
- **Stars**: Total stars across all repositories
- **Repositories**: Number of public repositories
- **Followers**: GitHub follower count
- Real-time sorting without page refresh

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interface elements

## Performance Optimizations

- Lazy loading of developer data
- Efficient API calls with proper error handling
- Optimized image loading
- Smooth transitions and animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and the GitHub API**
