import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lite-tech-api.litebox.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "litetech-assets.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    qualities: [75, 85],
  },
};

export default nextConfig;
