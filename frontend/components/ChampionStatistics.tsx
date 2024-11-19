//compile all champion statistics and the win rate of the champ.

const ChampionStatistics = ({ puuid }: { puuid: string }) => {
  return (
    <div>
      <h1>Champion Statistics</h1>
      <h2>{puuid}</h2>
    </div>
  );
};

export default ChampionStatistics;
