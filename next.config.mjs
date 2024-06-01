/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vr-digital-health-files.s3.us-west-2.amazonaws.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
