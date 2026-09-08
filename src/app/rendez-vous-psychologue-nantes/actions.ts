"use server";

import { redirect } from "next/navigation";

import {
  ID_CRENEAUX,
  ID_SITUATIONS,
  libelleCreneau,
  libelleSituation,
} from "@/lib/content/rendez-vous";
import { envoyerDemande } from "@/lib/email/envoi";

/**
 * Traitement de la demande de rappel.
 *
 * Le serveur ne fait CONFIANCE À RIEN de ce qui arrive : les listes fermées
 * sont revérifiées ici, pas seulement dans le navigateur. Un formulaire de
 * praticien est une cible de spam ordinaire, et la validation client ne
 * protège de rien.
 *
 * Rien n'est écrit nulle part : ni base, ni fichier, ni log (§ 2.4).
 */

export type EtatFormulaire = {
  statut: "attente" | "erreur";
  /** Messages par champ, affichés sous l'intitulé concerné. */
  erreurs?: Record<string, string>;
  /** Message général, affiché en tête de formulaire. */
  message?: string;
};

export const ETAT_INITIAL: EtatFormulaire = { statut: "attente" };

const NOM = /^[\p{L}\p{M}'’ -]{2,80}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Numéro français, fixe ou mobile, une fois retirés espaces, points et tirets. */
const TELEPHONE = /^(?:\+33|0)[1-9]\d{8}$/;

const texte = (data: FormData, cle: string) =>
  typeof data.get(cle) === "string" ? (data.get(cle) as string).trim() : "";

export async function demanderRappel(
  _etat: EtatFormulaire,
  data: FormData,
): Promise<EtatFormulaire> {
  // Piège à robots : champ invisible et sans étiquette lisible. Un humain ne
  // le remplit jamais. On répond « attente » plutôt qu'une erreur, pour ne
  // pas apprendre au robot ce qui l'a trahi.
  //
  // C'est la seule parade applicative, et c'est délibéré : un test de vitesse
  // de saisie casserait le fonctionnement sans JavaScript, et un compteur par
  // adresse IP reviendrait à stocker une donnée personnelle pour un formulaire
  // dont tout l'objet est de n'en stocker aucune. Si le spam devient un
  // problème, le limiteur de débit se pose au niveau de Vercel, pas ici.
  if (texte(data, "site-web") !== "") return ETAT_INITIAL;

  const erreurs: Record<string, string> = {};

  const nom = texte(data, "nom");
  if (!NOM.test(nom)) {
    erreurs.nom = "Indiquez le nom sous lequel vous rappeler (2 caractères minimum).";
  }

  const telephoneBrut = texte(data, "telephone");
  const telephone = telephoneBrut.replace(/[\s.\-()]/g, "");
  if (!TELEPHONE.test(telephone)) {
    erreurs.telephone = "Numéro français attendu, par exemple 06 12 34 56 78.";
  }

  const email = texte(data, "email");
  if (email && (!EMAIL.test(email) || email.length > 120)) {
    erreurs.email = "Cette adresse ne semble pas valide. Vous pouvez aussi la laisser vide.";
  }

  const situation = texte(data, "situation");
  if (!ID_SITUATIONS.includes(situation)) {
    erreurs.situation = "Choisissez l'une des trois propositions.";
  }

  const creneaux = data
    .getAll("creneaux")
    .filter((v): v is string => typeof v === "string")
    .filter((v) => ID_CRENEAUX.includes(v));
  if (creneaux.length === 0) {
    erreurs.creneaux = "Cochez au moins un moment où vous pouvez être rappelé.";
  }

  if (texte(data, "consentement") !== "oui") {
    erreurs.consentement = "Votre accord est nécessaire pour que je puisse vous rappeler.";
  }

  if (Object.keys(erreurs).length > 0) {
    return { statut: "erreur", erreurs };
  }

  const resultat = await envoyerDemande({
    nom,
    telephone: telephoneBrut,
    email: email || undefined,
    situation: libelleSituation(situation),
    creneaux: creneaux.map(libelleCreneau),
  });

  if (!resultat.ok) {
    return {
      statut: "erreur",
      message:
        "L'envoi n'a pas abouti — le problème vient du site, pas de vous. " +
        "Le plus simple est de m'appeler directement.",
    };
  }

  // `redirect` lève une exception de contrôle : elle doit rester hors de
  // tout try/catch, sinon Next l'intercepte et la page ne change pas.
  redirect("/merci-pour-votre-demande/");
}
