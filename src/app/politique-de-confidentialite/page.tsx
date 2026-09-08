import type { Metadata } from "next";
import Link from "next/link";

import { PageEnTete } from "@/components/ui/PageEnTete";
import { ChoixCookies } from "@/components/rgpd/ChoixCookies";
import { contact, editeur, mesureAudience, praticien, priseRdv } from "@/lib/site-config";
import { canonical } from "@/lib/url-helpers";

/**
 * /politique-de-confidentialite/ — PAGE NOUVELLE, en `noindex`.
 * Remplace /politique-de-cookies-ue/, qui était vide (redirigée en 301).
 *
 * PARTI PRIS : cette page décrit surtout CE QUI N'EST PAS COLLECTÉ. Sur un
 * site de psychologue, c'est l'information utile — le § 2.4 le demande
 * explicitement. Une politique standard qui énumère des traitements
 * inexistants inquiète au lieu de rassurer.
 *
 * ⚠️ UNE POLITIQUE DE CONFIDENTIALITÉ FAUSSE EST PLUS GRAVE QUE PAS DE
 * POLITIQUE. Cette page décrivait un état figé à sa rédaction — aucun cookie,
 * aucune mesure d'audience. Or la mesure se branche en posant une variable
 * d'environnement dans Vercel, SANS TOUCHER AU CODE : la page serait devenue
 * fausse sans que personne n'ait de raison de la rouvrir.
 *
 * Les passages concernant les cookies dépendent donc de `mesureAudience`, et
 * non d'un texte écrit une fois pour toutes. Ils disent la vérité avant comme
 * après le branchement.
 *
 * RESTENT À METTRE À JOUR À LA MAIN, faute d'être détectables automatiquement :
 *   - l'ajout d'une carte, d'une vidéo ou de tout contenu tiers embarqué ;
 *   - le passage à une plateforme de prise de rendez-vous.
 */

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  /* Canonique auto-référente MÊME EN `noindex` : sans elle, la page hérite
     du `alternates.canonical: "/"` du layout et désigne l'accueil comme sa
     version canonique — un signal faux, même sur une page non indexée. */
  alternates: { canonical: canonical("politique-de-confidentialite") },
  robots: { index: false, follow: true },
};

