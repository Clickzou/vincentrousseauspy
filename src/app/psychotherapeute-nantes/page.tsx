import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Sources, type Source } from "@/components/seo/Sources";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { IconeValidation } from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, honoraires, praticien, publics } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /psychotherapeute-nantes/ — PAGE NOUVELLE (SEO_MASTER § 4, silo 3).
 *
 * Le plus gros gisement de la refonte : ~6 600 recherches/mois, aujourd'hui
 * portées par l'accueil en position 9 faute de page dédiée.
 *
 * RÈGLE DE CLOISONNEMENT D'INTENTION — c'est elle qui gouverne cette page.
 * Quatre pages partagent le champ sémantique « psy » : l'accueil (psychologue),
 * celle-ci (psychothérapeute), /psychanalyste-nantes/ (psychanalyse) et la page
 * pédagogique comparative. Chacune traite SON titre et renvoie aux autres par
 * un lien contextuel. Ne jamais recopier ici l'argumentaire de la psychanalyse
 * ni le comparatif complet des professions : ce serait se cannibaliser.
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1). En particulier,
 * la page affirme qu'il est inscrit au registre national des psychothérapeutes
 * et invite à le vérifier auprès de l'ARS : c'est un signal de confiance fort,
 * mais il doit confirmer son inscription avant publication.
 */

const TITRE = "Psychothérapeute à Nantes";
const MODIFIE_LE = "2026-09-08";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `${praticien.nom}, psychothérapeute à ${cabinet.ville} — titre protégé, inscrit au ` +
    `registre national des psychothérapeutes. Psychothérapie pour adultes sur ` +
    `rendez-vous, de ${honoraires.min} à ${honoraires.max} €.`,
  alternates: { canonical: canonical("psychotherapeute-nantes") },
  openGraph: {
    title: `${TITRE} — ${praticien.nom}`,
    url: canonical("psychotherapeute-nantes"),
  },
};

/**
 * Sources primaires. Vérifiées le 2026-09-08 sur Légifrance et sur le site de
 * l'ARS. À revérifier à chaque révision de la page : les conditions d'usage du
 * titre ont déjà été modifiées une fois, par le décret de 2012.
 */
const SOURCES: Source[] = [
  {
    titre: "Article 52 de la loi n° 2004-806 du 9 août 2004 relative à la politique de santé publique",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000031930044",
  },
  {
    titre: "Décret n° 2010-534 du 20 mai 2010 relatif à l'usage du titre de psychothérapeute",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000022244482",
  },
  {
    titre: "Décret n° 2012-695 du 7 mai 2012, modifiant le décret du 20 mai 2010",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000025823878",
  },
  {
    titre: "Demander une reconnaissance du titre de psychothérapeute",
    editeur: "Agence régionale de santé des Pays de la Loire",
    href: "https://www.pays-de-la-loire.ars.sante.fr/demander-une-reconnaissance-du-titre-de-psychotherapeute",
  },
];

/** Les trois conditions posées par le décret. Faits, pas arguments. */
const CONDITIONS = [
  {
    titre: "Un diplôme de niveau master, au minimum",
    texte:
      "La formation n'est accessible qu'aux titulaires d'un doctorat donnant droit " +
      "d'exercer la médecine en France, ou d'un master de psychologie ou de psychanalyse.",
  },
  {
    titre: "400 heures de psychopathologie clinique",
    texte:
      "C'est la formation à l'étude des troubles psychiques : savoir reconnaître ce " +
      "que l'on a devant soi, et repérer ce qui relève d'un autre professionnel.",
  },
  {
    titre: "Un stage pratique d'au moins cinq mois",
    texte:
      "Effectué auprès de personnes en souffrance psychique, dans une structure " +
      "agréée à cet effet.",
  },
];

