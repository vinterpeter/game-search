# Claude Projekt Útmutató - Társas Kereső

## Projekt Összefoglaló

Ez egy React + TypeScript alapú webalkalmazás társasjátékok kereséséhez és szűréséhez. A BoardGameGeek API-t használja, magyar nyelvű felülettel.

## Fontos Szabályok

### 1. Dokumentáció Frissítése
- **MINDIG** frissítsd a `README.md` fájlt minden változtatás után
- Add hozzá az új funkciókat a "Változásnapló" szekcióhoz
- Tartsd naprakészen a mappastruktúrát

### 2. Verziózás
- A projekt szemantikus verziózást használ (MAJOR.MINOR.PATCH)
- **MAJOR**: Visszafelé nem kompatibilis változások
- **MINOR**: Új funkciók, visszafelé kompatibilis
- **PATCH**: Hibajavítások
- A verzió a `package.json` `version` mezőjében található
- Minden release-nél növeld a megfelelő verziószámot

### 3. Kód Stílus
- TypeScript strict mód
- Funkcionális komponensek React hooks-szal
- CSS modulok vagy egyedi CSS fájlok komponensenként
- Magyar nyelvű UI szövegek
- Angol nyelvű kód és kommentek

### 4. API Kezelés
- A BoardGameGeek API XML formátumot használ
- CORS proxy szükséges (corsproxy.io)
- Az xml2js könyvtár dolgozza fel a válaszokat

## Projekt Struktúra

```
game-search/
├── src/
│   ├── api/           # BGG API integráció
│   ├── components/    # React komponensek
│   ├── hooks/         # Egyedi React hookok
│   ├── types/         # TypeScript típusok
│   ├── App.tsx        # Fő alkalmazás
│   └── index.css      # Globális stílusok
├── package.json
├── README.md          # Projekt dokumentáció (FRISSÍTENDŐ!)
└── CLAUDE.md          # Ez a fájl
```

## Gyakori Feladatok

### Új komponens hozzáadása
1. Hozd létre a `.tsx` és `.css` fájlokat a `components/` mappában
2. Exportáld a komponenst
3. Frissítsd a `README.md` mappastruktúráját

### Új funkció hozzáadása
1. Implementáld a funkciót
2. Teszteld alaposan
3. Frissítsd a `README.md` funkciók listáját
4. Add hozzá a változásnaplóhoz
5. Növeld a verziószámot

### Hibajavítás
1. Javítsd a hibát
2. Add hozzá a változásnaplóhoz
3. Növeld a PATCH verziószámot

### BGG API bővítése
1. Új endpoint hozzáadása a `src/api/bgg.ts` fájlban
2. Típusok frissítése a `src/types/boardgame.ts` fájlban
3. Hook frissítése ha szükséges

## Jelenlegi Verzió

**v1.0.0** - Lásd `README.md` a részletekért
