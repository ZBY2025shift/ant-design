/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  transpilePackages: ['antd', '@ant-design', 'echarts', 'echarts-for-react'],
}

module.exports = nextConfig