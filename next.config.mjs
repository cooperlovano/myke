// next.config.mjs
import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  reactStrictMode: true,
  i18n: {
    locales: ["de", "en", "df"], // <– include "df" here
    defaultLocale: "de",
    localeDetection: false,
  },
});

export default nextConfig;
