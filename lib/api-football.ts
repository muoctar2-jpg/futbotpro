const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

interface FootballAPIResponse<T> {
  get: string;
  parameters: Record<string, unknown>;
  errors: unknown[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T;
}

interface Match {
  fixture: {
    id: number;
    date: string;
    timestamp: number;
  };
  league: {
    id: number;
    name: string;
    country: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
    };
    away: {
      id: number;
      name: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
  };
}

interface FixtureStatistics {
  team: {
    id: number;
    name: string;
  };
  statistics: Array<{
    type: string;
    value: string | number | null;
  }>;
}

async function fetchFromAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryString = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY!,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
  });

  if (!response.ok) {
    throw new Error(`API-Football error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTodayMatches(league?: string): Promise<Match[]> {
  const today = new Date().toISOString().split('T')[0];
  
  const params: Record<string, string> = {
    date: today,
  };

  if (league) {
    params.league = league;
  }

  const data = await fetchFromAPI<FootballAPIResponse<Match[]>>('/fixtures', params);
  return data.response || [];
}

export async function getUpcomingMatches(days: number = 7): Promise<Match[]> {
  const from = new Date().toISOString().split('T')[0];
  const to = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const params = {
    from,
    to,
  };

  const data = await fetchFromAPI<FootballAPIResponse<Match[]>>('/fixtures', params);
  return data.response || [];
}

export async function getFixtureStatistics(fixtureId: number): Promise<FixtureStatistics[]> {
  const data = await fetchFromAPI<FootballAPIResponse<FixtureStatistics[]>>(
    '/fixtures/statistics',
    { fixture: fixtureId.toString() }
  );
  return data.response || [];
}

export async function getLeagues() {
  const data = await fetchFromAPI<FootballAPIResponse<unknown[]>>('/leagues');
  return data.response || [];
}

export async function analyzePrediction(match: Match): Promise<{
  prediction: string;
  confidence: number;
  odds: number;
}> {
  const homeTeam = match.teams.home.name;
  const awayTeam = match.teams.away.name;
  
  const predictions = [
    { type: 'Over 2.5 Goals', confidence: 0.75, odds: 1.85 },
    { type: 'BTTS Yes', confidence: 0.82, odds: 1.75 },
    { type: 'Home Win', confidence: 0.68, odds: 2.10 },
    { type: 'Draw', confidence: 0.45, odds: 3.20 },
    { type: 'Away Win', confidence: 0.55, odds: 2.80 },
    { type: 'Over 3.5 Goals', confidence: 0.65, odds: 2.50 },
  ];

  const selected = predictions[Math.floor(Math.random() * predictions.length)];

  return {
    prediction: selected.type,
    confidence: selected.confidence,
    odds: selected.odds,
  };
}

export async function getMatchOdds(fixtureId: number) {
  try {
    const data = await fetchFromAPI<FootballAPIResponse<unknown[]>>(
      '/odds',
      { fixture: fixtureId.toString() }
    );
    return data.response || [];
  } catch (error) {
    console.error('Error fetching odds:', error);
    return [];
  }
}

export { type Match, type FixtureStatistics };
