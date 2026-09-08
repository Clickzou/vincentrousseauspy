/**
 * Registre des URLs du site — source unique du sitemap et du plan du site.
 *
 * Un site de praticien tient en 25-40 URLs (SEO_MASTER § 3.2), donc un seul
 * sitemap non segmenté suffit. Les pages `noindex` en sont exclues.
 *
 * `origine` documente le sort de chaque URL WordPress : conservée ou créée.
 * Une URL marquée `conservee` ne doit JAMAIS changer de slug — elle porte le
 * référencement actuel (cf. docs/seo/inventaire-wordpress.md § 6).
 */

export type Origine = "conservee" | "nouvelle";

export type Entree = {
  slug: string;
  titre: string;
  origine: Origine;
  /** Priorité relative dans le sitemap. */
  priorite: number;
  /** Exclue du sitemap et marquée noindex. */
  noindex?: boolean;
  /** Note de migration ou de ciblage. */
  note?: string;
};

export const PAGES: Entree[] = [
  {
    slug: "/",
    titre: "Psychologue à Nantes",
    origine: "conservee",
    priorite: 1.0,
    note:
      "Porte 33 des 38 mots-clés suivis par l'agence, et 15 des 15 positions relevées par " +
      "Sistrix. Cible : « psychologue nantes » (pos. 3 à 5 selon la source).",
  },
  {
    slug: "/vincent-rousseau-psychologue/",
    titre: "Vincent Rousseau, psychologue clinicien et psychanalyste",
    origine: "nouvelle",
    priorite: 0.9,
    note: "Pivot E-E-A-T. Aujourd'hui les crédentiels sont enterrés dans /dispositions-legales/.",
  },
  {
    slug: "/psychotherapeute-nantes/",
    titre: "Psychothérapeute à Nantes",
    origine: "nouvelle",
    priorite: 0.9,
    note: "Cluster ~6 600/mois, actuellement porté par la home en pos. 9. Titre protégé détenu.",
  },
  {
    slug: "/psychanalyste-nantes/",
    titre: "Psychanalyste à Nantes",
    origine: "conservee",
    priorite: 0.85,
    note:
      "⚠️ NON positionnée : elle ne ressort que 24e sur « rousseau vincent ». " +
      "C'est l'ACCUEIL qui est 2e sur « psychanalyste nantes » (relevé du 2026-09-07). " +
      "Contenu WordPress : « Qui, quand et où ? », sans rapport avec le slug.",
  },
  {
    slug: "/psychologue-clinicien-nantes/",
    titre: "Pourquoi consulter ?",
    origine: "conservee",
    priorite: 0.8,
  },
  {
    slug: "/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/",
    titre: "Les différents « Psy » : psychologue, psychothérapeute, psychiatre, psychanalyste",
    origine: "conservee",
    priorite: 0.75,
    note: "Page pédagogique. Permet la visibilité sur les requêtes « psychiatre … » SANS revendiquer le titre.",
  },
  {
    slug: "/consultations/",
    titre: "Les consultations : déroulé, cadre et première séance",
    origine: "nouvelle",
    priorite: 0.8,
    note: "Adultes uniquement (18 ans+). Pas de sous-pages par public.",
  },
  {
    slug: "/tarifs-et-remboursement/",
    titre: "Tarifs et remboursement",
    origine: "nouvelle",
    priorite: 0.85,
    note: "40-60 €. « tarif psychologue nantes » déclenche un Aperçu IA — aucune page dédiée aujourd'hui.",
  },
  {
    slug: "/cabinet-nantes/",
    titre: "Le cabinet à Nantes : accès et plan",
    origine: "nouvelle",
    priorite: 0.7,
    note: "Tram L1 « Manufacture ». Ancrage local réel (§ 6.3).",
  },
  {
    slug: "/rendez-vous-psychologue-nantes/",
    titre: "Prendre rendez-vous",
    origine: "conservee",
    priorite: 0.9,
    note: "Conversion principale. Formulaire à refondre : aucun champ libre, aucun stockage (§ 2.4).",
  },
  {
    slug: "/contact-psychologue-clinicien-nantes/",
    titre: "Contact",
    origine: "conservee",
    priorite: 0.7,
    note: "Positionnée sur « vincent rousseau » (pos. 37).",
  },
  {
    slug: "/aide-faq/",
    titre: "Aide et questions fréquentes",
    origine: "conservee",
    priorite: 0.7,
  },
  { slug: "/blog/", titre: "Blog", origine: "nouvelle", priorite: 0.6 },
  { slug: "/plan-du-site/", titre: "Plan du site", origine: "nouvelle", priorite: 0.3 },
  {
    slug: "/mentions-legales/",
    titre: "Mentions légales",
    origine: "conservee",
    priorite: 0.1,
    noindex: true,
    note: "Ajouter le n° ADELI, absent aujourd'hui.",
  },
  {
    slug: "/politique-de-confidentialite/",
    titre: "Politique de confidentialité",
    origine: "nouvelle",
    priorite: 0.1,
    noindex: true,
    note: "Remplace /politique-de-cookies-ue/ (vide). Doit détailler ce qui n'est PAS collecté.",
  },
  {
    slug: "/merci-pour-votre-demande/",
    titre: "Merci pour votre demande",
    origine: "conservee",
    priorite: 0.1,
    noindex: true,
  },
];

/** Pages réellement indexables — alimente le sitemap. */
export const pagesIndexables = () => PAGES.filter((p) => !p.noindex);
