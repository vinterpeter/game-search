import type { FilterOptions, SortOption } from '../types/boardgame';
import './FilterPanel.css';

interface FilterPanelProps {
  filters: FilterOptions;
  sortBy: SortOption;
  onFiltersChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
}

const PLAYER_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6+' },
];

const PLAYTIME_OPTIONS = [
  { min: 0, max: 30, label: '30 perc alatt' },
  { min: 30, max: 60, label: '30-60 perc' },
  { min: 60, max: 120, label: '1-2 óra' },
  { min: 120, max: 9999, label: '2+ óra' },
];

const COMPLEXITY_OPTIONS = [
  { min: 1, max: 2, label: 'Könnyű (1-2)' },
  { min: 2, max: 3, label: 'Közepes (2-3)' },
  { min: 3, max: 4, label: 'Nehéz (3-4)' },
  { min: 4, max: 5, label: 'Nagyon nehéz (4-5)' },
];

export const FilterPanel = ({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  onClear,
}: FilterPanelProps) => {
  const handlePlayerChange = (players: number | undefined) => {
    onFiltersChange({
      ...filters,
      minPlayers: players,
      maxPlayers: players,
    });
  };

  const handlePlayTimeChange = (min: number | undefined, max: number | undefined) => {
    onFiltersChange({
      ...filters,
      minPlayTime: min,
      maxPlayTime: max,
    });
  };

  const handleComplexityChange = (min: number | undefined, max: number | undefined) => {
    onFiltersChange({
      ...filters,
      minComplexity: min,
      maxComplexity: max,
    });
  };

  const handleRatingChange = (rating: number | undefined) => {
    onFiltersChange({
      ...filters,
      minRating: rating,
    });
  };

  const hasActiveFilters =
    filters.minPlayers !== undefined ||
    filters.minPlayTime !== undefined ||
    filters.minComplexity !== undefined ||
    filters.minRating !== undefined;

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <h2>Szűrők</h2>
        {hasActiveFilters && (
          <button className="filter-panel__clear" onClick={onClear}>
            Törlés
          </button>
        )}
      </div>

      {/* Rendezés */}
      <div className="filter-section">
        <h3>Rendezés</h3>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="rank">Rangsor</option>
          <option value="rating">Értékelés</option>
          <option value="complexity_desc">Komplexitás (nehéz először)</option>
          <option value="complexity_asc">Komplexitás (könnyű először)</option>
          <option value="name">Név</option>
          <option value="year">Kiadás éve</option>
        </select>
      </div>

      {/* Játékosszám */}
      <div className="filter-section">
        <h3>Játékosszám</h3>
        <div className="filter-chips">
          {PLAYER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`filter-chip ${filters.minPlayers === opt.value ? 'active' : ''}`}
              onClick={() =>
                handlePlayerChange(
                  filters.minPlayers === opt.value ? undefined : opt.value
                )
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Játékidő */}
      <div className="filter-section">
        <h3>Játékidő</h3>
        <div className="filter-chips">
          {PLAYTIME_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className={`filter-chip ${
                filters.minPlayTime === opt.min && filters.maxPlayTime === opt.max
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                if (filters.minPlayTime === opt.min && filters.maxPlayTime === opt.max) {
                  handlePlayTimeChange(undefined, undefined);
                } else {
                  handlePlayTimeChange(opt.min, opt.max);
                }
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Komplexitás */}
      <div className="filter-section">
        <h3>Komplexitás</h3>
        <div className="filter-chips">
          {COMPLEXITY_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className={`filter-chip ${
                filters.minComplexity === opt.min && filters.maxComplexity === opt.max
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                if (filters.minComplexity === opt.min && filters.maxComplexity === opt.max) {
                  handleComplexityChange(undefined, undefined);
                } else {
                  handleComplexityChange(opt.min, opt.max);
                }
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum értékelés */}
      <div className="filter-section">
        <h3>Minimum értékelés</h3>
        <div className="filter-chips">
          {[7, 7.5, 8, 8.5].map((rating) => (
            <button
              key={rating}
              className={`filter-chip ${filters.minRating === rating ? 'active' : ''}`}
              onClick={() =>
                handleRatingChange(filters.minRating === rating ? undefined : rating)
              }
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
