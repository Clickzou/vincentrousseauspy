import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 7 »). Format « réponse argumentée à une idée reçue » (§ 7.3).
 *
 * ANTI-CANNIBALISATION : mot-clé « parler de son enfance en thérapie »,
 * qu'aucune page ne cible.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - la conclusion « vous cessez de subir l'histoire familiale. Vous reprenez
 *     la plume pour écrire la suite en toute liberté » passe au conditionnel du
 *     possible (« vous pouvez… ») : c'est un chemin, pas une issue promise
 *     (§ 2.1) ;
 *   - « Souvent, c'est la blessure de l'enfant qui se réactive » devient « Il
 *     arrive que… » : hypothèse clinique, pas un fait de fréquence établi ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const enfancePsychanalyse: Article = {
  slug: "enfance-psychanalyse",
  titre: "Regarder en arrière pour avancer : la place de l'enfance dans la cure",
  chapeau:
    "« Pourquoi remuer le passé ? Je veux régler mes problèmes d'aujourd'hui ! » La " +
    "réaction est légitime. Si le travail thérapeutique fait une place à l'enfance, ce " +
    "n'est pas par nostalgie : c'est que notre passé est encore vivant dans notre présent.",
  metaTitre: "Pourquoi parler de son enfance en thérapie",
  metaDescription:
    "« Pourquoi remuer le passé ? » Si la thérapie fait une place à l'enfance, ce n'est " +
    "pas par nostalgie : notre passé est encore vivant dans notre présent.",
  publieLe: "2027-02-01",
  modifieLe: "2027-02-01",
  motCle: "parler de son enfance en thérapie",
  illustration: {
    src: "/images/vallotton-le-ballon-1899.jpg",
    auteur: "Félix Vallotton",
    titre: "Le Ballon",
    annee: "1899",
  },
  sources: [
    {
      titre: "Cinq leçons sur la psychanalyse",
      editeur: "Sigmund Freud, 1909 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/cinq_lecons_psychanalyse/cinq_lecons/cinq_lecons.html",
    },
    {
      titre: "Thérapies psychanalytiques (brochure)",
      editeur: "Psycom",
      href: "https://www.psycom.org/wp-content/uploads/2024/04/PSYCOM_Brochures-A5_P_Therapies-psychanalytiques_WEB.pdf",
    },
    {
      titre: "Les 1 000 premiers jours de l'enfant",
      editeur: "Assurance Maladie (ameli.fr)",
      href: "https://www.ameli.fr/assure/sante/enfants/1000-premiers-jours",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "C'est une remarque que l'on entend souvent : « Pourquoi remuer le passé ? Ce qui " +
        "est fait est fait, je veux régler mes problèmes d'aujourd'hui ! ». Cette réaction " +
        "est tout à fait légitime.",
    },
    {
      type: "p",
      texte:
        "Pourtant, si le travail thérapeutique accorde une place importante à votre " +
        "histoire d'enfant, ce n'est pas par nostalgie. C'est parce que notre passé est " +
        "encore bien vivant dans notre présent.",
      lien: { href: "/psychanalyste-nantes/", libelle: "Ce que l'on écoute en séance" },
    },

    { type: "h2", texte: "Le grand livre de nos premières fois" },
    {
      type: "p",
      texte:
        "L'enfance est la période où se construisent nos fondations psychiques. C'est à ce " +
        "moment-là que nous écrivons nos premiers modes d'emploi de la vie :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Les modèles relationnels",
          texte:
            "c'est dans nos premières relations (parents, frères et sœurs, école) que nous " +
            "apprenons ce qu'est l'amour, la sécurité, la confiance ou le rejet.",
        },
        {
          terme: "Les croyances sur soi-même",
          texte:
            "une phrase entendue, un secret de famille ou un événement mal compris par " +
            "l'enfant peuvent devenir des vérités absolues qui guident l'adulte à son insu " +
            "(« je ne vaux rien », « je dois être parfait pour être aimé »).",
        },
      ],
    },

    { type: "h2", texte: "Libérer l'adulte d'aujourd'hui" },
    {
      type: "p",
      texte:
        "Parler de son enfance en séance ne sert pas à chercher des coupables ou à " +
        "s'enfermer dans des regrets. Le but est tout autre :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Éclairer le présent",
          texte:
            "comprendre pourquoi une situation actuelle — un conflit avec un collègue, une " +
            "rupture — déclenche une tempête émotionnelle disproportionnée. Il arrive que ce " +
            "soit la blessure de l'enfant qui se réactive.",
        },
        {
          terme: "Mettre des mots d'adulte sur des vécus d'enfant",
          texte:
            "l'enfant subit les événements avec ses outils de l'époque. L'adulte que vous " +
            "êtes aujourd'hui peut relire cette histoire avec une nouvelle maturité.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "En acceptant de déplier ces premiers chapitres de votre vie, vous pouvez cesser " +
        "de subir l'histoire familiale, et reprendre la plume pour en écrire la suite.",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Ce qui amène à consulter",
      },
    },
  ],
};
