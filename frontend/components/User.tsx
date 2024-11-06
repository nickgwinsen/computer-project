import { IRiotAccount } from "@/app/(api)/riot/riot.types";
import Image from "next/image";
import { BASE_DD_URL, BASE_BIGBRAIN_URL } from "@/config/constants";

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
      <Image
        src={`${BASE_BIGBRAIN_URL}/ranks/s13/${data.tier.toLowerCase()}.png`}
        alt=""
        width={100}
        height={100}
      />
      <h3>{data.league_points} LP</h3>
      <h3>
        {data.wins}W {data.losses}L
      </h3>
    </div>
  );
};

export default User;
