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
 * fait l'intérêt de la page.
 *
 * TEXTE ENTIÈREMENT RÉVISÉ PAR VINCENT LE 2026-09-11 (document « word3 »). Il
 * diffère désormais de la version conservée sur la page auteur, ce qui atténue
 * le doublon du POINT-ETAPE § 8 sans le lever.
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
 * Le texte est celui de Vincent, avec ses citations. Ses formulations
 * prudentes — « d'une certaine manière », « vise à », « cherche à vous
 * soulager » — sont conservées telles quelles : ce sont elles qui distinguent
 * une description d'une promesse de résultat (§ 2.2).
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1).
 */

/* Le `title` court, sans le suffixe : le gabarit du layout ajoute déjà
   « — Vincent Rousseau, psychologue à Nantes ». Avec « Pourquoi consulter un
   psychologue ? », l'ensemble atteignait 76 caractères et Google le tronquait.
   Surtout, le slug disait « psychologue clinicien nantes » et le titre autre
   chose : les deux s'accordent enfin. */
const TITRE = "Psychologue clinicien à Nantes";
const MODIFIE_LE = "2026-09-11";

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
              Titre protégé par la loi
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {`Psychologue clinicien à ${cabinet.ville} : pourquoi consulter ?`}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Il n&rsquo;y a pas de «&nbsp;seuil de souffrance&nbsp;» à atteindre pour
              légitimer une consultation. On consulte quand quelque chose ne tient plus.
              Voici le sens de cette démarche et ce que je vous propose.
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
                On décide généralement de consulter un psychologue clinicien lorsque des
                difficultés intérieures commencent à impacter la vie de tous les jours. Ces
                manifestations, dont on ressent l&rsquo;origine psychologique, prennent
                souvent la forme d&rsquo;un symptôme. C&rsquo;est d&rsquo;abord une souffrance
                qui s&rsquo;exprime, et ses visages sont multiples&nbsp;: un mal-être diffus,
                de l&rsquo;anxiété, un état dépressif, des pensées sombres, des phobies, des
                obsessions ou des troubles du comportement.
              </p>
              <p>
                Parfois, cette souffrance se déploie plus spécifiquement dans notre rapport
                aux autres. Elle se traduit alors par un repli sur soi, un sentiment
                d&rsquo;insécurité en société, une agoraphobie, ou des blocages dans sa vie
                sociale et professionnelle. Que ce nœud soit ancien ou passager, il surgit
                souvent à l&rsquo;occasion des crises, des choix, des obstacles ou des deuils
                qui traversent chaque existence. Ce sont des moments de bascule qui nous
                confrontent à nous-mêmes, et que l&rsquo;on ne peut pas toujours surmonter
                seul.
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

            {/* La première phrase du texte de Vincent est découpée en deux :
                son amorce (« Il faut partir d'un constat simple : ») en
                surtitre, sa suite en exergue. Le passage se lit ainsi d'un
                trait, sans un mot ajouté ni retranché. */}
            <p className="mt-8 text-sm uppercase tracking-[0.18em] text-terracotta-fonce">
              Il faut partir d&rsquo;un constat simple
            </p>
            <p className="mt-4 font-accent text-2xl italic leading-snug text-bois sm:text-[30px]">
              Ressentir des difficultés ou développer un symptôme est profondément humain,
              et c&rsquo;est tout à fait normal.
            </p>
          </div>
        </Apparition>

        <Apparition delai={120}>
          <div className="mx-auto mt-12 grid max-w-5xl gap-10 text-ardoise md:grid-cols-2 md:gap-0 md:divide-x md:divide-sable">
            <p className="leading-relaxed md:pr-10">
              Ces manifestations peuvent même jouer un rôle protecteur et, d&rsquo;une
              certaine manière, participer à l&rsquo;équilibre d&rsquo;une vie. Le poète
              Friedrich Rückert le résumait ainsi&nbsp;:{" "}
              <em>«&nbsp;Boiter n&rsquo;est pas pécher&nbsp;»</em>.
            </p>
            <p className="leading-relaxed md:pl-10">
              Pourtant, il arrive un moment où ce compromis fragile vacille. Lorsque le
              symptôme devient trop lourd, trop douloureux ou trop envahissant au quotidien,
              la démarche de consulter prend tout son sens. On ne prend pas rendez-vous
              parce qu&rsquo;on a franchi une limite de souffrance mesurable, mais
              simplement parce que l&rsquo;arrangement que l&rsquo;on avait réussi à trouver
              avec soi-même ne fonctionne plus.
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
              Le sens du symptôme
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </Apparition>

          <Apparition delai={120} className="lg:col-span-8">
            <div className="prose-clinique max-w-none">
              <p className="!mt-0">
                Le travail thérapeutique offre l&rsquo;occasion d&rsquo;explorer une autre
                dimension du symptôme&nbsp;: son sens. Plutôt qu&rsquo;un simple parasite
                indésirable, même s&rsquo;il est souvent vécu comme tel, il exprime de façon
                singulière quelque chose de notre subjectivité. Il est, en quelque sorte, une
                parole qui attend d&rsquo;être délivrée.
              </p>
              <p>
                Pour vous accompagner, je vous propose un dispositif de parole et
                d&rsquo;écoute au sein d&rsquo;un cadre strictement confidentiel et
                bienveillant. En vous appuyant sur vos propres ressources, soutenues par ma
                présence active et mes interventions, ce processus vise à mettre en lumière
                ce qui vous traverse et vous divise à travers vos symptômes. D&rsquo;une
                certaine manière, le traitement cherche ainsi à vous soulager en vous
                permettant de devenir un peu plus vous-même.
              </p>
              {/* Le second lien menait en haut de /psychotherapeute-nantes/, sur
                  le titre de psychothérapeute, et non sur les situations
                  annoncées (signalé par Vincent le 2026-09-11). L'ancre vise
                  désormais la section « quand consulter » elle-même. */}
              <p>
                <Link href="/psychanalyste-nantes/">
                  Comment ce déchiffrement se travaille concrètement
                </Link>
                , et{" "}
                <Link href="/psychotherapeute-nantes/#quand-consulter">
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
              Si vous vous reconnaissez dans ces situations
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              Notre première rencontre — entièrement gratuite — sert à éclaircir ensemble
              votre situation et à définir la manière dont nous travaillerons. Vous
              n&rsquo;avez absolument rien à préparer pour ce rendez-vous. Mon cabinet
              s&rsquo;adresse exclusivement aux adultes et aux jeunes adultes (à partir de{" "}
              {publics.ageMinimum} ans), sur rendez-vous.
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
