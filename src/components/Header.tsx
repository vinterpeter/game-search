import { useState } from 'react';
import { Dice5, X, Search, BookmarkCheck } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
  onWatchlistClick: () => void;
  watchlistCount: number;
}

export const Header = ({
  onSearch,
  onWatchlistClick,
  watchlistCount,
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <header className="header">
      <div className="header__content">
        {/* Logo */}
        <div className="header__brand">
          <Dice5 size={24} />
          <span className="header__title">Társas Kereső</span>
        </div>

        {/* Search */}
        <form className="header__search" onSubmit={handleSubmit}>
          <div className="header__search-wrapper">
            <Search size={16} className="header__search-icon" />
            <input
              type="text"
              placeholder="Társasjáték keresése..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header__search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="header__search-clear"
                onClick={handleClear}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>

        {/* Watchlist */}
        <button className="header__watchlist-btn" onClick={onWatchlistClick}>
          <BookmarkCheck size={18} />
          <span className="header__watchlist-text">Kívánságlista</span>
          {watchlistCount > 0 && (
            <span className="header__watchlist-count">{watchlistCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};
