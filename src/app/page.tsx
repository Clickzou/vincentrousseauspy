import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  IconeAffiliation,
  IconeAmpoule,
  IconeAtteste,
  IconeDestination,
  IconeDialogue,
  IconeDiplome,
  IconeDocument,
  IconeInstitution,
  IconeLienExterne,
  IconeValidation,
} from "@/components/ui/Icones";
import { Apparition } from "@/components/ui/Apparition";
import { Bouton } from "@/components/ui/Bouton";
import { FaqAccordeon } from "@/components/ui/FaqAccordeon";
import { HeroCarrousel } from "@/components/ui/HeroCarrousel";
import { PlanCabinet } from "@/components/ui/PlanCabinet";
import { Section } from "@/components/ui/Section";
import { QUESTIONS_ACCUEIL } from "@/lib/content/faq";
import { OEUVRES_ACCUEIL } from "@/lib/content/oeuvres";
import {
  adressePostale,
  cabinet,
  contact,
  honoraires,
  horaires,
  praticien,
  publics,
} from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * ACCUEIL — v2.
 *
 * Identité visuelle et palette conservées (décision du 2026-09-07) ; l'ordre et
 * la densité des blocs sont retravaillés. Trois changements par rapport au site
 * actuel :
 *
 *  1. Les titres professionnels et le n° ADELI remontent en position 2 (ils
 *     étaient en 6e position, très bas). En YMYL santé, la preuve de compétence
 *     est le premier signal attendu — SEO_MASTER § 2.1.
 *  2. « La psychanalyse en détails » (texte théorique dense, 3e position
 *     aujourd'hui) part sur /psychanalyste-nantes/. Un visiteur en souffrance
 *     n'a pas besoin de métapsychologie au 3e écran ; il a besoin de savoir
 *     s'il est au bon endroit.
 *  3. Les informations pratiques (où, quand, combien) étaient dispersées entre
 *     un encart, la FAQ et le pied de page. Elles sont regroupées en un bloc.
 *
 * Cible : « psychologue nantes ». Volume 2 100 (Sistrix) à 5 400 (agence),
 * position 3 à 5 selon la source — cf. docs/seo/audit-positions-2026-09-08.md
 * § 5.1. Aucun chiffre absolu n'est fiable ici ; l'ordre relatif, oui : c'est
 * le premier mot-clé du site, et il porte 49 % des clics mesurés.
 * Cette page NE porte PAS le cluster « psychothérapeute » : il a sa page dédiée
 * (§ 4, silo 3 — règle de cloisonnement d'intention).
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1).
 */

/**
 * Les trois titres de Vincent. `mention` distingue les deux titres protégés
 * par la loi du titre de psychanalyste, qui ne l'est pas : le master interdit
 * de laisser croire à une protection qui n'existe pas (§ 2.2).
 */
/*
 * `lien` applique la règle de cloisonnement d'intention (§ 4, silo 3) : chaque
 * titre renvoie à SA page. Le premier n'en a pas — c'est cette page-ci qui
 * porte le cluster « psychologue ».
 */
/* Textes révisés par Vincent le 2026-09-10. Deux changements de fond : le
   premier titre nomme désormais le répertoire (Adeli) — un fait vérifiable
   vaut mieux qu'une périphrase sur un site YMYL — et il porte enfin un lien
   vers sa page, comme les deux autres. Le renvoi va vers
   /psychologue-clinicien-nantes/, dont c'est le sujet : la règle de
   cloisonnement (§ 4, silo 3) n'interdit pas de lier, elle interdit de traiter
   deux fois le même cluster sur deux URLs. */
const TITRES = [
  {
    nom: "Psychologue clinicien",
    mention: "Titre protégé",
    protege: true,
    lien: { href: "/psychologue-clinicien-nantes/", libelle: "Le psychologue clinicien" },
    texte:
      "Ce titre universitaire protégé permet mon inscription au répertoire national des " +
      "professionnels de santé (Adeli). Il atteste d'une compétence reconnue en " +
      "psychopathologie et d'une écoute formée à la singularité de chaque histoire.",
  },
  {
    nom: "Psychothérapeute",
    mention: "Titre protégé depuis 2010",
    protege: true,
    lien: { href: "/psychotherapeute-nantes/", libelle: "La psychothérapie" },
    texte:
      "Il correspond à une compétence réglementée dans le soin psychique. Ce titre se " +
      "distingue de celui de psychopraticien, qui est librement utilisable mais non " +
      "reconnu par l'État.",
  },
  {
    nom: "Psychanalyste",
    mention: "Méthode de travail",
    protege: false,
    lien: { href: "/psychanalyste-nantes/", libelle: "La psychanalyse" },
    texte:
      "Il indique la méthode que j'emploie au quotidien dans mon cabinet. La psychanalyse " +
      "est la forme la plus classique des thérapies dites « de fond », par opposition aux " +
      "approches brèves.",
  },
];

/**
 * Ressources téléchargeables. Les chemins reproduisent EXACTEMENT ceux du site
 * WordPress (`public/wp-content/uploads/...`) : si ces PDF reçoivent des liens
 * entrants ou sont indexés, la refonte ne casse rien (SEO_MASTER § 10.2).
 */
/**
 * Motifs en étiquettes : le visiteur doit se reconnaître d'un coup d'œil.
 *
 * Liste étendue de 12 à 24 entrées par Vincent le 2026-09-10. L'ajout n'est pas
 * du remplissage : les douze nouveaux motifs sont des situations (conflits,
 * séparation, burn-out, transitions de vie) là où les douze premiers étaient
 * surtout des symptômes. Ce sont ces mots-là que les gens tapent, et dans
 * lesquels ils se reconnaissent avant de savoir nommer un trouble.
 *
 * ⚠️ « Difficultés de couple ou séparation » désigne bien un travail
 * INDIVIDUEL sur ce que l'on traverse. Vincent ne reçoit pas les couples : ne
 * jamais en faire une entrée de thérapie de couple ailleurs sur le site.
 */
const MOTIFS = [
  "Anxiété",
  "Conflits familiaux",
  "Symptômes dépressifs",
  "Répétitions de scénarios de vie",
  "Troubles du sommeil",
  "Perte de sens",
  "Phobies",
  "Difficultés de couple ou séparation",
  "Mal-être diffus",
  "Épuisement professionnel (burn-out)",
  "Troubles alimentaires",
  "Sentiment de stagnation",
  "Confiance en soi",
  "Douleurs ou symptômes corporels inexpliqués",
  "Stress",
  "Rapports de force au travail",
  "Traumatismes ou chocs de vie",
  "Dépendance affective",
  "Transitions de vie (parentalité, retraite…)",
  "Troubles obsessionnels",
  "Isolement ou solitude",
  "Addictions",
  "Gestion des émotions",
  "Deuil",
];

/**
 * Déroulé en trois temps, à la place de trois paragraphes de prose.
 * Textes révisés par Vincent le 2026-09-10 : la gratuité de la première
 * rencontre y apparaît, et la restriction d'âge remonte en tête de carte au
 * lieu d'être reléguée dans la troisième étape.
 */
const ETAPES = [
  {
    titre: "Le premier contact",
    texte:
      "Un échange téléphonique pour convenir d'un rendez-vous. Vous n'avez pas à exposer " +
      "votre situation à ce moment-là.",
  },
  {
    titre: "La première rencontre",
    texte:
      "Cette séance est gratuite. Elle permet de faire le point sur votre démarche et vos " +
      "attentes, sans aucun engagement pour la suite.",
  },
  {
    titre: "Le suivi",
    texte:
      "Si nous choisissons de poursuivre, nous définissons ensemble le rythme et les " +
      "modalités des séances.",
  },
];

const RESSOURCES = [
  {
    titre: "L'efficacité de la psychanalyse",
    detail: "Étude de Visentini · PDF, 1,4 Mo",
    href: "/wp-content/uploads/2023/11/20-04-efficacite_psychanalyse_Visentini.pdf",
  },
  {
    titre: "24 questions sur la psychanalyse",
    detail: "PDF, 154 Ko",
    href: "/wp-content/uploads/2023/11/24-questions-sur-la-psychanalyse.pdf",
  },
];

/**
 * Liens externes d'autorité. Obligatoires en YMYL : un contenu de santé sans
 * référence vérifiable est disqualifié (SEO_MASTER § 5). `rel="noopener
 * noreferrer"` et `target="_blank"` sont imposés par la même règle.
 */
const LIENS_UTILES = [
  {
    titre: "Code de déontologie des psychologues",
    detail: "Le texte de référence de la profession",
    /* L'URL héritée du site WordPress (/LE-CODE.html) répond 404 : le site a
       été refait, et le lien pointait dans le vide depuis. Vérifié le
       2026-09-08. Un lien mort dans un bloc « sources d'autorité » dessert
       exactement ce qu'il est censé établir. */
    href: "https://www.codededeontologiedespsychologues.fr/codes-de-deontologie/",
  },
  {
    titre: "Syndicat National des Psychologues",
    detail: "psychologues.org",
    href: "https://psychologues.org/",
  },
];

export const metadata: Metadata = {
  title: `Psychologue à ${cabinet.ville} — ${praticien.nom}`,
  description:
    `${praticien.titreCourt} à ${cabinet.ville}. Consultations pour adultes sur rendez-vous, ` +
    `${horaires.libelle.toLowerCase()}. Première séance gratuite, puis de ${honoraires.min} ` +
    `à ${honoraires.max} € la séance.`,
  alternates: { canonical: canonical("/") },
};

export default function Accueil() {
  return (
    <>
      {/* Pas de schéma FAQPage ici : il est déclaré sur /aide-faq/, où les
          réponses sont complètes. En publier deux enverrait à Google deux
          blocs FAQ concurrents pour le même site (§ 7.2). */}
      {/* ---------------------------------------------------------------- 1
          HERO — plein cadre, l'oeuvre reste lisible.

          Le site d'origine n'assombrit PAS le tableau : la lisibilite du texte
          blanc vient d'un `text-shadow: 0 0 10px rgba(0,0,0,0.73)`. Un voile
          opaque etoufferait l'oeuvre, qui est justement l'identite du site.
          On ajoute seulement un degrade directionnel, present la ou le texte
          se pose (bas-gauche) et transparent ailleurs.

          VISUEL : le Chagall du site actuel est protege jusqu'en 2056 et son
          fichier porte un filigrane « WahooArt.com ». Remplace ici par un
          Matisse, domaine public depuis le 1er janvier 2025.
          Cf. docs/donnees-vincent.md § 11. */}
      <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
        <HeroCarrousel oeuvres={OEUVRES_ACCUEIL} />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-tr from-black/60 via-black/25 to-transparent"
        />

        <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-32">
          <p className="ombre-hero font-signature text-5xl text-white sm:text-6xl">
            {praticien.nom}
          </p>
          <h1 className="ombre-hero mt-1 text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[66px]">
            Psychologue à {cabinet.ville}
          </h1>
          <p className="ombre-hero mt-5 max-w-xl text-lg text-white">
            {praticien.titres.join(" · ")}. Je reçois en consultation, sur rendez-vous, tout
            public adulte qui en fait la demande, dans mon cabinet situé au {adressePostale}.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/rendez-vous-psychologue-nantes/"
              className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
            >
              Prendre rendez-vous
            </Link>
            <a
              href={`tel:${contact.telephoneE164}`}
              className="rounded-full bg-white/95 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
            >
              {contact.telephone}
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 2
          TROIS PORTES D'ENTRÉE.

          Le bloc en trois cartes colorées est repris du site d'origine : c'est
          un élément d'identité. Ce qui change, c'est la DENSITÉ. Trois pavés de
          prose de même facture donnaient trois murs de texte à l'endroit précis
          où le visiteur cherche à s'orienter en quelques secondes.

          Chaque carte a désormais sa propre structure interne — étiquettes de
          motifs, séquence numérotée, liste de faits pratiques — au lieu de trois
          blocs de paragraphes interchangeables. Et chacune ouvre sur une page
          plus complète : ce sont des portes, pas des exposés. */}
      <section
        aria-labelledby="portes-titre"
        className="px-5 py-10 sm:px-10 lg:px-[100px]"
      >
        <h2 id="portes-titre" className="sr-only">
          En quelques mots
        </h2>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {/* --- 1. Motifs en étiquettes plutôt qu'en énumération : le visiteur
                  doit se reconnaître d'un coup d'œil. --- */}
          <Apparition className="h-full">
            <article className="flex h-full flex-col rounded-[20px] bg-menthe p-8 sm:p-9">
              <span className="text-bois-brun" aria-hidden="true">
                <IconeDialogue />
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-bois">
                Ce qui amène à consulter
              </h3>
              <p className="mt-4 text-ardoise">
                Chaque démarche est unique. Il n&rsquo;y a pas de profil-type, ni de
                situation qui mériterait plus qu&rsquo;une autre d&rsquo;être entendue.
              </p>
              <p className="mt-3 text-ardoise">
                Voici quelques motifs fréquents qui peuvent marquer le point de départ
                d&rsquo;un travail&nbsp;:
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {MOTIFS.map((m) => (
                  <li
                    key={m}
                    className="rounded-full bg-white/70 px-3 py-1.5 text-sm text-ardoise"
                  >
                    {m}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 text-sm italic text-ardoise">
                Cette liste n&rsquo;est pas un questionnaire à cocher. Le simple fait de
                vous interroger suffit pour venir en parler.
              </p>
              <p className="pt-4">
                <Link
                  href="/psychologue-clinicien-nantes/"
                  className="group inline-flex items-center gap-2 font-medium text-terracotta-fonce underline underline-offset-4"
                >
                  Pourquoi consulter&nbsp;?
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </p>
            </article>
          </Apparition>

          {/* --- 2. Déroulé : une séquence numérotée, pas trois paragraphes. --- */}
          <Apparition delai={120} className="h-full">
            <article className="flex h-full flex-col rounded-[20px] bg-peche p-8 sm:p-9">
              <span className="text-bois-brun" aria-hidden="true">
                <IconeAmpoule />
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-bois">
                Comment ça se passe&nbsp;?
              </h3>
              <p className="mt-4 text-ardoise">
                Consultations pour adultes, à partir de {publics.ageMinimum} ans.
              </p>

              <ol className="mt-5 space-y-5">
                {ETAPES.map((e, i) => (
                  <li key={e.titre} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-bold text-bois-brun"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-medium text-encre">{e.titre}</span>
                      <span className="mt-1 block text-ardoise">{e.texte}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className="mt-auto pt-6">
                <Link
                  href="/consultations/"
                  className="group inline-flex items-center gap-2 font-medium text-terracotta-fonce underline underline-offset-4"
                >
                  Le déroulé en détail
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </p>
            </article>
          </Apparition>

          {/* --- 3. Pratique : des faits étiquetés, pas de la prose. --- */}
          <Apparition delai={240} className="h-full">
            <article className="flex h-full flex-col rounded-[20px] bg-lavande p-8 sm:p-9">
              <span className="text-bois-brun" aria-hidden="true">
                <IconeDestination />
              </span>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-bois">
                Venir au cabinet
              </h3>

              {/* Trois rubriques en listes à puces plutôt qu'en phrases suivies
                  (révision du 2026-09-10). Chaque ligne est une information que
                  l'on cherche isolément — l'horaire, le tram, le prix — et une
                  liste se balaye, là où un paragraphe se lit en entier. */}
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-terracotta-fonce">
                    Horaires
                  </dt>
                  <dd className="mt-2 text-ardoise">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>{horaires.libelle}.</li>
                      <li>Uniquement sur rendez-vous, en présentiel.</li>
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-terracotta-fonce">
                    Accès
                  </dt>
                  <dd className="mt-2 text-ardoise">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        Adresse&nbsp;: <address className="inline not-italic">{adressePostale}</address>
                      </li>
                      <li>Repères&nbsp;: {cabinet.acces.reperes}.</li>
                      <li>Tramway&nbsp;: {minusculeInitiale(cabinet.acces.tram)}.</li>
                      <li>Stationnement&nbsp;: {minusculeInitiale(cabinet.acces.stationnement)}.</li>
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-terracotta-fonce">
                    Tarif
                  </dt>
                  <dd className="mt-2 text-ardoise">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        <strong className="font-medium text-encre">
                          De {honoraires.min}&nbsp;€ à {honoraires.max}&nbsp;€ la séance.
                        </strong>
                      </li>
                      <li>
                        {honoraires.modulation} {honoraires.premiereSeance.court}
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-auto pt-6">
                <p>
                  <Bouton href="/rendez-vous-psychologue-nantes/" className="px-6 py-3">
                    Prendre rendez-vous
                  </Bouton>
                </p>
              </div>
            </article>
          </Apparition>
        </div>

        {/* PLAN INTERACTIF — demandé par Vincent le 2026-09-10.

            Il vient SOUS les trois cartes et non dans celle de droite : dans
            une colonne d'un tiers de largeur, une carte fait 300 px de côté et
            ne montre plus rien d'utile. En pleine largeur, on voit le quartier,
            la Manufacture et la ligne de tram — c'est-à-dire ce qui permet de
            se repérer avant de venir.

            Le composant ne charge RIEN tant que le visiteur n'a pas cliqué :
            voir l'en-tête de PlanCabinet.tsx, cette contrainte est juridique. */}
        <div className="mt-10">
          <h3 className="sr-only">Plan d&rsquo;accès au cabinet</h3>
          <PlanCabinet />
        </div>
      </section>

      {/* ---------------------------------------------------------------- 3
          TITRES PROFESSIONNELS — remonté de la 6e position du site actuel.
          En YMYL santé, la preuve de compétence est le premier signal attendu
          (SEO_MASTER § 2.1). */}
      <Section
        id="titres"
        fond="creme"
        pleineLargeur
        titre="Mes titres professionnels"
        chapeau={praticien.doubleTitre}
      >
        {/* Traitement éditorial plutôt que « cartes ».

            Trois boîtes blanches identiques avec bordure et barre colorée en
            haut : c'est le motif générique de tous les thèmes WordPress. Ici,
            plus de boîte du tout — la structure vient de la typographie, d'un
            grand numéro et de filets d'un pixel. Le regard suit une hiérarchie
            au lieu de compter des rectangles. */}
        <ol className="grid gap-px overflow-hidden rounded-[20px] bg-sable sm:grid-cols-3">
          {TITRES.map((carte, i) => (
            <Apparition key={carte.nom} delai={i * 120} className="h-full">
              <li className="flex h-full flex-col bg-white p-8 sm:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="text-4xl font-bold leading-none text-sable"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Pastille verte pour les deux titres protégés par la loi,
                      terracotta pour le troisième qui ne l'est pas. Un même
                      marqueur de validation partout laisserait croire à une
                      protection qui n'existe pas (§ 2.2 du master). */}
                  <span
                    className={[
                      "flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider",
                      carte.protege ? "text-valide" : "text-terracotta-fonce",
                    ].join(" ")}
                  >
                    <IconeValidation className="h-4 w-4" />
                    {carte.mention}
                  </span>
                </div>

                <h3 className="mt-7 text-[26px] font-bold leading-tight tracking-tight text-encre">
                  {carte.nom}
                </h3>
                <div className="mt-4 h-px w-10 bg-terracotta" aria-hidden="true" />
                <p className="mt-5 text-ardoise">{carte.texte}</p>
                {carte.lien && (
                  <p className="mt-5">
                    <Link
                      href={carte.lien.href}
                      className="text-sm font-medium text-terracotta-fonce underline underline-offset-4"
                    >
                      {carte.lien.libelle}
                    </Link>
                  </p>
                )}
              </li>
            </Apparition>
          ))}
        </ol>

        {/* Renvoi vers la page pédagogique comparative.
            L'accueil WordPress portait un bouton « Un "psy" c'est quoi ? » qui
            pointait dessus ; la refonte l'avait perdu, et la page se retrouvait
            liée par une seule autre page du site alors qu'elle porte les
            requêtes « psychiatre… ». Rétabli le 2026-09-08, à sa place logique :
            juste après les trois titres, là où le lecteur compare. */}
        <p className="mt-8">
          <Link
            href="/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/"
            className="group inline-flex items-center gap-2 font-medium text-terracotta-fonce underline underline-offset-4"
          >
            Psychologue, psychothérapeute, psychiatre, psychanalyste : quelles différences ?
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </p>

        {/* Déclarations officielles. Ce sont des faits vérifiables (numéros,
            autorité de tutelle, université) : c'est exactement ce que Google
            attend d'un site YMYL, et ce qu'un visiteur peut contrôler. */}
        <div className="mt-8 rounded-[20px] border border-sable bg-white p-7 sm:p-9">
          {/* Titre, et non paragraphe en gras : le même bloc est un <h2>
              sur la page auteur, et il ouvre ici une liste de faits
              vérifiables. `h3` parce qu'il dépend du <h2> de la section. */}
          <h3 className="text-base font-bold text-bois">Formation et enregistrement</h3>
          {/* Chaque entrée porte son icône. Elles sont décoratives : le sens
              est dans le libellé, d'où aria-hidden et aucun alternatif. */}
          <dl className="mt-6 grid gap-x-10 gap-y-6 text-sm sm:grid-cols-2">
            <div className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                <IconeAtteste />
              </span>
              <div>
                <dt className="font-medium text-encre">Psychologue déclaré</dt>
                <dd className="mt-1 text-ardoise">
                  Auprès de la {praticien.declarations.psychologue}.
                  <br />
                  Numéro ADELI&nbsp;:{" "}
                  <span className="font-medium text-encre">{praticien.adeli}</span>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                <IconeInstitution />
              </span>
              <div>
                <dt className="font-medium text-encre">Activité libérale déclarée</dt>
                <dd className="mt-1 text-ardoise">
                  Auprès de l&rsquo;{praticien.declarations.activiteLiberale}.
                  <br />
                  Numéro SIRET&nbsp;:{" "}
                  <span className="font-medium text-encre">{praticien.siret}</span>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                <IconeDiplome />
              </span>
              <div>
                <dt className="font-medium text-encre">Diplôme</dt>
                <dd className="mt-1 text-ardoise">
                  {praticien.diplome.intitule}, délivré par l&rsquo;
                  {praticien.diplome.etablissement}.
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                <IconeAffiliation />
              </span>
              <div>
                <dt className="font-medium text-encre">Titre et rattachements</dt>
                <dd className="mt-1 text-ardoise">
                  Titulaire du titre professionnel de «&nbsp;psychologue&nbsp;».
                  <br />
                  Membre de&nbsp;: {praticien.rattachements.join(", ")}.
                </dd>
              </div>
            </div>
          </dl>
          <p className="mt-7">
            <Link
              href="/vincent-rousseau-psychologue/"
              className="font-medium text-terracotta-fonce underline underline-offset-2"
            >
              Mon parcours en détail
            </Link>
          </p>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- 4
          LA PSYCHANALYSE — l'approche, pas une porte d'entrée : elle descend
          sous les trois cartes. Le développement théorique complet reste sur
          /psychanalyste-nantes/.

          Mise en page asymétrique (titre à gauche, propos à droite) plutôt
          qu'un bloc de texte centré. Aucune image : le seul visuel disponible
          hors droits est une aquarelle de banque d'images (cœur, silhouette),
          exactement le cliché que le master proscrit (§ 8.5). Le rythme vient
          donc de la typographie.

          Le propos est descriptif, jamais comparatif : présenter la
          psychanalyse en dévalorisant les autres approches serait de la
          publicité comparative, proscrite par la déontologie (§ 2.2). */}
      <section
        id="approche"
        aria-labelledby="approche-titre"
        className="bg-lin px-5 py-16 sm:px-10 sm:py-20 lg:px-[100px]"
      >
        <Apparition>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              Mon approche
            </p>
            <h2
              id="approche-titre"
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              La psychanalyse,
              <br className="hidden sm:block" /> c&rsquo;est quoi&nbsp;?
            </h2>
            <p className="mt-6">
              <Link
                href="/psychanalyste-nantes/"
                className="group inline-flex items-center gap-2 rounded-sm bg-terracotta px-6 py-3 text-sm font-semibold uppercase tracking-wider text-encre"
              >
                La psychanalyse en détail
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </p>

            {/* Détail de l'œuvre du hero, recadré : même univers, cadrage
                différent. Le domaine public (Matisse, 2025) est la seule
                source d'image utilisable en l'état — cf. donnees-vincent.md
                § 11. Décorative, donc alt vide. */}
            {/* flex-1 + fill : l'image occupe exactement la hauteur restante
                de la colonne, ce qui aligne le bas des deux colonnes. Sans
                cela, la colonne de gauche dépasse et laisse un blanc sous le
                texte de droite. */}
            <figure className="mt-8 flex flex-1 flex-col">
              <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/matisse-detail-nature-morte.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-ardoise">
                Henri Matisse, <cite>Nature morte d&rsquo;après « La Desserte » de Jan
                Davidsz. de Heem</cite> (1915), détail.
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-8">
            {/* Chapeau en corps plus large : c'est la définition, elle porte
                la réponse directe attendue par les moteurs et par le lecteur. */}
            <p className="max-w-lecture text-xl leading-relaxed text-encre sm:text-[1.375rem]">
              La psychanalyse est une psychothérapie par la parole qui explore la psyché
              humaine, tant dans son fonctionnement actuel que dans son histoire. En mettant
              en lumière vos mécanismes internes, vos choix répétitifs et vos relations aux
              autres, elle accompagne une transformation en profondeur.
            </p>

            <blockquote className="my-9 border-l-2 border-terracotta pl-6">
              <p className="font-accent text-2xl italic leading-snug text-bois sm:text-[28px]">
                Elle invite à transformer la plainte initiale en une véritable question.
              </p>
            </blockquote>

            <div className="prose-clinique">
              <p>
                Ici, le symptôme cache un sens d&rsquo;abord opaque qu&rsquo;il s&rsquo;agit
                de déchiffrer par les mots. C&rsquo;est au terme de ce travail de fond que le
                symptôme s&rsquo;apaise, se transforme ou disparaît. Les bénéfices sont
                doubles&nbsp;: ils soulagent la souffrance immédiate (angoisse, dépression,
                troubles relationnels) et structurent durablement l&rsquo;organisation
                psychique.
              </p>
              <p>
                Cette approche se distingue des thérapies brèves. Son objet n&rsquo;est pas
                seulement le symptôme, mais ce qu&rsquo;il révèle de votre histoire. Elle
                favorise ainsi un gain d&rsquo;autonomie, une meilleure connaissance de soi
                et une force accrue pour faire face aux difficultés de la vie.
              </p>
            </div>
          </div>
        </div>
        </Apparition>
      </section>

      {/* ---------------------------------------------------------------- 5
          RESSOURCES & LIENS UTILES — bloc repris du site d'origine.

          Deux rôles distincts : à gauche, les documents de fond de Vincent
          (des actifs à conserver, cf. docs/donnees-vincent.md § 9) ; à droite,
          les sources d'autorité de la profession, qui sont un signal E-E-A-T
          direct sur un site YMYL. */}
      <section
        aria-labelledby="ressources-titre"
        className="px-5 py-16 sm:px-10 lg:px-[100px]"
      >
        <h2 id="ressources-titre" className="sr-only">
          Ressources et liens utiles
        </h2>
        <Apparition>
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              En savoir plus
            </h3>
            <ul className="mt-5 space-y-3">
              {RESSOURCES.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    /* Nouvel onglet : ce sont des PDF. Les ouvrir dans l'onglet
                       courant fait quitter le site, et le retour depuis un
                       lecteur PDF est laborieux — surtout sur mobile. */
                    target="_blank"
                    rel="noopener"
                    className="group flex items-start gap-4 rounded-[20px] bg-peche p-5 transition-colors hover:bg-terracotta/40"
                  >
                    <span className="mt-0.5 shrink-0 text-bois-brun" aria-hidden="true">
                      <IconeDocument />
                    </span>
                    <span>
                      <span className="block font-medium text-encre">{r.titre}</span>
                      <span className="mt-0.5 block text-sm text-ardoise">{r.detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              Liens utiles
            </h3>
            <ul className="mt-5 space-y-3">
              {LIENS_UTILES.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-[20px] bg-lin p-5 transition-colors hover:bg-peche"
                  >
                    <span className="mt-0.5 shrink-0 text-bois-brun" aria-hidden="true">
                      <IconeLienExterne />
                    </span>
                    <span>
                      <span className="block font-medium text-encre">
                        {l.titre}
                        <span className="sr-only"> (nouvelle fenêtre)</span>
                      </span>
                      <span className="mt-0.5 block text-sm text-ardoise">{l.detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Apparition>
      </section>

      {/* ---------------------------------------------------------------- 7
          CITATION — conservée : elle donne une respiration à la page. */}
      <Section fond="creme" pleineLargeur>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-accent text-2xl italic text-bois sm:text-3xl">
            «&nbsp;Les mots qui vont surgir savent de nous des choses que nous ignorons
            d&rsquo;eux.&nbsp;»
          </blockquote>
          <figcaption className="mt-4 text-sm text-ardoise">
            René Char, <cite>Chants de la Balandrane</cite> (1977)
          </figcaption>
        </figure>
      </Section>

      {/* ---------------------------------------------------------------- 8
          FAQ — 4 questions ici, les 12 restent sur /aide-faq/. */}
      {/* ---------------------------------------------------------------- 8
          FAQ — accordéons natifs <details>/<summary>.

          Trois raisons de ne pas passer par du JavaScript :
           - le contenu reste dans le DOM, donc indexable et citable par les IA
             même replié (les SERP des mots-clés suivis affichent presque toutes
             un bloc « Les gens demandent aussi », qui se nourrit de ce format) ;
           - l'accessibilité clavier et lecteur d'écran est native ;
           - la page reste fonctionnelle sans JS.

          Mise en page asymétrique, reprise de la section « Mon approche », pour
          garder un rythme cohérent d'une section à l'autre. */}
      <section
        id="faq"
        aria-labelledby="faq-titre"
        className="bg-lavande px-5 py-16 sm:px-10 sm:py-20 lg:px-[100px]"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* `flex flex-col` : la colonne devient un conteneur en hauteur, ce
              qui permet à l'image de prendre la place restante sous le texte
              et d'aligner le bas des deux colonnes sur l'accordéon. */}
          <div className="flex flex-col lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              Vos questions
            </p>
            <h2
              id="faq-titre"
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Questions fréquentes
            </h2>
            <p className="mt-4 max-w-lecture text-ardoise">
              Entreprendre une démarche thérapeutique soulève souvent des interrogations.
              Retrouvez ici les réponses aux questions les plus courantes, pour vous aider à
              aborder votre premier rendez-vous en toute sérénité.
            </p>
            <p className="mt-6">
              <Link
                href="/aide-faq/"
                className="group inline-flex items-center gap-2 font-medium text-terracotta-fonce underline underline-offset-4"
              >
                Toutes les questions
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </p>

            {/* L'image comble le vide laissé sous le texte : la colonne de
                gauche ne portait que quatre lignes face à sept accordéons.
                Même motif que la section « Mon approche » — flex-1 + fill,
                pour que le bas des deux colonnes tombe au même endroit.

                ŒUVRE DU DOMAINE PUBLIC (Kandinsky, mort en 1944, libre
                depuis 2015). Elle est déjà utilisée sur la page pédagogique
                des « psy » : c'est la sixième et dernière disponible, aucune
                ne reste inemployée. Le doublon disparaîtra dès que Vincent
                fournira une photo du cabinet ou de lui — ce que le master
                § 8.5 recommande, une vraie photo valant mieux qu'un tableau
                pour un site de praticien. Décorative, donc alt vide.

                `hidden lg:flex` : sur mobile, les deux colonnes s'empilent et
                l'image se glisserait entre l'introduction et la première
                question, en pure perte de défilement avant le contenu utile. */}
            <figure className="mt-10 hidden flex-1 flex-col lg:flex">
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/kandinsky-maisons-a-murnau-1909.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-ardoise">
                Vassily Kandinsky, <cite>Maisons à Murnau</cite> (1909).
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-8">
            {/* La première est ouverte : le visiteur voit d'emblée à quoi
                ressemble une réponse, et le prix est la question n° 1. */}
            <FaqAccordeon questions={QUESTIONS_ACCUEIL} ouvrirPremiere />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- 9
          CTA FINAL — informer et faciliter, jamais mettre la pression (§ 9.2). */}
      <Section fond="menthe" etroit pleineLargeur>
        <div className="text-center">
          {/* Ce bloc ouvre une section pleine largeur et n'avait aucun
              titre : le plan de l'accueil s'arrêtait a la FAQ. */}
          <h2 className="text-2xl font-bold text-bois">
            Vous souhaitez prendre rendez-vous&nbsp;?
          </h2>
          <p className="mx-auto mt-3 max-w-lecture text-ardoise">
            Le premier entretien est gratuit et sans aucun engagement. C&rsquo;est un espace
            d&rsquo;échange simple pour faire le point sur vos attentes et décider ensemble
            de la suite.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/rendez-vous-psychologue-nantes/"
              className="rounded bg-terracotta px-6 py-3 font-medium text-encre"
            >
              Prendre rendez-vous
            </Link>
            <a
              href={`tel:${contact.telephoneE164}`}
              className="rounded border border-bois px-6 py-3 font-medium text-bois"
            >
              Appeler le {contact.telephone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
