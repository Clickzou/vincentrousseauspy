"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { EVENEMENT_CONSENTEMENT, lireConsentement } from "@/lib/consentement";
import { mesureAudience } from "@/lib/site-config";

/**
 * Chargement de Google Analytics 4, et seulement après consentement.
 *
 * LE PARTI TECHNIQUE. Le script n'est pas chargé puis bridé : il n'est pas
 * chargé du tout tant que la réponse n'est pas « accepte ». C'est plus strict
 * que le « mode consentement » de Google, qui charge la bibliothèque et lui
 * demande de se retenir — approche défendable, mais qui suppose de faire
 * confiance à un tiers pour ne pas déposer ce qu'on lui a demandé de ne pas
 * déposer. Ici, aucune requête ne part vers googletagmanager.com avant le clic.
 *
 * Corollaire : refuser signifie qu'aucun octet n'est demandé à Google. Le site
 * reste entièrement fonctionnel, et un peu plus rapide.
 *
 * `strategy="afterInteractive"` : la mesure n'est jamais prioritaire sur
 * l'affichage. Elle se charge une fois la page utilisable.
 *
 * SI AUCUN IDENTIFIANT N'EST CONFIGURÉ, ce composant ne fait rien et la
 * bannière ne s'affiche pas. C'est l'état du site tant que Google Analytics
 * n'est pas branché — c'est-à-dire tant que le domaine définitif n'est pas en
 * ligne. Rien à désactiver le jour venu : il suffit de renseigner
 * `NEXT_PUBLIC_GA_ID` dans les variables d'environnement Vercel.
 */
export function MesureAudience() {
  const [autorise, setAutorise] = useState(false);

  useEffect(() => {
    if (!mesureAudience.identifiant) return;

    const relire = () => setAutorise(lireConsentement() === "accepte");
    relire();

    window.addEventListener(EVENEMENT_CONSENTEMENT, relire);
    return () => window.removeEventListener(EVENEMENT_CONSENTEMENT, relire);
  }, []);

  if (!mesureAudience.identifiant || !autorise) return null;

  const id = mesureAudience.identifiant;

  return (
    <>
      <Script
        id="ga-source"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      {/* `anonymize_ip` est le comportement par défaut de GA4, mais l'écrire
          rend l'intention vérifiable par qui lit la source — et par la CNIL en
          cas de contrôle. */}
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
