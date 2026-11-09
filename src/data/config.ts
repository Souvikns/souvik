export const CONFIG = {
  // ---------------------------------------------------------------------------
  // Site Settings
  // ---------------------------------------------------------------------------
  site: {
    url: "https://souvik.de",
    locale: "en_US",
    twitterHandle: "@buggs_lightyear",
  },

  // ---------------------------------------------------------------------------
  // SEO Settings
  // ---------------------------------------------------------------------------
  seo: {
    titleTemplate: "%s | %n", // %s = page title, %n = DATA.name
    twitterCard: "summary_large_image" as const,
    robots: "index, follow",
  },

  // ---------------------------------------------------------------------------
  // Typography
  // ---------------------------------------------------------------------------
  typography: {
    // Base font size as a percentage. 100 = browser default (16px).
    // 110 = 10% larger or 90 = 10% smaller, across all text, headings, and links simultaneously.
    baseFontSize: 100,
  },

  // ---------------------------------------------------------------------------
  // Blog Settings
  // ---------------------------------------------------------------------------
  blog: {
    postsPerPage: 10,
  },

  // ---------------------------------------------------------------------------
  // Font Settings
  // See https://fontsource.org/?variable=true for fonts that can be installed via package registry
  // To change fonts:
  // 1. npm install @fontsource-variable/<font-name> (for example 'npm install @fontsource-variable/inter'). Install BOTH the sans and mono fonts.
  // 2. Edit src/styles/global.css - swap the @import and --font-sans and --font-mono values
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Design Settings
  // 1. Pick a theme at ui.shadcn.com/themes or generate one with a tool like tweakcn.com
  // 2. Copy the CSS variables block
  // 3. Paste into BELOW with the naming conversion already used
  // ---------------------------------------------------------------------------

  theme: {
    radius: "0.75rem",

    light: {
      background: "oklch(0.962 0.004 84)",
      foreground: "oklch(0.2 0.003 90)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.2 0.003 90)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.2 0.003 90)",
      primary: "oklch(0.2 0.003 90)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.95 0.004 84)",
      secondaryForeground: "oklch(0.2 0.003 90)",
      muted: "oklch(0.95 0.004 84)",
      mutedForeground: "oklch(0.47 0.006 85)",
      accent: "oklch(0.95 0.004 84)",
      accentForeground: "oklch(0.2 0.003 90)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.91 0.006 85)",
      input: "oklch(0.91 0.006 85)",
      ring: "oklch(0.66 0.19 42)",
      // Redesign tokens
      brand: "oklch(0.66 0.19 42)",
      brandForeground: "oklch(0.52 0.16 40)",
      brandSoft: "oklch(0.66 0.19 42 / 12%)",
      faint: "oklch(0.62 0.008 85)",
      success: "oklch(0.63 0.17 149)",
    },

    dark: {
      background: "oklch(0.17 0.003 90)",
      foreground: "oklch(0.96 0.003 90)",
      card: "oklch(0.215 0.003 90)",
      cardForeground: "oklch(0.96 0.003 90)",
      popover: "oklch(0.215 0.003 90)",
      popoverForeground: "oklch(0.96 0.003 90)",
      primary: "oklch(0.96 0.003 90)",
      primaryForeground: "oklch(0.2 0.003 90)",
      secondary: "oklch(0.26 0.003 90)",
      secondaryForeground: "oklch(0.96 0.003 90)",
      muted: "oklch(0.26 0.003 90)",
      mutedForeground: "oklch(0.74 0.006 85)",
      accent: "oklch(0.26 0.003 90)",
      accentForeground: "oklch(0.96 0.003 90)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.74 0.17 48)",
      // Redesign tokens
      brand: "oklch(0.72 0.17 46)",
      brandForeground: "oklch(0.8 0.13 52)",
      brandSoft: "oklch(0.72 0.17 46 / 16%)",
      faint: "oklch(0.6 0.006 85)",
      success: "oklch(0.72 0.17 149)",
    },
  },

} as const;
