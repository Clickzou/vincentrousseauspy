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
  titreCourt: "Psychologue clinicien – psychanalyste",
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
  /**
   * Formulation de Vincent, à la première personne.
   * Révisée par le client le 2026-09-10 (document « Refonte site internet
   * Vincent Rousseau », correctif n° 5).
   */
  doubleTitre:
    "Le double titre de « psychologue clinicien-psychanalyste » sous lequel je me présente " +
    "met l'accent sur ma double formation. Ces deux approches, menées en parallèle, se " +
    "complètent pour enrichir ma pratique.",
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
  /**
   * COORDONNÉES DE L'AXE, PAS DU NUMÉRO. Relevées le 8 septembre 2026 auprès
   * d'OpenStreetMap, qui ne connaît pas le 10 bis : c'est le centre de la rue
   * de la Havane, à quelques dizaines de mètres près. Suffisant pour le
   * balisage `LocalBusiness`, où la précision au mètre n'a aucune portée.
   *
   * À affiner depuis la fiche Google Business Profile le jour où elle sera
   * créée : c'est elle, et non ce balisage, qui place le point sur la carte
   * de Google.
   *
   * La requête a par ailleurs confirmé le quartier, utile à /cabinet-nantes/ :
   * Coulmiers — Jardin des Plantes, Malakoff — Saint-Donatien.
   */
  geo: { latitude: 47.2200742 as number | null, longitude: -1.5371571 as number | null },
  acces: {
    tram: "Ligne 1, arrêt « Manufacture »",
    reperes: "Derrière la Manufacture des Tabacs, proche Gare Nord et Jardin des Plantes",
    stationnement: "Places payantes à proximité immédiate",
    /**
     * ⚠️ CORRIGÉ PAR VINCENT LE 2026-09-10 (document « Refonte site internet
     * Vincent Rousseau », correctif n° 14). Le cabinet n'est PAS de plain-pied,
     * comme l'indiquait la version du 8 septembre : le bâtiment a une rampe
     * d'accès à l'entrée, et le cabinet est au 2e étage, desservi par un
     * ascenseur. Ne pas réintroduire « plain-pied » : une personne en fauteuil
     * qui se déplace sur une information fausse subit un préjudice réel.
     *
     * L'invitation à appeler est conservée : la rampe et l'ascenseur ne disent
     * rien de la largeur des portes ni des sanitaires, qui restent inconnues.
     * On annonce ce qu'on sait, on n'étend pas la promesse au non-vérifié.
     */
    pmr: {
      /** Réponse franche, en une phrase : c'est elle qu'on cherche. */
      resume: "Oui, le cabinet est accessible.",
      /** Le détail qui décide réellement du déplacement. */
      detail:
        "Le bâtiment dispose d'une rampe d'accès à l'entrée, et le cabinet se situe au " +
        "2e étage, entièrement desservi par un ascenseur. Si vous vous déplacez en " +
        "fauteuil roulant ou si vous avez un besoin particulier, n'hésitez pas à m'en " +
        "informer par téléphone avant votre première visite, afin que je puisse vous " +
        "accueillir dans les meilleures conditions.",
      /** Résumé d'une ligne, pour les métadonnées et les listes de repères. */
      court: "rampe d'accès et ascenseur",
    } as { resume: string; detail: string; court: string } | null,
  },
} as const;

/**
 * MESURE D'AUDIENCE ET VÉRIFICATION DES OUTILS GOOGLE.
 *
 * Les deux sont volontairement séparés, parce qu'ils n'ont RIEN À VOIR
 * juridiquement :
 *
 *  - `identifiant` (Google Analytics) dépose des cookies et traite des données
 *    personnelles. Il exige un consentement préalable, d'où toute la mécanique
 *    de src/lib/consentement.ts. Tant que la variable est absente, aucune
 *    bannière ne s'affiche et aucun script n'est chargé.
 *
 *  - `verificationGoogle` (Search Console) est une simple balise `meta` qui
 *    prouve la propriété du domaine. Elle ne dépose rien, ne suit personne et
 *    ne demande AUCUN consentement. Elle peut donc être posée immédiatement,
 *    indépendamment de la question des cookies.
 *
 * Les deux se renseignent dans les variables d'environnement Vercel une fois le
 * domaine définitif en ligne. Rien a modifier dans le code.
 */
