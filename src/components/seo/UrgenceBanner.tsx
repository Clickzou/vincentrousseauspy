import { urgence } from "@/lib/site-config";

/**
 * Bandeau d'urgence — OBLIGATOIRE sur toute page traitant d'un sujet à risque
 * (dépression, idées suicidaires, troubles alimentaires, addictions, violences).
 * Cf. SEO_MASTER § 2.1, point 5.
 *
 * Composant unique et réutilisé : ne jamais recopier ce texte dans une page.
 * Ton volontairement neutre — informer sans dramatiser (§ 9.4).
 */
export function UrgenceBanner() {
  const { preventionSuicide, secours, secoursEurope } = urgence;

  return (
    <aside
      role="note"
      aria-label="Numéros d'urgence"
      className="my-8 rounded-lg border-l-4 border-alerte bg-lin px-5 py-4"
    >
      <p className="font-medium text-encre">Besoin d&rsquo;une aide immédiate ?</p>
      <p className="mt-2 text-ardoise">
        Si vous traversez une situation de détresse, le{" "}
        <a
          href={`tel:${preventionSuicide.numero}`}
          className="font-semibold text-alerte underline underline-offset-2"
        >
          {preventionSuicide.numero}
        </a>{" "}
        ({preventionSuicide.libelle}) répond à toute heure. En cas d&rsquo;urgence vitale,
        composez le{" "}
        <a
          href={`tel:${secours.numero}`}
          className="font-semibold text-alerte underline underline-offset-2"
        >
          {secours.numero}
        </a>{" "}
        ({secours.libelle}) ou le{" "}
        <a
          href={`tel:${secoursEurope.numero}`}
          className="font-semibold text-alerte underline underline-offset-2"
        >
          {secoursEurope.numero}
        </a>
        .
      </p>
      <p className="mt-2 text-sm text-ardoise">
        Ces lignes sont gratuites et confidentielles. Le cabinet ne reçoit pas les urgences.
      </p>
    </aside>
  );
}
