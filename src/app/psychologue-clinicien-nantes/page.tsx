import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { Apparition } from "@/components/ui/Apparition";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, praticien, publics } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /psychologue-clinicien-nantes/ — URL CONSERVÉE (§ 10.2).
 * Intitulée « Pourquoi consulter ? Qu'est-ce que je propose ? » sur WordPress.
 *
 * ⚠️ RÉALIGNÉE LE 2026-09-08. Le slug est `psychologue-clinicien-nantes`, mais
 * le titre et le H1 disaient « Pourquoi consulter un psychologue ? ». Or
 * « psychologue clinicien nantes » (170 rech./mois) est en position 4 — porté
 * par l'ACCUEIL, faute d'une page dont le titre corresponde à son slug. Le
 * titre et le H1 nomment donc désormais le titre professionnel, la question
 * « pourquoi consulter ? » restant en seconde partie de H1 : c'est elle qui
 * fait l'intérêt de la page, et le texte de Vincent n'a pas bougé d'un mot.
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

/* Le `title` court, sans le suffixe : le gabarit du layout ajoute déjà
   « — Vincent Rousseau, psychologue à Nantes ». Avec « Pourquoi consulter un
   psychologue ? », l'ensemble atteignait 76 caractères et Google le tronquait.
   Surtout, le slug disait « psychologue clinicien nantes » et le titre autre
   chose : les deux s'accordent enfin. */
const TITRE = "Psychologue clinicien à Nantes";
const MODIFIE_LE = "2026-09-08";

