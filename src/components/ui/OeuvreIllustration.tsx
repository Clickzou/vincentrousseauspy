import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Une œuvre dans sa proportion d'origine, à loger dans une colonne.
 *
 * Employé dans la carte d'en-tête des pages qui n'avaient pas d'œuvre :
 * l'image occupe 5 colonnes sur 12 à gauche, le titre et le chapeau les 7
 * autres (décision de Vincent, 2026-09-18 — la version pleine largeur qui
 * suivait la carte écrasait le haut de page).
 *
 * C'est le placement du reste du site (voir /vincent-rousseau-psychologue/ ou
 * un article du blog) ; la différence tient au recadrage, traité ci-dessous.
 *
 * Trois partis pris :
 *
 *  1. **Aucun recadrage.** `width`/`height` plutôt que `fill` : l'œuvre est
 *     montrée entière, et c'est elle qui donne sa hauteur à la colonne. Un
 *     `object-cover` couperait les danseurs de Matisse à mi-corps — sur des
 *     tableaux figuratifs, le recadrage n'est pas neutre.
 *  2. **Décorative.** `alt=""` : le sens de la page est porté par le H1 et le
 *     chapeau. Le titre de l'œuvre est dans la légende, qui est du texte lu
 *     normalement — pas besoin de le répéter dans une alternative.
 *  3. **Créditée.** Le droit moral est perpétuel en France : auteur, titre et
 *     année accompagnent toute œuvre affichée, même dans le domaine public.
 */
export function OeuvreIllustration({
  src,
  auteur,
  titre,
  annee,
  largeur,
  hauteur,
}: {
  src: string;
  auteur: string;
  /** `ReactNode` et non `string` : plusieurs titres portent une apostrophe
      typographique ou une espace insécable, écrites en entités dans le JSX. */
  titre: ReactNode;
  annee: string;
  largeur: number;
  hauteur: number;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt=""
        width={largeur}
        height={hauteur}
        sizes="(min-width: 1024px) 38vw, 100vw"
        className="h-auto w-full rounded-[20px]"
      />
      <figcaption className="mt-3 text-xs text-ardoise">
        {auteur}, <cite>{titre}</cite> ({annee}).
      </figcaption>
    </figure>
  );
}
