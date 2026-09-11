import type { Article } from "@/lib/content/blog";

/**
 * Premier article du blog.
 *
 * CHOIX DU SUJET. Le secret professionnel n'est traité en profondeur par
 * aucune page du site — /consultations/ y consacre trois lignes — et c'est une
 * question que tout le monde se pose sans l'oser. Il coche aussi les critères
 * du § 7.3 : réponse argumentée, sourcée sur des textes primaires, très
 * citable par les moteurs génératifs.
 *
 * ANTI-CANNIBALISATION : mot-clé « secret professionnel psychologue », qu'aucune
 * page du site ne cible. L'article renvoie vers /consultations/, il ne la
 * concurrence pas.
 *
 * PRUDENCE JURIDIQUE. Deux garde-fous tenus dans le texte :
 *  - les exceptions sont présentées comme étroites et définies par la loi,
 *    jamais comme une appréciation du praticien ;
 *  - la question, discutée, de savoir si les psychologues peuvent déroger au
 *    secret en cas de violences conjugales comme le peuvent les médecins n'est
 *    PAS tranchée ici. Elle fait l'objet de réponses ministérielles
 *    divergentes ; un site de praticien n'a pas à arbitrer un point de droit
 *    contesté.
 *
 * À FAIRE RELIRE PAR VINCENT avant publication (§ 7.1).
 */
