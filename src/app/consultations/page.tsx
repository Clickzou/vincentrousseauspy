import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { UrgenceBanner } from "@/components/seo/UrgenceBanner";
import { Apparition } from "@/components/ui/Apparition";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import {
  adressePostale,
  cabinet,
  contact,
  honoraires,
  horaires,
  praticien,
  publics,
  seance,
} from "@/lib/site-config";
import { canonical, minusculeInitiale } from "@/lib/url-helpers";

/**
 * /consultations/ — PAGE NOUVELLE (SEO_MASTER § 3.2, silo 4).
 *
 * Rôle : lever les freins concrets. Qui je reçois, comment se passe la
 * première fois, dans quel cadre, à quel rythme, et sous quelle
 * confidentialité.
 *
 * Cette page RÉCUPÈRE le « Qui, quand et où ? » qui occupait à tort
 * /psychanalyste-nantes/ — ces informations étaient exactes, elles étaient
 * simplement sur l'URL d'un autre sujet (cf. POINT-ETAPE § 6).
 *
 * ⚠️ PAS DE BLOC FAQ ICI, et pas de schéma `FAQPage` : il est déclaré sur
 * /aide-faq/ et nulle part ailleurs. Plusieurs sujets de cette page sont
 * traités en question/réponse là-bas — c'est voulu, les deux formats se
 * complètent. Ce qui les mettrait en concurrence, c'est de dupliquer le
 * format, pas le sujet.
 *
 * PAS de sous-pages par public : Vincent ne reçoit que des adultes. Les
 * pages /consultations/adolescent/ et /consultations/couple/ du brouillon du
 * master sont supprimées (docs/donnees-vincent.md § 5).
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1). Textes révisés
 * par lui le 2026-09-11 (document « word3 »), qui confirme aussi la durée de
 * séance : 45 minutes.
 */

