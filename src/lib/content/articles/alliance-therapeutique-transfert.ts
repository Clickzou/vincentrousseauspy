import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * premier des textes à ajouter).
 *
 * ANTI-CANNIBALISATION : mot-clé « alliance thérapeutique », qu'aucune page ne
 * cible. Le transfert n'est nommé nulle part ailleurs sur le site.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « Pour que le travail porte ses fruits, une alchimie particulière doit se
 *     mettre en place » devient « Pour qu'un travail soit possible, un lien
 *     particulier… » : « porter ses fruits » annonçait un résultat (§ 2.1) ;
 *   - « un phénomène fascinant » perd son adjectif : pas d'emphase (§ 8.4) ;
 *   - « pour pouvoir, enfin, les dénouer » devient « pour commencer à les
 *     dénouer », et « le premier pas vers une liberté retrouvée » devient « un
 *     premier pas pour s'en dégager » : on décrit un chemin, pas une issue
 *     garantie ;
 *   - deux absolus nuancés après vérification des sources : « aucun travail
 *     approfondi n'est possible » sans alliance devient « difficilement
 *     possible » (la littérature en fait un facteur favorable, pas une
 *     condition absolue), et « le transfert n'est pas un obstacle » devient
 *     « pas seulement un obstacle » (Freud en fait aussi l'arme de la
 *     résistance, Introduction à la psychanalyse, 27e leçon).
 */
export const allianceTherapeutiqueTransfert: Article = {
  slug: "alliance-therapeutique-transfert",
  titre: "L'alliance et le transfert : au cœur de la rencontre thérapeutique",
  chapeau:
    "Quand on pousse la porte d'un cabinet de psychologue, on apporte son histoire, ses " +
    "souffrances, et sa façon d'entrer en relation. Deux concepts décrivent le lien qui se " +
    "noue alors : l'alliance thérapeutique et le transfert.",
  metaTitre: "Alliance thérapeutique et transfert",
  metaDescription:
    "Quand on consulte, un lien particulier se noue avec le praticien. Deux concepts le " +
    "décrivent : l'alliance thérapeutique et le transfert.",
  publieLe: "2027-01-01",
  modifieLe: "2027-01-01",
  motCle: "alliance thérapeutique",
  illustration: {
    src: "/images/vuillard-deux-femmes-sous-la-lampe-1892.jpg",
    auteur: "Édouard Vuillard",
    titre: "Deux femmes sous la lampe",
    annee: "1892",
  },
  sources: [
    {
      titre: "Les psychothérapies",
      editeur: "Psycom",
      href: "https://www.psycom.org/sinformer/le-retablissement/les-psychotherapies/",
    },
    {
      titre: "Thérapies psychanalytiques (brochure)",
      editeur: "Psycom",
      href: "https://www.psycom.org/wp-content/uploads/2024/04/PSYCOM_Brochures-A5_P_Therapies-psychanalytiques_WEB.pdf",
    },
    {
      titre: "Introduction à la psychanalyse, 27e leçon : « Le transfert »",
      editeur: "Sigmund Freud, 1916-1917 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/intro_a_la_psychanalyse/intro_psychanalyse.html",
    },
    {
      titre: "L'alliance thérapeutique : historique, recherches et perspectives cliniques",
      editeur: "Antoine Bioy et Maximilien Bachelart, Perspectives Psy, 2010 — Cairn",
      href: "https://shs.cairn.info/revue-perspectives-psy-2010-4-page-317?lang=fr",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Quand on pousse la porte d'un cabinet de psychologue, on apporte avec soi son " +
        "histoire, ses souffrances, mais aussi sa façon d'entrer en relation avec les " +
        "autres. Pour qu'un travail soit possible, un lien particulier doit se mettre en " +
        "place. En psychothérapie et en psychanalyse, deux grands concepts décrivent ce " +
        "lien : l'alliance thérapeutique et le transfert.",
      lien: { href: "/psychotherapeute-nantes/", libelle: "Ce qu'est une psychothérapie" },
    },
    {
      type: "p",
      texte:
        "Bien qu'ils soient différents, ils travaillent main dans la main pour permettre " +
        "le changement.",
    },

    { type: "h2", texte: "L'alliance thérapeutique : le pacte de confiance" },
    {
      type: "p",
      texte:
        "L'alliance thérapeutique est le socle sur lequel repose toute thérapie. C'est une " +
        "forme de pacte de confiance, conscient et rationnel, entre vous et le praticien.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Une collaboration",
          texte: "nous travaillons ensemble, comme une équipe, face à votre souffrance.",
        },
        {
          terme: "Un cadre sécurisant",
          texte:
            "elle s'appuie sur la régularité des séances, le respect du secret " +
            "professionnel et le sentiment d'être écouté sans jugement.",
        },
        {
          terme: "Un objectif commun",
          texte:
            "vous et moi partageons le même but, celui de vous aider à aller mieux et à y " +
            "voir plus clair.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Sans cette alliance de départ, un travail approfondi est difficilement possible. Elle " +
        "permet de se sentir assez en sécurité pour oser parler de soi.",
      lien: { href: "/consultations/", libelle: "Le cadre des consultations" },
    },

    { type: "h2", texte: "Le transfert : la boussole de la psychanalyse" },
    {
      type: "p",
      texte:
        "Si l'alliance est le point de départ, le transfert, lui, est le moteur " +
        "inconscient de la thérapie. C'est un phénomène tout à fait naturel.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Une répétition",
          texte:
            "transférer, c'est projeter sur le thérapeute des sentiments, des désirs ou des " +
            "attentes qui appartiennent en réalité à votre histoire passée.",
        },
        {
          terme: "Le passé au présent",
          texte:
            "sans vous en rendre compte, vous pouvez réagir avec votre analyste comme vous " +
            "le faisiez autrefois avec un parent, un enseignant ou une figure importante de " +
            "votre enfance.",
        },
        {
          terme: "Des émotions variées",
          texte:
            "ce transfert peut être teinté d'affection, de recherche d'approbation " +
            "(transfert positif), ou parfois de méfiance et de frustration (transfert " +
            "négatif).",
        },
      ],
    },
    {
      type: "p",
      texte:
        "En psychanalyse, le transfert n'est pas seulement un obstacle. C'est un outil précieux. Il " +
        "permet de revivre « en direct », dans l'espace protégé du cabinet, des conflits " +
        "intérieurs très anciens, et de commencer à les dénouer.",
      lien: { href: "/psychanalyste-nantes/", libelle: "Comment se déroule une psychanalyse" },
    },

    { type: "h2", texte: "Deux forces complémentaires" },
    {
      type: "p",
      texte:
        "Pour faire une image simple, l'alliance thérapeutique est le navire et le " +
        "transfert est le courant.",
    },
    {
      type: "p",
      texte:
        "Grâce à la solidité du navire (l'alliance consciente), nous pouvons naviguer " +
        "ensemble sur les flots parfois agités de vos émotions inconscientes (le " +
        "transfert). C'est parce que vous savez que le cadre est sûr et que votre " +
        "thérapeute reste à sa juste place — sans juger ni chercher à vous influencer — " +
        "que vous pouvez traverser ces mouvements profonds en sécurité.",
    },
    {
      type: "p",
      texte:
        "Accueillir ce qui se joue dans l'ici et maintenant de la séance, c'est souvent " +
        "faire un premier pas pour s'en dégager.",
    },
  ],
};
