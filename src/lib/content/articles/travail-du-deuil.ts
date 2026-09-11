import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 11 »).
 *
 * ANTI-CANNIBALISATION : mot-clé « travail du deuil », qu'aucune page ne cible.
 * Le deuil n'apparaît sur le site que dans des énumérations.
 *
 * BANDEAU D'URGENCE : oui. Un deuil peut se compliquer d'une dépression, et le
 * lecteur qui cherche ces mots peut aller mal (§ 2.1, point 5).
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « faire semblant d'aller bien bloque le processus » devient « peut
 *     l'entraver » : l'affirmation absolue n'est pas démontrable ;
 *   - un paragraphe d'orientation est AJOUTÉ en fin d'article : quand le deuil
 *     ne s'allège pas, consulter. Un contenu de santé oriente, il ne conclut
 *     pas (§ 2.1, point 4) ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const travailDuDeuil: Article = {
  slug: "travail-du-deuil",
  titre: "Traverser l'absence : le travail du deuil en thérapie",
  chapeau:
    "Perdre un être cher, traverser une séparation ou renoncer à un projet de vie " +
    "bouleverse nos fondations. Le deuil n'est pas une maladie : c'est un processus " +
    "psychique normal, mais particulièrement exigeant.",
  metaTitre: "Le travail du deuil en thérapie",
  publieLe: "2026-10-15",
  modifieLe: "2026-10-15",
  motCle: "travail du deuil",
  urgence: true,
  illustration: {
    src: "/images/hammershoi-repos-1905.jpg",
    auteur: "Vilhelm Hammershøi",
    titre: "Repos",
    annee: "1905",
  },
  sources: [
    {
      titre: "Après la mort, le deuil",
      editeur: "Centre national fin de vie – soins palliatifs (parlons-fin-de-vie.fr)",
      href: "https://www.parlons-fin-de-vie.fr/je-suis-un-proche/deuil/",
    },
    {
      titre: "Comment traverser ce deuil ?",
      editeur: "3114, numéro national de prévention du suicide",
      href: "https://3114.fr/je-suis-eprouve-par-un-suicide/comment-traverser-ce-deuil/",
    },
    {
      titre: "Deuil et mélancolie",
      editeur: "Sigmund Freud, 1917, dans Métapsychologie, Flammarion — Cairn",
      href: "https://shs.cairn.info/metapsychologie--9782081494077-page-123?lang=fr",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Perdre un être cher, traverser une séparation amoureuse ou devoir renoncer à un " +
        "projet de vie sont des épreuves qui bouleversent nos fondations. Le monde " +
        "extérieur continue de tourner, mais à l'intérieur, tout s'est arrêté.",
    },
    {
      type: "p",
      texte:
        "Le deuil n'est pas une maladie, c'est un processus psychique normal, mais " +
        "particulièrement exigeant.",
    },

    { type: "h2", texte: "Un chemin qui n'est pas une ligne droite" },
    {
      type: "p",
      texte:
        "On imagine souvent le deuil comme une suite d'étapes bien ordonnées à cocher. La " +
        "réalité clinique est bien différente :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Les vagues émotionnelles",
          texte:
            "le deuil est fait de mouvements de va-et-vient, entre la colère, la tristesse " +
            "profonde, le déni et des moments d'accalmie.",
        },
        {
          terme: "Le poids du temps",
          texte:
            "il n'y a pas de « durée normale » pour faire un deuil. Vouloir aller trop vite " +
            "ou faire semblant d'aller bien peut entraver le processus.",
        },
      ],
    },

    { type: "h2", texte: "Ce que signifie « faire son deuil »" },
    {
      type: "p",
      texte: "En psychanalyse, faire son deuil ne signifie pas oublier ou effacer le passé.",
      lien: { href: "/psychanalyste-nantes/", libelle: "Ce qu'est la psychanalyse" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Détacher l'énergie",
          texte:
            "c'est accepter de détacher progressivement l'énergie d'amour ou " +
            "d'investissement de ce qui n'est plus là, pour pouvoir, un jour, la réinvestir " +
            "ailleurs.",
        },
        {
          terme: "Une nouvelle place",
          texte:
            "c'est réussir à donner une juste place au souvenir dans son histoire, une " +
            "place qui n'empêche plus de vivre au présent.",
        },
      ],
    },

    { type: "h2", texte: "Un espace pour le deuil" },
    {
      type: "p",
      texte:
        "Le cabinet du psychologue offre cet espace où toutes les émotions du deuil " +
        "peuvent être déposées, criées ou pleurées, sans la pression de l'entourage qui " +
        "pousse souvent à « tourner la page » trop vite.",
    },
    {
      type: "encadre",
      titre: "Quand consulter",
      texte:
        "Si, au fil des mois, la douleur ne s'allège pas, si elle empêche de dormir, de " +
        "travailler ou de voir quiconque, ou si l'idée de rejoindre la personne disparue " +
        "vous traverse, n'attendez pas : parlez-en à votre médecin ou à un psychologue. " +
        "Les numéros ci-dessous répondent à toute heure.",
    },
  ],
};
