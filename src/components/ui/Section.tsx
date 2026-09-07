import type { ReactNode } from "react";

type Fond = "blanc" | "menthe" | "peche" | "lavande" | "creme" | "lin";

const FONDS: Record<Fond, string> = {
  blanc: "",
  menthe: "bg-menthe",
  peche: "bg-peche",
  lavande: "bg-lavande",
  creme: "bg-creme",
  lin: "bg-lin",
};

/**
 * Section de page.
 *
 * Deux traitements pour les sections colorées :
 *  - par défaut, une carte arrondie encadrée (rayon 20px, relevé dans le CSS
 *    du site d'origine) ;
 *  - avec `pleineLargeur`, le fond occupe toute la largeur de la fenêtre et
 *    seul le contenu reste contenu, aligné sur la marge de 100 px du reste
 *    de la page.
 */
export function Section({
  id,
  titre,
  chapeau,
  fond = "blanc",
  etroit = false,
  pleineLargeur = false,
  children,
}: {
  id?: string;
  titre?: string;
  chapeau?: string;
  fond?: Fond;
  /** Limite la largeur à une colonne de lecture confortable. */
  etroit?: boolean;
  /** Le fond coloré déborde jusqu'aux bords de la fenêtre. */
  pleineLargeur?: boolean;
  children: ReactNode;
}) {
  const titreId = id ? `${id}-titre` : undefined;
  const colore = fond !== "blanc";
  const pleine = colore && pleineLargeur;

  const entete = (
    <>
      {titre && (
        <h2
          id={titreId}
          className="text-2xl font-bold tracking-tight text-bois sm:text-[33px]"
        >
          {titre}
        </h2>
      )}
      {chapeau && <p className="mt-3 max-w-lecture text-ardoise">{chapeau}</p>}
      <div className={titre ? "mt-8" : ""}>{children}</div>
    </>
  );

  if (pleine) {
    return (
      <section
        id={id}
        aria-labelledby={titreId}
        className={`${FONDS[fond]} px-5 py-16 sm:px-10 lg:px-[100px]`}
      >
        <div className={etroit ? "mx-auto max-w-3xl" : ""}>{entete}</div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={titreId} className="px-5 py-8">
      <div
        className={[
          "mx-auto",
          etroit ? "max-w-4xl" : "max-w-6xl",
          colore ? `${FONDS[fond]} rounded-[20px] px-6 py-14 sm:px-12` : "py-6",
        ].join(" ")}
      >
        <div className={etroit && colore ? "mx-auto max-w-3xl" : ""}>{entete}</div>
      </div>
    </section>
  );
}
