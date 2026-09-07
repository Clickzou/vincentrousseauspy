import type { Config } from "tailwindcss";

/**
 * Palette et typographie REPRISES DU SITE ACTUEL.
 *
 * Les valeurs ne sont pas estimées à l'œil : elles sont extraites du CSS
 * généré par Elementor (`_wp_extract/uploads/elementor/css/*.css`), donc
 * strictement fidèles à l'identité existante — décision validée le 2026-09-07 :
 * on garde l'identité visuelle et la palette, on retravaille l'ordre et la
 * densité des blocs.
 */
export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* Accent principal — boutons et liens d'action (15 occurrences). */
        terracotta: {
          DEFAULT: "#e2ab7f",
          clair: "#ffbc7d",
          /* Version texte de l'accent. #e2ab7f est trop clair pour du texte ;
             #a9673a ne suffisait pas non plus (4,48:1 sur blanc, 3,66:1 sur
             peche). Cette valeur passe AA sur les six fonds du site :
             blanc 6,17 - peche 5,03 - lavande 5,11 - menthe 5,40 - creme 5,89
             - lin 5,53. Verifie par calcul WCAG, pas a l'oeil. */
          fonce: "#8f5228",
        },
        /* Titres de section (15 occurrences). */
        bois: {
          DEFAULT: "#8d5858",
          brun: "#8a5d39",
          profond: "#6d4321",
        },
        /* Fonds de section alternés. */
        menthe: "#e5f3ed",
        peche: "#f7e5d7",
        lavande: "#e5eaf3",
        creme: "#fdf9f6",
        ivoire: "#f9f8f6",
        lin: "#f5f2ef",
        /* Filets et bordures : valeur intermédiaire entre peche et lin. */
        sable: "#e8e3da",
        /*
         * Réservé au bandeau d'urgence (3114 / 15). C'est le seul endroit du
         * site où une couleur d'alerte est justifiée — ailleurs, la palette
         * reste chaude et sobre (§ 2.1 et § 9.2 du master : informer sans
         * dramatiser). Contraste vérifié : 7,61:1 sur blanc, 7,27 sur crème,
         * 6,82 sur lin, 6,21 sur pêche.
         */
        alerte: "#8c3a2e",
        /*
         * Vert de validation, réservé aux DEUX titres protégés par la loi.
         * Contraste vérifié : 5,22:1 sur blanc, 4,98:1 sur crème.
         */
        valide: "#2f7a52",
        /* Texte. */
        encre: "#222222",
        ardoise: "#474849",
      },
      fontFamily: {
        /* Signature manuscrite du logo et du hero (Yesteryear). */
        signature: ["var(--police-signature)", "cursive"],
        /*
         * Titres ET texte courant : Roboto. Releve du CSS d'origine :
         * Roboto 41 occurrences, Abhaya Libre 3, Yesteryear 1. Le H1 du hero
         * est un Roboto bold 66px, pas un serif — c'est ce qui donne au site
         * son allure contemporaine.
         */
        titre: ["var(--police-texte)", "system-ui", "sans-serif"],
        texte: ["var(--police-texte)", "system-ui", "sans-serif"],
        /* Reserve aux quelques accents typographiques (citations). */
        accent: ["var(--police-titre)", "Georgia", "serif"],
      },
      textShadow: {
        /* Technique du site d'origine pour la lisibilite sur les tableaux :
           une ombre portee, PAS un voile sombre qui ecraserait l'oeuvre. */
        hero: "0 0 10px rgba(0,0,0,0.73), 0 1px 2px rgba(0,0,0,0.5)",
      },
      fontSize: {
        base: ["1.0625rem", { lineHeight: "1.75" }],
      },
      maxWidth: {
        lecture: "68ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
