import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, praticien, publics } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /psychologue-clinicien-nantes/ — URL CONSERVÉE (§ 10.2).
 * Intitulée « Pourquoi consulter ? Qu'est-ce que je propose ? » sur WordPress.
 *
 * CLOISONNEMENT avec /psychotherapeute-nantes/, qui comporte aussi un bloc
 * « ce qui conduit à consulter ». Les deux ne disent pas la même chose et ne
 * doivent pas converger :
 *   - là-bas, des SITUATIONS concrètes, pour que le lecteur se reconnaisse ;
 *   - ici, ce qu'est un symptôme et à quel moment il cesse de « tenir ».
 * C'est une page de réflexion, pas une liste de motifs. Si l'une des deux
 * commence à ressembler à l'autre, c'est celle-ci qu'il faut resserrer.
 *
 * ⚠️ CORRECTION D'UNE COQUILLE DU SITE ACTUEL : il cite Rückert par
 * « Boiter n'est pas pêcher ». C'est « pécher » — le vers dit qu'avancer en
 * boitant n'est pas une faute. Écrite avec l'accent circonflexe, la citation
 * ne veut plus rien dire.
 *
 * L'essentiel du texte est celui de Vincent, avec ses citations. Ses
 * formulations prudentes — « d'une certaine manière », les guillemets autour
 * de « guérir » — sont conservées telles quelles : ce sont elles qui
 * distinguent une description d'une promesse de résultat (§ 2.2).
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1).
 */

const TITRE = "Pourquoi consulter un psychologue ?";
const MODIFIE_LE = "2026-09-08";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `À quel moment consulter un psychologue clinicien à ${cabinet.ville} ? Ce qu'est un ` +
    `symptôme, pourquoi il finit par ne plus « tenir », et ce que propose un travail par ` +
    `la parole. Par ${praticien.nom}, ${praticien.titreCourt.toLowerCase()}.`,
  alternates: { canonical: canonical("psychologue-clinicien-nantes") },
  openGraph: {
    title: `${TITRE} — ${praticien.nom}`,
    url: canonical("psychologue-clinicien-nantes"),
  },
};

