/**
 * Contributions scientifiques de Vincent.
 *
 * Transmises par Vincent le 2026-09-11 (document « word3 »), résumés compris.
 * Les textes sont publiés par les Éditions érès et diffusés sur Cairn : ils ne
 * peuvent pas être reproduits sur le site, pour des raisons de droits
 * d'auteur. On les présente, et on renvoie vers l'éditeur.
 *
 * C'est l'un des signaux E-E-A-T les plus forts dont le site dispose : des
 * publications dans des revues de psychanalyse, vérifiables par n'importe
 * qui. Elles sont donc aussi déclarées en JSON-LD (`publicationSchema`), avec
 * l'entité Person du site pour auteur.
 *
 * Les URL Cairn répondent 403 aux robots (vérifié le 2026-09-11) — blocage
 * anti-robot, comme Légifrance. Le DOI du premier article redirige bien vers
 * l'URL retenue ici.
 *
 * ⚠️ `publieLe` : seule la date du premier article est connue au jour près.
 * Pour les deux textes du Coq-Héron, l'année vient de l'URL Cairn
 * (2024-3, 2024-4). Ne pas inventer de jour ni de mois.
 */

export type Publication = {
  titre: string;
  /** Un entretien est mené par un tiers, qu'on nomme. */
  nature: "article" | "entretien";
  intervieweur?: string;
  revue: string;
  numero: number;
  pageDebut: number;
  pageFin: number;
  editeur: string;
  /** Date ISO complète si elle est connue, l'année seule sinon. */
  publieLe: string;
  doi?: string;
  url: string;
  resume: string;
};

/** Du plus récent au plus ancien. */
export const PUBLICATIONS: Publication[] = [
  {
    titre: "Proposition sur l'usage du contre-transfert : l'intervention de l'analyste",
    nature: "article",
    revue: "Cliniques méditerranéennes",
    numero: 113,
    pageDebut: 157,
    pageFin: 173,
    editeur: "Éditions érès",
    publieLe: "2026-04-17",
    doi: "10.3917/cm.113.0157",
    url: "https://shs.cairn.info/revue-cliniques-mediterraneennes-2026-1-page-157?lang=fr",
    resume:
      "Ce travail de recherche propose une clarification clinique autour d'un débat " +
      "historique en psychanalyse : la position de l'analyste dans la cure et le maniement " +
      "de ses propres affects. L'article cherche à articuler les approches freudiennes " +
      "orthodoxes et lacaniennes classiques en invitant à concevoir le contre-transfert " +
      "comme le « transfert de l'analyste » lui-même. L'auteur met en lumière comment le " +
      "concept lacanien de « désir de l'analyste » sert de repère éthique indispensable " +
      "pour négocier ce contre-transfert avec la distance nécessaire, évitant ainsi les " +
      "écueils de la suggestion ou de l'identification imaginaire. La réflexion repose sur " +
      "une distinction conceptuelle claire entre deux modalités dans l'acte analytique : " +
      "d'une part, l'« interprétation » équivoque, qui vise le manque et produit un effet " +
      "de coupure, et d'autre part, l'« intervention de l'analyste », entendue comme un " +
      "acte énonciatif conscient issu du moi et proche des constructions freudiennes. Ce " +
      "texte offre ainsi de nouvelles pistes de réflexion métapsychologiques pour la " +
      "formation des praticiens et la direction des cures.",
  },
  {
    titre:
      "Katabasis : ce que le thème mythologique de la catabase comme rite initiatique du " +
      "héros peut nous enseigner sur le processus dépressif (et incidemment sur la fin de " +
      "l'analyse)",
    nature: "article",
    revue: "Le Coq-Héron",
    numero: 259,
    pageDebut: 38,
    pageFin: 50,
    editeur: "Éditions érès",
    publieLe: "2024",
    url: "https://shs.cairn.info/revue-le-coq-heron-2024-4-page-38?lang=fr&tab=resume",
    resume:
      "Ce travail de recherche explore les analogies et les homologies fondamentales entre " +
      "le motif mythologique universel de la catabase — la descente aux enfers —, le " +
      "processus dépressif et la traversée du fantasme théorisée par Jacques Lacan. En " +
      "voyageant à travers les récits occidentaux, depuis l'Épopée de Gilgamesh jusqu'à la " +
      "littérature du XXe siècle avec Malcolm Lowry, l'article met en lumière la quête de " +
      "l'immortalité perdue comme figure du manque-à-être. L'auteur démontre que le sujet " +
      "engagé dans le parcours de la cure avance sur une ligne de crête étroite, cherchant " +
      "à négocier le passage vers la castration symbolique face aux impasses de la " +
      "souffrance dépressive. L'intérêt de cette réflexion est de faire émerger le partage " +
      "clinique entre une éthique de la jouissance, parfois mortifère, et une éthique du " +
      "désir, proposant ainsi une lecture renouvelée et accessible des enjeux subjectifs " +
      "qui président à la fin de l'analyse.",
  },
  {
    titre:
      "Le pervers narcissique : tentative de déconstruction clinique d'une figure " +
      "archétypale bien contemporaine",
    nature: "entretien",
    intervieweur: "Benoist Réveillé",
    revue: "Le Coq-Héron",
    numero: 258,
    pageDebut: 126,
    pageFin: 135,
    editeur: "Éditions érès",
    publieLe: "2024",
    url: "https://shs.cairn.info/revue-le-coq-heron-2024-3-page-126?lang=fr",
    resume:
      "Cet échange approfondi propose de déconstruire une figure incontournable de notre " +
      "imaginaire contemporain, dont l'évocation tend aujourd'hui à se généraliser face aux " +
      "situations conflictuelles du couple ou du monde professionnel. En s'appuyant sur " +
      "les travaux de Paul-Claude Racamier, l'auteur revisite ce concept historique pour " +
      "le détacher de la légende urbaine ou du seul business de la manipulation, tout en " +
      "ouvrant la réflexion aux dimensions sociologiques qui traversent la clinique. Le " +
      "texte analyse comment certaines mutations de notre postmodernité — marquées par " +
      "l'essor de la technoscience, une forme d'infantilisation et l'impératif de " +
      "consommation — favorisent un climat de déresponsabilisation propice à l'émergence " +
      "de « mouvements perversifs » ou d'une « victimisation ordinaire ». L'entretien " +
      "explore la perversion narcissique non comme une pathologie individuelle et figée, " +
      "mais comme une modalité relationnelle et un système de défense face à une immense " +
      "fragilité interne. L'auteur met en lumière les mécanismes cliniques à l'œuvre — de " +
      "l'emprise par le langage paradoxal jusqu'à la dynamique du couple " +
      "persécuteur-victime —, tout en réinterrogeant la part active et la responsabilité " +
      "de chacun dans le processus de soin. Une réflexion qui interroge la manière dont " +
      "notre époque participe aux formes de la souffrance contemporaine, et rappelle la " +
      "fonction essentielle de désaliénation du travail psychothérapeutique.",
  },
];

