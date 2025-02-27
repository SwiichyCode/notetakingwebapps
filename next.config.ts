import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/notes',
        permanent: false,
      },
    ];
  },

  webpack: config => {
    config.externals.push({
      'node:crypto': 'commonjs crypto',
    });
    return config;
  },
};

export default nextConfig;