export default function PourquoiConsulter() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: "Pourquoi consulter", url: "psychologue-clinicien-nantes" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre="Pourquoi consulter un psychologue ?"
        chapeau={
          `On ne consulte pas parce qu'on va « assez mal » pour cela. On consulte quand ` +
          `quelque chose ne tient plus. Voici ce que cela veut dire, et ce que je propose.`
        }
      />

      {/* Ouverture sur la citation de Dolto, qui ouvre déjà la page
          WordPress. Elle dit en trois phrases ce que la page met vingt lignes
          à expliquer, et elle désamorce l'idée qu'il faudrait arriver en
          sachant ce qu'on a. */}
      <section aria-labelledby="dolto" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <h2 id="dolto" className="sr-only">
          En guise d&rsquo;introduction
        </h2>
        <figure className="max-w-3xl">
          <blockquote className="border-l-2 border-terracotta pl-6">
            <p className="font-accent text-2xl italic leading-snug text-bois sm:text-[30px]">
              « Vous ne comprenez rien à ce qui vous arrive. Personne n&rsquo;y comprend
              rien. Moi non plus. C&rsquo;est le travail que nous allons faire ensemble qui
              va nous éclairer. »
            </p>
          </blockquote>
          <figcaption className="mt-4 pl-6 text-sm text-ardoise">
            Françoise Dolto, <cite>Une éthique de la relation analytique</cite>, 1984.
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="le-symptome"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="le-symptome" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce qui amène à consulter
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Ce qui pousse généralement à consulter un psychologue clinicien, c&rsquo;est
            d&rsquo;éprouver un ou plusieurs symptômes qui perturbent la vie quotidienne, et
            auxquels on reconnaît une cause psychique. Un symptôme, c&rsquo;est
            d&rsquo;abord quelque chose qui fait souffrir — et la gamme est large&nbsp;:
            mal-être diffus, anxiété, dépression, idées noires, obsessions, phobies,
            difficultés de comportement.
          </p>
          <p>
            Certaines difficultés se déploient plus particulièrement sur un axe
            relationnel&nbsp;: difficulté d&rsquo;insertion sociale ou professionnelle,
            malaise en société, repli sur soi, sentiment de persécution, agoraphobie. Et le
            problème peut être chronique comme passager&nbsp;: la vie est faite de crises,
            de choix, d&rsquo;obstacles et de deuils qui nous confrontent à nous-mêmes, et
            que nous avons parfois du mal à surmonter seuls.
          </p>
        </div>
      </section>

      {/* Le cœur de la page : le renversement. Tout le monde a des symptômes,
          la question n'est pas d'en avoir mais du moment où ils cessent de
          tenir. C'est ce qui lève le frein « je ne vais pas assez mal ». */}
      <section
        aria-labelledby="quand-ca-ne-tient-plus"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2
          id="quand-ca-ne-tient-plus"
          className="text-2xl font-bold text-bois sm:text-[33px]"
        >
          Quand cela ne « tient » plus
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Il faut le dire clairement&nbsp;: <strong>tout le monde a des symptômes, et
            c&rsquo;est normal.</strong> J&rsquo;irais jusqu&rsquo;à dire qu&rsquo;ils
            peuvent avoir une fonction positive et enrichir une vie. « Boiter n&rsquo;est
            pas pécher », écrivait le poète Friedrich Rückert.
          </p>
          <p>
            Mais il arrive que cela ne tienne plus — que le symptôme devienne trop
            envahissant, trop douloureux. C&rsquo;est à ce moment-là qu&rsquo;il devient
            pertinent de consulter. Non pas quand on a atteint un seuil de souffrance
            mesurable, mais quand l&rsquo;arrangement qu&rsquo;on avait trouvé ne fonctionne
            plus.
          </p>
        </div>
      </section>

      <section aria-labelledby="le-sens" className="px-5 py-14 sm:px-10 lg:px-[100px]">
        <h2 id="le-sens" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le symptôme a un sens
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Le travail avec un professionnel est alors l&rsquo;occasion d&rsquo;explorer un
            autre aspect du symptôme&nbsp;: son sens. Plutôt qu&rsquo;un parasite
            indésirable — même s&rsquo;il est ressenti comme tel — il dit étrangement
            quelque chose de nous, de notre subjectivité. Il est en quelque sorte une parole
            qui attend d&rsquo;être délivrée.
          </p>
          <p>
            Ce que je propose est un dispositif de parole et d&rsquo;écoute, dans un cadre
            professionnel entièrement confidentiel et non jugeant. En s&rsquo;appuyant sur
            vos propres ressources, soutenues par la présence et les interventions du
            thérapeute, le processus vise à amener au jour ce qui vous pose question et vous
            divise à travers vos symptômes. D&rsquo;une certaine manière, on pourrait dire
            que le traitement consiste à vous « guérir » en devenant un peu plus vous-même.
          </p>
          <p>
            <Link href="/psychanalyste-nantes/">
              Comment ce déchiffrement se travaille concrètement
            </Link>
            , et{" "}
            <Link href="/psychotherapeute-nantes/">
              les situations qui conduisent le plus souvent à consulter
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        aria-labelledby="commencer"
        className="bg-menthe px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="max-w-lecture">
          <h2 id="commencer" className="text-2xl font-bold text-bois sm:text-[33px]">
            Si vous vous reconnaissez là-dedans
          </h2>
          <p className="mt-4 text-ardoise">
            La première rencontre sert à éclaircir ensemble la situation, et à déterminer la
            manière dont nous procéderons. Vous n&rsquo;avez rien à préparer. Je reçois{" "}
            {publics.libelle}, sur rendez-vous.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
              href="/consultations/"
              className="text-sm text-terracotta-fonce underline underline-offset-2"
            >
              Comment se déroule une séance
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <div className="max-w-lecture">
          <UrgenceBanner />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
