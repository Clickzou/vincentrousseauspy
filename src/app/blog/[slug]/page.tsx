import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Sources } from "@/components/seo/Sources";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { CorpsArticle } from "@/components/blog/CorpsArticle";
import { PageEnTete } from "@/components/ui/PageEnTete";
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

      <PageEnTete
        miettes={[{ nom: "Blog", href: "/blog/" }]}
        titre={article.titre}
        chapeau={article.chapeau}
        enfants={
          <p className="mt-5 text-sm text-ardoise">
            Publié le{" "}
            <time dateTime={article.publieLe}>
              {new Date(article.publieLe).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>{" "}
            par {praticien.nom}, {praticien.titreCourt.toLowerCase()}.
          </p>
        }
      />

      <article className="px-5 pb-8 pt-4 sm:px-10 lg:px-[100px]">
        <CorpsArticle blocs={article.corps} />

        <div className="max-w-lecture">
          {/* Le bandeau d'urgence précède les sources : sur un article qui
              touche à un sujet à risque, un lecteur en difficulté ne doit pas
              avoir à traverser un appareil de notes pour trouver un numéro. */}
          {article.urgence && <UrgenceBanner />}
          <Sources sources={article.sources} />
          <AuthorSignature modifieLe={article.modifieLe} />
        </div>
      </article>

      <section
        aria-labelledby="apres-lecture"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="max-w-lecture">
          <h2 id="apres-lecture" className="text-2xl font-bold text-bois">
            Une question qui vous concerne&nbsp;?
          </h2>
          <p className="mt-4 text-ardoise">
            Ce texte est d&rsquo;ordre général et ne remplace pas une consultation. Pour
            votre situation, un échange de quelques minutes au téléphone en dira plus que
            n&rsquo;importe quel article.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
            <Link
              href="/blog/"
              className="text-sm text-terracotta-fonce underline underline-offset-2"
            >
              Tous les articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
