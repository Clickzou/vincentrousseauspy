/**
 * Build de vérification, isolé du serveur de développement.
 *
 * POURQUOI CE SCRIPT EXISTE. `next dev` et `next build` écrivent tous les deux
 * dans `.next/`. Lancer un build pendant que le serveur de dev tourne remplace
 * sous ses pieds les chunks qu'il référence, et la page suivante s'ouvre sur
 * « Cannot find module './195.js' » — une erreur qui ne vient ni du code ni de
 * la configuration, et qui coûte du temps à diagnostiquer. C'est arrivé le
 * 8 septembre 2026.
 *
 * `npm run build:check` compile dans `.next-check/` : le dossier du serveur de
 * dev n'est jamais touché, et les deux peuvent tourner en même temps.
 *
 * `npm run build` reste inchangé — c'est lui qui produit le build de
 * production, et Vercel l'appelle tel quel.
 *
 * Pas de dépendance ajoutée (`cross-env` aurait suffi, mais le projet évite
 * les dépendances évitables) : Node passe la variable d'environnement à
 * l'enfant, ce qui fonctionne aussi bien sous PowerShell que sous bash.
 */
import { spawn } from "node:child_process";

const DIST = ".next-check";

const enfant = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["next", "build"],
  {
    stdio: "inherit",
    env: { ...process.env, NEXT_DIST_DIR: DIST },
    // `shell` sous Windows : sans lui, npx.cmd n'est pas exécutable directement.
    shell: process.platform === "win32",
  },
);

enfant.on("exit", (code) => {
  if (code === 0) {
    console.log(`\n✓ Build de vérification réussi (sortie dans ${DIST}/).`);
    console.log("  Le serveur de développement n'a pas été perturbé.");
  }
  process.exit(code ?? 1);
});