export const mesureAudience = {
  /** Identifiant GA4, de la forme « G-XXXXXXXXXX ». `null` = aucune mesure. */
  identifiant: process.env.NEXT_PUBLIC_GA_ID || null,
  /** Jeton de vérification Search Console. Sans cookie, sans consentement. */
  verificationGoogle: process.env.GOOGLE_SITE_VERIFICATION || null,
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
 * `delaiReponse` est un engagement affiché au public. Validé par Vincent le
 * 2026-09-08 à « sous 48 heures ouvrées », puis RACCOURCI À SA DEMANDE le
 * 2026-09-11 (document « word3 ») : « en moins de 24 heures ». Ne jamais le
 * modifier sans son accord — le § 9.4 du master en fait un élément de
 * réassurance, et un délai annoncé qui n'est pas tenu se retourne contre le
 * praticien.
 *
 * Le nouveau délai ne disait plus « ouvrées » et, lu à la lettre, courait le
 * week-end. Réponse de Vincent le 2026-09-11 : « hors soir et week-end ».
 *
 * La valeur s'insère après « Réponse », « Je réponds » ou « je rappelle » :
 * elle doit rester une locution, sans majuscule ni point final.
 */
export const priseRdv = {
  plateforme: null as { nom: string; url: string } | null,
  delaiReponse: "en moins de 24 heures, hors soir et week-end",
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
 * ✅ DURÉE CONFIRMÉE PAR VINCENT LE 2026-09-11 (document « word3 ») : une séance
 * dure 45 minutes, première consultation comprise. L'ancienne valeur, « de 45
 * minutes à une heure », n'était sourcée nulle part.
 *
 * Le rythme est hebdomadaire LE PLUS SOUVENT, pas par principe : réponse de
 * Vincent le 2026-09-11 (« c'est le plus souvent une séance par semaine »),
 * après que le document « word3 » l'eut dit fixe sur un bloc et adaptable sur
 * un autre. Partout où `rythme` est affiché, il doit donc être précédé d'un
 * « le plus souvent » ou d'un « en règle générale ».
 */
export const seance = {
  duree: "45 minutes",
  dureeConfirmee: true,
  rythme: "hebdomadaire",
} as const;

/**
 * Honoraires.
 *
 * ⚠️ NOUVEAUTÉ DU 2026-09-10 : la PREMIÈRE SÉANCE EST GRATUITE (décision de
 * Vincent, document « Refonte site internet Vincent Rousseau »). La fourchette
 * ci-dessous ne vaut donc plus que pour les séances SUIVANTES : partout où le
 * prix est annoncé, la gratuité de la première rencontre doit être dite dans
 * la même phrase ou juste à côté, sinon l'information est fausse par omission.
 *
 * Elle est énoncée comme un fait, jamais comme une offre : ni « profitez-en »,
 * ni « offerte », ni durée limitée. Le § 2.2 du master proscrit le vocabulaire
 * promotionnel sur un site de praticien, et une gratuité présentée comme un
 * argument commercial se retournerait contre lui.
 */
export const honoraires = {
  min: 40,
  max: 60,
  devise: "EUR",
  /**
   * Formulation sobre imposée par le § 2.2 du master : pas de vocabulaire
   * commercial. Révisée par Vincent le 2026-09-10 — la seconde moitié dit
   * pourquoi le tarif se module, ce qui est le vrai frein levé.
   */
  modulation:
    "Le montant est adapté aux moyens financiers de chacun, afin que le coût ne soit " +
    "pas un frein à la démarche.",
  /** La première rencontre n'est pas facturée. */
  premiereSeanceGratuite: true,
  /** Formulations prêtes à l'emploi, pour que le site ne varie pas d'une page à l'autre. */
  premiereSeance: {
    court: "La première séance est gratuite.",
    long:
      "La première séance est gratuite : elle permet de faire le point sur votre " +
      "démarche et vos attentes, sans aucun engagement pour la suite.",
  },
} as const;

/**
 * Dispositif « Mon soutien psy » de l'Assurance Maladie.
 *
 * Conditions VÉRIFIÉES SUR AMELI.FR LE 2026-09-08. Le dispositif a déjà changé
 * plusieurs fois depuis sa création : revérifier à chaque révision de la page
 * tarifs, et ne jamais recopier ces valeurs de mémoire.
 *
 * `partenaire` est un interrupteur à trois états, et c'est volontaire :
 *   true  → Vincent est psychologue partenaire du dispositif (état actuel)
 *   false → il ne l'est pas
 *   null  → on ne sait pas encore
 * La page /tarifs-et-remboursement/ affiche un texte juste dans les trois cas.
 *
 * ✅ RÉPONSE DE VINCENT LE 2026-09-10 : il EST affilié au dispositif (document
 * « Refonte site internet Vincent Rousseau », correctifs n° 10 et 11).
 *
 * ⚠️ CONSÉQUENCE À LUI RAPPELER : la séance relevant du dispositif est à 50 €,
 * tarif fixé par la convention — dans sa fourchette actuelle, mais NON
 * modulable, contrairement à ses séances hors dispositif.
 */
export const monSoutienPsy = {
  partenaire: true as boolean | null,
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
