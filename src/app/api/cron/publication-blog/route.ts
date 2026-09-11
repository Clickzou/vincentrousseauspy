import { NextResponse } from "next/server";

import { A_PARAITRE, ARTICLES, type Article } from "@/lib/content/blog";
import { envoyerMailInterne, smtpConfigure } from "@/lib/email/smtp";

/**
 * GET /api/cron/publication-blog/ — point de publication du blog, par mail.
 *
 * Appelé par le cron Vercel (`vercel.json`) le 1er et le 15 de chaque mois,
 * c'est-à-dire aux dates de la file `A_PARAITRE`. La publication, elle, reste
 * MANUELLE (validation de Vincent d'abord, § 7.1 du master) : ce mail dit à
 * l'agence si elle a eu lieu.
 *
 * La route lit le registre de la version DÉPLOYÉE : ce qu'elle voit est donc
 * exactement ce qui est en ligne. Un article déplacé dans le code mais jamais
 * déployé est, à juste titre, compté comme non publié.
 *
 * CE QUI DÉCLENCHE UN MAIL :
 *   - un article de la file dont la date prévue est arrivée (NON publié) ;
 *   - un article publié depuis le dernier point (publié).
 * Rien de tout cela → aucun mail. C'est ce qui arrête les envois tout seuls
 * quand la file est épuisée, après avril 2027.
 *
 * `?apercu=1` force l'envoi, pour vérifier que le mail part.
 */

export const dynamic = "force-dynamic";

const DESTINATAIRE = process.env.BLOG_SUIVI_EMAIL ?? "jc@clickzou.fr";

/** Deux points sont espacés de quinze jours au plus ; seize par sécurité. */
const FENETRE_JOURS = 16;

const dateParis = (d: Date) =>
  new Intl.DateTimeFormat("fr-CA", { timeZone: "Europe/Paris" }).format(d); // AAAA-MM-JJ

const dateLisible = (iso: string) => {
  const d = new Date(`${iso}T12:00:00Z`);
  const jour = d.getUTCDate() === 1 ? "1er" : String(d.getUTCDate());
  return `${jour} ${d.toLocaleDateString("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" })}`;
};

const esc = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** L'URL de production Vercel tant que le domaine définitif n'est pas rattaché. */
const baseSite = () =>
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://vincentrousseauspy.vercel.app";

export async function GET(request: Request) {
  /* Vercel joint `Authorization: Bearer <CRON_SECRET>` à ses appels. Sans
     secret configuré, on refuse tout : une route qui envoie des mails ne doit
     pas être ouverte par défaut. */
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const apercu = new URL(request.url).searchParams.get("apercu") === "1";
  const aujourdhui = dateParis(new Date());
  const debut = dateParis(new Date(Date.now() - FENETRE_JOURS * 86_400_000));

  const enRetard = A_PARAITRE.filter((a) => a.publieLe <= aujourdhui);
  const publies = ARTICLES.filter((a) => a.publieLe > debut && a.publieLe <= aujourdhui);
  const prochain = A_PARAITRE.find((a) => a.publieLe > aujourdhui);

  if (!apercu && enRetard.length === 0 && publies.length === 0) {
    return NextResponse.json({ envoye: false, raison: "rien à signaler" });
  }
  if (!smtpConfigure()) {
    return NextResponse.json({ envoye: false, raison: "SMTP non configuré" }, { status: 500 });
  }

  const objet =
    (apercu ? "[Aperçu] " : "") +
    (enRetard.length > 0
      ? `Blog Vincent Rousseau — ${enRetard.length} article${enRetard.length > 1 ? "s" : ""} NON publié${enRetard.length > 1 ? "s" : ""}`
      : publies.length > 0
        ? `Blog Vincent Rousseau — publié : ${publies[0].titre}`
        : "Blog Vincent Rousseau — rien à publier aujourd'hui");

  const ligne = (a: Article, lien: boolean) =>
    `<li style="margin-bottom:8px"><strong>${esc(a.titre)}</strong><br>` +
    `<span style="color:#64748b;font-size:13px">${lien ? "publié le" : "prévu le"} ${dateLisible(a.publieLe)}` +
    (lien ? ` — <a href="${baseSite()}/blog/${a.slug}/">voir l'article</a>` : "") +
    `</span></li>`;

  const bloc = (titre: string, couleur: string, contenu: string) =>
    `<h2 style="font-size:16px;color:${couleur};margin:22px 0 8px">${titre}</h2>${contenu}`;

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:620px;margin:0 auto;color:#0f172a">
  <p style="font-size:15px">Point de publication du blog au ${dateLisible(aujourdhui)}.</p>
  ${enRetard.length > 0 ? bloc("NON publié", "#b91c1c", `<ul>${enRetard.map((a) => ligne(a, false)).join("")}</ul>`) : ""}
  ${publies.length > 0 ? bloc("Publié depuis le dernier point", "#15803d", `<ul>${publies.map((a) => ligne(a, true)).join("")}</ul>`) : ""}
  ${bloc("Prochain", "#0f172a", prochain ? `<ul>${ligne(prochain, false)}</ul>` : "<p>La file est vide : tous les articles prévus sont publiés.</p>")}
  ${enRetard.length > 0 ? `<p style="background:#f8fafc;border-left:3px solid #b91c1c;padding:10px 14px;font-size:14px">Pour publier, après validation du texte par Vincent : dans <code>src/lib/content/blog.ts</code>, déplacer l'article de <code>A_PARAITRE</code> en tête de <code>ARTICLES</code>, mettre <code>publieLe</code> et <code>modifieLe</code> à la date du jour, puis déployer.</p>` : ""}
  <p style="color:#64748b;font-size:12px;margin-top:22px">Mail envoyé le 1er et le 15 de chaque mois par le site lui-même (cron Vercel). Aucun mail quand il n'y a rien à signaler.</p>
</div>`;

  const texte = [
    `Point de publication du blog au ${dateLisible(aujourdhui)}.`,
    enRetard.length > 0
      ? `\nNON PUBLIÉ :\n${enRetard.map((a) => `- ${a.titre} (prévu le ${dateLisible(a.publieLe)})`).join("\n")}`
      : "",
    publies.length > 0
      ? `\nPUBLIÉ :\n${publies.map((a) => `- ${a.titre} (${baseSite()}/blog/${a.slug}/)`).join("\n")}`
      : "",
    `\nPROCHAIN : ${prochain ? `${prochain.titre} (${dateLisible(prochain.publieLe)})` : "file vide"}`,
  ].join("\n");

  try {
    await envoyerMailInterne({ to: DESTINATAIRE, subject: objet, html, text: texte });
  } catch (e) {
    return NextResponse.json(
      { envoye: false, erreur: e instanceof Error ? e.message : "SMTP en échec" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    envoye: true,
    destinataire: DESTINATAIRE,
    nonPublies: enRetard.map((a) => a.slug),
    publies: publies.map((a) => a.slug),
    prochain: prochain?.slug ?? null,
  });
}
