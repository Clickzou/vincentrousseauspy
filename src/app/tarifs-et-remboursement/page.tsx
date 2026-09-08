import type { Metadata } from "next";
import Link from "next/link";

import { AuthorSignature } from "@/components/seo/AuthorSignature";
import { Sources, type Source } from "@/components/seo/Sources";
import { PageEnTete } from "@/components/ui/PageEnTete";
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
const MODIFIE_LE = "2026-09-08";

export const metadata: Metadata = {
  title: TITRE,
  description:
    `Honoraires de ${honoraires.min} à ${honoraires.max} € la séance chez ${praticien.nom}, ` +
    `psychologue à ${cabinet.ville}. ${honoraires.modulation} Ce que remboursent ` +
    `l'Assurance Maladie et les mutuelles, et ce qu'est « Mon soutien psy ».`,
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
    return {
      titre: "Je suis psychologue partenaire du dispositif",
      texte:
        `Les séances réalisées dans ce cadre sont au tarif conventionnel de ` +
        `${monSoutienPsy.tarifSeance} €. Je vous remets une feuille de soins à ` +
        `transmettre à votre caisse, qui vous rembourse ${monSoutienPsy.tauxAssuranceMaladie} %. ` +
        `Le reste relève de votre complémentaire santé.`,
    };
  }
  if (partenaire === false) {
    return {
      titre: "Je ne suis pas partenaire du dispositif",
      texte:
        "Les séances au cabinet ne relèvent donc pas de « Mon soutien psy ». " +
        "Si ce cadre correspond à ce que vous cherchez, l'annuaire de l'Assurance " +
        "Maladie recense les psychologues qui y participent, et je peux vous orienter.",
    };
  }
  return {
    titre: "Ma participation au dispositif",
    texte:
      "Le dispositif suppose que le psychologue en soit partenaire. Appelez-moi ou " +
      "posez-moi la question avant votre premier rendez-vous : je vous répondrai " +
      "clairement, et je vous orienterai si ce cadre est celui qu'il vous faut.",
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

      <PageEnTete
        titre="Tarifs et remboursement"
        chapeau={
          `Une consultation coûte entre ${honoraires.min} et ${honoraires.max} €. ` +
          `${honoraires.modulation} Le reste de cette page explique ce qui est remboursé, ` +
          `par qui, et ce qui ne l'est pas.`
        }
      />

      {/* 1. LE PRIX, EN PREMIER ET SANS DÉTOUR. C'est la réponse attendue par
          la requête ; la faire attendre serait une manœuvre. */}
      <section aria-labelledby="honoraires" className="px-5 pb-4 pt-6 sm:px-10 lg:px-[100px]">
        <div className="rounded-[20px] bg-peche px-6 py-10 sm:px-12">
          <h2 id="honoraires" className="text-2xl font-bold text-bois">
            Le prix d&rsquo;une séance
          </h2>
          <p className="mt-6 text-4xl font-bold tracking-tight text-encre sm:text-5xl">
            {honoraires.min} à {honoraires.max} €
          </p>
          <p className="mt-4 max-w-lecture text-ardoise">
            {honoraires.modulation} Le montant se fixe lors du premier rendez-vous, et il
            n&rsquo;est pas figé&nbsp;: si votre situation change, dites-le-moi. Une séance
            dure {seance.duree}.
          </p>
          <p className="mt-4 max-w-lecture text-sm text-ardoise">
            Il n&rsquo;y a ni frais de dossier, ni majoration, ni forfait d&rsquo;engagement.
            Vous réglez à chaque séance.
          </p>
        </div>
      </section>

      {/* 2. LE REMBOURSEMENT. Sujet où la désinformation est courante : on
          énonce d'abord ce qui NE l'est pas, parce que c'est la mauvaise
          surprise qu'il faut éviter. */}
      <section
        aria-labelledby="remboursement"
        className="px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="remboursement" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce qui est remboursé, et ce qui ne l&rsquo;est pas
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            Une consultation chez un psychologue en libéral{" "}
            <strong>n&rsquo;est pas remboursée par l&rsquo;Assurance Maladie</strong> au
            titre du régime général, contrairement à une consultation chez un médecin ou un
            psychiatre. C&rsquo;est la règle, et il vaut mieux le savoir avant qu&rsquo;après.
          </p>
          <p>Il existe deux exceptions, qui ne se recouvrent pas.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[20px] border border-sable p-6 sm:p-8">
            <h3 className="text-lg font-bold text-encre">Votre complémentaire santé</h3>
            <p className="mt-3 text-ardoise">
              De nombreuses mutuelles prennent en charge tout ou partie des séances de
              psychologue, souvent sous forme d&rsquo;un forfait annuel. Les conditions
              varient beaucoup d&rsquo;un contrat à l&rsquo;autre.
            </p>
            <p className="mt-3 text-sm text-ardoise">
              Le plus sûr est de leur poser la question directement, en demandant la prise
              en charge des « consultations de psychologue ». Je vous remets un justificatif
              si votre contrat l&rsquo;exige.
            </p>
          </div>

          <div className="rounded-[20px] bg-lavande p-6 sm:p-8">
            <h3 className="text-lg font-bold text-encre">
              Le dispositif « Mon soutien psy »
            </h3>
            <p className="mt-3 text-ardoise">
              L&rsquo;Assurance Maladie prend en charge jusqu&rsquo;à{" "}
              {monSoutienPsy.seancesParAn} séances par année civile, chez un psychologue
              partenaire du dispositif, au tarif de {monSoutienPsy.tarifSeance} € la séance.
              Elle rembourse {monSoutienPsy.tauxAssuranceMaladie} %, le reste relevant de
              votre complémentaire.
            </p>
            <p className="mt-3 text-ardoise">
              {monSoutienPsy.adressageMedicalRequis
                ? "Une consultation médicale préalable est nécessaire."
                : "Depuis juin 2024, vous n'avez plus besoin d'être adressé par un médecin : l'accès est direct."}
            </p>

            <div className="mt-5 rounded-[20px] bg-white/70 p-5">
              <p className="font-medium text-encre">{msp.titre}</p>
              <p className="mt-2 text-sm leading-relaxed text-ardoise">{msp.texte}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LE COÛT RÉEL DANS LE TEMPS. Question que tout le monde se pose et
          que personne ne pose : une thérapie, ça coûte combien en tout ? */}
      <section
        aria-labelledby="dans-le-temps"
        className="bg-creme px-5 py-14 sm:px-10 sm:py-16 lg:px-[100px]"
      >
        <h2 id="dans-le-temps" className="text-2xl font-bold text-bois sm:text-[33px]">
          Ce que cela représente dans le temps
        </h2>

        <div className="prose-clinique mt-6">
          <p>
            C&rsquo;est une question légitime, et rarement posée à voix haute. La durée
            d&rsquo;un travail ne se fixe pas d&rsquo;avance&nbsp;: elle dépend de ce qui
            vous amène et de ce qui se dénoue. Personne ne peut sérieusement vous annoncer
            un nombre de séances au premier rendez-vous.
          </p>
          <p>
            Ce que je peux vous dire, en revanche&nbsp;: le rythme le plus courant est{" "}
            {seance.rythmeCourant}, le montant tient compte de vos moyens, et il se
            réajuste si votre situation change. Si le coût devient un obstacle au travail,
            c&rsquo;est un sujet dont nous pouvons parler en séance — comme le reste.
          </p>
          <p>
            <Link href="/consultations/">Comment se déroulent les consultations</Link>, et{" "}
            <Link href="/aide-faq/">les autres questions fréquentes</Link>.
          </p>
        </div>
      </section>

      {/* 4. CONVERSION SOBRE. Aucun argument de prix : § 2.2. */}
      <section aria-labelledby="prendre-rdv" className="px-5 py-16 sm:px-10 lg:px-[100px]">
        <div className="max-w-lecture">
          <h2 id="prendre-rdv" className="text-2xl font-bold text-bois sm:text-[33px]">
            Une question sur les tarifs&nbsp;?
          </h2>
          <p className="mt-4 text-ardoise">
            Vous pouvez me la poser au téléphone avant de prendre rendez-vous. Cela
            n&rsquo;engage à rien, et c&rsquo;est souvent plus simple qu&rsquo;un échange
            écrit.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <Sources sources={SOURCES} />
          <AuthorSignature modifieLe={MODIFIE_LE} />
        </div>
      </section>
    </>
  );
}
