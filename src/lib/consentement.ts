/**
 * Consentement aux traceurs de mesure d'audience.
 *
 * RÈGLES APPLIQUÉES (article 82 de la loi Informatique et Libertés, et
 * recommandation « cookies et autres traceurs » de la CNIL du 17 septembre
 * 2020) :
 *
 *  1. AUCUN traceur n'est déposé avant un choix explicite. Le script de mesure
 *     n'est pas seulement neutralisé : il n'est pas chargé du tout. C'est la
 *     seule façon d'être certain qu'aucune requête ne part.
 *  2. Refuser doit être aussi simple qu'accepter — deux boutons de même poids,
 *     au même endroit, en un clic chacun.
 *  3. Poursuivre la navigation ne vaut pas consentement : rien ne se déclenche
 *     au défilement ni au clic ailleurs dans la page.
 *  4. Le refus est mémorisé aussi longtemps que l'acceptation, sans quoi la
 *     bannière reviendrait à chaque page — ce qui revient à harceler
 *     l'internaute jusqu'à ce qu'il cède.
 *  5. Le choix est révocable à tout moment, depuis la politique de
 *     confidentialité.
 *  6. Il est redemandé au bout de six mois, durée recommandée par la CNIL.
 *
 * POURQUOI `localStorage` ET NON UN COOKIE. Déposer un cookie pour enregistrer
 * un refus de cookies est contradictoire en apparence, même si la loi
 * l'autorise (le support du consentement est exempté). `localStorage` évite la
 * question, n'est jamais transmis au serveur, et reste sur l'appareil.
 *
 * Conséquence assumée : le choix vaut par navigateur et par appareil. Effacer
 * les données du site le remet à zéro, et la bannière réapparaît. C'est le
 * comportement attendu.
 */

export type Consentement = "accepte" | "refuse";

const CLE = "consentement-mesure-audience";

/** Six mois, en millisecondes. Durée recommandée par la CNIL. */
const VALIDITE = 6 * 30 * 24 * 60 * 60 * 1000;

/**
 * Événement interne : la bannière et le chargeur de mesure vivent dans deux
 * composants distincts, et le second doit réagir au choix fait dans le premier
 * sans rechargement de page. `storage` ne conviendrait pas — il ne se déclenche
 * que dans les AUTRES onglets, jamais dans celui qui écrit.
 */
export const EVENEMENT_CONSENTEMENT = "consentement-modifie";

type Enregistrement = { choix: Consentement; date: number };

/**
 * Lit le choix en vigueur. Renvoie `null` si aucun choix n'a été fait, si le
 * choix a plus de six mois, ou si le stockage est indisponible — navigation
 * privée, réglages restrictifs, rendu côté serveur. Dans tous ces cas la
 * bannière s'affiche et rien n'est chargé : l'absence de réponse ne vaut jamais
 * acceptation.
 */
export function lireConsentement(): Consentement | null {
  if (typeof window === "undefined") return null;

  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;

    const { choix, date } = JSON.parse(brut) as Enregistrement;
    if (choix !== "accepte" && choix !== "refuse") return null;
    if (Date.now() - date > VALIDITE) return null;

    return choix;
  } catch {
    return null;
  }
}

/** Enregistre le choix et prévient les composants qui en dépendent. */
export function ecrireConsentement(choix: Consentement): void {
  try {
    const enregistrement: Enregistrement = { choix, date: Date.now() };
    window.localStorage.setItem(CLE, JSON.stringify(enregistrement));
  } catch {
    /* Stockage refusé par le navigateur. On n'insiste pas : le choix vaudra
       pour la session en cours via l'événement ci-dessous, et la bannière
       reviendra à la prochaine visite. Mieux vaut cela qu'une erreur. */
  }

  window.dispatchEvent(new CustomEvent(EVENEMENT_CONSENTEMENT, { detail: choix }));
}

/**
 * Efface le choix : la bannière réapparaît et la mesure s'arrête.
 *
 * Ne supprime pas les cookies déjà déposés par Google — un site ne peut effacer
 * que les cookies de son propre domaine, et `_ga` en fait partie, mais leur
 * suppression fiable relève du navigateur. La politique de confidentialité
 * indique donc aussi comment les supprimer soi-même.
 */
export function retirerConsentement(): void {
  try {
    window.localStorage.removeItem(CLE);
  } catch {
    /* Voir ci-dessus. */
  }

  window.dispatchEvent(new CustomEvent(EVENEMENT_CONSENTEMENT, { detail: null }));
}
