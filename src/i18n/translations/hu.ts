export const hu = {
  // Header
  appTitle: 'Társas Kereső',
  searchPlaceholder: 'Társasjáték keresése...',
  watchlist: 'Kívánságlista',

  // Filter Panel
  filters: 'Szűrők',
  clear: 'Törlés',
  sort: 'Rendezés',
  sortByRank: 'Rangsor',
  sortByRating: 'Értékelés',
  sortByComplexityDesc: 'Komplexitás (nehéz először)',
  sortByComplexityAsc: 'Komplexitás (könnyű először)',
  sortByName: 'Név',
  sortByYear: 'Kiadás éve',
  sortByPlayersDesc: 'Játékosszám (sok először)',
  sortByPlayersAsc: 'Játékosszám (kevés először)',
  sortByPlaytimeDesc: 'Játékidő (hosszú először)',
  sortByPlaytimeAsc: 'Játékidő (rövid először)',
  playerCount: 'Játékosszám',
  playTime: 'Játékidő',
  under30min: '30 perc alatt',
  '30to60min': '30-60 perc',
  '1to2hours': '1-2 óra',
  over2hours: '2+ óra',
  complexity: 'Komplexitás',
  easy: 'Könnyű (1-2)',
  medium: 'Közepes (2-3)',
  hard: 'Nehéz (3-4)',
  veryHard: 'Nagyon nehéz (4-5)',
  minRating: 'Minimum értékelés',
  ageGroup: 'Korosztály',

  // Game Card
  players: 'Játékosok',
  playTimeLabel: 'Játékidő',
  complexityLabel: 'Komplexitás',

  // Game Grid
  loadingGames: 'Játékok betöltése...',
  error: 'Hiba',
  noGamesFound: 'Nem találtunk játékokat.',
  tryDifferentFilters: 'Próbálj más keresési feltételeket!',
  loadMore: 'Továbbiak betöltése',
  loading: 'Betöltés...',

  // Game Modal
  player: 'játékos',
  playerPlural: 'játékos',
  minute: 'perc',
  ratings: 'értékelés',
  inRanking: 'a rangsorban',
  playersLabel: 'Játékosok',
  categories: 'Kategóriák',
  mechanics: 'Mechanikák',
  designers: 'Tervező(k)',
  description: 'Leírás',
  onWatchlist: 'Kívánságlistán',
  addToWatchlist: 'Kívánságlistához',

  // Watchlist
  watchlistTitle: 'Kívánságlista',
  emptyWatchlist: 'A kívánságlistád üres',
  addGamesWhileBrowsing: 'Adj hozzá játékokat a böngészés során!',
  owned: 'Megvan',
  markAsOwned: 'Megjelölés: megvan',
  wantToPlay: 'Játszani akarok vele',
  markAsWantToPlay: 'Megjelölés: játszani akarok',
  openOnBgg: 'Megnyitás BGG-n',
  remove: 'Eltávolítás',
  gamesOnList: 'játék a listán',
  iOwn: 'megvan',
  iWantToPlay: 'játszani akarok',

  // Token Setup
  tokenRequired: 'BGG API Token szükséges',
  tokenDescription: 'A BoardGameGeek API használatához API token szükséges. Regisztrálj egy alkalmazást a BGG-n és másold be a tokent.',
  bggApiDocs: 'BGG API dokumentáció',
  enterToken: 'Add meg a BGG API tokent...',
  pleaseEnterToken: 'Kérlek add meg a tokent',
  save: 'Mentés',

  // Language
  language: 'Nyelv',
  hungarian: 'Magyar',
  english: 'English',
};

export type TranslationKeys = keyof typeof hu;
