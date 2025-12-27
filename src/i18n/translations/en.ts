import type { TranslationKeys } from './hu';

export const en: Record<TranslationKeys, string> = {
  // Header
  appTitle: 'Board Game Search',
  searchPlaceholder: 'Search board games...',
  watchlist: 'Watchlist',

  // Filter Panel
  filters: 'Filters',
  clear: 'Clear',
  sort: 'Sort',
  sortByRank: 'Rank',
  sortByRating: 'Rating',
  sortByComplexityDesc: 'Complexity (hard first)',
  sortByComplexityAsc: 'Complexity (easy first)',
  sortByName: 'Name',
  sortByYear: 'Year',
  sortByPlayersDesc: 'Players (most first)',
  sortByPlayersAsc: 'Players (least first)',
  sortByPlaytimeDesc: 'Playtime (longest first)',
  sortByPlaytimeAsc: 'Playtime (shortest first)',
  playerCount: 'Players',
  playTime: 'Play Time',
  under30min: 'Under 30 min',
  '30to60min': '30-60 min',
  '1to2hours': '1-2 hours',
  over2hours: '2+ hours',
  complexity: 'Complexity',
  easy: 'Easy (1-2)',
  medium: 'Medium (2-3)',
  hard: 'Hard (3-4)',
  veryHard: 'Very Hard (4-5)',
  minRating: 'Min Rating',
  ageGroup: 'Age',

  // Game Card
  players: 'Players',
  playTimeLabel: 'Play Time',
  complexityLabel: 'Complexity',

  // Game Grid
  loadingGames: 'Loading games...',
  error: 'Error',
  noGamesFound: 'No games found.',
  tryDifferentFilters: 'Try different search criteria!',
  loadMore: 'Load More',
  loading: 'Loading...',

  // Game Modal
  player: 'player',
  playerPlural: 'players',
  minute: 'min',
  ratings: 'ratings',
  inRanking: 'in ranking',
  playersLabel: 'Players',
  categories: 'Categories',
  mechanics: 'Mechanics',
  designers: 'Designer(s)',
  description: 'Description',
  onWatchlist: 'On Watchlist',
  addToWatchlist: 'Add to Watchlist',

  // Watchlist
  watchlistTitle: 'Watchlist',
  emptyWatchlist: 'Your watchlist is empty',
  addGamesWhileBrowsing: 'Add games while browsing!',
  owned: 'Owned',
  markAsOwned: 'Mark as owned',
  wantToPlay: 'Want to play',
  markAsWantToPlay: 'Mark as want to play',
  openOnBgg: 'Open on BGG',
  remove: 'Remove',
  gamesOnList: 'games on list',
  iOwn: 'owned',
  iWantToPlay: 'want to play',

  // Token Setup
  tokenRequired: 'BGG API Token Required',
  tokenDescription: 'A BoardGameGeek API token is required. Register an application on BGG and paste your token.',
  bggApiDocs: 'BGG API Documentation',
  enterToken: 'Enter BGG API token...',
  pleaseEnterToken: 'Please enter the token',
  save: 'Save',

  // Language
  language: 'Language',
  hungarian: 'Magyar',
  english: 'English',
};
