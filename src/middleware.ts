import { NextResponse, type NextRequest } from "next/server";

/**
 * Renvoie un 410 Gone sur les articles de démonstration du thème WordPress.
 *
 * POURQUOI PAS UNE REDIRECTION. Ces sept articles en anglais sont le contenu
 * de démonstration du thème Medcaline, indexé depuis 2020. Ils n'ont aucun
 * équivalent sur le nouveau site. Les rediriger tous vers /blog/ enverrait
 * sept URLs sans rapport vers une même page, ce que Google requalifie
 * généralement en soft 404 — le gain est nul et le signal est trouble.
 *
 * Le 410 dit exactement ce qui s'est passé : ce contenu a été supprimé, et il
 * ne reviendra pas. C'est la seule réponse qui provoque un retrait rapide de
 * l'index, là où une 404 laisse le robot revenir des mois durant.
 *
 * Si l'un de ces articles se révélait porteur de liens entrants réels
 * (à vérifier en Search Console une fois le site en ligne), le traiter au cas
 * par cas par une redirection vers une page pertinente — jamais en bloc.
 */

/**
 * Les sept slugs concernés. Ils sont écrits DEUX FOIS dans ce fichier : ici,
 * et dans le `matcher` ci-dessous — Next exige que le matcher soit composé de
 * littéraux statiques, il ne peut pas être calculé à partir d'un tableau.
 * Toute modification doit donc porter sur les deux listes.
 */
const ARTICLES_DEMO = [
  "10-quarantine-activities-that-dont-involve-watching-the-news",
  "building-a-new-world",
  "how-to-catch-the-happiness",
  "how-to-cope-with-coronavirus-caused-mental-health-concerns",
  "is-it-important-to-say-please-and-thank-you-to-your-partner",
  "strict-analysis-in-the-situation",
  "three-secrets-to-beat-performance-anxiety",
];

const PARTIES = new Set(ARTICLES_DEMO);

export function middleware(requete: NextRequest) {
  const chemin = requete.nextUrl.pathname.replace(/^\/|\/$/g, "");

  if (PARTIES.has(chemin)) {
    return new NextResponse(
      "<!doctype html><html lang=\"fr\"><meta charset=\"utf-8\">" +
        "<title>Page supprimée</title>" +
        "<p>Cette page n'existe plus. <a href=\"/\">Revenir à l'accueil</a>.</p>",
      { status: 410, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return NextResponse.next();
}

/** Ne s'exécute que sur les chemins concernés : aucun coût sur le reste du site. */
export const config = {
  matcher: [
    "/10-quarantine-activities-that-dont-involve-watching-the-news/:path*",
    "/building-a-new-world/:path*",
    "/how-to-catch-the-happiness/:path*",
    "/how-to-cope-with-coronavirus-caused-mental-health-concerns/:path*",
    "/is-it-important-to-say-please-and-thank-you-to-your-partner/:path*",
    "/strict-analysis-in-the-situation/:path*",
    "/three-secrets-to-beat-performance-anxiety/:path*",
  ],
};
