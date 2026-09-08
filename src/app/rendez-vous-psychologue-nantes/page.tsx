import type { Metadata } from "next";
import Link from "next/link";

import { FormulaireRappel } from "@/components/formulaire/FormulaireRappel";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { Apparition } from "@/components/ui/Apparition";
import {
  IconeDocument,
  IconeHorloge,
  IconeLieu,
  IconeTelephone,
} from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import {
  adressePostale,
  cabinet,
  contact,
  honoraires,
  horaires,
  praticien,
  priseRdv,
  publics,
} from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * /rendez-vous-psychologue-nantes/ — URL CONSERVÉE (SEO_MASTER § 10.2).
 *
 * Page de conversion principale : six boutons du site y renvoient. Deux
 * règles la gouvernent.
 *
 * 1. **L'ordre des canaux est celui du § 9.3** — téléphone d'abord, plateforme
 *    hébergée HDS ensuite (le jour où Vincent en ouvre une), formulaire en
 *    dernier. Le téléphone reste le canal préféré d'une grande partie du
 *    public, et c'est le seul qui ne fasse transiter aucune donnée par le site.
 *
 * 2. **Aucune pression** (§ 9.2). Pas de compte à rebours, pas de « places
 *    limitées », pas de fenêtre d'intention de sortie. Le frein n'est pas le
 *    prix : c'est l'appréhension du premier contact. Tout ce qui est écrit ici
 *    vise à la réduire, à commencer par le fait de dire qu'on n'est pas obligé
 *    de savoir quoi dire.
 */

