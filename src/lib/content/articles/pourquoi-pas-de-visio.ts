import type { Article } from "@/lib/content/blog";

/**
 * Deuxième article du blog.
 *
 * CHOIX DU SUJET. « Je ne propose pas de consultation à distance » est
 * aujourd'hui une phrase isolée sur trois pages, jamais expliquée. C'est
 * pourtant une objection réelle : une partie des gens cherchent un psychologue
 * en visio, et repartent sans comprendre pourquoi ce cabinet n'en fait pas.
 *
 * ANTI-CANNIBALISATION : mot-clé « consultation psychologue à distance », que
 * ne cible aucune page. Les pages concernées ne font qu'énoncer la modalité en
 * une phrase ; l'article, lui, l'argumente et renvoie vers elles.
 *
 * ⚠️ PUBLICITÉ COMPARATIVE (§ 2.2). Le sujet est un piège : il serait facile
 * d'écrire que la visio « marche moins bien ». Ce serait dénigrer des confrères
 * qui la pratiquent, et prétendre à une supériorité non démontrée. L'article
 * tient donc deux lignes strictes :
 *   - les FAITS viennent de l'Assurance Maladie, pas d'une opinion clinique ;
 *   - le reste est explicitement présenté comme un CHOIX de cadre, assumé
 *     comme tel, assorti d'une orientation pour qui a besoin d'autre chose.
 *
 * PAS DE BANDEAU D'URGENCE : le sujet est une modalité d'accès, pas un sujet à
 * risque au sens du § 2.1. Le poser partout le viderait de son sens.
 *
 * À FAIRE RELIRE PAR VINCENT avant publication (§ 7.1) — c'est celui des deux
 * articles qui engage le plus sa position personnelle.
 */
