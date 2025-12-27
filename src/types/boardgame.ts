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
  minAge?: number;
  maxAge?: number;
  minYear?: number;
  maxYear?: number;
  categories?: string[];
  mechanics?: string[];
  designers?: string[];
}

export type SortOption =
  | 'rank'
  | 'rating'
  | 'complexity_asc'
  | 'complexity_desc'
  | 'name'
  | 'year'
  | 'players_asc'
  | 'players_desc'
  | 'playtime_asc'
  | 'playtime_desc';

// User collection types
export interface CollectionItem {
  id: number;
  name: string;
  thumbnail: string;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  playingTime: number;
  rating: number;
  owned: boolean;
  prevOwned: boolean;
  forTrade: boolean;
  want: boolean;
  wantToPlay: boolean;
  wantToBuy: boolean;
  wishlist: boolean;
  wishlistPriority: number;
  preordered: boolean;
  numPlays: number;
  personalRating: number;
  comment: string;
}

// Play history types
export interface PlayRecord {
  id: number;
  date: string;
  quantity: number;
  length: number;
  incomplete: boolean;
  location: string;
  gameId: number;
  gameName: string;
  comments: string;
  players: PlayPlayer[];
}

export interface PlayPlayer {
  username: string;
  name: string;
  score: string;
  new: boolean;
  win: boolean;
}

// Hot list types
export type HotListType =
  | 'boardgame'
  | 'boardgamecompany'
  | 'boardgameperson'
  | 'rpg'
  | 'rpgcompany'
  | 'rpgperson'
  | 'videogame'
  | 'videogamecompany';
