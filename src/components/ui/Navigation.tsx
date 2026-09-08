"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { IconeChevron } from "@/components/ui/Icones";

/**
 * Navigation principale : page courante indiquée, et un sous-menu.
 *
 * Composant client — et c'est la seule raison qui le justifie : `usePathname`
 * est le seul moyen, en App Router, de savoir où l'on se trouve depuis un
 * layout. Le reste du site est rendu côté serveur.
 *
 * POURQUOI « PSYCHOLOGUE » EST UNE ENTRÉE DE MENU. C'est le plus gros actif du
 * site — « psychologue nantes », position 3 à 5 selon l'outil, 49 % des clics
 * mesurés — et il
 * manquait à la barre, qui listait « Les « psy » », « Psychothérapie » et
 * « Psychanalyse » sans le titre principal. Le mot n'apparaissait qu'en ancre
 * du logo, vers l'accueil.
 *
 * Le sous-menu résout les deux problèmes d'un coup : il fait entrer le mot au
 * premier niveau, et il regroupe les quatre pages du silo « titres et
 * approches » qui occupaient trois entrées de la barre. On passe de neuf
 * entrées à sept, et la barre redevient extensible.
 *
 * Réglages de largeur DANS LA BARRE : libellés sans article, corps à 14 px,
 * espacement plafonné à `lg:px-5`, interlettrage `tracking-wide`. Le corps et
 * l'espacement ont pu être augmentés parce que le sous-menu a ramené la barre
 * de neuf entrées à sept : à neuf, il fallait descendre à 12 px et `px-3`.
 * `flex-wrap` est conservé pour le mobile, où le repli est voulu.
 */

type Entree = {
  href: string;
  label: string;
  /** Sous-menu. Le premier enfant est la page vers laquelle pointe le parent. */
  enfants?: { href: string; label: string }[];
};

const PAGE_PSYCHOLOGUE = "/psychologue-clinicien-nantes/";

