import type { Metadata } from "next";
import { Abhaya_Libre, Roboto, Yesteryear } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import {
  adressePostale,
  cabinet,
  contact,
  horaires,
  praticien,
  SITE_URL,
} from "@/lib/site-config";
import { graph, localBusinessSchema, personSchema } from "@/lib/seo/schemas";
import {
  IconeHorloge,
  IconeLieu,
  IconeTelephone,
  Pastille,
} from "@/components/ui/Icones";

/**
 * Polices reprises du site actuel (relevées dans le CSS Elementor) et
 * auto-hébergées via next/font : aucune requête vers fonts.gstatic.com, donc
 * aucun transfert d'IP hors consentement (SEO_MASTER § 2.4, point 7).
 */
const texte = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--police-texte",
});
const titre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--police-titre",
});
const signature = Yesteryear({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--police-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Psychologue à ${cabinet.ville} — ${praticien.nom}`,
    template: `%s — ${praticien.nom}, psychologue à ${cabinet.ville}`,
  },
  description:
    `${praticien.titreCourt} à ${cabinet.ville}. Consultations pour adultes sur rendez-vous, ` +
    `${horaires.libelle.toLowerCase()}.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `${praticien.nom}, psychologue à ${cabinet.ville}`,
  },
  robots: { index: true, follow: true },
};

/**
 * Navigation. Les libellés disent ce que sont les pages : l'ancien menu
 * (« Qui, quand, où ? », « Les "Psy" », « Infos légales ») masquait des pages
 * positionnées — /psychanalyste-nantes/ ranke 2e sur « psychanalyste nantes ».
 *
 * Huit entrées, c'est le plafond raisonnable : au-delà, le menu passe sur deux
 * lignes en desktop et cesse d'être lisible d'un coup d'œil. Toute page
 * supplémentaire passe donc par le maillage contextuel, le pied de page ou le
 * plan du site — pas par une neuvième entrée.
 *
 * « Écrits » plutôt que « Blog » : c'est le titre porté par la page elle-même,
 * et le mot correspond mieux à deux textes par mois qu'à un flux d'actualité.
 */
const NAVIGATION = [
  { href: "/vincent-rousseau-psychologue/", label: "Qui je suis" },
  { href: "/psychotherapeute-nantes/", label: "La psychothérapie" },
  { href: "/psychanalyste-nantes/", label: "La psychanalyse" },
  { href: "/consultations/", label: "Les consultations" },
  { href: "/tarifs-et-remboursement/", label: "Tarifs" },
  /* « FAQ » dans le menu, « Questions fréquentes » en H1 sur la page : le menu
     est en petites capitales et doit rester court, le titre de page porte le
     mot-clé en toutes lettres. */
  { href: "/aide-faq/", label: "FAQ" },
  { href: "/blog/", label: "Écrits" },
  { href: "/contact-psychologue-clinicien-nantes/", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // LocalBusiness + Person sur toutes les pages : l'entité doit rester
  // cohérente partout pour le SEO local et pour les moteurs génératifs.
  const jsonLd = graph(localBusinessSchema(), personSchema());

  return (
    <html
      lang="fr"
      className={`${texte.variable} ${titre.variable} ${signature.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white font-texte text-encre">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-encre focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>

        {/* En-tete a trois colonnes avec pastilles terracotta — repris du
            site d'origine, ou il porte l'essentiel de l'information de contact. */}
        <div className="bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-4 px-5 py-5">
            <Link href="/" className="leading-none">
              <span className="font-signature text-3xl text-encre">{praticien.nom}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-wide text-ardoise">
                {praticien.titreCourt}
              </span>
            </Link>

            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Pastille><IconeTelephone /></Pastille>
                <span>
                  <span className="block font-medium text-encre">Téléphone</span>
                  <a href={`tel:${contact.telephoneE164}`} className="text-ardoise">
                    {contact.telephone}
                  </a>
                </span>
              </li>
              <li className="hidden items-center gap-3 lg:flex">
                <Pastille><IconeHorloge /></Pastille>
                <span>
                  <span className="block font-medium text-encre">{contact.email}</span>
                  <span className="text-ardoise">RDV {horaires.libelle.toLowerCase()}</span>
                </span>
              </li>
              <li className="hidden items-center gap-3 md:flex">
                <Pastille><IconeLieu /></Pastille>
                <span>
                  <span className="block font-medium text-encre">Adresse</span>
                  <span className="text-ardoise">{adressePostale}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de navigation sombre — element d'identite fort du site actuel. */}
        <header className="bg-white">
          <nav
            aria-label="Navigation principale"
            className="mx-auto max-w-6xl px-5 pb-6"
          >
            <ul className="flex flex-wrap items-stretch overflow-hidden rounded-[20px] bg-encre text-xs uppercase tracking-widest text-white">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-5 py-5 hover:text-terracotta"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="ml-auto">
                <Link
                  href="/rendez-vous-psychologue-nantes/"
                  className="block h-full bg-terracotta px-7 py-5 font-medium text-encre"
                >
                  Prendre RDV
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main id="contenu" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-peche bg-creme">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-ardoise sm:grid-cols-3">
            <div>
              <p className="font-signature text-3xl text-bois">{praticien.nom}</p>
              <p className="mt-1">{praticien.titres.join(" · ")}</p>
              <p className="mt-4">
                <a
                  href={`tel:${contact.telephoneE164}`}
                  className="text-lg font-medium text-encre"
                >
                  {contact.telephone}
                </a>
              </p>
            </div>

            <nav aria-label="Liens utiles">
              <p className="text-base font-bold text-bois">Liens utiles</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/rendez-vous-psychologue-nantes/">Prendre rendez-vous</Link>
                </li>
                <li>
                  <Link href="/tarifs-et-remboursement/">Tarifs et remboursement</Link>
                </li>
                <li>
                  <Link href="/mentions-legales/">Mentions légales</Link>
                </li>
                <li>
                  <Link href="/politique-de-confidentialite/">Confidentialité</Link>
                </li>
                <li>
                  <Link href="/blog/">Écrits</Link>
                </li>
                <li>
                  <Link href="/plan-du-site/">Plan du site</Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className="text-base font-bold text-bois">Le cabinet</p>
              <address className="mt-3 not-italic">
                {cabinet.rue}
                <br />
                {cabinet.codePostal} {cabinet.ville}
                <br />
                {cabinet.acces.tram}
              </address>
              <p className="mt-3">{horaires.libelle}</p>
              <p>{horaires.modalite}</p>
            </div>
          </div>

          <div className="border-t border-peche">
            <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-ardoise">
              <p>
                Numéro ADELI {praticien.adeli} — SIRET {praticien.siret}. Les séances sont
                couvertes par le secret professionnel.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
