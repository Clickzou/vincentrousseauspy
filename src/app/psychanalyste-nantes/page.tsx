import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { Apparition } from "@/components/ui/Apparition";
import { IconeDocument } from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, honoraires, praticien, publics } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /psychanalyste-nantes/ — URL CONSERVÉE.
 *
 * ⚠️ CONTRAIREMENT À CE QUI A LONGTEMPS ÉTÉ ÉCRIT ICI, cette URL n'est PAS
 * positionnée : le relevé du 2026-09-07 la donne 24e sur « rousseau vincent »,
 * et sur rien d'autre. C'est l'ACCUEIL qui est 2e sur « psychanalyste nantes »
 * (50 rech./mois), comme il l'est sur 33 des 38 mots-clés suivis.
 *
 * ⚠️ CE QUE CETTE URL CONTENAIT : rien sur la psychanalyse. La page WordPress
 * s'intitule « Qui, quand et où ? » et ne donne que des informations pratiques
 * — horaires, adresse, accès. Le texte de fond, lui, était enterré sur la page
 * d'accueil (cf. docs/contenu-actuel/home-main.md, « La psychanalyse en
 * détails »). Un slug sans son sujet d'un côté, le sujet sans son slug de
 * l'autre : c'est cela que la refonte corrige.
 *
 * La refonte fait donc coïncider l'URL et son sujet : le texte de fond remonte
 * ici, et les informations pratiques partent vers /consultations/ et
 * /cabinet-nantes/, dont c'est le rôle. C'est le meilleur rapport effort/gain
 * de la refonte — une page déjà 2e qui gagne enfin un contenu conforme à son
 * intention de recherche.
 *
 * ⚠️ DEUX CORRECTIONS DE FOND par rapport au texte d'origine, à ne pas
 * réintroduire :
 *  - le texte actuel parle de la psychanalyse « qu'il soit enfant, adolescent
 *    ou adulte » et cite « les difficultés au sein des couples ou problèmes
 *    avec les enfants » : Vincent ne reçoit QUE des adultes (§ 5) ;
 *  - il annonce une « méthode éprouvée visant à apporter des changements
 *    durables ». C'est une promesse de résultat, proscrite (§ 2.2).
 *
 * L'essentiel de la prose reste celle de Vincent, reformulée mais non
 * réécrite : c'est sa parole, et elle est bonne.
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1).
 */

const TITRE = "Psychanalyste à Nantes";
const MODIFIE_LE = "2026-09-11";

export const metadata: Metadata = {
  /* `absolute` : le titre contient déjà la ville, le suffixe la répéterait.
     Voir la règle dans layout.tsx. */
  title: { absolute: `${TITRE} — ${praticien.nom}` },
  description:
    `Psychanalyste à ${cabinet.ville} : ce qu'est la psychanalyse, ce qu'elle écoute, ` +
    `et comment se déroulent les séances au cabinet de ${praticien.nom}.`,
  alternates: { canonical: canonical("psychanalyste-nantes") },
  openGraph: {
    title: `${TITRE} — ${praticien.nom}`,
    url: canonical("psychanalyste-nantes"),
  },
};

/**
 * Les manifestations de l'inconscient, telles que Vincent les énumère sur le
 * site actuel. Conservées parce qu'elles sont concrètes : elles donnent au
 * lecteur une idée de ce dont on parle réellement en séance.
 */
const MANIFESTATIONS = [
  {
    nom: "Les rêves",
    texte: "« La voie royale d'accès à l'inconscient », selon la formule de Freud.",
  },
  {
    nom: "Les lapsus",
    texte: "Ce mot qui arrive à la place d'un autre, et qui dit souvent quelque chose.",
  },
  {
    nom: "Les actes manqués",
    texte: "Manqués pour la conscience, mais réussis pour l'inconscient.",
  },
  {
    nom: "Les symptômes",
    texte: "Ce qui vous encombre et vous amène à consulter, pris comme un texte à lire.",
  },
  {
    nom: "Les répétitions",
    texte:
      "Ces situations sentimentales ou professionnelles qui reparaissent à intervalles " +
      "réguliers, sans qu'on comprenne pourquoi.",
  },
];

/**
 * Documents de fond de Vincent. Les chemins reproduisent EXACTEMENT ceux du
 * site WordPress : s'ils sont indexés ou reçoivent des liens, rien ne casse
 * (§ 10.2). Ils sont aussi sur l'accueil — c'est voulu, ce sont des actifs.
 */
