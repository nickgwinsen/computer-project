import axios from "axios";

export const get_puuid = async (username: string, tag: string) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/riot/user/${username}/${tag}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_games_list = async (puuid: string) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/riot/user/${puuid}/matches`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_game_timeline = async (match_id: string) => {
  try {
    const res = await axios.get(`http://localhost:8000/riot/match/${match_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
