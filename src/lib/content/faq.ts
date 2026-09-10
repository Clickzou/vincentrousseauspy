import { cabinet, honoraires, horaires, publics } from "@/lib/site-config";

/**
 * SOURCE UNIQUE des questions fréquentes.
 *
 * Le site WordPress portait DEUX FAQ sans recoupement — 12 questions sur
 * l'accueil, 6 autres sur /aide-faq/ — qui se cannibalisaient (« Comment se
 * déroule une première séance » figurait sur les deux). Elles sont ici
 * fusionnées et dédoublonnées en un jeu unique.
 *
 * `surAccueil` sélectionne les questions à forte intention affichées sur la
 * page d'accueil ; la page /aide-faq/ les affiche toutes. Le schéma `FAQPage`
 * n'est déclaré QUE sur /aide-faq/, pour ne pas envoyer à Google deux blocs
 * FAQ concurrents (SEO_MASTER § 7.2, anti-cannibalisation).
 *
 * TROIS QUESTIONS DU SITE ACTUEL ONT ÉTÉ SUPPRIMÉES : « Qui suis-je ? »,
 * « Quels services je propose ? » et « Quelles sont mes spécialités ? ».
 * C'était du remplissage auto-référentiel, et elles renvoyaient vers une
 * « page des services » et une « page à propos » qui n'existent pas. Leur
 * contenu appartient à la page auteur et à /consultations/.
 *
 * ⚠️ RÉVISION DU 2026-09-10 : toutes les réponses ci-dessous sont celles
 * validées par Vincent dans le document « Refonte site internet Vincent
 * Rousseau ». Trois changements de FOND, à ne pas défaire par inadvertance :
 *   - la première séance est GRATUITE ;
 *   - Vincent EST affilié au dispositif « Mon Soutien Psy » ;
 *   - le cabinet n'est PAS de plain-pied (rampe + ascenseur, 2e étage).
 * L'ordre a également changé : « Faut-il une ordonnance ? » suit désormais
 * immédiatement la question du remboursement, les deux traitant de l'accès au
 * dispositif public (demande de Vincent).
 */

/**
 * Une réponse est une suite de blocs : des paragraphes (chaînes) et des listes
 * à puces (`{ liste: [...] }`).
 *
 * Le modèle précédent n'admettait qu'une chaîne. Or la moitié des réponses
 * révisées énumèrent des cas — modalités de règlement, manifestations d'une
 * souffrance, repères d'accès — et les aplatir en un paragraphe unique de dix
 * lignes est précisément ce qui rend une FAQ illisible. Le texte brut reste
 * reconstituable par `reponseEnTexte()` pour le JSON-LD, qui n'accepte, lui,
 * qu'une chaîne.
 */
export type BlocReponse = string | { liste: string[] };

export type Question = {
  question: string;
  reponse: BlocReponse[];
  /** Affichée sur la page d'accueil (sélection à forte intention). */
  surAccueil?: boolean;
};

/**
 * Aplatit une réponse en une chaîne, pour le schéma `FAQPage`.
 * Les puces sont jointes par « ; » : `acceptedAnswer.text` n'admet pas de
 * balisage, et une énumération collée sans séparateur devient illisible pour
 * qui la lit dans un résultat de recherche.
 */
export function reponseEnTexte(reponse: BlocReponse[]): string {
  return reponse
    .map((bloc) => (typeof bloc === "string" ? bloc : `${bloc.liste.join(" ; ")}.`))
    .join(" ");
}

