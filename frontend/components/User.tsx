import { IRiotAccount } from "@/app/(api)/riot/riot.types";
import Image from "next/image";
import { BASE_DD_URL } from "@/config/constants";

const User = ({ data }: { data: IRiotAccount }) => {
  return (
    <div>
      <Image
        src={`${BASE_DD_URL}/img/profileicon/${data.profile_icon_id}.png`}
        alt=""
        width={100}
        height={100}
      />
      <h1>{data.riot_id}</h1>
      <h2>
        {data.tier} {data.rank}
      </h2>
      <h3>Level {data.summoner_level}</h3>
      <Image
        src={`/static/${data.tier.toLowerCase()}.png`}
        alt=""
        width={100}
        height={100}
      />
      <h3>{data.league_points} LP</h3>
      <h3>
        {data.wins}W {data.losses}L{" "}
        {((data.wins / (data.wins + data.losses)) * 100).toFixed(1)}% Win Rate
      </h3>
    </div>
  );
};

export default User;
