# INVENTAIRE DU SITE WORDPRESS EXISTANT — PHASE P0

**Date** : 2026-09-07
**Source** : `psychologuenantes-vincentrousseau-fr-20260907-172332-ae0pr6muwtd4.wpress` (523 Mo)
**Extraction** : 13 444 fichiers, 499 Mo — `tools/extract_wpress.py`
**Base** : `_wp_extract/database.sql` (97 Mo) — parsée par `tools/inventaire_wp.py`
**Données de position** : SE Ranking, relevé 2026-09-06 / 2026-09-07 (38 mots-clés suivis)

> Ce document alimente les champs `[À COMPLÉTER]` du `SEO_MASTER_VINCENT_ROUSSEAU.md`.

---

## 1. IDENTITÉ DU SITE

| Champ | Valeur |
|---|---|
| `siteurl` / `home` | `https://psychologuenantes-vincentrousseau.fr` |
| `blogname` | Psychologue Vincent Rousseau Nantes |
| `blogdescription` | **Psychologue clinicien et psychanalyste** |
| `permalink_structure` | `/%postname%/` — **avec trailing slash** |
| Page d'accueil | Statique, `page_on_front` = 739 (`/home-main/`) |
| Articles par page | 10 |

> **Point acquis** : la structure de permaliens est déjà `/%postname%/` avec slash final. C'est
> exactement la cible du § 3.3 du master — **aucune migration de format d'URL n'est nécessaire**.
> C'est le principal risque de refonte, et il est écarté.

---

## 2. STACK TECHNIQUE

| Élément | Détail |
|---|---|
| Thème | **Medcaline** + thème enfant `medcaline-child` |
| Constructeur | **Elementor + Elementor Pro**, Header Footer Elementor |
| SEO | **Yoast** (`wordpress-seo`) |
| RGPD | **Complianz** (`complianz-gdpr`) |
| Sécurité | **Wordfence** |
| Cache | `wp-rocket-off` — **dossier renommé lors de l'incident du 21/08/2026**, plugin toujours hors service |
| Autres | Redux Framework, Classic Editor, Duplicate Post, Child Theme Configurator |

### Tables présentes contenant des données personnelles

À traiter avec précaution et **à ne pas migrer** :

| Table | Contenu | Traitement |
|---|---|---|
| `e_submissions`, `e_submissions_values` | Soumissions des formulaires Elementor | **Données potentiellement de santé.** Ne pas migrer, ne pas versionner. Vérifier la durée de conservation côté WordPress. |
| `newsletter*` (7 tables) | Abonnés du plugin Newsletter | Ne pas migrer sans base légale vérifiée |
| `ppress_customers`, `ppress_orders`, `ppress_subscriptions` | ProfilePress — comptes / commandes | Résidus, à ignorer |
| `cmplz_*` | Configuration Complianz | À reconstruire, pas à migrer |

> ⚠️ **Le `.wpress` (523 Mo) et le dossier `_wp_extract/` ne doivent jamais entrer dans Git.**
> À archiver hors dépôt (§ 10.4 du master).

---

## 3. CONTENUS — VOLUMÉTRIE RÉELLE

### 3.1 Vue d'ensemble

| Type | Statut | Nombre | Nature |
|---|---|---|---|
| `page` | publish | **12** | Le site réel (8 pages de contenu français + 4 utilitaires) |
| `post` | publish | 7 | **Contenu de démonstration du thème, en anglais** |
| `product` | publish | 7 | Démo thème, anglais |
| `service` | publish | 6 | Démo thème, anglais |
| `lq-team` | publish | 6 | Démo thème — **faux psychologues** |
| `case-study` | publish | 6 | Démo thème, anglais |
| `forum` / `topic` / `reply` | publish | 7 / 10 / 4 | Démo bbPress, anglais |
| `elementor_library` | publish | 7 | Templates Elementor |
| `footer` / `elementor-hf` | publish | 2 / 1 | Templates d'en-tête/pied |
| `nav_menu_item` | publish | 14 | Entrées de menu |
| `attachment` | inherit | 148 | Médias |
| `revision` | inherit | 1 045 | Révisions |

**Le site réel tient en 12 pages.** Tout le reste est du contenu de démonstration jamais nettoyé.

### 3.2 Les 12 pages réelles

