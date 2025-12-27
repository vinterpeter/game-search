# Társas Kereső / Board Game Search

> **Verzió: 1.1.0**
>
> **Weboldal: https://vinterpeter.github.io/game-search/**

Többnyelvű webalkalmazás társasjátékok kereséséhez, szűréséhez és kívánságlista kezeléssel. A BoardGameGeek API-t használja.

Multilingual web application for searching, filtering board games and managing a watchlist. Uses the BoardGameGeek API.

## Funkciók

- **Top játékok**: A legjobb 30 társasjáték megjelenítése a BGG-ről
- **Keresés**: Társasjátékok keresése név alapján
- **Szűrők**:
  - Játékosszám (1-6+)
  - Játékidő (30 perc alatt, 30-60 perc, 1-2 óra, 2+ óra)
  - Komplexitás (könnyű, közepes, nehéz, nagyon nehéz)
  - Minimum értékelés (7+, 7.5+, 8+, 8.5+)
- **Rendezés**: Rangsor, értékelés, komplexitás, név, kiadási év
- **Kívánságlista**:
  - Játékok mentése helyi tárolásba
  - "Megvan" jelölés
  - "Játszani akarok" jelölés
- **Részletes modal**:
  - Játék leírás
  - Kategóriák és mechanikák
  - Tervezők
  - BGG link
- **Reszponzív design**: Mobil és desktop nézet támogatás
- **Többnyelvűség**: Magyar és angol nyelv támogatás
  - Automatikus nyelvfelismerés (böngésző nyelv alapján)
  - Nyelvválasztó a fejlécben
  - Beállítás mentése helyi tárolásba

## Technológiák

- React 19 + TypeScript
- Vite
- Lucide React (ikonok)
- xml2js (BGG XML válasz feldolgozás)
- CSS változók (dark téma)
- LocalStorage (kívánságlista perzisztencia)
- CORS Proxy (corsproxy.io)

## API

- **BoardGameGeek XML API v2**: Társasjáték adatok
  - Hot games lista
  - Játék keresés
  - Részletes játék információk

## BGG API Token

A BoardGameGeek 2025-től API authentikációt igényel. Token beszerzése:

1. Lépj be a [BGG](https://boardgamegeek.com) fiókodba
2. Menj a [BGG XML API2 dokumentációhoz](https://boardgamegeek.com/wiki/page/BGG_XML_API2)
3. Kövesd az utasításokat a token beszerzéséhez
4. Add meg a tokent az alkalmazásban

## Telepítés

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Mappastruktúra

```
src/
├── api/
│   └── bgg.ts                    # BoardGameGeek API integráció
├── components/
│   ├── Header.tsx/.css           # Fejléc (kereső, kívánságlista, nyelvválasztó)
│   ├── GameCard.tsx/.css         # Játék kártya
│   ├── GameGrid.tsx/.css         # Kártyák rácsos elrendezése
│   ├── GameModal.tsx/.css        # Részletes nézet modal
│   ├── FilterPanel.tsx/.css      # Szűrő panel
│   ├── Watchlist.tsx/.css        # Kívánságlista panel
│   ├── LanguageSelector.tsx/.css # Nyelvválasztó
│   └── TokenSetup.tsx/.css       # API token beállítás
├── hooks/
│   ├── useGames.ts               # Játék adatok kezelése, szűrés, rendezés
│   └── useWatchlist.ts           # Kívánságlista hook
├── i18n/
│   ├── index.tsx                 # I18n provider és hook
│   └── translations/
│       ├── hu.ts                 # Magyar fordítások
│       └── en.ts                 # Angol fordítások
├── types/
│   └── boardgame.ts              # TypeScript típusok
├── App.tsx                       # Fő alkalmazás komponens
├── App.css
└── index.css                     # Globális stílusok
```

---

## Változásnapló

### v1.1.0 (2025-12)
- Többnyelvű támogatás (magyar és angol)
- Nyelvválasztó komponens a fejlécben
- Automatikus nyelvfelismerés böngésző nyelv alapján
- Nyelvi beállítás mentése LocalStorage-ba
- Token beállító komponens lokalizációja
- Korosztály szűrő (6+, 8+, 10+, 12+, 14+, 18+)
- További rendezési opciók (játékosszám, játékidő)

### v1.0.0 (2025-12)
- Kezdeti kiadás
- Top 30 társasjáték megjelenítése
- Keresés és szűrés
- Kívánságlista funkció
- Részletes játék modal
- BGG integráció

---

> **FONTOS**: Ez a dokumentáció mindig frissítendő a projekt változásaival együtt! Minden új funkció, javítás vagy módosítás után frissítsd ezt a fájlt és növeld a verziószámot a `package.json`-ban is.
