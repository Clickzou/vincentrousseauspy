import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import {
  adressePostale,
  cabinet,
  contact,
  honoraires,
  horaires,
  praticien,
  publics,
  seance,
} from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * /consultations/ — PAGE NOUVELLE (SEO_MASTER § 3.2, silo 4).
 *
 * Rôle : lever les freins concrets. Qui je reçois, comment se passe la
 * première fois, dans quel cadre, à quel rythme, et sous quelle
 * confidentialité.
 *
 * Cette page RÉCUPÈRE le « Qui, quand et où ? » qui occupait à tort
 * /psychanalyste-nantes/ — ces informations étaient exactes, elles étaient
 * simplement sur l'URL d'un autre sujet (cf. POINT-ETAPE § 6).
 *
 * ⚠️ PAS DE BLOC FAQ ICI, et pas de schéma `FAQPage` : il est déclaré sur
 * /aide-faq/ et nulle part ailleurs. Plusieurs sujets de cette page sont
 * traités en question/réponse là-bas — c'est voulu, les deux formats se
 * complètent. Ce qui les mettrait en concurrence, c'est de dupliquer le
 * format, pas le sujet.
 *
 * PAS de sous-pages par public : Vincent ne reçoit que des adultes. Les
 * pages /consultations/adolescent/ et /consultations/couple/ du brouillon du
 * master sont supprimées (docs/donnees-vincent.md § 5).
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1) — en particulier
 * la durée de séance, qui n'est aujourd'hui sourcée nulle part.
 */

