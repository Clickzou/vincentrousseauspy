import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { Apparition } from "@/components/ui/Apparition";
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

      {/* EN-TÊTE EN CARTE, comme les trois pages du silo « psy » : bandeau de
          qualification, titre, filet, accroche en police d'accent. Le bandeau
          reprend des faits de `site-config`, jamais recopiés en dur. */}
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
              {`À partir de ${publics.ageMinimum} ans · ${horaires.modalite}`}
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              Les consultations&nbsp;: déroulé, cadre et première séance
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Ce qui freine le plus souvent, ce n&rsquo;est pas le prix&nbsp;: c&rsquo;est
              de ne pas savoir à quoi s&rsquo;attendre. Voici donc, aussi précisément que
              possible, comment les choses se passent au cabinet.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 1. QUI, QUAND ET OÙ — trois cartes de front.

          C'est le titre exact de la page WordPress dont ce contenu provient,
          et les trois questions se répondent : à qui je m'adresse, à quelles
          heures, à quelle adresse. Elles étaient auparavant séparées par cinq
          sections, « Qui je reçois » en tête de page et « Quand et où » tout
          en bas, alors qu'un visiteur qui se demande l'une se demande les
          trois.

          La formulation « toute personne qui le demande, à partir de 18 ans »
          est celle du site actuel. Elle corrige au passage sa contradiction :
          l'ancienne page psychanalyste disait « à partir de 18 ans », l'accueil
          mentionnait les enfants. */}
      {/* Les trois cartes reprennent la triade menthe / pêche / lavande des
          trois portes d'entrée de l'accueil : c'est le même geste — trois
          questions de même rang, distinguées par la couleur et non par la
          hiérarchie. Contrastes déjà vérifiés sur ces fonds dans
          `tailwind.config.ts`. */}
      <section
        aria-labelledby="qui-quand-ou"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="qui-quand-ou"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Qui, quand et où
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>
        </Apparition>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          <li className="h-full">
            <Apparition className="h-full">
              <article className="h-full rounded-[20px] bg-menthe p-7 sm:p-8">
                <h3 className="text-lg font-bold text-bois">Qui je reçois</h3>
                <p className="mt-4 text-ardoise">
                  Je reçois toute personne qui le demande, à partir de{" "}
                  {publics.ageMinimum} ans. Il n&rsquo;y a pas de profil type, ni de degré
                  de souffrance à atteindre pour avoir le droit de consulter. Les motifs
                  étant différents pour chacun, la première rencontre sert précisément à
                  éclaircir la situation —{" "}
                  <Link
                    href="/psychologue-clinicien-nantes/"
                    className="text-terracotta-fonce underline underline-offset-2"
                  >
                    ce qui conduit généralement à consulter
                  </Link>
                  .
                </p>
                <p className="mt-4 text-ardoise">
                  En revanche, je ne reçois ni {publics.nonRecus.join(", ni ")}. Ce
                  n&rsquo;est pas mon champ de pratique, et vous adresser à quelqu&rsquo;un
                  dont c&rsquo;est le travail vous servira mieux. Si vous m&rsquo;appelez
                  dans ce cas, je vous orienterai plutôt que de vous laisser sans réponse.
                </p>
              </article>
            </Apparition>
          </li>

          <li className="h-full">
            <Apparition delai={120} className="h-full">
              <article className="h-full rounded-[20px] bg-peche p-7 sm:p-8">
                <h3 className="text-lg font-bold text-bois">Quand</h3>
                <p className="mt-4 text-ardoise">{horaires.libelle}.</p>
                <p className="mt-3 text-ardoise">{horaires.modalite}.</p>
                <p className="mt-3 text-ardoise">
                  Une séance dure {seance.duree}. Le rythme le plus courant est{" "}
                  {seance.rythmeCourant}, mais il se décide au premier rendez-vous.
                </p>
              </article>
            </Apparition>
          </li>

          <li className="h-full">
            <Apparition delai={240} className="h-full">
              <article className="h-full rounded-[20px] bg-lavande p-7 sm:p-8">
                <h3 className="text-lg font-bold text-bois">Où</h3>
                <address className="mt-4 not-italic text-ardoise">{adressePostale}</address>
                <p className="mt-3 text-ardoise">{cabinet.acces.reperes}.</p>
                <p className="mt-3 text-ardoise">
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
              </article>
            </Apparition>
          </li>
        </ul>
      </section>

      {/* 2. LA PREMIÈRE SÉANCE. L'objet même de la page : c'est cette
          inconnue qui retient les gens d'appeler (§ 9.1). */}
      <section
        aria-labelledby="premiere-seance"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="premiere-seance"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              La première séance
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
            <p className="mt-6 text-ardoise">
              C&rsquo;est avant tout une rencontre. Elle dure {seance.duree}, comme les
              suivantes.
            </p>
          </div>
        </Apparition>

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

        <p className="mx-auto mt-8 max-w-lecture text-center text-sm text-ardoise">
          Vous n&rsquo;avez besoin d&rsquo;aucune ordonnance&nbsp;: la consultation
          d&rsquo;un psychologue est en accès direct, sans passer par votre médecin.
        </p>
      </section>

      {/* 3. LE CADRE. Le mot « cadre » n'est pas décoratif en psychanalyse :
          la régularité et le lieu font partie du travail. */}
      <section aria-labelledby="le-cadre" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="le-cadre"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Le cadre
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>
        </Apparition>

        {/* Colonne de lecture centrée : le titre est centré, le texte reste
            aligné à gauche à l'intérieur. Trois paragraphes centrés ligne à
            ligne obligeraient l'œil à chercher le début de chaque suivante. */}
        <div className="prose-clinique mx-auto mt-8">
          <p className="!mt-0">
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

        <p className="mx-auto mt-8 max-w-lecture text-center text-sm text-ardoise">
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
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="confidentialite"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              La confidentialité
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
            <p className="mt-6 text-ardoise">
              Les psychologues sont tenus au secret professionnel, sans réserve.
              Concrètement, cela veut dire trois choses.
            </p>
          </div>
        </Apparition>

        {/* Trois colonnes plutôt que trois bandes empilées : les points sont
            courts et de même nature, ils se lisent de front. Empilés sur une
            largeur bornée, ils laissaient la moitié droite de la bande vide. */}
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            "Ce qui se dit en séance n'en sort pas.",
            "Le fait même que vous consultiez ne sera communiqué à personne — ni à votre famille, ni à votre employeur, ni à votre médecin sans votre accord.",
            "Cette règle ne connaît que les exceptions prévues par la loi.",
          ].map((point, i) => (
            <li key={point} className="h-full">
              <Apparition delai={i * 120} className="h-full">
                <p className="h-full rounded-[20px] bg-white px-6 py-6 text-ardoise">
                  {point}
                </p>
              </Apparition>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-lecture text-center text-sm text-ardoise">
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

      {/* 5. CONVERSION, puis appareil de notes. Le « Quand et où » qui vivait
          ici est remonté dans le bloc « Qui, quand et où » en tête de page. */}
      <section
        aria-labelledby="prendre-rdv"
        /* `pt-14` : la section précédente est une bande menthe pleine largeur.
           Sans marge haute, la carte pêche venait s'y coller, les deux aplats
           se touchant bord à bord. Les sections qui suivent un fond blanc n'en
           ont pas besoin, le `pb` de la précédente suffit. */
        className="px-5 pb-10 pt-14 sm:px-10 sm:pt-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="prendre-rdv" className="text-2xl font-bold text-bois sm:text-[33px]">
              Prendre rendez-vous
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              Vous n&rsquo;avez pas besoin de savoir quoi dire, ni de préparer quoi que ce
              soit. Un premier échange de quelques minutes suffit à fixer une séance.
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
              <p className="mt-5 text-sm">
                <Link
                  href="/aide-faq/"
                  className="text-terracotta-fonce underline underline-offset-2"
                >
                  Autres questions fréquentes
                </Link>
              </p>
            </div>
          </div>
        </Apparition>
      </section>

      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <UrgenceBanner />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
