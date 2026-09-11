import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 4 »).
 *
 * ANTI-CANNIBALISATION : mot-clé « association libre », qu'aucune page ne cible.
 * /psychanalyste-nantes/ n'en donne qu'une définition d'une ligne ; l'article
 * la développe et renvoie vers elle.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - l'intertitre « Pourquoi est-ce si efficace ? » promettait un résultat
 *     (§ 2.1, point 3) : il devient « Pourquoi cette règle ? » ;
 *   - « contourner les défenses de l'esprit pour aller droit à ce qui fait
 *     nœud » devient « ce qui vient, et même ce qui résiste à venir, devient
 *     matière à travail pour approcher ce qui fait nœud ». Promesse d'abord, et
 *     inexactitude ensuite : Freud montre que les résistances se manifestent
 *     DANS l'association, qu'on ne les contourne pas ;
 *   - « un espace de liberté totale » perd « totale » : pas d'absolu ;
 *   - les renvois « [2] » et « [2, 3] » de l'outil qui a produit le texte sont
 *     retirés, ainsi que la note entre crochets destinée au site.
 */
export const associationLibre: Article = {
  slug: "association-libre",
  titre: "L'association libre : la seule règle du jeu en séance",
  chapeau:
    "« Par quoi dois-je commencer ? » En psychanalyse, la réponse est simple mais " +
    "surprenante : par ce que vous voulez, et surtout, dites tout ce qui vous passe par " +
    "l'esprit. C'est la règle fondamentale du travail.",
  metaTitre: "L'association libre en séance",
  publieLe: "2026-12-01",
  modifieLe: "2026-12-01",
  motCle: "association libre",
  illustration: {
    src: "/images/kandinsky-improvisation-26-1912.jpg",
    auteur: "Vassily Kandinsky",
    titre: "Improvisation 26 (Rames)",
    annee: "1912",
  },
  sources: [
    {
      titre: "Cinq leçons sur la psychanalyse",
      editeur: "Sigmund Freud, 1909 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/cinq_lecons_psychanalyse/cinq_lecons/cinq_lecons.html",
    },
    {
      titre: "Ma vie et la psychanalyse",
      editeur: "Sigmund Freud, 1925 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/ma_vie_et_la_psychanalyse/ma_vie.html",
    },
    {
      titre: "Thérapies psychanalytiques (brochure)",
      editeur: "Psycom",
      href: "https://www.psycom.org/wp-content/uploads/2024/04/PSYCOM_Brochures-A5_P_Therapies-psychanalytiques_WEB.pdf",
    },
    {
      titre: "Le procédé et la règle : l'association libre analytique",
      editeur: "Jean-Luc Donnet, Revue française de psychanalyse, 2012 — Cairn",
      href: "https://www.cairn.info/revue-francaise-de-psychanalyse-2012-3-page-695.htm",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Lorsque l'on s'installe pour la première fois en consultation, une question " +
        "revient souvent : « Par quoi dois-je commencer ? ». En psychanalyse, la réponse " +
        "est simple mais surprenante : commencez par ce que vous voulez, et surtout, dites " +
        "tout ce qui vous passe par l'esprit.",
    },
    {
      type: "p",
      texte:
        "C'est ce que l'on appelle l'association libre. C'est la règle fondamentale du " +
        "travail thérapeutique.",
      lien: { href: "/psychanalyste-nantes/", libelle: "La psychanalyse, en quelques mots" },
    },

    { type: "h2", texte: "Renoncer au « bien parler »" },
    {
      type: "p",
      texte:
        "Dans la vie de tous les jours, nous filtrons en permanence nos paroles pour être " +
        "logiques, polis, professionnels ou compris. En séance, nous faisons exactement " +
        "l'inverse. Vous êtes invité à suspendre ce contrôle volontaire :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Accueillir les détails",
          texte:
            "une idée qui vous semble insignifiante, un souvenir d'enfance soudain, une " +
            "remarque sur la météo.",
        },
        {
          terme: "Oser le désordre",
          texte: "passer d'un sujet à un autre sans logique apparente.",
        },
        {
          terme: "Dire l'inconfort",
          texte:
            "partager une pensée qui vous semble ridicule, honteuse, ou même une critique " +
            "envers la séance.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Le cabinet est un espace de liberté où la parole n'est jamais jugée, calibrée ou " +
        "censurée.",
      lien: {
        href: "/blog/secret-professionnel-psychologue/",
        libelle: "Ce que couvre le secret professionnel",
      },
    },

    { type: "h2", texte: "Pourquoi cette règle ?" },
    {
      type: "p",
      texte:
        "Notre pensée consciente est comme la partie visible d'un iceberg. Lorsque vous " +
        "lâchez le fil de la logique rationnelle, l'inconscient prend discrètement le " +
        "relais.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Les chemins de traverse",
          texte:
            "c'est souvent par un saut d'une idée à une autre, apparemment sans lien, que " +
            "se révèlent les connexions cachées de notre souffrance.",
        },
        {
          terme: "La surprise de soi-même",
          texte:
            "en associant librement, le patient finit par dire quelque chose qu'il ne " +
            "savait pas qu'il savait.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "L'association libre n'est pas un bavardage. C'est une méthode rigoureuse : ce qui " +
        "vient, et même ce qui résiste à venir, devient matière à travail pour approcher " +
        "ce qui fait nœud en vous.",
    },
  ],
};
