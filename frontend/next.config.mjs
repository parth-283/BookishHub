/** @type {import('next').NextConfig} */

import webpack from "webpack";

const nextConfig = {
  images: {
    domains: ["localhost", "tailwindui.com", "source.unsplash.com", "images.unsplash.com"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? process.env.NEXT_API_BASE_URL
      : process.env.NEXT_API_BASE_URL
  }
};

export default nextConfig;
