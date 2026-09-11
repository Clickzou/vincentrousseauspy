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
 * TEXTE RÉÉCRIT UNE SECONDE FOIS LE 2026-09-11 (document « Pourquoi
 * consulter »), pour qu'il ne double plus celui de la page auteur. Vincent y
 * proposait quatre variantes ; c'est la PREMIÈRE qui est en place, la seule qui
 * ne heurte aucune règle du site :
 *   - la 2e promet « la pleine liberté de votre trajectoire » (§ 2.1) ;
 *   - la 3e écrit « confidentialité absolue », ce qui est faux — l'article sur
 *     le secret professionnel détaille ses exceptions légales ;
 *   - la 4e dit la consultation « urgente » (le cabinet ne reçoit pas les
 *     urgences) et parle de « protocole clinique », quand /psychanalyste-nantes/
 *     affirme qu'il n'y a pas de protocole applicable à tous.
 * Les intertitres sont les siens, sans leur numérotation.
 *
 * La citation de Rückert (« Boiter n'est pas pécher », avec l'accent aigu : la
 * graphie du site WordPress, « pêcher », en inversait le sens) ne figure dans
 * aucune variante. Elle est donc retirée ; celle de Dolto reste, à sa demande.
 *
 * CLOISONNEMENT avec /psychotherapeute-nantes/, qui comporte aussi un bloc
 * « ce qui conduit à consulter ». Les deux ne disent pas la même chose et ne
 * doivent pas converger :
 *   - là-bas, des SITUATIONS concrètes, pour que le lecteur se reconnaisse ;
 *   - ici, ce qu'est un symptôme et à quel moment il cesse de « tenir ».
 * C'est une page de réflexion, pas une liste de motifs. Si l'une des deux
 * commence à ressembler à l'autre, c'est celle-ci qu'il faut resserrer.
 *
 * Ses formulations prudentes — « vise à », « atténuer » — sont conservées
 * telles quelles : ce sont elles qui distinguent une description d'une
 * promesse de résultat (§ 2.1).
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
          encart perdu dans la marge gauche.

          Absente du texte réécrit par Vincent le 2026-09-11, mais maintenue à
          sa demande le jour même : ce n'était pas une suppression. */}
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
              Les motifs de la démarche clinique
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <div className="prose-clinique mt-6 max-w-none">
              <p className="!mt-0">
                L&rsquo;engagement dans une démarche thérapeutique naît généralement lorsque
                le vécu intérieur commence à entraver le quotidien. Cette détresse psychique,
                dont on perçoit les racines inconscientes, s&rsquo;objective le plus souvent
                sous la forme d&rsquo;un symptôme. Ses manifestations sont diverses et
                singulières&nbsp;: anxiété persistante, inhibitions, affects dépressifs,
                ruminations ou conduites addictives.
              </p>
              <p>
                Cette souffrance s&rsquo;actualise également dans le lien interpersonnel, se
                traduisant par des mouvements de retrait, une insécurité sociale ou des
                impasses professionnelles. Qu&rsquo;elles s&rsquo;inscrivent dans une
                temporalité longue ou qu&rsquo;elles soient réactionnelles, ces difficultés
                émergent fréquemment lors des points de rupture de l&rsquo;existence&nbsp;:
                séparations, deuils, transitions ou choix cruciaux. Ces moments de crise
                confrontent le sujet à ses propres limites et nécessitent parfois le recours
                à un tiers.
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
              Le point de rupture de l&rsquo;équilibre subjectif
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            {/* La première phrase du texte de Vincent est posée en exergue, la
                suite passe en deux colonnes : le passage se lit d'un trait,
                sans un mot ajouté ni retranché. */}
            <p className="mt-8 font-accent text-2xl italic leading-snug text-bois sm:text-[30px]">
              L&rsquo;émergence d&rsquo;un symptôme ou d&rsquo;une entrave psychique constitue
              une réponse structurelle et humaine face à la souffrance.
            </p>
          </div>
        </Apparition>

        <Apparition delai={120}>
          <div className="mx-auto mt-12 grid max-w-5xl gap-10 text-ardoise md:grid-cols-2 md:gap-0 md:divide-x md:divide-sable">
            <p className="leading-relaxed md:pr-10">
              Loin d&rsquo;être une simple anomalie, cette construction subjective fait
              initialement office de solution et participe à maintenir un certain équilibre,
              aussi précaire soit-il.
            </p>
            <p className="leading-relaxed md:pl-10">
              Cependant, ce compromis peut vaciller. La décision de solliciter un clinicien
              s&rsquo;impose lorsque le coût du symptôme devient trop lourd, invalidant ou
              douloureux au quotidien. On ne consulte pas en fonction d&rsquo;un seuil de
              douleur quantifiable, mais dès lors que les aménagements inconscients et les
              défenses que l&rsquo;on avait mis en place pour tenir ne suffisent plus à
              contenir le malaise.
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
              La fonction et la portée du symptôme
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </Apparition>

          <Apparition delai={120} className="lg:col-span-8">
            <div className="prose-clinique max-w-none">
              <p className="!mt-0">
                L&rsquo;espace de la cure invite à appréhender le symptôme sous un jour
                nouveau, non comme une anomalie à éradiquer, mais comme une formation
                porteuse de sens. S&rsquo;il est d&rsquo;abord vécu comme une contrainte, il
                représente surtout une modalité d&rsquo;expression singulière de la
                subjectivité, une parole cryptée qui cherche à se faire entendre.
              </p>
              <p>
                Pour soutenir ce cheminement, je vous propose un cadre thérapeutique fondé
                sur une écoute rigoureuse, la confidentialité et la neutralité bienveillante.
                En prenant appui sur votre propre dynamique psychique, étayée par ma présence
                et mes interventions cliniques, ce travail vise à éclairer les conflits
                internes qui vous traversent. L&rsquo;enjeu de la thérapeutique est ainsi
                d&rsquo;atténuer la souffrance en vous permettant de réinvestir votre propre
                désir.
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
