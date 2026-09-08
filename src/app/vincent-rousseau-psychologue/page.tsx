import type { Metadata } from "next";
import Image from "next/image";

import { Bouton } from "@/components/ui/Bouton";
import {
  IconeAffiliation,
  IconeAtteste,
  IconeDiplome,
  IconeInstitution,
  IconeValidation,
} from "@/components/ui/Icones";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, praticien, publics } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * PAGE AUTEUR — pivot E-E-A-T du site.
 *
 * En YMYL santé, l'auteur identifié et vérifiable EST le signal de confiance
 * déterminant (SEO_MASTER § 2.1). Toutes les pages cliniques et tous les
 * articles y renvoient ; sur le site WordPress, ces informations étaient
 * enterrées dans une page « Dispositions légales » à vocation juridique.
 *
 * Le parti pris de cette page : chaque affirmation est vérifiable. Numéro
 * d'enregistrement, autorité de tutelle, université, année, rattachements.
 * Rien de promotionnel, aucun superlatif — ce sont les faits qui portent.
 *
 * CONTENU À VALIDER PAR VINCENT (§ 7.1) : les passages de récit personnel
 * ci-dessous sont une proposition rédigée à partir de son site actuel.
 */

export const metadata: Metadata = {
  title: "Qui je suis",
  description:
    `${praticien.nom}, ${praticien.titres.join(", ").toLowerCase()} à ${cabinet.ville}. ` +
    `Parcours, formation, titres et cadre de travail.`,
  alternates: { canonical: canonical("vincent-rousseau-psychologue") },
};

const ENREGISTREMENTS = [
  {
    Icone: IconeAtteste,
    titre: "Psychologue déclaré",
    lignes: [
      `Auprès de la ${praticien.declarations.psychologue}.`,
      `Numéro ADELI : ${praticien.adeli}`,
    ],
  },
  {
    Icone: IconeInstitution,
    titre: "Activité libérale déclarée",
    lignes: [
      `Auprès de l'${praticien.declarations.activiteLiberale}.`,
      `Numéro SIRET : ${praticien.siret}`,
    ],
  },
  {
    Icone: IconeDiplome,
    titre: "Diplôme",
    lignes: [`${praticien.diplome.intitule}.`, `Délivré par l'${praticien.diplome.etablissement}.`],
  },
  {
    Icone: IconeAffiliation,
    titre: "Rattachements",
    lignes: praticien.rattachements.map((r) => `${r}.`),
  },
];