export const metadata: Metadata = {
  /* `absolute` : le titre contient déjà la ville, le suffixe la répéterait.
     Voir la règle dans layout.tsx. */
  title: { absolute: `${TITRE} — ${praticien.nom}` },
  description:
    `À quel moment consulter un psychologue clinicien à ${cabinet.ville} ? Ce qu'est un ` +
    `symptôme, pourquoi il finit par ne plus « tenir », et ce que je propose.`,
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
      { nom: "Psychologue clinicien", url: "psychologue-clinicien-nantes" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE EN CARTE, comme le reste du site. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">{TITRE}</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              Titre protégé par la loi · Master 2 et 500 h de stage supervisé
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {`Psychologue clinicien à ${cabinet.ville} : pourquoi consulter ?`}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              On ne consulte pas parce qu&rsquo;on va «&nbsp;assez mal&nbsp;» pour cela. On
              consulte quand quelque chose ne tient plus. Voici ce que cela veut dire, et ce
              que je propose.
            </p>
          </div>
        </Apparition>
      </section>

      {/* La citation de Dolto ouvre déjà la page WordPress. Elle dit en trois
          phrases ce que la page met vingt lignes à expliquer, et elle désamorce
          l'idée qu'il faudrait arriver en sachant ce qu'on a. Elle est donc
          traitée comme une ouverture pleine largeur, centrée, et non comme un
          encart perdu dans la marge gauche. */}
      <section
        aria-labelledby="dolto"
        className="mt-6 bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="dolto" className="sr-only">
          En guise d&rsquo;introduction
        </h2>
        <Apparition>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote>
              <p className="font-accent text-2xl italic leading-snug text-bois sm:text-[32px]">
                «&nbsp;Vous ne comprenez rien à ce qui vous arrive. Personne n&rsquo;y
                comprend rien. Moi non plus. C&rsquo;est le travail que nous allons faire
                ensemble qui va nous éclairer.&nbsp;»
              </p>
            </blockquote>
            <figcaption className="mt-6 text-sm text-ardoise">
              Françoise Dolto, <cite>Une éthique de la relation analytique</cite>, 1984.
            </figcaption>
          </figure>
        </Apparition>
      </section>

      {/* CE QUI AMÈNE À CONSULTER, avec l'œuvre en vis-à-vis. Le titre est DANS
          la colonne de gauche : c'est ce qui aligne le haut du cadre sur celui
          du titre. */}
      <section
        aria-labelledby="le-symptome"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-7">
            <h2
              id="le-symptome"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce qui amène à consulter
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <div className="prose-clinique mt-6 max-w-none">
              <p className="!mt-0">
                Ce qui pousse généralement à consulter un psychologue clinicien, c&rsquo;est
                d&rsquo;éprouver un ou plusieurs symptômes qui perturbent la vie quotidienne,
                et auxquels on reconnaît une cause psychique. Un symptôme, c&rsquo;est
                d&rsquo;abord quelque chose qui fait souffrir — et la gamme est large&nbsp;:
                mal-être diffus, anxiété, dépression, idées noires, obsessions, phobies,
                difficultés de comportement.
              </p>
              <p>
                Certaines difficultés se déploient plus particulièrement sur un axe
                relationnel&nbsp;: difficulté d&rsquo;insertion sociale ou professionnelle,
                malaise en société, repli sur soi, sentiment de persécution, agoraphobie. Et
                le problème peut être chronique comme passager&nbsp;: la vie est faite de
                crises, de choix, d&rsquo;obstacles et de deuils qui nous confrontent à
                nous-mêmes, et que nous avons parfois du mal à surmonter seuls.
              </p>
            </div>
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <aside className="h-full">
              {/* Sixième et dernière œuvre disponible, pour qu'aucune page ne
                  répète celle d'une autre. Matisse, domaine public depuis 2025. */}
              <figure className="flex h-full flex-col">
                <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/matisse-desserte-1915.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-ardoise">
                  Henri Matisse, <cite>Nature morte d&rsquo;après « La Desserte » de Jan
                  Davidsz. de Heem</cite> (1915).
                </figcaption>
              </figure>
            </aside>
          </Apparition>
        </div>
      </section>

      {/* LE CŒUR DE LA PAGE : le renversement. Tout le monde a des symptômes ;
          la question n'est pas d'en avoir mais du moment où ils cessent de
          tenir. C'est ce qui lève le frein « je ne vais pas assez mal ».

          La phrase-pivot est sortie du paragraphe et posée en grand, centrée :
          c'est elle qu'on doit retenir en quittant la page, et elle se perdait
          au milieu d'un bloc de prose. Le reste passe en deux colonnes, ce qui
          évite une troisième colonne de lecture centrée d'affilée. */}
      <section
        aria-labelledby="quand-ca-ne-tient-plus"
        className="bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              id="quand-ca-ne-tient-plus"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Quand cela ne «&nbsp;tient&nbsp;» plus
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            {/* « Il faut le dire clairement : » précède la phrase dans le
                texte de Vincent. La mise en exergue l'avait fait disparaître ;
                elle est restaurée en amorce, car c'est elle qui donne à la
                phrase son ton d'insistance. */}
            <p className="mt-8 text-sm uppercase tracking-[0.18em] text-terracotta-fonce">
              Il faut le dire clairement
            </p>
            <p className="mt-4 font-accent text-2xl italic leading-snug text-bois sm:text-[30px]">
              Tout le monde a des symptômes, et c&rsquo;est normal.
            </p>
          </div>
        </Apparition>

        <Apparition delai={120}>
          <div className="mx-auto mt-12 grid max-w-5xl gap-10 text-ardoise md:grid-cols-2 md:gap-0 md:divide-x md:divide-sable">
            <p className="leading-relaxed md:pr-10">
              J&rsquo;irais jusqu&rsquo;à dire qu&rsquo;ils peuvent avoir une fonction
              positive et enrichir une vie.{" "}
              <em>«&nbsp;Boiter n&rsquo;est pas pécher&nbsp;»</em>, écrivait le poète
              Friedrich Rückert.
            </p>
            <p className="leading-relaxed md:pl-10">
              Mais il arrive que cela ne tienne plus — que le symptôme devienne trop
              envahissant, trop douloureux. C&rsquo;est à ce moment-là qu&rsquo;il devient
              pertinent de consulter. Non pas quand on a atteint un seuil de souffrance
              mesurable, mais quand l&rsquo;arrangement qu&rsquo;on avait trouvé ne
              fonctionne plus.
            </p>
          </div>
        </Apparition>
      </section>

      {/* TITRE À GAUCHE, PROSE À DROITE. Disposition différente des sections
          précédentes, pour que trois blocs de fond ne se ressemblent pas. Le
          titre reste lisible en haut de colonne pendant qu'on lit le texte. */}
      <section
        aria-labelledby="le-sens"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-4">
            <h2
              id="le-sens"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Le symptôme a un sens
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </Apparition>

          <Apparition delai={120} className="lg:col-span-8">
            <div className="prose-clinique max-w-none">
              <p className="!mt-0">
                Le travail avec un professionnel est alors l&rsquo;occasion d&rsquo;explorer
                un autre aspect du symptôme&nbsp;: son sens. Plutôt qu&rsquo;un parasite
                indésirable — même s&rsquo;il est ressenti comme tel — il dit étrangement
                quelque chose de nous, de notre subjectivité. Il est en quelque sorte une
                parole qui attend d&rsquo;être délivrée.
              </p>
              <p>
                Ce que je propose est un dispositif de parole et d&rsquo;écoute, dans un
                cadre professionnel entièrement confidentiel et non jugeant. En
                s&rsquo;appuyant sur vos propres ressources, soutenues par la présence et les
                interventions du thérapeute, le processus vise à amener au jour ce qui vous
                pose question et vous divise à travers vos symptômes. D&rsquo;une certaine
                manière, on pourrait dire que le traitement consiste à vous
                «&nbsp;guérir&nbsp;» en devenant un peu plus vous-même.
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
          </Apparition>
        </div>
      </section>

      {/* CONVERSION, en carte pêche comme sur les autres pages. */}
      <section aria-labelledby="commencer" className="px-5 pb-10 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="commencer" className="text-2xl font-bold text-bois sm:text-[33px]">
              Si vous vous reconnaissez là-dedans
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              La première rencontre est gratuite&nbsp;: elle sert à éclaircir ensemble la
              situation, et à déterminer la manière dont nous procéderons. Vous n&rsquo;avez
              rien à préparer. Je reçois {publics.libelle}, sur rendez-vous.
            </p>

            <div className="mt-9 border-t border-white/70 pt-9">
              <div className="flex flex-wrap items-center justify-center gap-4">
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
              <p className="mt-5 text-sm">
                <Link
                  href="/consultations/"
                  className="text-terracotta-fonce underline underline-offset-2"
                >
                  Comment se déroule une séance
                </Link>
              </p>
            </div>
          </div>
        </Apparition>
      </section>

      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <UrgenceBanner />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
