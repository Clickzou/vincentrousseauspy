import { IconeChevron } from "@/components/ui/Icones";
import type { Question } from "@/lib/content/faq";

/**
 * Liste de questions en accordéons natifs `<details>/<summary>`.
 *
 * Pas de JavaScript, pour trois raisons :
 *  - les réponses restent dans le DOM même repliées, donc indexables et
 *    citables par les moteurs génératifs — les SERP des mots-clés suivis
 *    affichent presque toutes un bloc « Les gens demandent aussi », qui se
 *    nourrit exactement de ce format ;
 *  - l'accessibilité clavier et lecteur d'écran est native ;
 *  - la page reste fonctionnelle si le script ne s'exécute pas.
 */
export function FaqAccordeon({
  questions,
  ouvrirPremiere = false,
}: {
  questions: Question[];
  /** Déplie la première réponse, pour montrer d'emblée à quoi elle ressemble. */
  ouvrirPremiere?: boolean;
}) {
  return (
    <ul className="space-y-3">
      {questions.map((item, i) => (
        <li key={item.question}>
          <details
            open={ouvrirPremiere && i === 0}
            className="group rounded-[20px] border border-white bg-white/70 transition-colors open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-bold text-encre [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-terracotta-fonce transition-transform duration-300 group-open:rotate-180"
              >
                <IconeChevron />
              </span>
            </summary>
            <p className="px-6 pb-6 text-ardoise">{item.reponse}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