export default function PsychotherapeuteNantes() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "psychotherapeute-nantes" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre="Psychothérapeute à Nantes"
        chapeau={
          `Je suis psychothérapeute — un titre protégé par la loi, qui suppose une ` +
          `formation vérifiée et une inscription auprès de l'Agence régionale de santé. ` +
          `Je reçois ${publics.libelle} à ${cabinet.ville}, sur rendez-vous.`
        }
      />

      {/* 1. LE TITRE. C'est l'intention n° 1 derrière la requête : savoir à
          qui on a affaire. Le champ est saturé d'appellations libres, et
          l'internaute n'a aucun moyen de les distinguer. */}
      <section
        aria-labelledby="le-titre"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="le-titre" className="text-2xl font-bold text-bois sm:text-[33px]">
          Un titre protégé, et ce qu&rsquo;il garantit
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Depuis 2004, l&rsquo;usage du titre de psychothérapeute est réservé aux
            professionnels inscrits au <strong>registre national des psychothérapeutes</strong>.
            L&rsquo;inscription est prononcée par le directeur général de l&rsquo;Agence
            régionale de santé, qui tient une liste départementale — cette liste est
            publique, tenue à jour et régulièrement publiée.
          </p>
          <p>
            Autrement dit&nbsp;: vous pouvez vérifier qu&rsquo;une personne qui se dit
            psychothérapeute a le droit de le faire. C&rsquo;est rarement le cas dans ce
            champ professionnel, et c&rsquo;est ce qui distingue ce titre de celui de{" "}
            <em>psychopraticien</em>, librement utilisable et qui ne suppose aucun cursus
            reconnu par l&rsquo;État.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CONDITIONS.map((c) => (
            <li key={c.titre} className="rounded-[20px] bg-white p-6">
              <span className="text-valide" aria-hidden="true">
                <IconeValidation className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-bold text-encre">{c.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ardoise">{c.texte}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-lecture text-sm text-ardoise">
          Je suis par ailleurs psychologue clinicien — l&rsquo;autre titre protégé de ce
          champ — et psychanalyste.{" "}
          <Link
            href="/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            Ce que recouvrent exactement les différents « psy »
          </Link>
          .
        </p>
      </section>

      {/* 2. CE QU'EST UNE PSYCHOTHÉRAPIE. Intention n° 2 : à quoi je m'engage
          si je pousse la porte. Volontairement désidéalisé (§ 9.2). */}
      <section aria-labelledby="ce-que-cest" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="ce-que-cest" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce qu&rsquo;est une psychothérapie
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Une psychothérapie est un travail par la parole, mené à deux, dans un cadre
            régulier. Vous venez avec ce qui vous encombre&nbsp;; mon rôle n&rsquo;est pas
            de vous dire quoi faire, ni de vous fournir des exercices, mais de permettre
            que quelque chose se dise et se déplace.
          </p>
          <p>
            Ce n&rsquo;est pas réservé aux situations graves. On consulte aussi bien pour
            une souffrance qui dure sans qu&rsquo;on sache la nommer que pour un épisode
            précis. Et ce n&rsquo;est pas un aveu de faiblesse&nbsp;: demander de
            l&rsquo;aide suppose plutôt d&rsquo;avoir reconnu quelque chose.
          </p>
          <p>
            La durée n&rsquo;est pas fixée d&rsquo;avance. Certaines situations se
            dénouent en quelques mois, d&rsquo;autres demandent un travail plus long. Vous
            restez libre d&rsquo;interrompre à tout moment&nbsp;: rien de ce qui se décide
            ici ne vous engage au-delà de ce que vous voulez.
          </p>
        </div>
      </section>

      {/* 3. QUAND CONSULTER. Formulé en situations concrètes plutôt qu'en
          liste de symptômes : l'accueil porte déjà les étiquettes de motifs,
          et les répéter ici mettrait les deux pages en concurrence. */}
      <section
        aria-labelledby="quand-consulter"
        className="bg-menthe px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="quand-consulter" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce qui conduit à consulter
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Il n&rsquo;y a pas de seuil à franchir, ni de degré de souffrance à atteindre
            pour avoir le droit de consulter. Les personnes que je reçois arrivent le plus
            souvent dans l&rsquo;une de ces situations.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Quelque chose dure depuis trop longtemps — anxiété, tristesse, fatigue — et ne cède pas de soi-même.",
            "La même chose se répète : les mêmes impasses, les mêmes ruptures, le même sentiment d'échec.",
            "Un événement a fait bascule : un deuil, une séparation, une perte, un diagnostic.",
            "Le quotidien tient encore, mais au prix d'un effort qui devient coûteux.",
            "L'entourage s'inquiète, ou vous vous surprenez à éviter ce que vous aimiez.",
            "Vous voulez comprendre ce qui vous détermine, sans qu'il y ait d'urgence particulière.",
          ].map((cas) => (
            <li key={cas} className="rounded-[20px] bg-white/70 px-6 py-5 text-ardoise">
              {cas}
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-lecture text-sm text-ardoise">
          Un premier rendez-vous sert justement à faire le point. Si ce que vous traversez
          relève d&rsquo;un autre professionnel — un médecin, un psychiatre — je vous le
          dirai, et je vous orienterai.{" "}
          <Link
            href="/psychologue-clinicien-nantes/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            Ce qu&rsquo;est un symptôme, et le moment où il cesse de tenir
          </Link>
          .
        </p>
      </section>

      {/* 4. COMMENT JE TRAVAILLE. Le lien vers /psychanalyste-nantes/ est ici
          et pas ailleurs : c'est le point exact où le lecteur se demande
          « oui, mais avec quelle méthode ? ». */}
      <section aria-labelledby="ma-methode" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="ma-methode" className="text-2xl font-bold text-bois sm:text-[33px]">
          Comment je travaille
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Mon référentiel est la psychanalyse. Cela ne veut pas dire un divan et un
            silence de plusieurs années&nbsp;: cela veut dire que j&rsquo;accorde une place
            centrale à votre parole et à ce qu&rsquo;elle dit de votre histoire, plutôt
            qu&rsquo;au seul effacement du symptôme. Nous sommes assis face à face, et
            nous parlons.
          </p>
          <p>
            Concrètement, la première séance sert à faire connaissance et à formuler ce qui
            vous amène. Nous convenons ensuite d&rsquo;un rythme — le plus souvent
            hebdomadaire — et le travail se construit à partir de ce que vous apportez.{" "}
            <Link href="/psychanalyste-nantes/">
              En savoir plus sur mon approche psychanalytique
            </Link>
            , ou{" "}
            <Link href="/consultations/">voir comment se déroulent les consultations</Link>.
          </p>
          <p>
            Je reçois {publics.libelle}, au cabinet uniquement&nbsp;: je ne propose pas de
            consultation à distance. Le cadre — un lieu, un horaire, une régularité — fait
            partie du travail.
          </p>
        </div>
      </section>

      {/* 5. LEVER LES FREINS CONCRETS, puis proposer le rendez-vous. */}
      <section
        aria-labelledby="en-pratique"
        className="bg-lavande px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="en-pratique" className="text-2xl font-bold text-bois sm:text-[33px]">
          En pratique
        </h2>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              terme: "Où",
              detail: `${cabinet.rue}, ${cabinet.ville}. ${cabinet.acces.tram}.`,
            },
            {
              terme: "Combien",
              detail: `De ${honoraires.min} à ${honoraires.max} € la séance. ${honoraires.modulation}`,
            },
            { terme: "Pour qui", detail: `Uniquement ${publics.libelle}.` },
            {
              terme: "Confidentialité",
              detail: "Tout ce qui se dit en séance est couvert par le secret professionnel.",
            },
          ].map((item) => (
            <div key={item.terme} className="rounded-[20px] bg-white/70 p-6">
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
                {item.terme}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ardoise">{item.detail}</dd>
            </div>
          ))}
        </dl>

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
          <Link
            href="/tarifs-et-remboursement/"
            className="text-sm text-terracotta-fonce underline underline-offset-2"
          >
            Tarifs et remboursement
          </Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <div className="max-w-lecture">
          <UrgenceBanner />
          <Sources sources={SOURCES} />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
