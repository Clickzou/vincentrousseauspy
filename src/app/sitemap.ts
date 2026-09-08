import type { MetadataRoute } from "next";

import { ARTICLES } from "@/lib/content/blog";
import { pagesIndexables } from "@/lib/sitemap-data";
import { absoluteUrl } from "@/lib/url-helpers";

/**
 * Sitemap unique : le volume cible (25-40 URLs) ne justifie aucune segmentation.
 *
 * ⚠️ `lastModified` n'est renseigné QUE pour les articles, dont la date de
 * révision est réellement suivie (`modifieLe`). Les pages du site n'en portent
 * pas : elles ont longtemps été datées de `new Date()`, ce qui revenait à
 * déclarer à chaque passage du robot que tout le site venait d'être modifié.
 * Une date absente signifie « inconnue » et n'est pas pénalisante ; une date
 * fausse et systématiquement fraîche, elle, finit par être ignorée — et avec
 * elle les dates exactes des articles.
 *
 * Le jour où les pages porteront une vraie date de révision, la reprendre ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = pagesIndexables().map((page) => ({
    url: absoluteUrl(page.slug),
    priority: page.priorite,
  }));

  const articles: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: absoluteUrl(`blog/${article.slug}`),
    lastModified: new Date(article.modifieLe),
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
