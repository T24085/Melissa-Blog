/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      }
      config.resolve.conditionNames = [
        'browser',
        'import',
        'module',
        'default',
      ]
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      'firebase/auth': 'firebase/auth',
    }

    return config
  },
}

module.exports = nextConfig
