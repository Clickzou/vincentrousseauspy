import type { Metadata } from "next";
import Link from "next/link";

import { PageEnTete } from "@/components/ui/PageEnTete";
import { IconeLienExterne } from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import {
  adressePostale,
  cabinet,
  contact,
  horaires,
  praticien,
  seance,
} from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * /cabinet-nantes/ — PAGE NOUVELLE (SEO_MASTER § 6.3).
 *
 * Ancrage local réel : le tram, le quartier, les repères. C'est ce qui
 * distingue une page locale d'une page « nantaise » de façade, et ce qui
 * soutient le pack local avec la fiche Google Business Profile — d'où un NAP
 * strictement identique, tiré de site-config et de nulle part ailleurs.
 *
 * ⚠️ PAS DE CARTE EMBARQUÉE. Un iframe Google Maps transmet l'adresse IP du
 * visiteur à Google avant tout consentement, ce que le § 2.4 proscrit au même
 * titre que les polices en CDN. La page renvoie donc vers un plan par un lien
 * externe, que le visiteur ouvre s'il le veut. Ne pas « améliorer » cette page
 * en y encastrant une carte.
 *
 * ACCESSIBILITÉ PMR : obtenue le 8 septembre 2026 — le cabinet est de
 * plain-pied. Le mot est écrit en toutes lettres parce qu'il répond à la
 * seule question qui décide du déplacement, là où le « tient compte des
 * normes d'accessibilité » du site actuel n'informait de rien.
 */

const TITRE = "Le cabinet à Nantes";

export const metadata: Metadata = {
  /* `absolute` : le titre contient déjà la ville, le suffixe la répéterait.
     Voir la règle dans layout.tsx. */
  title: { absolute: `${TITRE} — ${praticien.nom}` },
  description:
    `Le cabinet, ${cabinet.rue} à ${cabinet.ville} : tramway ligne 1 arrêt ` +
    `« Manufacture », quartier Jardin des Plantes. Accès de plain-pied, stationnement.`,
  alternates: { canonical: canonical("cabinet-nantes") },
  openGraph: { title: `${TITRE} — ${praticien.nom}`, url: canonical("cabinet-nantes") },
};

/** Lien de plan externe, repris du site actuel (docs/donnees-vincent.md § 2). */
const PLAN_URL = "https://goo.gl/maps/DQ4LPE52wByQV3i29";

