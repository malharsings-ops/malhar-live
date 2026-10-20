/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/music', destination: '/#music', permanent: false },
      { source: '/gallery', destination: '/#gallery', permanent: false },
    ]
  },
}

module.exports = nextConfig
