import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "en", "ru"],
  defaultLocale: "ka",
  localePrefix: "as-needed",
  // Always default to Georgian instead of negotiating from the browser's
  // Accept-Language header; visitors switch language explicitly via the UI.
  localeDetection: false,
});