| URL | Titre | Elementor | Position SEO |
|---|---|---|---|
| `/` (`/home-main/`) | Page d'accueil | 68 Ko | **Porte ~30 requêtes à elle seule** |
| `/psychologue-clinicien-nantes/` | Pourquoi consulter ? Qu'est-ce que je propose ? | 13 Ko | — |
| `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` | Les différents « Psy » | 17 Ko | `psycho analyste clinicien`, `tableau psychologue` |
| `/psychanalyste-nantes/` | Qui, quand et où ? | 10 Ko | `rousseau vincent` (24) |
| `/rendez-vous-psychologue-nantes/` | Prendre RDV | 10 Ko | — |
| `/contact-psychologue-clinicien-nantes/` | Contact | 8 Ko | `vincent rousseau` (37) |
| `/aide-faq/` | Aide & FAQ | 15 Ko | — |
| `/galerie/` | Galerie | 2 Ko | — |
| `/merci-pour-votre-demande/` | Merci pour votre demande ! | 2 Ko | à passer en `noindex` |
| `/mentions-legales/` | Mentions Légales | 6 Ko | `noindex` |
| `/dispositions-legales/` | Dispositions légales | 9 Ko | `noindex` |
| `/politique-de-cookies-ue/` | Politique de cookies (UE) | vide | `noindex` |

> **Tous les slugs français sont bons** (descriptifs, avec mot-clé, en français). **Aucune raison d'en
> changer un seul.** Cf. table de correspondance § 6.

### 3.3 Métadonnées Yoast

**Aucune page ne possède de `title` ni de `metadescription` Yoast personnalisé.** Yoast est installé
mais n'a jamais été configuré au niveau des pages. Les balises actuelles sont donc générées par le
template par défaut.

→ **C'est un gisement immédiat** : rédiger 12 balises `title`/`description` correctes est le
correctif au meilleur rapport effort/impact du projet, et il est indépendant de la refonte.

### 3.4 Réglages d'indexation Yoast

| Réglage | Valeur | Commentaire |
|---|---|---|
| `noindex-post` | 0 | **Les 7 articles de démo anglais sont indexables** |
| `noindex-page` | 0 | Normal |
| `noindex-attachment` | 0 | **À corriger** : les pages de pièces jointes ne doivent pas être indexées |
| `noindex-tax-category` | 0 | Catégories de démo indexables |
| `noindex-tax-post_tag` | 0 | Étiquettes de démo indexables |
| `noindex-archive` | 1 | Correct |
| `noindex-author-wpseo` | 0 | Sitemap auteur actif |

---

## 4. PROBLÈME MAJEUR — CONTENU DE DÉMONSTRATION INDEXABLE

### Ce qui est confirmé public

Le `sitemap_index.xml` du site live référence :

| Sitemap | Dernière modif. | Contenu |
|---|---|---|
| `post-sitemap.xml` | **2020-02-23** | Les 7 articles de démo **en anglais** |
| `page-sitemap.xml` | 2025-10-29 | Les 12 pages réelles |
| `category-sitemap.xml` | 2020-02-23 | Catégories de démo |
| `post_tag-sitemap.xml` | 2020-02-23 | Étiquettes de démo |
| `author-sitemap.xml` | 2024-05-21 | Archive auteur |
| `elementor-hf-sitemap.xml` | 2025-01-07 | Template d'en-tête |

**Bonne nouvelle** : aucun sitemap pour `service`, `product`, `lq-team`, `case-study`, `forum`,
`topic`. L'absence de règles de réécriture pour ces types confirme qu'ils **ne sont pas publics** —
les faux membres d'équipe (« Angela Nguyen », « Kevin Stiller »…) et les fausses études de cas ne sont
donc pas exposés.

**Mauvaise nouvelle** : les **7 articles de démonstration en anglais sont bien indexables** et dans le
sitemap depuis 2020, avec un contenu factice quasi identique (~2 657 caractères chacun) :

- `/10-quarantine-activities-that-dont-involve-watching-the-news/`
- `/building-a-new-world/`
- `/how-to-catch-the-happiness/`
- `/how-to-cope-with-coronavirus-caused-mental-health-concerns/`
- `/is-it-important-to-say-please-and-thank-you-to-your-partner/`
- `/strict-analysis-in-the-situation/`
- `/three-secrets-to-beat-performance-anxiety/`

### Pourquoi c'est un vrai problème (et pas cosmétique)

1. **Contenu dupliqué et pauvre** : sept textes de remplissage de longueur identique.
2. **E-E-A-T** : sur un site YMYL de praticien libéral, du contenu factice en langue étrangère est
   exactement le signal que les *Quality Raters* pénalisent.
3. **Signal de site abandonné** : un sitemap d'articles figé à février 2020 sur un site de santé.

### Traitement en v2

