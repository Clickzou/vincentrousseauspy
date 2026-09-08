"use client";

import { useEffect, useState } from "react";

import {
  EVENEMENT_CONSENTEMENT,
  type Consentement,
  ecrireConsentement,
  lireConsentement,
  retirerConsentement,
} from "@/lib/consentement";
import { mesureAudience } from "@/lib/site-config";

/**
 * Rappel du choix en cours, et moyen d'en changer — dans la politique de
 * confidentialité.
 *
 * Le droit de retirer son consentement à tout moment (article 7.3 du RGPD) n'a
 * de portée que s'il existe un endroit stable où l'exercer. La bannière, une
 * fois répondue, ne revient pas : c'est ici que le choix se révise.
 *
 * Le composant affiche aussi l'état courant. Une page qui dirait « vous pouvez
 * retirer votre consentement » sans indiquer si l'on a consenti serait
 * incomplète.
 */
export function ChoixCookies() {
  const [choix, setChoix] = useState<Consentement | null>(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    const relire = () => {
      setChoix(lireConsentement());
      setPret(true);
    };
    relire();

    window.addEventListener(EVENEMENT_CONSENTEMENT, relire);
    return () => window.removeEventListener(EVENEMENT_CONSENTEMENT, relire);
  }, []);

  /* Aucune mesure configurée : il n'y a aucun choix à exercer, et prétendre le
     contraire donnerait à croire que des traceurs existent. */
  if (!mesureAudience.identifiant) {
    return (
      <p className="mt-4">
        Aucun outil de mesure n&rsquo;est installé à ce jour&nbsp;: il n&rsquo;y a donc
        aucun choix à exercer, et aucune bannière ne vous est présentée.
      </p>
    );
  }

  return (
    <div className="mt-4 rounded-[20px] border border-sable p-5 sm:p-6">
      <p className="!mt-0 text-sm text-ardoise">
        {/* `pret` évite d'annoncer « vous n'avez pas encore répondu » pendant le
            rendu serveur, alors que le stockage n'a pas encore été lu. */}
        {!pret
          ? "Lecture de votre choix…"
          : choix === "accepte"
            ? "Vous avez accepté la mesure d'audience."
            : choix === "refuse"
              ? "Vous avez refusé la mesure d'audience. Aucun traceur n'est déposé."
              : "Vous n'avez pas encore répondu. Aucun traceur n'est déposé."}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => ecrireConsentement("refuse")}
          className="rounded-full border border-bois px-5 py-2.5 text-sm font-semibold text-bois transition-colors hover:bg-lin"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => ecrireConsentement("accepte")}
          className="rounded-full border border-bois bg-terracotta px-5 py-2.5 text-sm font-semibold text-encre transition-opacity hover:opacity-90"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={retirerConsentement}
          className="rounded-full px-5 py-2.5 text-sm text-ardoise underline underline-offset-4"
        >
          Effacer mon choix
        </button>
      </div>
    </div>
  );
}
