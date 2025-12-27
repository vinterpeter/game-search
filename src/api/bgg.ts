import type { BoardGame, BoardGameSearchResult, HotGame } from '../types/boardgame';

const BGG_API_BASE = 'https://boardgamegeek.com/xmlapi2';

// BGG API token - get yours at https://boardgamegeek.com/applications
// Store in localStorage or environment variable
function getBggToken(): string | null {
  return localStorage.getItem('bgg_api_token');
}

export function setBggToken(token: string): void {
  localStorage.setItem('bgg_api_token', token);
}

export function hasBggToken(): boolean {
  return !!getBggToken();
}

async function fetchBgg(url: string): Promise<string> {
  const token = getBggToken();

  if (!token) {
    throw new Error('BGG API token szükséges. Kérlek add meg a beállításokban.');
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error('Érvénytelen BGG API token. Kérlek ellenőrizd a beállításokban.');
  }

  if (!response.ok) {
    throw new Error(`BGG API hiba: ${response.status}`);
  }

  return response.text();
}

// Parse XML using native browser DOMParser
function parseXML(xmlString: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'text/xml');
}

// Helper to get attribute value
function getAttr(el: Element | null | undefined, attr: string): string {
  return el?.getAttribute(attr) || '';
}

// Helper to get text content
function getText(el: Element | null | undefined): string {
  return el?.textContent || '';
}

// Helper to get child elements
function getChildren(el: Element | null, tagName: string): Element[] {
  if (!el) return [];
  return Array.from(el.getElementsByTagName(tagName));
}

// Get hot/trending games
export async function getHotGames(): Promise<HotGame[]> {
  const xml = await fetchBgg(`${BGG_API_BASE}/hot?type=boardgame`);
  const doc = parseXML(xml);

  const items = getChildren(doc.documentElement, 'item');

  return items.map((item) => ({
    id: parseInt(getAttr(item, 'id')),
    name: getAttr(item.querySelector('name'), 'value'),
    thumbnail: getAttr(item.querySelector('thumbnail'), 'value'),
    yearPublished: item.querySelector('yearpublished')
      ? parseInt(getAttr(item.querySelector('yearpublished'), 'value'))
      : undefined,
    rank: parseInt(getAttr(item, 'rank')),
  }));
}

// Search for games
export async function searchGames(query: string): Promise<BoardGameSearchResult[]> {
  const xml = await fetchBgg(
    `${BGG_API_BASE}/search?query=${encodeURIComponent(query)}&type=boardgame`
  );
  const doc = parseXML(xml);

  const items = getChildren(doc.documentElement, 'item');

  return items.slice(0, 50).map((item) => ({
    id: parseInt(getAttr(item, 'id')),
    name: getAttr(item.querySelector('name'), 'value'),
    yearPublished: item.querySelector('yearpublished')
      ? parseInt(getAttr(item.querySelector('yearpublished'), 'value'))
      : 0,
  }));
}

// Get detailed game info
export async function getGameDetails(id: number): Promise<BoardGame | null> {
  const xml = await fetchBgg(`${BGG_API_BASE}/thing?id=${id}&stats=1`);
  const doc = parseXML(xml);

  const item = doc.querySelector('item');
  if (!item) return null;

  return parseGameItem(item);
}

// Get multiple games details at once (batch)
export async function getGamesDetails(ids: number[]): Promise<BoardGame[]> {
  if (ids.length === 0) return [];

  const xml = await fetchBgg(
    `${BGG_API_BASE}/thing?id=${ids.join(',')}&stats=1`
  );
  const doc = parseXML(xml);
  const items = getChildren(doc.documentElement, 'item');

  return items.map(parseGameItem);
}

// Parse a single game item element
function parseGameItem(item: Element): BoardGame {
  // Parse links (categories, mechanics, designers, publishers)
  const links = getChildren(item, 'link');

  const categories = links
    .filter((l) => getAttr(l, 'type') === 'boardgamecategory')
    .map((l) => getAttr(l, 'value'));

  const mechanics = links
    .filter((l) => getAttr(l, 'type') === 'boardgamemechanic')
    .map((l) => getAttr(l, 'value'));

  const designers = links
    .filter((l) => getAttr(l, 'type') === 'boardgamedesigner')
    .map((l) => getAttr(l, 'value'));

  const publishers = links
    .filter((l) => getAttr(l, 'type') === 'boardgamepublisher')
    .map((l) => getAttr(l, 'value'));

  // Get rating info
  const statistics = item.querySelector('statistics');
  const ratings = statistics?.querySelector('ratings');
  const ranks = ratings?.querySelectorAll('rank');
  let boardgameRankValue = 0;
  ranks?.forEach((rank) => {
    if (getAttr(rank, 'name') === 'boardgame') {
      const val = getAttr(rank, 'value');
      boardgameRankValue = val === 'Not Ranked' ? 0 : parseInt(val) || 0;
    }
  });

  // Get primary name
  const names = getChildren(item, 'name');
  const primaryName = names.find((n) => getAttr(n, 'type') === 'primary');
  const name = getAttr(primaryName || names[0], 'value');

  return {
    id: parseInt(getAttr(item, 'id')),
    name,
    yearPublished: parseInt(getAttr(item.querySelector('yearpublished'), 'value')) || 0,
    thumbnail: getText(item.querySelector('thumbnail')),
    image: getText(item.querySelector('image')),
    minPlayers: parseInt(getAttr(item.querySelector('minplayers'), 'value')) || 1,
    maxPlayers: parseInt(getAttr(item.querySelector('maxplayers'), 'value')) || 4,
    playingTime: parseInt(getAttr(item.querySelector('playingtime'), 'value')) || 0,
    minPlayTime: parseInt(getAttr(item.querySelector('minplaytime'), 'value')) || 0,
    maxPlayTime: parseInt(getAttr(item.querySelector('maxplaytime'), 'value')) || 0,
    minAge: parseInt(getAttr(item.querySelector('minage'), 'value')) || 0,
    description: getText(item.querySelector('description')),
    rating: parseFloat(getAttr(ratings?.querySelector('average'), 'value')) || 0,
    usersRated: parseInt(getAttr(ratings?.querySelector('usersrated'), 'value')) || 0,
    complexity: parseFloat(getAttr(ratings?.querySelector('averageweight'), 'value')) || 0,
    rank: boardgameRankValue,
    categories,
    mechanics,
    designers,
    publishers,
  };
}

// Top rated games (we'll use a predefined list of popular game IDs)
export const TOP_GAME_IDS = [
  174430, // Gloomhaven
  161936, // Pandemic Legacy S1
  224517, // Brass: Birmingham
  167791, // Terraforming Mars
  187645, // Star Wars Rebellion
  182028, // Through the Ages
  233078, // Twilight Imperium 4
  169786, // Scythe
  266192, // Wingspan
  312484, // Lost Ruins of Arnak
  342942, // Ark Nova
  291457, // Gloomhaven Jaws of the Lion
  316554, // Dune Imperium
  205637, // Arkham Horror LCG
  28720,  // Brass
  164928, // Orleans
  173346, // 7 Wonders Duel
  31260,  // Agricola
  12333,  // Twilight Struggle
  68448,  // 7 Wonders
  230802, // Azul
  126163, // Tzolkin
  102794, // Caverna
  162886, // Spirit Island
  193738, // Great Western Trail
  180263, // The 7th Continent
  220308, // Gaia Project
  295947, // Cascadia
  366013, // Heat
  359871, // Earth
];