const TITRE = "Les consultations";
const MODIFIE_LE = "2026-09-11";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Comment se déroule une consultation chez un psychologue à ${cabinet.ville} : ` +
    `première séance, cadre, rythme, confidentialité. Adultes uniquement, sur rendez-vous.`,
  alternates: { canonical: canonical("consultations") },
  openGraph: { title: `${TITRE} — ${praticien.nom}`, url: canonical("consultations") },
};

/**
 * Le déroulé d'une première séance, en trois temps. Réécrit par Vincent le
 * 2026-09-11 : la première séance n'est plus présentée comme une prise de
 * contact, mais comme une évaluation mutuelle — le troisième temps nomme
 * l'alliance thérapeutique et ses trois composantes.
 */
const PREMIERE_SEANCE = [
  {
    temps: "Vous exprimez ce qui vous amène",
    texte:
      "Nous explorons ensemble votre demande, votre histoire et vos difficultés " +
      "actuelles. Vous parlez comme vous le souhaitez, dans l'ordre que vous voulez. " +
      "Vous n'avez rien à préparer, et il est tout à fait normal de ne pas savoir par " +
      "où commencer.",
  },
  {
    temps: "Nous éclaircissons la situation ensemble",
    texte:
      "J'écoute, je pose des questions et je reformule pour mieux comprendre votre " +
      "souffrance et vos objectifs. C'est le moment où je vous présente mon approche. " +
      "Nous discutons ensemble de la pertinence et de la faisabilité d'un travail " +
      "thérapeutique orienté par la psychanalyse.",
  },
  {
    temps: "Nous évaluons la possibilité de la suite",
    texte:
      "Surtout, cette séance sert à vérifier si une véritable alliance thérapeutique " +
      "peut se nouer. Ce lien de confiance, de collaboration et de sécurité repose sur " +
      "trois piliers : l'accord sur les objectifs, l'accord sur les tâches et un lien " +
      "émotionnel positif. C'est le fondement indispensable de tout travail en profondeur.",
  },
];

export default function Consultations() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "consultations" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE EN CARTE, comme les trois pages du silo « psy » : bandeau de
          qualification, titre, filet, accroche en police d'accent. Le bandeau
          reprend des faits de `site-config`, jamais recopiés en dur. */}
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
              Consultations pour adultes, sur rendez-vous au cabinet
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              Le déroulé, le cadre et la première séance
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              Faire la démarche de consulter est un grand pas, et il est tout à fait naturel
              de ressentir de l&rsquo;appréhension face à l&rsquo;inconnu. Pour vous aider à
              aborder ce moment plus sereinement, je vous propose de découvrir ici, en toute
              transparence, comment se déroulent nos rencontres au cabinet.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 1. QUI, QUAND ET OÙ — trois cartes de front.

          C'est le titre exact de la page WordPress dont ce contenu provient,
          et les trois questions se répondent : à qui je m'adresse, à quelles
          heures, à quelle adresse. Elles étaient auparavant séparées par cinq
          sections, « Qui je reçois » en tête de page et « Quand et où » tout
          en bas, alors qu'un visiteur qui se demande l'une se demande les
          trois.

          La formulation « toute personne qui le demande, à partir de 18 ans »
          est celle du site actuel. Elle corrige au passage sa contradiction :
          l'ancienne page psychanalyste disait « à partir de 18 ans », l'accueil
          mentionnait les enfants. */}
      {/* Les trois cartes reprennent la triade menthe / pêche / lavande des
          trois portes d'entrée de l'accueil : c'est le même geste — trois
          questions de même rang, distinguées par la couleur et non par la
          hiérarchie. Contrastes déjà vérifiés sur ces fonds dans
          `tailwind.config.ts`. */}
      <section
        aria-labelledby="qui-quand-ou"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="qui-quand-ou"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Qui, quand et où
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>
        </Apparition>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          <li className="h-full">
            <Apparition className="h-full">
              <article className="h-full rounded-[20px] bg-menthe p-7 sm:p-8">
                <h3 className="text-lg font-bold text-bois">Pour qui&nbsp;?</h3>
                {/* Le lien vers /psychologue-clinicien-nantes/ portait sur
                    « ce qui conduit généralement à consulter », que la révision
                    du 2026-09-11 a retiré. Il passe sur « ce qui vous amène »,
                    qui dit la même chose : sans lui, cette page ne pointait
                    plus vers la page de réflexion sur le symptôme. */}
                <p className="mt-4 text-ardoise">
                  J&rsquo;accompagne les adultes (à partir de {publics.ageMinimum} ans),
                  quels que soient vos besoins ou votre parcours. Il n&rsquo;y a pas de
                  profil type, ni de seuil de souffrance minimal pour s&rsquo;autoriser à
                  consulter. Chaque démarche est unique. Notre première rencontre sera
                  justement l&rsquo;occasion de faire le point ensemble et de clarifier{" "}
                  <Link
                    href="/psychologue-clinicien-nantes/"
                    className="text-terracotta-fonce underline underline-offset-2"
                  >
                    ce qui vous amène
                  </Link>
                  .
                </p>
                <p className="mt-4 text-ardoise">
                  Ma pratique est exclusivement dédiée aux suivis individuels pour adultes.
                  Je ne reçois pas les enfants, les adolescents ni les couples. Si votre
                  demande concerne l&rsquo;un de ces publics, je prendrai le temps de vous
                  orienter vers des confrères spécialisés afin que vous puissiez bénéficier
                  d&rsquo;un accompagnement adapté.
                </p>
              </article>
            </Apparition>
          </li>

          <li className="h-full">
            <Apparition delai={120} className="h-full">
              <article className="h-full rounded-[20px] bg-peche p-7 sm:p-8">
                <h3 className="text-lg font-bold text-bois">
                  Quand&nbsp;? Horaires et déroulement
                </h3>
                <p className="mt-4 text-ardoise">
                  Je vous reçois au cabinet {minusculeInitiale(horaires.libelle)},
                  exclusivement sur rendez-vous.
                </p>
                <p className="mt-3 text-ardoise">
                  Les consultations durent {seance.duree}. En règle générale, le rythme des
                  séances est {seance.rythme}. Néanmoins, nous prendrons le temps
                  d&rsquo;évaluer vos besoins lors de notre première rencontre afin de fixer
                  la fréquence la plus adaptée.
                </p>
              </article>
            </Apparition>
          </li>

          <li className="h-full">
            <Apparition delai={240} className="h-full">
              <article className="h-full rounded-[20px] bg-lavande p-7 sm:p-8">
                <h3 className="text-lg font-bold text-bois">
                  Où se situe le cabinet&nbsp;?
                </h3>
                <p className="mt-4 text-ardoise">
                  Le cabinet se trouve au {adressePostale}. Il est situé juste derrière la
                  Manufacture des Tabacs, à deux pas de la Gare Nord et du Jardin des Plantes.
                </p>
                {/* Le document de Vincent place deux émojis (tram, voiture) devant
                    ces lignes. Ils ne sont pas repris : le site signale ses
                    rubriques par des intitulés et des icônes dessinées, et un
                    émoji change d'aspect d'un système à l'autre. */}
                <p className="mt-4 font-medium text-encre">Pour venir&nbsp;:</p>
                <ul className="mt-2 space-y-2 text-ardoise">
                  <li>
                    <strong className="font-medium text-encre">Tramway&nbsp;:</strong>{" "}
                    {cabinet.acces.tram}
                  </li>
                  <li>
                    <strong className="font-medium text-encre">Stationnement&nbsp;:</strong>{" "}
                    des places de parking payantes sont disponibles dans les rues adjacentes.
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  <Link
                    href="/cabinet-nantes/"
                    className="text-terracotta-fonce underline underline-offset-2"
                  >
                    Comment venir au cabinet
                  </Link>
                </p>
              </article>
            </Apparition>
          </li>
        </ul>
      </section>

      {/* 2. LA PREMIÈRE SÉANCE. L'objet même de la page : c'est cette
          inconnue qui retient les gens d'appeler (§ 9.1). */}
      <section
        aria-labelledby="premiere-seance"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="premiere-seance"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              La première séance (gratuite)
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>
        </Apparition>

        <div className="prose-clinique mx-auto mt-8">
          <p className="!mt-0">
            C&rsquo;est avant tout une rencontre, mais elle n&rsquo;est pas une simple
            «&nbsp;prise de contact&nbsp;». D&rsquo;une durée de {seance.duree}, ce premier
            rendez-vous occupe une place particulière&nbsp;: c&rsquo;est un véritable temps
            d&rsquo;évaluation mutuelle qui détermine la suite du travail.
          </p>
          <p>
            La gratuité de cette séance permet d&rsquo;abaisser les barrières financières et
            psychologiques pour prendre le temps nécessaire, sans pression. Elle témoigne de
            mon engagement&nbsp;: je préfère vérifier que nous sommes pleinement alignés
            avant de commencer un travail exigeant.
          </p>
          <p>Voici comment se déroule ce premier échange&nbsp;:</p>
        </div>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {PREMIERE_SEANCE.map((etape, i) => (
            <li key={etape.temps} className="rounded-[20px] bg-white p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-peche font-bold text-bois"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-encre">{etape.temps}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ardoise">{etape.texte}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-lecture text-center text-ardoise">
          Si nous choisissons d&rsquo;engager ce travail, nous validerons la mise en place du
          suivi. Dans le cas contraire, je vous orienterai vers un professionnel plus
          adapté. Rien ne vous engage au-delà de cette première rencontre.
        </p>

        {/* La phrase sur « Mon Soutien Psy » n'est pas dans le document du
            2026-09-11, rédigé sur une version antérieure au 10 : elle vient du
            correctif précédent de Vincent et elle est conservée. */}
        <p className="mx-auto mt-6 max-w-lecture text-center text-sm text-ardoise">
          <strong className="font-medium text-encre">À savoir&nbsp;:</strong> vous
          n&rsquo;avez besoin d&rsquo;aucune ordonnance. La consultation chez un psychologue
          se fait en accès direct, sans obligation de passer par votre médecin traitant.
          C&rsquo;est également le cas pour le dispositif «&nbsp;Mon Soutien Psy&nbsp;»,
          auquel je suis affilié.
        </p>
      </section>

      {/* 3. LE CADRE. Le mot « cadre » n'est pas décoratif en psychanalyse :
          la régularité et le lieu font partie du travail. */}
      <section aria-labelledby="le-cadre" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="le-cadre"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Le cadre thérapeutique
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>
        </Apparition>

        {/* Colonne de lecture centrée : le titre est centré, le texte reste
            aligné à gauche à l'intérieur. Trois paragraphes centrés ligne à
            ligne obligeraient l'œil à chercher le début de chaque suivante. */}
        <div className="prose-clinique mx-auto mt-8">
          <p className="!mt-0">
            Le cadre — un lieu unique, un horaire fixe, une régularité — n&rsquo;est pas une
            contrainte administrative. C&rsquo;est un repère rassurant et stable qui rend le
            travail thérapeutique possible.
          </p>
          {/* ⚠️ Le document du 2026-09-11 ouvre ce paragraphe par « Pour
              garantir l'efficacité de l'accompagnement ». Ces mots ne sont pas
              repris : garantir une efficacité est une promesse de résultat, que
              le § 2.2 du master proscrit (c'est le motif pour lequel « une
              méthode éprouvée visant à apporter des changements durables » a
              été écartée en septembre). Le reste de la phrase dit déjà
              pourquoi la régularité compte. En attente de l'accord de Vincent. */}
          {/* « Le plus souvent » : réponse de Vincent du 2026-09-11. Le bloc
              disait le rythme fixe, la carte « Quand ? » plus haut le disait
              adaptable ; c'est la carte qui fait foi. */}
          <p>
            <strong>Le rythme&nbsp;:</strong> c&rsquo;est le plus souvent une séance par
            semaine. C&rsquo;est
            cette régularité indispensable qui maintient la continuité du travail psychique
            entre les rendez-vous, vous permettant ainsi de construire des repères solides et
            d&rsquo;avancer sereinement. Nous fixerons ensemble ce créneau régulier lors de
            notre première rencontre.
          </p>
          <p>
            <strong>La durée du suivi&nbsp;:</strong> elle ne se fixe pas d&rsquo;avance.
            Elle dépend du cheminement de chacun, et vous restez entièrement libre
            d&rsquo;interrompre le travail quand vous le souhaitez.
          </p>
          <p>
            <strong>Les modalités&nbsp;:</strong> les consultations ont lieu exclusivement
            au cabinet, en présentiel. Je ne propose pas de suivi en visioconférence, car la
            rencontre physique est essentielle à ma pratique.
          </p>
        </div>

        {/* Quatre repères, dans la formulation du 2026-09-11. « Modalité »
            revient, et la gratuité de la première séance passe dans la liste
            qui suit : elle reste dite juste à côté du prix, comme l'exige la
            règle posée dans `honoraires` (site-config). */}
        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              terme: "Durée d'une séance",
              detail: `${seance.duree} (première consultation et suivis)`,
            },
            {
              terme: "Rythme des séances",
              detail:
                "Le plus souvent une séance par semaine, pour la continuité du travail psychique",
            },
            {
              terme: "Honoraires",
              detail:
                `De ${honoraires.min} à ${honoraires.max} €. Le montant exact est défini ` +
                `ensemble selon vos possibilités.`,
            },
            {
              terme: "Modalité",
              detail: "Sur rendez-vous, en présentiel uniquement au cabinet",
            },
          ].map((item) => (
            <div key={item.terme} className="rounded-[20px] bg-lin p-6">
              <dt className="text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
                {item.terme}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ardoise">{item.detail}</dd>
            </div>
          ))}
        </dl>

        {/* Liste demandée par Vincent le 2026-09-11 à la place de la phrase de
            renvoi. Le renvoi n'est pas perdu pour autant : l'intitulé devient
            le lien vers /tarifs-et-remboursement/, seul lien de la page vers
            elle.

            ⚠️ Le document écrit « Les consultations ne sont pas prises en
            charge par l'Assurance Maladie ». C'est faux pour un suivi engagé
            dans « Mon Soutien Psy », auquel Vincent est affilié : remboursé à
            60 %. La restriction « Hors dispositif » rétablit l'exactitude. */}
        <div className="mx-auto mt-8 max-w-lecture text-sm text-ardoise">
          <p className="font-medium text-encre">
            <Link
              href="/tarifs-et-remboursement/"
              className="text-terracotta-fonce underline underline-offset-2"
            >
              Tarifs et remboursements
            </Link>
            &nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>La première séance de rencontre est gratuite.</li>
            <li>
              Hors dispositif «&nbsp;Mon Soutien Psy&nbsp;», les consultations ne sont pas
              prises en charge par l&rsquo;Assurance Maladie.
            </li>
            <li>
              De nombreuses mutuelles proposent un remboursement partiel ou total (pensez à
              contacter votre organisme).
            </li>
          </ul>
        </div>
      </section>

      {/* 4. CONFIDENTIALITÉ. Formulée par ses conséquences concrètes : dire
          « secret professionnel » ne rassure personne qui ne sait pas ce que
          cela recouvre. */}
      <section
        aria-labelledby="confidentialite"
        className="bg-menthe px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="confidentialite"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              La confidentialité
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
            <p className="mt-6 text-ardoise">
              Les psychologues sont soumis au secret professionnel absolu. Concrètement, cet
              engagement repose sur trois piliers&nbsp;:
            </p>
          </div>
        </Apparition>

        {/* Trois colonnes plutôt que trois bandes empilées : les points sont
            courts et de même nature, ils se lisent de front. Empilés sur une
            largeur bornée, ils laissaient la moitié droite de la bande vide. */}
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            "Tout ce que vous exprimez ou déposez en séance reste strictement confidentiel.",
            "Le fait même de consulter demeure secret : aucune information n'est transmise à vos proches, votre employeur ou votre médecin sans votre accord.",
            "Cette règle éthique s'applique sans réserve, en dehors des seules exceptions strictement prévues par la loi.",
          ].map((point, i) => (
            <li key={point} className="h-full">
              <Apparition delai={i * 120} className="h-full">
                <p className="h-full rounded-[20px] bg-white px-6 py-6 text-ardoise">
                  {point}
                </p>
              </Apparition>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-lecture text-center text-sm text-ardoise">
          C&rsquo;est également pour protéger votre vie privée que le formulaire de ce site
          ne comporte aucune zone de message&nbsp;:{" "}
          <Link
            href="/politique-de-confidentialite/"
            className="text-terracotta-fonce underline underline-offset-2"
          >
            ce que vous traversez n&rsquo;a pas à transiter par un serveur
          </Link>
          .
        </p>
      </section>

      {/* 5. CONVERSION, puis appareil de notes. Le « Quand et où » qui vivait
          ici est remonté dans le bloc « Qui, quand et où » en tête de page. */}
      <section
        aria-labelledby="prendre-rdv"
        /* `pt-14` : la section précédente est une bande menthe pleine largeur.
           Sans marge haute, la carte pêche venait s'y coller, les deux aplats
           se touchant bord à bord. Les sections qui suivent un fond blanc n'en
           ont pas besoin, le `pb` de la précédente suffit. */
        className="px-5 pb-10 pt-14 sm:px-10 sm:pt-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="prendre-rdv" className="text-2xl font-bold text-bois sm:text-[33px]">
              Prendre rendez-vous
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              Pour prendre contact, nul besoin de préparer quoi que ce soit. Un court
              échange de quelques minutes nous permettra simplement de faire le point et de
              planifier notre rencontre.
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
                  href="/aide-faq/"
                  className="text-terracotta-fonce underline underline-offset-2"
                >
                  Autres questions fréquentes
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
