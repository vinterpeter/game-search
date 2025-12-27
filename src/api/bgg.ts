import { parseStringPromise } from 'xml2js';
import type { BoardGame, BoardGameSearchResult, HotGame } from '../types/boardgame';

const BGG_API_BASE = 'https://boardgamegeek.com/xmlapi2';

// CORS proxies - BGG doesn't allow direct browser requests
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
];

async function fetchWithProxy(url: string): Promise<string> {
  let lastError: Error | null = null;

  for (const proxy of CORS_PROXIES) {
    try {
      const response = await fetch(proxy + encodeURIComponent(url));
      if (response.ok) {
        return response.text();
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw lastError || new Error('Minden CORS proxy sikertelen');
}

// Parse XML to JSON
async function parseXML<T>(xml: string): Promise<T> {
  return parseStringPromise(xml, {
    explicitArray: false,
    mergeAttrs: true,
    charkey: '_text',
  });
}

// Get hot/trending games
export async function getHotGames(): Promise<HotGame[]> {
  const xml = await fetchWithProxy(`${BGG_API_BASE}/hot?type=boardgame`);
  const data = await parseXML<any>(xml);

  if (!data.items?.item) return [];

  const items = Array.isArray(data.items.item) ? data.items.item : [data.items.item];

  return items.map((item: any) => ({
    id: parseInt(item.id),
    name: item.name?.value || '',
    thumbnail: item.thumbnail?.value || '',
    yearPublished: item.yearpublished ? parseInt(item.yearpublished.value) : undefined,
    rank: parseInt(item.rank),
  }));
}

// Search for games
export async function searchGames(query: string): Promise<BoardGameSearchResult[]> {
  const xml = await fetchWithProxy(
    `${BGG_API_BASE}/search?query=${encodeURIComponent(query)}&type=boardgame`
  );
  const data = await parseXML<any>(xml);

  if (!data.items?.item) return [];

  const items = Array.isArray(data.items.item) ? data.items.item : [data.items.item];

  return items.slice(0, 50).map((item: any) => ({
    id: parseInt(item.id),
    name: item.name?.value || '',
    yearPublished: item.yearpublished ? parseInt(item.yearpublished.value) : 0,
  }));
}

// Get detailed game info
export async function getGameDetails(id: number): Promise<BoardGame | null> {
  const xml = await fetchWithProxy(`${BGG_API_BASE}/thing?id=${id}&stats=1`);
  const data = await parseXML<any>(xml);

  if (!data.items?.item) return null;

  const item = data.items.item;

  // Parse links (categories, mechanics, designers, publishers)
  const links = Array.isArray(item.link) ? item.link : item.link ? [item.link] : [];

  const categories = links
    .filter((l: any) => l.type === 'boardgamecategory')
    .map((l: any) => l.value);

  const mechanics = links
    .filter((l: any) => l.type === 'boardgamemechanic')
    .map((l: any) => l.value);

  const designers = links
    .filter((l: any) => l.type === 'boardgamedesigner')
    .map((l: any) => l.value);

  const publishers = links
    .filter((l: any) => l.type === 'boardgamepublisher')
    .map((l: any) => l.value);

  // Get rating info
  const ratings = item.statistics?.ratings;
  const ranks = ratings?.ranks?.rank;
  const boardgameRank = Array.isArray(ranks)
    ? ranks.find((r: any) => r.name === 'boardgame')
    : ranks?.name === 'boardgame' ? ranks : null;

  // Get primary name
  const names = Array.isArray(item.name) ? item.name : [item.name];
  const primaryName = names.find((n: any) => n.type === 'primary')?.value || names[0]?.value || '';

  return {
    id: parseInt(item.id),
    name: primaryName,
    yearPublished: item.yearpublished ? parseInt(item.yearpublished.value) : 0,
    thumbnail: item.thumbnail?._text || item.thumbnail || '',
    image: item.image?._text || item.image || '',
    minPlayers: parseInt(item.minplayers?.value) || 1,
    maxPlayers: parseInt(item.maxplayers?.value) || 4,
    playingTime: parseInt(item.playingtime?.value) || 0,
    minPlayTime: parseInt(item.minplaytime?.value) || 0,
    maxPlayTime: parseInt(item.maxplaytime?.value) || 0,
    minAge: parseInt(item.minage?.value) || 0,
    description: item.description?._text || item.description || '',
    rating: parseFloat(ratings?.average?.value) || 0,
    usersRated: parseInt(ratings?.usersrated?.value) || 0,
    complexity: parseFloat(ratings?.averageweight?.value) || 0,
    rank: boardgameRank ? parseInt(boardgameRank.value) : 0,
    categories,
    mechanics,
    designers,
    publishers,
  };
}

// Get multiple games details at once (batch)
export async function getGamesDetails(ids: number[]): Promise<BoardGame[]> {
  if (ids.length === 0) return [];

  const xml = await fetchWithProxy(
    `${BGG_API_BASE}/thing?id=${ids.join(',')}&stats=1`
  );
  const data = await parseXML<any>(xml);

  if (!data.items?.item) return [];

  const items = Array.isArray(data.items.item) ? data.items.item : [data.items.item];

  return items.map((item: any) => {
    const links = Array.isArray(item.link) ? item.link : item.link ? [item.link] : [];

    const categories = links
      .filter((l: any) => l.type === 'boardgamecategory')
      .map((l: any) => l.value);

    const mechanics = links
      .filter((l: any) => l.type === 'boardgamemechanic')
      .map((l: any) => l.value);

    const designers = links
      .filter((l: any) => l.type === 'boardgamedesigner')
      .map((l: any) => l.value);

    const publishers = links
      .filter((l: any) => l.type === 'boardgamepublisher')
      .map((l: any) => l.value);

    const ratings = item.statistics?.ratings;
    const ranks = ratings?.ranks?.rank;
    const boardgameRank = Array.isArray(ranks)
      ? ranks.find((r: any) => r.name === 'boardgame')
      : ranks?.name === 'boardgame' ? ranks : null;

    const names = Array.isArray(item.name) ? item.name : [item.name];
    const primaryName = names.find((n: any) => n.type === 'primary')?.value || names[0]?.value || '';

    return {
      id: parseInt(item.id),
      name: primaryName,
      yearPublished: item.yearpublished ? parseInt(item.yearpublished.value) : 0,
      thumbnail: item.thumbnail?._text || item.thumbnail || '',
      image: item.image?._text || item.image || '',
      minPlayers: parseInt(item.minplayers?.value) || 1,
      maxPlayers: parseInt(item.maxplayers?.value) || 4,
      playingTime: parseInt(item.playingtime?.value) || 0,
      minPlayTime: parseInt(item.minplaytime?.value) || 0,
      maxPlayTime: parseInt(item.maxplaytime?.value) || 0,
      minAge: parseInt(item.minage?.value) || 0,
      description: item.description?._text || item.description || '',
      rating: parseFloat(ratings?.average?.value) || 0,
      usersRated: parseInt(ratings?.usersrated?.value) || 0,
      complexity: parseFloat(ratings?.averageweight?.value) || 0,
      rank: boardgameRank ? parseInt(boardgameRank.value) : 0,
      categories,
      mechanics,
      designers,
      publishers,
    };
  });
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