const TITRE = "Les consultations";
const MODIFIE_LE = "2026-09-08";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Comment se déroule une consultation chez ${praticien.nom}, ` +
    `${minusculeInitiale(praticien.titreCourt)} à ${cabinet.ville} : première séance, ` +
    `cadre, rythme, confidentialité. Adultes uniquement, ${minusculeInitiale(horaires.libelle)}.`,
  alternates: { canonical: canonical("consultations") },
  openGraph: { title: `${TITRE} — ${praticien.nom}`, url: canonical("consultations") },
};

/**
 * Le déroulé d'une première séance, en trois temps. Repris de la formulation
 * de Vincent sur le site actuel : « la première rencontre est l'occasion
 * d'éclaircir ensemble la situation et de déterminer la manière dont nous
 * procèderons ».
 */
const PREMIERE_SEANCE = [
  {
    temps: "Vous racontez ce qui vous amène",
    texte:
      "Comme vous le pouvez, dans l'ordre que vous voulez. Vous n'avez rien à préparer, " +
      "et vous n'êtes pas obligé de savoir quoi dire : c'est aussi mon travail de vous " +
      "aider à le formuler.",
  },
  {
    temps: "Nous éclaircissons la situation ensemble",
    texte:
      "Je pose des questions, je reformule. L'objectif n'est pas de poser une étiquette, " +
      "mais de comprendre ce qui fait difficulté et depuis quand.",
  },
  {
    temps: "Nous décidons de la suite",
    texte:
      "S'il y a lieu de travailler ensemble, nous convenons d'un rythme. Sinon, je vous " +
      "oriente vers le professionnel indiqué. Rien ne vous engage au-delà de cette séance.",
  },
];

export default function Consultations() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "consultations" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre="Les consultations : déroulé, cadre et première séance"
        chapeau={
          `Ce qui freine le plus souvent, ce n'est pas le prix : c'est de ne pas savoir ` +
          `à quoi s'attendre. Voici donc, aussi précisément que possible, comment les ` +
          `choses se passent au cabinet.`
        }
      />

      {/* 1. QUI. Reprend la formulation exacte du site actuel, en corrigeant
          la contradiction : l'ancienne page psychanalyste disait « toute
          personne à partir de 18 ans », l'accueil ajoutait les enfants. */}
      <section aria-labelledby="qui" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <h2 id="qui" className="text-2xl font-bold text-bois sm:text-[33px]">
          Qui je reçois
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Je reçois toute personne qui le demande, à partir de {publics.ageMinimum} ans.
            Il n&rsquo;y a pas de profil type, ni de degré de souffrance à atteindre pour
            avoir le droit de consulter. Les motifs étant différents pour chacun, la
            première rencontre sert précisément à éclaircir la situation —{" "}
            <Link href="/psychologue-clinicien-nantes/">
              ce qui conduit généralement à consulter
            </Link>
            .
          </p>
          <p>
            En revanche, je ne reçois ni {publics.nonRecus.join(", ni ")}. Ce n&rsquo;est
            pas mon champ de pratique, et vous adresser à quelqu&rsquo;un dont c&rsquo;est
            le travail vous servira mieux. Si vous m&rsquo;appelez dans ce cas, je vous
            orienterai plutôt que de vous laisser sans réponse.
          </p>
        </div>
      </section>

      {/* 2. LA PREMIÈRE SÉANCE. L'objet même de la page : c'est cette
          inconnue qui retient les gens d'appeler (§ 9.1). */}
      <section
        aria-labelledby="premiere-seance"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="premiere-seance" className="text-2xl font-bold text-bois sm:text-[33px]">
          La première séance
        </h2>
        <p className="mt-4 max-w-lecture text-ardoise">
          C&rsquo;est avant tout une rencontre. Elle dure {seance.duree}, comme les
          suivantes.
        </p>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {PREMIERE_SEANCE.map((etape, i) => (
            <li key={etape.temps} className="rounded-[20px] bg-white p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-peche font-bold text-bois"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-encre">{etape.temps}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ardoise">{etape.texte}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-lecture text-sm text-ardoise">
          Vous n&rsquo;avez besoin d&rsquo;aucune ordonnance&nbsp;: la consultation
          d&rsquo;un psychologue est en accès direct, sans passer par votre médecin.
        </p>
      </section>

      {/* 3. LE CADRE. Le mot « cadre » n'est pas décoratif en psychanalyse :
          la régularité et le lieu font partie du travail. */}
      <section aria-labelledby="le-cadre" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="le-cadre" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le cadre
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Le cadre — un même lieu, un même horaire, une régularité — n&rsquo;est pas une
            contrainte administrative&nbsp;: c&rsquo;est ce qui rend le travail possible.
            C&rsquo;est parce que quelque chose se répète à l&rsquo;identique que le reste
            peut se déplacer.
          </p>
          <p>
            La fréquence se décide au premier rendez-vous. Le rythme le plus courant est{" "}
            {seance.rythmeCourant}, mais il se discute et se réévalue. La durée totale du
            travail, elle, ne se fixe pas d&rsquo;avance&nbsp;: elle varie d&rsquo;une
            personne à l&rsquo;autre, et vous restez libre d&rsquo;interrompre.
          </p>
          <p>
            Les séances ont lieu au cabinet, en présentiel uniquement&nbsp;: je ne propose
            pas de consultation en visioconférence.
          </p>
        </div>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { terme: "Durée d'une séance", detail: seance.duree },
            { terme: "Rythme le plus courant", detail: seance.rythmeCourant },
            {
              terme: "Honoraires",
              detail: `De ${honoraires.min} à ${honoraires.max} €. ${honoraires.modulation}`,
            },
            { terme: "Modalité", detail: horaires.modalite },
          ].map((item) => (
            <div key={item.terme} className="rounded-[20px] bg-lin p-6">
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
                {item.terme}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ardoise">{item.detail}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-lecture text-sm text-ardoise">
          <Link
            href="/tarifs-et-remboursement/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            Le détail des tarifs et des remboursements
          </Link>{" "}
          — dont ce que prennent en charge les mutuelles, et ce que ne prend pas en charge
          l&rsquo;Assurance maladie.
        </p>
      </section>

      {/* 4. CONFIDENTIALITÉ. Formulée par ses conséquences concrètes : dire
          « secret professionnel » ne rassure personne qui ne sait pas ce que
          cela recouvre. */}
      <section
        aria-labelledby="confidentialite"
        className="bg-menthe px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="confidentialite" className="text-2xl font-bold text-bois sm:text-[33px]">
          La confidentialité
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Les psychologues sont tenus au secret professionnel, sans réserve. Concrètement,
            cela veut dire trois choses.
          </p>
        </div>

        <ul className="mt-6 grid max-w-4xl gap-4">
          {[
            "Ce qui se dit en séance n'en sort pas.",
            "Le fait même que vous consultiez ne sera communiqué à personne — ni à votre famille, ni à votre employeur, ni à votre médecin sans votre accord.",
            "Cette règle ne connaît que les exceptions prévues par la loi.",
          ].map((point) => (
            <li key={point} className="rounded-[20px] bg-white/70 px-6 py-5 text-ardoise">
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-lecture text-sm text-ardoise">
          C&rsquo;est aussi la raison pour laquelle le formulaire de ce site ne comporte
          aucune zone de message&nbsp;:{" "}
          <Link
            href="/politique-de-confidentialite/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            ce que vous traversez n&rsquo;a pas à transiter par un serveur
          </Link>
          .
        </p>
      </section>

      {/* 5. QUAND ET OÙ. C'est le « Qui, quand et où ? » récupéré de
          l'ancienne page psychanalyste. Le détail de l'accès reste à
          /cabinet-nantes/, dont c'est le sujet. */}
      <section aria-labelledby="quand-ou" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="quand-ou" className="text-2xl font-bold text-bois sm:text-[33px]">
          Quand et où
        </h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div className="rounded-[20px] border border-sable p-6 sm:p-8">
            <h3 className="font-bold text-encre">Quand</h3>
            <p className="mt-3 text-ardoise">{horaires.libelle}.</p>
            <p className="mt-2 text-ardoise">{horaires.modalite}.</p>
          </div>

          <div className="rounded-[20px] border border-sable p-6 sm:p-8">
            <h3 className="font-bold text-encre">Où</h3>
            <address className="mt-3 not-italic text-ardoise">{adressePostale}</address>
            <p className="mt-2 text-ardoise">{cabinet.acces.reperes}.</p>
            <p className="mt-2 text-ardoise">
              {cabinet.acces.tram}. {cabinet.acces.stationnement}.
            </p>
            <p className="mt-4 text-sm">
              <Link
                href="/cabinet-nantes/"
                className="text-terracotta-fonce underline underline-offset-2"
              >
                Comment venir au cabinet
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
          <Link
            href="/aide-faq/"
            className="text-sm text-terracotta-fonce underline underline-offset-2"
          >
            Autres questions fréquentes
          </Link>
        </div>

        <div className="mt-12 max-w-lecture">
          <UrgenceBanner />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