const TITRE = "Prendre rendez-vous";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Prendre rendez-vous avec ${praticien.nom}, ${minusculeInitiale(praticien.titreCourt)} ` +
    `à ${cabinet.ville}. Par téléphone au ${contact.telephone} ou par demande de rappel. ` +
    `Consultations pour adultes, ${minusculeInitiale(horaires.libelle)}.`,
  alternates: { canonical: canonical("rendez-vous-psychologue-nantes") },
  openGraph: {
    title: `${TITRE} — ${praticien.nom}, psychologue à ${cabinet.ville}`,
    url: canonical("rendez-vous-psychologue-nantes"),
  },
};

/** Ce qui se passe concrètement après le premier contact (§ 9.4). */
const ETAPES = [
  {
    titre: "Vous prenez contact",
    texte:
      "Par téléphone, ou en demandant à être rappelé. Vous n'avez rien à préparer, " +
      "et vous n'êtes pas obligé de savoir quoi dire.",
  },
  {
    titre: "Nous convenons d'un horaire",
    texte:
      "Un échange de quelques minutes suffit à fixer une première séance et à " +
      "répondre à vos questions pratiques.",
  },
  {
    titre: "Nous nous rencontrons au cabinet",
    texte:
      "La première séance sert à faire connaissance et à voir ensemble si un " +
      "travail est indiqué. Elle ne vous engage pas au-delà.",
  },
];

export default function RendezVous() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "rendez-vous-psychologue-nantes" },
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
          <div className="mx-auto mt-8 max-w-6xl rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              {`${horaires.libelle} · Réponse ${priseRdv.delaiReponse}`}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {`Prendre rendez-vous avec un psychologue à ${cabinet.ville}`}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Le plus simple est de m&rsquo;appeler&nbsp;: nous fixons un horaire en quelques
              minutes. Si vous préférez ne pas téléphoner, vous pouvez demander à être
              rappelé — je réponds {priseRdv.delaiReponse}.
            </p>
          </div>
        </Apparition>
      </section>

      {/* LES DEUX CANAUX DE FRONT, sur toute la largeur de la page.

          À gauche, le téléphone — canal prioritaire du § 9.3 — et, sous lui,
          l'explication de l'absence de zone de message. À droite, le
          formulaire. Les deux étaient auparavant empilés sur trois écrans
          successifs : le visiteur devait faire défiler pour découvrir qu'une
          alternative existait.

          La colonne de gauche est la plus étroite, mais elle porte le canal
          qu'on veut privilégier : c'est sa position — en tête, à gauche, avec
          le numéro en gros — qui le désigne, pas sa surface. */}
      <section
        aria-labelledby="canaux"
        className="mt-6 bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="canaux" className="sr-only">
          Comment me joindre
        </h2>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-6 lg:col-span-5">
            <Apparition>
              <div className="rounded-[20px] bg-peche p-7 sm:p-9">
                <h3 id="par-telephone" className="text-2xl font-bold text-bois">
                  Par téléphone
                </h3>
                <p className="mt-3 text-ardoise">
                  Si je ne réponds pas, c&rsquo;est que je suis en séance. Laissez votre
                  numéro sur la messagerie&nbsp;: je rappelle systématiquement.
                </p>

                <p className="mt-6">
                  <a
                    href={`tel:${contact.telephoneE164}`}
                    className="inline-flex items-center gap-4 rounded-full bg-white px-8 py-5 text-2xl font-bold tracking-tight text-encre sm:text-3xl"
                  >
                    <IconeTelephone />
                    {contact.telephone}
                  </a>
                </p>

                {/* Corps courant et non `text-sm` : ce sont les trois
                    informations qu'on cherche avant d'appeler — quand, où,
                    combien. Pastilles blanches, et non le composant
                    `Pastille` : celui-ci a un fond pêche, invisible ici. */}
                <ul className="mt-8 space-y-4 border-t border-white/70 pt-7 text-encre">
                  {[
                    { icone: <IconeHorloge />, texte: horaires.libelle },
                    { icone: <IconeLieu />, texte: adressePostale },
                    {
                      icone: <IconeDocument className="h-5 w-5" />,
                      texte: `${honoraires.min} à ${honoraires.max} € la séance`,
                    },
                  ].map((info) => (
                    <li key={info.texte} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-bois-brun"
                      >
                        {info.icone}
                      </span>
                      <span>{info.texte}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Apparition>

            {/* Explication du champ absent. Sans elle, l'absence de zone de
                message passe pour un oubli — alors que c'est une protection. */}
            <Apparition delai={120}>
              <div className="rounded-[20px] border border-sable bg-white p-7 sm:p-9">
                <h3 className="text-lg font-bold text-bois">
                  Pourquoi n&rsquo;y a-t-il pas de zone de message&nbsp;?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ardoise">
                  Ce que vous traversez relève du secret professionnel. Écrit dans un
                  formulaire, il transiterait par un serveur et une boîte mail, qui ne sont
                  pas prévus pour recevoir des informations de santé.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ardoise">
                  Ce site ne vous demande donc rien de votre situation, et n&rsquo;enregistre
                  aucune de ces demandes&nbsp;: elles sont transmises par e-mail, puis
                  disparaissent du site. Nous en parlerons de vive voix.
                </p>
                <p className="mt-4 text-sm">
                  <Link
                    href="/politique-de-confidentialite/"
                    className="text-terracotta-fonce underline underline-offset-2"
                  >
                    Comment vos données sont traitées
                  </Link>
                </p>
              </div>
            </Apparition>
          </div>

          {/* CANAL 3 — le formulaire. */}
          <Apparition delai={60} className="lg:col-span-7">
            <div className="rounded-[20px] bg-white p-7 sm:p-9 lg:p-10">
              <h3 id="par-formulaire" className="text-2xl font-bold text-bois sm:text-[33px]">
                Demander à être rappelé
              </h3>
              <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

              <p className="mt-6 text-ardoise">
                Trois informations suffisent&nbsp;: comment vous appeler, à quel numéro, et
                quand. {priseRdv.suite}
              </p>

              <div className="mt-8">
                <FormulaireRappel />
              </div>
            </div>
          </Apparition>
        </div>
      </section>

      {/* CANAL 2 — plateforme hébergée HDS. Le bloc n'apparaît que si elle
          existe : `priseRdv.plateforme` est `null` aujourd'hui. */}
      {priseRdv.plateforme && (
        <section aria-labelledby="en-ligne" className="px-5 py-10 sm:px-10 lg:px-[100px]">
          <div className="mx-auto max-w-6xl rounded-[20px] border border-sable px-6 py-8 sm:px-12">
            <h2 id="en-ligne" className="text-2xl font-bold text-bois">
              En ligne
            </h2>
            <p className="mt-3 max-w-lecture text-ardoise">
              Vous pouvez consulter mes disponibilités et réserver directement sur{" "}
              {priseRdv.plateforme.nom}.
            </p>
            <a
              href={priseRdv.plateforme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
            >
              Voir les créneaux disponibles
            </a>
          </div>
        </section>
      )}

      <section aria-labelledby="la-suite" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="la-suite"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce qui se passe ensuite
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>
        </Apparition>

        {/* Trois étapes en cartes, et non en simple liste : le numéro flottait
            au-dessus d'un texte sans cadre, et rien ne rattachait visuellement
            les trois moments les uns aux autres. La pastille passe en médaillon
            blanc sur fond menthe — elle se lit comme une étape, pas comme une
            puce décorative. */}
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {ETAPES.map((etape, i) => (
            <li key={etape.titre} className="h-full">
              <Apparition delai={i * 120} className="h-full">
                <div className="flex h-full flex-col rounded-[20px] bg-menthe p-7 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-bois"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-encre">{etape.titre}</h3>
                  <p className="mt-3 text-ardoise">{etape.texte}</p>
                </div>
              </Apparition>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-12 max-w-lecture text-center text-sm text-ardoise">
          <p>
            Je m&rsquo;adresse uniquement {publics.libelle}. Je reçois sur rendez-vous au
            cabinet et je ne
            propose pas de consultation à distance. {honoraires.modulation}{" "}
            <Link
              href="/tarifs-et-remboursement/"
              className="text-terracotta-fonce underline underline-offset-2"
            >
              Voir les tarifs et le remboursement
            </Link>
            .
          </p>
          <p className="mt-3">
            {praticien.nom} — {praticien.titreCourt}. Numéro ADELI {praticien.adeli}. Les
            séances, comme ce premier contact, sont couvertes par le secret professionnel.
          </p>
          <UrgenceBanner />
        </div>
      </section>
    </>
  );
}
