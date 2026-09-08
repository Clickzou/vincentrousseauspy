"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { IconeChevron, IconeFermer, IconeMenu } from "@/components/ui/Icones";

/**
 * Navigation principale : page courante indiquée, un sous-menu, et un repli
 * en menu déroulant sous 1024 px.
 *
 * Composant client — et c'est la seule raison qui le justifie : `usePathname`
 * est le seul moyen, en App Router, de savoir où l'on se trouve depuis un
 * layout. Le reste du site est rendu côté serveur.
 *
 * POURQUOI « PSYCHOLOGUE » EST UNE ENTRÉE DE MENU. C'est le plus gros actif du
 * site — « psychologue nantes », position 3 à 5 selon l'outil, 49 % des clics
 * mesurés — et il manquait à la barre, qui listait « Les « psy » »,
 * « Psychothérapie » et « Psychanalyse » sans le titre principal. Le mot
 * n'apparaissait qu'en ancre du logo, vers l'accueil.
 *
 * Le sous-menu résout les deux problèmes d'un coup : il fait entrer le mot au
 * premier niveau, et il regroupe les quatre pages du silo « titres et
 * approches » qui occupaient trois entrées de la barre. On est ainsi passé
 * de neuf entrées à sept, puis à huit avec l'ajout d'« Accueil ».
 *
 * LE REPLI MOBILE. La barre reposait sur `flex-wrap` seul : sous 1024 px, les
 * entrées se répartissaient sur trois lignes et le bouton de conversion
 * restait suspendu au bout de la première, séparé du reste par un vide. Ce
 * n'était pas une mise en page, c'était un débordement.
 *
 * Sous 1024 px, la barre n'affiche donc plus qu'une ligne — un déclencheur et
 * le bouton de conversion — et la liste se déplie dessous, en colonne. Le
 * bouton de rendez-vous reste visible en permanence : c'est la seule action de
 * la page qu'on ne doit jamais avoir à chercher.
 *
 * Un seul jeu de liens dans le DOM, pas deux : la même `<ul>` sert aux deux
 * dispositions, `lg:order-first` la replaçant à gauche du bouton sur grand
 * écran. Dupliquer le menu pour le mobile aurait doublé les liens internes et
 * créé deux vérités à maintenir.
 *
 * RÉGLAGES DE LARGEUR DANS LA BARRE. Libellés sans article, interlettrage
 * `tracking-wide`, et un corps qui suit la place disponible : 13 px entre
 * 1024 et 1279 px, 14 px au-delà. Huit entrées plus le bouton de conversion
 * demandent environ 1 070 px à 14 px ; le conteneur n'en offre que 984 à
 * 1024 px de large. Sans ce palier, la barre repasserait sur deux lignes
 * exactement dans la bande qu'on vient d'assainir.
 */

type Entree = {
  href: string;
  label: string;
  /** Sous-menu. Le premier enfant est la page vers laquelle pointe le parent. */
  enfants?: { href: string; label: string }[];
};

const PAGE_PSYCHOLOGUE = "/psychologue-clinicien-nantes/";

