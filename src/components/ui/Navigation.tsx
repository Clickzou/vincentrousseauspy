"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation principale, avec indication de la page courante.
 *
 * Composant client — et c'est la seule raison qui le justifie : `usePathname`
 * est le seul moyen, en App Router, de savoir où l'on se trouve depuis un
 * layout. Le reste du site est rendu côté serveur.
 *
 * Les libellés disent ce que sont les pages : l'ancien menu WordPress
 * (« Qui, quand, où ? », « Les "Psy" », « Infos légales ») masquait des pages
 * positionnées — /psychanalyste-nantes/ ranke 2e sur « psychanalyste nantes ».
 *
 * ⚠️ LE MENU TIENT SUR UNE SEULE LIGNE, ET C'EST SERRÉ. Huit entrées plus le
 * bouton de conversion, c'est la limite : à la première tentative, « Prendre
 * RDV » repassait à la ligne dès que la fenêtre descendait sous ~1100 px, ce
 * qui arrive constamment (écran partagé, navigateur non maximisé, tablette en
 * paysage). Trois réglages tiennent l'équilibre :
 *   - les libellés sont sans article — « Consultations », pas « Les
 *     consultations » : l'article n'apporte rien dans un menu et coûte trois
 *     caractères par entrée ;
 *   - le corps et l'espacement horizontal se resserrent en dessous de `xl`, au
 *     lieu d'être fixes. L'interlettrage reste à `tracking-wide` partout : en
 *     `tracking-widest`, les 72 caractères du menu regagnaient à eux seuls
 *     70 px et ne laissaient plus que 20 px de marge à 1280 px ;
 *   - `flex-wrap` est conservé pour le mobile, où le repli sur plusieurs
 *     lignes est le comportement souhaité.
 *
 * AJOUTER UNE NEUVIÈME ENTRÉE CASSERA LA MISE EN PAGE. Toute page
 * supplémentaire passe par le maillage contextuel, le pied de page ou le plan
 * du site.
 */

const NAVIGATION = [
  { href: "/vincent-rousseau-psychologue/", label: "Qui je suis" },
  { href: "/psychotherapeute-nantes/", label: "Psychothérapie" },
  { href: "/psychanalyste-nantes/", label: "Psychanalyse" },
  { href: "/consultations/", label: "Consultations" },
  { href: "/tarifs-et-remboursement/", label: "Tarifs" },
  /* « FAQ » dans le menu, « Questions fréquentes » en H1 sur la page : le menu
     est en petites capitales et doit rester court, le titre de page porte le
     mot-clé en toutes lettres. */
  { href: "/aide-faq/", label: "FAQ" },
  /* « Écrits » plutôt que « Blog » : c'est le titre porté par la page, et le
     mot correspond mieux à deux textes par mois qu'à un flux d'actualité. */
  { href: "/blog/", label: "Écrits" },
  { href: "/contact-psychologue-clinicien-nantes/", label: "Contact" },
];

const LIEN_RDV = "/rendez-vous-psychologue-nantes/";

export function Navigation() {
  const chemin = usePathname();

  /**
   * `startsWith` et non une égalité stricte : un article de blog doit allumer
   * « Écrits ». L'accueil est traité à part, sinon « / » serait le préfixe de
   * toutes les URLs du site et resterait allumé en permanence.
   */
  const estActif = (href: string) =>
    href === "/" ? chemin === "/" : chemin.startsWith(href);

  return (
    <nav aria-label="Navigation principale" className="mx-auto max-w-6xl px-5 pb-6">
      <ul className="flex flex-wrap items-stretch overflow-hidden rounded-[20px] bg-encre text-[11px] uppercase tracking-wide text-white xl:text-xs">
        {NAVIGATION.map((item) => {
          const actif = estActif(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                /* `aria-current` porte l'information pour les lecteurs d'écran :
                   la couleur seule ne suffirait pas, et ne serait pas perçue
                   par une personne daltonienne. */
                aria-current={actif ? "page" : undefined}
                className={[
                  "block whitespace-nowrap px-3.5 py-5 transition-colors lg:px-4 xl:px-5",
                  actif
                    ? "bg-white/10 font-medium text-terracotta"
                    : "hover:text-terracotta",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        {/* Le bouton de conversion s'allume aussi quand on est sur sa page —
            sinon il invite à aller là où l'on se trouve déjà. */}
        <li className="ml-auto">
          <Link
            href={LIEN_RDV}
            aria-current={estActif(LIEN_RDV) ? "page" : undefined}
            className={[
              "block h-full whitespace-nowrap px-5 py-5 font-medium xl:px-7",
              estActif(LIEN_RDV)
                ? "bg-terracotta-clair text-encre"
                : "bg-terracotta text-encre",
            ].join(" ")}
          >
            Prendre RDV
          </Link>
        </li>
      </ul>
    </nav>
  );
}
