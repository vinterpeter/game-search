import { useEffect } from 'react';
import { X, Star, Users, Clock, Brain, Calendar, Check, Plus, ExternalLink } from 'lucide-react';
import type { BoardGame } from '../types/boardgame';
import { useWatchlist } from '../hooks/useWatchlist';
import './GameModal.css';

interface GameModalProps {
  game: BoardGame;
  onClose: () => void;
}

export const GameModal = ({ game, onClose }: GameModalProps) => {
  const { addItem, removeItem, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(game.id);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const playersText =
    game.minPlayers === game.maxPlayers
      ? `${game.minPlayers} játékos`
      : `${game.minPlayers}-${game.maxPlayers} játékos`;

  const playTimeText =
    game.minPlayTime === game.maxPlayTime || !game.minPlayTime
      ? `${game.playingTime} perc`
      : `${game.minPlayTime}-${game.maxPlayTime} perc`;

  // Decode HTML entities in description
  const decodeHTML = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value
      .replace(/&#10;/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '');
  };

  const bggUrl = `https://boardgamegeek.com/boardgame/${game.id}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-body">
          <div className="modal-image">
            <img
              src={game.image || game.thumbnail}
              alt={game.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/300x300?text=No+Image';
              }}
            />
            <div className="modal-buttons">
              <button
                className={`watchlist-button ${inWatchlist ? 'in-list' : ''}`}
                onClick={() => {
                  if (inWatchlist) {
                    removeItem(game.id);
                  } else {
                    addItem(game);
                  }
                }}
              >
                {inWatchlist ? (
                  <>
                    <Check size={16} /> Kívánságlistán
                  </>
                ) : (
                  <>
                    <Plus size={16} /> Kívánságlistához
                  </>
                )}
              </button>
              <a
                href={bggUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bgg-button"
              >
                <ExternalLink size={16} /> BoardGameGeek
              </a>
            </div>
          </div>

          <div className="modal-info">
            <h2 className="modal-title">{game.name}</h2>

            <div className="modal-meta">
              <span className="modal-year">
                <Calendar size={16} /> {game.yearPublished || 'N/A'}
              </span>
              <span className="modal-rating">
                <Star size={16} fill="currentColor" /> {game.rating.toFixed(1)}
                <small>({game.usersRated.toLocaleString()} értékelés)</small>
              </span>
              {game.rank > 0 && (
                <span className="modal-rank">#{game.rank} a rangsorban</span>
              )}
            </div>

            <div className="modal-stats">
              <div className="modal-stat">
                <Users size={20} />
                <div>
                  <strong>{playersText}</strong>
                  <small>Játékosok</small>
                </div>
              </div>
              <div className="modal-stat">
                <Clock size={20} />
                <div>
                  <strong>{playTimeText}</strong>
                  <small>Játékidő</small>
                </div>
              </div>
              <div className="modal-stat">
                <Brain size={20} />
                <div>
                  <strong>{game.complexity.toFixed(2)} / 5</strong>
                  <small>Komplexitás</small>
                </div>
              </div>
            </div>

            {game.categories.length > 0 && (
              <div className="modal-tags">
                <h4>Kategóriák</h4>
                <div className="modal-tag-list">
                  {game.categories.slice(0, 8).map((cat) => (
                    <span key={cat} className="modal-tag">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {game.mechanics.length > 0 && (
              <div className="modal-tags">
                <h4>Mechanikák</h4>
                <div className="modal-tag-list">
                  {game.mechanics.slice(0, 8).map((mech) => (
                    <span key={mech} className="modal-tag">
                      {mech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {game.designers.length > 0 && (
              <div className="modal-section">
                <h4>Tervező(k)</h4>
                <p>{game.designers.slice(0, 5).join(', ')}</p>
              </div>
            )}

            {game.description && (
              <div className="modal-description">
                <h4>Leírás</h4>
                <p>{decodeHTML(game.description)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
