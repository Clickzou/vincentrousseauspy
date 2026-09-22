/**
 * Œuvres du carrousel d'accueil.
 *
 * TOUTES sont dans le domaine public en France : leur auteur est mort avant
 * 1956 (règle des 70 ans post mortem, année de référence 2026).
 *
 *   - Henri Matisse .... 1869-1954 → domaine public depuis le 1er janvier 2025
 *   - Vassily Kandinsky  1866-1944 → domaine public depuis 2015
 *   - Félix Vallotton .. 1865-1925 → domaine public depuis 1996
 *   - Henri Rousseau ... 1844-1910 → domaine public depuis 1981
 *
 * Les œuvres des cartes du blog viennent de Wikimedia Commons, marquées
 * domaine public : le serveur d'images de l'Art Institute oppose désormais un
 * contrôle anti-robot. Elles sont déclarées dans les articles (`illustration`),
 * pas ici. Pour les treize articles de la file (2026-09-11), la palette s'est
 * élargie à des peintres de la même époque, tous morts avant 1956 et pour des
 * œuvres antérieures à 1931 (domaine public en France ET aux États-Unis, sans
 * quoi Commons ne les héberge pas) : Vuillard († 1940), Hammershøi († 1916),
 * Klee († 1940), Macke († 1914), Marc († 1916), Jawlensky († 1941).
 *
 * Le droit moral est perpétuel en France : toute œuvre affichée est créditée
 * (auteur, titre, année), même dans le domaine public.
 *
 * ATTENTION — ne JAMAIS réintroduire les visuels du site WordPress : le Miró
 * du hero (mort en 1983, protégé jusqu'en 2054) et les deux Chagall (mort en
 * 1985, protégés jusqu'en 2056) sont sous droits, gérés par l'ADAGP, et leurs
 * fichiers portent en plus un filigrane « WahooArt.com » visible.
 * Cf. docs/donnees-vincent.md § 11.
 *
 * Le 2026-09-18, Vincent a proposé huit œuvres (Word « Les images ») dont un
 * Miró des Constellations, pour l'accueil et pour la page tarifs. Écarté pour
 * cette raison : les sept autres, toutes dans le domaine public, ont été
 * reprises. Les fichiers viennent de Wikimedia Commons (domaine public ou
 * CC0) et non du Word, dont les reproductions de « La Danse » et de « La
 * Musique » étaient des copies repeintes.
 *
 * Le peintre Henri Rousseau n'a aucun lien avec Vincent Rousseau : ses
 * fichiers sont préfixés « henri-rousseau- » pour lever l'ambiguïté.
 *
 * Source des fichiers : Art Institute of Chicago, collection en accès ouvert.
 * Reproductions fidèles d'œuvres 2D du domaine public : la photographie ne
 * crée pas de droit nouveau en droit français.
 */

export type Oeuvre = {
  src: string;
  auteur: string;
  titre: string;
  annee: string;
  /**
   * Cadrage du hero sur ecran etroit, en classes Tailwind (`object-position`).
   *
   * Le hero est en `object-cover` : sur un telephone, le cadre est nettement
   * plus haut que large (390 x 689 environ, soit 0.57) alors que les toiles
   * sont a l'horizontale. L'image est donc rognee SUR LES COTES, et il ne
   * reste que la bande centrale — 52 % de la largeur pour une toile au format
   * 1.13, 33 % pour une toile au format 1.78. Centree par defaut, cette bande
   * ne tombe pas forcement sur le sujet.
   *
   * A ne renseigner que pour une toile dont le sujet est excentre, et toujours
   * avec un `sm:object-center` : sur un ecran large, c'est en hauteur que
   * l'image est rognee, et le decalage horizontal n'aurait plus de sens.
   */
  cadrage?: string;
};

export const OEUVRES_ACCUEIL: Oeuvre[] = [
  // Les trois œuvres choisies par Vincent le 2026-09-18. Elles ouvrent le
  // carrousel : la première porte le LCP et reste seule affichée si le
  // visiteur a demandé moins d'animation.
  //
  // 2026-09-22 — Vincent a photographié le hero sur Composition VIII et
  // demandé que ce soit elle, la première. Elle passe donc devant la
  // Charmeuse, qui tenait la place depuis le 18. Le contraste du blanc y
  // reste conforme : c'est la toile la plus claire des huit, mesurée à 3.00
  // au 5e centile sous l'ancien dégradé DIAGONAL, mais le dégradé vertical
  // mis en place le même jour la fait repasser (cf. le bloc HERO dans
  // page.tsx). Aucun cadrage mobile : la composition occupe toute la toile,
  // la bande centrale ne perd pas de sujet.
  {
    src: "/images/kandinsky-composition-viii-1923.jpg",
    auteur: "Vassily Kandinsky",
    titre: "Composition VIII",
    annee: "1923",
  },
  {
    src: "/images/henri-rousseau-charmeuse-de-serpents-1907.jpg",
    auteur: "Henri Rousseau",
    titre: "La Charmeuse de serpents",
    annee: "1907",
    /* La charmeuse, la lune et l'echassier occupent le tiers gauche de la
       toile ; toute la moitie droite n'est que feuillage. Centree, la bande
       visible sur telephone allait de 24 % a 76 % : la lune et l'oiseau
       tombaient dehors, la charmeuse se retrouvait a cheval sur le bord
       gauche, et il ne restait a l'ecran que des branchages. A 25 %, la bande
       va de 12 % a 64 % et cadre la scene. */
    cadrage: "object-[25%_center] sm:object-center",
  },
  {
    src: "/images/matisse-la-danse-1910.jpg",
    auteur: "Henri Matisse",
    titre: "La Danse",
    annee: "1910",
  },
  {
    src: "/images/matisse-desserte-1915.jpg",
    auteur: "Henri Matisse",
    titre: "Nature morte d'après « La Desserte » de Jan Davidsz. de Heem",
    annee: "1915",
  },
  {
    src: "/images/matisse-femme-devant-aquarium-1921.jpg",
    auteur: "Henri Matisse",
    titre: "Femme devant un aquarium",
    annee: "1921-1923",
  },
  {
    src: "/images/kandinsky-paysage-deux-peupliers-1912.jpg",
    auteur: "Vassily Kandinsky",
    titre: "Paysage aux deux peupliers",
    annee: "1912",
  },
  {
    src: "/images/matisse-nature-morte-geranium-1906.jpg",
    auteur: "Henri Matisse",
    titre: "Nature morte au géranium",
    annee: "1906",
  },
  {
    src: "/images/kandinsky-maisons-a-murnau-1909.jpg",
    auteur: "Vassily Kandinsky",
    titre: "Maisons à Murnau",
    annee: "1909",
  },
];
