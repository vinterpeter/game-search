import { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';
import { setBggToken } from '../api/bgg';
import './TokenSetup.css';

interface TokenSetupProps {
  onTokenSet: () => void;
}

export function TokenSetup({ onTokenSet }: TokenSetupProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      setBggToken(token.trim());
      onTokenSet();
    } else {
      setError('Kérlek add meg a tokent');
    }
  };

  return (
    <div className="token-setup">
      <div className="token-setup-card">
        <div className="token-setup-icon">
          <Key size={48} />
        </div>
        <h2>BGG API Token szükséges</h2>
        <p>
          A BoardGameGeek API használatához API token szükséges.
          Regisztrálj egy alkalmazást a BGG-n és másold be a tokent.
        </p>
        <a
          href="https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc11"
          target="_blank"
          rel="noopener noreferrer"
          className="token-link"
        >
          <ExternalLink size={16} />
          BGG API dokumentáció
        </a>
        <form onSubmit={handleSubmit} className="token-form">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Add meg a BGG API tokent..."
            className="token-input"
          />
          {error && <p className="token-error">{error}</p>}
          <button type="submit" className="token-button">
            Mentés
          </button>
        </form>
      </div>
    </div>
  );
}
