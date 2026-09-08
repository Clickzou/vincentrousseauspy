import type { Metadata } from "next";
import Link from "next/link";

import { PageEnTete } from "@/components/ui/PageEnTete";
import {
  adressePostale,
  cabinet,
  contact,
  editeur,
  mesureAudience,
  praticien,
  SITE_URL,
} from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /mentions-legales/ — URL CONSERVÉE, en `noindex` (elle l'est déjà
 * aujourd'hui, et n'a rien à faire dans les résultats de recherche).
 *
 * ⚠️ DEUX CORRECTIONS PAR RAPPORT AU SITE ACTUEL :
 *
 * 1. **Le n° ADELI y figure enfin.** Il était sur l'accueil et sur
 *    /dispositions-legales/, mais absent des mentions légales — alors que
 *    c'est la mention attendue pour une profession réglementée (§ 2.4,
 *    règle 4). Cette page absorbe donc le contenu de /dispositions-legales/,
 *    qui est redirigée ici (next.config.ts).
 *
 * 2. **L'hébergeur n'est plus o2switch mais Vercel.** Laisser l'ancien serait
 *    publier une information fausse sur la page qui sert justement à établir
 *    qui répond de quoi.
 *
 * Les valeurs viennent toutes de site-config : une mention légale qui diverge
 * du reste du site est pire qu'une mention absente.
 */

export const metadata: Metadata = {
  title: "Mentions légales",
  /* Canonique auto-référente MÊME EN `noindex` : sans elle, la page hérite
     du `alternates.canonical: "/"` du layout et désigne l'accueil comme sa
     version canonique — un signal faux, même sur une page non indexée. */
  alternates: { canonical: canonical("mentions-legales") },
  robots: { index: false, follow: true },
};

/** Titre de section, uniforme sur les trois pages légales. */
function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mt-12 text-xl font-bold text-bois">
      {children}
    </h2>
  );
}

export default function MentionsLegales() {
  return (
    <>
      <PageEnTete centre titre="Mentions légales" />

      {/* Colonne centrée, comme sur le site d'origine : une page légale se lit
          comme un document, pas comme une page de site. L'en-tête (`centre`) et
          le corps partagent la même largeur, `max-w-lecture`, donc s'alignent.

          Le `<section>` qui englobait tout a été retiré : il portait les mêmes
          marges horizontales que `PageEnTete`, qui se retrouvaient doublées. */}
      <div className="prose-clinique mx-auto px-5 pb-16 sm:px-10">
        <H2 id="editeur">Éditeur du site</H2>
        <p className="mt-4">
          Le site accessible à l&rsquo;adresse{" "}
          <Link href="/">{SITE_URL.replace("https://", "")}</Link> est édité par{" "}
          {praticien.nom}, {praticien.titreCourt.toLowerCase()}, exerçant en libéral au{" "}
          {adressePostale}.
        </p>
        <p className="mt-4">
          Téléphone&nbsp;:{" "}
          <a href={`tel:${contact.telephoneE164}`}>{contact.telephone}</a>
          <br />
          Courriel&nbsp;: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          Directeur de la publication&nbsp;: {editeur.directeurPublication}
        </p>

        <H2 id="exercice">Exercice professionnel</H2>
        <p className="mt-4">
          Psychologue déclaré auprès de la {praticien.declarations.psychologue} —{" "}
          <strong>numéro ADELI&nbsp;: {praticien.adeli}</strong>.
        </p>
        <p className="mt-4">
          Activité libérale déclarée auprès de l&rsquo;
          {praticien.declarations.activiteLiberale} — numéro SIRET&nbsp;:{" "}
          {praticien.siret}.
        </p>
        <p className="mt-4">
          Titulaire du {praticien.diplome.intitule}, délivré par l&rsquo;
          {praticien.diplome.etablissement}. Le titre de psychologue est protégé par
          l&rsquo;article 44 de la loi n°&nbsp;85-772 du 25 juillet 1985&nbsp;; le titre de
          psychothérapeute par l&rsquo;article 52 de la loi n°&nbsp;2004-806 du 9 août 2004.{" "}
          <Link href="/vincent-rousseau-psychologue/">
            Le détail de mon parcours et de mes titres
          </Link>
          .
        </p>
        <p className="mt-4">
          Rattachements&nbsp;: {praticien.rattachements.join(", ")}.
        </p>
        <p className="mt-4">
          L&rsquo;exercice est soumis au secret professionnel, dans les conditions prévues
          par les articles 226-13 et 226-14 du code pénal, et au code de déontologie des
          psychologues.
        </p>

        <H2 id="hebergeur">Hébergeur du site</H2>
        <p className="mt-4">
          Le site est hébergé par {editeur.hebergeur.nom}, {editeur.hebergeur.adresse}.
          <br />
          <a href={editeur.hebergeur.site} target="_blank" rel="noopener noreferrer">
            {editeur.hebergeur.site.replace("https://", "")}
          </a>
          {editeur.hebergeur.telephone && (
            <>
              <br />
              Téléphone&nbsp;: {editeur.hebergeur.telephone}
            </>
          )}
        </p>

        <H2 id="donnees">Données personnelles</H2>
        <p className="mt-4">
          {mesureAudience.identifiant
            ? "Ce site ne conserve aucune donnée vous concernant. Les seuls cookies possibles sont ceux des statistiques de fréquentation, et rien n'est déposé sans votre accord."
            : "Ce site ne dépose aucun cookie, ne mesure pas votre audience et ne conserve aucune donnée vous concernant."}{" "}
          <Link href="/politique-de-confidentialite/">
            Le détail de ce qui est — et n&rsquo;est pas — collecté
          </Link>{" "}
          figure sur une page dédiée.
        </p>

        <H2 id="propriete">Propriété intellectuelle</H2>
        <p className="mt-4">
          Les textes publiés sur ce site sont rédigés par {praticien.nom} et protégés au
          titre du code de la propriété intellectuelle. Toute reproduction ou adaptation,
          totale ou partielle, sans accord écrit préalable, est interdite. Seul
          l&rsquo;usage privé dans le cercle de famille est autorisé.
        </p>
        <p className="mt-4">
          Les œuvres reproduites sur ce site — Henri Matisse (1869-1954) et Vassily
          Kandinsky (1866-1944) — appartiennent au domaine public. Les fichiers proviennent
          de collections en accès ouvert, dont celle de l&rsquo;Art Institute of Chicago.
        </p>

        <H2 id="liens">Liens hypertextes</H2>
        <p className="mt-4">
          Ce site comporte des liens vers des sites tiers — Légifrance, Assurance Maladie,
          Agence régionale de santé — édités et gérés par des tiers. Leur contenu
          n&rsquo;engage que leurs éditeurs.
        </p>

        <H2 id="soins">Nature des informations publiées</H2>
        <p className="mt-4">
          Les contenus de ce site sont d&rsquo;ordre général et informatif. Ils ne
          constituent ni un diagnostic, ni un avis clinique, ni une prescription, et ne
          remplacent pas une consultation. En cas d&rsquo;urgence, composez le 15, le 112,
          ou le 3114 pour la prévention du suicide.
        </p>

        <p className="mt-12 text-sm">
          <Link href="/politique-de-confidentialite/">Politique de confidentialité</Link>
          {" · "}
          <Link href="/plan-du-site/">Plan du site</Link>
          {" · "}
          <Link href="/contact-psychologue-clinicien-nantes/">
            Contact à {cabinet.ville}
          </Link>
        </p>
      </div>
    </>
  );
}