const NAVIGATION: Entree[] = [
  /* L'accueil est déjà atteignable par le logo, et le fil d'Ariane le
     rappelle sur chaque page. L'entrée est néanmoins demandée : beaucoup
     de visiteurs ne pensent pas à cliquer un logo, et la chercher pour ne
     pas la trouver coûte plus cher que les 100 px qu'elle occupe. */
  { href: "/", label: "Accueil" },
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

/* `whitespace-nowrap` seulement à partir de `lg` : dans la colonne mobile, un
   libellé long doit pouvoir passer à la ligne plutôt que déborder. */
const LIEN =
  "block px-5 py-3.5 transition-colors lg:whitespace-nowrap lg:px-3 lg:py-5 xl:px-4";
const ACTIF = "bg-white/10 font-medium text-terracotta";

export function Navigation() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState<string | null>(null);
  const [deplie, setDeplie] = useState(false);
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
    if (!ouvert && !deplie) return;

    const toutFermer = () => {
      setOuvert(null);
      setDeplie(false);
    };

    const auClic = (e: MouseEvent) => {
      if (barre.current && !barre.current.contains(e.target as Node)) toutFermer();
    };
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") toutFermer();
    };

    document.addEventListener("mousedown", auClic);
    document.addEventListener("keydown", auClavier);
    return () => {
      document.removeEventListener("mousedown", auClic);
      document.removeEventListener("keydown", auClavier);
    };
  }, [ouvert, deplie]);

  /** Tout se referme dès que l'on change de page. */
  useEffect(() => {
    setOuvert(null);
    setDeplie(false);
  }, [chemin]);

  /* Le survol n'ouvre le sous-menu que pour une souris. Au doigt, une frappe
     émet aussi un événement de survol : sans ce filtre, elle ouvrait le
     panneau et le clic le refermait dans la foulée — l'entrée devenait
     inutilisable sur tablette.

     LA FERMETURE EST DIFFÉRÉE DE 250 ms, ET LE PANNEAU L'ANNULE LUI-MêME.

     Trois défenses se superposent ici, et c'est délibéré : la géométrie du
     survol est fragile par nature — arrondis au sous-pixel, zoom du
     navigateur, trajectoire oblique du curseur — et un menu qui se dérobe
     est un défaut que l'utilisateur ressent sans pouvoir le décrire.

       1. Le panneau touche le bouton (marge intérieure, pas extérieure), et
          le chevauche même d'un pixel : aucun vide à traverser.
       2. La fermeture attend 250 ms au lieu d'être immédiate.
       3. Entrer sur le panneau annule la fermeture en cours, même si le
          curseur est sorti une fraction de seconde entre les deux.

     Le délai ne retarde jamais une fermeture voulue : dès qu'on s'éloigne
     vraiment, plus rien ne l'annule. */
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);

  const annulerFermeture = () => {
    if (minuterie.current) {
      clearTimeout(minuterie.current);
      minuterie.current = null;
    }
  };

  const survolEntree = (e: React.PointerEvent, href: string) => {
    if (e.pointerType !== "mouse") return;
    annulerFermeture();
    setOuvert(href);
  };

  const survolSortie = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    annulerFermeture();
    minuterie.current = setTimeout(() => setOuvert(null), 250);
  };

  /* La minuterie ne doit pas survivre au composant. */
  useEffect(() => annulerFermeture, []);

  return (
    <nav aria-label="Navigation principale" className="mx-auto max-w-6xl px-5 pb-6">
      {/* Pas d'`overflow-hidden` sur la barre : il rognerait le panneau du
          sous-menu sur grand écran. Les angles sont donc arrondis sur les
          éléments d'extrémité, et ils diffèrent selon que la liste est dépliée
          ou non — quand elle l'est, c'est elle qui ferme le bas de la barre. */}
      <div
        ref={barre}
        /* Le corps redescend à 13 px entre 1024 et 1279 px, la bande où huit
           entrées plus le bouton dépassent tout juste la largeur
           disponible, et revient à 14 px au-delà. */
        className="flex flex-wrap items-stretch rounded-[20px] bg-encre text-sm uppercase tracking-wide text-white lg:text-[13px] xl:text-sm"
      >
        {/* --- Déclencheur, sous 1024 px uniquement. --- */}
        <button
          type="button"
          aria-expanded={deplie}
          aria-controls="menu-principal"
          onClick={() => {
            setDeplie(!deplie);
            setOuvert(null);
          }}
          className={[
            /* `uppercase` en toutes lettres : un <button> n'hérite pas de
               `text-transform` du conteneur, contrairement à un <a>. */
            "flex flex-1 items-center gap-2.5 rounded-tl-[20px] px-5 py-4 font-medium uppercase lg:hidden",
            deplie ? "" : "rounded-bl-[20px]",
          ].join(" ")}
        >
          {deplie ? <IconeFermer /> : <IconeMenu />}
          Menu
        </button>

        {/* --- Bouton de conversion, unique dans le DOM. ---
            Sous 1024 px il partage la première ligne avec le déclencheur ;
            au-dessus, `lg:order-last` le renvoie à droite de la liste. Il
            s'allume aussi quand on est sur sa page — sinon il invite à aller
            là où l'on se trouve déjà. */}
        <Link
          href={LIEN_RDV}
          aria-current={estActif(LIEN_RDV) ? "page" : undefined}
          className={[
            "block whitespace-nowrap rounded-tr-[20px] px-5 py-4 font-medium",
            "lg:order-last lg:rounded-br-[20px] lg:px-4 lg:py-5 xl:px-6",
            deplie ? "" : "rounded-br-[20px]",
            estActif(LIEN_RDV)
              ? "bg-terracotta-clair text-encre"
              : "bg-terracotta text-encre",
          ].join(" ")}
        >
          Prendre RDV
        </Link>

        {/* --- La liste. Colonne dépliable sous 1024 px, rangée au-dessus. ---
            `max-lg:overflow-hidden` ferme proprement les angles du bas quand
            elle est dépliée ; la variante ne s'applique pas à partir de `lg`,
            où le panneau du sous-menu doit pouvoir déborder. */}
        <ul
          id="menu-principal"
          className={[
            "w-full flex-col",
            deplie ? "flex" : "hidden",
            "max-lg:overflow-hidden max-lg:rounded-b-[20px] max-lg:border-t max-lg:border-white/10",
            "lg:order-first lg:flex lg:w-auto lg:flex-1 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-center",
          ].join(" ")}
        >
          {NAVIGATION.map((item, index) => {
            const actif = parentActif(item);
            /* L'angle gauche n'est arrondi qu'à partir de `lg` : en colonne,
               la première entrée n'est pas au coin de la barre. */
            const premier = index === 0 ? "lg:rounded-l-[20px]" : "";

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
                /* `relative` seulement à partir de `lg` : sous 1024 px, le
                   sous-menu reste dans le flux, il ne flotte pas. */
                className="lg:relative"
                onPointerEnter={(e) => survolEntree(e, item.href)}
                onPointerLeave={survolSortie}
              >
                {/* Un bouton, et non un lien : l'élément ouvre un panneau, il ne
                    navigue pas. La page du parent est le premier item du
                    panneau, ce qui lève l'ambiguïté du « lien qui déroule » —
                    un lien qui s'ouvre au survol est inutilisable au clavier.

                    Le chevron est rejeté à droite en colonne (`justify-between`)
                    et collé au libellé en rangée (`lg:justify-start`). */}
                <button
                  type="button"
                  aria-expanded={estOuvert}
                  aria-controls={`sous-menu-${index}`}
                  onClick={() => setOuvert(estOuvert ? null : item.href)}
                  className={[
                    LIEN,
                    premier,
                    "flex w-full items-center justify-between gap-1.5 uppercase lg:w-auto lg:justify-start",
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

                {/* UN CONTENEUR, ET UN SEUL RÔLE : combler l'espace entre le
                    bouton et le panneau. Le décalage de 4 px était auparavant
                    une marge extérieure, donc un vide : en le traversant, le
                    curseur ne survolait plus rien, l'entrée recevait un
                    événement de sortie, et le panneau se fermait avant
                    d'être atteint. Le même décalage est maintenant une marge
                    intérieure de ce conteneur transparent, qui touche le bouton
                    d'un côté et le panneau de l'autre. L'espacement visuel est
                    identique, le pont est continu. */}
                <div
                  id={`sous-menu-${index}`}
                  hidden={!estOuvert}
                  onPointerEnter={annulerFermeture}
                  /* `-mt-px` : le conteneur remonte d'un pixel sur le bouton.
                     Les hauteurs calculées tombent rarement sur un pixel entier,
                     et il suffit d'un demi-pixel de vide pour que le survol se
                     rompe. Un pixel de recouvrement coûte zéro visuellement et
                     supprime la question. */
                  className="lg:absolute lg:left-0 lg:top-full lg:z-20 lg:-mt-px lg:pt-1"
                >
                  <ul
                    className={[
                      "bg-encre",
                      /* Sous 1024 px : sous-liste indentée, marquée d'un filet
                         vertical qui la rattache visuellement à son parent. */
                      "max-lg:ml-5 max-lg:border-l max-lg:border-white/15 max-lg:pb-1",
                      /* À partir de 1024 px : le panneau proprement dit. */
                      "lg:min-w-[15rem] lg:overflow-hidden lg:rounded-[16px] lg:py-2 lg:shadow-lg",
                    ].join(" ")}
                  >
                    {item.enfants.map((enfant) => (
                      <li key={enfant.href}>
                        <Link
                          href={enfant.href}
                          aria-current={estActif(enfant.href) ? "page" : undefined}
                          className={[
                            "block px-4 py-3 lg:whitespace-nowrap lg:px-5",
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
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
