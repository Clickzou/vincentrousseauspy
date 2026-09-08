import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Sources, type Source } from "@/components/seo/Sources";
import { PageEnTete } from "@/components/ui/PageEnTete";
import { IconeValidation } from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, praticien } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/
 * URL CONSERVÉE du site WordPress — slug long, mais il porte du référencement
 * et ne doit pas changer (§ 10.2).
 *
 * RÔLE STRATÉGIQUE PRÉCIS (§ 4, silo 3) : c'est la page qui permet d'être
 * visible sur les requêtes « psychiatre … » SANS JAMAIS REVENDIQUER LE TITRE
 * DE MÉDECIN. Elle est légitime parce que Vincent détient trois des titres
 * qu'elle compare — et elle serait déplacée s'il n'en détenait qu'un.
 *
 * CLOISONNEMENT : chaque profession n'est traitée ici qu'en tant qu'elle se
 * distingue des autres. Le fond sur la psychothérapie et sur la psychanalyse
 * reste sur leurs pages dédiées, vers lesquelles chaque bloc renvoie.
 *
 * L'essentiel du texte est celui de Vincent, avec ses références
 * universitaires (Lagache, Pedinielli) : elles sont un signal E-E-A-T rare,
 * on ne les coupe pas.
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1).
 */

const TITRE = "Les différents « psy »";
const MODIFIE_LE = "2026-09-08";
const SLUG = "psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste";

export const metadata: Metadata = {
  title: "Psychologue, psychothérapeute, psychiatre, psychanalyste : les différences",
  description:
    "Formation, titre protégé, droit de prescrire : ce qui distingue réellement un " +
    "psychologue clinicien, un psychothérapeute, un psychiatre, un psychanalyste et un " +
    "psychopraticien. Expliqué par un praticien qui détient trois de ces titres.",
  alternates: { canonical: canonical(SLUG) },
  openGraph: {
    title: `Les différents « psy » — ${praticien.nom}`,
    url: canonical(SLUG),
  },
};

const SOURCES: Source[] = [
  {
    titre:
      "Loi n° 85-772 du 25 juillet 1985, article 44 — usage professionnel du titre de psychologue",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006756923/",
  },
  {
    titre:
      "Décret n° 90-255 du 22 mars 1990 fixant la liste des diplômes permettant de faire usage du titre de psychologue",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000714886",
  },
  {
    titre:
      "Arrêté du 19 mai 2006 relatif au stage professionnel prévu par le décret n° 90-255 (durée minimale de 500 heures)",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000457904/",
  },
  {
    titre: "Article 52 de la loi n° 2004-806 du 9 août 2004 — usage du titre de psychothérapeute",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000031930044",
  },
  {
    titre: "Décret n° 2010-534 du 20 mai 2010 relatif à l'usage du titre de psychothérapeute",
    editeur: "Légifrance",
    href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000022244482",
  },
];

/**
 * Tableau comparatif. Trois colonnes seulement, et choisies pour être
 * vérifiables : formation exigée, protection du titre, droit de prescrire.
 * La question du remboursement en a été retirée — elle appelle trop de
 * réserves pour tenir dans une cellule, et un tableau approximatif sur un
 * sujet YMYL est pire que pas de tableau. Elle est traitée en prose, avec un
 * lien vers la page tarifs.
 */
const COMPARATIF = [
  {
    profession: "Psychologue clinicien",
    formation: "Master 2 de psychologie + 500 h de stage professionnel supervisé",
    protege: "Oui — loi de 1985",
    prescrit: "Non",
    detenu: true,
  },
  {
    profession: "Psychothérapeute",
    formation:
      "400 h de psychopathologie clinique + stage d'au moins 5 mois, et inscription au registre national",
    protege: "Oui — loi de 2004",
    prescrit: "Non",
    detenu: true,
  },
  {
    profession: "Psychiatre",
    formation: "Doctorat de médecine, spécialisation en psychiatrie",
    protege: "Oui — titre de médecin",
    prescrit: "Oui",
    detenu: false,
  },
  {
    profession: "Psychanalyste",
    formation: "Analyse personnelle, formation en école, supervision de la pratique",
    protege: "Non",
    prescrit: "Non",
    detenu: true,
  },
  {
    profession: "Psychopraticien",
    formation: "Aucune exigence légale",
    protege: "Non",
    prescrit: "Non",
    detenu: false,
  },
];

