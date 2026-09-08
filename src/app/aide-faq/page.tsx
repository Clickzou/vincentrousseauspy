import type { Metadata } from "next";
import Link from "next/link";

import { Apparition } from "@/components/ui/Apparition";
import { FaqAccordeon } from "@/components/ui/FaqAccordeon";
import { QUESTIONS } from "@/lib/content/faq";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, praticien } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /aide-faq/ — URL CONSERVÉE du site WordPress (SEO_MASTER § 10.2).
 *
 * Cette page réunit les questions des DEUX FAQ du site actuel, fusionnées et
 * dédoublonnées (cf. src/lib/content/faq.ts). C'est ici, et ici seulement, que
 * le schéma `FAQPage` est déclaré : les réponses y sont complètes, et publier
 * deux blocs FAQ sur le même site les mettrait en concurrence.
 *
 * Note sur les rich results : Google a restreint l'affichage des résultats
 * enrichis FAQ en 2023 aux sites gouvernementaux et de santé faisant autorité.
 * Un praticien libéral n'en obtiendra pas. Le balisage reste utile pour le
 * bloc « Les gens demandent aussi » et pour les citations par les IA.
 */

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    `Prix, remboursement, première séance, confidentialité, accès : les réponses aux ` +
    `questions les plus posées avant de consulter à ${cabinet.ville}.`,
  alternates: { canonical: canonical("aide-faq") },
};

export default function AideFaq() {
  const jsonLd = graph(
    faqSchema(QUESTIONS.map((q) => ({ question: q.question, reponse: q.reponse }))),
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: "Questions fréquentes", url: "aide-faq" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE EN CARTE, comme les autres pages. Le compte de questions est
          calculé depuis le registre : il ne peut pas mentir si l'on en ajoute. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">Questions fréquentes</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              {`${QUESTIONS.length} questions · Prix, remboursement, première séance`}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              Questions fréquentes
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Voici les questions que l&rsquo;on me pose le plus souvent avant un premier
              rendez-vous. Si la vôtre n&rsquo;y figure pas, appelez-moi&nbsp;: j&rsquo;y
              répondrai volontiers, sans que cela vous engage.
            </p>
          </div>
        </Apparition>
      </section>

      {/* La liste reste sur une colonne unique et bornée : une question se lit
          en une ligne ou deux, l'étaler sur toute la largeur obligerait l'œil à
          balayer de très longues lignes pour rien. */}
      <section
        aria-label="Liste des questions"
        className="mt-4 bg-lavande px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="mx-auto max-w-4xl">
          {/* `niveau={2}` : ici la liste suit directement le <h1>, sans
              titre de section intermédiaire. */}
          <FaqAccordeon questions={QUESTIONS} ouvrirPremiere niveau={2} />
        </div>
      </section>

      {/* Carte de conversion, même modèle que les autres pages. */}
      <section aria-labelledby="pas-la" className="px-5 pb-10 pt-14 sm:px-10 sm:pt-16 lg:px-[100px]">
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="pas-la" className="text-2xl font-bold text-bois sm:text-[33px]">
              Votre question n&rsquo;est pas là&nbsp;?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              Vous pouvez m&rsquo;appeler directement. Un premier échange suffit souvent à
              savoir si une consultation est indiquée.
            </p>

            <div className="mt-9 border-t border-white/70 pt-9">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/rendez-vous-psychologue-nantes/"
                  className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
                >
                  Prendre rendez-vous
                </Link>
                <a
                  href={`tel:${contact.telephoneE164}`}
                  className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
                >
                  {contact.telephone}
                </a>
              </div>
            </div>
          </div>
        </Apparition>
      </section>

      {/* Réassurance : titre et numéro d'enregistrement, comme sur les autres
          pages de conversion (§ 9.4). */}
      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <p className="mx-auto max-w-lecture text-center text-sm text-ardoise">
          {praticien.nom} — {praticien.titreCourt}. Numéro ADELI {praticien.adeli}.
        </p>
      </section>
    </>
  );
}
