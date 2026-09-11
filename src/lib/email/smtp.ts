/**
 * Envoi SMTP des mails INTERNES à l'agence — même montage que le site Clickzou
 * (`clickzou-v2/src/lib/email/send.ts`), avec les mêmes variables :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 *
 * À ne pas confondre avec `envoi.ts` (Resend), qui porte les demandes de rappel
 * des visiteurs vers Vincent. Ici, rien ne vient d'un visiteur : ce sont des
 * points de suivi du site adressés à l'agence, sans aucune donnée personnelle.
 */
import nodemailer from "nodemailer";

export type MailInterne = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export function smtpConfigure(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** Envoie le mail. Lève en cas d'échec : à l'appelant de décider. */
export async function envoyerMailInterne(mail: MailInterne): Promise<void> {
  if (!smtpConfigure()) {
    throw new Error("SMTP non configuré (SMTP_USER / SMTP_PASS manquants)");
  }
  const transporteur = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });
  const expediteur = process.env.MAIL_FROM ?? process.env.SMTP_USER;
  await transporteur.sendMail({
    from: `"Site Vincent Rousseau" <${expediteur}>`,
    to: mail.to,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  });
}
