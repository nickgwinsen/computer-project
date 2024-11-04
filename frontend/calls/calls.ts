import axios from "axios";
import { API_URL } from "@/config/constants";

export const get_puuid = async (username: string, tag: string) => {
  try {
    console.log(API_URL);
    const res = await axios.get(`${API_URL}/riot/user/${username}/${tag}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_user_info = async (puuid: string) => {
  try {
    const res = await axios.get(`${API_URL}/riot/user/info/${puuid}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_games_list = async (puuid: string) => {
  try {
    const res = await axios.get(`${API_URL}riot/user/${puuid}/matches`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_game_timeline = async (match_id: string) => {
  try {
    const res = await axios.get(`${API_URL}riot/match/${match_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
