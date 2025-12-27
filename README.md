# Társas Kereső

> **Verzió: 1.0.0**

Magyar nyelvű webalkalmazás társasjátékok kereséséhez, szűréséhez és kívánságlista kezeléssel. A BoardGameGeek API-t használja.

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
│   └── bgg.ts               # BoardGameGeek API integráció
├── components/
│   ├── Header.tsx/.css      # Fejléc (kereső, kívánságlista gomb)
│   ├── GameCard.tsx/.css    # Játék kártya
│   ├── GameGrid.tsx/.css    # Kártyák rácsos elrendezése
│   ├── GameModal.tsx/.css   # Részletes nézet modal
│   ├── FilterPanel.tsx/.css # Szűrő panel
│   └── Watchlist.tsx/.css   # Kívánságlista panel
├── hooks/
│   ├── useGames.ts          # Játék adatok kezelése, szűrés, rendezés
│   └── useWatchlist.ts      # Kívánságlista hook
├── types/
│   └── boardgame.ts         # TypeScript típusok
├── App.tsx                  # Fő alkalmazás komponens
├── App.css
└── index.css                # Globális stílusok
```

---

## Változásnapló

### v1.0.0 (2024-12)
- Kezdeti kiadás
- Top 30 társasjáték megjelenítése
- Keresés és szűrés
- Kívánságlista funkció
- Részletes játék modal
- BGG integráció

---

> **FONTOS**: Ez a dokumentáció mindig frissítendő a projekt változásaival együtt! Minden új funkció, javítás vagy módosítás után frissítsd ezt a fájlt és növeld a verziószámot a `package.json`-ban is.