export default function PageAuteur() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: "Qui je suis", url: "vincent-rousseau-psychologue" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre="Vincent Rousseau, psychologue à Nantes"
        chapeau={praticien.doubleTitre}
      />

      <section className="px-5 py-10 sm:px-10 lg:px-[100px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="prose-clinique">
              <h2>Ma pratique</h2>
              <p>
                Je suis psychologue clinicien et psychanalyste, installé en libéral à{" "}
                {cabinet.ville}. Mes consultations s&rsquo;adressent {publics.libelle}, sur
                rendez-vous et en présentiel.
              </p>
              <p>
                Mon référentiel de travail est la psychanalyse. Cela ne veut pas dire que
                j&rsquo;applique une méthode identique à chacun&nbsp;: cela veut dire que
                j&rsquo;accorde une place centrale à votre parole et à ce qu&rsquo;elle dit
                de votre histoire, plutôt qu&rsquo;au seul traitement du symptôme. Le
                travail se construit avec vous, à partir de ce que vous apportez.
              </p>

              <h2>Les trois titres sous lesquels j&rsquo;exerce</h2>
              <p>
                Le vocabulaire des «&nbsp;psy&nbsp;» est confus, et cette confusion permet
                à des personnes sans formation reconnue de se présenter comme
                thérapeutes. Voici précisément ce que recouvrent les miens.
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              <li className="rounded-[20px] bg-creme p-6">
                <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-valide">
                  <IconeValidation className="h-4 w-4" />
                  Titre protégé par la loi
                </p>
                <p className="mt-2 text-lg font-bold text-encre">Psychologue clinicien</p>
                <p className="mt-2 text-ardoise">
                  Titre universitaire protégé depuis 1985, permettant l&rsquo;inscription au
                  répertoire des professionnels de santé. Il atteste d&rsquo;une compétence
                  reconnue en psychopathologie — la science des troubles psychiques — et
                  d&rsquo;une écoute formée à la singularité de chacun.
                </p>
              </li>
              <li className="rounded-[20px] bg-creme p-6">
                <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-valide">
                  <IconeValidation className="h-4 w-4" />
                  Titre protégé par la loi depuis 2010
                </p>
                <p className="mt-2 text-lg font-bold text-encre">Psychothérapeute</p>
                <p className="mt-2 text-ardoise">
                  Il correspond à une compétence reconnue dans le soin psychique, et suppose
                  une inscription sur un registre national. Il se distingue de celui de{" "}
                  <em>psychopraticien</em>, librement utilisable, qui ne résulte
                  d&rsquo;aucun cursus universitaire et n&rsquo;est pas reconnu par
                  l&rsquo;État.
                </p>
              </li>
              <li className="rounded-[20px] bg-creme p-6">
                <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-terracotta-fonce">
                  <IconeValidation className="h-4 w-4" />
                  Méthode de travail — titre non protégé
                </p>
                <p className="mt-2 text-lg font-bold text-encre">Psychanalyste</p>
                <p className="mt-2 text-ardoise">
                  Ce titre n&rsquo;est pas protégé par la loi&nbsp;: il indique une méthode,
                  la mienne, et repose sur une formation analytique et une appartenance à des
                  sociétés de psychanalyse. La psychanalyse est la forme la plus classique
                  des thérapies dites «&nbsp;de fond&nbsp;», par opposition aux thérapies
                  brèves.
                </p>
              </li>
            </ul>

            <div className="prose-clinique mt-10">
              <h2>Ce que je ne fais pas</h2>
              <p>
                Je ne reçois ni {publics.nonRecus.join(", ni ")}. Si votre demande concerne
                l&rsquo;un de ces publics, une ou un collègue spécialisé sera plus indiqué,
                et votre médecin traitant peut vous orienter.
              </p>
              <p>
                Je ne prends pas en charge les situations d&rsquo;urgence. En cas de détresse
                immédiate, le <strong>3114</strong> répond gratuitement à toute heure, et le{" "}
                <strong>15</strong> en cas d&rsquo;urgence vitale.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <figure>
              <Image
                src="/images/matisse-detail-nature-morte.jpg"
                alt=""
                width={800}
                height={821}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="rounded-[20px]"
              />
              <figcaption className="mt-3 text-xs text-ardoise">
                Henri Matisse, <cite>Nature morte d&rsquo;après « La Desserte » de Jan
                Davidsz. de Heem</cite> (1915), détail.
              </figcaption>
            </figure>

            {/* Bloc de faits vérifiables : c'est lui qui porte l'E-E-A-T. */}
            <div className="mt-8 rounded-[20px] bg-lavande p-7">
              <p className="text-base font-bold text-bois">Formation et enregistrement</p>
              <dl className="mt-5 space-y-5 text-sm">
                {ENREGISTREMENTS.map(({ Icone, titre, lignes }) => (
                  <div key={titre} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                      <Icone />
                    </span>
                    <div>
                      <dt className="font-medium text-encre">{titre}</dt>
                      <dd className="mt-1 text-ardoise">
                        {lignes.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 rounded-[20px] bg-menthe p-7">
              <p className="text-base font-bold text-bois">Me joindre</p>
              <p className="mt-3 text-ardoise">
                {cabinet.rue}, {cabinet.codePostal} {cabinet.ville}
                <br />
                {cabinet.acces.tram}
              </p>
              <p className="mt-4">
                <a
                  href={`tel:${contact.telephoneE164}`}
                  className="text-lg font-medium text-encre underline underline-offset-4"
                >
                  {contact.telephone}
                </a>
              </p>
              <p className="mt-5">
                <Bouton href="/rendez-vous-psychologue-nantes/">Prendre rendez-vous</Bouton>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
