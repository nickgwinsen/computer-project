import React from "react";

interface Champion {
  name: string;
  imageUrl: string;
  averageCs: number;
  averageKda: string;
  winRate: number;
  gamesPlayed: number;
}

interface ChampionStatisticsProps {
  champions: Champion[];
}

const ChampionStatistics: React.FC<ChampionStatisticsProps> = ({
  champions,
}) => {
  return (
    <div>
      {champions.map((champion, index) => (
        <div key={index} className="champion-statistics">
          <img src={champion.imageUrl} alt={champion.name} />
          <h2>{champion.name}</h2>
          <p>Average CS: {champion.averageCs}</p>
          <p>Average KDA: {champion.averageKda}</p>
          <p>Win Rate: {champion.winRate}%</p>
          <p>Games Played: {champion.gamesPlayed}</p>
        </div>
      ))}
    </div>
  );
};

export default ChampionStatistics;
