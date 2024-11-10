import axiosInstance from "@/config/axios";
import { API_URL } from "@/config/constants";
import { IRiotAccount } from "@/app/(api)/riot/riot.types";

export const get_user_info = async (
  username: string,
  tag: string
): Promise<IRiotAccount> => {
  try {
    const res = await axiosInstance.get<IRiotAccount>(
      `${API_URL}/riot/user/${username}/${tag}`
    );
    return res.data as IRiotAccount;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_games_list = async (puuid: string) => {
  try {
    const res = await axiosInstance.get(`${API_URL}riot/user/${puuid}/matches`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const get_game_timeline = async (match_id: string) => {
  try {
    const res = await axiosInstance.get(`${API_URL}riot/match/${match_id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
