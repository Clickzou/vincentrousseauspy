import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 8 »).
 *
 * ANTI-CANNIBALISATION : mot-clé « sentiment de culpabilité », qu'aucune page
 * ne cible.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « C'est un poison de l'esprit » est retiré : pas d'emphase (§ 8.4), et la
 *     phrase suivante dit la même chose sans image ;
 *   - « Le travail thérapeutique permet de trier » devient « aide à trier » :
 *     on décrit ce que vise le travail, pas ce qu'il obtient (§ 2.1) ;
 *   - « l'une des plus toxiques » devient « des plus pesantes », pour la même
 *     raison ;
 *   - la distinction « culpabilité utile / névrotique » n'est pas une catégorie
 *     freudienne : elle est introduite par « Pour le dire simplement » ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const culpabilite: Article = {
  slug: "culpabilite",
  titre: "S'alléger du fardeau : comprendre et traverser la culpabilité",
  chapeau:
    "La culpabilité est l'une des émotions les plus discrètes et les plus pesantes. On se " +
    "sent coupable d'en faire trop, ou pas assez. De dire non, ou de ne pas avoir osé " +
    "dire oui.",
  metaTitre: "Le sentiment de culpabilité",
  publieLe: "2026-12-15",
  modifieLe: "2026-12-15",
  motCle: "sentiment de culpabilité",
  illustration: {
    src: "/images/vuillard-interieur-mere-et-soeur-1893.jpg",
    auteur: "Édouard Vuillard",
    titre: "Intérieur, mère et sœur de l'artiste",
    annee: "1893",
  },
  sources: [
    {
      titre: "Le moi et le ça",
      editeur: "Sigmund Freud, 1923 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund_1/essais_de_psychanalyse/Essai_3_moi_et_ca/moi_et_ca.html",
    },
    {
      titre: "Malaise dans la civilisation",
      editeur: "Sigmund Freud, 1930 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/malaise_civilisation/malaise_civilisation.html",
    },
    {
      titre: "Chemins tortueux de la culpabilité chez Freud",
      editeur: "Revue française de psychosomatique, 2011 — Cairn",
      href: "https://www.cairn.info/revue-francaise-de-psychosomatique-2011-1-page-67.htm",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Parmi toutes les émotions humaines, la culpabilité est sans doute l'une des plus " +
        "discrètes et des plus pesantes. Elle s'insinue partout : dans notre rôle de " +
        "parent, dans notre couple, au travail, et même face à nos propres moments de " +
        "repos.",
    },
    {
      type: "p",
      texte:
        "On se sent coupable de trop en faire, ou pas assez. De dire non, ou de ne pas " +
        "avoir osé dire oui.",
    },

    { type: "h2", texte: "La fausse et la vraie responsabilité" },
    {
      type: "p",
      texte:
        "Pour le dire simplement, il est important de faire la distinction entre deux " +
        "types de culpabilité :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "La culpabilité utile",
          texte:
            "elle survient lorsque nous avons réellement blessé quelqu'un. Elle nous pousse " +
            "à réparer notre erreur. Elle est saine.",
        },
        {
          terme: "La culpabilité névrotique",
          texte:
            "on se sent responsable de tout, et surtout du bonheur ou du malheur des autres. " +
            "On s'en veut pour des pensées, des désirs ou des choix qui nous appartiennent " +
            "pourtant en propre.",
        },
      ],
    },

    { type: "h2", texte: "Ce que cache la culpabilité" },
    {
      type: "p",
      texte:
        "En psychanalyse, une culpabilité excessive est souvent le signe d'un conflit " +
        "entre nos désirs profonds et une loi intérieure très sévère — ce que Freud " +
        "appelait le Surmoi.",
      lien: { href: "/psychanalyste-nantes/", libelle: "Ce qu'est la psychanalyse" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Le prix de l'autonomie",
          texte:
            "parfois, vouloir vivre sa propre vie et faire ses propres choix est " +
            "inconsciemment vécu comme une trahison envers ses parents ou son milieu " +
            "d'origine.",
        },
        {
          terme: "L'illusion de contrôle",
          texte:
            "se sentir coupable du malheur des autres est une façon douloureuse, mais " +
            "inconsciente, de croire que l'on a du pouvoir sur les événements, alors que " +
            "nous n'en avons pas.",
        },
      ],
    },

    { type: "h2", texte: "Faire le tri" },
    {
      type: "p",
      texte:
        "Le travail thérapeutique aide à trier : qu'est-ce qui vous appartient vraiment ? " +
        "Qu'est-ce qui appartient aux autres ? Déposer cette culpabilité imaginaire, ce " +
        "n'est pas devenir égoïste, c'est simplement devenir juste envers soi-même.",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Le moment où l'on décide de consulter",
      },
    },
  ],
};
