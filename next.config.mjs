/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // By removing the typescript block, ignoreBuildErrors defaults to false.
  // This will now show us the real errors during the build.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
