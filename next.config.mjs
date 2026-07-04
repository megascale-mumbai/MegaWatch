/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  allowedDevOrigins: [
    "10.27.4.25",
    "10.27.4.25:3001",
    "10.27.4.26",
    "10.27.4.26:3000",
    "10.27.4.26:3001",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1:3000",
    "127.0.0.1:3001",
    "192.168.1.100:3000",
  ],
};

export default nextConfig;
