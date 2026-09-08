"use client";

import { useEffect, useState } from "react";

import { IconeChevron } from "@/components/ui/Icones";

/**
 * Retour en haut de page.
 *
 * UN LIEN, PAS UN BOUTON. `<a href="#haut">` fonctionne sans JavaScript, se
 * copie, s'ouvre au clavier comme n'importe quel lien, et laisse le navigateur
 * gérer le défilement — y compris le respect de « réduire les animations »,
 * qu'il applique lui-même à `scroll-behavior`. Un `<button onClick>` aurait
 * demandé du script pour faire moins bien.
 *
 * Le script ne sert qu'à une chose : décider quand l'afficher. Sur les pages
 * courtes — mentions légales, page de remerciement — il ne s'affiche jamais.
 *
 * Deux seuils, et non un seul : le lien apparaît après 600 px de défilement,
 * mais uniquement si la page est assez longue pour que remonter soit pénible
 * (deux hauteurs d'écran). Sans ce second critère, il surgissait sur des pages
 * où deux coups de molette suffisaient à revenir.
 *
 * Position : en bas à droite, sous la bannière de consentement (`z-40` contre
 * `z-50`). Tant qu'on n'a pas répondu à la bannière, c'est elle qui prime —
 * c'est le bon ordre, et cela évite d'avoir à coordonner leurs positions.
 */
export function RetourHaut() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const evaluer = () => {
      const assezLongue =
        document.documentElement.scrollHeight > window.innerHeight * 2;
      setVisible(assezLongue && window.scrollY > 600);
    };

    evaluer();
    /* `passive` : on ne bloque jamais le défilement, on l'observe. */
    window.addEventListener("scroll", evaluer, { passive: true });
    window.addEventListener("resize", evaluer);
    return () => {
      window.removeEventListener("scroll", evaluer);
      window.removeEventListener("resize", evaluer);
    };
  }, []);

  return (
    <a
      href="#haut"
      /* `aria-hidden` et `tabIndex={-1}` quand il est masqué : sans cela, il
         resterait dans l'ordre de tabulation et un utilisateur au clavier
         atteindrait un lien invisible. */
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={[
        "fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center",
        "rounded-full bg-encre text-white shadow-lg",
        "transition-opacity duration-200 hover:bg-bois",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <span className="sr-only">Revenir en haut de la page</span>
      <IconeChevron className="h-5 w-5 rotate-180" aria-hidden="true" />
    </a>
  );
}
