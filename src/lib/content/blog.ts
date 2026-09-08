import type { Source } from "@/components/seo/Sources";
import { pourquoiPasDeVisio } from "@/lib/content/articles/pourquoi-pas-de-visio";
import { secretProfessionnel } from "@/lib/content/articles/secret-professionnel";

/**
 * Registre du blog.
 *
 * Pas de CMS et pas de MDX : Vincent n'édite pas le site (§ 3.1), et chaque
 * article passe de toute façon par une relecture clinique avant publication.
 * Un module TypeScript par article donne le typage, la relecture en diff, et
 * zéro dépendance supplémentaire.
 *
 * RYTHME : 2 articles par mois MAXIMUM (§ 7). Mieux vaut huit articles solides
 * qu'une pile de contenu mince — en YMYL, le contenu faible pèse sur tout le
 * domaine, pas seulement sur la page qui le porte.
 *
 * AVANT D'AJOUTER UN ARTICLE, vérifier qu'aucune page existante ne cible déjà
 * son mot-clé principal (`motCle`). Un article n'entre jamais en concurrence
 * avec une page du site : il l'alimente et pointe vers elle.
 */

/**
 * Lien interne rendu à la suite d'un paragraphe.
 *
 * Il existe pour une raison de fond : le § 7.2 veut qu'un article ALIMENTE les
 * pages du site, jamais qu'il les concurrence. Sans ce champ, un article ne
 * pouvait pointer nulle part — il captait du trafic et le gardait.
 *
 * Volontairement limité aux liens INTERNES : une source externe n'a pas à être
 * glissée dans une phrase, elle va dans le bloc `sources`, où elle est
 * attribuée à son éditeur et vérifiable.
 */
export type LienInterne = { href: string; libelle: string };

export type Bloc =
  | { type: "p"; texte: string; lien?: LienInterne }
  | { type: "h2"; texte: string }
  | { type: "liste"; items: string[] }
  | { type: "encadre"; titre: string; texte: string }
  | { type: "citation"; texte: string; source?: string };

export type Article = {
  slug: string;
  titre: string;
  /** Sert d'introduction ET de meta description : une seule formulation à tenir. */
  chapeau: string;
  publieLe: string;
  modifieLe: string;
  /**
   * Mot-clé principal visé. Documenté pour la règle anti-cannibalisation :
   * aucun article ne doit reprendre le mot-clé d'une page du site.
   */
  motCle: string;
  /** Minimum 3 sources primaires en YMYL (§ 5). */
  sources: Source[];
  /** Affiche le bandeau d'urgence : obligatoire dès qu'un sujet à risque est évoqué. */
  urgence?: boolean;
  corps: Bloc[];
};

/** Du plus récent au plus ancien. */
export const ARTICLES: Article[] = [pourquoiPasDeVisio, secretProfessionnel];

export const articleParSlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
