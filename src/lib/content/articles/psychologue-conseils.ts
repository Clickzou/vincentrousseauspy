import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Écrit 3 »). Format « réponse argumentée à une idée reçue » (§ 7.3).
 *
 * ANTI-CANNIBALISATION : mot-clé « psychologue conseils », qu'aucune page ne
 * cible. L'article alimente la page sur les différents « psy », comme le
 * suggérait la note de Vincent.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « le plus grand respect qu'il puisse témoigner » devient « une forme de
 *     respect » : pas de superlatif (§ 8.4) ;
 *   - « Une solution parachutée de l'extérieur fonctionne rarement sur le long
 *     terme » devient « a peu de chances de vous ressembler » : l'affirmation
 *     d'origine est empirique et ne se trouve dans aucune source ;
 *   - la note entre crochets destinée au site est retirée.
 *
 * À SIGNALER À VINCENT : le titre généralise (« votre psychologue ne vous
 * donnera pas de conseils »), alors qu'un psychologue d'une autre orientation
 * peut en formuler. Le texte le précise dès le deuxième paragraphe ; au titre
 * de dire s'il le veut plus explicite.
 */
export const psychologueConseils: Article = {
  slug: "psychologue-conseils",
  titre: "« Que feriez-vous à ma place ? » Pourquoi votre psychologue ne vous donnera pas de conseils",
  chapeau:
    "Face à un choix douloureux, on attend du psychologue qu'il nous dise quoi faire. S'il " +
    "ne décide pas à votre place, ce n'est pas un manque d'aide : c'est une forme de " +
    "respect pour votre autonomie.",
  metaTitre: "Pourquoi le psychologue ne conseille pas",
  publieLe: "2026-11-01",
  modifieLe: "2026-11-01",
  motCle: "psychologue conseils",
  illustration: {
    src: "/images/klee-chemin-principal-et-chemins-secondaires-1929.jpg",
    auteur: "Paul Klee",
    titre: "Chemin principal et chemins secondaires",
    annee: "1929",
  },
  sources: [
    {
      titre: "Code de déontologie des psychologues (2021), principe 1 et article 14",
      editeur: "CERéDéPsy",
      href: "https://www.codededeontologiedespsychologues.fr/2021/05/20/code-de-deontologie-des-psychologues-2021/",
    },
    {
      titre: "Introduction à la psychanalyse, 27e leçon : « Le transfert »",
      editeur: "Sigmund Freud, 1916-1917 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/intro_a_la_psychanalyse/intro_psychanalyse.html",
    },
    {
      titre: "Psychanalyse et médecine",
      editeur: "Sigmund Freud, 1926 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/psychanalyse_et_medecine/psychan_et_medecine.html",
    },
    {
      titre: "Suggestion, persuasion et transfert à l'aube de la psychanalyse",
      editeur: "Jean-Nicolas Despland, Psychothérapies, 2008 — Cairn",
      href: "https://www.cairn.info/revue-psychotherapies-2008-3-page-155.htm",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "C'est une demande légitime et très fréquente : face à un choix douloureux, une " +
        "rupture difficile ou une impasse professionnelle, on attend du professionnel " +
        "qu'il nous guide, nous dise quoi faire ou valide notre décision. On aimerait une " +
        "feuille de route ou une recette miracle.",
    },
    {
      type: "p",
      texte:
        "Pourtant, un psychologue clinicien d'orientation psychanalytique se gardera bien " +
        "de décider à votre place. Ce refus n'est pas un manque d'aide, c'est au contraire " +
        "une forme de respect pour votre autonomie.",
      lien: {
        href: "/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/",
        libelle: "Ce qui distingue les différents « psy »",
      },
    },

    { type: "h2", texte: "Le piège de la suggestion" },
    {
      type: "p",
      texte:
        "Si le thérapeute vous disait quoi faire, il projetterait sur vous ses propres " +
        "valeurs, son histoire et ses propres choix de vie.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "L'illusion de la bonne réponse",
          texte:
            "ce qui est bon pour l'un ne l'est pas pour l'autre. Une solution parachutée " +
            "de l'extérieur a peu de chances de vous ressembler.",
        },
        {
          terme: "Le risque de la dépendance",
          texte:
            "vous inciter à suivre un conseil, c'est vous maintenir dans une position de " +
            "dépendance, alors que le but d'une thérapie est précisément de vous en libérer.",
        },
      ],
    },

    { type: "h2", texte: "Vous réapproprier votre propre boussole" },
    {
      type: "p",
      texte:
        "L'objectif du travail thérapeutique est de vous aider à dégager le terrain pour " +
        "que vous puissiez entendre votre propre désir, souvent étouffé par le stress, les " +
        "attentes de l'entourage ou les culpabilités anciennes.",
    },
    {
      type: "p",
      texte:
        "Le psychologue ne se positionne pas comme un « sachant » qui dirige votre vie, " +
        "mais comme un éclaireur :",
    },
    {
      type: "liste",
      items: [
        "Il vous aide à déplier la complexité de votre situation.",
        "Il met en lumière les zones d'ombre ou les contradictions inconscientes qui vous bloquent.",
        "Il vous accompagne pour que vous preniez des décisions qui vous ressemblent vraiment.",
      ],
    },
    {
      type: "p",
      texte:
        "Le véritable soulagement ne vient pas du fait que l'on a trouvé quelqu'un pour " +
        "porter nos choix, mais de la découverte que l'on est capable de les faire " +
        "soi-même, en toute conscience.",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Pourquoi consulter un psychologue clinicien",
      },
    },
  ],
};
