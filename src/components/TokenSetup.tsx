import { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';
import { setBggToken } from '../api/bgg';
import { useI18n } from '../i18n';
import './TokenSetup.css';

interface TokenSetupProps {
  onTokenSet: () => void;
}

export function TokenSetup({ onTokenSet }: TokenSetupProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      setBggToken(token.trim());
      onTokenSet();
    } else {
      setError(t('pleaseEnterToken'));
    }
  };

  return (
    <div className="token-setup">
      <div className="token-setup-card">
        <div className="token-setup-icon">
          <Key size={48} />
        </div>
        <h2>{t('tokenRequired')}</h2>
        <p>{t('tokenDescription')}</p>
        <a
          href="https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc11"
          target="_blank"
          rel="noopener noreferrer"
          className="token-link"
        >
          <ExternalLink size={16} />
          {t('bggApiDocs')}
        </a>
        <form onSubmit={handleSubmit} className="token-form">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder={t('enterToken')}
            className="token-input"
          />
          {error && <p className="token-error">{error}</p>}
          <button type="submit" className="token-button">
            {t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}
