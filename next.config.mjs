// next.config.mjs
import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  reactStrictMode: true,
  i18n: {
    locales: ["de", "en", "df"],
    defaultLocale: "de",
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/de/docs/willkommen",
        permanent: true, // or false if you'd rather make it temporary
      },
    ];
  },
});

export default nextConfig;
