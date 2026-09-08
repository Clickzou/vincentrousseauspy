import type { Metadata } from "next";
import { Abhaya_Libre, Roboto, Yesteryear } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import {
  adressePostale,
  cabinet,
  contact,
  horaires,
  mesureAudience,
  praticien,
  SITE_URL,
} from "@/lib/site-config";
import { graph, localBusinessSchema, personSchema } from "@/lib/seo/schemas";
import { Navigation } from "@/components/ui/Navigation";
import { SignatureAgence } from "@/components/ui/SignatureAgence";
import { BanniereCookies } from "@/components/rgpd/BanniereCookies";
import { MesureAudience } from "@/components/rgpd/MesureAudience";
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
    /* SUFFIXE COURT. Il pesait `— Vincent Rousseau, psychologue à Nantes`,
       soit 40 caractères sur les ~60 que Google affiche : il ne restait que
       20 caractères utiles, et huit pages sur seize étaient tronquées. À 26
       caractères, seules les pages au titre propre très long dépassent encore,
       et celles-là posent leur titre en `absolute`. */
    template: `%s — ${praticien.nom}, ${cabinet.ville}`,
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

  /* Balise de propriété Search Console. Elle ne dépose aucun cookie et ne
     suit personne : elle n'est donc soumise à aucun consentement, et se pose
     dès que le domaine définitif est en ligne. `undefined` quand la variable
     est absente, ce qui n'émet aucune balise. */
  verification: mesureAudience.verificationGoogle
    ? { google: mesureAudience.verificationGoogle }
    : undefined,
};


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
          <Navigation />
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
                {/* Les cookies sont traités DANS la politique de
                    confidentialité, section « Cookies et mesure d'audience »,
                    et non sur une page séparée : /politique-de-cookies-ue/ du
                    site WordPress était vide et se trouve déjà redirigée en 301
                    vers cette page. En recréer une deuxième reconstituerait
                    deux pages minces là où une seule dit tout. */}
                <li>
                  <Link href="/politique-de-confidentialite/#mesure">
                    Politique de cookies
                  </Link>
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
            <div className="mx-auto max-w-6xl px-5 py-4 text-center text-xs text-ardoise">
              <p>
                Numéro ADELI {praticien.adeli} — SIRET {praticien.siret}. Les séances sont
                couvertes par le secret professionnel.
              </p>
              {/* Accueil uniquement : le composant se retire de lui-même
                  ailleurs. Cf. SignatureAgence.tsx. */}
              <SignatureAgence />
            </div>
          </div>
        </footer>

        {/* Hors du <footer> : la bannière se superpose à la page, elle n'en est
            pas le pied. Les deux composants ne rendent rien tant qu'aucun
            identifiant de mesure n'est configuré. */}
        <BanniereCookies />
        <MesureAudience />
      </body>
    </html>
  );
}