const LECTURES = [
  {
    titre: "L'efficacité de la psychanalyse",
    detail: "Étude de synthèse (PDF)",
    href: "/wp-content/uploads/2023/11/20-04-efficacite_psychanalyse_Visentini.pdf",
  },
  {
    titre: "24 questions sur la psychanalyse",
    detail: "Document pédagogique (PDF)",
    href: "/wp-content/uploads/2023/11/24-questions-sur-la-psychanalyse.pdf",
  },
];

export default function PsychanalysteNantes() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "psychanalyste-nantes" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE EN CARTE, comme /psychotherapeute-nantes/ et la page auteur :
          bandeau de qualification, titre, filet, accroche en police d'accent. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">Psychanalyste à {cabinet.ville}</span>
        </nav>

        <Apparition>
          <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
            {/* « Méthode de travail » et non « titre protégé » : c'est
                précisément ce que la section « Ma formation analytique »
                explique plus bas, et le master interdit de laisser croire à une
                protection qui n'existe pas (§ 2.2). */}
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
              Méthode de travail · Titre non protégé par la loi
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              {`Psychanalyste à ${cabinet.ville}`}
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              La psychanalyse est mon outil de travail quotidien. C&rsquo;est un dispositif
              de psychothérapie par la parole, qui s&rsquo;attache moins à faire taire un
              symptôme qu&rsquo;à comprendre ce qu&rsquo;il dit. Je reçois {publics.libelle}{" "}
              à {cabinet.ville}.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 1. DÉFINITION. Réponse directe, en tête : c'est elle que reprennent
          les moteurs génératifs et le bloc « Les gens demandent aussi ». */}
      <section
        aria-labelledby="definition"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        {/* Le titre est DANS la colonne de gauche, et non au-dessus de la
            grille : c'est ce qui aligne le haut de l'œuvre sur celui du titre.
            Placé en dehors, il ne comptait pas dans la hauteur de la rangée, et
            l'image, calée sur les seuls paragraphes, dépassait vers le bas. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-7">
            <h2
              id="definition"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              La psychanalyse, qu&rsquo;est-ce que c&rsquo;est&nbsp;?
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <div className="prose-clinique mt-6 max-w-none">
              <p className="!mt-0">
                C&rsquo;est à la fois une méthode thérapeutique et une théorie de la
                psychologie, fondée par Sigmund Freud à la fin du XIX<sup>e</sup> siècle.
                Comme dispositif, elle vise une investigation de la psyché&nbsp;: son
                fonctionnement actuel, mais aussi l&rsquo;histoire de vie à travers laquelle
                elle s&rsquo;est construite.
              </p>
              <p>
                Elle s&rsquo;attache à débrouiller ce qui fait la singularité de chacun. Il
                n&rsquo;y a donc pas de protocole applicable à tous&nbsp;: ce qui se
                travaille avec vous ne se travaillerait pas de la même manière avec
                quelqu&rsquo;un d&rsquo;autre. Les séances se tiennent au cabinet, en
                présentiel.
              </p>
            </div>
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <aside className="h-full">
              {/* Quatrième œuvre du site, pour ne pas répéter celles des autres
                  pages. Matisse, domaine public depuis 2025. */}
              <figure className="flex h-full flex-col">
                <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/matisse-nature-morte-geranium-1906.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-ardoise">
                  Henri Matisse, <cite>Nature morte au géranium</cite> (1906).
                </figcaption>
              </figure>
            </aside>
          </Apparition>
        </div>
      </section>

      {/* 2. LE POINT DISTINCTIF. C'est le meilleur passage de Vincent, et
          c'est ce qui différencie réellement cette page de ses concurrentes.
          Formulé sans opposer les approches entre elles : la publicité
          comparative est proscrite (§ 2.2). */}
      <section
        aria-labelledby="la-plainte"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="la-plainte"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Transformer la plainte en question
            </h2>

            <blockquote className="mt-8">
              <p className="font-accent text-2xl italic leading-snug text-bois sm:text-[30px]">
                Le symptôme n&rsquo;est pas seulement une gêne à supprimer&nbsp;: il est
                lourd d&rsquo;un sens qui, pour l&rsquo;heure, reste énigmatique.
              </p>
            </blockquote>
          </div>

          {/* Trois colonnes séparées d'un filet, comme sur la page
              psychothérapeute : trois énoncés successifs qui se lisent aussi
              bien de front, et la pleine largeur cesse d'être du vide. */}
          <div className="mt-12 grid gap-10 text-ardoise lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-sable">
            <p className="leading-relaxed lg:pr-10">
              La psychanalyse invite à transformer la plainte en une question que le symptôme
              vient vous poser. Ce sens est inconscient, et il se déchiffre par un exercice
              de la parole — ce que le vocabulaire analytique nomme les{" "}
              <em>associations libres</em>&nbsp;: dire ce qui vient, sans trier.
            </p>
            <p className="leading-relaxed lg:px-10">
              C&rsquo;est au terme de ce travail — plus large que la plainte initiale, mais
              l&rsquo;impliquant — que le symptôme cesse d&rsquo;être envahissant,
              s&rsquo;aménage autrement, ou disparaît.
            </p>
            <p className="leading-relaxed lg:pl-10">
              Il faut le dire avec honnêteté&nbsp;: il est fréquent qu&rsquo;un symptôme
              persiste sous une forme résiduelle. Une phobie traversée avec succès laisse
              ainsi souvent place à une vague aversion pour l&rsquo;ancien objet, ou à une
              légère anxiété en sa présence. Dans d&rsquo;autres cas, une ancienne
              dépression peut se trouver sublimée dans une activité sociale ou artistique,
              comme l&rsquo;écriture.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 3. CE QUE L'ON ÉCOUTE. Rend concret un mot — « inconscient » — que
          tout le monde emploie et que personne ne se représente. */}
      <section
        aria-labelledby="ce-qu-on-ecoute"
        className="bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="prose-clinique mx-auto text-center">
            <h2
              id="ce-qu-on-ecoute"
              className="!mt-0 text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce que l&rsquo;on écoute en séance
            </h2>
            <p>
              La démarche accorde une place particulière aux processus psychiques
              inconscients. En pratique, cela se traduit par une attention fine portée aux
              différentes «&nbsp;formations de l&rsquo;inconscient&nbsp;»&nbsp;:
            </p>
          </div>
        </Apparition>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {MANIFESTATIONS.map((m, i) => (
            <li key={m.nom} className="h-full">
              <Apparition delai={(i % 3) * 120} className="h-full">
                <div className="h-full rounded-[20px] bg-white p-6 sm:p-7">
                  <h3 className="font-bold text-encre">{m.nom}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ardoise">{m.texte}</p>
                </div>
              </Apparition>
            </li>
          ))}
        </ul>

        {/* Clôture du troisième paragraphe de « La psychanalyse en détails ».
            Dans le texte d'origine, il suit exactement cette liste et la
            généralise : il fait passer l'inconscient d'une notion théorique à
            quelque chose que le lecteur peut reconnaître chez lui. Coupé par
            erreur lors de la première reprise, remis le 2026-09-08.

            Il vient ICI et pas sur l'accueil : y remettre du fond sur la
            psychanalyse recréerait la concurrence entre les deux pages que la
            refonte vient précisément de dénouer (cf. POINT-ETAPE § 6). */}
        <Apparition className="mx-auto mt-12 max-w-lecture">
          <div className="prose-clinique">
            <p className="!mt-0">
              Plus largement&nbsp;: dès lors que l&rsquo;on s&rsquo;interroge un peu
              sérieusement sur le sens de ses conduites ou de ses dires, on réalise aisément
              que le sens de nos actions ne nous est pas aussi évident, ni aussi accessible,
              que l&rsquo;on voudrait bien se le faire croire de prime abord.
            </p>
            <p>
              On se confronte alors à sa propre opacité — à l&rsquo;énigme que l&rsquo;on
              représente pour soi-même. Et c&rsquo;est bien par cette confrontation à
              soi-même que l&rsquo;on vient marquer le X qui indique l&rsquo;emplacement de
              l&rsquo;inconscient&nbsp;: là, à cet endroit, il y a de l&rsquo;inconscient.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 4-5. LA MÉTHODE ET LES CRÉDENTIELS, CÔTE À CÔTE.
          Même disposition que /psychotherapeute-nantes/ : la prose à gauche, la
          carte de faits à droite. Ici, l'affirmation « thérapie de fond » et
          l'attestation de la formation se répondent — le titre de psychanalyste
          n'étant pas protégé, c'est la formation qui l'atteste. */}
      <section
        aria-labelledby="therapie-de-fond"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-7">
            <h2
              id="therapie-de-fond"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Une thérapie dite «&nbsp;de fond&nbsp;»
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <div className="prose-clinique mt-6 max-w-none">
              <p className="!mt-0">
                Il existe de nombreuses formes de psychothérapies. Pour le dire en estompant
                certaines nuances, mais dans un souci de clarté&nbsp;: la psychanalyse
                correspond à la forme la plus classique des thérapies dites « de fond », par
                distinction d&rsquo;avec les thérapies dites « brèves », dont les plus
                connues sont les thérapies cognitivo-comportementales.
              </p>
              <p>
                Ce sont des outils différents qu&rsquo;il ne s&rsquo;agit pas de
                hiérarchiser. La question utile n&rsquo;est pas de savoir quelle approche est
                la meilleure, mais plutôt de clarifier ce que vous recherchez&nbsp;: apaiser
                un symptôme précis dans un temps court, ou en comprendre le sens et la place
                dans votre économie psychique. Nous aborderons cette question ensemble lors
                de notre premier rendez-vous gratuit, et je vous orienterai si votre attente
                ne correspond pas à ma pratique.
              </p>
              <p>
                La durée n&rsquo;est pas fixée d&rsquo;avance et le rythme se décide
                ensemble — le plus souvent une séance par semaine.{" "}
                <Link href="/consultations/">
                  Voir comment se déroulent les consultations
                </Link>
                , ou{" "}
                <Link href="/psychotherapeute-nantes/">
                  ce que recouvre le titre de psychothérapeute
                </Link>
                .
              </p>
            </div>

            {/* Le bandeau d'urgence au pied du bloc de fond, et non sous la
                signature : une personne en détresse ne descend pas jusqu'à
                l'appareil de notes. */}
            <UrgenceBanner />
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <div className="h-full rounded-[20px] bg-lavande p-7 sm:p-9">
              <h2 id="ma-formation" className="text-xl font-bold text-bois sm:text-2xl">
                Ma formation analytique
              </h2>

              <p className="mt-5 text-ardoise">
                Contrairement à ceux de psychologue et de psychothérapeute, le titre de
                psychanalyste n&rsquo;est pas protégé par la loi&nbsp;: n&rsquo;importe qui
                peut s&rsquo;en réclamer. Ce qui l&rsquo;atteste, en pratique, c&rsquo;est
                une formation, une analyse personnelle et un rattachement à une école. Voici
                les miens.
              </p>

              <ul className="mt-6 flex flex-wrap gap-3">
                {praticien.rattachements.map((nom) => (
                  <li
                    key={nom}
                    className="rounded-full bg-white px-5 py-2 text-sm text-encre"
                  >
                    {nom}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-ardoise">{praticien.doubleTitre}</p>

              <p className="mt-4 text-sm">
                <Link
                  href="/vincent-rousseau-psychologue/"
                  className="text-terracotta-fonce underline underline-offset-2"
                >
                  Mon parcours, mes diplômes et mes titres en détail
                </Link>
              </p>

              <div className="mt-8 border-t border-white/70 pt-8">
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
                  Pour aller plus loin
                </h3>
                <ul className="mt-4 space-y-3">
                  {LECTURES.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        /* Nouvel onglet : ce sont des PDF. */
                        target="_blank"
                        rel="noopener"
                        className="flex items-start gap-4 rounded-[20px] bg-white p-5 transition-colors hover:bg-white/70"
                      >
                        <span className="mt-0.5 shrink-0 text-bois-brun" aria-hidden="true">
                          <IconeDocument />
                        </span>
                        <span>
                          <span className="block font-medium text-encre">{l.titre}</span>
                          <span className="mt-0.5 block text-sm text-ardoise">
                            {l.detail}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Apparition>
        </div>
      </section>

      {/* 6. CONVERSION. Sobre : la page est longue et réflexive, l'appel à
          l'action ne doit pas rompre le ton. */}
      <section aria-labelledby="commencer" className="px-5 pb-10 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="commencer" className="text-2xl font-bold text-bois sm:text-[33px]">
              Commencer, si vous le souhaitez
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              La première rencontre est gratuite. Elle sert à éclaircir ensemble votre
              situation et à définir la manière dont nous travaillerons, sans aucun
              engagement pour la suite. Si nous choisissons de poursuivre, le tarif des
              séances suivantes se situe entre {honoraires.min}&nbsp;€ et{" "}
              {honoraires.max}&nbsp;€, le montant exact étant adapté aux moyens financiers
              de chacun.
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
            </div>
          </div>
        </Apparition>
      </section>

      {/* Signature : colonne de lecture centrée. */}
      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
