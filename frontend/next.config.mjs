/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        port: "",
      },
    ],
  },
};

//es module syntax, module.exports = nextConfig is CJS syntax
//es and cjs are just different systems for working with modules. Commonly ES is used in frontend and CJS in backend
export default nextConfig;
