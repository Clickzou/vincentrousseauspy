# POINT D'ÉTAPE — 7 septembre 2026

Reprise du projet : lire ce fichier, puis `docs/seo/SEO_MASTER_VINCENT_ROUSSEAU.md` (§ 0 et § 2).

```bash
cd "C:/Users/jc/Documents/CLICKZOU/1- PROJETS/PSY/v2 ia"
npm run dev            # http://localhost:3000
```

> **Ne jamais lancer `next build` pendant que `npm run dev` tourne** : les deux écrivent
> dans `.next` et le serveur retourne alors des 500. En cas de problème :
> arrêter le serveur, `rm -rf .next`, relancer.

---

## 1. CE QUI EST FAIT

### Analyse et documentation
- **Extraction du `.wpress`** (523 Mo, 13 444 fichiers) — `tools/extract_wpress.py`
- **Inventaire du site WordPress** — `docs/seo/inventaire-wordpress.md`
- **Données factuelles de Vincent** — `docs/donnees-vincent.md`
- **Contenu Elementor page par page** — `docs/contenu-actuel/*.md`
- **Master SEO adapté** — `docs/seo/SEO_MASTER_VINCENT_ROUSSEAU.md`
- **Positions de départ** — `docs/seo/positions-actuelles.csv` (38 mots-clés)

### Socle technique
Next.js 15 (App Router) · Tailwind · TypeScript strict · aucun CMS · déploiement Vercel prévu.

| Fichier | Rôle |
|---|---|
| `src/lib/site-config.ts` | **Source unique** des données du cabinet |
| `src/lib/content/faq.ts` | 14 questions fusionnées des deux FAQ du site actuel |
| `src/lib/content/oeuvres.ts` | Œuvres du carrousel, toutes domaine public |
| `src/lib/seo/schemas.ts` | JSON-LD LocalBusiness / Person / Article / FAQPage |
| `src/lib/sitemap-data.ts` | Registre des 17 URLs |
| `src/lib/url-helpers.ts` | Trailing slash, canonical, `minusculeInitiale` |

### Pages livrées
- **`/`** — accueil complet : hero avec carrousel, 3 portes d'entrée, titres professionnels,
  psychanalyse, ressources, citation, FAQ, CTA
- **`/aide-faq/`** — 14 questions, schéma `FAQPage` (déclaré ici et **nulle part ailleurs**)
- **`/vincent-rousseau-psychologue/`** — page auteur, pivot E-E-A-T

---

## 2. CE QUI RESTE À CONSTRUIRE

**8 pages sont encore en 404**, et la navigation pointe dessus :

| URL | Priorité | Note |
|---|---|---|
| `/rendez-vous-psychologue-nantes/` | **1** | Conversion. 6 boutons y renvoient. Formulaire **sans champ libre ni stockage** (§ 2.4) |
| `/psychotherapeute-nantes/` | **2** | Cluster ~6 600 rech./mois, aujourd'hui porté par la home en position 9 |
| `/consultations/` | 3 | Déroulé, cadre, première séance |
| `/psychanalyste-nantes/` | 3 | **URL existante, positionnée 2e** sur « psychanalyste nantes ». Reprendre le texte long de la home actuelle |
| `/tarifs-et-remboursement/` | 3 | `tarif psychologue nantes` déclenche un Aperçu IA |
| `/contact-psychologue-clinicien-nantes/` | 4 | URL existante, positionnée |
| `/blog/` + `/blog/[slug]/` | 4 | Demandé dès le départ. 2 articles/mois maximum |
| `/mentions-legales/`, `/politique-de-confidentialite/`, `/plan-du-site/` | 5 | Rapides. **Ajouter le n° ADELI aux mentions légales**, absent aujourd'hui |

### Autres chantiers
- **Citation René Char et CTA final** : passés en pleine largeur mais jamais redesignés — les deux blocs les plus faibles de l'accueil
- **Redirections** : les 7 articles de démo anglais → 410 (partiellement câblé dans `next.config.ts`)
- **Analytics sans cookie** (Plausible ou Umami) — cf. § 2.4 du master
- **Déploiement Vercel**

---

## 3. EN ATTENTE DE VINCENT — BLOQUANT POUR LA MISE EN LIGNE

1. **Validation de tous les textes cliniques.** Sa responsabilité professionnelle est engagée (§ 7.1).
2. **Mon soutien psy** : est-il partenaire du dispositif ? La réponse actuelle décrit
   le dispositif sans l'affirmer (`src/lib/content/faq.ts`).
3. **ADELI ou RPPS** : le répertoire ADELI est en cours de remplacement pour les psychologues.
4. **Accessibilité PMR** : le site actuel dit seulement « tient compte des normes ».
   Une personne concernée a besoin d'un fait concret (plain-pied ? ascenseur ?).
5. **Coordonnées GPS** du cabinet, pour le `geo` du JSON-LD.
6. **Visuels** : valider le choix Matisse / Kandinsky (cf. § 5 ci-dessous).

## 4. À FAIRE FAIRE PAR L'AGENCE

- **Créer la Search Console** — elle n'existe pas, pas plus qu'Analytics. Elle ne rétroagit
  pas sur l'historique : plus tôt elle est créée, plus on aura de données avant la bascule.
- **Récupérer les accès Google Business Profile** — levier n°1 sur toutes les requêtes
  à Local pack (§ 6 du master).

---

## 5. DÉCISIONS ACTÉES — NE PAS REVENIR DESSUS SANS RAISON

| Décision | Motif |
|---|---|
| **Aucune page programmatique** | Doorway pages en YMYL. Volume cible 25-40 pages, plafond 60 |
| **Adultes uniquement (18 ans+)** | Vincent ne reçoit ni enfants, ni adolescents, ni couples |
| **Ne pas cibler « psychiatre »** | Titre non détenu (§ 2.2) |
| **Ne pas cibler « psychopraticien »** | Titre non protégé — dilue un positionnement fondé sur deux titres protégés |
| **Écrire « psychothérapeute » correctement** | SE Ranking donne 6 600 rech./mois à la graphie fautive : artefact d'agrégation |
| **Pas d'`AggregateRating`, pas de sollicitation d'avis** | Déontologie (§ 2.3) |
| **Pas de type `Physician` en JSON-LD** | Désigne un médecin |
| **Slugs français conservés à l'identique** | Ils portent le référencement |
| **Visuels : Matisse († 1954) et Kandinsky († 1944) uniquement** | **Le Miró et les deux Chagall du site actuel sont sous droits** (2054 et 2056, gérés par l'ADAGP) et leurs fichiers portent un filigrane « WahooArt.com ». Cf. `donnees-vincent.md` § 11 |
| **Schéma `FAQPage` sur `/aide-faq/` seulement** | Éviter deux blocs FAQ concurrents |

---

## 6. RAPPELS TECHNIQUES

- **Palette et polices** extraites du CSS Elementor d'origine, pas estimées à l'œil.
  Roboto (titres et texte), Yesteryear (signature), Abhaya Libre (citations uniquement).
- **Contrastes vérifiés par calcul WCAG**, pas à l'œil. Toute nouvelle couleur de texte
  doit être testée sur les six fonds du site.
- **Ne jamais ajouter une classe Tailwind dont la couleur n'existe pas** dans
  `tailwind.config.ts` : Tailwind ne signale rien, la classe est simplement ignorée.
  C'est ce qui avait cassé le bandeau d'urgence 3114 (`alerte`, `sable`, `brume`).
- **`.wpress` et `_wp_extract/` sont exclus de Git** — 523 Mo et des données personnelles
  (soumissions de formulaires, abonnés newsletter).
