import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 6 »).
 *
 * ⚠️ VOISIN DIRECT DE « Pourquoi je reçois uniquement au cabinet »
 * (`pourquoi-pas-de-visio.ts`), qui parle déjà du trajet comme d'un sas et de
 * la confidentialité du lieu. Publié séparément à la demande de l'agence
 * (2026-09-11). Pour que les deux ne se concurrencent pas :
 *   - l'article existant répond à « pourquoi pas de visio ? » (mot-clé
 *     « consultation psychologue à distance »), réglementation à l'appui ;
 *   - celui-ci dit ce que le lieu APPORTE (mot-clé « séance psychologue en
 *     présentiel »), et renvoie vers l'autre.
 * Il est le dernier de la file : le plus éloigné possible de l'autre.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « C'est la garantie absolue que personne ne peut écouter aux portes »
 *     perd « garantie absolue », et « Une sécurité totale » devient « Un lieu
 *     protégé » : pas d'absolu (§ 8.4) ;
 *   - « (ce qui reste un risque constant derrière un écran à la maison) »
 *     devient « ce qu'un écran, au domicile, ne permet pas toujours
 *     d'assurer » : la formule d'origine visait implicitement les confrères qui
 *     pratiquent la visio (§ 2.2). L'article existant tient la même ligne ;
 *   - « un choix clinique fondamental » et « une composante essentielle du
 *     soin » sont rapportés à SA pratique (« pour moi », « dans ma
 *     pratique ») : la HAS n'exclut a priori aucune situation du télésoin, ce
 *     sont donc des orientations, pas des faits. L'article 24 du Code de
 *     déontologie (« privilégie la rencontre effective ») est cité à l'appui ;
 *   - les renvois « [2] » et « [2, 3] » et la note entre crochets sont retirés.
 */
export const seanceEnPresentiel: Article = {
  slug: "seance-en-presentiel",
  titre: "Sortir de chez soi pour rentrer en soi : la valeur de la séance au cabinet",
  chapeau:
    "Recevoir exclusivement au cabinet n'est pas une habitude technique, c'est un choix " +
    "clinique. Le déplacement jusqu'au cabinet, et le lieu lui-même, font partie du soin.",
  metaTitre: "La valeur de la séance au cabinet",
  publieLe: "2027-04-01",
  modifieLe: "2027-04-01",
  motCle: "séance psychologue en présentiel",
  illustration: {
    src: "/images/macke-promenade-1913.jpg",
    auteur: "August Macke",
    titre: "Promenade",
    annee: "1913",
  },
  sources: [
    {
      titre: "Code de déontologie des psychologues (2021), articles 6 et 24",
      editeur: "CERéDéPsy",
      href: "https://www.codededeontologiedespsychologues.fr/2021/05/20/code-de-deontologie-des-psychologues-2021/",
    },
    {
      titre:
        "Lieux et conditions d'environnement pour la réalisation d'une téléconsultation ou d'un télésoin",
      editeur: "Haute Autorité de santé, recommandation de février 2024",
      href: "https://www.has-sante.fr/upload/docs/application/pdf/2024-03/recommandations_-_lieux_et_conditions_denvironnement_pour_la_realisation_dune_teleconsultation_ou_dun_telesoin.pdf",
    },
    {
      titre: "Séances par téléphone dans le contexte du Covid-19 : le cadre et ses limites",
      editeur: "François Houssier et al., Annales médico-psychologiques, 2020 — PubMed Central",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7274568/",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "À l'ère du tout-numérique, la question des consultations en visioconférence se " +
        "pose fréquemment. Pour moi, maintenir des séances exclusivement en présentiel au " +
        "cabinet n'est pas une simple habitude technique, c'est un choix clinique — celui " +
        "que le Code de déontologie des psychologues invite d'ailleurs à privilégier.",
      lien: {
        href: "/blog/consultation-psychologue-a-distance/",
        libelle: "Pourquoi je reçois uniquement au cabinet",
      },
    },
    {
      type: "p",
      texte:
        "Dans ma pratique, le déplacement géographique et physique du patient est une " +
        "composante à part entière du soin.",
    },

    { type: "h2", texte: "Le trajet : un espace de transition" },
    {
      type: "p",
      texte:
        "Venir au cabinet, c'est s'extraire physiquement de son quotidien : sa maison, son " +
        "travail, ses écrans. Ce temps de trajet, avant et après la séance, remplit une " +
        "fonction psychique précieuse :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Le sas d'entrée",
          texte:
            "le trajet aller permet de quitter ses obligations pour commencer, déjà, à se " +
            "mettre à l'écoute de son monde intérieur.",
        },
        {
          terme: "Le sas de sortie",
          texte:
            "le trajet retour offre un espace pour laisser retomber les émotions de la " +
            "séance avant de replonger dans le tumulte du quotidien.",
        },
      ],
    },

    { type: "h2", texte: "Le cabinet comme tiers protecteur" },
    {
      type: "p",
      texte:
        "Le bureau du thérapeute est un lieu neutre, confidentiel et immuable. " +
        "Contrairement à votre salon ou à votre chambre, aucun objet ici ne vous rappelle " +
        "vos responsabilités ou vos habitudes.",
      lien: { href: "/cabinet-nantes/", libelle: "Le cabinet et son accès" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Un lieu protégé",
          texte:
            "personne ne peut écouter aux portes ni interrompre le fil de votre pensée — ce " +
            "qu'un écran, au domicile, ne permet pas toujours d'assurer.",
        },
        {
          terme: "L'engagement du corps",
          texte:
            "la présence physique face au thérapeute engage le sujet différemment. Le ton de " +
            "la voix, les silences partagés dans une même pièce, le regard : tout cela " +
            "constitue le tissu vivant de la rencontre clinique.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Le cabinet est un espace « hors du monde », conçu pour que vous puissiez déposer " +
        "ce qui est trop lourd, en sécurité.",
    },
  ],
};
