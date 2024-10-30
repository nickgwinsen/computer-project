import Image from "next/image";
interface AvatarProps {
  //image link
  src: string;
  //alt text
  alt: string;
}

const Avatar = ({ src, alt }: AvatarProps) => {
  return <Image src={src} alt={alt} />;
};

export default Avatar;
