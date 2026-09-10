import { IconeLienExterne } from "@/components/ui/Icones";
import { PlanDiffere } from "@/components/ui/PlanDiffere";
import { adressePostale } from "@/lib/site-config";

/**
 * PLAN GOOGLE MAPS INTERACTIF — demandé par Vincent le 2026-09-10.
 *
 * ⚠️ CE COMPOSANT CHARGE GOOGLE MAPS SANS CONSENTEMENT PRÉALABLE. C'est un
 * choix explicite du client, réaffirmé après mise en garde le 2026-09-10.
 *
 * Ce que cela implique, pour qui reprendrait ce fichier :
 *  - dès qu'un visiteur ouvre une page portant ce composant, son navigateur
 *    contacte les serveurs de Google, qui reçoivent son adresse IP, son
 *    agent utilisateur et l'URL consultée. Sur un site de psychologue, cela
 *    signale à un tiers qu'une personne donnée consulte la page d'un
 *    praticien ;
 *  - c'est un transfert de données à un tiers, et il doit être déclaré. La
 *    section « Contenus tiers » de /politique-de-confidentialite/ le dit :
 *    ne pas retirer ce paragraphe tant que ce composant est monté ;
 *  - le responsable de traitement est Vincent, pas l'agence.
 *
 * `differe` restaure le chargement au clic (« click-to-load »), la solution
 * que la CNIL admet et qui ne transmet rien tant que le visiteur n'a pas
 * demandé la carte. Le mécanisme est conservé pour qu'un retour en arrière
 * coûte un booléen, pas une réécriture : `<PlanCabinet differe />`.
 *
 * Le lien « ouvrir l'itinéraire » reste proposé à côté : il sert à qui veut un
 * trajet porte à porte, ce qu'une carte encastrée ne donne pas.
 */

/** Lien de plan externe, repris du site actuel (docs/donnees-vincent.md § 2). */
export const PLAN_URL = "https://goo.gl/maps/DQ4LPE52wByQV3i29";

/**
 * URL d'intégration sans clé d'API ni compte Google Cloud. `output=embed` est
 * l'ancienne forme, toujours servie, et la seule qui n'exige pas de facturation.
 * La requête porte l'adresse postale, pas des coordonnées : c'est elle que le
 * visiteur reconnaît si la carte se recentre.
 */
export const URL_CARTE =
  "https://maps.google.com/maps?output=embed&hl=fr&z=16&q=" +
  encodeURIComponent(`${adressePostale}, France`);

export function PlanCabinet({
  className = "",
  differe = false,
}: {
  className?: string;
  /** Repasse au chargement au clic : rien n'est transmis avant l'action du visiteur. */
  differe?: boolean;
}) {
  return (
    <div className={className}>
      {differe ? (
        <PlanDiffere />
      ) : (
        <div className="overflow-hidden rounded-[20px] bg-lin">
          <iframe
            src={URL_CARTE}
            title={`Plan d'accès au cabinet, ${adressePostale}`}
            /* `lazy` : la carte n'est demandée qu'à l'approche du champ de
               vision. Sur l'accueil elle est en troisième écran — inutile de
               peser sur le chargement initial, que Google mesure. */
            loading="lazy"
            /* Aucun référent transmis : Google apprend qu'une carte est
               demandée, pas depuis quelle page du site. C'est le minimum qui
               reste possible une fois le chargement automatique acté. */
            referrerPolicy="no-referrer"
            className="block h-[360px] w-full border-0 sm:h-[420px]"
          />
        </div>
      )}

      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <a
          href={PLAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-terracotta-fonce underline underline-offset-4"
        >
          <IconeLienExterne className="h-4 w-4" />
          Ouvrir l&rsquo;itinéraire dans Google Maps
          <span className="sr-only"> (nouvelle fenêtre)</span>
        </a>
        {/* Mention d'information, et non de consentement : la carte est déjà
            chargée quand on la lit. Elle reste obligatoire — le visiteur doit
            pouvoir savoir qu'un tiers est intervenu sur la page. */}
        {!differe && (
          <span className="text-ardoise">
            Plan fourni par Google Maps.{" "}
            <a
              href="/politique-de-confidentialite/#tiers"
              className="underline underline-offset-4"
            >
              Ce que cela transmet
            </a>
          </span>
        )}
      </p>
    </div>
  );
}
