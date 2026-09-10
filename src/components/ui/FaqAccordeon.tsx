import { IconeChevron } from "@/components/ui/Icones";
import type { BlocReponse, Question } from "@/lib/content/faq";

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
 *
 * CHAQUE QUESTION EST UN TITRE. Elles n'étaient que du texte dans le
 * `<summary>` : le plan de la page s'arrêtait donc à « Questions fréquentes »,
 * sans rien dessous. C'est une perte pour deux publics à la fois — la
 * navigation par titres est le principal moyen de parcourir une page au
 * lecteur d'écran, et c'est aussi ce plan que les moteurs, génératifs
 * compris, lisent pour reperer une question et sa réponse.
 *
 * Le modèle de contenu de `<summary>` admet expressément un titre, c'est donc
 * du HTML valide et non un contournement.
 *
 * `niveau` parce que la profondeur dépend de la page : sur l'accueil la liste
 * est sous un `<h2>` « Questions fréquentes », donc `h3` ; sur /aide-faq/ elle
 * suit directement le `<h1>`, donc `h2`. Un niveau fixe aurait sauté un rang
 * quelque part.
 */

/**
 * Rend une réponse, paragraphes et listes à puces mêlés.
 *
 * Les réponses révisées par Vincent (2026-09-10) énumèrent des cas : modalités
 * de règlement, repères d'accès, manifestations d'une souffrance. Une `<ul>`
 * les donne à lire d'un coup d'œil, là où le paragraphe unique du modèle
 * précédent obligeait à tout lire pour trouver la ligne qui concerne.
 */
function CorpsReponse({ reponse }: { reponse: BlocReponse[] }) {
  return (
    <div className="space-y-3 px-6 pb-6 text-ardoise">
      {reponse.map((bloc, i) =>
        typeof bloc === "string" ? (
          <p key={i}>{bloc}</p>
        ) : (
          /* `list-disc` et non des pastilles maison : la puce doit rester une
             puce pour les lecteurs d'écran, qui annoncent le nombre d'éléments. */
          <ul key={i} className="list-disc space-y-2 pl-5">
            {bloc.liste.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
export function FaqAccordeon({
  questions,
  ouvrirPremiere = false,
  niveau = 3,
}: {
  questions: Question[];
  /** Déplie la première réponse, pour montrer d'emblée à quoi elle ressemble. */
  ouvrirPremiere?: boolean;
  /** Rang des titres de questions dans le plan de la page. */
  niveau?: 2 | 3;
}) {
  const Titre = (niveau === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <ul className="space-y-3">
      {questions.map((item, i) => (
        <li key={item.question}>
          <details
            open={ouvrirPremiere && i === 0}
            className="group rounded-[20px] border border-white bg-white/70 transition-colors open:bg-white"
          >
            {/* Les styles de corps restent portés par le titre : le `<summary>`
                n'est plus qu'un conteneur de disposition. */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
              <Titre className="text-lg font-bold text-encre">{item.question}</Titre>
              <span
                aria-hidden="true"
                className="shrink-0 text-terracotta-fonce transition-transform duration-300 group-open:rotate-180"
              >
                <IconeChevron />
              </span>
            </summary>
            <CorpsReponse reponse={item.reponse} />
          </details>
        </li>
      ))}
    </ul>
  );
}
