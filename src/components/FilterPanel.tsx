import type { FilterOptions, SortOption } from '../types/boardgame';
import { useI18n } from '../i18n';
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

const AGE_OPTIONS = [
  { value: 6, label: '6+' },
  { value: 8, label: '8+' },
  { value: 10, label: '10+' },
  { value: 12, label: '12+' },
  { value: 14, label: '14+' },
  { value: 18, label: '18+' },
];

export const FilterPanel = ({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  onClear,
}: FilterPanelProps) => {
  const { t } = useI18n();

  const PLAYTIME_OPTIONS = [
    { min: 0, max: 30, labelKey: 'under30min' as const },
    { min: 30, max: 60, labelKey: '30to60min' as const },
    { min: 60, max: 120, labelKey: '1to2hours' as const },
    { min: 120, max: 9999, labelKey: 'over2hours' as const },
  ];

  const COMPLEXITY_OPTIONS = [
    { min: 1, max: 2, labelKey: 'easy' as const },
    { min: 2, max: 3, labelKey: 'medium' as const },
    { min: 3, max: 4, labelKey: 'hard' as const },
    { min: 4, max: 5, labelKey: 'veryHard' as const },
  ];

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

  const handleAgeChange = (age: number | undefined) => {
    onFiltersChange({
      ...filters,
      minAge: age,
    });
  };

  const hasActiveFilters =
    filters.minPlayers !== undefined ||
    filters.minPlayTime !== undefined ||
    filters.minComplexity !== undefined ||
    filters.minRating !== undefined ||
    filters.minAge !== undefined;

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <h2>{t('filters')}</h2>
        {hasActiveFilters && (
          <button className="filter-panel__clear" onClick={onClear}>
            {t('clear')}
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="filter-section">
        <h3>{t('sort')}</h3>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="rank">{t('sortByRank')}</option>
          <option value="rating">{t('sortByRating')}</option>
          <option value="complexity_desc">{t('sortByComplexityDesc')}</option>
          <option value="complexity_asc">{t('sortByComplexityAsc')}</option>
          <option value="name">{t('sortByName')}</option>
          <option value="year">{t('sortByYear')}</option>
          <option value="players_desc">{t('sortByPlayersDesc')}</option>
          <option value="players_asc">{t('sortByPlayersAsc')}</option>
          <option value="playtime_desc">{t('sortByPlaytimeDesc')}</option>
          <option value="playtime_asc">{t('sortByPlaytimeAsc')}</option>
        </select>
      </div>

      {/* Player count */}
      <div className="filter-section">
        <h3>{t('playerCount')}</h3>
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

      {/* Play time */}
      <div className="filter-section">
        <h3>{t('playTime')}</h3>
        <div className="filter-chips">
          {PLAYTIME_OPTIONS.map((opt) => (
            <button
              key={opt.labelKey}
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
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Complexity */}
      <div className="filter-section">
        <h3>{t('complexity')}</h3>
        <div className="filter-chips">
          {COMPLEXITY_OPTIONS.map((opt) => (
            <button
              key={opt.labelKey}
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
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Min rating */}
      <div className="filter-section">
        <h3>{t('minRating')}</h3>
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

      {/* Age group */}
      <div className="filter-section">
        <h3>{t('ageGroup')}</h3>
        <div className="filter-chips">
          {AGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`filter-chip ${filters.minAge === opt.value ? 'active' : ''}`}
              onClick={() =>
                handleAgeChange(filters.minAge === opt.value ? undefined : opt.value)
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
