import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Apparition } from "@/components/ui/Apparition";
import { IconeLienExterne } from "@/components/ui/Icones";
import { breadcrumbSchema, graph, publicationSchema, videoSchema } from "@/lib/seo/schemas";
import { ARTICLES } from "@/lib/content/blog";
import {
  INTRODUCTION_VIDEOS,
  PUBLICATIONS,
  VIDEOS,
  type Publication,
} from "@/lib/content/publications";
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
    `Textes sur la réalité des consultations et le cadre des séances, et contributions ` +
    `scientifiques de ${praticien.nom}, psychologue et psychanalyste à ${cabinet.ville}.`,
  alternates: { canonical: canonical("blog") },
  openGraph: { title: `${TITRE} — ${praticien.nom}`, url: canonical("blog") },
};

const dateLisible = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** « le 17 avril 2026 » si la date est connue au jour près, « en 2024 » sinon. */
const datePublication = (p: Publication) =>
  p.publieLe.length === 4 ? `en ${p.publieLe}` : `le ${dateLisible(p.publieLe)}`;

export default function Blog() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "blog" },
    ]),
    ...PUBLICATIONS.map(publicationSchema),
    ...VIDEOS.map(videoSchema),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE EN CARTE, comme le reste du site. Le compte d'articles est
          calculé depuis le registre : il ne peut pas se désynchroniser. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">Écrits</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              {ARTICLES.length > 1
                ? `${ARTICLES.length} textes`
                : `${ARTICLES.length} texte`}{" "}
              · {praticien.nom}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              Quelques écrits
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Vous trouverez ici quelques textes simples sur la réalité des consultations et
              le cadre des séances.
            </p>
          </div>
        </Apparition>
      </section>

      {/* LES ARTICLES, EN GRILLE SUR TOUTE LA LARGEUR. La vidéo qui occupait
          la colonne de droite est descendue dans la rubrique « Vidéos », en
          bas de page (document « Articles & Vidéos » du 2026-09-11) : avec un
          article de plus chaque quinzaine, la colonne de gauche aurait vite
          dépassé la vidéo de plusieurs écrans. */}
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
          /* Deux colonnes dès la tablette, l'œuvre au-dessus du texte. Les
             cartes d'une même rangée prennent la hauteur de la plus haute, et
             le lien « Lire l'article » reste calé en bas de chacune. */
          <ul className="grid gap-6 md:grid-cols-2">
            {ARTICLES.map((article, i) => (
              <li key={article.slug}>
                <Apparition delai={(i % 2) * 120} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-lin">
                    {article.illustration && (
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={article.illustration.src}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
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
                    {/* Crédit : le droit moral est perpétuel en France. */}
                    {article.illustration && (
                      <p className="mt-4 text-xs text-ardoise">
                        {article.illustration.auteur}, <cite>{article.illustration.titre}</cite>{" "}
                        ({article.illustration.annee}).
                      </p>
                    )}
                    </div>
                  </article>
                </Apparition>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* CONTRIBUTIONS SCIENTIFIQUES — rubrique demandée par Vincent le
          2026-09-11. Les textes restent chez l'éditeur (droits d'auteur) :
          chaque carte présente la référence et le résumé de Vincent, puis
          renvoie vers Cairn. Leurs présentations vidéo suivent, dans la
          rubrique « Vidéos ». */}
      <section
        aria-labelledby="contributions"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="contributions"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Contributions scientifiques
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
            <p className="mt-6 text-ardoise">
              Pour des raisons de droits d&rsquo;auteur, mes articles publiés dans des revues
              scientifiques ne peuvent pas être partagés en accès libre sur ce site.
            </p>
          </div>
        </Apparition>

        <ul className="mx-auto mt-10 max-w-4xl space-y-6">
          {PUBLICATIONS.map((p) => (
            <li key={p.url}>
              <Apparition>
                <article className="rounded-[20px] bg-white p-7 sm:p-9">
                  <p className="text-xs uppercase tracking-[0.18em] text-terracotta-fonce">
                    {p.revue} · n°&nbsp;{p.numero} ·{" "}
                    {p.nature === "entretien" ? "Entretien" : "Article"}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-tight text-bois sm:text-2xl">
                    {p.titre}
                  </h3>
                  <p className="mt-3 text-sm text-ardoise">
                    {praticien.nom}
                    {p.intervieweur ? `, entretien mené par ${p.intervieweur}` : ""}. Publié{" "}
                    {datePublication(p)} dans la revue <cite>{p.revue}</cite> (n°&nbsp;
                    {p.numero}, pages {p.pageDebut} à {p.pageFin}, {p.editeur}
                    {p.doi ? `, DOI ${p.doi}` : ""}).
                  </p>
                  <p className="mt-5 leading-relaxed text-ardoise">{p.resume}</p>
                  <p className="mt-6 border-t border-sable pt-5 text-sm text-ardoise">
                    {p.nature === "entretien" ? "L’entretien" : "L’article"} complet est
                    disponible sur la plateforme Cairn&nbsp;:{" "}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-terracotta-fonce underline underline-offset-4"
                    >
                      cairn.info
                      <IconeLienExterne className="h-3.5 w-3.5" />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </p>
                </article>
              </Apparition>
            </li>
          ))}
        </ul>
      </section>

      {/* VIDÉOS — troisième rubrique, tout en bas (document « Articles &
          Vidéos » du 2026-09-11). Le chapeau est commun, chaque vidéo n'a
          qu'une phrase : le résumé de la publication est juste au-dessus.
          Le lecteur prend la colonne large, sinon les diapositives deviennent
          illisibles. Aucun chargement avant le clic (`preload="none"`). */}
      <section aria-labelledby="videos" className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]">
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="videos"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Vidéos
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
            <p className="mt-6 text-ardoise">{INTRODUCTION_VIDEOS}</p>
          </div>
        </Apparition>

        <ul className="mx-auto mt-10 max-w-6xl space-y-6">
          {VIDEOS.map((v) => (
            <li key={v.fichier}>
              <Apparition>
                <article className="grid gap-8 rounded-[20px] bg-lin p-7 sm:p-9 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-terracotta-fonce">
                      {v.article.revue} · n°&nbsp;{v.article.numero}
                    </p>
                    <h3 className="mt-3 text-xl font-bold leading-tight text-bois sm:text-2xl">
                      {v.titre}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ardoise">{v.description}</p>
                    <p className="mt-4 text-xs text-ardoise">
                      Durée&nbsp;: {v.dureeLisible}. Réalisée avec NotebookLM.
                    </p>
                  </div>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={v.affiche}
                    width={v.largeur}
                    height={v.hauteur}
                    aria-label={`Présentation en vidéo : ${v.titre}`}
                    className="aspect-video w-full rounded-[12px] bg-encre lg:col-span-7"
                  >
                    <source src={v.fichier} type="video/mp4" />
                    Votre navigateur ne lit pas cette vidéo.{" "}
                    <a href={v.fichier}>Télécharger le fichier</a>.
                  </video>
                </article>
              </Apparition>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-16 pt-14 sm:px-10 sm:pt-16 lg:px-[100px]">
        <div className="mx-auto max-w-lecture text-center text-sm text-ardoise">
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
