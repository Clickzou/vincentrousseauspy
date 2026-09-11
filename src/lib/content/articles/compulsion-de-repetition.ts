import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 10 »).
 *
 * ANTI-CANNIBALISATION : mot-clé « compulsion de répétition », qu'aucune page
 * ne cible. /psychanalyste-nantes/ cite les répétitions parmi les formations
 * de l'inconscient, en une phrase : l'article la développe et renvoie vers
 * elle.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « La thérapie permet de passer de la répétition subie à la prise de
 *     conscience libératrice » devient « vise à » : on décrit une visée, pas
 *     un résultat (§ 2.1) ;
 *   - « Ce n'est pas de la mauvaise chance » devient « pas toujours » : des
 *     échecs répétés ont aussi des causes extérieures ;
 *   - « parce que nous savons inconsciemment comment y faire face » devient
 *     « parce que ce terrain nous est connu » : l'explication d'origine n'est
 *     pas celle de Freud et ne se trouve dans aucune source ;
 *   - « Sans travail sur soi, le dénouement reste souvent le même » perd sa
 *     première moitié, qui sonnait comme un argument de vente ;
 *   - une phrase sur la perlaboration est AJOUTÉE en clôture : Freud écrit
 *     lui-même (1914) que la prise de conscience ne suffit pas. Sans elle,
 *     la « prise de conscience libératrice » restait une promesse ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const compulsionDeRepetition: Article = {
  slug: "compulsion-de-repetition",
  titre: "Briser le cercle vicieux : pourquoi nous rejouons les mêmes scénarios",
  chapeau:
    "« Pourquoi je tombe toujours sur le même type de partenaire ? » Ce n'est pas de la " +
    "mauvaise chance : la psychanalyse nomme ce phénomène la compulsion de répétition, " +
    "un mécanisme inconscient.",
  metaTitre: "Pourquoi répète-t-on les mêmes échecs ?",
  publieLe: "2027-02-15",
  modifieLe: "2027-02-15",
  motCle: "compulsion de répétition",
  illustration: {
    src: "/images/klee-rythmique-1930.jpg",
    auteur: "Paul Klee",
    titre: "Rythmique",
    annee: "1930",
  },
  sources: [
    {
      titre: "Au-delà du principe de plaisir",
      editeur: "Sigmund Freud, 1920 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/essais_de_psychanalyse/Essai_1_au_dela/au_dela_prin_plaisir.html",
    },
    {
      titre: "Thérapies psychanalytiques (brochure)",
      editeur: "Psycom",
      href: "https://www.psycom.org/wp-content/uploads/2024/04/PSYCOM_Brochures-A5_P_Therapies-psychanalytiques_WEB.pdf",
    },
    {
      titre: "« Une difficulté de la psychanalyse ». Décryptage de la compulsion à répéter",
      editeur: "La compulsion de répétition, Presses universitaires de France — Cairn",
      href: "https://shs.cairn.info/la-compulsion-de-repetition--9782130591757-page-37?lang=fr",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "« Pourquoi je tombe toujours sur le même type de partenaire ? », « Pourquoi mes " +
        "projets professionnels finissent-ils tous de la même manière ? ». Nous avons " +
        "parfois l'impression qu'une fatalité ou un « scénario écrit d'avance » s'acharne " +
        "sur nous.",
    },
    {
      type: "p",
      texte:
        "En psychanalyse, ce phénomène porte un nom : la compulsion de répétition. Ce " +
        "n'est pas toujours de la mauvaise chance : il peut s'agir d'un mécanisme " +
        "inconscient.",
      lien: {
        href: "/psychanalyste-nantes/",
        libelle: "Les formations de l'inconscient",
      },
    },

    { type: "h2", texte: "Le piège du terrain connu" },
    {
      type: "p",
      texte:
        "Aussi surprenant que cela puisse paraître, notre inconscient préfère parfois une " +
        "souffrance familière à un bonheur inconnu.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "La recherche de repères",
          texte:
            "nous avons tendance à recréer les conditions de notre passé, même " +
            "douloureuses, parce que ce terrain, si pénible soit-il, nous est connu.",
        },
        {
          terme: "L'illusion de la réparation",
          texte:
            "on rejoue la même scène difficile avec l'espoir secret que, cette fois-ci, " +
            "l'histoire se terminera bien. Le dénouement, pourtant, reste souvent le même.",
        },
      ],
    },

    { type: "h2", texte: "Comment sortir de l'impasse ?" },
    {
      type: "p",
      texte:
        "La thérapie vise à passer de la répétition subie à la prise de conscience :",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Le moment où l'on décide de consulter",
      },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Repérer les fils invisibles",
          texte:
            "identifier les schémas qui se répètent et comprendre à quelle période de votre " +
            "histoire ils ont commencé.",
        },
        {
          terme: "Changer de rôle",
          texte:
            "prendre conscience que vous n'êtes plus l'enfant impuissant d'autrefois, mais " +
            "l'adulte d'aujourd'hui, capable de poser des limites.",
        },
        {
          terme: "Oser la nouveauté",
          texte:
            "apprendre à tolérer l'inconnu pour s'autoriser des trajectoires de vie " +
            "différentes et plus apaisées.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Comprendre ne suffit pas toujours d'un coup. Il faut du temps pour que ce qui a " +
        "été reconnu se travaille et se déplace — ce que Freud appelait la perlaboration.",
    },
  ],
};