| Contenu | Décision |
|---|---|
| 7 articles de démo anglais | **Suppression + 410 Gone** (ou 301 vers `/blog/` si l'un d'eux reçoit un backlink — à vérifier). Pas de 301 vers une page française sans rapport. |
| Catégories / étiquettes de démo | Suppression, `noindex` sur les taxonomies non utilisées |
| CPT non publics (service, product, lq-team, case-study, forum) | Ne pas migrer du tout |
| Archive auteur | `noindex` (un seul auteur = duplication de `/blog/`) |
| Pages de pièces jointes | `noindex` systématique |

---

## 5. POSITIONNEMENT ACTUEL — ANALYSE

Source : SE Ranking, 38 mots-clés suivis, Google France, 2026-09-07.
Données détaillées : `positions-actuelles.csv`.

### 5.1 Vue d'ensemble

| Indicateur | Valeur | Lecture |
|---|---|---|
| Position moyenne | **24** | meilleur niveau du mois |
| Position moyenne au 08/08/2026 | 28 | **le site progresse : 28 → 24 en un mois** |
| Prévision de trafic | 643 | −109 **sur la seule journée du 06→07/09** |
| Visibilité | 40,2 | −8,6 **sur la seule journée du 06→07/09** |
| Top 1 | 4 mots-clés | |
| Top 3 | 5 | |
| Top 5 | 19 | +1 |
| Top 10 | 28 | |
| Top 30 | 30 | |
| Au-delà de 100 | 7 | |

> **Lecture correcte de la tendance** : les variations −109 (trafic) et −8,6 (visibilité) affichées par
> SE Ranking portent sur la **période sélectionnée du 6 au 7 septembre uniquement**. Elles s'expliquent
> intégralement par la descente de `psychologue nantes` de la position 4 à la position 5 — un mot-clé
> qui pèse à lui seul 329 des 643 de trafic estimé. **Ce n'est pas une tendance, c'est une fluctuation
> d'une journée sur un seul mot-clé.**
>
> Sur un mois (08/08 → 07/09), la position moyenne passe de **28 à 24** : le site **s'améliore**.

### 5.1 bis — Corrélation avec l'incident WP Rocket

La courbe de position moyenne présente un **creux marqué le 21 août 2026** (retour à 28, soit le plus
mauvais niveau de la période), suivi d'une récupération en deux jours.

Cela correspond exactement à l'**incident du 20-21 août 2026** : la mise à jour automatique de
WordPress en 7.1 a rendu WP Rocket 3.20.1.2 incompatible, provoquant une **erreur 500 sur tout le
site**, résolue le 21 août en renommant le dossier du plugin.

**Deux enseignements** :
1. Une indisponibilité de 24-48 h a un effet mesurable mais **réversible** sur les positions.
2. Sur un site dont 33 mots-clés reposent sur une seule URL, la disponibilité est un facteur SEO de
   premier ordre. C'est un argument de plus pour un hébergement statique sur Vercel, sans plugin de
   cache ni base de données à casser.

### 5.2 Constat structurant — le site est mono-page en SEO

**Le site entier ne positionne que 4 URLs.** Vue SE Ranking groupée par URL (07/09/2026) :

| URL | Mots-clés | Volume cumulé | Position moy. | Évolution |
|---|---|---|---|---|
| **`/`** | **33** | **15 300** | 17 | stable |
| `/contact-psychologue-clinicien-nantes/` | 1 | 480 | 37 | stable |
| `/psychanalyste-nantes/` | 1 | 70 | 24 | **+2** |
| `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` | 3 | 210 | 100 | non classé |

**La page d'accueil porte 33 des 38 mots-clés suivis et 15 300 des ~16 000 de volume mensuel.**

**Conséquences** :
- **Risque de migration très faible** : il n'y a quasiment qu'une URL à ne pas casser.
- **Opportunité majeure** : une page ne peut pas être optimisée pour 34 intentions différentes. Créer
  des pages dédiées par intention (tarifs, motifs, approche, RDV) permet de gagner des positions
  **sans cannibaliser** la home, qui garde `psychologue nantes`.

### 5.3 Le mot-clé qui compte

| Mot-clé | Volume | Position | Trafic estimé |
|---|---|---|---|
| **`psychologue nantes`** | **5 400/mois** | **5** (était 4) | **329** |

À lui seul, il représente **plus de la moitié du trafic estimé du site**. Passer de la position 5 à la
position 2-3 est le chantier le plus rentable du projet. Le SERP affiche un **Local pack** → cf. § 6
du master : ça se joue autant sur la fiche Google Business Profile que sur la page.

### 5.4 Acquis à protéger absolument

