/**
 * Helpers d'URL — garantissent le trailing slash partout.
 *
 * Le site WordPress sert déjà en `/%postname%/` avec slash final et Google a
 * indexé ces URLs. Servir une variante sans slash créerait un doublon ou une
 * redirection inutile sur les seules URLs qui portent le référencement.
 * Règle : SEO_MASTER § 3.3.
 */

import { SITE_URL } from "@/lib/site-config";

/** Normalise un chemin interne : toujours un `/` au début et à la fin. */
export function path(input: string): string {
  if (!input || input === "/") return "/";
  const trimmed = input.trim().replace(/^\/+|\/+$/g, "");
  return `/${trimmed}/`;
}

/** URL absolue, pour les canoniques, le JSON-LD, le sitemap et l'Open Graph. */
export function absoluteUrl(input: string): string {
  return `${SITE_URL}${path(input)}`;
}

/** Canonique auto-référente d'une page. Jamais de canonique croisée. */
export function canonical(input: string): string {
  return absoluteUrl(input);
}

/**
 * Vrai si l'URL sort du site. Utilisé pour appliquer automatiquement
 * `target="_blank" rel="noopener noreferrer"` aux liens de sources (§ 5).
 */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href) && !href.startsWith(SITE_URL);
}

/**
 * Met en minuscule UNIQUEMENT la première lettre, pour insérer une valeur de
 * configuration au milieu d'une phrase sans détruire les noms propres.
 * `toLowerCase()` transformerait « Derrière la Manufacture des Tabacs » en
 * « derrière la manufacture des tabacs ».
 */
export function minusculeInitiale(texte: string): string {
  return texte ? texte.charAt(0).toLowerCase() + texte.slice(1) : texte;
}
