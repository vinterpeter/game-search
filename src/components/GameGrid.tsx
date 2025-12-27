import { Loader2 } from 'lucide-react';
import type { BoardGame } from '../types/boardgame';
import { GameCard } from './GameCard';
import { useI18n } from '../i18n';
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
  const { t } = useI18n();

  if (loading && games.length === 0) {
    return (
      <div className="game-grid__loading">
        <Loader2 size={40} className="spin" />
        <p>{t('loadingGames')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-grid__error">
        <p>{t('error')}: {error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="game-grid__empty">
        <p>{t('noGamesFound')}</p>
        <p>{t('tryDifferentFilters')}</p>
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
              <Loader2 size={16} className="spin" /> {t('loading')}
            </>
          ) : (
            t('loadMore')
          )}
        </button>
      )}
    </div>
  );
};
