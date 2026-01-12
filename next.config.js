/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'oaidalleapiprodscus.blob.core.windows.net', pathname: '/**' },
      { protocol: 'https', hostname: 'example.com', pathname: '/**' },
    ],
  },
}

module.exports = nextConfig;
