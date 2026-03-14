import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Supported locales
  locales: ["en", "de"],
  // Default locale
  defaultLocale: "en",
});

export const config = {
  matcher: [
    // Skip all internal paths
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};


