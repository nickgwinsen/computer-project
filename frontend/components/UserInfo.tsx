import { get_user_info } from "@/calls/calls";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
const UserInfo = ({ puuid }: { puuid: string }) => {
  const {
    data: userInfo,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["userInfo", puuid],
    queryFn: async () => {
      return await get_user_info(puuid);
    },
    enabled: !!puuid,
  });
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <p>{userInfo.summonerLevel}</p>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/profileicon/${userInfo.profileIconId}.png`}
        alt="profile icon"
        width={100}
        height={100}
      />
    </div>
  );
};

export default UserInfo;
