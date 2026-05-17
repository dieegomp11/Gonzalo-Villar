/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/Gonzalo-Villar' : '',
  },
  basePath: isProd ? '/Gonzalo-Villar' : '',
  assetPrefix: isProd ? '/Gonzalo-Villar/' : '',
}

module.exports = nextConfig
