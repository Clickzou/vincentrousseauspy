import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Apparition } from "@/components/ui/Apparition";
import { Bouton } from "@/components/ui/Bouton";
import {
  IconeAffiliation,
  IconeAtteste,
  IconeDiplome,
  IconeInstitution,
  IconeValidation,
} from "@/components/ui/Icones";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import { cabinet, contact, praticien, publics } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * PAGE AUTEUR — pivot E-E-A-T du site.
 *
 * En YMYL santé, l'auteur identifié et vérifiable EST le signal de confiance
 * déterminant (SEO_MASTER § 2.1). Toutes les pages cliniques et tous les
 * articles y renvoient ; sur le site WordPress, ces informations étaient
 * enterrées dans une page « Dispositions légales » à vocation juridique.
 *
 * Le parti pris de cette page : chaque affirmation est vérifiable. Numéro
 * d'enregistrement, autorité de tutelle, université, année, rattachements.
 * Rien de promotionnel, aucun superlatif — ce sont les faits qui portent.
 *
 * CONTENU À VALIDER PAR VINCENT (§ 7.1) : les passages de récit personnel
 * ci-dessous sont une proposition rédigée à partir de son site actuel.
 */

export const metadata: Metadata = {
  title: "Qui je suis",
  description:
    `${praticien.nom}, ${praticien.titres.join(", ").toLowerCase()} à ${cabinet.ville}. ` +
    `Parcours, formation, titres et cadre de travail.`,
  alternates: { canonical: canonical("vincent-rousseau-psychologue") },
};

const ENREGISTREMENTS = [
  {
    Icone: IconeAtteste,
    titre: "Psychologue déclaré",
    lignes: [
      `Auprès de la ${praticien.declarations.psychologue}.`,
      `Numéro ADELI : ${praticien.adeli}`,
    ],
  },
  {
    Icone: IconeInstitution,
    titre: "Activité libérale déclarée",
    lignes: [
      `Auprès de l'${praticien.declarations.activiteLiberale}.`,
      `Numéro SIRET : ${praticien.siret}`,
    ],
  },
  {
    Icone: IconeDiplome,
    titre: "Diplôme",
    lignes: [`${praticien.diplome.intitule}.`, `Délivré par l'${praticien.diplome.etablissement}.`],
  },
  {
    Icone: IconeAffiliation,
    titre: "Rattachements",
    lignes: praticien.rattachements.map((r) => `${r}.`),
  },
];

