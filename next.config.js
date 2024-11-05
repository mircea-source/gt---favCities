/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util'
  ],
  experimental: {
    esmExternals: true
  }
}

export default nextConfig;