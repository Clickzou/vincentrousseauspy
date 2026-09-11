import type { Source } from "@/components/seo/Sources";
import type { Oeuvre } from "@/lib/content/oeuvres";
import { allianceTherapeutiqueTransfert } from "@/lib/content/articles/alliance-therapeutique-transfert";
import { angoisse } from "@/lib/content/articles/angoisse";
import { associationLibre } from "@/lib/content/articles/association-libre";
import { compulsionDeRepetition } from "@/lib/content/articles/compulsion-de-repetition";
import { culpabilite } from "@/lib/content/articles/culpabilite";
import { enfancePsychanalyse } from "@/lib/content/articles/enfance-psychanalyse";
import { estimeDeSoi } from "@/lib/content/articles/estime-de-soi";
import { pourquoiPasDeVisio } from "@/lib/content/articles/pourquoi-pas-de-visio";
import { psychologueConseils } from "@/lib/content/articles/psychologue-conseils";
import { seanceEnPresentiel } from "@/lib/content/articles/seance-en-presentiel";
import { secretProfessionnel } from "@/lib/content/articles/secret-professionnel";
import { silenceEnSeance } from "@/lib/content/articles/silence-en-seance";
import { symptomePsychanalyse } from "@/lib/content/articles/symptome-psychanalyse";
import { therapieQuiAvance } from "@/lib/content/articles/therapie-qui-avance";
import { travailDuDeuil } from "@/lib/content/articles/travail-du-deuil";

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

/**
 * Élément de liste : du texte simple, ou un intitulé suivi de son explication
 * (« Le silence de réflexion : c'est le moment où… »), rendu en gras.
 */
export type ItemListe = string | { terme: string; texte: string };

export type Bloc =
  | { type: "p"; texte: string; lien?: LienInterne }
  | { type: "h2"; texte: string }
  | { type: "liste"; items: ItemListe[] }
  | { type: "encadre"; titre: string; texte: string }
  | { type: "citation"; texte: string; source?: string };

export type Article = {
  slug: string;
  titre: string;
  /** Sert d'introduction ET de meta description : une seule formulation à tenir. */
  chapeau: string;
  /**
   * Versions courtes, POUR LA SERP UNIQUEMENT, quand la formulation éditoriale
   * dépasse ce que Google affiche — environ 60 caractères de titre suffixe
   * compris, et 160 de description.
   *
   * Le principe « une seule formulation à tenir » reste la règle : ces champs ne
   * se renseignent qu'après mesure, jamais par habitude. Un bon chapeau qui
   * tient dans la limite n'a besoin d'aucun des deux.
   */
  metaTitre?: string;
  metaDescription?: string;
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
  /**
   * Œuvre affichée sur la carte du blog. Domaine public uniquement, et jamais
   * une œuvre déjà employée ailleurs sur le site (règles dans `oeuvres.ts`).
   */
  illustration?: Oeuvre;
  corps: Bloc[];
};

/**
 * Articles PUBLIÉS, du plus récent au plus ancien. Eux seuls ont une page, une
 * entrée au sitemap et une carte sur /blog/.
 */
export const ARTICLES: Article[] = [pourquoiPasDeVisio, secretProfessionnel];

/**
 * Articles ÉCRITS, EN ATTENTE DE PUBLICATION, dans l'ordre où ils paraîtront.
 *
 * Treize textes transmis d'un coup par Vincent le 2026-09-11 (document
 * « Articles & Vidéos »). Le § 7.1 du master plafonne le rythme à deux par
 * mois : l'agence a choisi de tout préparer et d'en publier deux par mois, le
 * 1er et le 15. Le quota de septembre étant atteint, la file s'ouvre en
 * octobre et se referme en avril 2027. L'ordre alterne un texte sur la séance
 * (le frein n° 1, § 7.3) et un texte sur un motif de souffrance.
 *
 * Ces articles ne sont importés nulle part ailleurs : aucune page, aucune URL,
 * rien dans le sitemap. `publieLe` y porte la date PRÉVUE.
 *
 * POUR PUBLIER (chaque 1er et 15 du mois) :
 *   1. vérifier que Vincent a validé le texte (§ 7.1) — les écarts avec son
 *      document sont listés en tête de chaque module ;
 *   2. déplacer le premier article de cette file en tête de `ARTICLES`, et
 *      ajuster `publieLe` et `modifieLe` à la date réelle ;
 *   3. déployer. `verifierPubliable` bloque la compilation s'il manque
 *      quelque chose.
 */
export const A_PARAITRE: Article[] = [
  silenceEnSeance, //          1er octobre 2026
  travailDuDeuil, //           15 octobre
  psychologueConseils, //      1er novembre
  angoisse, //                 15 novembre
  associationLibre, //         1er décembre
  culpabilite, //              15 décembre
  allianceTherapeutiqueTransfert, // 1er janvier 2027
  estimeDeSoi, //              15 janvier
  enfancePsychanalyse, //      1er février
  compulsionDeRepetition, //   15 février
  symptomePsychanalyse, //     1er mars
  therapieQuiAvance, //        15 mars
  seanceEnPresentiel, //       1er avril
];

/**
 * Garde-fou : un article ne peut pas être publié s'il lui manque ce que le
 * master exige. L'erreur interrompt la compilation — c'est voulu : un article
 * sans sources en YMYL expose Vincent avant de nuire au référencement.
 *   - 3 sources d'autorité au moins (§ 2.1, § 5) ;
 *   - une œuvre pour sa carte ;
 *   - aucun lien vers un article du blog qui ne serait pas encore publié
 *     (§ 5 : jamais de lien d'un contenu publié vers un brouillon).
 */
function verifierPubliable(article: Article) {
  const manques: string[] = [];
  if (article.sources.length < 3) {
    manques.push(`${article.sources.length} source(s) au lieu de 3 au moins`);
  }
  if (!article.illustration) manques.push("aucune œuvre");
  for (const bloc of article.corps) {
    const href = bloc.type === "p" ? bloc.lien?.href : undefined;
    if (href?.startsWith("/blog/") && !ARTICLES.some((a) => href === `/blog/${a.slug}/`)) {
      manques.push(`lien vers un article non publié (${href})`);
    }
  }
  if (manques.length > 0) {
    throw new Error(`Article « ${article.slug} » non publiable : ${manques.join(" ; ")}.`);
  }
}
ARTICLES.forEach(verifierPubliable);

export const articleParSlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
