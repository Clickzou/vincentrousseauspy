/**
 * Générateurs JSON-LD.
 *
 * Trois schémas seulement, assemblés en `@graph` (SEO_MASTER § 3.3) :
 *   - LocalBusiness + MedicalBusiness : le cabinet, NAP identique à Google Business Profile
 *   - Person : Vincent, ses titres et son diplôme — pivot E-E-A-T en YMYL
 *   - Article + BreadcrumbList : contenus cliniques et blog
 * Plus `ScholarlyArticle`, pour les publications de Vincent en revue : elles
 * rattachent l'entité Person à des textes vérifiables chez un éditeur tiers.
 *
 * DEUX INTERDITS ABSOLUS :
 *   - Pas d'`AggregateRating` : les avis ne sont pas sollicités (§ 2.3).
 *   - Pas du type `Physician` : il désigne un médecin. L'employer pour un
 *     psychologue reviendrait à déclarer un titre inexact.
 */

import {
  cabinet,
  contact,
  honoraires,
  horaires,
  praticien,
  SITE_URL,
} from "@/lib/site-config";
import { absoluteUrl } from "@/lib/url-helpers";
import type { Publication, Video } from "@/lib/content/publications";

const PERSON_ID = `${SITE_URL}/#vincent-rousseau`;
const BUSINESS_ID = `${SITE_URL}/#cabinet`;

/** Profils externes vérifiables — renforce l'entité pour le SEO local et le GEO (§ 11.1). */
const profilsExternes: string[] = [
  // À compléter : fiche Google Business Profile, annuaire Ameli, ALI, EPB…
];

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: praticien.nom,
    jobTitle: praticien.titres,
    description: `${praticien.titreCourt} à ${cabinet.ville}.`,
    url: absoluteUrl("vincent-rousseau-psychologue"),
    identifier: [
      { "@type": "PropertyValue", propertyID: "ADELI", value: praticien.adeli },
      { "@type": "PropertyValue", propertyID: "SIRET", value: praticien.siret },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: praticien.diplome.intitule,
        recognizedBy: { "@type": "CollegeOrUniversity", name: praticien.diplome.etablissement },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Titre de psychologue (titre protégé — loi n° 85-772 du 25 juillet 1985)",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Titre de psychothérapeute (titre protégé — registre national ARS)",
      },
    ],
    memberOf: praticien.rattachements.map((nom) => ({ "@type": "Organization", name: nom })),
    knowsAbout: ["Psychologie clinique", "Psychanalyse", "Psychopathologie", "Psychothérapie"],
    ...(profilsExternes.length ? { sameAs: profilsExternes } : {}),
  };
}

export function localBusinessSchema() {
  const { geo } = cabinet;
  return {
    "@type": ["LocalBusiness", "MedicalBusiness"],
    "@id": BUSINESS_ID,
    name: `${praticien.nom} — ${praticien.titreCourt}`,
    url: SITE_URL,
    telephone: contact.telephoneE164,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: cabinet.rue,
      postalCode: cabinet.codePostal,
      addressLocality: cabinet.ville,
      addressCountry: cabinet.pays,
    },
    ...(geo.latitude !== null && geo.longitude !== null
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }
      : {}),
    areaServed: { "@type": "City", name: cabinet.ville },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...horaires.jours],
        opens: horaires.ouverture,
        closes: horaires.fermeture,
      },
    ],
    priceRange: `${honoraires.min}–${honoraires.max} ${honoraires.devise}`,
    currenciesAccepted: honoraires.devise,
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    // Volontairement PAS d'aggregateRating : cf. en-tête de fichier.
  };
}

export type Fil = { nom: string; url: string };

export function breadcrumbSchema(fil: Fil[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: fil.map((etape, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: etape.nom,
      item: absoluteUrl(etape.url),
    })),
  };
}

export type ArticleMeta = {
  titre: string;
  description: string;
  slug: string;
  publieLe: string;
  modifieLe: string;
  /** Sources d'autorité citées — minimum 3 en YMYL (§ 5). */
  sources?: string[];
  /** Chemin d'un fichier sous `public/` : Google attend une image pour un Article. */
  image?: string;
};

export function articleSchema(a: ArticleMeta) {
  return {
    "@type": "Article",
    headline: a.titre,
    description: a.description,
    url: absoluteUrl(a.slug),
    datePublished: a.publieLe,
    dateModified: a.modifieLe,
    author: { "@id": PERSON_ID },
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "fr-FR",
    ...(a.sources?.length ? { citation: a.sources } : {}),
    /* Pas d'`absoluteUrl` : il ajoute un slash final, faux pour un fichier. */
    ...(a.image ? { image: `${SITE_URL}${a.image}` } : {}),
  };
}

/**
 * Publication en revue. L'URL est celle de l'éditeur, pas celle du site : le
 * texte n'est pas reproduit ici, et déclarer une URL locale reviendrait à
 * revendiquer une page qui n'existe pas.
 */
export function publicationSchema(p: Publication) {
  return {
    "@type": "ScholarlyArticle",
    headline: p.titre,
    abstract: p.resume,
    author: { "@id": PERSON_ID },
    ...(p.intervieweur ? { contributor: { "@type": "Person", name: p.intervieweur } } : {}),
    datePublished: p.publieLe,
    url: p.url,
    ...(p.doi
      ? {
          identifier: { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
          sameAs: `https://doi.org/${p.doi}`,
        }
      : {}),
    pageStart: p.pageDebut,
    pageEnd: p.pageFin,
    isPartOf: {
      "@type": "PublicationIssue",
      issueNumber: String(p.numero),
      isPartOf: { "@type": "Periodical", name: p.revue },
    },
    publisher: { "@type": "Organization", name: p.editeur },
    inLanguage: "fr-FR",
  };
}

/**
 * Vidéo hébergée sur le site. `absoluteUrl` n'est pas utilisé : il ajoute un
 * slash final, correct pour une page, faux pour un fichier.
 */
export function videoSchema(v: Video) {
  return {
    "@type": "VideoObject",
    /* `titre` est celui de la publication : on précise qu'il s'agit de sa
       présentation, pour ne pas donner au VideoObject le nom de l'article. */
    name: `${v.titre} — présentation en vidéo`,
    description: v.description,
    thumbnailUrl: `${SITE_URL}${v.affiche}`,
    contentUrl: `${SITE_URL}${v.fichier}`,
    uploadDate: v.ajouteeLe,
    duration: v.duree,
    width: v.largeur,
    height: v.hauteur,
    inLanguage: "fr-FR",
    creator: { "@id": PERSON_ID },
    isBasedOn: v.article.doi ? `https://doi.org/${v.article.doi}` : v.article.url,
  };
}

export type FaqEntree = { question: string; reponse: string };

export function faqSchema(entrees: FaqEntree[]) {
  return {
    "@type": "FAQPage",
    mainEntity: entrees.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.reponse },
    })),
  };
}

/** Assemble les schémas d'une page en un `@graph` unique. */
export function graph(...noeuds: object[]) {
  return { "@context": "https://schema.org", "@graph": noeuds };
}
