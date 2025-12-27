export interface BoardGame {
  id: number;
  name: string;
  yearPublished: number;
  thumbnail: string;
  image: string;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  minPlayTime: number;
  maxPlayTime: number;
  minAge: number;
  description: string;
  rating: number;
  usersRated: number;
  complexity: number; // 1-5 scale
  rank: number;
  categories: string[];
  mechanics: string[];
  designers: string[];
  publishers: string[];
}

export interface BoardGameSearchResult {
  id: number;
  name: string;
  yearPublished: number;
  thumbnail?: string;
}

export interface HotGame {
  id: number;
  name: string;
  thumbnail: string;
  yearPublished?: number;
  rank: number;
}

export interface WatchlistItem {
  id: number;
  name: string;
  thumbnail: string;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  complexity: number;
  rating: number;
  addedAt: string;
  owned: boolean;
  wantToPlay: boolean;
}

export interface FilterOptions {
  minPlayers?: number;
  maxPlayers?: number;
  minPlayTime?: number;
  maxPlayTime?: number;
  minComplexity?: number;
  maxComplexity?: number;
  minRating?: number;
  categories?: string[];
  mechanics?: string[];
}

export type SortOption =
  | 'rank'
  | 'rating'
  | 'complexity_asc'
  | 'complexity_desc'
  | 'name'
  | 'year';
