import { IconeLienExterne } from "@/components/ui/Icones";
import { isExternal } from "@/lib/url-helpers";

export type Source = {
  /** Intitulé exact du texte ou de la page citée. */
  titre: string;
  /** Qui publie : Légifrance, ARS, Ameli… C'est l'éditeur qui fait l'autorité. */
  editeur: string;
  href: string;
};

/**
 * Bloc de sources d'autorité.
 *
 * Obligatoire dès qu'une page avance un fait juridique, réglementaire ou
 * clinique (SEO_MASTER § 5). En YMYL, une affirmation non sourcée est un
 * risque pour Vincent avant d'être un problème de référencement : c'est sa
 * responsabilité professionnelle qui est engagée par ce que dit le site.
 *
 * Ne citer que des sources primaires et vérifiables — Légifrance, ARS,
 * Ameli, HAS. Jamais un blog, jamais un confrère, jamais une IA.
 */
export function Sources({ sources }: { sources: Source[] }) {
  return (
    <section aria-labelledby="sources-titre" className="mt-12 border-t border-sable pt-6">
      <h2 id="sources-titre" className="text-sm font-bold uppercase tracking-wider text-bois">
        Sources
      </h2>
      <ul className="mt-4 space-y-3 text-sm text-ardoise">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              {...(isExternal(s.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex items-start gap-2"
            >
              <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                <IconeLienExterne className="h-4 w-4" />
              </span>
              <span>
                <span className="text-terracotta-fonce underline underline-offset-2">
                  {s.titre}
                </span>
                <span className="text-ardoise"> — {s.editeur}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
