import { Loader2 } from 'lucide-react';
import type { BoardGame } from '../types/boardgame';
import { GameCard } from './GameCard';
import './GameGrid.css';

interface GameGridProps {
  games: BoardGame[];
  loading: boolean;
  error?: string | null;
  onGameClick: (game: BoardGame) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const GameGrid = ({
  games,
  loading,
  error,
  onGameClick,
  onLoadMore,
  hasMore,
}: GameGridProps) => {
  if (loading && games.length === 0) {
    return (
      <div className="game-grid__loading">
        <Loader2 size={40} className="spin" />
        <p>Játékok betöltése...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-grid__error">
        <p>Hiba: {error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="game-grid__empty">
        <p>Nem találtunk játékokat.</p>
        <p>Próbálj más keresési feltételeket!</p>
      </div>
    );
  }

  return (
    <div className="game-grid-container">
      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onClick={onGameClick} />
        ))}
      </div>

      {hasMore && (
        <button
          className="game-grid__load-more"
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="spin" /> Betöltés...
            </>
          ) : (
            'Továbbiak betöltése'
          )}
        </button>
      )}
    </div>
  );
};
