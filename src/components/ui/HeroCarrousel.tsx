"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Oeuvre } from "@/lib/content/oeuvres";

const DUREE_MS = 7000;

/**
 * Fond du hero : fondu enchaîné automatique entre plusieurs œuvres.
 *
 * Un seul composant gère l'image ET son crédit : deux minuteurs séparés
 * dériveraient l'un par rapport à l'autre et finiraient par afficher le
 * crédit d'une œuvre sous une autre.
 *
 * Quatre partis pris :
 *
 *  1. **Fondu, jamais de glissement.** Un défilement latéral attire l'œil et
 *     concurrence le texte ; un fondu lent laisse le message lisible.
 *  2. **`prefers-reduced-motion` respecté.** Si l'utilisateur a demandé moins
 *     d'animation, la rotation ne démarre pas : la première œuvre reste
 *     affichée. Sur un site dont le public peut être en souffrance, ce n'est
 *     pas une politesse mais une nécessité (SEO_MASTER § 3.3).
 *  3. **Décoratif.** `alt=""` et `aria-hidden` sur le fond : le sens de la
 *     page est porté par le H1, pas par le tableau. Un lecteur d'écran n'a pas
 *     à énumérer cinq titres d'œuvres avant d'arriver au contenu.
 *  4. **LCP préservé.** Seule la première image est en `priority`.
 */
export function HeroCarrousel({ oeuvres }: { oeuvres: Oeuvre[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (oeuvres.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const minuteur = window.setInterval(
      () => setIndex((i) => (i + 1) % oeuvres.length),
      DUREE_MS,
    );
    return () => window.clearInterval(minuteur);
  }, [oeuvres.length]);

  const courante = oeuvres[index];

  return (
    <>
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {oeuvres.map((o, i) => (
          <Image
            key={o.src}
            src={o.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={[
              "object-cover transition-opacity duration-[1600ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Crédit de l'œuvre : mention d'usage, et signal de sérieux. */}
      <p className="ombre-hero absolute bottom-4 right-5 z-10 max-w-[85%] text-right text-[11px] text-white/75 sm:right-10 lg:right-[100px]">
        {courante.auteur}, <cite className="italic">{courante.titre}</cite> ({courante.annee})
      </p>
    </>
  );
}
