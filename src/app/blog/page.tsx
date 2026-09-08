import type { Metadata } from "next";
import Link from "next/link";

import { PageEnTete } from "@/components/ui/PageEnTete";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { ARTICLES } from "@/lib/content/blog";
import { cabinet, contact, praticien } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /blog/ — listing.
 *
 * ⚠️ CETTE PAGE EST AUSSI UNE CIBLE DE REDIRECTION. `next.config.ts` renvoie
 * en 301 les 7 articles de démonstration anglais du thème Medcaline vers
 * `/blog/`. Tant qu'elle répondait 404, ces redirections menaient à une page
 * d'erreur — une 301 vers une 404 est pire que la 404 seule. Ne jamais
 * supprimer cette route sans traiter d'abord ces redirections.
 *
 * Pas de pagination pour l'instant : à 2 articles par mois maximum (§ 7), le
 * seuil de `/blog/page/2/` ne sera pas atteint avant longtemps. Quand il le
 * sera, la page 2 sera canonique sur elle-même, jamais sur /blog/ (§ 3.3).
 */

const TITRE = "Blog";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Articles de ${praticien.nom}, ${praticien.titreCourt.toLowerCase()} à ` +
    `${cabinet.ville} : ce qui se passe réellement en consultation, le cadre, les ` +
    `questions que l'on pose rarement à voix haute.`,
  alternates: { canonical: canonical("blog") },
  openGraph: { title: `${TITRE} — ${praticien.nom}`, url: canonical("blog") },
};

const dateLisible = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Blog() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "blog" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre="Écrits"
        chapeau={
          `Quelques textes sur ce qui se passe réellement en consultation, sur le cadre, ` +
          `et sur les questions que l'on pose rarement à voix haute. Ils paraissent quand ` +
          `j'ai quelque chose à dire, pas selon un calendrier.`
        }
      />

      <section aria-label="Liste des articles" className="px-5 py-10 sm:px-10 lg:px-[100px]">
        {ARTICLES.length === 0 ? (
          <p className="max-w-lecture text-ardoise">
            Le premier texte est en cours d&rsquo;écriture. En attendant, les{" "}
            <Link
              href="/aide-faq/"
              className="text-terracotta-fonce underline underline-offset-2"
            >
              questions fréquentes
            </Link>{" "}
            répondent à l&rsquo;essentiel.
          </p>
        ) : (
          <ul className="grid gap-6 lg:grid-cols-2">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <article className="flex h-full flex-col rounded-[20px] bg-creme p-7 sm:p-9">
                  <p className="text-xs uppercase tracking-[0.18em] text-terracotta-fonce">
                    <time dateTime={article.publieLe}>{dateLisible(article.publieLe)}</time>
                  </p>
                  <h2 className="mt-3 text-xl font-bold leading-tight text-bois sm:text-2xl">
                    <Link href={`/blog/${article.slug}/`} className="hover:underline">
                      {article.titre}
                    </Link>
                  </h2>
                  <p className="mt-4 flex-1 text-ardoise">{article.chapeau}</p>
                  <p className="mt-6">
                    <Link
                      href={`/blog/${article.slug}/`}
                      className="text-sm font-medium text-terracotta-fonce underline underline-offset-4"
                    >
                      Lire l&rsquo;article
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <div className="max-w-lecture text-sm text-ardoise">
          <p>
            Ces textes sont d&rsquo;ordre général et ne remplacent pas une consultation.
            Pour une question qui vous concerne, appelez-moi au{" "}
            <a
              href={`tel:${contact.telephoneE164}`}
              className="font-medium text-encre underline underline-offset-2"
            >
              {contact.telephone}
            </a>{" "}
            ou{" "}
            <Link
              href="/rendez-vous-psychologue-nantes/"
              className="text-terracotta-fonce underline underline-offset-2"
            >
              prenez rendez-vous
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
