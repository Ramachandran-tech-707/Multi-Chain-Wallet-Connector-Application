import path from "path";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Fix for MetaMask SDK requiring a React Native module
    config.resolve.alias["@react-native-async-storage/async-storage"] = path.resolve(
      "./src/utils/emptyModule.js"
    );

    return config;
  },
};


export default nextConfig;
