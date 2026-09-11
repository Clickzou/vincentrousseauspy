import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Écrit 2 »). Premier de la file : il lève un frein à la première séance
 * (« que vais-je dire ? »), le format le plus utile du § 7.3.
 *
 * ANTI-CANNIBALISATION : mot-clé « silence en séance psychologue », qu'aucune
 * page ne cible. /consultations/ décrit la première séance sans en parler.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - le titre de proposition (« L'importance du silence en séance ») sert de
 *     titre court pour Google, l'intertitre de Vincent reste le titre de page ;
 *   - « un formidable moteur de liberté intérieure » perd « formidable » : pas
 *     de superlatif (§ 8.4) ;
 *   - « le silence n'est jamais un vide » perd son « jamais » : Freud rattache
 *     aussi certains arrêts de la parole à la résistance (Cinq leçons, 2e) ;
 *   - « le conscient passe le relais à l'inconscient » devient « la pensée
 *     cesse de se diriger et se laisse aller » : la formule d'origine ne se
 *     retrouve dans aucune source et simplifie à l'excès ;
 *   - la note entre crochets destinée au site (« Ce texte lève le voile… ») est
 *     retirée, comme toutes les notes de ce type.
 */
export const silenceEnSeance: Article = {
  slug: "silence-en-seance",
  titre: "Apprivoiser le silence : pourquoi on se tait (parfois) chez le psychologue",
  chapeau:
    "Lors des premières séances, la perspective d'un silence peut impressionner. « Que " +
    "vais-je dire ? », « Et si je n'ai plus d'idées ? » Pourtant, en séance, le silence " +
    "n'est pas un vide : c'est un espace de travail à part entière.",
  metaTitre: "Le silence en séance chez le psychologue",
  publieLe: "2026-10-01",
  modifieLe: "2026-10-01",
  motCle: "silence en séance psychologue",
  illustration: {
    src: "/images/hammershoi-portes-ouvertes-1905.jpg",
    auteur: "Vilhelm Hammershøi",
    titre: "Portes ouvertes (Portes blanches)",
    annee: "1905",
  },
  sources: [
    {
      titre: "Cinq leçons sur la psychanalyse",
      editeur: "Sigmund Freud, 1909 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/cinq_lecons_psychanalyse/cinq_lecons/cinq_lecons.html",
    },
    {
      titre: "Le silence du psychanalyste",
      editeur: "Évelyne Sechaud, Revue française de psychanalyse, 2018 — Cairn",
      href: "https://shs.cairn.info/revue-francaise-de-psychanalyse-2018-1-page-89?lang=fr",
    },
    {
      titre: "De l'« attention flottante » de Freud à l'« expression associative » de Marty",
      editeur: "César Botella, Revue française de psychosomatique, 2014 — Cairn",
      href: "https://shs.cairn.info/revue-francaise-de-psychosomatique-2014-1-page-83?lang=fr",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Dans un monde où tout va très vite et où le vide doit être immédiatement comblé " +
        "par du bruit ou des écrans, le cabinet du psychologue fait figure d'exception. " +
        "Il est normal que le silence y impressionne au début : on n'a pas l'habitude " +
        "qu'il soit permis.",
      lien: { href: "/consultations/", libelle: "Comment se déroule une première séance" },
    },

    { type: "h2", texte: "Les différents visages du silence" },
    {
      type: "p",
      texte:
        "Il y a autant de silences que de moments dans une thérapie. Loin d'être un temps " +
        "mort, le silence est habité :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Le silence de réflexion",
          texte:
            "c'est le moment où une parole, une question ou un souvenir vient de résonner. " +
            "On s'arrête pour mesurer l'impact de ce qui vient d'être dit.",
        },
        {
          terme: "Le silence de l'émotion",
          texte:
            "parfois, les mots coupent le fil parce que l'émotion est trop intense. Ce " +
            "silence a besoin d'être accueilli et respecté dans le cadre sécurisant du " +
            "cabinet.",
        },
        {
          terme: "Le silence de transition",
          texte:
            "c'est le moment où la pensée cesse de se diriger et se laisse aller. C'est " +
            "souvent de ce calme que surgit une pensée inattendue, un rêve oublié ou un " +
            "lapsus révélateur.",
        },
      ],
    },

    { type: "h2", texte: "Le rôle de l'analyste" },
    {
      type: "p",
      texte:
        "Le silence du thérapeute n'est ni du désintérêt ni de la froideur. C'est une " +
        "écoute flottante et bienveillante. En ne comblant pas le vide par des conseils " +
        "préconçus ou du bavardage quotidien, le praticien vous laisse tout l'espace " +
        "nécessaire pour que votre propre vérité puisse émerger.",
      lien: {
        href: "/psychanalyste-nantes/",
        libelle: "Ce que l'on écoute en séance",
      },
    },

    { type: "h2", texte: "Le droit de ne pas savoir quoi dire" },
    {
      type: "p",
      texte:
        "Venir en consultation, c'est aussi s'accorder le droit de ne pas savoir quoi " +
        "dire, de chercher ses mots, et de découvrir que le silence, lorsqu'il est partagé " +
        "en toute confiance, n'est plus une source d'angoisse, mais un moteur de liberté " +
        "intérieure.",
    },
  ],
};
