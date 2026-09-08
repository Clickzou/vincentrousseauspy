/**
 * Valeurs FERMÉES du formulaire de rappel.
 *
 * Tout ce que le visiteur peut transmettre est énuméré ici. C'est la
 * traduction en code de la règle du § 2.4 du master : un site de psychologue
 * qui ouvre un champ de texte libre reçoit de fait des données de santé
 * (art. 9 RGPD), qui transitent alors par l'hébergeur et la boîte mail.
 * Vercel n'est pas hébergeur agréé de données de santé.
 *
 * Trois champs seulement acceptent du texte saisi — nom, téléphone, e-mail —
 * et ils sont validés par expression régulière côté serveur. Tout le reste
 * est un choix parmi les listes ci-dessous.
 *
 * NE JAMAIS ajouter ici un champ « décrivez votre situation », « motif » au
 * sens clinique, « symptômes » ou « depuis quand ». Le motif se dit de vive
 * voix, au téléphone ou en séance.
 */

export type Creneau = { id: string; libelle: string };

/**
 * Créneaux de rappel, bornés par les horaires réels du cabinet
 * (9 h - 20 h, cf. `horaires` dans site-config).
 */
export const CRENEAUX: Creneau[] = [
  { id: "matin", libelle: "Le matin (9 h - 12 h)" },
  { id: "apres-midi", libelle: "L'après-midi (12 h - 17 h)" },
  { id: "fin-de-journee", libelle: "En fin de journée (17 h - 20 h)" },
];

export type Situation = { id: string; libelle: string };

/**
 * Où en est la personne dans sa démarche. Question d'organisation, pas de
 * clinique : elle permet de prévoir la durée du rappel, rien d'autre.
 */
export const SITUATIONS: Situation[] = [
  { id: "premier-rdv", libelle: "Je souhaite prendre un premier rendez-vous" },
  { id: "question", libelle: "J'ai une question avant de prendre rendez-vous" },
  { id: "deja-suivi", libelle: "Je suis déjà suivi et je souhaite un nouveau créneau" },
];

export const ID_CRENEAUX = CRENEAUX.map((c) => c.id);
export const ID_SITUATIONS = SITUATIONS.map((s) => s.id);

export const libelleCreneau = (id: string) =>
  CRENEAUX.find((c) => c.id === id)?.libelle ?? id;

export const libelleSituation = (id: string) =>
  SITUATIONS.find((s) => s.id === id)?.libelle ?? id;
