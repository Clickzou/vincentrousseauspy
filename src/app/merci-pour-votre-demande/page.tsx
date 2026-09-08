import type { Metadata } from "next";
import Link from "next/link";

import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { contact, praticien, priseRdv } from "@/lib/site-config";

/**
 * /merci-pour-votre-demande/ — URL CONSERVÉE du site WordPress.
 *
 * `noindex` : une page de confirmation n'a rien à faire dans les résultats de
 * recherche, et elle est exclue du sitemap (`sitemap-data.ts`).
 *
 * Elle sert deux fins :
 *  - dire ce qui va se passer, et sous quel délai (§ 9.4) ;
 *  - constituer l'événement de conversion mesurable côté analytics, sans
 *    qu'aucune donnée personnelle n'ait à être transmise à l'outil de mesure
 *    (§ 9.5 : on compte les arrivées ici, jamais le contenu d'une demande).
 */

export const metadata: Metadata = {
  title: "Merci pour votre demande",
  // Aucune canonique : la page n'est pas indexable.
  robots: { index: false, follow: true },
};

export default function Merci() {
  return (
    <section className="px-5 py-20 sm:px-10 lg:px-[100px]">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
          Votre demande est bien partie
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-ardoise">
          {priseRdv.suite} Je réponds {priseRdv.delaiReponse}.
        </p>

        <div className="mt-8 rounded-[20px] bg-menthe px-6 py-8 sm:px-10">
          <h2 className="text-xl font-bold text-bois">Si c&rsquo;est urgent</h2>
          <p className="mt-3 text-ardoise">
            Vous n&rsquo;avez pas à attendre mon rappel&nbsp;: vous pouvez m&rsquo;appeler
            directement au{" "}
            <a
              href={`tel:${contact.telephoneE164}`}
              className="font-semibold text-encre underline underline-offset-2"
            >
              {contact.telephone}
            </a>
            . Si je suis en séance, laissez votre numéro sur la messagerie.
          </p>
        </div>

        <p className="mt-8 text-ardoise">
          Rien de ce que vous avez saisi n&rsquo;a été enregistré sur ce site&nbsp;: votre
          demande m&rsquo;a été transmise par e-mail, et rien d&rsquo;autre n&rsquo;en
          subsiste. Vous n&rsquo;avez donc pas de compte à supprimer ni de mot de passe à
          retenir.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
          >
            Retour à l&rsquo;accueil
          </Link>
          <Link
            href="/aide-faq/"
            className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
          >
            Questions fréquentes
          </Link>
        </div>

        <div className="mt-10 text-sm text-ardoise">
          <p>
            {praticien.nom} — {praticien.titreCourt}. Numéro ADELI {praticien.adeli}.
          </p>
          <UrgenceBanner />
        </div>
      </div>
    </section>
  );
}
