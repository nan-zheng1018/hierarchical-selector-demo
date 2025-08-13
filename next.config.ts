import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 明确使用Webpack而不是Turbopack
  experimental: {
    // 禁用Turbopack相关功能
  },
  // Webpack配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 确保使用Webpack进行编译
    console.log('🔧 Using Webpack for compilation');
    
    // 这里可以添加自定义的webpack配置
    return config;
  },
};

export default nextConfig;