export const secretProfessionnel: Article = {
  slug: "secret-professionnel-psychologue",
  titre: "Ce qu'un psychologue a le droit de dire, et à qui",
  chapeau:
    "Tout ce qui se dit en séance est couvert par le secret professionnel, et le violer " +
    "est un délit. Voici précisément ce que cela recouvre, les rares exceptions que " +
    "prévoit la loi, et ce que cela change pour vous.",
  /* Le titre de la page fait 49 caractères. La version courte porte le mot-clé
     recherché — « secret professionnel psychologue » — en toutes lettres. */
  metaTitre: "Secret professionnel du psychologue",
  metaDescription:
    "Tout ce qui se dit en séance est couvert par le secret professionnel. Ce que " +
    "cela recouvre, et les rares exceptions prévues par la loi.",
  publieLe: "2026-09-08",
  modifieLe: "2026-09-08",
  motCle: "secret professionnel psychologue",
  urgence: true,
  /* Une abstraction : rien ne s'y laisse lire d'emblée. L'œuvre accompagne
     le propos, elle ne l'illustre pas (master § 8.5). */
  illustration: {
    src: "/images/kandinsky-tableau-centre-vert-1913.jpg",
    auteur: "Vassily Kandinsky",
    titre: "Tableau au centre vert",
    annee: "1913",
  },
  sources: [
    {
      titre: "Article 226-13 du code pénal — atteinte au secret professionnel",
      editeur: "Légifrance",
      href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417945",
    },
    {
      titre: "Article 226-14 du code pénal — cas où la loi impose ou autorise la révélation",
      editeur: "Légifrance",
      href: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049532171",
    },
    {
      titre: "Le secret professionnel des psychologues",
      editeur: "Syndicat national des psychologues",
      href: "https://psychologues.org/le-secret-professionnel/",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "La réponse courte : rien. Un psychologue n'a le droit de rien dire de ce que " +
        "vous lui confiez, à personne — ni à votre famille, ni à votre employeur, ni à " +
        "votre médecin, ni à votre assurance. Et pas davantage le fait même que vous le " +
        "consultiez. Ce n'est pas une politesse professionnelle : c'est une obligation " +
        "dont la violation est un délit pénal.",
    },
    {
      type: "p",
      texte:
        "Cette question revient souvent, formulée de biais : « est-ce que ça reste entre " +
        "nous ? ». Elle mérite une réponse précise plutôt qu'un principe général, parce " +
        "que la précision est ce qui rassure réellement.",
    },

    { type: "h2", texte: "Ce que le secret couvre exactement" },
    {
      type: "p",
      texte:
        "Le secret ne porte pas seulement sur ce que vous dites. Il couvre tout ce dont " +
        "le psychologue a connaissance dans l'exercice de sa profession : ce qui lui est " +
        "confié, mais aussi ce qu'il voit, ce qu'il entend et ce qu'il comprend.",
    },
    {
      type: "p",
      texte:
        "Cela inclut des éléments auxquels on ne pense pas toujours, et qui sont souvent " +
        "les plus sensibles au quotidien.",
    },
    {
      type: "liste",
      items: [
        "Le fait que vous consultiez, qui ne sera confirmé à personne — pas même à quelqu'un qui prétendrait déjà le savoir.",
        "Vos rendez-vous, leur fréquence, leur régularité et vos éventuelles absences.",
        "Ce que vous avez dit, mais aussi ce que vous n'avez pas réussi à dire.",
        "Ce que le psychologue a pu comprendre de votre situation sans que vous l'ayez formulé.",
      ],
    },
    {
      type: "p",
      texte:
        "Concrètement : si votre conjoint, votre parent ou votre employeur appelle le " +
        "cabinet, il n'obtiendra aucune information — et il n'obtiendra pas non plus la " +
        "confirmation que vous êtes suivi.",
    },

    { type: "h2", texte: "Ce que risque un psychologue qui parle" },
    {
      type: "p",
      texte:
        "L'article 226-13 du code pénal punit la révélation d'une information à caractère " +
        "secret par une personne qui en est dépositaire, par état ou par profession, " +
        "d'un an d'emprisonnement et de 15 000 euros d'amende. Le texte ne vise pas les " +
        "psychologues nommément : il vise quiconque est dépositaire d'un tel secret, ce " +
        "qui est le cas d'un psychologue en raison de sa profession.",
    },
    {
      type: "p",
      texte:
        "Autrement dit, le secret n'est pas une règle interne à la profession que le " +
        "praticien pourrait assouplir selon les circonstances. C'est une obligation dont " +
        "il répond devant un tribunal.",
    },

    { type: "h2", texte: "Les exceptions, et pourquoi elles sont étroites" },
    {
      type: "p",
      texte:
        "L'article 226-14 prévoit que cette interdiction ne s'applique pas dans les cas " +
        "où la loi impose ou autorise la révélation du secret. La formulation est " +
        "importante : ce sont les cas prévus par la loi, et eux seuls. Le praticien " +
        "n'apprécie pas librement s'il lui semble opportun de parler.",
    },
    {
      type: "p",
      texte:
        "Les situations concernées sont limitées. Elles visent principalement " +
        "l'information des autorités judiciaires, médicales ou administratives lorsqu'il " +
        "s'agit de privations ou de sévices infligés à un mineur ou à une personne qui " +
        "n'est pas en mesure de se protéger, ainsi que les situations de danger imminent " +
        "pour une personne.",
    },
    {
      type: "encadre",
      titre: "Un point de droit encore discuté",
      texte:
        "La question de savoir si les psychologues peuvent, comme les médecins, signaler " +
        "des violences conjugales sur une personne majeure et consentante fait l'objet " +
        "de réponses divergentes des autorités. Un site de praticien n'a pas à trancher " +
        "un point contesté : si cette question vous concerne, posez-la directement, et " +
        "sachez que les numéros d'aide en bas de page répondent sans condition.",
    },
    {
      type: "p",
      texte:
        "Il faut aussi le dire clairement : ces exceptions existent pour protéger des " +
        "personnes, jamais pour informer un tiers curieux. Aucune d'elles ne permet de " +
        "renseigner un proche, un employeur ou un assureur.",
    },

    { type: "h2", texte: "Et si je veux, moi, que quelque chose soit transmis ?" },
    {
      type: "p",
      texte:
        "C'est possible, et c'est vous qui décidez. Le secret protège le patient, pas le " +
        "praticien : vous pouvez demander qu'un courrier soit adressé à votre médecin " +
        "traitant, par exemple. Rien ne part sans votre accord, et vous savez ce qui est " +
        "écrit.",
    },
    {
      type: "p",
      texte:
        "En revanche, un psychologue n'établit pas de certificat destiné à faire valoir " +
        "un droit dans une procédure, ni d'attestation sur une personne qu'il n'a pas " +
        "reçue. Ce sont deux demandes fréquentes, et deux refus constants — ils protègent " +
        "aussi la valeur de ce qui se dit en séance.",
    },

    { type: "h2", texte: "Ce que cela change pour un premier rendez-vous" },
    {
      type: "p",
      texte:
        "Cela veut dire que vous pouvez arriver sans avoir trié à l'avance ce qui est " +
        "dicible. La confidentialité n'est pas un supplément de confort : c'est ce qui " +
        "rend le travail possible, parce qu'on ne parle pas librement dans un espace où " +
        "l'on calcule les conséquences de chaque phrase.",
      lien: { href: "/consultations/", libelle: "Comment se déroule une première séance" },
    },
    {
      type: "p",
      texte:
        "Reste la question qui vient avant celle-ci, et qui arrête beaucoup de monde : " +
        "est-ce que ma situation justifie de consulter ? Elle mérite sa propre réponse.",
      lien: {
        href: "/psychologue-clinicien-nantes/",
        libelle: "Ce qu'est un symptôme, et le moment où il cesse de tenir",
      },
    },
    {
      type: "p",
      texte:
        "C'est aussi la raison pour laquelle le formulaire de ce site ne comporte aucune " +
        "zone de message : ce qui relève du secret n'a pas à transiter par un serveur " +
        "avant même que nous nous soyons rencontrés.",
      lien: {
        href: "/politique-de-confidentialite/",
        libelle: "Ce que ce site collecte, et ce qu'il ne collecte pas",
      },
    },
  ],
};