export default function LesDifferentsPsy() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: SLUG },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageEnTete
        titre="Psychologue, psychothérapeute, psychiatre, psychanalyste : quelles différences ?"
        chapeau={
          `Le vocabulaire des « psy » est confus, et cette confusion permet à des ` +
          `personnes sans formation reconnue de se présenter comme thérapeutes. Voici ce ` +
          `que recouvre chacun de ces mots. J'en détiens trois : c'est ce qui me permet ` +
          `de les comparer, et non de les vendre.`
        }
      />

      {/* 1. LE TABLEAU EN PREMIER. C'est la réponse directe attendue par la
          requête, et le format que reprennent les extraits enrichis comme
          les moteurs génératifs (§ 11). */}
      <section aria-labelledby="comparatif" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <h2 id="comparatif" className="text-2xl font-bold text-bois sm:text-[33px]">
          En un coup d&rsquo;œil
        </h2>

        {/* Le tableau défile horizontalement dans son propre conteneur : sur
            mobile, c'est lui qui scrolle, jamais la page. */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparaison des professions « psy » : formation exigée, protection du titre,
              droit de prescrire
            </caption>
            <thead>
              <tr className="border-b border-sable">
                <th scope="col" className="py-3 pr-4 font-bold text-encre">
                  Profession
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-encre">
                  Formation exigée
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-encre">
                  Titre protégé
                </th>
                <th scope="col" className="py-3 font-bold text-encre">
                  Peut prescrire
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIF.map((ligne) => (
                <tr key={ligne.profession} className="border-b border-sable align-top">
                  <th scope="row" className="py-4 pr-4 font-medium text-encre">
                    {ligne.profession}
                    {ligne.detenu && (
                      <span className="mt-1 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-valide">
                        <IconeValidation className="h-4 w-4" />
                        Titre que je détiens
                      </span>
                    )}
                  </th>
                  <td className="py-4 pr-4 text-ardoise">{ligne.formation}</td>
                  <td className="py-4 pr-4 text-ardoise">{ligne.protege}</td>
                  <td className="py-4 text-ardoise">{ligne.prescrit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-lecture text-sm text-ardoise">
          La question du remboursement ne figure pas dans ce tableau&nbsp;: elle appelle
          trop de réserves pour tenir dans une case.{" "}
          <Link
            href="/tarifs-et-remboursement/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            Elle est traitée en détail sur la page tarifs
          </Link>
          .
        </p>
      </section>

      {/* 2. LE DÉTAIL, profession par profession. Texte de Vincent, avec ses
          références universitaires. */}
      <section
        aria-labelledby="le-psychologue"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="le-psychologue" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le psychologue clinicien
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Le psychologue relève d&rsquo;une formation universitaire. Le titre suppose
            l&rsquo;obtention d&rsquo;un master&nbsp;2 professionnel et d&rsquo;au minimum
            500 heures de stage supervisé. Il peut exercer en institution ou en libéral.
          </p>
          <p>
            C&rsquo;est ce que l&rsquo;opinion courante entend par « psychologue », mais
            <em> clinicien</em> désigne en réalité une spécialisation. La psychologie
            clinique est, dans son acception la plus large, l&rsquo;étude de la personne
            totale en situation — la formule est de Daniel Lagache, en 1949 — soit la
            science de la singularité. Elle est inséparable de la psychopathologie&nbsp;:
            l&rsquo;étude, l&rsquo;évaluation, le diagnostic et la prise en charge de la
            souffrance psychique sous toutes ses formes (Pedinielli, 1994).
          </p>
          <p>
            Les autres branches de la psychologie — sociale, cognitive, du développement, de
            la santé, du travail — ont leurs applications propres, qui ne sont pas le soin
            psychique.
          </p>
        </div>
      </section>

      <section aria-labelledby="le-psychotherapeute" className="px-5 py-14 sm:px-10 lg:px-[100px]">
        <h2 id="le-psychotherapeute" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le psychothérapeute
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            C&rsquo;est un titre accordé sous conditions, et subordonné à
            l&rsquo;inscription au registre national des psychothérapeutes. La psychothérapie
            est l&rsquo;application pratique majeure du psychologue clinicien, mais elle ne
            résume pas son activité.
          </p>
          <p>
            Il existe de très nombreux types de psychothérapies, ce qui en fait un domaine
            particulièrement nébuleux. Avant toute démarche vers un professionnel, il vaut
            la peine de se renseigner sur la qualité de sa formation autant que sur la
            reconnaissance de sa pratique par les autorités compétentes.
          </p>
          <p>
            Les textes précisent que l&rsquo;inscription au registre est subordonnée à la
            validation d&rsquo;une formation en psychopathologie clinique de 400 heures
            minimum et d&rsquo;un stage pratique d&rsquo;une durée d&rsquo;au moins cinq
            mois. L&rsquo;accès à cette formation est réservé aux titulaires d&rsquo;un
            diplôme de niveau doctorat donnant le droit d&rsquo;exercer la médecine en
            France, ou d&rsquo;un diplôme de niveau master dont la spécialité ou la mention
            est la psychologie ou la psychanalyse.
          </p>
          <p>
            <Link href="/psychotherapeute-nantes/">
              Ce que recouvre ma pratique de psychothérapeute
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 3. LE PSYCHIATRE. Le point délicat de la page : elle capte des
          requêtes « psychiatre » et doit donc dire, sans ambiguïté et sans
          détour, que Vincent n'en est pas un (§ 2.2). */}
      <section
        aria-labelledby="le-psychiatre"
        className="bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="le-psychiatre" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le psychiatre
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Le psychiatre est un <strong>médecin</strong>, spécialisé en psychiatrie. Il
            peut lui aussi faire usage du titre de psychothérapeute, et il est en outre
            prescripteur&nbsp;: lui seul, parmi les professions de cette page, peut prescrire
            un traitement médicamenteux ou un arrêt de travail.
          </p>
          <p>
            <strong>Je ne suis pas psychiatre et je ne prescris pas.</strong> Si votre
            situation relève d&rsquo;un avis médical ou d&rsquo;un traitement, je vous le
            dirai et je vous orienterai — le travail avec un psychologue et un suivi
            psychiatrique ne s&rsquo;excluent d&rsquo;ailleurs pas, ils se conjuguent
            souvent.
          </p>
        </div>
      </section>

      <section aria-labelledby="le-psychanalyste" className="px-5 py-14 sm:px-10 lg:px-[100px]">
        <h2 id="le-psychanalyste" className="text-2xl font-bold text-bois sm:text-[33px]">
          Le psychanalyste
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Le psychanalyste peut être inscrit au registre national des psychothérapeutes,
            ou non. La plupart sont aussi médecins ou psychologues. Sa formation consiste en
            une analyse personnelle, une formation théorique auprès d&rsquo;une école de
            psychanalyse, et une supervision de sa pratique auprès d&rsquo;un analyste
            expérimenté.
          </p>
          <p>
            La psychanalyse s&rsquo;intéresse essentiellement à l&rsquo;inconscient, où elle
            localise les conflits psychiques causes de souffrance. Par la méthode dite des{" "}
            <em>associations libres</em>, elle vise à mettre au jour ces conflits, et par là
            à réduire leur influence.{" "}
            <Link href="/psychanalyste-nantes/">Ma pratique de la psychanalyse</Link>.
          </p>
        </div>
      </section>

      {/* 4. LE PSYCHOPRATICIEN. Absent du texte d'origine, mais exigé par le
          master : c'est l'appellation libre avec laquelle la confusion est
          la plus fréquente, et la plus coûteuse pour le public. */}
      <section
        aria-labelledby="le-psychopraticien"
        className="bg-peche px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="le-psychopraticien" className="text-2xl font-bold text-bois sm:text-[33px]">
          Et le « psychopraticien » ?
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            C&rsquo;est une appellation <strong>librement utilisable</strong>. Elle ne
            résulte d&rsquo;aucun cursus universitaire, n&rsquo;est reconnue par aucune
            autorité, et n&rsquo;impose aucune condition de formation ni aucun contrôle.
            Elle est apparue précisément quand le titre de psychothérapeute a été protégé,
            en 2010.
          </p>
          <p>
            Cela ne préjuge pas de la valeur des personnes qui l&rsquo;emploient — certaines
            sont sérieusement formées. Cela veut dire que <strong>le mot lui-même ne vous
            garantit rien</strong>, et que la vérification vous incombe. Les seuls titres
            que vous pouvez contrôler auprès d&rsquo;une autorité sont ceux de psychologue,
            de psychothérapeute et de médecin.
          </p>
          <p>
            La différence est aussi juridique. S&rsquo;attribuer le titre de psychologue
            sans y avoir droit est un délit, puni comme l&rsquo;usurpation de titre par
            l&rsquo;article 433-17 du code pénal. Se dire psychopraticien n&rsquo;expose à
            rien, puisque le mot n&rsquo;engage rien.
          </p>
        </div>
      </section>

      {/* 5. ORIENTATION PRATIQUE, puis contact. */}
      <section aria-labelledby="lequel" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <h2 id="lequel" className="text-2xl font-bold text-bois sm:text-[33px]">
          Lequel consulter&nbsp;?
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Il n&rsquo;y a pas de réponse unique, mais quelques repères simples. Si vous
            pensez avoir besoin d&rsquo;un traitement médicamenteux, d&rsquo;un arrêt de
            travail ou d&rsquo;un avis médical, c&rsquo;est vers un médecin — généraliste ou
            psychiatre — qu&rsquo;il faut aller. Si vous cherchez un travail par la parole,
            un psychologue clinicien ou un psychothérapeute est indiqué. Et dans le doute,
            un premier rendez-vous sert justement à en décider.
          </p>
          <p>{praticien.doubleTitre}</p>
          <p>
            <Link href="/vincent-rousseau-psychologue/">
              Mon parcours, mes diplômes et mes numéros d&rsquo;enregistrement
            </Link>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/rendez-vous-psychologue-nantes/"
            className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
          >
            Prendre rendez-vous à {cabinet.ville}
          </Link>
          <a
            href={`tel:${contact.telephoneE164}`}
            className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
          >
            {contact.telephone}
          </a>
        </div>

        <div className="mt-12 max-w-lecture">
          <Sources sources={SOURCES} />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
