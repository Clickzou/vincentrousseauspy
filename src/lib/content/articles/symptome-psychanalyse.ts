import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Écrit 1 »).
 *
 * ⚠️ PROCHE DE /psychologue-clinicien-nantes/, qui traite aussi du symptôme
 * comme message. Le cloisonnement tient ainsi : la page dit QUAND consulter
 * (le moment où le compromis ne tient plus), l'article explique CE QU'EST un
 * symptôme et comment on le travaille. Mot-clé « symptôme psychanalyse », que
 * la page ne cible pas. À sa publication, ajouter depuis la page un lien vers
 * l'article, comme le suggérait Vincent (« bouton de renvoi depuis la section
 * Pourquoi consulter ? ») — pas avant : un contenu publié ne pointe jamais vers
 * un brouillon (§ 5).
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - TITRE : son intertitre, « L'énigme du symptôme : quand le corps et
 *     l'esprit tirent la sonnette d'alarme », est conservé en titre de page ;
 *     la version courte pour Google reprend son titre de proposition ;
 *   - « le symptôme perd de son utilité et peut enfin s'alléger » devient « peut
 *     perdre de sa nécessité et s'alléger » : c'est une possibilité, pas une
 *     issue garantie (§ 2.1) ;
 *   - « le symptôme est d'abord une tentative de guérison » est attribué à la
 *     psychanalyse (« pour la psychanalyse… ce que Freud appelait une
 *     formation de compromis ») : c'est une thèse, pas un fait établi ;
 *   - l'insomnie et la fatigue peuvent avoir une cause physique : une phrase
 *     d'orientation médicale est ajoutée (§ 2.1, point 4) ;
 *   - la métaphore du voyant d'essence est précédée de « Soulager un symptôme
 *     est légitime, et parfois urgent ». Seule, elle dévalorisait les
 *     traitements du symptôme — médicaments, thérapies brèves —, recommandés
 *     dans certains troubles : c'est de la comparaison implicite (§ 2.2) ;
 *   - la puce vide du document et la note entre crochets sont retirées.
 */
export const symptomePsychanalyse: Article = {
  slug: "symptome-psychanalyse",
  titre: "L'énigme du symptôme : quand le corps et l'esprit tirent la sonnette d'alarme",
  chapeau:
    "Le symptôme est souvent vécu comme un ennemi, un grain de sable qui grippe la machine " +
    "du quotidien. En psychanalyse, ce n'est pas une simple panne à réparer : c'est un " +
    "message crypté.",
  metaTitre: "Le symptôme, une parole à délivrer",
  publieLe: "2027-03-01",
  modifieLe: "2027-03-01",
  motCle: "symptôme psychanalyse",
  illustration: {
    src: "/images/klee-einst-dem-grau-der-nacht-1918.jpg",
    auteur: "Paul Klee",
    titre: "Jadis surgi du gris de la nuit…",
    annee: "1918",
  },
  sources: [
    {
      titre: "Introduction à la psychanalyse, 23e leçon : « Les modes de formation de symptômes »",
      editeur: "Sigmund Freud, 1916-1917 — Les Classiques des sciences sociales",
      href: "https://classiques.uqam.ca/classiques/freud_sigmund/intro_a_la_psychanalyse/intro_psychanalyse.html",
    },
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
  ],
  corps: [
    {
      type: "p",
      texte:
        "L'anxiété qui paralyse, la tristesse qui s'installe sans raison apparente, un " +
        "rituel dont on ne peut plus se passer ou la répétition des mêmes échecs " +
        "amoureux… Ce que la psychologie nomme « symptôme » est souvent vécu comme un " +
        "ennemi, un grain de sable qui vient gripper la machine de notre quotidien.",
    },
    {
      type: "p",
      texte:
        "Pourtant, en psychanalyse, le symptôme n'est pas une simple panne à réparer. " +
        "C'est un message crypté.",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Le moment où le symptôme ne tient plus",
      },
    },

    { type: "h2", texte: "Une solution qui fait souffrir" },
    {
      type: "p",
      texte:
        "Aussi surprenant que cela puisse paraître, le symptôme est, pour la psychanalyse, " +
        "d'abord une tentative de guérison de notre inconscient — ce que Freud appelait " +
        "une formation de compromis. C'est la moins mauvaise solution que notre " +
        "psychisme a trouvée, à un moment donné de notre histoire, pour faire face à un " +
        "conflit intérieur ou à une souffrance trop grande pour être verbalisée.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Un langage de substitution",
          texte:
            "ce qui ne peut pas se dire avec des mots finit par s'exprimer par des maux " +
            "(angoisse, insomnie, TOC, fatigue). Ces signes peuvent aussi avoir une cause " +
            "physique : un avis médical reste le premier réflexe.",
        },
        {
          terme: "Une vérité cachée",
          texte:
            "le symptôme protège une partie de nous-mêmes tout en signalant que quelque " +
            "chose ne va pas.",
        },
      ],
    },

    { type: "h2", texte: "Le travail de la cure : traduire plutôt que faire taire" },
    {
      type: "p",
      texte:
        "Soulager un symptôme est légitime, et parfois urgent. Mais vouloir le faire taire " +
        "sans jamais chercher à savoir d'où il vient, c'est comme couper le fil du voyant " +
        "d'essence sur un tableau de bord : le voyant s'éteint, mais la panne de moteur " +
        "couve toujours.",
    },
    {
      type: "p",
      texte:
        "Le rôle de la psychothérapie par la parole n'est pas de vous forcer à « rentrer " +
        "dans le rang », mais de vous aider à traduire ce message :",
      lien: { href: "/psychanalyste-nantes/", libelle: "Transformer la plainte en question" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Prendre le temps d'écouter",
          texte: "donner une place à cette souffrance sans la juger.",
        },
        {
          terme: "Retrouver le fil de son histoire",
          texte: "comprendre à quel moment et pourquoi ce symptôme est devenu nécessaire.",
        },
        {
          terme: "Inventer d'autres issues",
          texte:
            "une fois le message entendu et mis en mots, le symptôme peut perdre de sa " +
            "nécessité et s'alléger, laissant la place à une parole plus libre.",
        },
      ],
    },
  ],
};
