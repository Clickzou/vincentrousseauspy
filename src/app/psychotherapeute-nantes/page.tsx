import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Apparition } from "@/components/ui/Apparition";
import { Sources, type Source } from "@/components/seo/Sources";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
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

      {/* EN-TÊTE EN CARTE, même traitement que /vincent-rousseau-psychologue/ :
          bandeau de qualification, titre, filet, puis la phrase d'accroche en
          police d'accent. Le fil d'Ariane reste au-dessus de la carte, il
          alimente le `BreadcrumbList` déclaré plus haut. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">Psychothérapeute à {cabinet.ville}</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              Titre protégé par la loi · Registre national des psychothérapeutes
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {`Psychothérapeute à ${cabinet.ville}`}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Je suis psychothérapeute — un titre protégé par la loi, qui suppose une
              formation vérifiée et une inscription auprès de l&rsquo;Agence régionale de
              santé. Je reçois {publics.libelle} à {cabinet.ville}, sur rendez-vous.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 1. LE TITRE. C'est l'intention n° 1 derrière la requête : savoir à
          qui on a affaire. Le champ est saturé d'appellations libres, et
          l'internaute n'a aucun moyen de les distinguer. */}
      <section
        aria-labelledby="le-titre"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        {/* Le titre est DANS la colonne de gauche, et non au-dessus de la
            grille : c'est ce qui aligne le haut de l'œuvre sur celui du titre.
            Placé en dehors, il ne comptait pas dans la hauteur de la rangée. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-7">
            <h2
              id="le-titre"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Un titre protégé, et ce qu&rsquo;il garantit
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <div className="prose-clinique mt-6 max-w-none">
              <p className="!mt-0">
                Depuis 2004, l&rsquo;usage du titre de psychothérapeute est réservé aux
                professionnels inscrits au{" "}
                <strong>registre national des psychothérapeutes</strong>.
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
              <p>
                Je suis par ailleurs psychologue clinicien — l&rsquo;autre titre protégé de
                ce champ — et psychanalyste.{" "}
                <Link href="/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/">
                  Ce que recouvrent exactement les différents « psy »
                </Link>
                .
              </p>
            </div>
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <aside className="h-full">
              {/* Le cadre s'étire à la hauteur de la colonne de texte. Kandinsky
                  ici, et non Matisse : les deux œuvres de la page auteur sont
                  des Matisse, autant varier d'une page à l'autre. Domaine
                  public depuis 2015 — Kandinsky est mort en 1944. */}
              <figure className="flex h-full flex-col">
                <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/kandinsky-paysage-deux-peupliers-1912.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-ardoise">
                  Vassily Kandinsky, <cite>Paysage aux deux peupliers</cite> (1912).
                </figcaption>
              </figure>
            </aside>
          </Apparition>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {CONDITIONS.map((c, i) => (
            <li key={c.titre} className="h-full">
              <Apparition delai={i * 120} className="h-full">
                <div className="h-full rounded-[20px] bg-white p-6 sm:p-7">
                  <span className="text-valide" aria-hidden="true">
                    <IconeValidation className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 font-bold text-encre">{c.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ardoise">{c.texte}</p>
                </div>
              </Apparition>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. CE QU'EST UNE PSYCHOTHÉRAPIE. Intention n° 2 : à quoi je m'engage
          si je pousse la porte. Volontairement désidéalisé (§ 9.2).
          Colonne de lecture centrée : ce passage est de la prose pure. */}
      <section
        aria-labelledby="ce-que-cest"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="ce-que-cest"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce qu&rsquo;est une psychothérapie
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>

          {/* Trois colonnes séparées par un filet, plutôt qu'une colonne de
              lecture centrée qui laissait 500 px de blanc de chaque côté.
              Les trois paragraphes sont trois énoncés indépendants — ce que
              c'est, à qui cela s'adresse, combien de temps cela dure — ils se
              lisent aussi bien de front. Pas de fond de carte ici : les trois
              conditions du titre, plus haut sur la page, en portent déjà, et
              les répéter alourdirait. */}
          <div className="mt-10 grid gap-10 text-ardoise lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-sable">
            <p className="leading-relaxed lg:pr-10">
              Une psychothérapie est un travail par la parole, mené à deux, dans un cadre
              régulier. Vous venez avec ce qui vous encombre&nbsp;; mon rôle n&rsquo;est pas
              de vous dire quoi faire, ni de vous fournir des exercices, mais de permettre
              que quelque chose se dise et se déplace.
            </p>
            <p className="leading-relaxed lg:px-10">
              Ce n&rsquo;est pas réservé aux situations graves. On consulte aussi bien pour
              une souffrance qui dure sans qu&rsquo;on sache la nommer que pour un épisode
              précis. Et ce n&rsquo;est pas un aveu de faiblesse&nbsp;: demander de
              l&rsquo;aide suppose plutôt d&rsquo;avoir reconnu quelque chose.
            </p>
            <p className="leading-relaxed lg:pl-10">
              La durée n&rsquo;est pas fixée d&rsquo;avance. Certaines situations se
              dénouent en quelques mois, d&rsquo;autres demandent un travail plus long. Vous
              restez libre d&rsquo;interrompre à tout moment&nbsp;: rien de ce qui se décide
              ici ne vous engage au-delà de ce que vous voulez.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 3. QUAND CONSULTER. Formulé en situations concrètes plutôt qu'en
          liste de symptômes : l'accueil porte déjà les étiquettes de motifs,
          et les répéter ici mettrait les deux pages en concurrence. */}
      <section
        aria-labelledby="quand-consulter"
        className="bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="prose-clinique mx-auto text-center">
            <h2
              id="quand-consulter"
              className="!mt-0 text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce qui conduit à consulter
            </h2>
            <p>
              Il n&rsquo;y a pas de seuil à franchir, ni de degré de souffrance à atteindre
              pour avoir le droit de consulter. Les personnes que je reçois arrivent le plus
              souvent dans l&rsquo;une de ces situations.
            </p>
          </div>
        </Apparition>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Quelque chose dure depuis trop longtemps — anxiété, tristesse, fatigue — et ne cède pas de soi-même.",
            "La même chose se répète : les mêmes impasses, les mêmes ruptures, le même sentiment d'échec.",
            "Un événement a fait bascule : un deuil, une séparation, une perte, un diagnostic.",
            "Le quotidien tient encore, mais au prix d'un effort qui devient coûteux.",
            "L'entourage s'inquiète, ou vous vous surprenez à éviter ce que vous aimiez.",
            "Vous voulez comprendre ce qui vous détermine, sans qu'il y ait d'urgence particulière.",
          ].map((cas, i) => (
            <li key={cas} className="h-full">
              <Apparition delai={(i % 3) * 120} className="h-full">
                <p className="h-full rounded-[20px] bg-white px-6 py-6 text-ardoise">{cas}</p>
              </Apparition>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-lecture text-center text-sm text-ardoise">
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

      {/* 4-5. LA MÉTHODE ET LE CADRE PRATIQUE, CÔTE À CÔTE.

          Les deux blocs se répondent : le premier dit comment on travaille, le
          second ce que cela suppose concrètement. Empilés, ils faisaient deux
          écrans successifs à moitié vides — la prose bornée à 68 caractères
          d'un côté, une carte pleine largeur de l'autre. En vis-à-vis, chacun
          occupe sa colonne et la page se raccourcit d'autant.

          Le lien vers /psychanalyste-nantes/ est dans ce bloc et pas ailleurs :
          c'est le point exact où le lecteur se demande « oui, mais avec quelle
          méthode ? ». */}
      <section
        aria-labelledby="ma-methode"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-7">
            <h2
              id="ma-methode"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Comment je travaille
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <div className="prose-clinique mt-6 max-w-none">
              <p className="!mt-0">
                Mon référentiel est la psychanalyse. Cela ne veut pas dire un divan et un
                silence de plusieurs années&nbsp;: cela veut dire que j&rsquo;accorde une
                place centrale à votre parole et à ce qu&rsquo;elle dit de votre histoire,
                plutôt qu&rsquo;au seul effacement du symptôme. Nous sommes assis face à
                face, et nous parlons.
              </p>
              <p>
                Concrètement, la première séance sert à faire connaissance et à formuler ce
                qui vous amène. Nous convenons ensuite d&rsquo;un rythme — le plus souvent
                hebdomadaire — et le travail se construit à partir de ce que vous apportez.{" "}
                <Link href="/psychanalyste-nantes/">
                  En savoir plus sur mon approche psychanalytique
                </Link>
                , ou{" "}
                <Link href="/consultations/">
                  voir comment se déroulent les consultations
                </Link>
                .
              </p>
              <p>
                {/* « Je reçois {publics.libelle} » donnait « Je reçois AUX adultes » :
                    le libellé commence par « aux », il s'insère derrière un verbe
                    qui appelle cette préposition, pas derrière « recevoir ». */}
                Je m&rsquo;adresse {publics.libelle}, et je reçois au cabinet
                uniquement&nbsp;: je ne propose pas de consultation à distance. Le cadre —
                un lieu, un horaire, une régularité — fait partie du travail.
              </p>
            </div>

            {/* Bandeau d'urgence déplacé ici, au pied du bloc qui décrit le
                cadre du travail — et non plus au milieu de l'appareil de notes,
                sous les sources. Une personne en détresse ne descend pas
                jusqu'aux références Légifrance : le numéro doit se trouver là
                où elle lit encore. */}
            <UrgenceBanner />
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <div className="h-full rounded-[20px] bg-peche p-7 sm:p-9">
              <h2
                id="en-pratique"
                className="text-xl font-bold text-bois sm:text-2xl"
              >
                En pratique
              </h2>

              <dl className="mt-7 space-y-6">
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
                    detail:
                      "Tout ce qui se dit en séance est couvert par le secret professionnel.",
                  },
                ].map((item) => (
                  <div key={item.terme} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-valide"
                    >
                      <IconeValidation className="h-5 w-5" />
                    </span>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
                        {item.terme}
                      </dt>
                      <dd className="mt-1 text-encre">{item.detail}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-8 space-y-3 border-t border-white/70 pt-8">
                <Link
                  href="/rendez-vous-psychologue-nantes/"
                  className="block rounded-full bg-terracotta px-8 py-4 text-center text-sm font-semibold uppercase tracking-wider text-encre"
                >
                  Prendre rendez-vous
                </Link>
                <a
                  href={`tel:${contact.telephoneE164}`}
                  className="block rounded-full border border-bois px-8 py-4 text-center text-sm font-semibold uppercase tracking-wider text-bois"
                >
                  {contact.telephone}
                </a>
                <p className="pt-2 text-center text-sm">
                  <Link
                    href="/tarifs-et-remboursement/"
                    className="text-terracotta-fonce underline underline-offset-2"
                  >
                    Tarifs et remboursement
                  </Link>
                </p>
              </div>
            </div>
          </Apparition>
        </div>
      </section>

      {/* Sources et signature : colonne de lecture centrée. C'est un appareil
          de notes, il n'a pas à s'étaler sur toute la largeur. */}
      <section className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <Sources sources={SOURCES} />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
