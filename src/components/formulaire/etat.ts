/**
 * État du formulaire de rappel, partagé entre l'action serveur et le
 * composant. Il vit hors de `actions.ts` : un fichier `"use server"` ne peut
 * exporter que des fonctions asynchrones, et Next refuse la soumission
 * (erreur 500) s'il y trouve une constante.
 */

export type EtatFormulaire = {
  statut: "attente" | "erreur";
  /** Messages par champ, affichés sous l'intitulé concerné. */
  erreurs?: Record<string, string>;
  /** Message général, affiché en tête de formulaire. */
  message?: string;
};

export const ETAT_INITIAL: EtatFormulaire = { statut: "attente" };
