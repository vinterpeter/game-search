import { Star, Users, Clock, Brain } from 'lucide-react';
import type { BoardGame } from '../types/boardgame';
import './GameCard.css';

interface GameCardProps {
  game: BoardGame;
  onClick?: (game: BoardGame) => void;
}

export const GameCard = ({ game, onClick }: GameCardProps) => {
  const rating = game.rating ? game.rating.toFixed(1) : 'N/A';
  const complexity = game.complexity ? game.complexity.toFixed(1) : '-';

  const playersText =
    game.minPlayers === game.maxPlayers
      ? `${game.minPlayers}`
      : `${game.minPlayers}-${game.maxPlayers}`;

  return (
    <article className="game-card" onClick={() => onClick?.(game)}>
      <div className="game-card__image">
        <img
          src={game.thumbnail || '/placeholder-game.png'}
          alt={game.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image';
          }}
        />
        <div className="game-card__rating">
          <Star size={14} fill="currentColor" />
          {rating}
        </div>
        {game.rank > 0 && game.rank <= 100 && (
          <div className="game-card__rank">#{game.rank}</div>
        )}
      </div>
      <div className="game-card__info">
        <h3 className="game-card__title">{game.name}</h3>
        <p className="game-card__year">{game.yearPublished || 'N/A'}</p>
        <div className="game-card__stats">
          <span className="game-card__stat" title="Játékosok">
            <Users size={12} /> {playersText}
          </span>
          <span className="game-card__stat" title="Játékidő">
            <Clock size={12} /> {game.playingTime}'
          </span>
          <span className="game-card__stat" title="Komplexitás">
            <Brain size={12} /> {complexity}
          </span>
        </div>
      </div>
    </article>
  );
};
