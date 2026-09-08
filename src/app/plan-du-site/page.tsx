import type { Metadata } from "next";
import Link from "next/link";

import { PageEnTete } from "@/components/ui/PageEnTete";
import { ARTICLES } from "@/lib/content/blog";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { PAGES } from "@/lib/sitemap-data";
import { cabinet, praticien } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /plan-du-site/ — page indexable, contrairement aux deux autres pages
 * « légales » du pied de page.
 *
 * Elle est ENGENDRÉE à partir du registre `PAGES` et du registre du blog, et
 * jamais écrite à la main : un plan du site recopié diverge en trois mois et
 * finit par lister des URLs mortes. Ajouter une page au registre suffit à la
 * faire apparaître ici, dans le sitemap XML et dans le décompte.
 *
 * Les pages `noindex` en sont exclues, comme du sitemap XML — les lister
 * reviendrait à inviter le robot là où on lui demande de ne pas aller.
 */

const TITRE = "Plan du site";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Toutes les pages du site de ${praticien.nom}, ` +
    `${praticien.titreCourt.toLowerCase()} à ${cabinet.ville}.`,
  alternates: { canonical: canonical("plan-du-site") },
};

/**
 * Regroupement éditorial. Il ne reflète pas l'arborescence des URLs — le site
 * est volontairement plat (§ 5 : deux clics maximum depuis l'accueil) — mais
 * l'intention du visiteur, qui est ce qu'il cherche en arrivant ici.
 */
const RUBRIQUES: { titre: string; slugs: string[] }[] = [
  {
    titre: "Qui je suis",
    slugs: ["/", "/vincent-rousseau-psychologue/"],
  },
  {
    titre: "Ma pratique",
    slugs: [
      "/psychotherapeute-nantes/",
      "/psychanalyste-nantes/",
      "/psychologue-clinicien-nantes/",
      "/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/",
    ],
  },
  {
    titre: "En pratique",
    slugs: [
      "/consultations/",
      "/tarifs-et-remboursement/",
      "/cabinet-nantes/",
      "/aide-faq/",
    ],
  },
  {
    titre: "Me joindre",
    slugs: ["/rendez-vous-psychologue-nantes/", "/contact-psychologue-clinicien-nantes/"],
  },
];

export default function PlanDuSite() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "plan-du-site" },
    ]),
  );

  const parSlug = new Map(PAGES.filter((p) => !p.noindex).map((p) => [p.slug, p]));
  const classees = new Set(RUBRIQUES.flatMap((r) => r.slugs));

  /* Filet de sécurité : toute page indexable ajoutée au registre sans être
     rangée dans une rubrique ci-dessus apparaît quand même, plutôt que de
     disparaître silencieusement du plan. */
  const orphelines = [...parSlug.values()].filter((p) => !classees.has(p.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <PageEnTete
          titre="Plan du site"
          chapeau="Toutes les pages, rangées par ce que vous cherchez."
        />

        <div className="grid gap-10 sm:grid-cols-2">
          {RUBRIQUES.map((rubrique) => (
            <nav key={rubrique.titre} aria-labelledby={`rubrique-${rubrique.titre}`}>
              <h2
                id={`rubrique-${rubrique.titre}`}
                className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce"
              >
                {rubrique.titre}
              </h2>
              <ul className="mt-4 space-y-3">
                {rubrique.slugs.map((slug) => {
                  const page = parSlug.get(slug);
                  if (!page) return null;
                  return (
                    <li key={slug}>
                      <Link href={slug} className="text-encre underline underline-offset-4">
                        {page.titre}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          <nav aria-labelledby="rubrique-ecrits">
            <h2
              id="rubrique-ecrits"
              className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce"
            >
              Écrits
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/blog/" className="text-encre underline underline-offset-4">
                  Tous les articles
                </Link>
              </li>
              {ARTICLES.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}/`}
                    className="text-ardoise underline underline-offset-4"
                  >
                    {article.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {orphelines.length > 0 && (
            <nav aria-labelledby="rubrique-autres">
              <h2
                id="rubrique-autres"
                className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce"
              >
                Autres pages
              </h2>
              <ul className="mt-4 space-y-3">
                {orphelines.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={page.slug}
                      className="text-encre underline underline-offset-4"
                    >
                      {page.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <p className="mt-12 max-w-lecture text-sm text-ardoise">
          Les mentions légales et la politique de confidentialité, accessibles depuis le
          pied de page, ne figurent pas dans ce plan&nbsp;: elles sont volontairement
          exclues de l&rsquo;indexation.{" "}
          <Link
            href="/mentions-legales/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            Mentions légales
          </Link>{" "}
          ·{" "}
          <Link
            href="/politique-de-confidentialite/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            Politique de confidentialité
          </Link>
        </p>
      </section>
    </>
  );
}
