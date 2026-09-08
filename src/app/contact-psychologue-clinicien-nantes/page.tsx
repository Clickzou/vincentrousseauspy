import type { Metadata } from "next";
import Link from "next/link";

import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { IconeHorloge, IconeLieu, IconeTelephone } from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import {
  adressePostale,
  cabinet,
  contact,
  horaires,
  praticien,
  priseRdv,
} from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * /contact-psychologue-clinicien-nantes/ — URL CONSERVÉE, positionnée sur
 * « vincent rousseau » (§ 10.2).
 *
 * ⚠️ PROBLÈME RÉSOLU ICI : sur le site WordPress, cette page et
 * /rendez-vous-psychologue-nantes/ sont IDENTIQUES — mêmes coordonnées, même
 * formulaire Elementor, même objet d'e-mail. Deux URLs pour un seul contenu,
 * qui se cannibalisent.
 *
 * Partage des rôles retenu :
 *   /rendez-vous-…/  → prendre rendez-vous. C'est là, et là seulement, que
 *                      vit le formulaire.
 *   /contact-…/      → joindre Vincent et savoir à quoi il répond. Coordonnées,
 *                      horaires, et surtout ce qui se traite par téléphone
 *                      plutôt que par écrit.
 *
 * NE PAS ajouter de second formulaire ici : deux formulaires sur un même site
 * dispersent la conversion, et celui-ci n'aurait pas d'objet distinct.
 *
 * La page porte aussi l'identité — c'est sur « vincent rousseau » qu'elle se
 * classe — d'où le lien appuyé vers la page auteur.
 */

const TITRE = "Contact";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Joindre ${praticien.nom}, ${minusculeInitiale(praticien.titreCourt)} à ` +
    `${cabinet.ville} : téléphone, adresse du cabinet et horaires. ` +
    `${horaires.libelle}, réponse ${priseRdv.delaiReponse}.`,
  alternates: { canonical: canonical("contact-psychologue-clinicien-nantes") },
  openGraph: {
    title: `${TITRE} — ${praticien.nom}`,
    url: canonical("contact-psychologue-clinicien-nantes"),
  },
};

export default function Contact() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "contact-psychologue-clinicien-nantes" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre={`Contacter ${praticien.nom}`}
        chapeau={
          `${praticien.titreCourt} à ${cabinet.ville}. Le téléphone reste le plus simple : ` +
          `si je suis en séance, laissez votre numéro, je rappelle. Réponse ` +
          `${priseRdv.delaiReponse}.`
        }
      />

      {/* Les trois coordonnées, en cartes. Le NAP doit être strictement
          identique à celui du pied de page et de la fiche Google Business
          Profile (§ 6.1) : il vient donc entièrement de site-config. */}
      <section aria-labelledby="coordonnees" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <h2 id="coordonnees" className="sr-only">
          Coordonnées
        </h2>

        <ul className="grid gap-5 md:grid-cols-3">
          <li className="rounded-[20px] bg-peche p-7">
            <span className="text-bois-brun" aria-hidden="true">
              <IconeTelephone />
            </span>
            <h3 className="mt-3 text-sm font-medium uppercase tracking-wider text-bois">
              Téléphone
            </h3>
            <a
              href={`tel:${contact.telephoneE164}`}
              className="mt-2 block text-xl font-bold text-encre"
            >
              {contact.telephone}
            </a>
            <p className="mt-2 text-sm text-ardoise">Le canal le plus direct.</p>
          </li>

          <li className="rounded-[20px] bg-lavande p-7">
            <span className="text-bois-brun" aria-hidden="true">
              <IconeHorloge />
            </span>
            <h3 className="mt-3 text-sm font-medium uppercase tracking-wider text-bois">
              Horaires
            </h3>
            <p className="mt-2 font-medium text-encre">{horaires.libelle}</p>
            <p className="mt-2 text-sm text-ardoise">{horaires.modalite}.</p>
          </li>

          <li className="rounded-[20px] bg-menthe p-7">
            <span className="text-bois-brun" aria-hidden="true">
              <IconeLieu />
            </span>
            <h3 className="mt-3 text-sm font-medium uppercase tracking-wider text-bois">
              Cabinet
            </h3>
            <address className="mt-2 not-italic font-medium text-encre">
              {adressePostale}
            </address>
            <p className="mt-2 text-sm text-ardoise">{cabinet.acces.tram}.</p>
          </li>
        </ul>
      </section>

      {/* Ce qui se traite par téléphone, et ce qui ne se traite pas par écrit.
          C'est le contenu propre de cette page — celui qui la distingue de la
          page de rendez-vous et qui justifie qu'elle existe. */}
      <section
        aria-labelledby="a-quoi-je-reponds"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="a-quoi-je-reponds" className="text-2xl font-bold text-bois sm:text-[33px]">
              Ce que vous pouvez me demander
            </h2>
            <ul className="mt-6 space-y-4 text-ardoise">
              {[
                "Prendre un premier rendez-vous, ou déplacer un rendez-vous existant.",
                "Savoir si ce que vous traversez relève de ma pratique — et sinon, vers qui vous tourner.",
                "Poser une question pratique : tarif, durée, accès au cabinet, remboursement.",
                "Vérifier mes titres et mon inscription. C'est une question légitime, elle ne me vexera pas.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] bg-lin p-7 sm:p-9">
            <h2 className="text-xl font-bold text-bois">Ce qui ne se traite pas par écrit</h2>
            <p className="mt-4 text-ardoise">
              Je ne donne pas de consultation, d&rsquo;avis clinique ni d&rsquo;orientation
              détaillée par e-mail. Ce n&rsquo;est pas une question de disponibilité&nbsp;:
              un échange écrit ne permet ni d&rsquo;entendre ce qui se dit entre les mots,
              ni de vous répondre avec la prudence qu&rsquo;exige une situation que je ne
              connais pas.
            </p>
            <p className="mt-4 text-ardoise">
              C&rsquo;est aussi une protection. Ce que vous traversez relève du secret
              professionnel&nbsp;; écrit dans un message, il transiterait par des serveurs
              qui ne sont pas prévus pour recevoir des informations de santé.
            </p>
            <p className="mt-4 text-sm">
              <Link
                href="/politique-de-confidentialite/"
                className="text-terracotta-fonce underline underline-offset-2"
              >
                Ce que ce site collecte, et ce qu&rsquo;il ne collecte pas
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Renvoi vers le formulaire, qui vit sur la page de rendez-vous. */}
      <section
        aria-labelledby="prendre-rdv"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="max-w-lecture">
          <h2 id="prendre-rdv" className="text-2xl font-bold text-bois sm:text-[33px]">
            Si vous préférez ne pas téléphoner
          </h2>
          <p className="mt-4 text-ardoise">
            Vous pouvez demander à être rappelé en indiquant seulement votre nom, votre
            numéro et le moment qui vous arrange. Le formulaire ne comporte aucune zone de
            message&nbsp;: vous n&rsquo;avez rien à raconter par écrit. {priseRdv.suite}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/rendez-vous-psychologue-nantes/"
              className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
            >
              Demander à être rappelé
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
            >
              Écrire un e-mail
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <div className="max-w-lecture">
          <p className="text-ardoise">
            {praticien.nom} — {praticien.titres.join(", ").toLowerCase()}. Numéro ADELI{" "}
            {praticien.adeli}.{" "}
            <Link
              href="/vincent-rousseau-psychologue/"
              className="text-terracotta-fonce underline underline-offset-2"
            >
              Mon parcours et mes titres en détail
            </Link>
            .
          </p>
          <UrgenceBanner />
        </div>
      </section>
    </>
  );
}