export default function CabinetNantes() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "cabinet-nantes" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre={`Le cabinet à ${cabinet.ville} : accès et plan`}
        chapeau={
          `${cabinet.acces.reperes}. Le cabinet est desservi par le tram, et des places ` +
          `de stationnement sont accessibles à proximité.`
        }
      />

      <section aria-labelledby="adresse" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <div className="rounded-[20px] bg-peche px-6 py-10 sm:px-12">
          <h2 id="adresse" className="text-2xl font-bold text-bois">
            L&rsquo;adresse
          </h2>
          <address className="mt-4 text-3xl font-bold not-italic tracking-tight text-encre sm:text-4xl">
            {cabinet.rue}
            <br />
            {cabinet.codePostal} {cabinet.ville}
          </address>
          <p className="mt-5 max-w-lecture text-ardoise">{cabinet.acces.reperes}.</p>
          <p className="mt-6">
            <a
              href={PLAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
            >
              <IconeLienExterne className="h-4 w-4" />
              Ouvrir le plan
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="venir" className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]">
        <h2 id="venir" className="text-2xl font-bold text-bois sm:text-[33px]">
          Comment venir
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[20px] bg-lin p-7">
            <h3 className="font-bold text-encre">En tramway</h3>
            <p className="mt-3 text-ardoise">{cabinet.acces.tram}.</p>
            <p className="mt-2 text-sm text-ardoise">
              La ligne 1 dessert le centre-ville et la gare SNCF.
            </p>
          </div>

          {/* Ajoutée parce que la gare est le repère le plus utile pour qui vient
              de l'agglomération ou d'une autre ville, et qu'elle figure déjà
              dans `cabinet.acces.reperes`. */}
          <div className="rounded-[20px] bg-lin p-7">
            <h3 className="font-bold text-encre">En train</h3>
            <p className="mt-3 text-ardoise">
              Le cabinet est proche de la gare de Nantes, côté nord.
            </p>
            <p className="mt-2 text-sm text-ardoise">
              La ligne 1 relie directement la gare à l&rsquo;arrêt
              &laquo;&nbsp;Manufacture&nbsp;&raquo;.
            </p>
          </div>

          <div className="rounded-[20px] bg-lin p-7">
            <h3 className="font-bold text-encre">En voiture</h3>
            <p className="mt-3 text-ardoise">{cabinet.acces.stationnement}.</p>
            <p className="mt-2 text-sm text-ardoise">
              Le stationnement est payant&nbsp;: prévoyez de quoi régler l&rsquo;horodateur.
            </p>
          </div>

          <div className="rounded-[20px] bg-lin p-7">
            <h3 className="font-bold text-encre">Les repères</h3>
            <p className="mt-3 text-ardoise">
              Derrière la Manufacture des Tabacs, entre la gare Nord et le Jardin des
              Plantes.
            </p>
          </div>
        </div>
      </section>

      {/* LE QUARTIER. Section ajoutée après l'audit de positions : le site se
          positionnait sur des requêtes de quartier — dont `psychologue nantes
          zola`, 90 recherches/mois — sans jamais nommer le sien. Zola est à
          l'ouest, le cabinet à l'est : ces positions n'étaient pas des acquis
          mais des faux positifs, et le visiteur qui cliquait repartait.

          Le rattachement administratif vient d'OpenStreetMap, relevé le
          8 septembre 2026 sur l'adresse du cabinet. Aucun temps de trajet,
          aucune ligne de bus, aucun commerce n'est mentionné ici : ce sont
          des détails qu'on n'a pas vérifiés, et qu'une page locale ne doit
          jamais inventer. */}
      <section
        aria-labelledby="quartier"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="quartier" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le quartier
        </h2>

        <div className="prose-clinique mt-6">
          <p className="!mt-0">
            Le cabinet se trouve rue de la Havane, dans le quartier{" "}
            <strong>Coulmiers &mdash; Jardin des Plantes</strong>, qui appartient au grand
            quartier nantais de <strong>Malakoff &mdash; Saint-Donatien</strong>, à l&rsquo;est
            du centre-ville.
          </p>
          <p>
            Le repère le plus simple reste la <strong>Manufacture des Tabacs</strong>&nbsp;:
            le cabinet se situe juste derrière. Le <strong>Jardin des Plantes</strong> et la{" "}
            <strong>gare de Nantes</strong> sont les deux autres points de repère du secteur.
            C&rsquo;est un quartier traversé par la ligne 1 du tramway, ce qui le rend
            accessible depuis le centre-ville comme depuis la gare sans changement.
          </p>
          <p>
            Si vous venez d&rsquo;une commune de l&rsquo;agglomération ou d&rsquo;une autre
            ville, c&rsquo;est cette proximité avec la gare qui simplifie le trajet. Et si
            vous hésitez sur le chemin, <a href={`tel:${contact.telephoneE164}`}>appelez-moi</a>
            &nbsp;: je vous l&rsquo;indiquerai.
          </p>
        </div>
      </section>

      {/* Accessibilité. Le site actuel écrit que le cabinet « tient compte des
          normes », ce qui n'informe personne. Tant que le fait n'est pas
          connu, on le dit. */}
      <section
        aria-labelledby="accessibilite"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="max-w-lecture">
          <h2 id="accessibilite" className="text-2xl font-bold text-bois sm:text-[33px]">
            Accessibilité
          </h2>
          {cabinet.acces.pmr ? (
            <p className="mt-4 text-ardoise">{cabinet.acces.pmr}</p>
          ) : (
            <p className="mt-4 text-ardoise">
              Si vous êtes en situation de handicap ou à mobilité réduite,{" "}
              <a
                href={`tel:${contact.telephoneE164}`}
                className="font-medium text-encre underline underline-offset-2"
              >
                appelez-moi avant de vous déplacer
              </a>{" "}
              : je vous décrirai précisément l&rsquo;accès, et nous verrons ensemble ce
              qui est possible. Vous aurez une réponse concrète, pas une formule.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="sur-place" className="px-5 py-14 sm:px-10 lg:px-[100px]">
        <h2 id="sur-place" className="text-2xl font-bold text-bois sm:text-[33px]">
          Une fois sur place
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Je reçois {minusculeInitiale(horaires.libelle)}, uniquement sur rendez-vous&nbsp;:
            il n&rsquo;est pas possible de se présenter sans avoir appelé. Une séance dure{" "}
            {seance.duree}.
          </p>
          <p>
            Si vous ne pouvez pas venir, prévenez-moi par téléphone&nbsp;: le créneau peut
            alors être proposé à quelqu&rsquo;un d&rsquo;autre.{" "}
            <Link href="/consultations/">Comment se déroule une consultation</Link>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/rendez-vous-psychologue-nantes/"
            className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
          >
            Prendre rendez-vous
          </Link>
          <a
            href={`tel:${contact.telephoneE164}`}
            className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
          >
            {contact.telephone}
          </a>
        </div>

        <p className="mt-10 text-sm text-ardoise">
          {praticien.nom} — {praticien.titreCourt}, {adressePostale}. Numéro ADELI{" "}
          {praticien.adeli}.
        </p>
      </section>
    </>
  );
}
