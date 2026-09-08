"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  EVENEMENT_CONSENTEMENT,
  ecrireConsentement,
  lireConsentement,
} from "@/lib/consentement";
import { mesureAudience } from "@/lib/site-config";

/**
 * Bannière de consentement à la mesure d'audience.
 *
 * Ne s'affiche que si une mesure est réellement configurée : sans identifiant
 * de mesure, aucun traceur n'est déposé et demander un consentement pour rien
 * serait à la fois inutile et trompeur.
 *
 * FORME. Bandeau en bas d'écran, non modal. La CNIL n'impose pas de bloquer la
 * page, seulement de ne rien déposer avant le choix. Sur le site d'un
 * psychologue, un mur qui barre l'accès à la première seconde est une mauvaise
 * façon d'accueillir quelqu'un qui cherche de l'aide.
 *
 * « Refuser » et « Accepter » ont le même poids visuel, la même taille et la
 * même place. Un bouton coloré face à un lien gris serait un « dark pattern »
 * caractérisé, et c'est le premier grief relevé par la CNIL dans ses mises en
 * demeure.
 *
 * Pas de croix de fermeture : fermer sans choisir laisserait la question
 * ouverte et ferait revenir la bannière à chaque page. Deux réponses, toutes
 * deux définitives pour six mois.
 */
export function BanniereCookies() {
  /* `null` tant que le composant n'a pas été hydraté. Sans cet état, le rendu
     serveur afficherait la bannière à tout le monde, puis elle disparaîtrait
     chez ceux qui ont déjà répondu — un clignotement à chaque chargement. */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mesureAudience.identifiant) return;

    const relire = () => setVisible(lireConsentement() === null);
    relire();

    /* Le bouton « revenir sur mon choix » de la politique de confidentialité
       efface le consentement : la bannière doit alors réapparaître sans que
       l'on ait à recharger la page. */
    window.addEventListener(EVENEMENT_CONSENTEMENT, relire);
    return () => window.removeEventListener(EVENEMENT_CONSENTEMENT, relire);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Consentement à la mesure d'audience"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 sm:pb-5"
    >
      <div className="mx-auto max-w-4xl rounded-[20px] border border-sable bg-white p-5 shadow-lg sm:p-6">
        <p className="text-sm font-bold text-bois">Mesure d&rsquo;audience</p>

        <p className="mt-2 text-sm leading-relaxed text-ardoise">
          Ce site peut déposer des cookies de statistiques, pour savoir quelles pages sont
          consultées. Ils ne servent ni à la publicité, ni à vous identifier, et{" "}
          <strong className="font-medium text-encre">
            rien n&rsquo;est déposé tant que vous n&rsquo;avez pas accepté.
          </strong>{" "}
          Le formulaire et la prise de rendez-vous fonctionnent à l&rsquo;identique dans les
          deux cas.
        </p>

        {/* Ordre délibéré : « Refuser » d'abord. La CNIL exige que refuser soit
            aussi simple qu'accepter ; le placer en premier lève tout doute. */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => ecrireConsentement("refuse")}
            className="rounded-full border border-bois px-6 py-3 text-sm font-semibold text-bois transition-colors hover:bg-lin"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => ecrireConsentement("accepte")}
            className="rounded-full border border-bois bg-terracotta px-6 py-3 text-sm font-semibold text-encre transition-opacity hover:opacity-90"
          >
            Accepter
          </button>

          <p className="text-xs text-ardoise sm:ml-auto">
            <Link
              href="/politique-de-confidentialite/#mesure"
              className="underline underline-offset-2"
            >
              Ce que cela recouvre exactement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
