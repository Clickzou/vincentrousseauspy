"use client";

import { usePathname } from "next/navigation";

/**
 * Signature de l'agence, en pied de page — accueil uniquement.
 *
 * Composant client pour une seule raison : le pied de page vit dans le layout
 * racine, partagé par toutes les pages, et un layout n'a aucun moyen de
 * connaître la route côté serveur en App Router. `usePathname` est la seule
 * réponse, comme pour la navigation.
 *
 * Le rendu reste présent dans le HTML initial : les composants clients sont
 * aussi rendus côté serveur, et `usePathname` y renvoie déjà le bon chemin.
 * Le lien est donc visible des robots sans exécution de JavaScript.
 *
 * `rel="noopener"` sans `noreferrer` : `noopener` ferme la faille du
 * `window.opener`, mais `noreferrer` supprimerait aussi l'en-tête `Referer` —
 * et l'agence perdrait la trace de ce trafic dans ses statistiques. Les autres
 * liens externes du site portent les deux, parce que ce sont des sources
 * citées et non un lien de crédit.
 */
export function SignatureAgence() {
  if (usePathname() !== "/") return null;

  return (
    <p className="mt-2">
      <a
        href="https://clickzou.fr/agence-creation-site-internet-toulouse/"
        target="_blank"
        rel="noopener"
        className="underline underline-offset-2 hover:text-terracotta-fonce"
      >
        Création site internet thérapeute
      </a>{" "}
      par l&rsquo;agence Clickzou
    </p>
  );
}
