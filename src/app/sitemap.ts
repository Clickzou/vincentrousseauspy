import type { MetadataRoute } from "next";
import { pagesIndexables } from "@/lib/sitemap-data";
import { absoluteUrl } from "@/lib/url-helpers";

/** Sitemap unique : le volume cible (25-40 URLs) ne justifie aucune segmentation. */
export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();
  return pagesIndexables().map((page) => ({
    url: absoluteUrl(page.slug),
    lastModified: maintenant,
    priority: page.priorite,
  }));
}
