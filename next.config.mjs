import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()({
  reactStrictMode: true,
  i18n: {
    locales: ["de", "en", "df"], // Supported languages
    defaultLocale: "de", // German stays default with NO `/de` prefix
    localeDetection: false, // Prevents automatic redirects
  },
});

export default nextConfig;
