import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Écrit 2 »), ALLONGÉ par Vincent le 2026-09-18 (document « Site internet
 * articles allongés », article n° 1). Premier de la file : il lève un frein à
 * la première séance (« que vais-je dire ? »), le format le plus utile du § 7.3.
 *
 * La version courte faisait 289 mots, sous la cible de 1 200 à 2 000 mots du
 * § 8.3. La version allongée y entre (~1 400 mots) et donne à chaque H2 le
 * format de réponse autonome de 130 à 170 mots attendu au § 11.1.
 *
 * ANTI-CANNIBALISATION : mot-clé « silence en séance psychologue », qu'aucune
 * page ne cible. /consultations/ décrit la première séance sans en parler.
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - le titre de proposition (« L'importance du silence en séance ») sert de
 *     titre court pour Google, l'intertitre de Vincent reste le titre de page ;
 *   - « le silence n'est jamais un vide » perd son « jamais » : Freud rattache
 *     aussi certains arrêts de la parole à la résistance (Cinq leçons, 2e) —
 *     arbitrage déjà rendu sur la version courte, maintenu ici alors que le
 *     document réintroduit la formule absolue ;
 *   - « le conscient passe le relais à l'inconscient » et « le silence brise la
 *     censure de la conscience et ouvre grand les portes de l'inconscient »
 *     deviennent « la pensée cesse de se diriger et se laisse aller » : les
 *     formules d'origine ne se retrouvent dans aucune source et simplifient à
 *     l'excès — arbitrage déjà rendu, maintenu ;
 *   - l'« écoute flottante » attribuée à Freud devient l'« attention
 *     flottante » : c'est le terme de Freud, et celui de la source Botella
 *     déjà citée. « Écoute flottante » est un usage ultérieur ;
 *   - les superlatifs du document sont retirés (§ 8.4) : « outil clinique d'une
 *     richesse infinie », « matière psychique d'une valeur inestimable »,
 *     « présence extrêmement active », « expérience profondément réparatrice »,
 *     « formidable moteur de liberté intérieure », « cette vision est
 *     radicalement fausse » ;
 *   - « le silence devient le seul contenant capable de… » perd son « seul » ;
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
        "Dans un monde où tout va très vite, le silence est devenu rare. Dès qu'un moment " +
        "de vide se présente, nous avons le réflexe de le combler : un téléphone, un " +
        "écran, une musique de fond, une conversation de courtoisie. Le bruit sert " +
        "d'armure contre l'ennui, mais aussi contre l'introspection.",
    },
    {
      type: "p",
      texte:
        "Au milieu de ce mouvement permanent, le cabinet du psychologue fait figure " +
        "d'exception : c'est un lieu où les règles de la conversation ordinaire sont " +
        "suspendues. Il est donc normal que le silence y impressionne au début. On n'a " +
        "pas l'habitude qu'il soit permis.",
      lien: { href: "/consultations/", libelle: "Comment se déroule une première séance" },
    },
    {
      type: "p",
      texte:
        "Autant le dire d'emblée : ce silence n'est ni une absence, ni un échec de la " +
        "communication. C'est souvent, au contraire, le terrain d'où surgissent les prises " +
        "de conscience. Et il n'y a, au cabinet, aucune obligation de « bien parler », de " +
        "meubler le temps ni de réussir une performance verbale.",
    },

    { type: "h2", texte: "Pourquoi le silence nous intimide" },
    {
      type: "p",
      texte:
        "Pour comprendre la place du silence en thérapie, il faut d'abord regarder " +
        "pourquoi il nous met mal à l'aise ailleurs. Dans les échanges ordinaires, au " +
        "travail, en famille ou entre amis, un silence est vite jugé « lourd » ou " +
        "« gênant ». On l'associe à une panne d'inspiration, à de l'ennui, parfois à une " +
        "tension que personne n'ose nommer. La politesse nous pousse donc à maintenir le " +
        "flux des mots, autant pour rassurer l'autre que pour nous rassurer nous-mêmes.",
    },
    {
      type: "p",
      texte:
        "Lorsque l'on pousse pour la première fois la porte d'un cabinet, on y transpose " +
        "ces codes sans y penser. Beaucoup ressentent la pression de devoir « rentabiliser » " +
        "leur séance en parlant le plus possible, comme s'il fallait remettre un rapport " +
        "complet sur sa propre souffrance. Le premier silence est alors vécu comme un " +
        "signal d'alarme : la preuve que l'on n'a plus rien d'intéressant à dire.",
    },
    {
      type: "p",
      texte:
        "Il y a une autre raison, plus profonde : quand le bruit extérieur se tait, le " +
        "bruit intérieur augmente. Les doutes, les inquiétudes et les souvenirs que l'on " +
        "passe ses journées à fuir profitent de ce calme pour remonter. C'est précisément " +
        "à cet endroit que commence le travail, et c'est pour cela que le cadre du " +
        "cabinet est ce qu'il est : confidentiel, sans jugement, pensé pour que cette " +
        "rencontre avec soi-même ne soit plus une source de panique.",
    },

    { type: "h2", texte: "Les différents visages du silence" },
    {
      type: "p",
      texte:
        "Il y a autant de silences que de moments dans une thérapie. Loin d'être un temps " +
        "mort, le silence change de nature au fil des séances. On peut en distinguer " +
        "quatre, qui n'ont ni la même fonction ni la même couleur :",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Le silence de réflexion",
          texte:
            "c'est le moment où une parole, une question ou un souvenir vient de résonner. " +
            "On s'arrête pour mesurer l'impact de ce qui vient d'être dit, on en pèse les " +
            "mots, on laisse l'idée descendre. Ce n'est pas une absence de pensée, c'est " +
            "une pensée en train de se faire, et elle a besoin de ce répit pour s'installer.",
        },
        {
          terme: "Le silence de l'émotion",
          texte:
            "parfois, les mots coupent le fil parce que l'émotion est trop intense : " +
            "tristesse, colère, honte, ou même soulagement. Vouloir parler à tout prix " +
            "serait alors une façon de fuir ce qui se vit. Ce silence a besoin d'être " +
            "accueilli et respecté ; se taire ensemble permet de découvrir qu'une émotion " +
            "peut être traversée sans faire fuir l'autre.",
        },
        {
          terme: "Le silence de transition",
          texte:
            "il arrive que l'on s'arrête au milieu d'un récit : « voilà, j'ai fait le " +
            "tour ». C'est le moment où la pensée cesse de se diriger et se laisse aller. " +
            "C'est souvent de ce calme que surgit une pensée inattendue, un souvenir sans " +
            "rapport apparent, un rêve de la veille ou un lapsus révélateur.",
        },
        {
          terme: "Le silence de résistance",
          texte:
            "on approche d'une zone douloureuse ou conflictuelle de son histoire, et l'on " +
            "se tait pour s'en protéger. Ce silence-là est souvent tendu. Il n'est pas un " +
            "refus de coopérer, mais une défense légitime : le travail consiste alors à " +
            "identifier cette barrière et à comprendre ce qu'elle protège, au rythme de " +
            "chacun.",
        },
      ],
    },

    { type: "h2", texte: "Le rôle de l'analyste : une présence silencieuse" },
    {
      type: "p",
      texte:
        "Une idée reçue veut que le psychologue silencieux soit distant, indifférent ou " +
        "passif. Son silence n'est ni du désintérêt, ni de la froideur : c'est ce que " +
        "Freud appelait l'attention flottante, une écoute qui ne trie pas à l'avance ce " +
        "qui compte, doublée d'une attitude bienveillante.",
      lien: {
        href: "/psychanalyste-nantes/",
        libelle: "Ce que l'on écoute en séance",
      },
    },
    {
      type: "p",
      texte:
        "La différence avec un proche est éclairante. Lorsque vous confiez une difficulté " +
        "à quelqu'un qui vous aime, il réagit vite : il projette sa propre histoire sur " +
        "la vôtre, donne un conseil (« à ta place, je ferais ceci »), raconte une " +
        "expérience comparable ou cherche à consoler pour apaiser son propre malaise. " +
        "L'intention est bonne, mais l'espace est occupé. Le praticien, lui, s'abstient de " +
        "combler le vide par des conseils préconçus ou du bavardage, et vous laisse la " +
        "place nécessaire pour que votre propre vérité puisse émerger.",
    },
    {
      type: "p",
      texte:
        "Ce silence est une forme de présence active. Par le regard, la posture et " +
        "l'attention portée aux mots comme aux soupirs et aux hésitations, il dit : je " +
        "suis là, je ne fuis pas ce que vous déposez ici, votre silence compris. Cette " +
        "présence contient l'angoisse. Découvrir que l'on peut se taire à côté de " +
        "quelqu'un sans que le lien se rompe est une expérience nouvelle pour beaucoup, " +
        "en particulier lorsqu'il a fallu, longtemps, se montrer à la hauteur pour être " +
        "accepté.",
    },

    { type: "h2", texte: "Apprendre à habiter le silence" },
    {
      type: "p",
      texte:
        "Venir en consultation, c'est s'engager dans un apprentissage qui bouscule nos " +
        "habitudes : s'accorder le droit de ne pas savoir quoi dire, d'hésiter, de " +
        "chercher ses mots longtemps, et parfois de ne rien dire du tout. Au début d'un " +
        "suivi, le silence est souvent vécu comme un obstacle. À mesure que la confiance " +
        "s'installe, il change de statut. Il devient un moteur de liberté intérieure, " +
        "parce qu'il permet de :",
    },
    {
      type: "liste",
      items: [
        "ralentir le rythme, et sortir de l'urgence de la réponse immédiate ;",
        "retrouver ses sensations : ce qui se serre, se noue ou se relâche dans le corps " +
          "quand la parole s'arrête ;",
        "reprendre la responsabilité de sa parole, en choisissant soi-même les sujets qui " +
          "importent plutôt que de répondre à des questions ;",
        "faire l'expérience que sa valeur ne dépend pas de sa capacité à alimenter une " +
          "conversation.",
      ],
    },

    { type: "h2", texte: "Le cadre de la séance comme refuge" },
    {
      type: "p",
      texte:
        "Le cadre proposé par le psychologue peut être entendu comme un abri contre le " +
        "bruit du dehors. Si vous redoutez les silences, le plus simple est d'en parler " +
        "dès la première séance. Dire « j'ai peur de ne rien avoir à dire » ou « le " +
        "silence me met mal à l'aise » n'interrompt pas le travail : cela le commence.",
    },
    {
      type: "p",
      texte:
        "Une thérapie ne consiste pas à devenir bon orateur de sa propre vie, mais à " +
        "écouter ce qui se passe en soi lorsque tout s'arrête. Apprivoiser le silence, " +
        "c'est accepter de poser les armes du langage social pour laisser venir l'émotion " +
        "et ce que l'on ne savait pas encore de soi. C'est dans ce calme que se dessinent, " +
        "pas à pas, les voies d'un apaisement durable.",
    },
  ],
};