| Mot-clé | Volume | Position |
|---|---|---|
| `psychologue psychanalyste nantes` | 50 | **1** |
| `vincent rousseau nantes` | 40 | **1** |
| `vincent rousseau psychologue` | 10 | **1** |
| `psychologue clinicien-psychanalyste nantes` | — | **1** |
| `psychanalyste nantes` | 50 | **2** |

L'angle **psychanalyste** est un actif fort et différenciant. Il doit rester visible en v2.

### 5.5 Opportunité immédiate — la page tarifs manquante

| Mot-clé | Volume | Position | SERP |
|---|---|---|---|
| `tarif psychologue nantes` | 20 | 5 | **Aperçu IA** |
| `psychologue nantes tarif` | 20 | 4 | Local pack, Avis, PAA |

Le site **n'a aucune page tarifs**. Ces requêtes sont portées par la home, en position 4-5, avec un
Aperçu IA sur l'une des deux. Une page `/tarifs-et-remboursement/` dédiée (couvrant Mon soutien psy et
les mutuelles) est un gain rapide, à forte intention, et un actif GEO.

### 5.6 Requêtes à EXCLURE du ciblage — déontologie

| Mot-clé | Volume | Position | Décision |
|---|---|---|---|
| `psychiatre nantes` | 480 | non classé | **Exclure** |
| `psychiatres nantes` | 390 | non classé | **Exclure** |
| `psychiatre nantes avis` | 50 | non classé | **Exclure** |

Vincent n'est pas psychiatre (médecin). Ces requêtes remontent probablement à cause de la page
« Les différents Psy », qui compare les professions — usage légitime et pédagogique. **Il ne faut pas
chercher à les faire ranker** (§ 2.2 du master : pas de titre non détenu). Elles restent utiles comme
preuve que la page pédagogique fonctionne.

### 5.7 Cluster psychothérapeute — DÉBLOQUÉ (2026-09-07)

**Vincent détient bien le titre de psychothérapeute** (inscription au registre national ARS), en plus
de ceux de psychologue clinicien et de psychanalyste. Le cluster est donc **entièrement ciblable**.

| Mot-clé | Volume | Position | Statut |
|---|---|---|---|
| `psychotérapeute nantes` *(graphie fautive)* | **6 600** | 9 | **Priorité 1** — cf. avertissement ci-dessous |
| `psychothérapeute nantes avis` | 30 | 7 | Priorité 2 |
| `psychiatre psychothérapeute nantes` | 30 | 7 | Priorité 3, via la page pédagogique |
| `psychothérapeute nantes` | 10 | 9 | **Orthographe à utiliser dans le contenu** |
| `psychologue psychothérapeute nantes` | 10 | 4 | Priorité 1 — exprime le double titre |
| `psychotherapeute nantes` *(sans accent)* | 10 | 9 | Variante, aucune action spécifique |

#### ⚠️ Artefact d'outil sur les volumes — ne pas reproduire la faute

SE Ranking attribue **6 600 recherches/mois à `psychotérapeute nantes`** (sans le « h ») et seulement
**10 à l'orthographe correcte**. Ce déséquilibre n'est pas crédible : il s'agit d'un **artefact
d'agrégation**. Google corrige automatiquement les fautes de frappe et regroupe les variantes ; l'outil
a rattaché le volume du cluster entier à la graphie la plus tapée.

**Conséquence opérationnelle** :
- Le cluster « psychothérapeute + Nantes » vaut bien **~6 600/mois** → c'est le **deuxième gisement du
  marché local**, juste derrière `psychologue nantes` (5 400).
- **On écrit toujours « psychothérapeute » correctement.** Reproduire la faute dans un contenu, un
  `title`, un slug ou un `alt` serait inutile (Google corrige de lui-même) et destructeur pour la
  crédibilité d'un praticien titulaire du titre protégé.

#### Conséquence sur l'architecture

Le site est mono-page (§ 5.2) et la home est en position 9 sur ce cluster alors qu'elle est en
position 5 sur `psychologue nantes`. Une seule page ne peut pas porter les deux intentions à plein.

