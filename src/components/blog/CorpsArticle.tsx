import Link from "next/link";

import type { Bloc } from "@/lib/content/blog";

/**
 * Rendu du corps d'un article.
 *
 * Les articles sont stockés en blocs typés plutôt qu'en HTML brut : le
 * `dangerouslySetInnerHTML` est ainsi évité partout, et la hiérarchie des
 * titres reste garantie par le type — un article ne peut pas introduire de
 * H1 concurrent ni sauter un niveau.
 */
export function CorpsArticle({ blocs }: { blocs: Bloc[] }) {
  return (
    <div className="prose-clinique">
      {blocs.map((bloc, i) => {
        switch (bloc.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-12 text-2xl font-bold text-bois">
                {bloc.texte}
              </h2>
            );

          case "p":
            return (
              <p key={i} className="mt-4">
                {bloc.texte}
                {bloc.lien && (
                  <>
                    {" "}
                    <Link href={bloc.lien.href}>{bloc.lien.libelle}</Link>.
                  </>
                )}
              </p>
            );

          case "liste":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {bloc.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "encadre":
            return (
              <aside key={i} className="my-8 rounded-[20px] bg-lin p-6">
                <p className="font-bold text-encre">{bloc.titre}</p>
                <p className="mt-2 text-sm leading-relaxed">{bloc.texte}</p>
              </aside>
            );

          case "citation":
            return (
              <figure key={i} className="my-8">
                <blockquote className="border-l-2 border-terracotta pl-6">
                  <p className="font-accent text-xl italic leading-snug text-bois">
                    {bloc.texte}
                  </p>
                </blockquote>
                {bloc.source && (
                  <figcaption className="mt-3 pl-6 text-sm">{bloc.source}</figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
