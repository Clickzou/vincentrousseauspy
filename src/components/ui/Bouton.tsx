import Link from "next/link";
import type { ReactNode } from "react";

type Variante = "plein" | "contour" | "clair";

const VARIANTES: Record<Variante, string> = {
  /** Action principale. */
  plein: "bg-terracotta text-encre",
  /** Action secondaire sur fond clair. */
  contour: "border border-bois text-bois",
  /** Action secondaire sur fond sombre ou sur une image. */
  clair: "bg-white/95 text-encre",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 " +
  "text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-90";

/**
 * Bouton d'action, unique pour tout le site.
 *
 * Existe pour une raison précise : les CTA avaient dérivé entre `rounded-sm`
 * et `rounded-full` selon les sections. Centraliser le style évite que la
 * même action ait deux apparences d'une page à l'autre.
 *
 * Rendu en `<a>` si `href` est externe ou commence par `tel:`, en `<Link>`
 * sinon — pour conserver la navigation client sur les liens internes.
 */
export function Bouton({
  href,
  variante = "plein",
  className = "",
  children,
}: {
  href: string;
  variante?: Variante;
  className?: string;
  children: ReactNode;
}) {
  const classes = `${BASE} ${VARIANTES[variante]} ${className}`;
  const externe = /^(https?:|tel:|mailto:)/.test(href);

  if (externe) {
    const attributs = href.startsWith("http")
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <a href={href} className={classes} {...attributs}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
