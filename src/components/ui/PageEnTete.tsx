import Link from "next/link";
import type { ReactNode } from "react";

export type Miette = { nom: string; href: string };

/**
 * En-tête commun aux pages intérieures : fil d'Ariane, H1, chapeau.
 *
 * Le fil d'Ariane n'est pas décoratif — il matérialise la profondeur de clic
 * (maximum 2 depuis l'accueil, § 5 du master) et alimente le `BreadcrumbList`
 * en JSON-LD que chaque page déclare de son côté.
 */
export function PageEnTete({
  miettes = [],
  titre,
  chapeau,
  enfants,
  centre = false,
}: {
  miettes?: Miette[];
  titre: string;
  chapeau?: string;
  enfants?: ReactNode;
  /**
   * Centre l'en-tête sur une colonne de lecture, au lieu de l'aligner sur la
   * marge gauche. Réservé aux pages légales : ce sont des documents, pas des
   * pages de site, et le site d'origine les présentait déjà ainsi. Le texte
   * reste aligné à gauche à l'intérieur de la colonne — centrer les lignes
   * elles-mêmes rendrait un texte long illisible.
   */
  centre?: boolean;
}) {
  return (
    <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
      <div className={centre ? "mx-auto max-w-lecture" : ""}>
      <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
        <Link href="/" className="underline underline-offset-2">
          Accueil
        </Link>
        {miettes.map((m) => (
          <span key={m.href}>
            <span aria-hidden="true"> › </span>
            <Link href={m.href} className="underline underline-offset-2">
              {m.nom}
            </Link>
          </span>
        ))}
        <span aria-hidden="true"> › </span>
        <span aria-current="page">{titre}</span>
      </nav>

      <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
        {titre}
      </h1>

      {chapeau && (
        <p className="mt-5 max-w-lecture text-lg leading-relaxed text-ardoise">{chapeau}</p>
      )}

      {enfants}
      </div>
    </section>
  );
}
