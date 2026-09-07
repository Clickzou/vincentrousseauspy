import type { NextConfig } from "next";

/**
 * REDIRECTIONS DE MIGRATION — WordPress → Next.js
 *
 * Principe (SEO_MASTER § 10.2) : les slugs français existants sont CONSERVÉS.
 * Seules figurent ici les URLs réellement supprimées ou renommées.
 * Jamais de chaîne A → B → C : toujours la cible finale.
 */

/** Contenu de démonstration du thème Medcaline, en anglais, indexable depuis 2020. */
const ARTICLES_DEMO = [
  "/10-quarantine-activities-that-dont-involve-watching-the-news",
  "/building-a-new-world",
  "/how-to-catch-the-happiness",
  "/how-to-cope-with-coronavirus-caused-mental-health-concerns",
  "/is-it-important-to-say-please-and-thank-you-to-your-partner",
  "/strict-analysis-in-the-situation",
  "/three-secrets-to-beat-performance-anxiety",
];

const nextConfig: NextConfig = {
  // Le site WordPress sert déjà en /%postname%/ avec slash final et Google a
  // indexé ces URLs. Ne jamais changer ce réglage.
  trailingSlash: true,

  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Page de cookies vide → vraie politique de confidentialité.
      {
        source: "/politique-de-cookies-ue",
        destination: "/politique-de-confidentialite/",
        permanent: true,
      },
      // Ancien slug interne de la page d'accueil.
      { source: "/home-main", destination: "/", permanent: true },

      // Les articles de démonstration sont dirigés vers le blog. Un 410 serait
      // plus juste sémantiquement, mais `redirects()` ne le permet pas ; le
      // traitement définitif se fait dans le middleware ou via une route 410
      // dédiée si l'un d'eux reçoit des liens entrants.
      ...ARTICLES_DEMO.map((source) => ({
        source,
        destination: "/blog/",
        permanent: true,
      })),
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
