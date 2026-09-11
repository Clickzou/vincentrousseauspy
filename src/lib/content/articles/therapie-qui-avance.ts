import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 5 »). Sa note le destinait à un renvoi depuis la page tarifs :
 * c'est le lien que l'article porte dans l'autre sens, en attendant.
 *
 * ANTI-CANNIBALISATION : mot-clé « thérapie qui avance », qu'aucune page ne
 * cible. La formule « devenir un peu plus soi-même » a quitté
 * /psychologue-clinicien-nantes/ le même jour (variante 1 du document
 * « Pourquoi consulter ») : l'article en est désormais le seul porteur.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « réussie » est retiré du titre (« …la trajectoire d'une thérapie
 *     réussie ») et de la conclusion (« Une thérapie est réussie lorsque… »
 *     devient « Une thérapie avance lorsque… ») : l'article décrit des repères,
 *     pas un succès que l'on pourrait garantir (§ 2.1). Son titre de
 *     proposition, « Qu'est-ce qu'un bon travail thérapeutique ? », reste
 *     disponible s'il préfère ;
 *   - l'intitulé « La fin des répétitions » devient « Des répétitions qui se
 *     desserrent », et « on devient capable » devient « on peut devenir
 *     capable » : la fin des répétitions n'est pas une issue que l'on peut
 *     promettre (§ 2.1) ;
 *   - « Le travail analytique produit des transformations » devient « peut
 *     produire », pour la même raison ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const therapieQuiAvance: Article = {
  slug: "therapie-qui-avance",
  titre: "Devenir un peu plus soi-même : la trajectoire d'une thérapie",
  chapeau:
    "À quoi reconnaît-on qu'une thérapie avance ? Pas à l'absence totale de tristesse, ni " +
    "à une vie sans conflits. Plutôt à ceci : se soigner en devenant un peu plus soi-même.",
  metaTitre: "À quoi reconnaître qu'une thérapie avance",
  publieLe: "2027-03-15",
  modifieLe: "2027-03-15",
  motCle: "thérapie qui avance",
  illustration: {
    src: "/images/matisse-fenetre-ouverte-collioure-1905.jpg",
    auteur: "Henri Matisse",
    titre: "La Fenêtre ouverte, Collioure",
    annee: "1905",
  },
  sources: [
    {
      titre: "Thérapies psychanalytiques (brochure)",
      editeur: "Psycom",
      href: "https://www.psycom.org/wp-content/uploads/2024/04/PSYCOM_Brochures-A5_P_Therapies-psychanalytiques_WEB.pdf",
    },
    {
      titre: "Les psychothérapies",
      editeur: "Psycom",
      href: "https://www.psycom.org/sinformer/le-retablissement/les-psychotherapies/",
    },
    {
      titre: "Au-delà du principe de plaisir",
      editeur: "Sigmund Freud, 1920 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/essais_de_psychanalyse/Essai_1_au_dela/au_dela_prin_plaisir.html",
    },
    {
      titre: "Introduction à la psychanalyse, 27e leçon : « Le transfert »",
      editeur: "Sigmund Freud, 1916-1917 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/intro_a_la_psychanalyse/intro_psychanalyse.html",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "À quoi reconnaît-on qu'une thérapie avance ? Est-ce l'absence totale de " +
        "tristesse ? Une vie parfaitement lisse et sans conflits ?",
    },
    {
      type: "p",
      texte:
        "Pas tout à fait. Une thérapie ne transforme pas votre personnalité en un idéal de " +
        "magazine. Le véritable traitement consiste plutôt à se soigner en devenant un peu " +
        "plus soi-même.",
    },

    { type: "h2", texte: "Les repères du changement" },
    {
      type: "p",
      texte:
        "Le travail analytique peut produire des transformations subtiles mais profondes " +
        "au fil des séances :",
      lien: { href: "/psychanalyste-nantes/", libelle: "Une thérapie dite « de fond »" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Des répétitions qui se desserrent",
          texte:
            "on commence à repérer les scénarios, amoureux ou professionnels, que l'on " +
            "rejouait malgré soi, et l'on peut devenir capable de choisir une autre issue.",
        },
        {
          terme: "L'allègement de la culpabilité",
          texte:
            "on apprend à faire la part entre ce qui nous appartient et le poids des " +
            "attentes inconscientes de notre entourage ou de notre histoire familiale.",
        },
        {
          terme: "Une meilleure relation à ses émotions",
          texte:
            "l'angoisse ou la tristesse ne disparaissent pas magiquement de la condition " +
            "humaine, mais elles peuvent cesser de vous submerger. Vous apprenez à les " +
            "traverser sans être paralysé.",
        },
      ],
    },

    { type: "h2", texte: "Un processus qui demande du temps" },
    {
      type: "p",
      texte:
        "Le changement psychique n'est pas linéaire. Il connaît des moments de stagnation, " +
        "des prises de conscience fulgurantes, et parfois de légers pas en arrière.",
      lien: {
        href: "/tarifs-et-remboursement/",
        libelle: "Ce que représente un suivi dans le temps",
      },
    },
    {
      type: "p",
      texte:
        "Une thérapie avance lorsque vous quittez le statut de « victime passive » de vos " +
        "symptômes pour devenir le sujet actif de votre propre vie. Le but n'est pas de " +
        "corriger une anomalie, mais de vous réapproprier votre propre histoire et de " +
        "gagner une authentique liberté de choix.",
    },
  ],
};
