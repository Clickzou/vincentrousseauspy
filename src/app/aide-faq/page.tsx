import type { Metadata } from "next";
import Link from "next/link";

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
    `Prix, remboursement, déroulé d'une première séance, confidentialité, accès : ` +
    `les réponses aux questions les plus posées avant une première consultation à ` +
    `${cabinet.ville}.`,
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

      <section className="px-5 pb-4 pt-14 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">Questions fréquentes</span>
        </nav>

        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
          Questions fréquentes
        </h1>
        <p className="mt-5 max-w-lecture text-lg text-ardoise">
          Voici les questions que l&rsquo;on me pose le plus souvent avant un premier
          rendez-vous. Si la vôtre n&rsquo;y figure pas, appelez-moi&nbsp;: j&rsquo;y
          répondrai volontiers, sans que cela vous engage.
        </p>
      </section>

      <section
        aria-label="Liste des questions"
        className="bg-lavande px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="mx-auto max-w-4xl">
          <FaqAccordeon questions={QUESTIONS} ouvrirPremiere />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-bold text-bois">
            Votre question n&rsquo;est pas là&nbsp;?
          </p>
          <p className="mx-auto mt-3 max-w-lecture text-ardoise">
            Vous pouvez m&rsquo;appeler directement. Un premier échange suffit souvent à
            savoir si une consultation est indiquée.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
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
          <p className="mt-8 text-sm text-ardoise">
            {praticien.nom} — {praticien.titreCourt}. Numéro ADELI {praticien.adeli}.
          </p>
        </div>
      </section>
    </>
  );
}
