"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Apparition douce d'un bloc à l'entrée dans le champ de vision.
 *
 * Trois partis pris, dictés par le public du site (§ 3.3 du master : des
 * personnes en souffrance, parfois fatiguées) :
 *
 *  1. **Discret** : une translation de 16 px et un fondu, rien de plus. Ni
 *     zoom, ni rebond, ni glissement latéral.
 *  2. **Jamais bloquant** : le contenu est rendu dans le HTML dès le départ.
 *     Si JavaScript ne s'exécute pas, tout reste visible — l'animation n'est
 *     qu'une couche par-dessus. C'est indispensable ici : masquer le contenu
 *     en attendant JS le rendrait invisible aux crawlers en cas d'échec.
 *  3. **Respect de `prefers-reduced-motion`** : la règle globale de
 *     `globals.css` ramène la transition à 0,01 ms, donc l'élément apparaît
 *     instantanément, sans mouvement.
 *
 * L'observation est arrêtée dès le premier passage : un bloc déjà apparu ne
 * doit pas rejouer l'animation en remontant la page.
 */
export function Apparition({
  children,
  delai = 0,
  className = "",
}: {
  children: ReactNode;
  /** Décalage en millisecondes, pour faire arriver plusieurs blocs en cascade. */
  delai?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cible = ref.current;
    if (!cible) return;

    // Navigateur sans IntersectionObserver : on affiche sans animer.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      // Se déclenche un peu avant que le bloc n'atteigne le bas de l'écran.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observateur.observe(cible);
    return () => observateur.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible && delai ? `${delai}ms` : undefined }}
      className={[
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        visible ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