→ **Créer une page dédiée `/psychotherapeute-nantes/`** (slug sans accent, conforme à l'usage), portant
l'intention « psychothérapie » : ce qu'est une psychothérapie, le cadre, le titre protégé et ce qu'il
garantit, le déroulé. La home conserve `psychologue nantes`. Pas de cannibalisation : les deux
intentions sont distinctes.

### 5.8 Requêtes restant à arbitrer

| Mot-clé | Volume | Position | Question |
|---|---|---|---|
| `psychopraticien nantes` | 320 | 7 | Titre **non protégé**, souvent employé par des praticiens sans diplôme de psychologie. Vincent a-t-il intérêt à s'y associer alors qu'il détient deux titres protégés ? **Recommandation : ne pas cibler activement** — le bénéfice en volume ne compense pas la dilution du positionnement. |
| `psychiatre psychanalyste nantes` | 70 | 4 | Ciblage indirect légitime via la page pédagogique (Vincent n'est pas psychiatre mais peut expliquer la différence) |

---

## 6. TABLE DE CORRESPONDANCE DES URLs

**Principe retenu : conservation intégrale des slugs français existants.**
Ils sont descriptifs, en français, avec mot-clé, et déjà en `/%postname%/` avec slash final.

| URL actuelle | URL v2 | Code | Justification |
|---|---|---|---|
| `/` | `/` | 200 | Porte 34 requêtes — intouchable |
| `/psychologue-clinicien-nantes/` | inchangée | 200 | Slug avec mot-clé |
| `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` | inchangée | 200 | Positionnée, slug long mais acquis |
| `/psychanalyste-nantes/` | inchangée | 200 | Positionnée |
| `/rendez-vous-psychologue-nantes/` | inchangée | 200 | Page de conversion |
| `/contact-psychologue-clinicien-nantes/` | inchangée | 200 | Positionnée |
| `/aide-faq/` | inchangée | 200 | |
| `/galerie/` | à arbitrer | 200 ou 301 | Contenu à évaluer |
| `/merci-pour-votre-demande/` | inchangée | 200 + **noindex** | |
| `/mentions-legales/` | inchangée | 200 + noindex | |
| `/dispositions-legales/` | inchangée | 200 + noindex | À fusionner avec les mentions ? |
| `/politique-de-cookies-ue/` | `/politique-de-confidentialite/` | **301** | Page vide aujourd'hui, à réécrire (§ 2.4) |
| 7 articles de démo anglais | — | **410** | Contenu factice, cf. § 4 |
| Catégories / étiquettes de démo | — | **410** | |
| **Nouvelles pages** | `/tarifs-et-remboursement/`, `/motifs-de-consultation/…`, `/blog/` | 200 | Création |

> **Aucune redirection critique.** Le risque de migration est faible — à condition de ne pas céder à
> la tentation de « nettoyer » les slugs longs.

---

## 7. CE QUI RESTE À OBTENIR

| Élément | Source | Bloquant pour |
|---|---|---|
| Numéro **ADELI / RPPS** | Vincent | Page auteur, JSON-LD, mentions légales |
| Diplômes, université, année | Vincent | Page auteur (E-E-A-T) |
| Publics reçus (adultes / ados / enfants / couples) | Vincent | Arborescence |
| Motifs de consultation réels | Vincent | Silo 2 — choix des 6-10 pages |
| Honoraires + conventionnement Mon soutien psy | Vincent | Page tarifs |
| Adresse exacte + accès du cabinet | Site actuel / Vincent | Page `/cabinet-nantes/`, JSON-LD |
| Accès **Google Business Profile** | Vincent | Levier n° 1 (§ 6 du master) |
| Backlinks entrants | SE Ranking (module Backlinks) | Décision 410 vs 301 sur les articles de démo |

> **Search Console** : inexistante, comme Analytics et GTM (aucune trace dans la base : ni `UA-`, ni
> `G-`, ni `GTM-`, ni balise de vérification). **À créer immédiatement**, avant la refonte — elle ne
> rétroagit pas sur l'historique, mais elle donnera dès les premiers jours le rapport d'indexation
> (quelles URLs Google connaît réellement) et permettra de surveiller la bascule.

---

## 8. SYNTHÈSE — CE QUE L'INVENTAIRE CHANGE AU PLAN

| Hypothèse de départ | Réalité constatée | Conséquence |
|---|---|---|
| Migration risquée, table de redirections complexe | 12 pages, slugs déjà bons, format d'URL déjà conforme | **Risque faible.** On conserve tout. |
| Il faut identifier les URLs qui performent | Une seule URL performe : la home | **Opportunité** : créer des pages par intention |
| Métadonnées Yoast à reprendre | Aucune n'est renseignée | **Gain immédiat** : 12 balises à écrire |
| Site propre à moderniser | 53 contenus de démo, 7 articles anglais indexables depuis 2020 | **Nettoyage** = enjeu E-E-A-T réel |
| Site en décrochage (lecture initiale erronée) | Position moyenne 28 → 24 en un mois ; le −109 ne couvre qu'une journée | **Le site progresse.** La refonte part d'une base saine, pas d'un sauvetage |
