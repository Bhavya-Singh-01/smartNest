/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    serverActions: {
      // Ticket photos (max 5 MB, enforced in validation and by the storage
      // bucket) plus multipart overhead.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
