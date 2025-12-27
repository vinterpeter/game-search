import { useState } from 'react';
import { Header } from './components/Header';
import { GameGrid } from './components/GameGrid';
import { FilterPanel } from './components/FilterPanel';
import { GameModal } from './components/GameModal';
import { Watchlist } from './components/Watchlist';
import { TokenSetup } from './components/TokenSetup';
import { useGames } from './hooks/useGames';
import { useWatchlist } from './hooks/useWatchlist';
import { hasBggToken } from './api/bgg';
import type { BoardGame, FilterOptions, SortOption } from './types/boardgame';
import './App.css';

function App() {
  const [hasToken, setHasToken] = useState(hasBggToken());
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

  if (!hasToken) {
    return (
      <div className="app">
        <Header
          onSearch={() => {}}
          onWatchlistClick={() => {}}
          watchlistCount={0}
        />
        <TokenSetup onTokenSet={() => setHasToken(true)} />
      </div>
    );
  }

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
