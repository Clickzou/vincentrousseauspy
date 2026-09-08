/**
 * Envoi de l'e-mail de demande de rappel.
 *
 * Contrainte d'architecture (SEO_MASTER § 2.4, règle 1) : AUCUNE PERSISTANCE.
 * Pas de base, pas de fichier, pas de log du contenu. La demande transite en
 * mémoire le temps d'un appel HTTP, puis disparaît. Si l'envoi échoue, la
 * page invite à téléphoner — on ne met rien en file d'attente.
 *
 * Resend est appelé par son API REST, sans le paquet npm : une dépendance de
 * moins, et surtout aucune couche qui pourrait journaliser le corps du
 * message à notre insu.
 *
 * Variables d'environnement (Vercel, jamais versionnées) :
 *   RESEND_API_KEY   clé d'API
 *   EMAIL_EXPEDITEUR expéditeur vérifié sur le domaine, ex. site@…fr
 *   EMAIL_DESTINATAIRE  boîte de Vincent (défaut : `contact.email`)
 */

import { contact } from "@/lib/site-config";

export type Demande = {
  nom: string;
  telephone: string;
  email?: string;
  situation: string;
  creneaux: string[];
};

export type ResultatEnvoi = { ok: true } | { ok: false; raison: "config" | "reseau" };

const POINT_DE_TERMINAISON = "https://api.resend.com/emails";

/** Échappe le HTML : le nom saisi est la seule valeur libre qui atteint le corps. */
function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function envoyerDemande(demande: Demande): Promise<ResultatEnvoi> {
  const cle = process.env.RESEND_API_KEY;
  const expediteur = process.env.EMAIL_EXPEDITEUR;
  const destinataire = process.env.EMAIL_DESTINATAIRE ?? contact.email;

  if (!cle || !expediteur) {
    // En développement, ou si la clé n'est pas encore configurée sur Vercel.
    // On ne fait pas semblant que l'envoi a réussi : la page bascule sur le
    // téléphone, qui est de toute façon le canal prioritaire (§ 9.3).
    return { ok: false, raison: "config" };
  }

  const lignes = [
    `Nom : ${echapper(demande.nom)}`,
    `Téléphone : ${echapper(demande.telephone)}`,
    demande.email ? `E-mail : ${echapper(demande.email)}` : null,
    `Demande : ${echapper(demande.situation)}`,
    `Rappel souhaité : ${demande.creneaux.map(echapper).join(", ")}`,
  ].filter(Boolean) as string[];

  try {
    const reponse = await fetch(POINT_DE_TERMINAISON, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: expediteur,
        to: [destinataire],
        // Le téléphone saisi permet de rappeler directement depuis le mail.
        reply_to: demande.email ? [demande.email] : undefined,
        subject: `Demande de rappel — ${demande.nom}`,
        text:
          lignes.join("\n") +
          "\n\n---\nEnvoyé depuis le formulaire du site. Aucun message libre " +
          "n'est possible : la personne n'a pas pu écrire de motif.",
      }),
    });

    if (!reponse.ok) return { ok: false, raison: "reseau" };
    return { ok: true };
  } catch {
    // Volontairement muet : journaliser l'erreur risquerait d'écrire le
    // contenu de la requête dans les logs de la plateforme.
    return { ok: false, raison: "reseau" };
  }
}
