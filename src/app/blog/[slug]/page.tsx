import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Sources } from "@/components/seo/Sources";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { CorpsArticle } from "@/components/blog/CorpsArticle";
import { Apparition } from "@/components/ui/Apparition";
import { ARTICLES, articleParSlug } from "@/lib/content/blog";
import { articleSchema, breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { contact, praticien } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /blog/[slug]/ — article.
 *
 * Entièrement statique : `generateStaticParams` énumère le registre, il n'y a
 * ni base ni rendu à la demande. Un slug inconnu tombe en 404 plutôt que de
 * générer une page vide — Next répondrait sinon 200 sur n'importe quelle URL
 * fantaisiste, ce qui ouvre la porte au spam d'indexation.
 *
 * C'est ici, et seulement ici, que le schéma `Article` est déclaré : il porte
 * l'auteur, les dates et les sources citées, qui sont les signaux E-E-A-T
 * attendus en YMYL (§ 5).
 */

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) return {};

  return {
    title: article.titre,
    description: article.chapeau,
    alternates: { canonical: canonical(`blog/${article.slug}`) },
    openGraph: {
      type: "article",
      title: article.titre,
      description: article.chapeau,
      url: canonical(`blog/${article.slug}`),
      publishedTime: article.publieLe,
      modifiedTime: article.modifieLe,
      authors: [praticien.nom],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();

  const jsonLd = graph(
    articleSchema({
      titre: article.titre,
      description: article.chapeau,
      slug: `blog/${article.slug}`,
      publieLe: article.publieLe,
      modifieLe: article.modifieLe,
      sources: article.sources.map((s) => s.href),
    }),
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: "Blog", url: "blog" },
      { nom: article.titre, url: `blog/${article.slug}` },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE D'ARTICLE, en carte centrée comme le reste du site. La date
          et la signature sont dans le bandeau plutôt qu'en note sous le
          chapeau : sur un contenu de santé, savoir QUI écrit et QUAND fait
          partie de la lecture, pas de l'appareil critique (§ 5). */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <Link href="/blog/" className="underline underline-offset-2">
            Écrits
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">{article.titre}</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              <time dateTime={article.publieLe}>
                {new Date(article.publieLe).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>{" "}
              · {praticien.nom}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {article.titre}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              {article.chapeau}
            </p>
          </div>
        </Apparition>
      </section>

      {/* Le corps de l'article dans une colonne de lecture CENTRÉE. C'est le
          seul format juste pour un texte long : ni collé à gauche d'un écran
          large, ni étalé sur toute sa largeur. */}
      <article className="px-5 pb-8 pt-6 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <CorpsArticle blocs={article.corps} />

          {/* Le bandeau d'urgence précède les sources : sur un article qui
              touche à un sujet à risque, un lecteur en difficulté ne doit pas
              avoir à traverser un appareil de notes pour trouver un numéro. */}
          {article.urgence && <UrgenceBanner />}
          <Sources sources={article.sources} />
          <AuthorSignature modifieLe={article.modifieLe} />
        </div>
      </article>

      <section aria-labelledby="apres-lecture" className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="apres-lecture" className="text-2xl font-bold text-bois sm:text-[33px]">
              Une question qui vous concerne&nbsp;?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              Ce texte est d&rsquo;ordre général et ne remplace pas une consultation. Pour
              votre situation, un échange de quelques minutes au téléphone en dira plus que
              n&rsquo;importe quel article.
            </p>

            <div className="mt-9 border-t border-white/70 pt-9">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${contact.telephoneE164}`}
                  className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
                >
                  {contact.telephone}
                </a>
                <Link
                  href="/rendez-vous-psychologue-nantes/"
                  className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
                >
                  Prendre rendez-vous
                </Link>
              </div>
              <p className="mt-5 text-sm">
                <Link
                  href="/blog/"
                  className="text-terracotta-fonce underline underline-offset-2"
                >
                  Tous les articles
                </Link>
              </p>
            </div>
          </div>
        </Apparition>
      </section>
    </>
  );
}
