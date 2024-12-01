import axiosInstance from "@/config/axios";
import { API_URL } from "@/config/constants";
import { IRiotAccount } from "@/app/(api)/riot/riot.types";

const champions: string[] = [
  "Aatrox",
  "Ahri",
  "Akali",
  "Akshan",
  "Alistar",
  "Amumu",
  "Ambessa",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "Aurelion Sol",
  "Aurora",
  "Azir",
  "Bard",
  "Bel'Veth",
  "Blitzcrank",
  "Brand",
  "Braum",
  "Briar",
  "Caitlyn",
  "Camille",
  "Cassiopeia",
  "Cho'Gath",
  "Corki",
  "Darius",
  "Diana",
  "Dr. Mundo",
  "Draven",
  "Ekko",
  "Elise",
  "Evelynn",
  "Ezreal",
  "Fiddlesticks",
  "Fiora",
  "Fizz",
  "Galio",
  "Gangplank",
  "Garen",
  "Gnar",
  "Gragas",
  "Graves",
  "Gwen",
  "Hecarim",
  "Heimerdinger",
  "Hwei",
  "Illaoi",
  "Irelia",
  "Ivern",
  "Janna",
  "Jarvan IV",
  "Jax",
  "Jayce",
  "Jhin",
  "Jinx",
  "K'Sante",
  "Kai'Sa",
  "Kalista",
  "Karma",
  "Karthus",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kayn",
  "Kennen",
  "Kha'Zix",
  "Kindred",
  "Kled",
  "Kog'Maw",
  "LeBlanc",
  "Lee Sin",
  "Leona",
  "Lillia",
  "Lissandra",
  "Lucian",
  "Lulu",
  "Lux",
  "Malphite",
  "Malzahar",
  "Maokai",
  "Master Yi",
  "Milio",
  "Miss Fortune",
  "Mordekaiser",
  "Morgana",
  "Naafiri",
  "Nami",
  "Nasus",
  "Nautilus",
  "Neeko",
  "Nidalee",
  "Nilah",
  "Nocturne",
  "Nunu & Willump",
  "Olaf",
  "Orianna",
  "Ornn",
  "Pantheon",
  "Poppy",
  "Pyke",
  "Qiyana",
  "Quinn",
  "Rakan",
  "Rammus",
  "Rek'Sai",
  "Rell",
  "Renata Glasc",
  "Renekton",
  "Rengar",
  "Riven",
  "Rumble",
  "Ryze",
  "Samira",
  "Sejuani",
  "Senna",
  "Seraphine",
  "Sett",
  "Shaco",
  "Shen",
  "Shyvana",
  "Singed",
  "Sion",
  "Sivir",
  "Skarner",
  "Smolder",
  "Sona",
  "Soraka",
  "Swain",
  "Sylas",
  "Syndra",
  "Tahm Kench",
  "Taliyah",
  "Talon",
  "Taric",
  "Teemo",
  "Thresh",
  "Tristana",
  "Trundle",
  "Tryndamere",
  "Twisted Fate",
  "Twitch",
  "Udyr",
  "Urgot",
  "Varus",
  "Vayne",
  "Veigar",
  "Vel'Koz",
  "Vex",
  "Vi",
  "Viego",
  "Viktor",
  "Vladimir",
  "Volibear",
  "Warwick",
  "Wukong",
  "Xayah",
  "Xerath",
  "Xin Zhao",
  "Yasuo",
  "Yone",
  "Yorick",
  "Yuumi",
  "Zac",
  "Zed",
  "Zeri",
  "Ziggs",
  "Zilean",
  "Zoe",
  "Zyra",
];

export const getUserInfo = async (
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

export const getGamesList = async (puuid: string) => {
  try {
    const res = await axiosInstance.get(
      `${API_URL}/riot/user/${puuid}/matches`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const getGameInformation = async (puuid: string, match_id: string) => {
  try {
    const res = await axiosInstance.get(
      `${API_URL}/riot/user/${puuid}/match/${match_id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const updateUserInfo = async (
  username: string,
  tag: string
): Promise<IRiotAccount> => {
  try {
    const res = await axiosInstance.put<IRiotAccount>(
      `${API_URL}/riot/user/${username}/${tag}`
    );
    return res.data as IRiotAccount;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const isChampionName = (name: string) => {
  if (champions.includes(name)) {
    return true;
  }
  return false;
};

export const summIdToName = (id: number) => {
  const summonerSpells: { [key: number]: string } = {
    1: "SummonerBoost",
    3: "SummonerExhaust",
    4: "SummonerFlash",
    6: "SummonerHaste",
    7: "SummonerHeal",
    11: "SummonerSmite",
    12: "SummonerTeleport",
    14: "SummonerDot",
    21: "SummonerBarrier",
  };

  return summonerSpells[id] || "Unknown Summoner Spell";
};

export const keystoneIdToLink = (id: number) => {
  const base =
    "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/";
  const perks: { [key: number]: string } = {
    8000: base + "7201_Precision.png",
    8100: base + "7200_Domination.png",
    8200: base + "7202_Sorcery.png",
    8300: base + "7203_Whimsy.png",
    8400: base + "7204_Resolve.png",

    8010: base + "Precision/Conqueror/Conqueror.png",
    8008: "/static/lethaltempo.png",
    8021: base + "Precision/FleetFootwork/FleetFootwork.png",
    8005: "/static/presstheattack.png",
    8112: base + "Domination/Electrocute/Electrocute.png",
    8128: base + "Domination/DarkHarvest/DarkHarvest.png",
    9923: base + "Domination/HailOfBlades/HailOfBlades.png",
    8214: base + "Sorcery/SummonAery/SummonAery.png",
    8229: base + "Sorcery/ArcaneComet/ArcaneComet.png",
    8230: base + "Sorcery/PhaseRush/PhaseRush.png",
    8437: base + "Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
    8439: base + "Resolve/VeteranAftershock/VeteranAftershock.png",
    8465: base + "Resolve/Guardian/Guardian.png",
    8351: base + "Inspiration/GlacialAugment/GlacialAugment.png",
    8360: base + "Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
    8369: base + "Inspiration/FirstStrike/FirstStrike.png",
  };

  return perks[id];
};
