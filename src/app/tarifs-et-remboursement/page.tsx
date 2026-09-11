import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Sources, type Source } from "@/components/seo/Sources";
import { Apparition } from "@/components/ui/Apparition";
import { breadcrumbSchema, graph } from "@/lib/seo/schemas";
import {
  cabinet,
  contact,
  honoraires,
  monSoutienPsy,
  praticien,
  seance,
} from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /tarifs-et-remboursement/ — PAGE NOUVELLE (SEO_MASTER § 3.2, silo 4).
 *
 * Le site actuel n'a AUCUNE page tarifs, alors que « tarif psychologue nantes »
 * et « psychologue nantes tarif » sont en position 4-5 et que l'un des deux
 * déclenche un Aperçu IA. C'est une réponse factuelle attendue : si elle n'est
 * pas sur le site, elle est produite ailleurs, sans nous.
 *
 * TON. Le § 2.2 est explicite : afficher ses honoraires est légitime et
 * attendu, mais sans argumentaire de vente ni comparaison avec d'autres
 * praticiens. La page d'accueil WordPress écrit aujourd'hui « un psychanalyste
 * facture généralement entre 30 et 80 euros » : c'est de la publicité
 * comparative, elle n'est pas reprise.
 *
 * FIABILITÉ. Les conditions de « Mon soutien psy » sont vérifiées sur ameli.fr
 * (cf. `monSoutienPsy.verifieLe`) et sourcées en bas de page. Le dispositif a
 * déjà changé plusieurs fois : toute révision de cette page commence par une
 * revérification, jamais par la mémoire.
 *
 * CONTENU À VALIDER PAR VINCENT avant mise en ligne (§ 7.1).
 */

const TITRE = "Tarifs et remboursement";
const MODIFIE_LE = "2026-09-11";

export const metadata: Metadata = {
  title: TITRE,
  /* La description ouvrait sur les honoraires et dépassait 250 caractères.
     Elle mène désormais par le remboursement : `psychologue remboursement`
     (1 078/mois) devance `psychologue prix` (986), et la question du
     remboursement est celle qui inquiète avant la consultation. */
  description:
    `Un psychologue est-il remboursé ? Assurance Maladie, « Mon soutien psy » et ` +
    `mutuelles. Honoraires de ${honoraires.min} à ${honoraires.max} € la séance à ` +
    `${cabinet.ville}.`,
  alternates: { canonical: canonical("tarifs-et-remboursement") },
  openGraph: {
    title: `${TITRE} — ${praticien.nom}`,
    url: canonical("tarifs-et-remboursement"),
  },
};

const SOURCES: Source[] = [
  {
    titre: "Remboursement de séances chez le psychologue : dispositif Mon soutien psy",
    editeur: `Assurance Maladie (ameli.fr) — conditions vérifiées le ${monSoutienPsy.verifieLe}`,
    href: monSoutienPsy.urlAmeli,
  },
  {
    titre: "Le remboursement des séances de psychologues — Mon soutien psy",
    editeur: "Ministère du Travail, de la Santé et des Solidarités",
    href: "https://sante.gouv.fr/prevention-en-sante/sante-mentale/prendre-soin-de-sa-sante-mentale-accompagnement-et-parcours-de-prise-en-charge/article/le-remboursement-des-seances-de-psychologues-mon-soutien-psy",
  },
];

/**
 * Texte affiché pour « Mon soutien psy » selon la participation de Vincent.
 * Les trois cas sont écrits d'avance pour que la page reste exacte sans
 * attendre sa réponse : il n'y a qu'un booléen à basculer dans site-config.
 */
