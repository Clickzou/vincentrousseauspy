import type { Article } from "@/lib/content/blog";

/**
 * Article transmis par Vincent le 2026-09-11 (document « Articles & Vidéos »,
 * « Proposition 11 »), ALLONGÉ par Vincent le 2026-09-18 (document « Site
 * internet articles allongés », article n° 2).
 *
 * La version courte faisait 306 mots, sous la cible de 1 200 à 2 000 mots du
 * § 8.3. La version allongée y entre (~1 400 mots) et donne à chaque H2 le
 * format de réponse autonome de 130 à 170 mots attendu au § 11.1.
 *
 * ANTI-CANNIBALISATION : mot-clé « travail du deuil », qu'aucune page ne cible.
 * Le deuil n'apparaît sur le site que dans des énumérations.
 *
 * BANDEAU D'URGENCE : oui. Un deuil peut se compliquer d'une dépression, et le
 * lecteur qui cherche ces mots peut aller mal (§ 2.1, point 5).
 *
 * ÉCARTS PAR RAPPORT AU DOCUMENT, à faire valider par Vincent :
 *   - « faire semblant d'aller bien bloque le processus » devient « peut
 *     l'entraver » : l'affirmation absolue n'est pas démontrable — arbitrage
 *     déjà rendu sur la version courte, maintenu ici ;
 *   - un paragraphe d'orientation est AJOUTÉ en fin d'article : quand le deuil
 *     ne s'allège pas, consulter. Un contenu de santé oriente, il ne conclut
 *     pas (§ 2.1, point 4) ;
 *   - le vocabulaire de la guérison est retiré (« le premier pas vers la
 *     guérison », « guérir du deuil ») : il contredit le propos même de
 *     l'article, qui pose que le deuil n'est pas une maladie. Remplacé par
 *     « s'apaiser », « se reconstruire » ;
 *   - « le deuil refoulé se somatise dans le corps sous forme de douleurs ou de
 *     fatigue chronique » devient une formulation prudente : le lien est
 *     plausible, pas établi comme mécanique ;
 *   - « décréter qu'au bout d'un an on doit être passé à autre chose est une
 *     violence psychologique » est atténué : l'injonction est décrite pour ce
 *     qu'elle fait au lecteur, sans requalification ;
 *   - les superlatifs et les images d'intensité du document sont retirés
 *     (§ 8.4) : « des séismes intimes », « la perte absolue », « un vide
 *     immense », « une vague immense », « la réalité est radicalement
 *     différente », « une traversée initiatique » ;
 *   - le modèle des cinq étapes est attribué à Elisabeth Kübler-Ross et daté de
 *     1969 (« On Death and Dying »), et sa critique est désormais SOURCÉE :
 *     deux sources sont ajoutées, le Scientifique en chef du Québec (en
 *     français, en accès libre) et Stroebe, Schut & Boerner 2017 dans Omega
 *     (accès libre, CC BY-NC, PMC5375020). Elles portent trois faits que le
 *     document de Vincent n'énonçait pas et que l'article reprend :
 *     Kübler-Ross a interrogé des patients en fin de vie, non des endeuillés ;
 *     un modèle voulu descriptif a été reçu comme prescriptif ; les auteurs
 *     déconseillent aux professionnels de s'en servir comme repère de suivi.
 *     Kübler-Ross elle-même a reconnu, dans un ouvrage paru en 2005, que les
 *     phases ne sont pas des arrêts successifs sur une ligne du temps.
 *     À ARBITRER : Stroebe et al. est une source primaire évaluée par les
 *     pairs, mais en anglais. Le Scientifique en chef du Québec est de la
 *     vulgarisation institutionnelle, comme parlons-fin-de-vie.fr et le 3114
 *     déjà cités — il est conservé parce qu'il est en français et gratuit, donc
 *     réellement vérifiable par le lecteur. À retirer si Vincent préfère s'en
 *     tenir aux sources primaires du § 5 ;
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
    {
      titre: "Les 5 étapes du deuil, un modèle validé ? Faux",
      editeur:
        "Pascal Lapointe, Agence Science-Presse, 2020 — Scientifique en chef du Québec",
      href: "https://www.scientifique-en-chef.gouv.qc.ca/impact-recherche/les-5-etapes-du-deuil-un-modele-valide-faux/",
    },
    {
      titre: "Cautioning Health-Care Professionals: Bereaved Persons Are Misguided Through the Stages of Grief",
      editeur:
        "Margaret Stroebe, Henk Schut et Kathrin Boerner, Omega, 2017, vol. 74, n° 4 — Europe PMC",
      href: "https://europepmc.org/articles/PMC5375020",
    },
  ],
  corps: [
    {
      type: "p",
      texte:
        "Quand la perte tombe, un décalage s'installe, et c'est souvent lui qui surprend " +
        "le plus. Le monde extérieur continue de tourner à la même vitesse : les gens " +
        "courent, le trafic s'active, les saisons changent. Mais à l'intérieur, tout s'est " +
        "arrêté. Le travail du deuil commence là, dans cet écart.",
    },
    {
      type: "p",
      texte:
        "Face à cette détresse, la tentation est d'aller vite : tourner la page, reprendre " +
        "le cours des choses, faire taire la douleur. Il n'y a pourtant rien ici à " +
        "corriger ni à soigner. Le deuil n'est pas une maladie : c'est la façon dont " +
        "l'esprit cicatrise après une perte. Mais c'est un cheminement exigeant, long et " +
        "sinueux, et il n'avance pas sur commande.",
    },

    { type: "h2", texte: "Il n'y a pas un deuil, mais des deuils" },
    {
      type: "p",
      texte:
        "Le mot « deuil » évoque d'abord le décès d'un proche. En clinique, il désigne " +
        "quelque chose de plus large : le deuil s'active dès qu'une rupture majeure " +
        "impose un avant et un après, et oblige à dire adieu à ce qui était.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "La séparation amoureuse",
          texte:
            "une rupture, un divorce, c'est la fin d'une histoire partagée, de rituels " +
            "quotidiens et d'un avenir imaginé à deux. L'autre est vivant, mais son " +
            "absence de votre vie laisse un vide, souvent teinté de rejet ou " +
            "d'incompréhension.",
        },
        {
          terme: "La perte du travail",
          texte:
            "un licenciement, la fin d'une activité, un départ à la retraite peuvent " +
            "provoquer un choc identitaire. Le travail ne donne pas seulement un salaire : " +
            "il structure les journées, confère un statut et nourrit l'estime de soi.",
        },
        {
          terme: "La santé et le corps",
          texte:
            "l'annonce d'une maladie chronique, un handicap ou simplement le " +
            "vieillissement demandent de faire le deuil du corps d'avant, et de renoncer " +
            "à une certaine insouciance pour composer avec de nouvelles limites.",
        },
        {
          terme: "Les projets de vie",
          texte:
            "ne pas parvenir à avoir un enfant, abandonner une entreprise que l'on a " +
            "créée, renoncer à un projet longtemps porté : ces deuils sont invisibles pour " +
            "l'entourage, et douloureux pour celui qui les traverse.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Reconnaître la légitimité de ces deuils compte beaucoup. Trop de personnes " +
        "souffrent en silence parce qu'elles s'interdisent de pleurer une rupture ou un " +
        "emploi, en se disant que « ce n'est pas aussi grave qu'un décès ». La douleur " +
        "psychique ne se mesure pas sur une échelle : elle se vit.",
    },

    { type: "h2", texte: "Un chemin qui n'est pas une ligne droite" },
    {
      type: "p",
      texte:
        "En 1969, la psychiatre Elisabeth Kübler-Ross a décrit cinq phases : le déni, la " +
        "colère, le marchandage, la dépression, puis l'acceptation. Un point est souvent " +
        "oublié : elle les avait observées en interrogeant des personnes atteintes d'une " +
        "maladie incurable, c'est-à-dire des personnes confrontées à leur propre fin, et " +
        "non des personnes en deuil.",
    },
    {
      type: "p",
      texte:
        "La vulgarisation en a pourtant fait une recette du deuil : une suite d'étapes " +
        "ordonnées, à cocher les unes après les autres, selon un calendrier. Ce " +
        "glissement est documenté — un modèle voulu descriptif a été reçu comme " +
        "prescriptif — et il est critiqué par les chercheurs, qui recommandent aux " +
        "professionnels de ne pas s'en servir comme repère pour juger d'un deuil. " +
        "Kübler-Ross elle-même a reconnu, dans un ouvrage paru en 2005, que ces phases " +
        "ne sont pas des arrêts successifs sur une ligne du temps, que toutes ne sont pas " +
        "traversées et que leur ordre varie.",
    },
    {
      type: "p",
      texte:
        "Ce que montre la clinique est plus simple, et plus rassurant : le deuil suit un " +
        "parcours irrégulier, imprévisible, propre à chacun.",
    },
    {
      type: "liste",
      items: [
        {
          terme: "Les vagues émotionnelles",
          texte:
            "le deuil fonctionne par flux et reflux. Un jour, on se sent apaisé, capable " +
            "de rire et de faire des projets ; le lendemain, une odeur, une chanson, une " +
            "date ramènent la tristesse ou la colère. Ce ressac fait peur — « je " +
            "n'avance pas », « je recule » — alors qu'il est habituel : l'esprit ne " +
            "digère pas une perte d'un seul coup, il l'intègre par fragments.",
        },
        {
          terme: "Le poids du temps",
          texte:
            "il n'y a pas de « durée normale » pour faire un deuil. Décréter qu'au bout " +
            "de six mois ou d'un an on devrait être passé à autre chose ne fait " +
            "qu'ajouter de la culpabilité à la peine. Le temps dépend du lien qui vous " +
            "unissait à ce qui a disparu, de la brutalité de la séparation et de vos " +
            "appuis du moment.",
        },
      ],
    },
    {
      type: "p",
      texte:
        "Vouloir aller trop vite, porter un masque de force ou faire semblant d'aller " +
        "bien pour ne pas déranger son entourage peut entraver le processus. Le chagrin " +
        "tenu à distance ne disparaît pas : il se mure dans le silence, et se manifeste " +
        "parfois autrement, par une fatigue qui s'installe ou des douleurs sans cause " +
        "retrouvée.",
    },

    { type: "h2", texte: "Ce que signifie « faire son deuil »" },
    {
      type: "p",
      texte:
        "L'expression est souvent mal comprise. On croit qu'elle veut dire oublier, tirer " +
        "un trait, cesser d'aimer ce que l'on a perdu — et la perspective est alors " +
        "insupportable, vécue comme une trahison. La psychanalyse, à travers le texte de " +
        "Freud « Deuil et mélancolie », en donne une lecture plus douce, en deux " +
        "mouvements.",
      lien: { href: "/psychanalyste-nantes/", libelle: "Ce qu'est la psychanalyse" },
    },
    {
      type: "liste",
      items: [
        {
          terme: "Détacher l'énergie",
          texte:
            "quand nous aimons quelqu'un ou investissons un projet, nous y attachons une " +
            "part de notre énergie psychique. La perte survient, mais cette énergie reste " +
            "accrochée à ce qui n'est plus là : c'est ce qui fait mal. Le travail du " +
            "deuil consiste à l'en détacher peu à peu, souvenir après souvenir, habitude " +
            "après habitude. Ce n'est pas de l'oubli, c'est le constat progressif d'une " +
            "absence.",
        },
        {
          terme: "Une nouvelle place",
          texte:
            "l'énergie détachée se tourne alors vers l'intérieur. Faire son deuil, c'est " +
            "réussir à donner au souvenir une juste place dans son histoire : on passe " +
            "d'une relation extérieure, faite de présence, à une relation intérieure, " +
            "faite de mémoire. Ce qui a été perdu cesse d'abîmer le présent et devient un " +
            "appui. C'est à ce moment, et pas avant, que l'énergie redevient disponible " +
            "pour ailleurs.",
        },
      ],
    },

    { type: "h2", texte: "Un espace pour le deuil, à l'abri de la pression" },
    {
      type: "p",
      texte:
        "L'entourage joue un rôle précieux, puis montre ses limites. Passé les premiers " +
        "temps, les proches, souvent mal à l'aise devant une tristesse qui dure, se " +
        "mettent à encourager : « sois courageux », « il faut tourner la page », « la vie " +
        "continue ». Ces phrases sont dites pour aider. Elles isolent et culpabilisent.",
    },
    {
      type: "p",
      texte:
        "Le cabinet du psychologue offre l'inverse de cette pression : un espace où " +
        "toutes les émotions du deuil peuvent être déposées, sans avoir à faire bonne " +
        "figure.",
    },
    {
      type: "liste",
      items: [
        "le droit de ne pas aller bien : dire son épuisement, s'effondrer, dire que tout " +
          "est noir ;",
        "la place des émotions difficiles à avouer : la colère, la culpabilité (« si " +
          "j'avais fait ceci… »), et parfois le soulagement, après une longue maladie ou " +
          "une relation qui faisait souffrir ;",
        "le respect de votre rythme : le thérapeute ne tient pas de chronomètre. Il " +
          "accueille les silences, les larmes et les répétitions nécessaires, sans " +
          "chercher à réparer vite.",
      ],
    },

    { type: "h2", texte: "Vers une vie transformée" },
    {
      type: "p",
      texte:
        "On ne sort pas d'un deuil tout à fait le même, et l'on ne retrouve pas sa « vie " +
        "d'avant » : la perte a modifié le paysage intérieur. Mais il est possible de " +
        "construire une vie après. Une vie différente, transformée, qui vaut de nouveau " +
        "la peine d'être vécue.",
    },
    {
      type: "p",
      texte:
        "En s'autorisant à éprouver la douleur de l'absence, en acceptant le désordre des " +
        "vagues émotionnelles et en trouvant une place apaisée pour ses souvenirs, on se " +
        "reconstruit pas à pas. Le cadre thérapeutique est là pour que chaque pas, aussi " +
        "petit ou tremblant soit-il, se fasse avec douceur envers soi-même.",
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
