import type { Metadata } from "next";
import Link from "next/link";

import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { Apparition } from "@/components/ui/Apparition";
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
 *   /rendez-vous-…/  → prendre rendez-vous, page de conversion principale.
 *   /contact-…/      → joindre Vincent et savoir à quoi il répond. Coordonnées,
 *                      horaires, et surtout ce qui se traite par téléphone
 *                      plutôt que par écrit.
 *
 * ⚠️ PAS DE FORMULAIRE SUR CETTE PAGE. Il y a été ajouté le 2026-09-08 puis
 * retiré le même jour : la page se retrouvait à afficher un formulaire juste à
 * côté d'un encadré expliquant que Vincent ne répond pas par écrit.
 *
 * Le formulaire vit sur /rendez-vous-psychologue-nantes/, dont l'URL dit ce
 * qu'on y fait. Cette page y renvoie par un bouton.
 *
 * À noter tout de même : le composant et son action serveur ont été sortis de
 * la route rendez-vous vers `src/components/formulaire/` à cette occasion, et
 * ils y restent. Le jour où un second formulaire serait décidé, il suffira de
 * l'importer — les règles du § 2.4 (aucun champ libre, aucun stockage)
 * s'appliqueront mécaniquement, sans possibilité d'en assouplir une seule.
 *
 * La page porte aussi l'identité — c'est sur « vincent rousseau » qu'elle se
 * classe — d'où le lien appuyé vers la page auteur.
 */

const TITRE = "Contact";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Joindre ${praticien.nom}, psychologue à ${cabinet.ville} : téléphone, adresse du ` +
    `cabinet et horaires. Réponse ${priseRdv.delaiReponse}.`,
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

      {/* EN-TÊTE EN CARTE, comme le reste du site. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">{TITRE}</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              {praticien.titreCourt}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {`Contacter ${praticien.nom}`}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Le téléphone reste le moyen le plus simple pour me joindre. Si je suis en
              séance, laissez-moi un message avec votre numéro et je vous rappelle. Je vous
              recontacte {priseRdv.delaiReponse}.
            </p>
          </div>
        </Apparition>
      </section>

      {/* Les trois coordonnées, en cartes. Le NAP doit être strictement
          identique à celui du pied de page et de la fiche Google Business
          Profile (§ 6.1) : il vient donc entièrement de site-config. */}
      <section aria-labelledby="coordonnees" className="px-5 py-6 sm:px-10 lg:px-[100px]">
        <h2 id="coordonnees" className="sr-only">
          Coordonnées
        </h2>

        <ul className="grid gap-5 md:grid-cols-3">
          {[
            {
              fond: "bg-peche",
              Icone: IconeTelephone,
              titre: "Téléphone",
              contenu: (
                <>
                  <a
                    href={`tel:${contact.telephoneE164}`}
                    className="mt-2 block text-xl font-bold text-encre"
                  >
                    {contact.telephone}
                  </a>
                  <p className="mt-2 text-sm text-ardoise">
                    Le moyen le plus simple et direct pour me joindre.
                  </p>
                </>
              ),
            },
            {
              fond: "bg-lavande",
              Icone: IconeHorloge,
              titre: "Horaires",
              contenu: (
                <>
                  <p className="mt-2 font-medium text-encre">{horaires.libelle}</p>
                  <p className="mt-2 text-sm text-ardoise">
                    Consultations sur rendez-vous, exclusivement au cabinet.
                  </p>
                </>
              ),
            },
            {
              fond: "bg-menthe",
              Icone: IconeLieu,
              titre: "Cabinet",
              contenu: (
                <>
                  <address className="mt-2 not-italic font-medium text-encre">
                    {adressePostale}
                  </address>
                  <p className="mt-2 text-sm text-ardoise">
                    Tramway {minusculeInitiale(cabinet.acces.tram)}.
                  </p>
                </>
              ),
            },
          ].map(({ fond, Icone, titre, contenu }, i) => (
            <li key={titre} className="h-full">
              <Apparition delai={i * 120} className="h-full">
                <div className={`h-full rounded-[20px] p-7 ${fond}`}>
                  <span className="text-bois-brun" aria-hidden="true">
                    <Icone />
                  </span>
                  <h3 className="mt-3 text-sm font-medium uppercase tracking-wider text-bois">
                    {titre}
                  </h3>
                  {contenu}
                </div>
              </Apparition>
            </li>
          ))}
        </ul>
      </section>

      {/* PAS DE FORMULAIRE ICI — il vit sur /rendez-vous-psychologue-nantes/,
          et là seulement.

          Il y a été mis un temps (demande du 2026-09-08), puis retiré : la
          page affichait un formulaire juste à côté d'un encadré expliquant que
          Vincent ne répond pas par écrit. Ce n'est pas contradictoire — le
          formulaire n'a précisément aucune zone de message — mais cela demande
          au visiteur de tenir deux idées à la fois, à l'endroit même où il
          faudrait le rassurer. */}
      <section
        aria-labelledby="par-formulaire"
        className="mt-8 bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <Apparition>
            <h2 id="par-formulaire" className="text-2xl font-bold text-bois sm:text-[33px]">
              Si vous préférez ne pas téléphoner
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mt-6 text-ardoise">
              Vous pouvez demander à être rappelé en indiquant simplement votre nom, votre
              numéro et vos disponibilités.
            </p>
            <p className="mt-4 text-ardoise">
              Ce formulaire ne contient aucune zone de texte&nbsp;: vous n&rsquo;avez rien à
              rédiger. Je vous recontacte personnellement sur le créneau de votre choix.
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
          </Apparition>

          {/* Explication du champ absent. Sans elle, l'absence de zone de
              message passe pour un oubli — alors que c'est une protection. */}
          <Apparition delai={120}>
            <aside className="rounded-[20px] border border-white bg-white/60 p-7 sm:p-8">
              <h3 className="text-lg font-bold text-bois">
                Ce qui ne se traite pas par écrit
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ardoise">
                Je ne donne pas de consultation, d&rsquo;avis clinique ni d&rsquo;orientation
                détaillée par e-mail. Ce n&rsquo;est pas une question de disponibilité&nbsp;:
                un échange écrit ne permet ni d&rsquo;entendre ce qui se dit entre les mots,
                ni de vous répondre avec la prudence qu&rsquo;exige une situation que je ne
                connais pas.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ardoise">
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
            </aside>
          </Apparition>
        </div>
      </section>

      {/* « CE QUE VOUS POUVEZ ME DEMANDER » A ÉTÉ RETIRÉ LE 2026-09-11, à la
          demande de Vincent, qui demandait s'il servait le référencement. Il
          ne le servait pas : la page se classe sur le nom de Vincent, requête
          de navigation, et ces quatre cartes ne portaient aucune requête. Le
          seul point utile — « vérifier mes titres » — est déjà assuré par la
          ligne ADELI ci-dessous et son lien vers la page auteur. */}
      <section className="px-5 pb-16 pt-14 sm:px-10 sm:pt-16 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <p className="text-center text-ardoise">
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
