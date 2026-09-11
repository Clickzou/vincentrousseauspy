/**
 * Œuvres du carrousel d'accueil.
 *
 * TOUTES sont dans le domaine public en France : leur auteur est mort avant
 * 1956 (règle des 70 ans post mortem, année de référence 2026).
 *
 *   - Henri Matisse .... 1869-1954 → domaine public depuis le 1er janvier 2025
 *   - Vassily Kandinsky  1866-1944 → domaine public depuis 2015
 *   - Félix Vallotton .. 1865-1925 → domaine public depuis 1996
 *
 * Les deux œuvres des cartes du blog (Vallotton, « La Chambre rouge », et
 * Kandinsky, « Tableau au centre vert ») viennent de Wikimedia Commons,
 * marquées domaine public : le serveur d'images de l'Art Institute oppose
 * désormais un contrôle anti-robot. Elles sont déclarées dans les articles
 * (`illustration`), pas ici.
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
 * Source des fichiers : Art Institute of Chicago, collection en accès ouvert.
 * Reproductions fidèles d'œuvres 2D du domaine public : la photographie ne
 * crée pas de droit nouveau en droit français.
 */

export type Oeuvre = {
  src: string;
  auteur: string;
  titre: string;
  annee: string;
};

export const OEUVRES_ACCUEIL: Oeuvre[] = [
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
