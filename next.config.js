/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["s.gravatar.com", "i.scdn.co"],
  },
  webpack: (config, { isServer }) => {
    // only apply to client-side compilation
    if (!isServer) {
      config.module.rules.push({
        test: /\.txt$/,
        use: 'raw-loader',
      });
    }

    return config;
  },
};

module.exports = nextConfig;