export const QUESTIONS: Question[] = [
  {
    surAccueil: true,
    question: "Quel est le prix d'une séance ?",
    reponse: [
      "La première séance est entièrement gratuite. Elle nous permet de faire " +
        "connaissance et de faire le point sur votre démarche, sans engagement.",
      `Pour les séances suivantes, le tarif se situe entre ${honoraires.min} € et ` +
        `${honoraires.max} €. Le montant exact est adapté aux moyens financiers de ` +
        `chacun : c'est une question que nous abordons ensemble lors de notre premier ` +
        `entretien.`,
      "Modalités de règlement :",
      {
        liste: [
          "Le paiement s'effectue par chèque ou en espèces",
          "Le cabinet ne dispose pas d'un terminal pour la carte bancaire",
        ],
      },
    ],
  },
  {
    surAccueil: true,
    question: "Les séances sont-elles remboursées ?",
    /*
     * ✅ VALIDÉ PAR VINCENT LE 2026-09-10 : il est affilié à « Mon Soutien Psy ».
     * La réponse l'affirme donc, là où la version précédente restait au
     * conditionnel faute de savoir. Les conditions du dispositif changent
     * régulièrement : les vérifier sur ameli.fr à chaque révision, et ne jamais
     * chiffrer ici le nombre de séances — c'est le rôle de la page tarifs, qui
     * porte la date de vérification et les sources.
     */
    reponse: [
      "En cabinet libéral, les consultations de psychologie ne sont pas remboursées " +
        "par le régime général de l'Assurance Maladie. Des solutions de prise en charge " +
        "existent toutefois :",
      {
        liste: [
          "Le dispositif « Mon Soutien Psy » : je suis affilié à ce dispositif public. " +
            "Il vous permet de bénéficier d'une prise en charge de plusieurs séances par " +
            "an si vous remplissez les critères d'éligibilité. Les modalités pratiques et " +
            "les conditions d'accès évoluent régulièrement et sont consultables sur le " +
            "site ameli.fr",
          "Les mutuelles santé : de nombreuses complémentaires prennent en charge tout " +
            "ou partie des séances de psychologie. Je vous invite à vérifier les " +
            "conditions spécifiques de votre contrat auprès de votre mutuelle. Une " +
            "facture vous sera remise sur demande pour vos démarches",
        ],
      },
      "N'hésitez pas à m'interroger sur ces modalités dès notre premier contact.",
    ],
  },
  {
    /* Placée juste après la question du remboursement, à la demande de Vincent :
       les deux traitent de l'accès au dispositif public, et la seconde répond à
       la question que la première fait naître. */
    surAccueil: true,
    question: "Faut-il une ordonnance pour consulter ?",
    reponse: [
      "Non, l'ordonnance n'est pas nécessaire.",
      "L'accès à un psychologue en cabinet libéral se fait de manière directe. C'est " +
        "également le cas pour le dispositif public « Mon Soutien Psy » auquel je suis " +
        "affilié : l'obligation de passer d'abord par un médecin généraliste a été " +
        "supprimée. Vous pouvez donc me contacter directement pour entamer vos démarches.",
    ],
  },
  {
    surAccueil: true,
    question: "Quand faut-il consulter un psychologue ?",
    reponse: [
      "Il est recommandé de consulter dès qu'une souffrance psychique s'installe et " +
        "commence à peser sur votre vie quotidienne. Cela peut se manifester de " +
        "différentes manières :",
      {
        liste: [
          "Sur le plan émotionnel : anxiété, stress, symptômes dépressifs, mal-être diffus",
          "Au quotidien : troubles du sommeil, difficultés alimentaires, sentiment de stagnation",
          "Dans vos relations : conflits familiaux, ruptures, deuil, isolement",
        ],
      },
      "Il n'existe pas de « seuil minimal » de souffrance à atteindre pour légitimer " +
        "une démarche. Ressentir le besoin d'en parler ou se poser simplement la question " +
        "est un motif pleinement suffisant pour prendre rendez-vous.",
    ],
  },
  {
    surAccueil: true,
    question: "Comment se déroule une première séance ?",
    reponse: [
      "C'est avant tout une rencontre, et cette première séance est gratuite. Elle nous " +
        "permet d'éclaircir ensemble votre situation, d'évoquer ce qui vous amène et de " +
        "comprendre vos attentes. C'est aussi le moment où nous définissons la manière " +
        "dont nous travaillerons ensemble.",
      "Vous n'avez pas besoin de préparer vos mots ni de savoir quoi dire à l'avance. " +
        "Le simple fait d'être là suffit, et cette rencontre ne vous engage à rien pour " +
        "la suite.",
    ],
  },
  {
    surAccueil: true,
    question: "Recevez-vous les enfants, les adolescents ou les couples ?",
    reponse: [
      `Mon cabinet est exclusivement dédié à l'accompagnement des ${publics.recus.join(
        " et ",
      )} (à partir de ${publics.ageMinimum} ans). Je ne reçois pas les ` +
        `${publics.nonRecus.join(", les ")}.`,
      "Si votre demande concerne l'un de ces publics, un praticien spécialisé sera plus " +
        "adapté. Votre médecin traitant ou les annuaires professionnels (comme " +
        "l'Assurance Maladie ou les syndicats de psychologues) pourront vous orienter " +
        "vers un confrère ou une consœur.",
    ],
  },
  {
    /* Sur l'accueil : c'est la question qui distingue le mieux la pratique de
       Vincent, et elle prépare le lecteur à ce qu'il trouvera sur
       /psychanalyste-nantes/. Elle correspond au « Comment trouver le psy qui
       vous convient ? » de l'ancien accueil. */
    surAccueil: true,
    question: "Quelle approche thérapeutique me conviendrait le mieux ?",
    reponse: [
      "Il existe plusieurs grands courants en psychothérapie (l'approche " +
        "cognitivo-comportementale, la thérapie systémique, la psychanalyse…). Le choix " +
        "dépend de vos besoins et de vos attentes :",
      {
        liste: [
          "Souhaitez-vous une aide brève et ciblée sur un problème précis ?",
          "Ou préférez-vous un travail de fond qui explore votre histoire pour dénouer " +
            "des blocages profonds ?",
        ],
      },
      "Ma pratique est orientée par la psychanalyse, une méthode qui privilégie le sens " +
        "et le temps long. Si, au cours de nos premiers échanges, il apparaît qu'une " +
        "autre approche serait plus adaptée à votre situation, je vous le dirai en toute " +
        "transparence.",
    ],
  },

  /* ---- Questions présentes uniquement sur /aide-faq/ ---- */

  {
    question: "Comment savoir si j'ai besoin de consulter ?",
    reponse: [
      "Il est souvent difficile de trancher soi-même. Un mal-être qui s'installe, des " +
        "difficultés à surmonter une situation, des scénarios qui se répètent ou le " +
        "sentiment de tourner en rond sont autant de signaux légitimes.",
      "Notre premier entretien — entièrement gratuit — sert précisément à faire le point " +
        "sur votre situation et à évaluer vos besoins, sans aucun engagement de votre part.",
    ],
  },
  {
    question: "Qu'est-ce que la psychothérapie et en quoi peut-elle m'aider ?",
    reponse: [
      "La psychothérapie est un espace d'écoute pour vous aider à comprendre vos " +
        "émotions, vos pensées et vos comportements. Elle permet de traverser une " +
        "souffrance psychique et de trouver de nouvelles manières de vivre plus " +
        "sereinement.",
      "Elle s'adresse à toute personne confrontée à une difficulté précise (un deuil, " +
        "une dépression, des angoisses) comme à un mal-être plus diffus, qui n'est pas " +
        "une maladie mais qui empêche d'avancer.",
    ],
  },
  {
    question: "À quelle fréquence ont lieu les séances, et pendant combien de temps ?",
    reponse: [
      "La fréquence exacte se décide ensemble lors de notre premier rendez-vous gratuit. " +
        "Un travail psychanalytique demande un investissement personnel réel et un rythme " +
        "régulier. C'est pourquoi je propose généralement un rythme d'une séance par " +
        "semaine.",
      "Quant à la durée totale du suivi, elle varie d'une personne à l'autre. Elle ne " +
        "peut pas se fixer à l'avance, mais nous la réévaluons ensemble tout au long de " +
        "votre parcours.",
    ],
  },
  {
    question: "La confidentialité est-elle garantie ?",
    reponse: [
      "Oui, de manière absolue. En tant que psychologue, je suis strictement soumis au " +
        "secret professionnel. Tout ce que vous confiez au sein du cabinet reste " +
        "confidentiel, et le fait même que vous consultiez ne sera jamais communiqué à " +
        "un tiers.",
      "Cette règle éthique protège votre espace de parole et ne connaît que les seules " +
        "exceptions obligatoires prévues par la loi.",
    ],
  },
  {
    question: "Quels types de difficultés peuvent être abordées en consultation ?",
    reponse: [
      "Un travail psychanalytique permet d'accueillir une grande diversité de " +
        "souffrances ou de questionnements. Les motifs les plus fréquents concernent :",
      {
        liste: [
          "La vie émotionnelle et corporelle : l'anxiété, le stress, les symptômes " +
            "dépressifs, les phobies, les troubles obsessionnels, du sommeil ou du " +
            "comportement alimentaire",
          "Le rapport aux autres : les difficultés relationnelles (familiales, " +
            "amoureuses), la dépendance affective, le deuil, l'isolement ou les tensions " +
            "professionnelles",
          "Le rapport à soi et l'existence : un mal-être diffus, le manque de confiance " +
            "en soi, des addictions, des scénarios de vie qui se répètent malgré vous ou " +
            "une perte de sens",
        ],
      },
      "Cette liste n'est pas exhaustive. Ressentir le besoin de parler de votre " +
        "situation, quelle qu'elle soit, est un motif pleinement suffisant pour prendre " +
        "rendez-vous.",
    ],
  },
  {
    question: "Le cabinet est-il accessible aux personnes en situation de handicap ?",
    /* Réponse alimentée par `cabinet.acces.pmr`, source unique : la FAQ et la
       page cabinet ne peuvent plus se contredire.

       ⚠️ La modalité d'accès est désormais connue et précise (rampe, 2e étage,
       ascenseur) : elle vient de Vincent, 2026-09-10. Ne pas la reformuler à la
       baisse — c'est l'information qui décide du déplacement. */
    reponse: cabinet.acces.pmr
      ? [cabinet.acces.pmr.resume, cabinet.acces.pmr.detail]
      : ["Appelez-moi avant votre venue : je vous décrirai précisément l'accès."],
  },
  {
    question: "Où se trouve le cabinet et quand puis-je venir ?",
    reponse: [
      `Le cabinet se situe au ${cabinet.rue}, ${cabinet.codePostal} ${cabinet.ville}.`,
      "Pour vous repérer et venir :",
      {
        liste: [
          `Localisation : ${cabinet.acces.reperes}`,
          `Tramway : ${cabinet.acces.tram}`,
          `Stationnement : ${cabinet.acces.stationnement}`,
        ],
      },
      "Les horaires d'accueil :",
      {
        liste: [`${horaires.libelle}`, `${horaires.modalite}`],
      },
    ],
  },
];

/** Sélection affichée sur la page d'accueil. */
export const QUESTIONS_ACCUEIL = QUESTIONS.filter((q) => q.surAccueil);
