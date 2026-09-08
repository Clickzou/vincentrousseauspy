import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { IconeDocument } from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, honoraires, praticien, publics } from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * /psychanalyste-nantes/ — URL CONSERVÉE, et la mieux positionnée du site
 * (2e sur « psychanalyste nantes »).
 *
 * ⚠️ CE QUE CETTE URL CONTIENT AUJOURD'HUI : rien sur la psychanalyse. La page
 * WordPress s'intitule « Qui, quand et où ? » et ne donne que des informations
 * pratiques — horaires, adresse, accès. Elle se classe 2e sur la seule force du
 * slug. Le texte de fond sur la psychanalyse, lui, est enterré sur la page
 * d'accueil actuelle (cf. docs/contenu-actuel/home-main.md, « La psychanalyse
 * en détails »).
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
const MODIFIE_LE = "2026-09-08";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `${praticien.nom}, psychanalyste à ${cabinet.ville}. La psychanalyse est un ` +
    `dispositif de psychothérapie par la parole : ce qu'elle est, ce qu'elle écoute, ` +
    `et comment se déroulent les séances au cabinet.`,
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

      <PageEnTete
        titre="Psychanalyste à Nantes"
        chapeau={
          `La psychanalyse est mon outil de travail quotidien. C'est un dispositif de ` +
          `psychothérapie par la parole, qui s'attache moins à faire taire un symptôme ` +
          `qu'à comprendre ce qu'il dit. Je reçois ${publics.libelle} à ${cabinet.ville}.`
        }
      />

      {/* 1. DÉFINITION. Réponse directe, en tête : c'est elle que reprennent
          les moteurs génératifs et le bloc « Les gens demandent aussi ». */}
      <section aria-labelledby="definition" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <h2 id="definition" className="text-2xl font-bold text-bois sm:text-[33px]">
          La psychanalyse, qu&rsquo;est-ce que c&rsquo;est&nbsp;?
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            C&rsquo;est à la fois une méthode thérapeutique et une théorie de la
            psychologie, fondée par Sigmund Freud à la fin du XIX<sup>e</sup> siècle. Comme
            dispositif, elle vise une investigation de la psyché&nbsp;: son fonctionnement
            actuel, mais aussi l&rsquo;histoire de vie à travers laquelle elle s&rsquo;est
            construite.
          </p>
          <p>
            Elle s&rsquo;attache à débrouiller ce qui fait la singularité de chacun. Il
            n&rsquo;y a donc pas de protocole applicable à tous&nbsp;: ce qui se travaille
            avec vous ne se travaillerait pas de la même manière avec quelqu&rsquo;un
            d&rsquo;autre. Les séances se tiennent au cabinet, en présentiel.
          </p>
        </div>
      </section>

      {/* 2. LE POINT DISTINCTIF. C'est le meilleur passage de Vincent, et
          c'est ce qui différencie réellement cette page de ses concurrentes.
          Formulé sans opposer les approches entre elles : la publicité
          comparative est proscrite (§ 2.2). */}
      <section
        aria-labelledby="la-plainte"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="la-plainte" className="text-2xl font-bold text-bois sm:text-[33px]">
          Transformer la plainte en question
        </h2>

        <blockquote className="my-8 max-w-lecture border-l-2 border-terracotta pl-6">
          <p className="font-accent text-2xl italic leading-snug text-bois sm:text-[28px]">
            Le symptôme n&rsquo;est pas seulement une gêne à supprimer&nbsp;: il est lourd
            d&rsquo;un sens qui, pour l&rsquo;heure, reste énigmatique.
          </p>
        </blockquote>

        <div className="prose-clinique">
          <p>
            La psychanalyse invite à transformer la plainte en une question que le symptôme
            vient vous poser. Ce sens est inconscient, et il se déchiffre par un exercice de
            la parole — ce que le vocabulaire analytique nomme les{" "}
            <em>associations libres</em>&nbsp;: dire ce qui vient, sans trier.
          </p>
          <p>
            C&rsquo;est au terme de ce travail — plus large que la plainte initiale, mais
            l&rsquo;impliquant — que le symptôme cesse d&rsquo;être envahissant,
            s&rsquo;aménage autrement, ou disparaît.
          </p>
          <p>
            Il faut le dire sans embellir&nbsp;: il est fréquent qu&rsquo;un symptôme
            persiste sous une forme résiduelle. Une phobie travaillée avec succès laisse
            souvent une vague aversion pour l&rsquo;ancien objet, ou une anxiété en sa
            présence. Autrement, une ancienne dépression peut se trouver sublimée dans une
            activité sociale ou artistique, l&rsquo;écriture par exemple.
          </p>
        </div>
      </section>

      {/* 3. CE QUE L'ON ÉCOUTE. Rend concret un mot — « inconscient » — que
          tout le monde emploie et que personne ne se représente. */}
      <section aria-labelledby="ce-qu-on-ecoute" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="ce-qu-on-ecoute" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce que l&rsquo;on écoute en séance
        </h2>
        <p className="mt-4 max-w-lecture text-ardoise">
          La démarche accorde une place particulière aux processus psychiques dits
          inconscients. Concrètement, cela veut dire prêter attention à ce qui suit.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MANIFESTATIONS.map((m) => (
            <li key={m.nom} className="rounded-[20px] bg-lin p-6">
              <h3 className="font-bold text-encre">{m.nom}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ardoise">{m.texte}</p>
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
        <div className="prose-clinique mt-12">
          <p>
            Plus largement&nbsp;: dès lors que l&rsquo;on s&rsquo;interroge un peu
            sérieusement sur le sens de ses conduites ou de ses dires, on réalise
            aisément que le sens de nos actions ne nous est pas aussi évident, ni aussi
            accessible, que l&rsquo;on voudrait bien se le faire croire de prime abord.
          </p>
          <p>
            On se confronte alors à sa propre opacité — à l&rsquo;énigme que l&rsquo;on
            représente pour soi-même. Et c&rsquo;est bien par cette confrontation à
            soi-même que l&rsquo;on vient marquer le X qui indique l&rsquo;emplacement de
            l&rsquo;inconscient&nbsp;: là, à cet endroit, il y a de l&rsquo;inconscient.
          </p>
        </div>
      </section>

      {/* 4. THÉRAPIE DE FOND. Sert l'intention « psychanalyse ou TCC ? »,
          très fréquente, sans dénigrer aucune approche. */}
      <section
        aria-labelledby="therapie-de-fond"
        className="bg-lavande px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="therapie-de-fond" className="text-2xl font-bold text-bois sm:text-[33px]">
          Une thérapie dite « de fond »
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Il existe de nombreuses formes de psychothérapies. Pour le dire en estompant
            certaines nuances, mais dans un souci de clarté&nbsp;: la psychanalyse
            correspond à la forme la plus classique des thérapies dites « de fond », par
            distinction d&rsquo;avec les thérapies dites « brèves », dont les plus connues
            sont les thérapies cognitivo-comportementales.
          </p>
          <p>
            Ce sont des outils différents, et il ne s&rsquo;agit pas de les hiérarchiser.
            La question utile n&rsquo;est pas « laquelle est la meilleure », mais « qu&rsquo;est-ce
            que je cherche&nbsp;? »&nbsp;: apaiser un symptôme précis dans un temps court, ou
            comprendre ce qui le fait tenir. Nous en parlerons lors du premier rendez-vous, et
            je vous orienterai si ce que vous cherchez n&rsquo;est pas ce que je pratique.
          </p>
          <p>
            La durée n&rsquo;est pas fixée d&rsquo;avance et le rythme se décide ensemble —
            le plus souvent une séance par semaine.{" "}
            <Link href="/consultations/">Voir comment se déroulent les consultations</Link>,
            ou{" "}
            <Link href="/psychotherapeute-nantes/">
              ce que recouvre le titre de psychothérapeute
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 5. E-E-A-T. « Psychanalyste » n'est pas un titre protégé : la
          formation et la filiation analytique sont donc le seul élément
          vérifiable. Le dire explicitement vaut mieux que le laisser croire
          (§ 2.2). */}
      <section aria-labelledby="ma-formation" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="ma-formation" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ma formation analytique
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Contrairement à ceux de psychologue et de psychothérapeute, le titre de
            psychanalyste n&rsquo;est pas protégé par la loi&nbsp;: n&rsquo;importe qui peut
            s&rsquo;en réclamer. Ce qui l&rsquo;atteste, en pratique, c&rsquo;est une
            formation, une analyse personnelle et un rattachement à une école. Voici les
            miens.
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-3">
          {praticien.rattachements.map((nom) => (
            <li
              key={nom}
              className="rounded-full border border-sable bg-white px-5 py-2 text-sm text-encre"
            >
              {nom}
            </li>
          ))}
        </ul>

        <div className="prose-clinique mt-6">
          <p>{praticien.doubleTitre}</p>
          <p>
            <Link href="/vincent-rousseau-psychologue/">
              Mon parcours, mes diplômes et mes titres en détail
            </Link>
            .
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
            Pour aller plus loin
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {LECTURES.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  /* Nouvel onglet, comme sur l'accueil : ce sont des PDF. */
                  target="_blank"
                  rel="noopener"
                  className="flex items-start gap-4 rounded-[20px] bg-peche p-5 transition-colors hover:bg-terracotta/40"
                >
                  <span className="mt-0.5 shrink-0 text-bois-brun" aria-hidden="true">
                    <IconeDocument />
                  </span>
                  <span>
                    <span className="block font-medium text-encre">{l.titre}</span>
                    <span className="mt-0.5 block text-sm text-ardoise">{l.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. CONVERSION. Sobre : la page est longue et réflexive, le CTA ne
          doit pas rompre le ton. */}
      <section
        aria-labelledby="commencer"
        className="bg-menthe px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <div className="max-w-lecture">
          <h2 id="commencer" className="text-2xl font-bold text-bois sm:text-[33px]">
            Commencer, si vous le souhaitez
          </h2>
          <p className="mt-4 text-ardoise">
            La première rencontre sert à éclaircir ensemble la situation et à déterminer la
            manière dont nous procéderons. Elle ne vous engage pas au-delà. Les séances sont
            de {honoraires.min} à {honoraires.max} €, et{" "}
            {minusculeInitiale(honoraires.modulation)}
          </p>
        </div>

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
