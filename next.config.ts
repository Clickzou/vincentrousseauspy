import type { NextConfig } from "next";

/**
 * REDIRECTIONS DE MIGRATION — WordPress → Next.js
 *
 * Principe (SEO_MASTER § 10.2) : les slugs français existants sont CONSERVÉS.
 * Seules figurent ici les URLs réellement supprimées ou renommées.
 * Jamais de chaîne A → B → C : toujours la cible finale.
 */

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
      // `statusCode: 301` plutôt que `permanent: true` : ce dernier produit un
      // 308. Google traite les deux à l'identique, mais le master impose du 301
      // (§ 3.3) et certains outils d'audit et robots anciens le gèrent mieux.
      // Sur des redirections de pages en GET, 301 n'a aucun inconvénient.

      // Page de cookies vide → vraie politique de confidentialité.
      {
        source: "/politique-de-cookies-ue",
        destination: "/politique-de-confidentialite/",
        statusCode: 301,
      },
      // Ancien slug interne de la page d'accueil.
      { source: "/home-main", destination: "/", statusCode: 301 },

      // /dispositions-legales/ portait les numéros ADELI et SIRET, absents des
      // mentions légales. La v2 les fait figurer là où on les cherche, et cette
      // page n'a plus d'objet. Elle était en `noindex`, donc sans référencement
      // à transférer, mais elle peut avoir été mise en favori ou liée.
      {
        source: "/dispositions-legales",
        destination: "/mentions-legales/",
        statusCode: 301,
      },
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