const NAVIGATION: Entree[] = [
  { href: "/vincent-rousseau-psychologue/", label: "Qui je suis" },
  {
    href: PAGE_PSYCHOLOGUE,
    label: "Psychologue",
    enfants: [
      { href: PAGE_PSYCHOLOGUE, label: "Pourquoi consulter ?" },
      {
        href: "/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/",
        label: "Les différents « psy »",
      },
      /* Les articles sont conservés DANS le sous-menu : la contrainte de
         largeur ne vaut que pour la barre, où chaque caractère compte. Dans
         le panneau, « La psychothérapie » se lit mieux qu'un mot isolé. */
      { href: "/psychotherapeute-nantes/", label: "La psychothérapie" },
      { href: "/psychanalyste-nantes/", label: "La psychanalyse" },
    ],
  },
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

const LIEN = "block whitespace-nowrap px-4 py-5 transition-colors lg:px-5";
const ACTIF = "bg-white/10 font-medium text-terracotta";

export function Navigation() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState<string | null>(null);
  const barre = useRef<HTMLDivElement>(null);

  /**
   * `startsWith` et non une égalité stricte : un article de blog doit allumer
   * « Écrits ». L'accueil est traité à part, sinon « / » serait le préfixe de
   * toutes les URLs du site et resterait allumé en permanence.
   */
  const estActif = (href: string) =>
    href === "/" ? chemin === "/" : chemin.startsWith(href);

  /** Un parent s'allume si l'une de ses pages filles est ouverte. */
  const parentActif = (entree: Entree) =>
    estActif(entree.href) || (entree.enfants?.some((e) => estActif(e.href)) ?? false);

  /* Fermeture au clic à l'extérieur et à la touche Échap. Sans cela, le
     panneau resterait ouvert derrière le reste de la page — et un utilisateur
     au clavier n'aurait aucun moyen de le refermer. */
  useEffect(() => {
    if (!ouvert) return;

    const auClic = (e: MouseEvent) => {
      if (barre.current && !barre.current.contains(e.target as Node)) setOuvert(null);
    };
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(null);
    };

    document.addEventListener("mousedown", auClic);
    document.addEventListener("keydown", auClavier);
    return () => {
      document.removeEventListener("mousedown", auClic);
      document.removeEventListener("keydown", auClavier);
    };
  }, [ouvert]);

  /** Le panneau se referme dès que l'on change de page. */
  useEffect(() => setOuvert(null), [chemin]);

  return (
    <nav aria-label="Navigation principale" className="mx-auto max-w-6xl px-5 pb-6">
      {/* Pas d'`overflow-hidden` sur la barre : il rognerait le panneau du
          sous-menu. Les angles sont donc arrondis sur les éléments d'extrémité.
          La liste occupe la place restante en se centrant ; le bouton de
          conversion reste collé au bord droit. */}
      <div
        ref={barre}
        className="flex flex-wrap items-stretch rounded-[20px] bg-encre text-sm uppercase tracking-wide text-white"
      >
        <ul className="flex flex-1 flex-wrap items-stretch justify-center">
          {NAVIGATION.map((item, index) => {
            const actif = parentActif(item);
            const premier = index === 0 ? "rounded-l-[20px]" : "";

            if (!item.enfants) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    /* `aria-current` porte l'information pour les lecteurs
                       d'écran : la couleur seule ne suffirait pas, et ne serait
                       pas perçue par une personne daltonienne. */
                    aria-current={actif ? "page" : undefined}
                    className={[LIEN, premier, actif ? ACTIF : "hover:text-terracotta"].join(
                      " ",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const estOuvert = ouvert === item.href;

            return (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setOuvert(item.href)}
                onMouseLeave={() => setOuvert(null)}
              >
                {/* Un bouton, et non un lien : l'élément ouvre un panneau, il ne
                    navigue pas. La page du parent est le premier item du
                    panneau, ce qui lève l'ambiguïté du « lien qui déroule » —
                    un lien qui s'ouvre au survol est inutilisable au clavier. */}
                <button
                  type="button"
                  aria-expanded={estOuvert}
                  aria-controls={`sous-menu-${index}`}
                  onClick={() => setOuvert(estOuvert ? null : item.href)}
                  className={[
                    LIEN,
                    premier,
                    /* `uppercase` en toutes lettres : un <button> n'hérite pas
                       de `text-transform` du conteneur, contrairement à un
                       <a>. Sans cela, « Psychologue » s'affichait en casse
                       normale au milieu d'un menu en capitales. */
                    "flex items-center gap-1.5 uppercase",
                    actif ? ACTIF : "hover:text-terracotta",
                  ].join(" ")}
                >
                  {item.label}
                  <IconeChevron
                    className={`h-3.5 w-3.5 transition-transform ${
                      estOuvert ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <ul
                  id={`sous-menu-${index}`}
                  hidden={!estOuvert}
                  className="absolute left-0 top-full z-20 mt-1 min-w-[15rem] overflow-hidden rounded-[16px] bg-encre py-2 shadow-lg"
                >
                  {item.enfants.map((enfant) => (
                    <li key={enfant.href}>
                      <Link
                        href={enfant.href}
                        aria-current={estActif(enfant.href) ? "page" : undefined}
                        className={[
                          "block whitespace-nowrap px-5 py-3",
                          estActif(enfant.href)
                            ? "bg-white/10 font-medium text-terracotta"
                            : "hover:text-terracotta",
                        ].join(" ")}
                      >
                        {enfant.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        {/* Le bouton de conversion s'allume aussi quand on est sur sa page —
            sinon il invite à aller là où l'on se trouve déjà. */}
        <Link
          href={LIEN_RDV}
          aria-current={estActif(LIEN_RDV) ? "page" : undefined}
          className={[
            "block h-full whitespace-nowrap rounded-r-[20px] px-6 py-5 font-medium",
            estActif(LIEN_RDV)
              ? "bg-terracotta-clair text-encre"
              : "bg-terracotta text-encre",
          ].join(" ")}
        >
          Prendre RDV
        </Link>
      </div>
    </nav>
  );
}