export default function PageAuteur() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: "Qui je suis", url: "vincent-rousseau-psychologue" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* En-tête en carte centrée, propre à cette page.
          `PageEnTete` n'est pas utilisé ici : c'est la page auteur, le pivot
          E-E-A-T du site, et son ouverture doit poser l'identité plutôt que
          d'enchaîner sur du texte courant. Les trois titres en bandeau, le nom,
          puis la phrase de Vincent sur son double titre — dans la police
          d'accent, réservée aux citations, parce que ce sont ses mots.
          Le fil d'Ariane reste au-dessus : il matérialise la profondeur de clic
          et alimente le `BreadcrumbList` déclaré plus haut. */}
      <section className="px-5 pb-6 pt-12 sm:px-10 lg:px-[100px]">
        <nav aria-label="Fil d'Ariane" className="text-sm text-ardoise">
          <Link href="/" className="underline underline-offset-2">
            Accueil
          </Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page">Vincent Rousseau, psychologue à Nantes</span>
        </nav>

        {/* Carte pleine largeur, bornée par les seules marges de 100 px de la
            page — comme les sections qui suivent, ce qui aligne leurs bords.
            Rythme vertical resserré : en `py-16`, la carte faisait plus de
            340 px de haut pour trois lignes de texte. */}
        <Apparition>
        <div className="mt-8 rounded-[20px] border border-sable bg-creme px-6 py-10 text-center sm:px-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
            {praticien.titres.join(" · ")}
          </p>

          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
            {/* Interpolé en une seule chaîne : deux expressions JSX voisines
                produisent deux nœuds texte séparés par un commentaire HTML
                dans le rendu. Sans conséquence, mais le H1 de la page auteur
                est le titre le plus lu par les moteurs — autant qu'il soit
                d'un seul tenant. */}
            {`${praticien.nom}, psychologue à ${cabinet.ville}`}
          </h1>

          <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

          {/* La carte occupe toute la largeur, la phrase non : `max-w-3xl`
              tient sur deux lignes plutôt que trois, sans devenir illisible.
              Centrée, une ligne trop longue oblige l'œil à chercher le début
              de la suivante. */}
          <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
            {praticien.doubleTitre}
          </p>
        </div>
        </Apparition>
      </section>

      {/* 1. MA PRATIQUE, avec l'œuvre en vis-à-vis.
          L'image vit dans la même rangée de grille que le texte et s'étire à sa
          hauteur (`h-full` + `fill` + `object-cover`) au lieu d'imposer la
          sienne. Auparavant elle était haute de 821 px et débordait largement
          sous le propos qu'elle accompagne. */}
      <section aria-labelledby="ma-pratique" className="px-5 py-10 sm:px-10 lg:px-[100px]">
        {/* `max-w-6xl` : sans borne, la colonne de texte occupe 7/12 d'un
            écran large — près de 970 px — alors que `prose-clinique` limite la
            ligne à 68 caractères. Le texte s'arrêtait donc bien avant l'image,
            laissant un vide de près de 400 px entre les deux. La borne ramène
            la colonne à la largeur de lecture, et les deux blocs se répondent. */}
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-16">
          <Apparition className="lg:col-span-7">
            <div className="prose-clinique">
              <h2 id="ma-pratique" className="!mt-0">
                Ma pratique
              </h2>
              <p>
                Je suis psychologue clinicien et psychanalyste, installé en libéral à{" "}
                {cabinet.ville}. Mes consultations s&rsquo;adressent {publics.libelle}, sur
                rendez-vous et en présentiel.
              </p>
              <p>
                Mon référentiel de travail est la psychanalyse. Cela ne veut pas dire que
                j&rsquo;applique une méthode identique à chacun&nbsp;: cela veut dire que
                j&rsquo;accorde une place centrale à votre parole et à ce qu&rsquo;elle dit
                de votre histoire, plutôt qu&rsquo;au seul traitement du symptôme. Le
                travail se construit avec vous, à partir de ce que vous apportez.
              </p>
            </div>
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <aside className="h-full">
            <figure className="flex h-full flex-col">
              {/* `flex-1` sur le conteneur et `fill` sur l'image : c'est la
                  colonne de texte qui fixe la hauteur, la légende restant sous
                  le cadre. `min-h` évite l'écrasement quand le texte est court
                  ou l'écran étroit. */}
              <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/matisse-detail-nature-morte.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-ardoise">
                Henri Matisse, <cite>Nature morte d&rsquo;après « La Desserte » de Jan
                Davidsz. de Heem</cite> (1915), détail.
              </figcaption>
            </figure>
            </aside>
          </Apparition>
        </div>
      </section>

      {/* 2. POURQUOI CONSULTER — texte intégral de Vincent, demandé par lui
          sur cette page (décision client du 2026-09-08).

          ⚠️ CE TEXTE EST AUSSI LE CONTENU DE /psychologue-clinicien-nantes/,
          qu'il occupait déjà sur WordPress derrière l'entrée de menu
          « À propos ». Les deux pages portent donc aujourd'hui le même texte.
          C'est un doublon interne assumé, pas un oubli : voir POINT-ETAPE § 8.

          MISE EN PAGE reprise de la page WordPress d'origine — titre large,
          texte à gauche, œuvre à droite, points de réassurance et appel à
          l'action centrés dessous — avec trois différences :
            - l'œuvre est un Matisse du domaine public, et non le Miró du site
              actuel, sous droits jusqu'en 2054 et filigrané « WahooArt » ;
            - elle est en `sticky` : le texte fait six paragraphes, une image
              figée en haut de colonne laisserait un vide de plusieurs écrans ;
            - le gras systématique de l'original est supprimé. Souligner une
              phrase sur deux ne souligne plus rien, et sur un sujet clinique
              cela finit par ressembler à de l'argumentaire.

          La citation de Rückert est écrite « pécher » et non « pêcher » comme
          sur le site d'origine : le vers dit qu'avancer en boitant n'est pas
          une faute. Avec l'accent circonflexe, il ne veut plus rien dire. */}
      <section
        aria-labelledby="pourquoi-consulter"
        /* `creme` vaut #fdf9f6, soit la couleur demandée (#fdf9f5) à un point
           de bleu près — écart invisible à l'œil. On réutilise le jeton de la
           palette plutôt que d'introduire une seconde crème quasi identique :
           la palette est extraite du CSS d'origine et doit le rester. */
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        {/* Pleine largeur, bornée par les seules marges de 100 px de la page —
            pas de `max-w-6xl` ici, contrairement aux sections voisines. */}
        <div>
          <Apparition>
            <h2
              id="pourquoi-consulter"
              className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Pourquoi consulter&nbsp;? Qu&rsquo;est-ce que je propose&nbsp;?
            </h2>
            <div className="mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </Apparition>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Apparition className="lg:col-span-7">
              {/* `max-w-none` : sans cela, `prose-clinique` borne la ligne à 68
                  caractères et le texte se serrerait à gauche d'une colonne
                  devenue bien plus large, laissant le vide que la pleine
                  largeur cherchait justement à supprimer. Contrepartie assumée :
                  sur un très grand écran, les lignes deviennent longues. */}
              <div className="prose-clinique max-w-none">
            <p>
              Ce qui motive généralement quelqu&rsquo;un à consulter un psychologue
              clinicien est qu&rsquo;il éprouve un ou plusieurs symptômes qui perturbent sa
              vie quotidienne et auxquels il reconnaît une causalité psychique. Un symptôme,
              c&rsquo;est en premier lieu quelque chose qui engendre une souffrance — et la
              gamme est large&nbsp;: mal-être diffus, anxiété, dépression, idées noires,
              obsessions, difficultés comportementales (anorexie, addiction, TOC,
              comportement violent), phobies diverses.
            </p>
            <p>
              Certaines difficultés peuvent se déployer plus spécifiquement sur un axe
              relationnel&nbsp;: difficulté d&rsquo;insertion sociale ou professionnelle,
              sentiment de malaise en société, tendance au repli sur soi, sentiment de
              persécution, agoraphobie.
            </p>
            <p>
              Enfin, le problème pour lequel on vient consulter peut être chronique comme
              passager, car la vie est faite de périodes de crises, de choix,
              d&rsquo;obstacles de toutes sortes et de deuils qui nous confrontent à
              nous-mêmes et à notre détresse, et que nous pouvons parfois avoir du mal à
              surmonter seuls.
            </p>
            <p>
              Il est important de comprendre que <strong>tout le monde a des symptômes et
              que cela est normal</strong> (<em>«&nbsp;Boiter n&rsquo;est pas pécher&nbsp;»</em>,
              dit le poète Friedrich Rückert). J&rsquo;irai jusqu&rsquo;à dire qu&rsquo;ils
              peuvent avoir une fonction positive et enrichir la vie. Mais il peut arriver
              que cela ne «&nbsp;tienne plus&nbsp;», que le symptôme devienne trop
              envahissant, trop douloureux. C&rsquo;est à ce moment qu&rsquo;il peut être
              pertinent de venir consulter un psychologue clinicien.
            </p>
            <p>
              Le travail psychothérapeutique avec un professionnel est alors
              l&rsquo;occasion d&rsquo;explorer un autre aspect du symptôme&nbsp;: son sens.
              Plutôt qu&rsquo;un simple parasite indésirable — même s&rsquo;il peut être
              ressenti comme tel — il dit étrangement quelque chose de nous, de notre
              subjectivité. Il est en quelque sorte une parole qui attend d&rsquo;être
              délivrée.
            </p>
            <p>
              Je vous propose une approche thérapeutique consistant en un dispositif de
              parole et d&rsquo;écoute, dans un cadre professionnel entièrement confidentiel
              et non jugeant. En s&rsquo;appuyant sur vos propres ressources, soutenues par
              la présence et les interventions du thérapeute, le processus a pour objectif
              d&rsquo;amener au jour ce qui vous pose question et vous divise à travers vos
              symptômes, et de dépasser cette souffrance qui vous pousse à consulter.
              D&rsquo;une certaine manière, nous pouvons dire que le traitement consiste à
              vous «&nbsp;guérir&nbsp;» en devenant un peu plus vous-même.
            </p>
              </div>
            </Apparition>

            <Apparition delai={120} className="lg:col-span-5">
              <aside className="h-full">
              {/* Même traitement que la section « Ma pratique » : le cadre
                  s'étire à la hauteur de la colonne de texte (`h-full` sur la
                  figure, `flex-1` sur le conteneur) au lieu d'imposer la
                  sienne. Un rapport fixe — `aspect-[4/5]` — donnait une image
                  qui dépassait le texte de deux cents pixels. `min-h` la
                  protège de l'écrasement quand la colonne est courte. */}
              <figure className="flex h-full flex-col">
                <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/matisse-femme-devant-aquarium-1921.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-ardoise">
                  Henri Matisse, <cite>Femme devant un aquarium</cite> (1921-1923).
                </figcaption>
              </figure>
              </aside>
            </Apparition>
          </div>

          {/* Les quatre points de réassurance, sous les deux colonnes.

              Ils répondent aux questions que l'on n'ose pas poser avant
              d'appeler, et ils appellent le contact — d'où le bouton dans le
              même bloc.

              Disposition en deux colonnes sur toute la largeur de la carte :
              en une seule colonne bornée à `max-w-3xl`, la liste flottait au
              milieu d'un grand aplat vide qui donnait à la carte l'air d'un
              conteneur mal rempli. Chaque puce reçoit une pastille blanche,
              qui lui donne du poids sur le fond pêche. */}
          <Apparition>
          <div className="mt-14 rounded-[20px] bg-peche px-6 py-10 sm:px-12 sm:py-12">
            <ul className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
              {[
                "Je reçois toute personne qui le demande.",
                "La confidentialité des séances est strictement garantie selon les principes de la pratique.",
                "La première rencontre est l'occasion d'éclaircir ensemble la situation et de déterminer la manière dont nous procéderons.",
                "Il vous suffit de me contacter pour convenir d'un rendez-vous.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-4 text-encre">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-valide"
                  >
                    <IconeValidation className="h-5 w-5" />
                  </span>
                  <span className="pt-1">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/70 pt-9 text-center">
              <Bouton href="/contact-psychologue-clinicien-nantes/">Me contacter</Bouton>
            </div>
          </div>
          </Apparition>
        </div>
      </section>

      {/* 2. LES TROIS TITRES — section propre, pleine largeur.
          Elle était auparavant coincée dans la colonne de 7/12, ce qui donnait
          trois cartes empilées et très étroites. En pleine largeur, elles se
          lisent côte à côte et se comparent, ce qui est tout leur objet. */}
      {/* Fond `lin` sur toute la largeur : la bande détache la section des deux
          blocs de prose qui l'encadrent. Les cartes sont en blanc pur : sur
          `lin`, elles se détachent franchement au lieu de s'y fondre — le
          `creme` d'origine en était trop proche.
          Contrastes vérifiés : sur lin, bois 5,2:1 et ardoise 8,9:1 ; sur
          blanc, valide 5,22:1 et terracotta-fonce 6,17:1. */}
      <section
        aria-labelledby="les-titres"
        className="bg-lin px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        {/* Pas de `max-w-6xl` ici, contrairement aux deux sections de prose qui
            l'encadrent : la bande occupe toute la largeur, bornée par les seules
            marges de 100 px de la page. Les trois cartes gagnent ainsi de la
            place et se comparent mieux.

            Le chapeau est centré et conserve sa largeur de lecture : centrer
            trois lignes reste confortable, ce qui ne serait pas le cas d'un
            paragraphe long. */}
        <Apparition>
        <div className="prose-clinique mx-auto text-center">
          <h2 id="les-titres" className="!mt-0">
            Les trois titres sous lesquels j&rsquo;exerce
          </h2>
          <p>
            Le vocabulaire des «&nbsp;psy&nbsp;» est confus, et cette confusion permet à des
            personnes sans formation reconnue de se présenter comme thérapeutes. Voici
            précisément ce que recouvrent les miens.
          </p>
        </div>
        </Apparition>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            <li className="h-full">
                <Apparition className="h-full">
                  <div className="h-full rounded-[20px] bg-white p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-valide">
                <IconeValidation className="h-4 w-4" />
                Titre protégé par la loi
              </p>
              <p className="mt-2 text-lg font-bold text-encre">Psychologue clinicien</p>
              <p className="mt-2 text-ardoise">
                Titre universitaire protégé depuis 1985, permettant l&rsquo;inscription au
                répertoire des professionnels de santé. Il atteste d&rsquo;une compétence
                reconnue en psychopathologie — la science des troubles psychiques — et
                d&rsquo;une écoute formée à la singularité de chacun.
              </p>
            </div>
                </Apparition>
              </li>
            <li className="h-full">
                <Apparition delai={120} className="h-full">
                  <div className="h-full rounded-[20px] bg-white p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-valide">
                <IconeValidation className="h-4 w-4" />
                Titre protégé par la loi depuis 2010
              </p>
              <p className="mt-2 text-lg font-bold text-encre">Psychothérapeute</p>
              <p className="mt-2 text-ardoise">
                Il correspond à une compétence reconnue dans le soin psychique, et suppose
                une inscription sur un registre national. Il se distingue de celui de{" "}
                <em>psychopraticien</em>, librement utilisable, qui ne résulte
                d&rsquo;aucun cursus universitaire et n&rsquo;est pas reconnu par
                l&rsquo;État.
              </p>
            </div>
                </Apparition>
              </li>
            <li className="h-full">
                <Apparition delai={240} className="h-full">
                  <div className="h-full rounded-[20px] bg-white p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-terracotta-fonce">
                <IconeValidation className="h-4 w-4" />
                Méthode de travail — titre non protégé
              </p>
              <p className="mt-2 text-lg font-bold text-encre">Psychanalyste</p>
              <p className="mt-2 text-ardoise">
                Ce titre n&rsquo;est pas protégé par la loi&nbsp;: il indique une méthode,
                la mienne, et repose sur une formation analytique et une appartenance à des
                sociétés de psychanalyse. La psychanalyse est la forme la plus classique
                des thérapies dites «&nbsp;de fond&nbsp;», par opposition aux thérapies
                brèves.
              </p>
            </div>
                </Apparition>
              </li>
          </ul>
      </section>

      {/* 3. LES FAITS VÉRIFIABLES, PUIS LES LIMITES.

          L'ordre et la disposition ont changé. Auparavant, « Ce que je ne fais
          pas » (deux paragraphes) occupait une colonne de 7/12 face à une
          colonne de 5/12 contenant DEUX cartes empilées : la droite était deux
          fois plus haute que la gauche, et la moitié inférieure de la section
          était vide.

          Le bloc d'enregistrement — qui porte l'E-E-A-T et mérite d'être vu —
          passe donc en pleine largeur, ses quatre entrées sur deux colonnes.
          Il devient deux fois moins haut. Restent « Ce que je ne fais pas » et
          « Me joindre », de hauteurs comparables, côte à côte. */}
      <section className="px-5 pb-16 pt-10 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-6xl">
          {/* Bloc de faits vérifiables : numéros d'enregistrement, diplôme,
              rattachements. C'est lui qui porte l'E-E-A-T de la page. */}
          <Apparition>
          <div className="rounded-[20px] bg-lavande p-7 sm:p-9">
            <h2 className="text-base font-bold text-bois">Formation et enregistrement</h2>
            <dl className="mt-6 grid gap-x-10 gap-y-6 text-sm sm:grid-cols-2">
              {ENREGISTREMENTS.map(({ Icone, titre, lignes }) => (
                <div key={titre} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-terracotta-fonce" aria-hidden="true">
                    <Icone />
                  </span>
                  <div>
                    <dt className="font-medium text-encre">{titre}</dt>
                    <dd className="mt-1 text-ardoise">
                      {lignes.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          </Apparition>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Apparition className="lg:col-span-7">
              <div className="prose-clinique">
                <h2 className="!mt-0">Ce que je ne fais pas</h2>
                <p>
                  Je ne reçois ni {publics.nonRecus.join(", ni ")}. Si votre demande concerne
                  l&rsquo;un de ces publics, une ou un collègue spécialisé sera plus indiqué,
                  et votre médecin traitant peut vous orienter.
                </p>
                <p>
                  Je ne prends pas en charge les situations d&rsquo;urgence. En cas de
                  détresse immédiate, le <strong>3114</strong> répond gratuitement à toute
                  heure, et le <strong>15</strong> en cas d&rsquo;urgence vitale.
                </p>
              </div>
            </Apparition>

            <Apparition delai={120} className="lg:col-span-5">
              <aside>
              <div className="rounded-[20px] bg-menthe p-7 sm:p-8">
                <h2 className="text-base font-bold text-bois">Me joindre</h2>
                <address className="mt-3 not-italic text-ardoise">
                  {cabinet.rue}, {cabinet.codePostal} {cabinet.ville}
                  <br />
                  {cabinet.acces.tram}
                </address>
                <p className="mt-4">
                  <a
                    href={`tel:${contact.telephoneE164}`}
                    className="text-lg font-medium text-encre underline underline-offset-4"
                  >
                    {contact.telephone}
                  </a>
                </p>
                <p className="mt-5">
                  <Bouton href="/rendez-vous-psychologue-nantes/">Prendre rendez-vous</Bouton>
                </p>
              </div>
              </aside>
            </Apparition>
          </div>
        </div>
      </section>
    </>
  );
}
