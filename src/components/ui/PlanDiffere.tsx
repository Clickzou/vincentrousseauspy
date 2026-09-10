"use client";

import { useState } from "react";

import { IconeLieu } from "@/components/ui/Icones";
import { URL_CARTE } from "@/components/ui/PlanCabinet";
import { adressePostale, cabinet } from "@/lib/site-config";

/**
 * Variante « click-to-load » du plan : tant que le visiteur n'a rien demandé,
 * la page n'affiche qu'un aperçu entièrement local et AUCUNE requête ne part
 * vers Google.
 *
 * C'est la solution que la CNIL admet expressément pour les contenus tiers, et
 * c'était le comportement par défaut jusqu'au 2026-09-10, date à laquelle
 * Vincent a demandé l'affichage direct. Le composant est conservé : le retour
 * en arrière se fait en écrivant `<PlanCabinet differe />`, sans réécriture.
 *
 * Il est le seul des deux à être un composant client — d'où sa séparation :
 * `PlanCabinet` reste rendu sur le serveur, donc sans JavaScript envoyé au
 * navigateur dans le cas courant.
 */
export function PlanDiffere() {
  const [chargee, setChargee] = useState(false);

  if (chargee) {
    return (
      <div className="overflow-hidden rounded-[20px] bg-lin">
        <iframe
          src={URL_CARTE}
          title={`Plan d'accès au cabinet, ${adressePostale}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block h-[360px] w-full border-0 sm:h-[420px]"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[20px] bg-lin">
      <div className="flex h-[360px] w-full flex-col items-center justify-center px-6 py-10 text-center sm:h-[420px]">
        <span aria-hidden="true" className="text-bois-brun">
          <IconeLieu />
        </span>
        <p className="mt-4 text-lg font-bold text-bois">{cabinet.rue}</p>
        <p className="text-ardoise">
          {cabinet.codePostal} {cabinet.ville}
        </p>

        <button
          type="button"
          onClick={() => setChargee(true)}
          className="mt-6 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-encre"
        >
          Afficher le plan
        </button>

        {/* La mention n'est pas une formalité : elle est ce qui rend le clic
            éclairé, donc ce qui rend le chargement licite. */}
        <p className="mt-4 max-w-sm text-xs leading-relaxed text-ardoise">
          Le plan est fourni par Google Maps. En l&rsquo;affichant, votre navigateur se
          connecte aux serveurs de Google, qui reçoit alors votre adresse IP. Rien n&rsquo;est
          chargé tant que vous ne le demandez pas.
        </p>
      </div>
    </div>
  );
}
