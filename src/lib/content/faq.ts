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
 */

export type Question = {
  question: string;
  reponse: string;
  /** Affichée sur la page d'accueil (sélection à forte intention). */
  surAccueil?: boolean;
};

export const QUESTIONS: Question[] = [
  {
    surAccueil: true,
    question: "Quel est le prix d'une séance ?",
    reponse:
      `Comptez entre ${honoraires.min} et ${honoraires.max} € la séance. ` +
      `${honoraires.modulation} Cette question fait partie de ce dont nous parlons ` +
      `lors du premier entretien. Le règlement se fait par chèque ou en espèces ; ` +
      `je n'accepte pas la carte bancaire.`,
  },
  {
    surAccueil: true,
    question: "Les séances sont-elles remboursées ?",
    /*
     * ATTENTION — À VALIDER AVEC VINCENT AVANT PUBLICATION.
     * Le dispositif « Mon soutien psy » suppose que le psychologue soit
     * partenaire du dispositif. On ne sait pas si c'est le cas de Vincent :
     * la réponse ci-dessous décrit donc la situation sans l'affirmer.
     * Les conditions du dispositif changent régulièrement : vérifier sur
     * ameli.fr à chaque révision (SEO_MASTER § 4, silo « pratique »).
     */
    reponse:
      "L'Assurance Maladie ne rembourse pas les consultations de psychologue en " +
      "libéral au titre du régime général. En revanche, de nombreuses mutuelles " +
      "prennent en charge tout ou partie des séances : c'est à vérifier auprès de la " +
      "vôtre, contrat en main. Il existe par ailleurs un dispositif public, " +
      "« Mon soutien psy », qui permet une prise en charge de séances chez les " +
      "psychologues partenaires du dispositif ; ses conditions évoluent régulièrement " +
      "et sont détaillées sur ameli.fr. N'hésitez pas à m'interroger sur ce point " +
      "avant de prendre rendez-vous.",
  },
  {
    surAccueil: true,
    question: "Quand faut-il consulter un psychologue ?",
    reponse:
      "Lorsqu'une souffrance psychique s'installe et retentit sur la vie quotidienne : " +
      "anxiété, symptômes dépressifs, troubles du sommeil, difficultés relationnelles, " +
      "situation de deuil, sentiment de mal-être persistant. Il n'existe pas de seuil à " +
      "atteindre ni de souffrance qui mériterait plus qu'une autre d'être entendue. Se " +
      "poser la question est déjà un motif suffisant pour venir en parler une fois.",
  },
  {
    surAccueil: true,
    question: "Comment se déroule une première séance ?",
    reponse:
      "C'est avant tout une rencontre. Elle sert à éclaircir ensemble votre situation, " +
      "à parler de ce qui vous amène et de ce que vous en attendez, puis à déterminer " +
      "la manière dont nous procéderons. Vous n'avez pas besoin de savoir quoi dire ni " +
      "de préparer quoi que ce soit, et rien ne vous engage au-delà de cette séance.",
  },
  {
    surAccueil: true,
    question: "Faut-il une ordonnance pour consulter ?",
    reponse:
      "Non. Vous pouvez prendre rendez-vous directement, sans passer par votre médecin " +
      "traitant et sans prescription.",
  },
  {
    surAccueil: true,
    question: "Recevez-vous les enfants, les adolescents ou les couples ?",
    reponse:
      `Non. Mon accompagnement s'adresse ${publics.libelle}. Je ne reçois ni ` +
      `${publics.nonRecus.join(", ni ")}. Si votre demande concerne l'un de ces ` +
      `publics, un ou une collègue spécialisée sera plus indiquée — votre médecin ` +
      `traitant peut vous orienter.`,
  },

  /* ---- Questions présentes uniquement sur /aide-faq/ ---- */

  {
    question: "Comment savoir si j'ai besoin de consulter ?",
    reponse:
      "Il est souvent difficile de trancher soi-même. Un mal-être qui dure, des " +
      "difficultés à gérer certaines situations, des comportements qui se répètent " +
      "malgré vous, ou simplement le sentiment de tourner en rond : ce sont des motifs " +
      "suffisants. Un premier entretien sert précisément à évaluer ensemble ce dont " +
      "vous avez besoin, sans que cela vous engage à entreprendre un travail.",
  },
  {
    question: "Qu'est-ce que la psychothérapie et en quoi peut-elle m'aider ?",
    reponse:
      "La psychothérapie vise à aider une personne à comprendre ses émotions, ses " +
      "pensées et ses comportements, à traiter une souffrance psychique et à trouver " +
      "d'autres manières de fonctionner. Elle peut répondre à un trouble caractérisé " +
      "comme à un mal-être qui n'a rien de pathologique.",
  },
  {
    question: "Quelle approche thérapeutique me conviendrait le mieux ?",
    reponse:
      "Il existe différentes approches — thérapie cognitivo-comportementale, " +
      "psychanalyse, thérapie systémique, et d'autres. Le choix dépend de la nature de " +
      "vos difficultés et surtout de ce que vous en attendez : souhaitez-vous un " +
      "travail de fond, qui explore votre histoire, ou une aide plus brève et centrée " +
      "sur une situation précise ? Ma pratique est orientée par la psychanalyse. Si " +
      "une autre approche vous convient mieux, je vous le dirai.",
  },
  {
    question: "À quelle fréquence ont lieu les séances, et pendant combien de temps ?",
    reponse:
      "La fréquence se décide lors du premier rendez-vous. Un travail psychothérapique " +
      "demande un investissement personnel réel et un rythme de séances régulier. Sa " +
      "durée totale varie d'une personne à l'autre : elle ne se fixe pas d'avance, et " +
      "elle se réévalue au fil du travail.",
  },
  {
    question: "La confidentialité est-elle garantie ?",
    reponse:
      "Oui, sans réserve. Les psychologues sont tenus au secret professionnel : ce qui " +
      "se dit en séance n'en sort pas, et le fait même que vous consultiez ne sera " +
      "communiqué à personne. Cette règle ne connaît que les exceptions prévues par la " +
      "loi.",
  },
  {
    question: "Quels types de difficultés peuvent être abordées en consultation ?",
    reponse:
      "Anxiété, symptômes dépressifs, phobies, troubles obsessionnels, mal-être diffus " +
      "ou préoccupations existentielles, deuil, troubles du comportement alimentaire, " +
      "stress, confiance en soi, addictions, dépendance affective, troubles du " +
      "sommeil, difficultés relationnelles ou professionnelles, comportements qui se " +
      "répètent. Cette liste n'est pas limitative.",
  },
  {
    question: "Le cabinet est-il accessible aux personnes en situation de handicap ?",
    /* TODO Vincent : formulation à préciser. Le site actuel indique seulement
       que « le cabinet tient compte des normes d'accessibilité », ce qui ne
       dit pas si l'accès est de plain-pied, s'il y a un ascenseur, etc.
       Une personne concernée a besoin d'une réponse concrète. */
    reponse:
      "Le cabinet tient compte des normes d'accessibilité. Si vous avez un besoin " +
      "particulier, appelez-moi avant votre venue : nous verrons ensemble ce qu'il " +
      "est possible d'organiser.",
  },
  {
    question: "Où se trouve le cabinet et quand puis-je venir ?",
    reponse:
      `Le cabinet se situe ${cabinet.rue}, ${cabinet.codePostal} ${cabinet.ville}, ` +
      `${cabinet.acces.reperes.charAt(0).toLowerCase() + cabinet.acces.reperes.slice(1)}. ` +
      `Tramway : ${cabinet.acces.tram.charAt(0).toLowerCase() + cabinet.acces.tram.slice(1)}. ` +
      `${cabinet.acces.stationnement}. Je reçois ${horaires.libelle.toLowerCase()}, ` +
      `${horaires.modalite.toLowerCase()}.`,
  },
];

/** Sélection affichée sur la page d'accueil. */
export const QUESTIONS_ACCUEIL = QUESTIONS.filter((q) => q.surAccueil);
