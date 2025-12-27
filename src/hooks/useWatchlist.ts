import { useState, useEffect, useCallback } from 'react';
import type { BoardGame, WatchlistItem } from '../types/boardgame';

const STORAGE_KEY = 'game-watchlist';

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading watchlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loading]);

  const addItem = useCallback((game: BoardGame) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === game.id)) {
        return prev;
      }

      const newItem: WatchlistItem = {
        id: game.id,
        name: game.name,
        thumbnail: game.thumbnail,
        yearPublished: game.yearPublished,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        playingTime: game.playingTime,
        complexity: game.complexity,
        rating: game.rating,
        addedAt: new Date().toISOString(),
        owned: false,
        wantToPlay: true,
      };

      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleOwned = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, owned: !item.owned } : item
      )
    );
  }, []);

  const toggleWantToPlay = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, wantToPlay: !item.wantToPlay } : item
      )
    );
  }, []);

  const isInWatchlist = useCallback(
    (id: number) => items.some((item) => item.id === id),
    [items]
  );

  return {
    items,
    loading,
    addItem,
    removeItem,
    toggleOwned,
    toggleWantToPlay,
    isInWatchlist,
  };
}
