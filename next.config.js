/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes for PDF generation
  // distDir: 'out', // Using default .next directory for server capabilities
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  // Compress responses
  compress: true,
  // Use trailing slashes for consistency
  trailingSlash: true,
}

export default nextConfig
