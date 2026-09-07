import Link from "next/link";
import { praticien } from "@/lib/site-config";

/**
 * Signature auteur — vecteur E-E-A-T principal du site.
 *
 * En YMYL santé, l'auteur identifié et titré EST le signal de confiance
 * déterminant. Ce composant est obligatoire au bas de tout article et de tout
 * contenu clinique, et il lie systématiquement vers la page auteur
 * (SEO_MASTER § 5, règle « Signature » : non négociable).
 */
export function AuthorSignature({ modifieLe }: { modifieLe?: string }) {
  return (
    <footer className="mt-12 border-t border-sable pt-6 text-sm text-ardoise">
      <p>
        Écrit par{" "}
        <Link
          href="/vincent-rousseau-psychologue/"
          className="font-semibold text-encre underline underline-offset-2"
        >
          {praticien.nom}
        </Link>
        , {praticien.titres.join(", ").toLowerCase()}.
      </p>
      <p className="mt-1">
        {praticien.diplome.intitule} — {praticien.diplome.etablissement}. Numéro ADELI{" "}
        {praticien.adeli}.
      </p>
      {modifieLe && (
        <p className="mt-2">
          Dernière révision :{" "}
          <time dateTime={modifieLe}>
            {new Date(modifieLe).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>
      )}
    </footer>
  );
}