function participation(partenaire: boolean | null) {
  if (partenaire === true) {
    /* Titre et texte dans la formulation de Vincent du 2026-09-11 : le tarif
       et le taux de remboursement sont déjà dits juste au-dessus, dans la
       même carte, et n'étaient qu'une redite. */
    return {
      titre: "Ma participation au dispositif",
      texte:
        "Je suis partenaire de ce dispositif public pour une partie de mon activité. " +
        "N'hésitez pas à m'en parler avant notre premier rendez-vous : nous ferons le " +
        "point ensemble pour vérifier si ce cadre réglementé correspond à votre situation " +
        "et à vos besoins.",
      /*
       * ⚠️ CETTE PRÉCISION N'EST PAS UN DÉTAIL. Le reste de la page annonce
       * une fourchette modulable et une première séance gratuite : les deux
       * sont vraies HORS dispositif, et fausses à l'intérieur. Une personne
       * qui arrive par « Mon soutien psy » en croyant sa première séance
       * gratuite découvrirait le contraire au moment de payer — c'est
       * exactement la mauvaise surprise que cette page existe pour éviter.
       *
       * ⚠️ FORMULATION SOUMISE À VINCENT LE 2026-09-10, EN ATTENTE DE SA
       * VALIDATION : c'est lui qui applique la convention, pas nous. Son
       * document du 2026-09-11 ne la reprend pas — il a été rédigé sur une
       * version antérieure au 10, où elle n'existait pas encore. Elle est
       * donc conservée, et la question lui est reposée.
       */
      reserve:
        `Ce tarif est fixé par l'Assurance Maladie : il n'est donc pas modulable, ` +
        `contrairement à celui des séances hors dispositif. Pour la même raison, la ` +
        `gratuité de la première séance ne s'applique pas à un suivi engagé dans ce ` +
        `cadre.`,
    };
  }
  if (partenaire === false) {
    return {
      titre: "Je ne suis pas partenaire du dispositif",
      texte:
        "Les séances au cabinet ne relèvent donc pas de « Mon soutien psy ». " +
        "Si ce cadre correspond à ce que vous cherchez, l'annuaire de l'Assurance " +
        "Maladie recense les psychologues qui y participent, et je peux vous orienter.",
      reserve: null,
    };
  }
  return {
    titre: "Ma participation au dispositif",
    texte:
      "Le dispositif suppose que le psychologue en soit partenaire. Appelez-moi ou " +
      "posez-moi la question avant votre premier rendez-vous : je vous répondrai " +
      "clairement, et je vous orienterai si ce cadre est celui qu'il vous faut.",
    reserve: null,
  };
}

