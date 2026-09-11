import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 12 »).
 *
 * ANTI-CANNIBALISATION : mot-clé « estime de soi », qu'aucune page ne cible.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - le texte s'arrêtait sur une liste. Une phrase de clôture est reprise de
 *     son introduction de section (« vous réconcilier avec votre propre
 *     humanité ») pour qu'il ne s'achève pas sur une puce ;
 *   - « ne se règle pas à coups de pensée positive » devient « pas
 *     seulement » : d'autres approches reconnues travaillent l'estime de soi,
 *     et la phrase d'origine les écartait (§ 2.2) ;
 *   - « s'est construite dans l'enfance » devient « s'est d'abord
 *     construite » : elle évolue aussi plus tard ;
 *   - « Sortir du syndrome de l'imposteur » devient « desserrer le sentiment
 *     d'imposture » : ce n'est pas un diagnostic, et « sortir » promettait
 *     une issue ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const estimeDeSoi: Article = {
  slug: "estime-de-soi",
  titre: "Au-delà du regard des autres : consolider l'estime de soi",
  chapeau:
    "« Je n'y arriverai pas », « Je ne suis pas à la hauteur »… Le manque d'estime de soi " +
    "est une souffrance diffuse. Elle ne se règle pas à coups de pensée positive : c'est " +
    "une structure interne plus profonde.",
  metaTitre: "Consolider l'estime de soi",
  publieLe: "2027-01-15",
  modifieLe: "2027-01-15",
  motCle: "estime de soi",
  illustration: {
    src: "/images/jawlensky-schokko-au-chapeau-1910.jpg",
    auteur: "Alexej von Jawlensky",
    titre: "Schokko au chapeau à large bord",
    annee: "1910",
  },
  /* Aucune source institutionnelle ne traite l'estime de soi sous cet angle
     (recherche du 2026-09-11 : Psycom ne l'aborde qu'en passant, pour mettre
     en garde contre les ateliers de développement personnel). Trois sources
     psychanalytiques, dont deux revues à comité de lecture. */
  sources: [
    {
      titre: "Le moi et le ça",
      editeur: "Sigmund Freud, 1923 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund_1/essais_de_psychanalyse/Essai_3_moi_et_ca/moi_et_ca.html",
    },
    {
      titre: "L'imposteur : entre pathologie et normalité",
      editeur: "Revue française de psychanalyse, 2015 — Cairn",
      href: "https://www.cairn.info/revue-francaise-de-psychanalyse-2015-1-page-120.htm",
    },
    {
      titre: "Légèreté d'être et estime de soi",
      editeur: "Travailler, 2003 — Cairn",
      href: "https://www.cairn.info/revue-travailler-2003-2-page-77.htm",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Le manque d'estime de soi est une souffrance diffuse qui gâche le quotidien. " +
        "C'est cette petite voix intérieure qui répète : « Je n'y arriverai pas », « Je ne " +
        "suis pas à la hauteur », « Si les gens savaient qui je suis vraiment… ».",
    },
    {
      type: "p",
      texte:
        "Contrairement à ce que l'on pense, l'estime de soi ne se règle pas seulement à " +
        "coups de « pensée positive » ou de défis personnels. C'est une structure interne " +
        "plus profonde.",
    },

    { type: "h2", texte: "Les racines de la valeur personnelle" },
    {
      type: "p",
      texte:
        "L'estime de soi s'est d'abord construite dans l'enfance, à travers les premiers " +
        "regards portés sur nous :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Le miroir parental",
          texte:
            "c'est la façon dont nos premières figures d'attachement ont valorisé (ou non) " +
            "nos réussites et accueilli nos faiblesses.",
        },
        {
          terme: "L'idéal tyrannique",
          texte:
            "parfois, nous nous fixons des objectifs inconscients si élevés qu'il devient " +
            "impossible de les atteindre, ce qui entretient un sentiment permanent d'échec.",
        },
      ],
    },

    { type: "h2", texte: "Restaurer le lien avec soi-même" },
    {
      type: "p",
      texte:
        "Le travail analytique ne cherche pas à faire de vous quelqu'un de parfait, mais à " +
        "vous réconcilier avec votre propre humanité :",
      lien: { href: "/psychanalyste-nantes/", libelle: "Ce qu'est la psychanalyse" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Désamorcer le juge intérieur",
          texte:
            "comprendre d'où vient cette sévérité excessive envers vous-même : à qui " +
            "appartient cette voix qui vous critique ?",
        },
        {
          terme: "Séparer l'être et le faire",
          texte:
            "apprendre qu'une erreur ou un échec ne définit pas votre valeur en tant que " +
            "personne.",
        },
        {
          terme: "S'approprier ses réussites",
          texte:
            "desserrer le sentiment d'imposture en acceptant de reconnaître vos propres " +
            "compétences et vos désirs légitimes.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Il ne s'agit pas de devenir quelqu'un d'autre, mais de cesser de se regarder " +
        "avec les yeux les plus sévères.",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Pourquoi consulter un psychologue clinicien",
      },
    },
  ],
};
