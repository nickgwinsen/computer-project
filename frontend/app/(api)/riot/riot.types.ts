export interface IRiotAccount {
  puuid: string;
  profile_icon_id: number;
  riot_id: string;
  summoner_level: number;
  tier: string;
  rank: string;
  league_points: number;
  wins: number;
  losses: number;
  last_updated: string;
}

export interface IChampion {
  championId: number;
  championName: string;
  wins: number;
  losses: number;
}
