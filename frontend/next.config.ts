import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  }
};

export default nextConfig;
