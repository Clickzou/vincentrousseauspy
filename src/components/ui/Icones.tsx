import type { ReactNode } from "react";

/**
 * Jeu d'icônes du site — tracés simples, au trait, dans l'esprit de celles du
 * site d'origine (ampoule, bulles de dialogue, repère de lieu).
 *
 * Elles sont décoratives : le sens est toujours porté par le titre voisin.
 * D'où `aria-hidden` sur le conteneur et aucun texte alternatif.
 */

const traits = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Pastille ronde, utilisée dans l'en-tête. */
export function Pastille({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peche text-bois-brun"
    >
      {children}
    </span>
  );
}

export function IconeTelephone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...traits}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function IconeHorloge() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...traits}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconeLieu() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...traits}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

/** Bulles de dialogue — « ce qui amène à consulter ». */
export function IconeDialogue({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M3 8.5A3.5 3.5 0 0 1 6.5 5h7A3.5 3.5 0 0 1 17 8.5v3a3.5 3.5 0 0 1-3.5 3.5H9l-4 3v-3a2 2 0 0 1-2-2Z" />
      <path d="M17.5 9.5H19a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2 2.45V20l-2.6-2" />
    </svg>
  );
}

/** Ampoule — reprise du site d'origine. */
export function IconeAmpoule({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M9.5 17.5a5.8 5.8 0 0 1-2.3-4.7 4.8 4.8 0 1 1 9.6 0 5.8 5.8 0 0 1-2.3 4.7Z" />
      <path d="M9.8 20.5h4.4M10.4 17.5v3M13.6 17.5v3" />
    </svg>
  );
}

/** Repère de destination — « venir au cabinet ». */
export function IconeDestination({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M21 3 10.5 14.5" />
      <path d="M21 3 14.5 21l-4-6.5L4 10.5Z" />
    </svg>
  );
}

/** Document téléchargeable. */
export function IconeDocument({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M12 12v5M9.5 14.5 12 17l2.5-2.5" />
    </svg>
  );
}

/** Lien vers un site tiers. */
export function IconeLienExterne({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

/* --- Icônes du bloc « Formation et enregistrement » -------------------- */

/** Écusson : déclaration auprès d'une autorité de tutelle. */
export function IconeAtteste({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M12 3.2 19 6v5.2c0 4.3-2.9 8.2-7 9.6-4.1-1.4-7-5.3-7-9.6V6Z" />
      <path d="m9 12 2.1 2.1L15.3 10" />
    </svg>
  );
}

/** Institution : déclaration d'activité libérale. */
export function IconeInstitution({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M3.5 20.5h17M5 20.5V9.8l7-4.3 7 4.3v10.7" />
      <path d="M9.2 12.4h1.6M13.2 12.4h1.6M9.2 16.2h1.6M13.2 16.2h1.6" />
    </svg>
  );
}

/** Toque universitaire : diplôme. */
export function IconeDiplome({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="M12 4 2.5 8.6 12 13.2l9.5-4.6Z" />
      <path d="M6.4 10.9v4.4c0 1.6 2.5 2.9 5.6 2.9s5.6-1.3 5.6-2.9v-4.4" />
      <path d="M21.5 8.6v4.6" />
    </svg>
  );
}

/** Membres : titre professionnel et rattachements associatifs. */
export function IconeAffiliation({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <circle cx="9" cy="8.2" r="3.1" />
      <path d="M3.2 20a5.8 5.8 0 0 1 11.6 0" />
      <path d="M16.2 5.6a3.1 3.1 0 0 1 0 5.9M17.4 14.6c2.1.7 3.4 2.6 3.4 5.4" />
    </svg>
  );
}

/** Chevron des accordéons. */
export function IconeChevron({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...traits}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Pastille de validation : titre reconnu et vérifiable. */
export function IconeValidation({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" fill="currentColor" opacity="0.14" />
      <path
        d="m8.2 12.2 2.6 2.6 5-5.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