export default function TarifsEtRemboursement() {
  const jsonLd = graph(
    breadcrumbSchema([
      { nom: "Accueil", url: "/" },
      { nom: TITRE, url: "tarifs-et-remboursement" },
    ]),
  );

  const msp = participation(monSoutienPsy.partenaire);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* EN-TÊTE EN CARTE, comme les autres pages du site. */}
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
              Honoraires · Mutuelles · Mon soutien psy
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-bois sm:text-[40px]">
              Tarifs et remboursement
            </h1>

            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mx-auto mt-5 max-w-3xl font-accent text-lg italic leading-relaxed text-ardoise sm:text-xl">
              {/* Texte de Vincent du 2026-09-11, rédigé sur une version où la
                  gratuité de la première séance n'était pas encore annoncée.
                  Elle est rétablie en tête : un prix affiché sans elle serait
                  faux par omission (règle posée dans `honoraires`). */}
              La première séance est gratuite. Une consultation au cabinet coûte ensuite
              entre {honoraires.min} et {honoraires.max} €. Le tarif tient compte des moyens
              financiers de chacun. Les sections suivantes détaillent le fonctionnement des
              honoraires ainsi que les différentes possibilités de prise en charge.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 1. LE PRIX, EN PREMIER ET SANS DÉTOUR. C'est la réponse attendue par
          la requête ; la faire attendre serait une manœuvre. */}
      {/* Le prix, et juste à côté, à qui l'on s'adresse.

          La signature auteur était en note de bas de page, en petits
          caractères, après les sources. Or une personne qui hésite sur
          40-60 € veut savoir en même temps qui elle paie : le titre, le
          diplôme et le numéro ADELI font partie de la décision. C'est aussi ce
          que demande le § 9.4 du master pour les pages de conversion.
          Déplacement, pas duplication — le bloc n'apparaît plus en bas. */}
      <section aria-labelledby="honoraires" className="px-5 py-6 sm:px-10 lg:px-[100px]">
        <div className="grid gap-6 lg:grid-cols-12">
          <Apparition className="lg:col-span-7">
            <div className="h-full rounded-[20px] bg-peche px-6 py-10 sm:px-12">
              <h2 id="honoraires" className="text-2xl font-bold text-bois">
                Le prix d&rsquo;une séance
              </h2>

              {/* La gratuité de la première séance est annoncée AVANT la
                  fourchette (décision de Vincent du 2026-09-10) : elle est la
                  première chose qui concerne la personne qui arrive, et la
                  placer après le prix en ferait une note de bas de page.
                  Énoncée comme un fait, sans vocabulaire d'offre — § 2.2. */}
              <p className="mt-6 text-3xl font-bold tracking-tight text-encre sm:text-4xl">
                Première séance&nbsp;: gratuite
              </p>
              <p className="mt-1 text-ardoise">Sans engagement pour la suite.</p>

              <p className="mt-6 border-t border-white/70 pt-6 text-xs font-medium uppercase tracking-[0.18em] text-terracotta-fonce">
                Séances suivantes
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-encre sm:text-5xl">
                {honoraires.min} à {honoraires.max} €
              </p>
              {/* Pas de `max-w-lecture` ici : la carte fait déjà la largeur d'une
                  colonne de 7/12, et la borne de lecture arrêtait le texte bien
                  avant son bord droit. */}
              <p className="mt-4 text-ardoise">
                Le tarif tient compte des moyens financiers de chacun. Le montant se fixe
                lors du premier rendez-vous et il n&rsquo;est pas figé&nbsp;: si votre
                situation change, nous pourrons en reparler. Une séance dure {seance.duree}.
                Vous réglez à chaque séance.
              </p>
              {/* Le moyen de paiement vient du correctif du 2026-09-10 : il est
                  absent du document du 11, rédigé sur une version antérieure. */}
              <p className="mt-4 text-sm text-ardoise">
                Le règlement se fait par chèque ou en espèces&nbsp;; le cabinet ne dispose
                pas de terminal de carte bancaire.
              </p>

              {/* Renvoi vers la réserve, dans le bloc même où l'on lit
                  « gratuite » et « 40 à 60 € ». Sans lui, une personne éligible
                  au dispositif quitte cette carte avec deux chiffres qui ne la
                  concernent pas. */}
              {monSoutienPsy.partenaire === true && (
                <p className="mt-6 border-t border-white/70 pt-6 text-sm text-ardoise">
                  Ces montants valent pour un suivi hors dispositif public. Si votre suivi
                  relève de{" "}
                  <Link
                    href="#remboursement"
                    className="text-terracotta-fonce underline underline-offset-2"
                  >
                    «&nbsp;Mon soutien psy&nbsp;»
                  </Link>
                  , la séance est au tarif conventionnel de {monSoutienPsy.tarifSeance} €.
                </p>
              )}
            </div>
          </Apparition>

          <Apparition delai={120} className="lg:col-span-5">
            <AuthorSignature modifieLe={MODIFIE_LE} variante="encadre" />
          </Apparition>
        </div>
      </section>

      {/* 2. LE REMBOURSEMENT. Sujet où la désinformation est courante : on
          énonce d'abord ce qui NE l'est pas, parce que c'est la mauvaise
          surprise qu'il faut éviter. */}
      <section
        aria-labelledby="remboursement"
        /* `mt-10` : c'est une marge EXTERNE, avant la bande. Un simple `pt`
           n'aurait fait que descendre le texte à l'intérieur d'un aplat qui,
           lui, commençait toujours au ras de la carte pêche. Le blanc doit
           séparer les deux blocs, pas s'ajouter dans le second. */
        className="mt-10 bg-creme px-5 py-14 sm:mt-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition>
          <div className="mx-auto max-w-lecture text-center">
            <h2
              id="remboursement"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce qui est remboursé, et ce qui ne l&rsquo;est pas
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />

            <p className="mt-6 text-left text-ardoise">
              Une consultation chez un psychologue en libéral{" "}
              <strong>n&rsquo;est pas remboursée par l&rsquo;Assurance Maladie</strong> au
              titre du régime général, contrairement à un rendez-vous chez un médecin ou un
              psychiatre. Il est préférable de le savoir avant d&rsquo;engager un suivi.
            </p>
            <p className="mt-4 text-ardoise">
              Il existe cependant deux possibilités de prise en charge distinctes.
            </p>
          </div>
        </Apparition>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-sable p-6 sm:p-8">
            <h3 className="text-lg font-bold text-encre">Votre complémentaire santé</h3>
            <p className="mt-3 text-ardoise">
              De nombreuses mutuelles prennent en charge tout ou partie des séances de
              psychologie, le plus souvent sous la forme d&rsquo;un forfait annuel. Les
              conditions varient selon les contrats.
            </p>
            <p className="mt-3 text-sm text-ardoise">
              Le plus simple est de poser directement la question à votre organisme en
              demandant les modalités pour les «&nbsp;consultations de psychologue&nbsp;». Je
              vous remets un justificatif si votre contrat l&rsquo;exige.
            </p>
          </div>

          <div className="rounded-[20px] bg-lavande p-6 sm:p-8">
            <h3 className="text-lg font-bold text-encre">
              Le dispositif « Mon soutien psy »
            </h3>
            <p className="mt-3 text-ardoise">
              L&rsquo;Assurance Maladie prend en charge jusqu&rsquo;à{" "}
              {monSoutienPsy.seancesParAn} séances par année civile chez un psychologue
              partenaire du dispositif, au tarif réglementé de {monSoutienPsy.tarifSeance} €
              la séance. Elle rembourse {monSoutienPsy.tauxAssuranceMaladie} %, le reste
              étant généralement couvert par votre mutuelle.
            </p>
            <p className="mt-3 text-ardoise">
              {monSoutienPsy.adressageMedicalRequis
                ? "Une consultation médicale préalable est nécessaire."
                : "L'accès est direct et se fait sans ordonnance médicale."}
            </p>

            <div className="mt-5 rounded-[20px] bg-white/70 p-5">
              <p className="font-medium text-encre">{msp.titre}</p>
              <p className="mt-2 text-sm leading-relaxed text-ardoise">{msp.texte}</p>
              {/* La réserve est détachée par un filet, et non fondue dans le
                  paragraphe : elle contredit deux annonces faites plus haut
                  sur la page, elle doit se voir. */}
              {msp.reserve && (
                <p className="mt-3 border-t border-lavande pt-3 text-sm leading-relaxed text-ardoise">
                  {msp.reserve}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Troisième bloc, pleine largeur sous les deux cartes : c'est la
            confusion la plus fréquente sur cette question, et elle mérite
            mieux qu'une incise. Pas de chiffre de prise en charge pour le
            psychiatre — il dépend du parcours de soins et du secteur, et une
            page de tarifs n'a pas à avancer un taux qu'elle ne source pas. */}
        <Apparition delai={160}>
          <div className="mx-auto mt-6 max-w-4xl rounded-[20px] border border-sable bg-white p-6 sm:p-8">
            <h3 className="text-lg font-bold text-encre">
              Le titre du praticien change-t-il le remboursement&nbsp;?
            </h3>

            <p className="mt-4 text-ardoise">
              <strong>Ce n&rsquo;est pas le titre affiché qui détermine la prise en charge,
              mais la profession réglementée du praticien.</strong> C&rsquo;est une confusion
              fréquente qui peut réserver des surprises.
            </p>

            <p className="mt-4 text-ardoise">
              Le psychiatre étant médecin, sa consultation est prise en charge par
              l&rsquo;Assurance Maladie au titre du régime général.{" "}
              <strong>
                Le psychologue, le psychothérapeute non-médecin et le psychanalyste ne le
                sont pas.
              </strong>{" "}
              Les deux options présentées ci-dessus (mutuelles ou dispositif public) sont les
              seules voies de remboursement ouvertes.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-ardoise">
              <li>
                «&nbsp;Psychothérapeute&nbsp;» n&rsquo;est pas une profession de santé
                supplémentaire&nbsp;: c&rsquo;est un titre officiel qui s&rsquo;ajoute à un
                diplôme universitaire préexistant. Il ne crée aucun droit au remboursement
                par lui-même.
              </li>
              <li>
                «&nbsp;Psychanalyste&nbsp;» désigne une méthode de travail et ne relève pas
                d&rsquo;un diplôme d&rsquo;État. Quant au dispositif «&nbsp;Mon soutien
                psy&nbsp;», il est exclusivement réservé aux <strong>psychologues</strong>{" "}
                partenaires.
              </li>
            </ul>

            <p className="mt-4 text-sm text-ardoise">
              <Link
                href="/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/"
                className="text-terracotta-fonce underline underline-offset-2"
              >
                Ce que recouvre chacun de ces titres, et lequel est protégé
              </Link>
              .
            </p>
          </div>
        </Apparition>
      </section>

      {/* 3. LE COÛT RÉEL DANS LE TEMPS. Question que tout le monde se pose et
          que personne ne pose : une thérapie, ça coûte combien en tout ? */}
      <section
        aria-labelledby="dans-le-temps"
        /* Blanc, et non plus crème : la section précédente ayant pris le fond
           crème, deux bandes identiques accolées n'en formeraient plus qu'une. */
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <Apparition className="mx-auto max-w-lecture">
          <div className="text-center">
            <h2
              id="dans-le-temps"
              className="text-2xl font-bold leading-tight tracking-tight text-bois sm:text-[33px]"
            >
              Ce que cela représente dans le temps
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-terracotta" aria-hidden="true" />
          </div>

          <div className="prose-clinique mt-8">
            <p className="!mt-0">
              C&rsquo;est une question légitime. La durée totale d&rsquo;un suivi ne se fixe
              pas d&rsquo;avance&nbsp;: elle dépend entièrement de ce qui vous amène et du
              rythme auquel les choses se dénouent. Personne ne peut sérieusement vous
              annoncer un nombre précis de séances lors d&rsquo;un premier rendez-vous.
            </p>
            <p>
              Ce que je peux vous dire, en revanche, c&rsquo;est que le cadre est pensé pour
              être soutenant. Chaque consultation dure {seance.duree} et le rythme des
              séances est {seance.rythme}, afin de préserver la continuité indispensable de
              votre travail psychique.
            </p>
            <p>
              Le montant des honoraires tient compte de vos moyens dès le départ, et il
              n&rsquo;est pas figé&nbsp;: si votre situation financière change, nous pourrons
              tout à fait en reparler. Si le coût devient un obstacle à la continuité du
              suivi, c&rsquo;est un sujet dont nous discutons ensemble en séance — au même
              titre que le reste.
            </p>
            <p>
              <Link href="/consultations/">Comment se déroulent les consultations</Link>,
              et <Link href="/aide-faq/">les autres questions fréquentes</Link>.
            </p>
          </div>
        </Apparition>
      </section>

      {/* 4. CONVERSION SOBRE. Aucun argument de prix : § 2.2 — sur une page de
          tarifs, le moindre « profitez-en » serait déplacé. La carte reprend
          le modèle des autres pages : texte centré, filet, boutons. */}
      <section aria-labelledby="prendre-rdv" className="px-5 pb-10 sm:px-10 lg:px-[100px]">
        <Apparition>
          <div className="rounded-[20px] bg-peche px-6 py-10 text-center sm:px-12 sm:py-12">
            <h2 id="prendre-rdv" className="text-2xl font-bold text-bois sm:text-[33px]">
              Une question sur les tarifs&nbsp;?
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-encre">
              Vous pouvez tout à fait me la poser par téléphone avant de prendre
              rendez-vous. Cet échange préalable n&rsquo;engage à rien et permet de faire le
              point ensemble.
            </p>

            <div className="mt-9 border-t border-white/70 pt-9">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${contact.telephoneE164}`}
                  className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre"
                >
                  {contact.telephone}
                </a>
                <Link
                  href="/rendez-vous-psychologue-nantes/"
                  className="rounded-full border border-bois px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bois"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        </Apparition>
      </section>

      {/* Sources : colonne de lecture centrée. C'est un appareil de notes. */}
      <section className="px-5 pb-16 sm:px-10 lg:px-[100px]">
        <div className="mx-auto max-w-lecture">
          <Sources sources={SOURCES} />
        </div>
      </section>
    </>
  );
}
