import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 9 »).
 *
 * ANTI-CANNIBALISATION : mot-clé « angoisse », qu'aucune page ne cible —
 * l'anxiété n'y figure que dans des énumérations de motifs.
 *
 * BANDEAU D'URGENCE : oui (§ 2.1, point 5).
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - TITRE : son intertitre, « Face à l'angoisse : écouter la tempête pour
 *     retrouver le calme », promettait un résultat (§ 2.1, point 3). C'est son
 *     titre de proposition qui est retenu ;
 *   - la conclusion « l'angoisse perd sa fonction de signal d'alarme. Le corps
 *     peut alors se détendre et l'esprit retrouver sa clarté » est ramenée à ce
 *     que le travail VISE, pour la même raison ;
 *   - « plus on lutte contre elle, plus elle s'installe » devient « lutter
 *     contre elle tend souvent à la renforcer » : la règle absolue n'est pas
 *     démontrable ;
 *   - un ENCADRÉ EST AJOUTÉ : oppression dans la poitrine, cœur qui s'emballe,
 *     ce sont aussi des signes qui peuvent avoir une cause physique. Un article
 *     de santé ne laisse pas un lecteur conclure seul (§ 2.1, point 4) ;
 *   - « L'angoisse surgit généralement lorsque des émotions… ont été
 *     refoulés » est attribué à la psychanalyse, et précédé de « Ses causes
 *     sont multiples » : les sources institutionnelles (ameli, Psycom)
 *     décrivent des facteurs multiples ;
 *   - un paragraphe final est AJOUTÉ : la HAS fonde le traitement des troubles
 *     anxieux sur les psychothérapies — plusieurs approches — et parfois sur
 *     des médicaments. Sans lui, l'article laissait croire que la parole est la
 *     seule réponse (§ 2.2, pas de comparaison implicite) ;
 *   - la note entre crochets destinée au site est retirée.
 */
export const angoisse: Article = {
  slug: "angoisse",
  titre: "L'angoisse : un signal à décoder, pas un ennemi à fuir",
  chapeau:
    "L'angoisse est une expérience corporelle et psychique intense. Le premier réflexe est " +
    "de vouloir la fuir ou la faire taire. Elle fonctionne pourtant comme un voyant " +
    "d'alarme : elle indique que la pression interne est trop forte.",
  metaTitre: "L'angoisse, un signal à décoder",
  publieLe: "2026-11-15",
  modifieLe: "2026-11-15",
  motCle: "angoisse",
  urgence: true,
  illustration: {
    src: "/images/marc-chevreuils-dans-la-foret-ii-1914.jpg",
    auteur: "Franz Marc",
    titre: "Chevreuils dans la forêt II",
    annee: "1914",
  },
  sources: [
    {
      titre: "Angoisse, anxiété et troubles anxieux graves de l'adulte",
      editeur: "Assurance Maladie (ameli.fr)",
      href: "https://www.ameli.fr/assure/sante/themes/sante-mentale-de-l-adulte/angoisse-anxiete-et-troubles-anxieux-graves-de-l-adulte",
    },
    {
      titre: "Crise d'angoisse aiguë et trouble panique : symptômes, diagnostic, évolution",
      editeur: "Assurance Maladie (ameli.fr)",
      href: "https://www.ameli.fr/assure/sante/themes/trouble-panique/symptomes-diagnostic-evolution",
    },
    {
      titre: "Troubles anxieux et phobies",
      editeur: "Psycom",
      href: "https://www.psycom.org/sinformer/la-sante-mentale/les-troubles-psy/troubles-anxieux-et-phobies/",
    },
    {
      titre: "Quelle place pour les benzodiazépines dans l'anxiété ?",
      editeur: "Haute Autorité de santé",
      href: "https://www.has-sante.fr/jcms/c_2863043/fr/quelle-place-pour-les-benzodiazepines-dans-l-anxiete",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Une oppression dans la poitrine, la gorge nouée, le cœur qui s'emballe, une " +
        "sensation de danger imminent sans objet précis… Face à cette tempête, le premier " +
        "réflexe est de vouloir la fuir, de la masquer ou de la calmer immédiatement par " +
        "tous les moyens.",
    },
    {
      type: "p",
      texte:
        "Pourtant, l'angoisse fonctionne comme le voyant d'alarme d'un système de " +
        "sécurité : elle indique que la pression interne est trop forte.",
    },
    {
      type: "encadre",
      titre: "D'abord, écarter une cause physique",
      texte:
        "Une douleur ou une oppression dans la poitrine, des palpitations, un essoufflement " +
        "peuvent aussi avoir une origine médicale. Si c'est la première fois, ou au moindre " +
        "doute, consultez un médecin — et en cas de malaise, appelez le 15.",
    },

    { type: "h2", texte: "Quand les mots manquent, le corps s'exprime" },
    {
      type: "p",
      texte:
        "Ses causes sont multiples, et les événements de vie y ont leur part. Pour la " +
        "psychanalyse, l'angoisse surgit souvent lorsque des émotions, des désirs ou des " +
        "vérités intérieures ont été trop longtemps refoulés ou ignorés.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Un trop-plein psychique",
          texte:
            "à force de dire « ça va aller » et de serrer les dents, le psychisme sature. " +
            "L'angoisse est le débordement de ce vase trop plein.",
        },
        {
          terme: "Une vérité qui pousse",
          texte:
            "elle peut signaler qu'un changement devient nécessaire dans votre vie, même si " +
            "ce changement fait peur.",
        },
      ],
    },

    { type: "h2", texte: "Le traitement par la parole" },
    {
      type: "p",
      texte:
        "En consultation, nous ne cherchons pas à combattre l'angoisse de front, car " +
        "lutter contre elle tend souvent à la renforcer. Nous faisons un pas de côté :",
      lien: {
        href: "/psychotherapeute-nantes/",
        libelle: "Ce qu'est une psychothérapie par la parole",
      },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Nommer l'innommable",
          texte:
            "mettre des mots précis sur ce qui vous traverse. Transformer la sensation " +
            "physique de panique en une parole construite.",
        },
        {
          terme: "Trouver la source",
          texte:
            "chercher ensemble ce que cette angoisse cherche à protéger ou à dire. À quel " +
            "moment précis est-elle apparue ? À quoi fait-elle écho ?",
        },
      ],
    },
    {
      type: "p",
      texte:
        "C'est en trouvant le chemin des mots que l'angoisse peut, peu à peu, desserrer " +
        "son emprise : ce qu'elle signalait commence alors à pouvoir se dire autrement.",
    },
    {
      type: "p",
      texte:
        "La psychothérapie par la parole n'est pas la seule réponse. Selon la Haute " +
        "Autorité de santé, le traitement de fond des troubles anxieux repose sur les " +
        "psychothérapies, dont plusieurs approches existent, et parfois sur un " +
        "traitement médicamenteux : votre médecin traitant peut vous aider à y voir clair.",
    },
  ],
};
