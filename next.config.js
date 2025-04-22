/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--3000--fb22cd3d.local-credentialless.webcontainer-api.io']
  },
  transpilePackages: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled', '@mui/icons-material', '@mui/x-data-grid'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  webpack: (config) => {
    // Increase Node memory limit
    process.env.NODE_OPTIONS = '--max-old-space-size=4096';

    // Disable cache to prevent chunk loading issues
    config.cache = false;

    // Optimize chunk loading
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
      runtimeChunk: false
    };

    config.performance = {
      ...config.performance,
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  }
};

module.exports = nextConfig;