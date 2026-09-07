import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Les crawlers de RECHERCHE des IA sont explicitement autorises (SEO_MASTER § 11.1).
 *
 * Distinction essentielle : un *search bot* (OAI-SearchBot, PerplexityBot,
 * Claude-SearchBot) alimente les reponses citees ; un *training bot* alimente
 * l'entrainement. Bloquer le premier en croyant bloquer le second supprime
 * toute chance d'etre cite. Ils recoivent donc les memes regles que `*`.
 */
const CRAWLERS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "CCBot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const regles = { allow: "/", disallow: ["/api/"] };
  return {
    rules: [
      { userAgent: "*", ...regles },
      { userAgent: CRAWLERS_IA, ...regles },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
