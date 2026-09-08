import type { Metadata } from "next";
import Link from "next/link";

import { FormulaireRappel } from "./FormulaireRappel";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { PageEnTete } from "@/components/ui/PageEnTete";
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

      <PageEnTete
        titre="Prendre rendez-vous avec un psychologue à Nantes"
        chapeau={
          `Le plus simple est de m'appeler : nous fixons un horaire en quelques minutes. ` +
          `Si vous préférez ne pas téléphoner, vous pouvez demander à être rappelé — ` +
          `je réponds ${priseRdv.delaiReponse}.`
        }
      />

      {/* CANAL 1 — le téléphone. Volontairement le premier bloc de la page,
          en clair et cliquable : c'est le canal prioritaire du § 9.3. */}
      <section aria-labelledby="par-telephone" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <div className="rounded-[20px] bg-peche px-6 py-10 sm:px-12">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <h2 id="par-telephone" className="text-2xl font-bold text-bois">
                Par téléphone
              </h2>
              <p className="mt-3 max-w-lecture text-ardoise">
                Si je ne réponds pas, c&rsquo;est que je suis en séance. Laissez votre
                numéro sur la messagerie&nbsp;: je rappelle systématiquement.
              </p>
            </div>
            <a
              href={`tel:${contact.telephoneE164}`}
              className="inline-flex items-center gap-4 rounded-full bg-white px-8 py-5 text-2xl font-bold tracking-tight text-encre sm:text-3xl"
            >
              <IconeTelephone />
              {contact.telephone}
            </a>
          </div>

          {/* Pastilles blanches, et non le composant `Pastille` : celui-ci a un
              fond peche, invisible sur une carte peche. */}
          <ul className="mt-8 grid gap-4 border-t border-white/70 pt-6 text-sm text-ardoise sm:grid-cols-3">
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
      </section>

      {/* CANAL 2 — plateforme hébergée HDS. Le bloc n'apparaît que si elle
          existe : `priseRdv.plateforme` est `null` aujourd'hui. */}
      {priseRdv.plateforme && (
        <section aria-labelledby="en-ligne" className="px-5 py-4 sm:px-10 lg:px-[100px]">
          <div className="rounded-[20px] border border-sable px-6 py-8 sm:px-12">
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

      {/* CANAL 3 — le formulaire. */}
      <section
        aria-labelledby="par-formulaire"
        className="bg-lavande px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <h2 id="par-formulaire" className="text-2xl font-bold text-bois sm:text-[33px]">
              Demander à être rappelé
            </h2>
            <p className="mt-3 max-w-lecture text-ardoise">
              Trois informations suffisent&nbsp;: comment vous appeler, à quel numéro, et
              quand. {priseRdv.suite}
            </p>

            <div className="mt-8 rounded-[20px] bg-white/70 p-6 sm:p-10">
              <FormulaireRappel />
            </div>
          </div>

          {/* Explication du champ absent. Sans elle, l'absence de zone de
              message passe pour un oubli — alors que c'est une protection. */}
          <aside className="lg:pt-16">
            <div className="rounded-[20px] border border-white bg-white/60 p-6">
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
          </aside>
        </div>
      </section>

      <section aria-labelledby="la-suite" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="la-suite" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce qui se passe ensuite
        </h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {ETAPES.map((etape, i) => (
            <li key={etape.titre}>
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-menthe font-bold text-bois"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-encre">{etape.titre}</h3>
              <p className="mt-2 text-ardoise">{etape.texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 max-w-lecture text-sm text-ardoise">
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