function H2({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mt-12 text-xl font-bold text-bois">
      {children}
    </h2>
  );
}

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <PageEnTete
        centre
        titre="Politique de confidentialité"
        chapeau={
          `Ce site est volontairement pauvre en données. Voici, précisément, ce qu'il ne ` +
          `collecte pas — et le peu qu'il transmet quand vous le lui demandez.`
        }
      />

      {/* Colonne centrée, alignée sur l'en-tête — cf. commentaire dans
          mentions-legales/page.tsx. */}
      <div className="prose-clinique mx-auto px-5 pb-16 sm:px-10">
        <div className="mt-4 rounded-[20px] bg-menthe p-6 sm:p-8">
          <p className="font-bold text-encre">En résumé</p>
          <ul className="mt-4 space-y-2 text-ardoise">
            {[
              ...(mesureAudience.identifiant
                ? [
                    "Aucun cookie n'est déposé tant que vous n'avez pas accepté, et refuser se fait en un clic.",
                    "Les seuls cookies possibles sont ceux des statistiques de fréquentation. Aucun cookie publicitaire.",
                  ]
                : [
                    "Aucun cookie n'est déposé, y compris publicitaire ou de mesure d'audience.",
                    "Aucun outil de statistiques n'est installé. Personne ne compte vos visites.",
                  ]),
              "Aucune base de données : le site n'enregistre rien, nulle part.",
              "Le formulaire ne comporte aucune zone de message, et son contenu n'est pas stocké.",
              "Les polices de caractères sont hébergées avec le site : votre adresse IP n'est transmise à aucun tiers.",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <H2 id="pourquoi">Pourquoi tant de précautions</H2>
        <p className="mt-4">
          Ce que traverse une personne qui consulte un psychologue relève de sa santé.
          Le droit européen classe ces informations parmi les données sensibles, dont le
          traitement est en principe interdit. Un site public n&rsquo;a pas vocation à en
          recevoir, et l&rsquo;hébergement d&rsquo;un site vitrine n&rsquo;est pas agréé
          pour cela.
        </p>
        <p className="mt-4">
          La façon la plus sûre de protéger ces informations est de ne jamais les
          collecter. C&rsquo;est le principe qui a présidé à la construction de ce site.
        </p>

        <H2 id="formulaire">Le formulaire de rappel</H2>
        <p className="mt-4">
          C&rsquo;est le seul endroit du site où vous pouvez saisir quelque chose. Il
          demande trois informations&nbsp;: un nom, un numéro de téléphone, et les moments
          où vous pouvez être rappelé. Une adresse e-mail peut être ajoutée, elle est
          facultative.
        </p>
        <p className="mt-4">
          Il ne comporte <strong>aucune zone de texte libre</strong>. Ce n&rsquo;est pas un
          oubli&nbsp;: c&rsquo;est ce qui garantit que vous ne pouvez pas confier au site
          ce qui doit se dire de vive voix.
        </p>
        <p className="mt-4">
          Ce que vous saisissez est transmis par courrier électronique à {praticien.nom},
          puis n&rsquo;existe plus sur le site&nbsp;: rien n&rsquo;est écrit en base,
          rien n&rsquo;est conservé dans un fichier, rien n&rsquo;est journalisé. La
          transmission passe par un prestataire d&rsquo;envoi de courriels, qui n&rsquo;en
          conserve pas le contenu au-delà du temps de l&rsquo;acheminement. Vous
          n&rsquo;avez donc ni compte à supprimer, ni mot de passe à retenir.
        </p>
        <p className="mt-4">
          Le message reçu vit ensuite dans la boîte de courrier de {praticien.nom}, comme
          n&rsquo;importe quel courriel, et sert uniquement à vous rappeler{" "}
          {priseRdv.delaiReponse}.
        </p>

        {/* L'ancre reste `#mesure` : la bannière de consentement et le lien
            « Politique de cookies » du pied de page y renvoient. */}
        <H2 id="mesure">Cookies et mesure d&rsquo;audience</H2>

        {mesureAudience.identifiant ? (
          <>
            <p className="mt-4">
              Ce site utilise Google Analytics pour compter les visites et savoir quelles
              pages sont consultées. C&rsquo;est la seule raison pour laquelle un cookie
              peut être déposé ici. Il n&rsquo;y a aucun traceur publicitaire, aucun
              bouton de réseau social, et rien qui suive votre navigation sur d&rsquo;autres
              sites.
            </p>
            <p className="mt-4">
              <strong>Rien n&rsquo;est déposé avant votre accord.</strong> Tant que vous
              n&rsquo;avez pas répondu, ou si vous refusez, le script de Google n&rsquo;est
              même pas téléchargé&nbsp;: aucune donnée ne part. Le site fonctionne
              exactement de la même façon dans les deux cas, formulaire et prise de
              rendez-vous compris.
            </p>
            <p className="mt-4">
              Ces cookies sont déposés par Google&nbsp;: ils portent des noms commençant
              par <code>_ga</code> et durent jusqu&rsquo;à treize mois. Votre adresse IP est
              tronquée avant traitement. Votre choix est conservé sur votre appareil
              pendant six mois, puis la question vous est reposée. Vous pouvez en changer
              à tout moment ci-dessous, et supprimer les cookies déjà présents depuis les
              réglages de votre navigateur.
            </p>

            <ChoixCookies />
          </>
        ) : (
          <>
            <p className="mt-4">
              Aucune. Il n&rsquo;y a sur ce site ni Google Analytics, ni équivalent, ni
              traceur publicitaire. Personne ne sait quelles pages vous avez lues, et
              aucune bannière de cookies ne vous est présentée — il n&rsquo;y aurait
              rien à vous demander.
            </p>
            <p className="mt-4">
              La propriété du site est en revanche vérifiée auprès de Google Search
              Console, au moyen d&rsquo;une simple balise dans le code de la page. Elle ne
              dépose rien, ne vous suit pas, et ne permet de connaître que les termes de
              recherche qui mènent au site, de manière agrégée et anonyme.
            </p>
          </>
        )}

        <H2 id="tiers">Contenus tiers</H2>
        <p className="mt-4">
          Le site n&rsquo;encastre ni carte, ni vidéo, ni bouton de réseau social. La carte
          du cabinet est un simple lien&nbsp;: elle ne s&rsquo;ouvre que si vous cliquez, et
          rien n&rsquo;est transmis avant. Les polices de caractères sont servies depuis le
          site lui-même et non par un service extérieur, ce qui évite que votre adresse IP
          soit communiquée à un tiers à votre insu.
        </p>

        <H2 id="hebergement">Hébergement et journaux techniques</H2>
        <p className="mt-4">
          Le site est hébergé par {editeur.hebergeur.nom} ({editeur.hebergeur.adresse}).
          Comme tout serveur, celui-ci tient des journaux techniques de connexion, destinés
          à la sécurité et au bon fonctionnement du service. {praticien.nom} n&rsquo;y a pas
          accès pour vous identifier et ne les exploite pas.
        </p>

        <H2 id="vos-droits">Vos droits</H2>
        <p className="mt-4">
          Vous disposez d&rsquo;un droit d&rsquo;accès, de rectification, d&rsquo;effacement
          et d&rsquo;opposition sur les données vous concernant. En pratique, la seule
          donnée susceptible d&rsquo;exister est le courriel issu du formulaire&nbsp;: pour
          en demander la suppression, écrivez à{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> ou appelez le{" "}
          <a href={`tel:${contact.telephoneE164}`}>{contact.telephone}</a>.
        </p>
        <p className="mt-4">
          Le dossier clinique éventuellement constitué dans le cadre d&rsquo;un suivi est
          d&rsquo;une autre nature&nbsp;: il relève du secret professionnel et du code de
          déontologie des psychologues, et non de ce site. Cette question se traite
          directement avec {praticien.nom}.
        </p>
        <p className="mt-4">
          Vous pouvez également introduire une réclamation auprès de la Commission
          nationale de l&rsquo;informatique et des libertés (CNIL),{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          .
        </p>

        <p className="mt-12 text-sm">
          <Link href="/mentions-legales/">Mentions légales</Link>
          {" · "}
          <Link href="/rendez-vous-psychologue-nantes/">Prendre rendez-vous</Link>
          {" · "}
          <Link href="/consultations/">Les consultations</Link>
        </p>
      </div>
    </>
  );
}
