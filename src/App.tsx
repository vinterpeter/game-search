import { useState } from 'react';
import { Header } from './components/Header';
import { GameGrid } from './components/GameGrid';
import { FilterPanel } from './components/FilterPanel';
import { GameModal } from './components/GameModal';
import { Watchlist } from './components/Watchlist';
import { useGames } from './hooks/useGames';
import { useWatchlist } from './hooks/useWatchlist';
import type { BoardGame, FilterOptions, SortOption } from './types/boardgame';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<SortOption>('rank');
  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  const { games, loading, error, loadMore, hasMore } = useGames({
    filters,
    sortBy,
    searchQuery,
  });

  const { items } = useWatchlist();

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="app">
      <Header
        onSearch={setSearchQuery}
        onWatchlistClick={() => setIsWatchlistOpen(true)}
        watchlistCount={items.length}
      />

      <main className="main-content">
        <FilterPanel
          filters={filters}
          sortBy={sortBy}
          onFiltersChange={setFilters}
          onSortChange={setSortBy}
          onClear={handleClearFilters}
        />

        <GameGrid
          games={games}
          loading={loading}
          error={error}
          onGameClick={setSelectedGame}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />
      </main>

      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      <Watchlist
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
      />
    </div>
  );
}

export default App;