export type Video = {
  titre: string;
  /** Texte de Vincent, affiché sous le lecteur et repris en JSON-LD. */
  introduction: string;
  description: string;
  /** Chemins sous `public/`, sans slash final : ce sont des fichiers. */
  fichier: string;
  affiche: string;
  /** Durée ISO 8601, relevée avec ffprobe : 474,8 s. */
  duree: string;
  largeur: number;
  hauteur: number;
  ajouteeLe: string;
  /** La publication que la vidéo présente. */
  article: Publication;
};

/**
 * Présentation vidéo du premier article, réalisée par Vincent avec NotebookLM
 * et transmise le 2026-09-11.
 *
 * HÉBERGÉE SUR LE SITE, et non sur YouTube : un lecteur encastré transmettrait
 * l'adresse IP du visiteur à Google dès l'affichage de la page, avant tout
 * consentement. Ici, `preload="none"` : rien n'est téléchargé avant le clic.
 *
 * Réencodée pour le web depuis l'original de 36 Mo (H.264 CRF 28, audio AAC
 * 64 kb/s mono, `+faststart` pour que la lecture démarre avant la fin du
 * téléchargement) : 8 Mo, texte des diapositives toujours net. L'original
 * n'est pas versionné.
 *
 * ⚠️ PAS DE SOUS-TITRES pour l'instant. Une vidéo parlée devrait en avoir
 * (RGAA 4.1). À produire par transcription, puis à faire relire par Vincent :
 * le vocabulaire analytique ne se transcrit pas sans erreurs.
 */
export const VIDEO_CONTRE_TRANSFERT: Video = {
  titre: "Proposition sur l'usage du contre-transfert : présentation en vidéo",
  introduction:
    "Vous trouverez ci-dessous une présentation de l'article « Proposition sur " +
    "l'usage du contre-transfert : l'intervention de l'analyste » sous forme de vidéo.",
  description:
    "Réalisée avec l'outil NotebookLM, cette séquence propose une synthèse ludique et " +
    "dynamique du texte. Ce format alternatif offre une approche accessible de ses " +
    "enjeux théoriques, que ce soit en guise d'introduction ou pour en découvrir un " +
    "résumé autonome.",
  fichier: "/videos/contre-transfert-intervention-analyste.mp4",
  affiche: "/videos/contre-transfert-intervention-analyste.jpg",
  duree: "PT7M55S",
  largeur: 1280,
  hauteur: 720,
  ajouteeLe: "2026-09-11",
  article: PUBLICATIONS[0],
};
