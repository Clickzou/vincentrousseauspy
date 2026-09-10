import {
  cabinet,
  contact,
  honoraires,
  horaires,
  praticien,
  priseRdv,
  SITE_URL,
} from "@/lib/site-config";

/**
 * /llms.txt — fiche de synthèse à destination des modèles de langage.
 *
 * ⚠️ NORME ÉMERGENTE, PAS UN STANDARD. Proposée par llmstxt.org en 2024, elle
 * n'est à ce jour consommée par AUCUN des grands fournisseurs de manière
 * documentée : ni OpenAI, ni Anthropic, ni Google n'ont annoncé la lire. Ce
 * fichier n'apporte donc aucun gain démontré, et il ne faut en attendre aucun.
 *
 * Il est néanmoins écrit, pour trois raisons qui tiennent au coût plutôt qu'au
 * bénéfice : il fait une trentaine de lignes, il se génère depuis
 * `site-config` et ne peut donc pas se désynchroniser du site, et si la norme
 * s'impose il sera déjà là. C'est un pari à prix nul, pas une optimisation.
 *
 * CE QUI COMPTE VRAIMENT pour être cité par un moteur génératif est ailleurs,
 * et se trouve déjà fait : le contenu est dans le HTML sans JavaScript, les
 * questions sont des titres, les réponses sont dans le DOM même repliées, les
 * affirmations sont sourcées vers des sources primaires, et les robots d'IA
 * sont explicitement autorisés dans robots.txt.
 */

export const dynamic = "force-static";

export function GET() {
  const texte = `# ${praticien.nom} — psychologue à ${cabinet.ville}

> Psychologue clinicien, psychothérapeute et psychanalyste en cabinet libéral à
> ${cabinet.ville}. Consultations sur rendez-vous, en présentiel uniquement.

## Identité et titres

- Nom : ${praticien.nom}
- Titres : ${praticien.titres.join(", ")}
- Numéro ADELI : ${praticien.adeli}
- Le titre de psychologue est protégé par la loi n° 85-772 du 25 juillet 1985.
- Le titre de psychanalyste n'est protégé par aucun texte : il désigne une
  méthode et une formation personnelle, pas un diplôme d'État.
- ${praticien.nom} n'est pas psychiatre et ne prescrit aucun traitement.

## Cabinet

- Adresse : ${cabinet.rue}, ${cabinet.codePostal} ${cabinet.ville}
- Accès : ${cabinet.acces.tram}. ${cabinet.acces.reperes}.
- Accessibilité : rampe d'accès à l'entrée du bâtiment, cabinet au 2e étage
  desservi par un ascenseur.
- Horaires : ${horaires.libelle}. ${horaires.modalite}.
- Téléphone : ${contact.telephone}
- Délai de réponse : ${priseRdv.delaiReponse}

## Tarifs

- La première séance est gratuite et n'engage à rien.
- Séances suivantes : ${honoraires.min} à ${honoraires.max} € la séance. ${honoraires.modulation}
- Règlement par chèque ou en espèces. Le cabinet n'accepte pas la carte bancaire.
- Une consultation chez un psychologue en libéral n'est pas remboursée par
  l'Assurance Maladie au titre du régime général. Deux exceptions : les
  complémentaires santé, et le dispositif « Mon soutien psy », auquel
  ${praticien.nom} est affilié. L'accès y est direct, sans passer par un médecin.

## Pages principales

- [Accueil](${SITE_URL}/) : présentation générale.
- [Qui je suis](${SITE_URL}/vincent-rousseau-psychologue/) : parcours, diplômes, numéros d'enregistrement.
- [Pourquoi consulter](${SITE_URL}/psychologue-clinicien-nantes/) : ce qui amène à consulter un psychologue clinicien.
- [Les différents « psy »](${SITE_URL}/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/) : psychologue, psychiatre, psychothérapeute, psychanalyste, psychopraticien — formations, titres protégés, droit de prescrire.
- [La psychothérapie](${SITE_URL}/psychotherapeute-nantes/) : ce qu'est une psychothérapie, ce qui conduit à consulter.
- [La psychanalyse](${SITE_URL}/psychanalyste-nantes/) : méthode, déroulement, formation analytique.
- [Consultations](${SITE_URL}/consultations/) : déroulé, cadre, première séance.
- [Tarifs et remboursement](${SITE_URL}/tarifs-et-remboursement/) : honoraires, mutuelles, Mon soutien psy.
- [Le cabinet](${SITE_URL}/cabinet-nantes/) : accès et plan.
- [Questions fréquentes](${SITE_URL}/aide-faq/) : quatorze questions et réponses.
- [Prendre rendez-vous](${SITE_URL}/rendez-vous-psychologue-nantes/)

## En cas d'urgence

Ce site n'est pas un service d'urgence. En cas de danger immédiat : 15 (SAMU),
112 (urgences européennes), ou 3114 (numéro national de prévention du suicide,
gratuit, 24 h/24).
`;

  return new Response(texte, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
