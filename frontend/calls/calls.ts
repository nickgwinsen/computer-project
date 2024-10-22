export const get_puuid = async (username: string, tag: string) => {
  try {
    const res = await fetch(
      `http://localhost:8000/riot/users/${username}/${tag}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const get_games_list = async (puuid: string) => {
  try {
    const res = await fetch(`http://localhost:8000/riot/matches/${puuid}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const get_game_timeline = async (match_id: string) => {
  try {
    const res = await fetch(`http://localhost:8000/riot/match/${match_id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