export const pourquoiPasDeVisio: Article = {
  slug: "consultation-psychologue-a-distance",
  titre: "Pourquoi je reçois uniquement au cabinet",
  chapeau:
    "Je ne propose pas de séances en visioconférence. Ce n'est ni un retard technique, " +
    "ni un jugement sur ceux qui les pratiquent : c'est un choix de cadre, et il se " +
    "discute. Voici le raisonnement, et ce que dit la réglementation.",
  /* Le titre de la page fait 40 caractères ; avec le suffixe, il dépassait ce
     que Google affiche. Le <h1> reste inchangé. */
  metaTitre: "Pourquoi je reçois au cabinet",
  metaDescription:
    "Je ne propose pas de séances en visioconférence. Ni retard technique ni " +
    "jugement : un choix de cadre, et le raisonnement qui le fonde.",
  publieLe: "2026-09-08",
  modifieLe: "2026-09-08",
  motCle: "consultation psychologue à distance",
  sources: [
    {
      titre: "Le parcours de prise en charge d'un patient dans le cadre de Mon soutien psy",
      editeur: "Assurance Maladie (ameli.fr) — espace psychologue, vérifié le 2026-09-08",
      href: "https://www.ameli.fr/psychologue/exercice-professionnel/parcours-prise-en-charge-patient-mon-soutien-psy",
    },
    {
      titre: "Remboursement de séances chez le psychologue : dispositif Mon soutien psy",
      editeur: "Assurance Maladie (ameli.fr)",
      href: "https://www.ameli.fr/assure/remboursements/rembourse/remboursement-seance-psychologue-mon-soutien-psy",
    },
    {
      titre: "La téléconsultation",
      editeur: "Assurance Maladie (ameli.fr)",
      href: "https://www.ameli.fr/assure/remboursements/rembourse/consultations-telemedecine/telemedecine/teleconsultation",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "La réponse courte : parce que le lieu et l'heure font partie du travail, et que " +
        "je ne sais pas les tenir à travers un écran. C'est un choix, pas une règle " +
        "générale — d'autres praticiens travaillent très bien à distance, et si c'est ce " +
        "qu'il vous faut, je vous orienterai plutôt que de vous faire renoncer.",
    },
    {
      type: "p",
      texte:
        "Mais la question mérite mieux qu'une phrase de refus au détour d'une page " +
        "pratique. Voici ce qui la fonde.",
    },

    { type: "h2", texte: "Ce que dit la réglementation" },
    {
      type: "p",
      texte:
        "Il vaut la peine de commencer par les faits, parce qu'ils sont peu connus. Les " +
        "psychologues peuvent exercer à distance, et le dispositif public « Mon soutien " +
        "psy » le permet. Mais il l'encadre, et la manière dont il l'encadre est " +
        "instructive.",
    },
    {
      type: "liste",
      items: [
        "Le premier entretien d'évaluation doit obligatoirement avoir lieu en présentiel : il ne peut pas se faire en téléconsultation.",
        "Le distanciel est plafonné à 20 % de l'activité conventionnée du psychologue, apprécié sur son activité annuelle globale et non patient par patient.",
        "La séance doit se tenir dans un lieu qui garantit la confidentialité de l'échange, et dans des conditions assurant la sécurité des données.",
        "Le recours au distanciel relève d'une décision partagée, prise au cas par cas.",
      ],
    },
    {
      type: "p",
      texte:
        "Autrement dit : l'institution qui rembourse ces séances ne traite pas le " +
        "distanciel comme l'équivalent du présentiel. Elle en fait une exception " +
        "encadrée, réservée à des situations où elle a du sens, et elle exige que la " +
        "rencontre commence en personne. Ce n'est pas mon opinion, c'est le cadre en " +
        "vigueur.",
    },

    { type: "h2", texte: "La confidentialité n'est pas la même des deux côtés de l'écran" },
    {
      type: "p",
      texte:
        "Au cabinet, je réponds du lieu. Je sais que la porte est fermée, que personne " +
        "n'écoute derrière, et que ce qui se dit ne sera pas enregistré. En " +
        "visioconférence, je ne réponds que de mon côté : ni de la pièce où vous êtes, " +
        "ni de qui s'y trouve, ni du réseau qui nous relie.",
    },
    {
      type: "p",
      texte:
        "Ce n'est pas théorique. Beaucoup de gens consultent précisément à cause de ce " +
        "qui se passe chez eux, ou avec les personnes qui y vivent. Leur proposer de " +
        "parler depuis ce domicile-là, c'est leur demander de faire un travail au " +
        "milieu de ce dont ils viennent parler.",
      lien: {
        href: "/blog/secret-professionnel-psychologue/",
        libelle: "Ce que couvre exactement le secret professionnel",
      },
    },

    { type: "h2", texte: "Le déplacement fait partie du travail" },
    {
      type: "p",
      texte:
        "Venir demande quelque chose : partir, traverser la ville, arriver, attendre un " +
        "peu, puis repartir. Ce trajet n'est pas du temps perdu autour de la séance. " +
        "C'est un sas, à l'aller comme au retour, et beaucoup de gens disent que " +
        "quelque chose s'y élabore.",
    },
    {
      type: "p",
      texte:
        "Une séance prise entre deux réunions, caméra allumée dans un bureau fermé à " +
        "clé, n'offre pas ce sas. Elle est plus commode — et c'est précisément ce qui " +
        "me fait hésiter : ce qui se travaille ici demande rarement de la commodité.",
    },
    {
      type: "p",
      texte:
        "Le cadre — un même lieu, un même horaire, une régularité — n'est pas une " +
        "formalité d'organisation. C'est parce que quelque chose se répète à l'identique " +
        "que le reste peut se déplacer.",
      lien: { href: "/consultations/", libelle: "Le cadre des consultations en détail" },
    },

    { type: "h2", texte: "Ce que je fais si vous ne pouvez pas vous déplacer" },
    {
      type: "p",
      texte:
        "Je ne prétends pas que ce choix convienne à tout le monde. Une personne " +
        "éloignée, empêchée, en situation de handicap ou dont les horaires interdisent " +
        "tout déplacement a des raisons parfaitement valables de chercher autre chose.",
    },
    {
      type: "p",
      texte:
        "Dans ce cas, appelez-moi quand même. Nous verrons si un aménagement est " +
        "possible, et sinon je vous orienterai vers un confrère qui pratique le " +
        "distanciel. Un praticien qui vous convient et que vous pouvez voir vaut " +
        "infiniment mieux qu'un cadre théoriquement idéal auquel vous n'accédez pas.",
      lien: {
        href: "/cabinet-nantes/",
        libelle: "L'accès au cabinet, le tram et le stationnement",
      },
    },
    {
      type: "encadre",
      titre: "Si vous hésitez",
      texte:
        "La question du présentiel ne devrait jamais être ce qui vous empêche de " +
        "consulter. Posez-la au téléphone avant de prendre rendez-vous : quelques " +
        "minutes suffisent à savoir si ce cadre vous convient, et cela ne vous engage à " +
        "rien.",
    },
  ],
};
