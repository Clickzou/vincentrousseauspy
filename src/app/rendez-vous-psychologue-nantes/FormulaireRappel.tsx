"use client";

import { useActionState } from "react";

import { CRENEAUX, SITUATIONS } from "@/lib/content/rendez-vous";
import { contact, priseRdv } from "@/lib/site-config";
import { demanderRappel, ETAT_INITIAL } from "./actions";

/**
 * Formulaire de demande de rappel.
 *
 * Ce formulaire ne permet PAS d'écrire un message. Ce n'est pas un oubli :
 * c'est la conséquence directe du § 2.4 du master. Un champ libre sur un
 * site de psychologue collecte des données de santé, que l'hébergement du
 * site n'a pas vocation à traiter. Toute demande d'ajout d'un tel champ doit
 * être refusée et renvoyée à cette note.
 *
 * Le visiteur choisit donc : qui il est, où le joindre, quand le rappeler.
 * Le motif se dit de vive voix — ce qui est aussi, cliniquement, préférable.
 *
 * Sans JavaScript, la soumission fonctionne quand même : `useActionState`
 * s'appuie sur une action serveur, et le navigateur poste le formulaire de
 * manière classique. C'est important pour un public parfois équipé de
 * navigateurs anciens ou de connexions dégradées.
 */

const CHAMP =
  "mt-2 w-full rounded-lg border border-sable bg-white px-4 py-3 text-encre " +
  "placeholder:text-ardoise/60 focus:border-bois";

const ETIQUETTE = "block text-sm font-medium text-encre";

function Erreur({ id, texte }: { id: string; texte?: string }) {
  if (!texte) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-alerte">
      {texte}
    </p>
  );
}

export function FormulaireRappel() {
  const [etat, action, enCours] = useActionState(demanderRappel, ETAT_INITIAL);
  const erreurs = etat.erreurs ?? {};

  return (
    <form action={action} noValidate className="space-y-7">
      {etat.message && (
        <p
          role="alert"
          className="rounded-lg border-l-4 border-alerte bg-white px-5 py-4 text-encre"
        >
          {etat.message}{" "}
          <a
            href={`tel:${contact.telephoneE164}`}
            className="font-semibold text-alerte underline underline-offset-2"
          >
            {contact.telephone}
          </a>
        </p>
      )}

      {/* Piège à robots. `aria-hidden` et `tabIndex` le retirent aussi bien de
          la navigation clavier que des lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="site-web">Ne pas remplir</label>
        <input id="site-web" name="site-web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="nom" className={ETIQUETTE}>
          Votre nom <span className="text-ardoise">(ou le prénom qui vous convient)</span>
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          aria-invalid={Boolean(erreurs.nom)}
          aria-describedby={erreurs.nom ? "erreur-nom" : undefined}
          className={CHAMP}
        />
        <Erreur id="erreur-nom" texte={erreurs.nom} />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="telephone" className={ETIQUETTE}>
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            aria-invalid={Boolean(erreurs.telephone)}
            aria-describedby={erreurs.telephone ? "erreur-telephone" : "aide-telephone"}
            className={CHAMP}
          />
          <p id="aide-telephone" className="mt-2 text-sm text-ardoise">
            C&rsquo;est le numéro que j&rsquo;appellerai. Je ne laisse pas de message
            détaillé sur une messagerie vocale.
          </p>
          <Erreur id="erreur-telephone" texte={erreurs.telephone} />
        </div>

        <div>
          <label htmlFor="email" className={ETIQUETTE}>
            E-mail <span className="text-ardoise">(facultatif)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={120}
            autoComplete="email"
            aria-invalid={Boolean(erreurs.email)}
            aria-describedby={erreurs.email ? "erreur-email" : "aide-email"}
            className={CHAMP}
          />
          <p id="aide-email" className="mt-2 text-sm text-ardoise">
            Utile seulement si vous préférez que je vous écrive pour convenir d&rsquo;un
            horaire.
          </p>
          <Erreur id="erreur-email" texte={erreurs.email} />
        </div>
      </div>

      <fieldset
        aria-invalid={Boolean(erreurs.situation)}
        aria-describedby={erreurs.situation ? "erreur-situation" : undefined}
      >
        <legend className={ETIQUETTE}>Votre demande</legend>
        <div className="mt-3 space-y-3">
          {SITUATIONS.map((s) => (
            <label key={s.id} className="flex items-start gap-3 text-encre">
              <input
                type="radio"
                name="situation"
                value={s.id}
                required
                className="mt-1 h-4 w-4 accent-bois"
              />
              <span>{s.libelle}</span>
            </label>
          ))}
        </div>
        <Erreur id="erreur-situation" texte={erreurs.situation} />
      </fieldset>

      <fieldset
        aria-invalid={Boolean(erreurs.creneaux)}
        aria-describedby={erreurs.creneaux ? "erreur-creneaux" : "aide-creneaux"}
      >
        <legend className={ETIQUETTE}>Quand puis-je vous rappeler&nbsp;?</legend>
        <p id="aide-creneaux" className="mt-1 text-sm text-ardoise">
          Plusieurs choix possibles — plus il y en a, plus le rappel sera rapide.
        </p>
        <div className="mt-3 space-y-3">
          {CRENEAUX.map((c) => (
            <label key={c.id} className="flex items-start gap-3 text-encre">
              <input
                type="checkbox"
                name="creneaux"
                value={c.id}
                className="mt-1 h-4 w-4 accent-bois"
              />
              <span>{c.libelle}</span>
            </label>
          ))}
        </div>
        <Erreur id="erreur-creneaux" texte={erreurs.creneaux} />
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-sm text-ardoise">
          <input
            type="checkbox"
            name="consentement"
            value="oui"
            required
            aria-invalid={Boolean(erreurs.consentement)}
            aria-describedby={erreurs.consentement ? "erreur-consentement" : undefined}
            className="mt-1 h-4 w-4 accent-bois"
          />
          <span>
            J&rsquo;accepte que ces informations soient transmises à Vincent Rousseau par
            e-mail, dans le seul but de me rappeler. Elles ne sont enregistrées dans
            aucune base de données.
          </span>
        </label>
        <Erreur id="erreur-consentement" texte={erreurs.consentement} />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={enCours}
          className="rounded-full bg-terracotta px-8 py-4 text-sm font-semibold uppercase tracking-wider text-encre disabled:opacity-60"
        >
          {enCours ? "Envoi en cours…" : "Demander à être rappelé"}
        </button>
        <p className="text-sm text-ardoise">Réponse {priseRdv.delaiReponse}.</p>
      </div>
    </form>
  );
}
