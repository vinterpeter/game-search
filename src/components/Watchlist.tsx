import { X, ExternalLink, Trash2, Package, Gamepad2 } from 'lucide-react';
import type { WatchlistItem } from '../types/boardgame';
import { useWatchlist } from '../hooks/useWatchlist';
import { useI18n } from '../i18n';
import './Watchlist.css';

interface WatchlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Watchlist = ({ isOpen, onClose }: WatchlistProps) => {
  const { items, removeItem, toggleOwned, toggleWantToPlay } = useWatchlist();
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="watchlist-overlay" onClick={onClose}>
      <div className="watchlist-panel" onClick={(e) => e.stopPropagation()}>
        <div className="watchlist-header">
          <h2>{t('watchlistTitle')}</h2>
          <button className="watchlist-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="watchlist-empty">
            <Gamepad2 size={48} />
            <p>{t('emptyWatchlist')}</p>
            <small>{t('addGamesWhileBrowsing')}</small>
          </div>
        ) : (
          <div className="watchlist-items">
            {items.map((item: WatchlistItem) => (
              <div key={item.id} className="watchlist-item">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="watchlist-item-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
                <div className="watchlist-item-info">
                  <h3>{item.name}</h3>
                  <div className="watchlist-item-meta">
                    {item.yearPublished && <span>{item.yearPublished}</span>}
                    {item.rating > 0 && <span>★ {item.rating.toFixed(1)}</span>}
                  </div>
                </div>
                <div className="watchlist-item-actions">
                  <button
                    className={`btn-owned ${item.owned ? 'active' : ''}`}
                    onClick={() => toggleOwned(item.id)}
                    title={item.owned ? t('owned') : t('markAsOwned')}
                  >
                    <Package size={18} />
                  </button>
                  <button
                    className={`btn-want-to-play ${item.wantToPlay ? 'active' : ''}`}
                    onClick={() => toggleWantToPlay(item.id)}
                    title={item.wantToPlay ? t('wantToPlay') : t('markAsWantToPlay')}
                  >
                    <Gamepad2 size={18} />
                  </button>
                  <a
                    href={`https://boardgamegeek.com/boardgame/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-bgg"
                    title={t('openOnBgg')}
                  >
                    <ExternalLink size={18} />
                  </a>
                  <button
                    className="btn-remove"
                    onClick={() => removeItem(item.id)}
                    title={t('remove')}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="watchlist-footer">
            <span>{items.length} {t('gamesOnList')}</span>
            <span>
              {items.filter((i) => i.owned).length} {t('iOwn')} •{' '}
              {items.filter((i) => i.wantToPlay).length} {t('iWantToPlay')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
