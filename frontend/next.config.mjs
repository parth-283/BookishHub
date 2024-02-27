/** @type {import('next').NextConfig} */

import webpack from "webpack";

const nextConfig = {
  images: {
    domains: ["localhost", "tailwindui.com","source.unsplash.com","images.unsplash.com"],
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
};

export default nextConfig;
