/**
 * SOURCE UNIQUE des données du cabinet.
 *
 * Toute donnée factuelle (adresse, téléphone, titres, honoraires, horaires)
 * vit ICI et nulle part ailleurs. Elle alimente le JSON-LD, le footer, les
 * mentions légales et la page auteur. Ne jamais recopier une de ces valeurs
 * en dur dans un composant : le NAP doit rester strictement identique partout,
 * y compris avec la fiche Google Business Profile (cf. SEO_MASTER § 6.1).
 *
 * Référence : docs/donnees-vincent.md
 */

export const SITE_URL = "https://psychologuenantes-vincentrousseau.fr" as const;

export const praticien = {
  nom: "Vincent Rousseau",
  /** Ordre volontaire : les deux titres protégés d'abord. */
  titres: ["Psychologue clinicien", "Psychothérapeute", "Psychanalyste"],
  titreCourt: "Psychologue clinicien - psychanalyste",
  /**
   * ADELI est en cours de remplacement par le RPPS pour les psychologues.
   * Si Vincent obtient un RPPS, l'ajouter ici et afficher les deux le temps
   * de la transition.
   */
  adeli: "44 93 1444 2",
  siret: "511 87 30 36 000 55",
  /** Autorités auprès desquelles les déclarations ont été faites. */
  declarations: {
    psychologue:
      "Direction des Affaires Départementales et Sociales de Loire-Atlantique",
    activiteLiberale: "URSSAF de Loire-Atlantique",
  },
  diplome: {
    /* Intitulé officiel complet du diplôme. Il mentionne les enfants et les
       adolescents parce que c'est le périmètre de la formation ; la pratique
       de Vincent, elle, est réservée aux adultes (cf. `publics`). */
    intitule:
      "Master professionnel de psychologie clinique, psychopathologie et santé mentale " +
      "— enfants, adolescents et adultes",
    etablissement: "Université Paul Valéry Montpellier III",
  },
  /** Formulation de Vincent, à la première personne. */
  doubleTitre:
    "Le double titre de « psychologue clinicien-psychanalyste » sous lequel je me présente " +
    "est une manière de mettre l'accent sur ma double formation, menée en parallèle et " +
    "complémentaire.",
  rattachements: [
    "Association lacanienne internationale (ALI)",
    "École psychanalytique de Bretagne (EPB)",
  ],
} as const;

export const cabinet = {
  rue: "10 bis rue de la Havane",
  codePostal: "44000",
  ville: "Nantes",
  pays: "FR",
  /** À remplacer par les coordonnées réelles avant mise en production. */
  geo: { latitude: null as number | null, longitude: null as number | null },
  acces: {
    tram: "Ligne 1, arrêt « Manufacture »",
    reperes: "Derrière la Manufacture des Tabacs, proche Gare Nord et Jardin des Plantes",
    stationnement: "Places payantes à proximité",
    /** Information absente du site actuel — à obtenir auprès de Vincent. */
    pmr: null as string | null,
  },
} as const;

export const contact = {
  telephone: "06 52 30 75 86",
  telephoneE164: "+33652307586",
  /**
   * Adresse Gmail héritée du site actuel. Recommandation : basculer sur une
   * adresse du domaine (confidentialité + image professionnelle).
   */
  email: "vincentrousseau.psy@gmail.com",
} as const;

/**
 * Prise de rendez-vous.
 *
 * `plateforme` reste `null` tant que Vincent n'ouvre pas de compte sur une
 * plateforme hébergée HDS (Doctolib ou équivalent). Le master la place en
 * canal n° 2 (§ 9.3) : dès qu'elle existe, renseigner l'objet ici suffit à
 * la faire apparaître sur la page de rendez-vous, sans toucher au JSX.
 *
 * `delaiReponse` est un engagement affiché au public. VALIDÉ PAR VINCENT le
 * 2026-09-08 : « sous 48 heures ouvrées ». Ne jamais le modifier sans son
 * accord — le § 9.4 du master en fait un élément de réassurance, et un délai
 * annoncé qui n'est pas tenu se retourne contre le praticien.
 */
export const priseRdv = {
  plateforme: null as { nom: string; url: string } | null,
  delaiReponse: "sous 48 heures ouvrées",
  /** Ce qui se passe concrètement après l'envoi du formulaire (§ 9.4). */
  suite: "Je vous rappelle au numéro indiqué, sur l'un des créneaux que vous avez cochés.",
} as const;

export const horaires = {
  jours: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  ouverture: "09:00",
  fermeture: "20:00",
  libelle: "Du lundi au vendredi, de 9 h à 20 h",
  modalite: "Sur rendez-vous, en présentiel uniquement",
} as const;

