import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: config => {
    config.externals.push({
      'node:crypto': 'commonjs crypto',
    });
    return config;
  },
};

export default nextConfig;
