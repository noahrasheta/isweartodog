import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    deviceSizes: [640, 768, 1080, 1200, 1536],
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
