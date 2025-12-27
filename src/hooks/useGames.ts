import { useState, useEffect, useCallback } from 'react';
import { getHotGames, getGamesDetails, searchGames, TOP_GAME_IDS } from '../api/bgg';
import type { BoardGame, HotGame, FilterOptions, SortOption } from '../types/boardgame';

interface UseGamesOptions {
  filters?: FilterOptions;
  sortBy?: SortOption;
  searchQuery?: string;
}

interface UseGamesReturn {
  games: BoardGame[];
  hotGames: HotGame[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  refresh: () => void;
}

export function useGames({ filters, sortBy = 'rank', searchQuery }: UseGamesOptions = {}): UseGamesReturn {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [hotGames, setHotGames] = useState<HotGame[]>([]);
  const [allGames, setAllGames] = useState<BoardGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 12;

  // Load hot games and top games on mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load hot games
        const hot = await getHotGames();
        setHotGames(hot);

        // Load top games details
        const topGames = await getGamesDetails(TOP_GAME_IDS);
        setAllGames(topGames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Hiba történt a betöltés során');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Search for games
  useEffect(() => {
    if (!searchQuery?.trim()) return;

    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchGames(searchQuery);
        if (results.length > 0) {
          const ids = results.slice(0, 30).map((r) => r.id);
          const details = await getGamesDetails(ids);
          setAllGames(details);
        } else {
          setAllGames([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Hiba történt a keresés során');
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(search, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Filter and sort games
  useEffect(() => {
    let filtered = [...allGames];

    // Apply filters
    if (filters) {
      if (filters.minPlayers !== undefined) {
        filtered = filtered.filter((g) => g.maxPlayers >= filters.minPlayers!);
      }
      if (filters.maxPlayers !== undefined) {
        filtered = filtered.filter((g) => g.minPlayers <= filters.maxPlayers!);
      }
      if (filters.minPlayTime !== undefined) {
        filtered = filtered.filter((g) => g.playingTime >= filters.minPlayTime!);
      }
      if (filters.maxPlayTime !== undefined) {
        filtered = filtered.filter((g) => g.playingTime <= filters.maxPlayTime!);
      }
      if (filters.minComplexity !== undefined) {
        filtered = filtered.filter((g) => g.complexity >= filters.minComplexity!);
      }
      if (filters.maxComplexity !== undefined) {
        filtered = filtered.filter((g) => g.complexity <= filters.maxComplexity!);
      }
      if (filters.minRating !== undefined) {
        filtered = filtered.filter((g) => g.rating >= filters.minRating!);
      }
      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter((g) =>
          filters.categories!.some((c) => g.categories.includes(c))
        );
      }
      if (filters.mechanics && filters.mechanics.length > 0) {
        filtered = filtered.filter((g) =>
          filters.mechanics!.some((m) => g.mechanics.includes(m))
        );
      }
    }

    // Sort
    switch (sortBy) {
      case 'rank':
        filtered.sort((a, b) => (a.rank || 9999) - (b.rank || 9999));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'complexity_asc':
        filtered.sort((a, b) => a.complexity - b.complexity);
        break;
      case 'complexity_desc':
        filtered.sort((a, b) => b.complexity - a.complexity);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'year':
        filtered.sort((a, b) => b.yearPublished - a.yearPublished);
        break;
    }

    // Paginate
    setGames(filtered.slice(0, (page + 1) * PAGE_SIZE));
  }, [allGames, filters, sortBy, page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    setPage(0);

    try {
      const topGames = await getGamesDetails(TOP_GAME_IDS);
      setAllGames(topGames);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hiba történt a frissítés során');
    } finally {
      setLoading(false);
    }
  }, []);

  const hasMore = games.length < allGames.length;

  return {
    games,
    hotGames,
    loading,
    error,
    loadMore,
    hasMore,
    refresh,
  };
}