/**
 * Déroulé des séances.
 *
 * ⚠️ `duree` n'est PAS une donnée relevée : le site actuel ne l'affiche nulle
 * part, elle n'apparaît qu'indirectement dans une réponse de FAQ. À confirmer
 * par Vincent avant mise en ligne (cf. docs/donnees-vincent.md § 4).
 *
 * La fréquence, elle, est bien sourcée : « la fréquence se décide lors du
 * premier rendez-vous », le rythme hebdomadaire n'étant que le plus courant.
 * Ne pas la présenter comme une règle.
 */
export const seance = {
  duree: "de 45 minutes à une heure",
  dureeConfirmee: false,
  rythmeCourant: "une séance par semaine",
} as const;

export const honoraires = {
  min: 40,
  max: 60,
  devise: "EUR",
  /** Formulation sobre imposée par le § 2.2 du master : pas de vocabulaire commercial. */
  modulation: "Le tarif tient compte des moyens financiers de chacun.",
} as const;

/**
 * Dispositif « Mon soutien psy » de l'Assurance Maladie.
 *
 * Conditions VÉRIFIÉES SUR AMELI.FR LE 2026-09-08. Le dispositif a déjà changé
 * plusieurs fois depuis sa création : revérifier à chaque révision de la page
 * tarifs, et ne jamais recopier ces valeurs de mémoire.
 *
 * `partenaire` est un interrupteur à trois états, et c'est volontaire :
 *   true  → Vincent est psychologue partenaire du dispositif
 *   false → il ne l'est pas
 *   null  → on ne sait pas encore (état actuel)
 * La page /tarifs-et-remboursement/ affiche un texte juste dans les trois cas.
 * Elle peut donc être mise en ligne sans attendre sa réponse ; il suffira de
 * basculer cette valeur.
 *
 * ⚠️ Si Vincent est partenaire, la séance relevant du dispositif est à 50 €,
 * tarif fixé par la convention — ce qui se situe dans sa fourchette actuelle
 * mais n'est plus modulable. À lui signaler.
 */
export const monSoutienPsy = {
  partenaire: null as boolean | null,
  seancesParAn: 12,
  tarifSeance: 50,
  tauxAssuranceMaladie: 60,
  /** Depuis juin 2024, l'adressage par un médecin n'est plus obligatoire. */
  adressageMedicalRequis: false,
  verifieLe: "2026-09-08",
  urlAmeli:
    "https://www.ameli.fr/assure/remboursements/rembourse/remboursement-seance-psychologue-mon-soutien-psy",
} as const;

/**
 * Publics reçus. Contrainte structurante : Vincent ne reçoit QUE des adultes.
 * Aucune page, aucun contenu et aucun ciblage de mot-clé ne doit viser les
 * enfants, les adolescents ou les couples (cf. docs/donnees-vincent.md § 5).
 */
export const publics = {
  /** Libellés déjà en minuscules : ils s'insèrent dans une phrase. */
  recus: ["adultes", "jeunes adultes"],
  nonRecus: ["enfants", "adolescents", "couples"],
  ageMinimum: 18,
  /** Formulation prête à l'emploi, pour éviter les répétitions maladroites. */
  libelle: "aux adultes et aux jeunes adultes, à partir de 18 ans",
} as const;

/**
 * Mentions obligatoires de l'éditeur et de l'hébergeur (LCEN, art. 6-III).
 *
 * ⚠️ CHANGEMENT PAR RAPPORT AU SITE ACTUEL : l'hébergeur n'est plus o2switch
 * mais Vercel. Publier les mentions avec l'ancien hébergeur serait une
 * information fausse sur une page dont c'est précisément l'objet.
 *
 * ⚠️ L'adresse de Vercel ci-dessous provient d'annuaires d'entreprises, pas
 * d'une source primaire, et Vercel ne publie pas de numéro de téléphone
 * d'assistance. À CONFIRMER sur vercel.com avant la mise en ligne.
 *
 * `directeurPublication` : la LCEN l'exige. C'est Vincent, qui est aussi
 * l'éditeur — cas normal pour un site de praticien.
 */
export const editeur = {
  directeurPublication: "Vincent Rousseau",
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "650 California Street, San Francisco, CA 94108, États-Unis",
    site: "https://vercel.com",
    telephone: null as string | null,
  },
} as const;

/** Numéros d'urgence du bandeau obligatoire (SEO_MASTER § 2.1). */
export const urgence = {
  preventionSuicide: { numero: "3114", libelle: "Prévention du suicide, 24h/24, gratuit" },
  secours: { numero: "15", libelle: "SAMU" },
  secoursEurope: { numero: "112", libelle: "Urgences européennes" },
} as const;

export const adressePostale = `${cabinet.rue}, ${cabinet.codePostal} ${cabinet.ville}`;
