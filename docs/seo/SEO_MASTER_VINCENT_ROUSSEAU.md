# SEO MASTER — VINCENT ROUSSEAU, PSYCHOLOGUE À NANTES

> **SOURCE DE VÉRITÉ ABSOLUE** pour tout le SEO du projet de refonte React/Next.js.
> À relire **obligatoirement** avant toute modification de contenu, de structure ou de stratégie.
> Adapté du `SEO_MASTER_CLICKZOU.md` (v2.6) — **les différences sont volontaires et argumentées** :
> ne jamais réimporter mécaniquement une règle Clickzou sans avoir lu le § 0.

**Version** : 1.0
**Dernière mise à jour** : 2026-09-07 (création — refonte v2 React)
**Maintenu par** : Clickzou + Claude
**Statut** : ossature validée ; les champs `[À COMPLÉTER]` sont alimentés par l'inventaire `.wpress` (§ 10.1)

---

## TABLE DES MATIÈRES

0. [Ce qui change par rapport au master Clickzou (à lire en premier)](#0-ce-qui-change-par-rapport-au-master-clickzou)
1. [Vision & stratégie SEO](#1-vision--stratégie-seo)
2. [Contraintes YMYL, déontologie & RGPD (bloquantes)](#2-contraintes-ymyl-déontologie--rgpd)
3. [Architecture SEO du site](#3-architecture-seo-du-site)
4. [Silos sémantiques](#4-silos-sémantiques)
5. [Règles de maillage interne](#5-règles-de-maillage-interne)
6. [SEO local Nantes — le levier n°1](#6-seo-local-nantes--le-levier-n1)
7. [Blog & stratégie éditoriale](#7-blog--stratégie-éditoriale)
8. [Règles rédactionnelles](#8-règles-rédactionnelles)
9. [Conversion & prise de rendez-vous](#9-conversion--prise-de-rendez-vous)
10. [Migration WordPress → Next.js (préservation SEO)](#10-migration-wordpress--nextjs)
11. [GEO / LLM — être cité par les IA](#11-geo--llm)
12. [Roadmap & veille](#12-roadmap--veille)
13. [Fichiers clés](#13-fichiers-clés)
14. [Blocs machine-readable](#14-blocs-machine-readable)

---

## 0. CE QUI CHANGE PAR RAPPORT AU MASTER CLICKZOU

Le master Clickzou est conçu pour une **agence web B2B, France entière, 1 353 pages majoritairement
programmatiques**. Vincent Rousseau, c'est un **praticien libéral unique, sur une seule ville, dans un
domaine YMYL santé**. Transposer les règles Clickzou telles quelles serait contre-productif — et sur
plusieurs points, dangereux.

| Règle Clickzou | Statut ici | Pourquoi |
|---|---|---|
| Système programmatique (300 pages locales × 6 types, 128 métiers) | **INTERDIT** | Un praticien unique exerce sur **une** zone. Générer « psychologue Saint-Herblain / Rezé / Orvault… » = doorway pages caractérisées, et trompeuses (Vincent n'a pas de cabinet là-bas). En YMYL, le risque de sanction est maximal. |
| ~1 350 pages | **~25 à 40 pages** cible | L'autorité se construit ici par la **profondeur et la preuve de compétence**, pas par le volume. |
| Plancher 2 000 mots par article | **Non transposé** | Remplacé par des cibles différenciées (§ 8.3). Une page « tarifs & rendez-vous » de 400 mots est parfaite ; la gonfler à 2 000 la dégrade. |
| Ton « data-driven, toujours des chiffres » | **Adapté** | En santé mentale, un chiffre non sourcé est un risque. Chiffre = **source publique citée** (HAS, Santé publique France, Inserm, OMS) ou pas de chiffre. |
| Cas clients avec résultats chiffrés | **INTERDIT** | Secret professionnel. Aucun cas patient, même anonymisé, même reformulé. Remplacé par de la pédagogie sur le déroulé concret d'une prise en charge. |
| Auteur = « Clickzou », jamais de prénom | **Inversé** | Auteur = **Vincent Rousseau, psychologue**, avec titre, formation et n° d'enregistrement. En YMYL, l'auteur identifié *est* le signal E-E-A-T principal. |
| CTA « friction commerciale », « coût de l'inaction », urgence | **INTERDIT** | Déontologiquement inacceptable en santé mentale, et contre-productif auprès d'un public vulnérable. Le CTA informe et facilite, il ne pousse pas. |
| Netlinking payant (eReferer, ~89 €/lien) | **Proscrit** | Les liens achetés sur des blogs génériques sont sans valeur en santé et exposent à une pénalité sur un site à faible volume, où un seul mauvais signal pèse lourd. Stratégie de remplacement en § 6.2. |
| Avis pilotés comme un actif (récence, volume) | **Non actionné** | Solliciter un avis auprès d'un patient pose un problème déontologique (§ 2.3). Handicap compétitif assumé. |
| Blocs machine-readable parsés par un moteur | **Conservés, simplifiés** | Pas de dashboard SEO automatisé au départ. Les blocs servent de référence structurée pour Claude. |

**Conservé tel quel** : la rigueur technique (trailing slash, canonical, sitemap, JSON-LD), la méthode
MECE, la pyramide de Minto, l'anti-cannibalisation, l'exigence de liens externes d'autorité, la
démarche GEO/LLM, et la discipline de veille.

---

## 1. VISION & STRATÉGIE SEO

### Positionnement

- **URL de production** : `https://psychologuenantes-vincentrousseau.fr` — **domaine conservé** (il porte
  l'historique SEO, cf. § 10.2)
- **Praticien** : Vincent Rousseau — **triple titre confirmé (2026-09-07)** :
  - **psychologue clinicien** *(titre protégé — loi n° 85-772 du 25 juillet 1985)*
  - **psychothérapeute** *(titre protégé — inscription au registre national ARS)*
  - **psychanalyste** *(titre non protégé, relevant de la filiation et de la formation analytique)*

  > C'est un **actif E-E-A-T rare** : peu de praticiens cumulent les deux titres protégés. Il doit être
  > exposé explicitement sur la page auteur, dans le `hasCredential` du JSON-LD `Person`, dans les
  > mentions légales et dans le `title` de la home. Il légitime aussi la page pédagogique « Les
  > différents Psy » : Vincent peut comparer ces professions parce qu'il en détient trois.
- **Cabinet** : 10 bis rue de la Havane, 44000 Nantes — tram L1 arrêt « Manufacture »
- **Publics reçus** : **adultes et jeunes adultes, à partir de 18 ans, uniquement.**
  **Ni enfants, ni adolescents, ni couples** — contrainte structurante, cf. § 3.2
- **N° ADELI** : 44 93 1444 2 · **SIRET** : 511 87 30 36 000 55
- **Diplôme** : Master pro de psychologie clinique, psychopathologie et santé mentale —
  Université Paul Valéry Montpellier III
- **Rattachements** : Association lacanienne internationale (ALI), École psychanalytique de Bretagne (EPB)
- **Honoraires** : 40 à 60 € la séance, modulés selon les moyens du patient
- **Langue** : français uniquement

> Toutes ces données sont consolidées dans **`docs/donnees-vincent.md`** — **source unique**, à ne
> jamais recopier en dur dans un composant.

### Point de départ mesuré (07/09/2026)

| Indicateur | Valeur |
|---|---|
| URLs positionnées | **4** (dont la home qui porte **33 des 38** mots-clés suivis) |
| Position moyenne | 24 — en progression (28 le 08/08/2026) |
| Trafic organique estimé | ~643/mois, dont **329 sur le seul `psychologue nantes`** |
| `psychologue nantes` (5 400/mois) | **position 5** |
| Métadonnées Yoast renseignées | **aucune** |
| Search Console / Analytics | **inexistants** |

Détail : `inventaire-wordpress.md` et `positions-actuelles.csv`.

### Objectif business unique

Un praticien libéral n'a pas un objectif de croissance infinie : il a un **agenda fini**.
L'objectif SEO n'est donc pas le trafic, c'est **le remplissage qualifié de l'agenda**.

```
Recherche locale ou thématique
    ↓
Page pertinente (motif de consultation / public / approche)
    ↓
Compréhension : « c'est le bon interlocuteur pour moi »
    ↓
Prise de RDV (téléphone / plateforme) ← objectif mesurable unique
```

**Corollaire** : une page qui attire du trafic national non convertible (ex. « qu'est-ce que
l'anxiété ») a une valeur **indirecte** (autorité thématique, citations IA) mais ne doit jamais
prendre le pas sur les pages locales et de conversion.

### Hiérarchie des priorités

| Priorité | Objet | Pourquoi |
|---|---|---|
| 1 | Requêtes locales transactionnelles (`psychologue nantes`, `psychologue [motif] nantes`) | Intention de prise de RDV immédiate |
| 2 | Fiche Google Business Profile + pack local | En SEO local santé, le pack local capte l'essentiel des clics (§ 6) |
| 3 | Pages « motifs de consultation » ancrées localement | Longue traîne convertissante |
| 4 | Blog / contenus de fond | Autorité thématique, E-E-A-T, citations IA |
| 5 | Requêtes nationales informationnelles | Bonus de notoriété, jamais prioritaire |

---

## 2. CONTRAINTES YMYL, DÉONTOLOGIE & RGPD

> **Section bloquante.** Toute production de contenu ou de code doit être vérifiée contre cette section.
> Une violation ici n'est pas une « erreur SEO », c'est un risque professionnel et juridique pour Vincent.

### 2.1 YMYL — Your Money or Your Life

La santé mentale est classée YMYL par Google : les *Quality Rater Guidelines* imposent un niveau
d'E-E-A-T très supérieur au reste du web. Conséquences opérationnelles **non négociables** :

1. **Chaque contenu clinique est signé** par Vincent Rousseau, avec lien vers une page auteur
   détaillant : titre, diplôme(s), université, année, n° ADELI/RPPS, approche, années d'exercice.
2. **Aucune affirmation médicale sans source.** Toute donnée épidémiologique, tout mécanisme, toute
   recommandation renvoie à une source d'autorité : HAS, Santé publique France, Inserm, OMS, Ameli,
   Psycom, revues à comité de lecture.
3. **Aucune promesse de résultat.** Interdit : « guérir », « en 5 séances », « méthode efficace à
   100 % », « débarrassez-vous définitivement de ». Autorisé : « accompagner », « travailler sur »,
   « selon la HAS, [telle approche] est recommandée pour… » (avec la source).
4. **Aucun autodiagnostic.** Pas de test « êtes-vous dépressif ? » produisant un score. Un contenu
   pédagogique décrit des signes et **oriente vers une consultation**, il ne conclut pas.
5. **Mention de sécurité obligatoire** sur toute page traitant d'un sujet à risque (dépression,
   idées suicidaires, troubles alimentaires, addictions, violences) : bandeau visible renvoyant vers
   le **3114** (numéro national de prévention du suicide, gratuit, 24/7) et le **15 / 112** en urgence.
   Composant React dédié et réutilisé, jamais un paragraphe recopié.
6. **Date de dernière révision affichée** sur chaque contenu clinique (`dateModified` en JSON-LD).

### 2.2 Déontologie de la profession

Le titre de psychologue est protégé et la profession est encadrée par un **Code de déontologie des
psychologues** (texte professionnel, non réglementaire, mais référence des instances et opposable en
pratique). Règles à appliquer au site :

- **Pas de publicité comparative ni de démarchage.** Le site informe, il ne vend pas. Bannir tout
  vocabulaire commercial : « offre », « formule », « tarif préférentiel », « profitez de », « places
  limitées », compte à rebours, popup d'intention de sortie.
- **Secret professionnel absolu.** Aucun témoignage patient, aucun cas clinique identifiable, aucune
  photo de patient, aucun verbatim. *(Cf. § 2.3 pour les avis Google.)*
- **Pas de titre ni de compétence non détenus.** Ne jamais écrire « psychothérapeute »,
  « psychanalyste », « praticien EMDR », « neuropsychologue » sans que Vincent détienne le titre ou la
  formation correspondante. **Chaque libellé de compétence doit être validé par Vincent avant
  publication** — c'est aussi un enjeu SEO : on ne cible pas un mot-clé qu'on n'a pas le droit d'employer.
- **Honoraires** : les afficher est légitime et attendu (transparence). Les présenter sobrement, sans
  argumentaire de vente ni comparaison avec d'autres praticiens.

> ⚠️ **À faire valider par Vincent, avant toute rédaction** : la liste exacte des titres, formations et
> méthodes revendicables. C'est le point de départ du ciblage sémantique — tant qu'elle n'est pas figée,
> aucune page « approche » ne doit être écrite.

### 2.3 Avis clients — traitement particulier

Un avis Google est publié par le patient, pas par le praticien : il ne viole pas en lui-même le secret.
**Mais solliciter activement des avis auprès de patients est déontologiquement délicat** (asymétrie de
la relation thérapeutique, révélation implicite du statut de patient).

**Position retenue** : ne **jamais** solliciter d'avis, ne jamais republier d'avis sur le site, ne pas
implémenter d'`AggregateRating` en JSON-LD. Les avis spontanés sur la fiche Google restent utiles au
pack local (§ 6.1) mais ne sont pas un levier qu'on actionne.

### 2.4 RGPD — les données de santé sont des données sensibles

C'est le point technique le plus souvent raté sur les sites de praticiens.

- Un formulaire de contact en texte libre sur un site de psychologue **reçoit** de facto des données de
  santé (art. 9 RGPD). Elles transitent alors par l'hébergeur, la base et la boîte mail.
- **Vercel n'est pas certifié HDS** (Hébergeur de Données de Santé). Le site public n'a donc pas
  vocation à stocker ni traiter de données de santé.

**Règles d'architecture qui en découlent** :

1. **Aucun stockage** de message en base. Le formulaire, s'il existe, envoie un e-mail et n'écrit rien.
2. **Formulaire minimal** : nom, moyen de rappel, disponibilités. **Pas de champ « décrivez votre
   situation »** — le libellé doit explicitement demander de ne rien écrire de personnel ou médical.
3. **Privilégier le canal direct** : téléphone et/ou plateforme de prise de RDV agréée (Doctolib et
   équivalents sont hébergés HDS — argument fort pour y renvoyer plutôt que de gérer soi-même).
4. **Mentions légales complètes** : identité, titre, n° ADELI/RPPS, hébergeur, directeur de publication.
5. **Politique de confidentialité** dédiée, expliquant ce qui est collecté et surtout ce qui ne l'est pas.
6. **Bandeau cookies conforme** : le site actuel utilise Complianz ; en Next.js, **charger l'analytics
   uniquement après consentement**, ou choisir une solution sans cookie ni donnée personnelle
   (Plausible, Umami) — **recommandé ici**, cela supprime une grande partie du problème.
7. **Pas de Google Fonts en CDN** (transfert d'IP hors consentement) : polices auto-hébergées via
   `next/font`. C'est aussi meilleur pour la performance.

---

## 3. ARCHITECTURE SEO DU SITE

### 3.1 Stack cible

| Élément | Choix | Justification |
|---|---|---|
| Framework | **Next.js (App Router)** | SSG/ISR, métadonnées natives, écosystème maîtrisé par l'équipe |
| Hébergement | **Vercel** | Décidé. Déploiement Git, previews, edge CDN |
| Contenu | **Fichiers versionnés** (MDX ou modules TS typés) | Vincent n'édite pas → aucun CMS nécessaire. Zéro base, zéro surface d'attaque, zéro coût de licence, contenu diffable et relu en PR |
| Styles | Tailwind CSS | Cohérence avec les autres projets |
| Analytics | Plausible/Umami, ou GA4 sous consentement | Cf. § 2.4 |
| Formulaire | Envoi e-mail sans persistance (Resend / route API) | Cf. § 2.4 |
| Prise de RDV | Lien externe vers plateforme HDS | Cf. § 9.3 |

> **Conséquence du choix « pas d'édition par Vincent »** : chaque nouvel article ou correction passe par
> un commit. Le workflow doit rester léger — canal de demande et délai d'exécution à cadrer avec lui.

### 3.2 Arborescence cible

> Structure de travail. **Les slugs définitifs dépendent des URLs existantes** : toute URL WordPress qui
> a de l'historique et des positions est **conservée à l'identique** plutôt que redirigée (§ 10.2).

```
/                                        → Accueil — cible « psychologue nantes » (5 400/mois, pos. 5)
/vincent-rousseau-psychologue/           → Page auteur / à propos — PIVOT E-E-A-T (triple titre)
/psychotherapeute-nantes/                → Cluster « psychothérapeute » (~6 600/mois, pos. 9) [NOUVEAU]
/psychanalyste-nantes/                   → Existante, positionnée — cluster psychanalyse
/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/
                                         → Existante — page pédagogique « Les différents Psy »
/consultations/                          → Déroulé, cadre, durée, confidentialité, 1re séance
                                         → PAS de sous-pages par public : Vincent ne reçoit que des
                                            adultes (18 ans+). Ni ados, ni enfants, ni couples.
/approche/                               → Hub approche(s) thérapeutique(s)
  /approche/[nom-approche]/              → 1 page par approche RÉELLEMENT pratiquée
/motifs-de-consultation/                 → Hub problématiques
  /motifs-de-consultation/anxiete/       → 1 page par motif, ancrée localement
  /motifs-de-consultation/depression/
  /motifs-de-consultation/burn-out/
  /motifs-de-consultation/…              → 6 à 10 max, choisis sur données réelles
/tarifs-et-remboursement/                → Honoraires 40-60 €, modulation, mutuelles [NOUVEAU]
                                            `tarif psychologue nantes` = Aperçu IA, pos. 5
/rendez-vous/                            → Conversion principale
/cabinet-nantes/                         → Accès, transports, stationnement, plan — page locale
/blog/                                   → Listing
/blog/[slug]/                            → Articles
/mentions-legales/                       → noindex
/politique-de-confidentialite/           → noindex
/plan-du-site/                           → index
```

**Volume cible : 25 à 40 URLs indexables. Plafond dur : 60.** Au-delà, on dilue l'autorité d'un site de
praticien et on prend un risque de contenu mince en YMYL.

### 3.3 Règles SEO techniques

#### Trailing slash — obligatoire partout
- `next.config.ts` : `trailingSlash: true`
- Liens internes, canoniques, sitemap : tous avec `/` final
- Helper centralisé : `src/lib/url-helpers.ts` (pattern repris de Clickzou)
- **État actuel vérifié** : WordPress est déjà en `/%postname%/` **avec slash final**. Aucune migration
  de format d'URL n'est nécessaire — le principal risque de refonte est écarté.

#### Canonical
- Auto-référente sur chaque page indexable
- Jamais de canonique croisée (sauf redirection 301)
- Pagination du blog : `/blog/page/2/` canonique sur elle-même, **pas** sur `/blog/`

#### Redirections
- **301 uniquement**, aucune chaîne A → B → C
- Table de correspondance exhaustive issue de l'inventaire WordPress (§ 10.1)
- Implémentation dans `next.config.ts` (`redirects()`), versionnée, jamais ad hoc

#### Sitemap & robots
- Sitemap unique `/sitemap.xml` (le volume ne justifie aucune segmentation)
- Source : `src/lib/sitemap-data.ts`
- Exclusions : pages légales, brouillons, `scheduled` futur
- `robots.ts` : `Allow: /`, `Disallow: /api/`, crawlers IA explicitement autorisés (§ 11.1)

#### Meta tags
- `metaTitle` : ≤ 60 caractères, mot-clé en début, **« Nantes » présent sur toute page locale**
- `metaDescription` : ≤ 155 caractères, factuelle, sans superlatif ni promesse
- `noindex` : mentions légales, politique de confidentialité, page de confirmation post-formulaire

#### Données structurées JSON-LD

Trois schémas assemblés en `@graph` :

| Schéma | Où | Contenu clé |
|---|---|---|
| `["LocalBusiness","MedicalBusiness"]` | Toutes les pages | `name`, `address` (NAP strictement identique à Google Business Profile), `geo`, `openingHoursSpecification`, `telephone`, `priceRange`, `areaServed: Nantes`, `sameAs` |
| `Person` | Page auteur + `author` des articles | `name`, `jobTitle: "Psychologue"`, `hasCredential` (diplôme, établissement), `knowsAbout`, `identifier` (ADELI/RPPS), `sameAs` |
| `Article` + `BreadcrumbList` | Blog & pages cliniques | `author` → le `Person`, `datePublished`, `dateModified`, `citation` vers les sources |

`FAQPage` sur les pages à forte intention question (tarifs, déroulé, remboursement).

> **Pas d'`AggregateRating`** (§ 2.3). **Pas de type `Physician`** : il désigne un médecin ; l'employer
> pour un psychologue reviendrait à déclarer un titre inexact dans les données structurées.

#### Performance
- Images **WebP/AVIF**, `next/image`, dimensions explicites (CLS)
- Polices auto-hébergées via `next/font` (RGPD + perf)
- Cibles Lighthouse : **Performance > 90, SEO > 95, Accessibilité > 95**
- Core Web Vitals : LCP < 2,0 s · INP < 200 ms · CLS < 0,05
  *(exigence supérieure à Clickzou : le site est petit, il n'y a aucune excuse technique)*

#### Accessibilité — enjeu spécifique, pas une case à cocher
Le public d'un site de psychologue inclut des personnes en détresse, fatiguées, parfois âgées :
contraste AA minimum, texte ≥ 17 px, navigation clavier complète, pas d'animation agressive,
`prefers-reduced-motion` respecté, et **numéro de téléphone cliquable et visible sans scroll sur mobile**.

---

## 4. SILOS SÉMANTIQUES

Cinq silos. Chacun a une page pilier et un rôle distinct — règle MECE : **aucun recouvrement**.

### Silo 1 — Identité & expertise (E-E-A-T)

| Élément | Valeur |
|---|---|
| Pilier | `/vincent-rousseau-psychologue/` |
| Rôle | Établir la compétence, le titre, le parcours. **Page la plus importante du site après l'accueil** en YMYL. |
| Reçoit des liens de | Tous les articles (signature auteur), toutes les pages cliniques |
| Mots-clés | psychologue nantes, vincent rousseau psychologue |

### Silo 2 — Motifs de consultation

| Élément | Valeur |
|---|---|
| Pilier | `/motifs-de-consultation/` |
| Pages | 6 à 10 motifs, **sélectionnés sur données réelles** (Search Console + patientèle effective), jamais sur une liste théorique |
| Rôle | Capter la longue traîne convertissante : « psychologue burn-out nantes » |
| Structure type | Ce que c'est (sourcé) → signes → quand consulter → comment j'accompagne → RDV |
| Mots-clés | psychologue [motif] nantes, thérapie [motif] nantes |

### Silo 3 — Titres & approches thérapeutiques

Vincent détient **trois titres** (§ 1). Chacun correspond à une **intention de recherche distincte**,
avec son propre volume et sa propre page. C'est le principal gisement de la refonte : aujourd'hui, une
seule page (la home) tente de porter les trois.

| Page | Cluster | Volume | Position actuelle |
|---|---|---|---|
| `/` (accueil) | psychologue | 5 400/mois | 5 |
| `/psychotherapeute-nantes/` **[à créer]** | psychothérapeute | ~6 600/mois | 9 (portée par la home) |
| `/psychanalyste-nantes/` *(existe)* | psychanalyste / psychanalyse | ~420/mois | 2 |
| `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` *(existe)* | pédagogique, comparatif des professions | 210/mois | non classée |

**Règle de cloisonnement d'intention** (transposée du § 5.2 Clickzou) : chaque page traite **son** titre
et renvoie aux autres par un lien contextuel. Aucune ne reprend l'argumentaire complet des autres —
c'est ce qui évite la cannibalisation quand quatre pages partagent le même champ sémantique.

**Page pédagogique** : c'est elle qui explique les différences entre psychologue, psychothérapeute,
psychiatre, psychanalyste et psychopraticien. Elle est légitime précisément parce que Vincent détient
trois de ces titres — et c'est elle qui permet d'être visible sur les requêtes `psychiatre …` **sans
jamais revendiquer le titre de médecin** (§ 2.2).

| Élément | Valeur |
|---|---|
| Pilier | `/approche/` (méthodes de travail, distinct des titres) |
| Pages | 1 par approche **réellement pratiquée et justifiée par une formation** (§ 2.2) |
| Rôle | Répondre au public qui cherche une méthode précise — trafic très qualifié |
| Mots-clés | [approche] nantes, psychologue [approche] nantes |

### Silo 4 — Pratique & accès

| Élément | Valeur |
|---|---|
| Piliers | `/consultations/`, `/tarifs-et-remboursement/`, `/cabinet-nantes/`, `/rendez-vous/` |
| Rôle | Lever les freins concrets : combien, comment, où, remboursé ou non, combien de temps |
| Note | `/tarifs-et-remboursement/` doit couvrir le dispositif **Mon soutien psy** et la question mutuelle — requête à fort volume et forte intention. **Vérifier les conditions en vigueur sur ameli.fr avant rédaction et à chaque révision** (le dispositif a déjà changé plusieurs fois). |
| Mots-clés | tarif psychologue nantes, psychologue remboursé nantes, mon soutien psy nantes |

### Silo 5 — Blog

| Élément | Valeur |
|---|---|
| Pilier | `/blog/` |
| Rôle | Autorité thématique, E-E-A-T, matière citable par les IA (§ 11) |
| Contrainte | Chaque article pointe vers un pilier des silos 2, 3 ou 4. **Un article qui ne renforce aucun silo n'est pas écrit.** |

### Hiérarchie de circulation

```
Accueil (autorité maximale, requête locale principale)
    ↓
Page auteur (E-E-A-T)  ←──── signature de chaque article
    ↓
Piliers : motifs · approches · pratique
    ↓
Pages motif / approche  ←──── articles de blog (satellites)
    ↓
/rendez-vous/ (convergence de toutes les pages)
```

---

## 5. RÈGLES DE MAILLAGE INTERNE

### Règles opérationnelles par page

| Position | Règle |
|---|---|
| **Intro** | 1 lien vers le pilier du silo, ancre naturelle et variée (« mon approche », « les consultations »), jamais l'ancre exacte répétée |
| **Corps** | 1 à 2 liens contextuels vers une page motif ou approche pertinente |
| **Signature** | Tout article lie vers `/vincent-rousseau-psychologue/` — **non négociable, c'est le vecteur E-E-A-T** |
| **Conclusion** | 1 lien vers `/rendez-vous/`, formulé sans pression (§ 9.2) |

### Règles quantitatives

| Règle | Valeur | Écart vs Clickzou |
|---|---|---|
| Liens internes minimum par page | 3 | identique |
| Maximum vers la même page par article | 2 | identique |
| Ratio intra-silo / cross-silo | 70 % / 30 % | identique |
| Trailing slash sur tous les `href` | obligatoire | identique |
| Liens vers pages noindex | interdit | identique |
| **Profondeur de clic maximale** | **2** depuis l'accueil | **plus strict** (sur 30 pages, rien ne justifie 3 clics) |

### Anti-patterns

- Pas d'ancre « cliquez ici » ou « en savoir plus »
- Pas de bloc « articles similaires » automatique et non contextuel en fin de page
- Pas de lien depuis un contenu publié vers un brouillon (et réciproquement)
- **Pas de sur-optimisation d'ancre** : sur un site de 30 pages, répéter « psychologue nantes » en ancre
  interne 40 fois est un signal artificiel bien plus visible que sur un site de 1 300 pages

### Liens externes — obligatoires (E-E-A-T renforcé)

**Minimum 3 liens externes d'autorité par contenu clinique ou article.** En YMYL, l'absence de sources
n'est pas neutre : elle disqualifie.

| Catégorie | Sources | Quand citer |
|---|---|---|
| Recommandations de soin | `has-sante.fr` | Toute mention d'efficacité, d'indication, de prise en charge recommandée |
| Épidémiologie | `santepubliquefrance.fr`, `inserm.fr` | Tout chiffre de prévalence |
| Droits & remboursement | `ameli.fr`, `service-public.fr` | Honoraires, Mon soutien psy, mutuelles |
| Information grand public | `psycom.org` | Vulgarisation, orientation, déstigmatisation |
| Urgence & prévention | `3114.fr` | Toute page à risque (obligatoire, § 2.1) |
| International | `who.int` | Définitions, cadres de référence |

**Format** : `<a href="…" target="_blank" rel="noopener noreferrer">Haute Autorité de Santé</a>`
Ancre = nom de la source, jamais l'URL nue. Liens répartis dans le contenu, pas groupés en fin.

**Interdits** : liens vers d'autres psychologues nantais (concurrents directs), vers des sites de
« coaching » ou de pseudo-thérapies non reconnues, vers des contenus commerciaux déguisés.

---

## 6. SEO LOCAL NANTES — LE LEVIER N°1

> Sur une requête `psychologue nantes`, le **pack local** occupe l'essentiel de la surface visible.
> Un site parfait qui n'apparaît pas dans le pack local perd la majorité des prises de contact.
> **Le SEO local passe donc avant l'optimisation on-site dans la priorité d'effort.**

### 6.1 Google Business Profile — actif principal

| Point | Exigence |
|---|---|
| **NAP** | Nom, adresse, téléphone **strictement identiques** entre GBP, le site (JSON-LD + footer) et tous les annuaires. Une virgule qui diffère est une incohérence. |
| Catégorie principale | « Psychologue » — une seule catégorie principale, pertinente |
| Horaires | Renseignés et tenus à jour, congés inclus |
| Photos | Cabinet, entrée, salle d'attente. **Aucune photo de patient.** Le géotagging des photos est inutile (test mesuré, § 12.3) |
| Fraîcheur | Au-delà de ~30 jours sans activité, la visibilité locale décroche → cadence minimale garantie |
| Posts Google | Servent la fraîcheur du profil, **pas** le ranking par mot-clé. Ne pas y bourrer de mots-clés. |
| Avis | Non sollicités (§ 2.3). Répondre sobrement aux avis spontanés, **sans jamais confirmer ni infirmer qu'il s'agit d'un patient**. |

### 6.2 Annuaires & citations légitimes

À la place du netlinking payant (proscrit, § 0), la stratégie de liens repose sur des **citations
professionnelles vérifiables** :

- Plateforme de prise de RDV santé (Doctolib ou équivalent) — profil complet, lien vers le site
- Annuaires officiels : annuaire santé Ameli, ARS Pays de la Loire
- Annuaires professionnels de psychologues (fédérations, syndicats, associations dont Vincent est membre)
- Réseaux de professionnels de santé nantais, maisons de santé pluriprofessionnelles
- Sites d'associations locales ou de partenaires (école, entreprise, structure) le cas échéant
- Presse locale ou média spécialisé en cas d'intervention de Vincent (interview, tribune) — **le
  meilleur lien possible**, et il sert double : SEO et GEO (§ 11)

**Règle** : chaque citation reprend le NAP exact. Une citation avec une adresse obsolète nuit plus
qu'elle ne rapporte — **auditer les citations existantes avant d'en créer de nouvelles**.

### 6.3 Ancrage local du contenu

Le local ne se joue pas en dupliquant « Nantes » partout, mais en produisant du contenu **réellement
situé** :
- Page `/cabinet-nantes/` : accès tramway/bus (lignes réelles), stationnement, accessibilité PMR, plan
- Mentions naturelles du quartier et des repères réels dans les pages pratiques
- Zone desservie annoncée honnêtement : Nantes et agglomération, **sans créer de page par commune**

### 6.4 Ce qu'on ne fait pas

- ❌ Une page par commune de l'agglomération (doorway pages)
- ❌ Une adresse fictive ou une domiciliation pour créer une seconde fiche GBP
- ❌ Des mots-clés dans le nom de la fiche GBP (« Vincent Rousseau — Psychologue Nantes Anxiété »)
- ❌ L'achat d'avis, de liens, ou l'inscription en masse dans des annuaires génériques

---

## 7. BLOG & STRATÉGIE ÉDITORIALE

### 7.1 Cadre

| Paramètre | Valeur |
|---|---|
| Rythme | **2 articles par mois maximum** au démarrage |
| Auteur | Vincent Rousseau (signature + lien page auteur, systématique) |
| Validation | **Tout article est relu et validé par Vincent avant publication.** Aucun contenu clinique ne part sans son accord — c'est sa responsabilité professionnelle qui est engagée. |
| Longueur | 1 200 – 2 000 mots (§ 8.3) |
| Sources | ≥ 3 liens externes d'autorité (§ 5) |
| Statuts | `published` / `draft` / `scheduled` — en production, `draft` et `scheduled` futur → 404 + noindex |

> **Le rythme est volontairement bas.** L'enseignement du projet Clickzou (12-15 articles/semaine →
> désastre, retour à 2/semaine) vaut a fortiori ici : en YMYL, un article faible ne dilue pas seulement
> l'autorité, il expose. Mieux vaut 20 articles excellents que 100 corrects.

### 7.2 Choix des sujets

**Ordre de priorité** :
1. Questions réellement posées en consultation — **Vincent est la meilleure source de sujets**
2. Requêtes remontées par la Search Console une fois le site en ligne
3. Angles où un praticien apporte ce qu'un site institutionnel n'a pas : le **regard clinique**, le
   déroulé concret, ce qui se passe vraiment en séance

**Règle anti-cannibalisation** : avant création, vérifier qu'aucune page existante ne cible déjà le
mot-clé principal. Un article ne doit jamais concurrencer une page motif ou approche — il l'alimente.

### 7.3 Formats à privilégier

| Format | Pourquoi |
|---|---|
| « Comment se passe une première séance » | Forte intention, lève le frein n°1, très citable par les IA |
| « Quand consulter un psychologue pour X » | Longue traîne, orientation |
| Distinctions terminologiques (psychologue / psychiatre / psychothérapeute / psychanalyste) | Fort volume, autorité, pédagogie déontologique |
| Décryptage sourcé d'une recommandation HAS | E-E-A-T maximal, matière très citable |
| Réponse argumentée à une idée reçue | Format naturellement citable par les LLM |

### 7.4 Formats interdits

- ❌ Listicles creux (« 10 astuces pour être heureux »)
- ❌ Contenu généré sans relecture clinique
- ❌ Tout ce qui ressemble à un diagnostic, un test scoré ou un conseil personnalisé
- ❌ Actualité anxiogène exploitée pour le trafic

---

## 8. RÈGLES RÉDACTIONNELLES

### 8.1 Structure — pyramide de Minto (conservée)

1. **Réponse d'abord** : la question de l'internaute est traitée dans le premier paragraphe
2. **Arguments** : H2 structurants
3. **Détails** : H3, listes, sources
4. **Orientation** : que faire maintenant — jamais une injonction commerciale

### 8.2 Densité SEO

| Élément | Règle |
|---|---|
| `metaTitle` | ≤ 60 car., mot-clé en début, « Nantes » sur toute page locale |
| `metaDescription` | ≤ 155 car., factuelle |
| H1 | Unique, = sujet de la page, mot-clé principal présent |
| H2 | 4 à 8 par page, mot-clé secondaire ou variante |
| H3 | 2 à 4 par H2 |
| Premier paragraphe | Mot-clé principal dans les 100 premiers mots |
| Hiérarchie | Jamais de saut (H1 → H2 → H3) |

### 8.3 Longueurs cibles — **différenciées** (remplace le plancher 2 000 mots)

| Type de page | Mots | Commentaire |
|---|---|---|
| Accueil | 800 – 1 200 | Doit être scannable, pas exhaustive |
| Page auteur | 800 – 1 500 | La densité de preuve compte plus que la longueur |
| Page motif de consultation | 1 200 – 1 800 | Assez pour être utile et sourcée |
| Page approche | 1 000 – 1 500 | |
| Article de blog | 1 200 – 2 000 | |
| Tarifs / RDV / accès | 300 – 700 | **Ne jamais gonfler.** Une page pratique se lit en 30 secondes |
| Mentions légales, confidentialité | libre | noindex |

> **Pourquoi pas de plancher unique** : le plancher de 2 000 mots de Clickzou répond à un problème précis
> (articles < 500 mots publiés en masse). Ici il n'y a pas de production en masse, et l'allongement
> artificiel d'une page pratique dégrade l'expérience d'un visiteur potentiellement en détresse.
> **Le critère est : « chaque paragraphe apporte-t-il une information ? » — pas un compteur de mots.**

### 8.4 Ton

- **Vouvoiement**, jamais de tutoiement
- **Sobre, chaleureux, non-jugeant.** Le visiteur peut être en souffrance : pas d'humour, pas de
  familiarité, pas d'emphase
- **Première personne** (« je reçois », « ma pratique ») sur les pages où Vincent parle — signal E-E-A-T
  et facteur de confiance
- **Pas de superlatif** (« le meilleur », « unique », « révolutionnaire »)
- **Pas de jargon non expliqué** : un terme technique est défini à sa première occurrence
- **Pas d'emoji** dans le contenu
- **Formulations neutres** quand le genre du lecteur n'est pas connu

> ⚠️ **Règle orthographique — « psychothérapeute »**
> SE Ranking attribue **6 600 recherches/mois** à la graphie fautive `psychotérapeute nantes` (sans le
> « h »), contre 10 à l'orthographe correcte. C'est un **artefact d'outil** : Google agrège les fautes
> de frappe et les corrige automatiquement, et le volume du cluster entier a été rattaché à la variante
> la plus tapée.
> **Conséquence** : le cluster vaut bien ~6 600/mois et il est prioritaire, mais on écrit
> **toujours « psychothérapeute »** correctement. Reproduire la faute dans le contenu, un `title`, un
> slug ou un `alt` serait à la fois inutile (Google corrige) et destructeur pour la crédibilité d'un
> praticien titulaire du titre.

### 8.5 Images

- Format WebP/AVIF, `next/image`, dimensions explicites
- **Photos réelles du cabinet et de Vincent** — bien plus efficaces en confiance que des banques d'images
- `alt` descriptif systématique, jamais vide
- **Interdits** : mises en scène de détresse, visages de « patients » achetés en stock, illustrations
  anxiogènes ou stigmatisantes, cerveaux stylisés et autres clichés du secteur

---

## 9. CONVERSION & PRISE DE RENDEZ-VOUS

### 9.1 Principe

La conversion se fait par **réduction de la friction et de la crainte**, jamais par pression.
Le frein principal n'est pas le prix : c'est l'appréhension du premier contact.

### 9.2 Formulations

| ✅ À utiliser | ❌ À bannir |
|---|---|
| « Prendre rendez-vous » | « Réservez vite » |
| « Poser une question avant de venir » | « Ne restez pas seul(e) — agissez maintenant » |
| « Voir comment se passe une première séance » | « Places limitées » |
| « Vous n'êtes pas obligé de savoir quoi dire » | « Offre découverte » |
| Numéro de téléphone visible en clair | Popup d'intention de sortie |

### 9.3 Canaux, par ordre de priorité

1. **Téléphone** — visible dans le header sur toutes les pages, cliquable en `tel:` sur mobile.
   C'est le canal préféré d'une grande partie du public.
2. **Plateforme de prise de RDV** (Doctolib ou équivalent) — hébergement HDS, gestion du planning,
   rappels automatiques. À privilégier sur un système maison (§ 2.4).
3. **Formulaire minimal** — nom, moyen de rappel, disponibilités. Aucun champ de description, aucun
   stockage. Message de confirmation clair, avec délai de réponse annoncé.

### 9.4 Éléments de réassurance

Sur les pages de conversion et en pied de page :
- Titre, diplôme et n° ADELI/RPPS
- Rappel du **secret professionnel**
- Délai de réponse réaliste — et tenu
- Ce qui se passe concrètement après la prise de contact
- **Bandeau urgence** (3114 / 15) — présent et visible, sans dramatisation

### 9.5 Mesure

Un objectif unique et mesurable, sans donnée personnelle :
- clic sur `tel:`
- clic sortant vers la plateforme de RDV
- soumission du formulaire

Ces trois événements constituent le seul KPI de conversion. **Ne jamais tracker le contenu d'un
formulaire ni un parcours associable à une personne** (§ 2.4).

---

## 10. MIGRATION WORDPRESS → NEXT.JS

> **Section la plus critique à court terme.** Une refonte mal migrée peut détruire des années de
> positionnement local. En santé, un site qui disparaît de la SERP pendant trois mois, c'est un agenda vide.

### 10.1 Inventaire préalable (bloquant)

À réaliser sur l'archive extraite, **avant d'écrire la moindre ligne de React** :

1. **Liste exhaustive des URLs existantes** : `wp_posts` (post, page, attachment), catégories,
   étiquettes, archives, pagination, flux
2. **Contenu réel des pages** : le site tourne sous **Elementor** → le contenu est en JSON sérialisé
   dans `wp_postmeta._elementor_data`, pas dans `post_content`. Parseur dédié nécessaire.
3. **Métadonnées Yoast** : `_yoast_wpseo_title`, `_yoast_wpseo_metadesc`, `_yoast_wpseo_canonical`,
   `_yoast_wpseo_meta-robots-noindex` — à reprendre telles quelles quand elles sont bonnes
4. **Médias réellement utilisés** vs orphelins dans `uploads/`
5. **Redirections déjà en place** (plugin de redirection, `.htaccess`)
6. **Export Search Console** : 16 mois — pages, requêtes, clics, positions. **C'est la source de vérité
   pour décider quelle URL vaut la peine d'être conservée.**
7. **Backlinks entrants** : les URLs qui en reçoivent ne doivent **jamais** casser

### 10.2 Règles de migration

| Règle | Détail |
|---|---|
| **Conserver les URLs qui performent** | Une URL avec des positions et des backlinks se garde **à l'identique**. On ne « nettoie » pas une URL pour des raisons esthétiques. |
| **301 pour tout le reste** | Table complète ancienne → nouvelle, dans `next.config.ts`, versionnée |
| **Zéro chaîne de redirection** | A → C directement, jamais A → B → C |
| **Aucune 404 sur une URL indexée** | Vérification obligatoire avant mise en ligne |
| **Contenu au moins équivalent** | Ne pas profiter de la refonte pour supprimer du contenu qui rankait. Si une page disparaît, son contenu est fusionné ailleurs et l'URL redirige vers cette cible. |
| **Images** | Conserver les noms de fichiers indexés en Google Images quand c'est possible, sinon rediriger |
| **Domaine** | **Conserver `psychologuenantes-vincentrousseau.fr`.** Un changement de domaine ajouterait un risque majeur à un projet qui en a déjà un. |

### 10.3 Procédure de bascule

1. Crawl complet de l'ancien site (Screaming Frog) → export de référence
2. Construction de la table de correspondance, URL par URL
3. Build Next.js complet en preview Vercel
4. **Crawl du preview** → comparaison avec la référence : titles, H1, canoniques, statuts, maillage
5. Vérification des 301 sur la totalité de la liste
6. Bascule DNS
7. **J+0** : Search Console → soumission du nouveau sitemap, inspection des 10 URLs principales
8. **J+1 à J+30** : surveillance quotidienne des 404, des positions, de la couverture d'indexation
9. **Ne pas toucher au contenu pendant 4 semaines** après la bascule — isoler les variables

### 10.4 À ne pas oublier

- Conserver l'ancien site accessible en local/staging pendant 6 mois (référence)
- Archiver le `.wpress` **hors du dépôt Git** (523 Mo + données personnelles)
- Fiche Google Business Profile : vérifier que l'URL pointe correctement après bascule
- Mettre à jour l'URL sur les annuaires et la plateforme de RDV si quoi que ce soit change

---

## 11. GEO / LLM — ÊTRE CITÉ PAR LES IA

**Enjeu réel et croissant** : de plus en plus de personnes demandent à ChatGPT ou Perplexity « quel
psychologue consulter à Nantes pour un burn-out ». Être l'entité que le modèle connaît et cite est un
actif d'acquisition.

### 11.1 Checklist permanente

1. **Accès crawlers IA** : `robots.ts` autorise explicitement GPTBot, OAI-SearchBot, ChatGPT-User,
   PerplexityBot, Perplexity-User, Google-Extended, ClaudeBot, Claude-User, Claude-SearchBot, CCBot,
   Applebot-Extended — mêmes exclusions que `*`. **Ne jamais bloquer un *search bot* en croyant bloquer
   un *training bot*.**
2. **Entité forte** : `Person` + `LocalBusiness` cohérents, `sameAs` vers tous les profils (GBP,
   plateforme de RDV, annuaires professionnels), NAP identique partout.
3. **Contenu citable** : chaque H2 rédigé comme une **réponse autonome de 130 à 170 mots**, contenant
   l'entité + le lieu + l'information clé. *(Acquis de veille : Google AI Mode note des **chunks**, pas
   des pages — le titre de section voyage avec le passage à l'embedding, § 12.3.)*
4. **FAQ structurée** sur les pages à intention question.
5. **Bing** : ChatGPT s'appuie sur Bing → vérifier l'indexation dans Bing Webmaster Tools.
6. **Mesure** : tester régulièrement « quel psychologue à Nantes recommandes-tu pour X ? » sur ChatGPT,
   Perplexity et Google AI Mode. Suivre le trafic référent depuis `chatgpt.com` / `perplexity.ai`.

### 11.2 Point critique — AIO local

**Acquis de veille (prouvé)** : les entreprises citées dans les AI Overviews locales sont celles qui
rankent **déjà dans le pack local**. Conséquence directe : une absence de citation IA sur une requête
locale ne se corrige **pas** par du contenu, mais par le classement dans le pack local (§ 6).
**Le SEO local est donc aussi la stratégie GEO locale.**

### 11.3 Ce qui rend citable ici

Les LLM citent en priorité les **réponses directes, sourcées et attribuées à une expertise identifiée**.
Le format le plus citable pour ce site : une question précise, une réponse en un paragraphe autonome,
une source institutionnelle, une signature de professionnel titré. C'est exactement ce qu'impose déjà
le § 8 — **le GEO et le YMYL demandent ici la même chose**, ce qui simplifie la ligne éditoriale.

---

## 12. ROADMAP & VEILLE

### 12.1 Roadmap

| Phase | Contenu | Statut |
|---|---|---|
| **P0 — Inventaire** | Extraction `.wpress`, inventaire base, positions SE Ranking, table d'URLs | ✅ **Fait** (`inventaire-wordpress.md`) |
| **P1 — Cadrage** | Validation par Vincent : titres/formations revendicables, publics, approches, motifs, honoraires | ⬜ Bloquant pour P3 |
| **P2 — Socle technique** | Next.js + Tailwind + Vercel, `url-helpers`, `sitemap-data`, `robots.ts`, JSON-LD, redirections | ⬜ |
| **P3 — Contenu** | Rédaction/reprise des ~30 pages, relecture Vincent, sources | ⬜ |
| **P4 — Recette SEO** | Crawl du preview, diff vs ancien site, vérif 301, Lighthouse, accessibilité | ⬜ |
| **P5 — Bascule** | DNS, GSC, surveillance J+30 | ⬜ |
| **P6 — Local** | Optimisation GBP, citations, annuaires, cohérence NAP | ⬜ |
| **P7 — Éditorial** | Démarrage du blog, 2 articles/mois | ⬜ |

### 12.2 Veille obligatoire (règle reprise de Clickzou)

**Avant tout audit SEO et avant toute application de correctifs**, faire une recherche web fraîche.

**Interdit** de restituer le standard de marché (« optimisez vos balises title », « soignez votre fiche
Google »). **Attendu** uniquement ce qui donne un temps d'avance : mécanique nouvelle d'un moteur ·
changement daté avec sa conséquence concrète · pratique invalidée par la donnée · fenêtre d'opportunité
temporaire · seuils chiffrés actionnables.

**Spécificité de ce projet** : ajouter systématiquement **une recherche sur le SEO santé / YMYL**
(évolutions des Quality Rater Guidelines, traitement des sites de praticiens, core updates à impact
santé) — c'est le domaine où Google bouge le plus vite et le plus durement.

Qualifier chaque trouvaille : `[PROUVÉ]` (étude ou test chiffré) · `[OBSERVÉ]` (consensus de
praticiens) · `[HYPOTHÈSE]`. Chaque trouvaille retenue est traduite en action concrète, sinon elle ne
figure pas au rendu.

### 12.3 Acquis de veille (journal — le plus récent en premier)

**Hérités du master Clickzou (2026-07-26), applicables ici :**
- `[PROUVÉ]` **Retrieval par passage** : Google AI Mode éclate la requête en 8-12 sous-requêtes et note
  des chunks indépendamment de la page. → Action : H2 = réponse autonome de 130-170 mots (§ 11.1).
- `[PROUVÉ]` **AIO local ⊂ pack local** : seules les entreprises du pack local sont citées.
  → Action : prioriser le GBP (§ 11.2).
- `[PROUVÉ]` **Récence des avis** : poids de la récence multiplié par ~2,3 en 2026.
  → **Non actionnable ici** par choix déontologique (§ 2.3) — handicap compétitif conscient et assumé
  sur le pack local, à compenser par la complétude et la fraîcheur du profil.
- `[PROUVÉ]` **Géotagging des photos GBP et bourrage de mots-clés dans les Posts : aucun effet mesuré**
  (test sur 441 mots-clés / 9 semaines). → Action : ne pas investir.
- `[OBSERVÉ]` **Fraîcheur GBP** : décrochage au-delà de ~30 jours d'inactivité. → Action : cadence minimale.
- `[PROUVÉ]` **`llms.txt` inutile aujourd'hui** (408 lectures sur 500 M de visites de bots IA ; non
  supporté par Google). → Action : le garder (coût nul), ne compter que sur l'accès des search bots.
- `[OBSERVÉ]` **Core updates 2026** : la preuve originale est récompensée, la compilation de contenu
  public recule. → Action : chaque contenu porte un élément non copiable — ici, le **regard clinique de
  Vincent**, qu'aucun site institutionnel n'a.

*(À compléter à chaque audit. Nouvelle entrée en haut.)*

---

## 13. FICHIERS CLÉS

*(Structure cible — créée en phase P2, sauf mention contraire.)*

| Fichier | Rôle |
|---|---|
| `docs/seo/SEO_MASTER_VINCENT_ROUSSEAU.md` | **Ce fichier — référence absolue** |
| `docs/seo/inventaire-wordpress.md` | Sortie de la phase P0 (pages, médias, métadonnées Yoast) |
| `docs/seo/url-mapping.csv` | Table de correspondance ancienne URL → nouvelle URL + code HTTP |
| `tools/extract_wpress.py` | Extracteur d'archive `.wpress` *(existe)* |
| `src/lib/url-helpers.ts` | Helpers URL (trailing slash, canonical, absolutisation) |
| `src/lib/sitemap-data.ts` | Configuration du sitemap |
| `src/lib/seo/schemas.ts` | Générateurs JSON-LD (LocalBusiness, Person, Article, FAQPage) |
| `src/lib/content/` | Contenu versionné (MDX ou modules TS typés) |
| `src/components/seo/UrgenceBanner.tsx` | Bandeau 3114 / 15 — composant unique réutilisé |
| `src/components/seo/AuthorSignature.tsx` | Signature auteur + lien page auteur (E-E-A-T) |
| `src/app/robots.ts` | robots.txt (incl. autorisation des crawlers IA) |
| `next.config.ts` | `trailingSlash`, `redirects()`, images |

---

## 14. BLOCS MACHINE-READABLE

```yaml
# ── MACHINE-READABLE: PROJET ──
projet:
  nom: vincent-rousseau-psychologue
  domaine: psychologuenantes-vincentrousseau.fr
  ville: Nantes
  type: praticien_liberal_unique
  categorie_google: YMYL_sante
  stack: nextjs_app_router
  hebergement: vercel
  cms: aucun
  edition_client: false
  volume_pages_cible: 30
  volume_pages_max: 60
  generation_programmatique: INTERDIT
```

```yaml
# ── MACHINE-READABLE: SILOS ──
silos:
  - name: identite
    pillar: /vincent-rousseau-psychologue/
    priority: 100
    role: eeat
    description: Titre, parcours, formation, numero ADELI/RPPS, approche

  - name: motifs
    pillar: /motifs-de-consultation/
    priority: 90
    min_pages: 6
    max_pages: 10
    description: Problematiques prises en charge, ancrees localement

  - name: approches
    pillar: /approche/
    priority: 75
    description: Methodes REELLEMENT pratiquees et justifiees par une formation

  - name: pratique
    pillar: /consultations/
    priority: 85
    pages: [/tarifs-et-remboursement/, /cabinet-nantes/, /rendez-vous/]
    description: Deroule, honoraires, remboursement, acces, prise de RDV

  - name: blog
    pillar: /blog/
    priority: 60
    rythme_max_par_mois: 2
    description: Autorite thematique, E-E-A-T, matiere citable par les IA
```

```yaml
# ── MACHINE-READABLE: CONTENT RULES ──
content_rules:
  auteur_signe: true
  auteur: "Vincent Rousseau, psychologue"
  validation_praticien_obligatoire: true
  min_liens_externes_autorite: 3
  sources_autorisees:
    - has-sante.fr
    - santepubliquefrance.fr
    - inserm.fr
    - ameli.fr
    - service-public.fr
    - psycom.org
    - who.int
    - 3114.fr
  bandeau_urgence_si_sujet_a_risque: obligatoire
  numero_prevention_suicide: "3114"
  date_revision_affichee: true
  interdits:
    - promesse_de_resultat
    - temoignage_patient
    - cas_clinique_identifiable
    - autodiagnostic_score
    - chiffre_non_source
    - titre_non_detenu
    - vocabulaire_commercial
    - urgence_artificielle
    - aggregate_rating_jsonld
    - schema_type_Physician
  longueurs_mots:
    accueil: [800, 1200]
    page_auteur: [800, 1500]
    motif: [1200, 1800]
    approche: [1000, 1500]
    article: [1200, 2000]
    page_pratique: [300, 700]
```

```yaml
# ── MACHINE-READABLE: LINKING RULES ──
linking_rules:
  min_internal_links_per_page: 3
  max_links_to_same_page: 2
  intra_silo_ratio: 0.70
  cross_silo_ratio: 0.30
  trailing_slash_mandatory: true
  no_links_to_noindex: true
  max_click_depth: 2
  lien_page_auteur_obligatoire_sur_article: true
  lien_externe_concurrent_local: INTERDIT
```

```yaml
# ── MACHINE-READABLE: LOCAL SEO ──
local_seo:
  priorite: 1
  gbp_categorie_principale: "Psychologue"
  nap_coherence_stricte: true
  sollicitation_avis: INTERDIT
  aggregate_rating: INTERDIT
  page_par_commune: INTERDIT
  fiche_gbp_secondaire: INTERDIT
  mots_cles_dans_nom_gbp: INTERDIT
  fraicheur_gbp_jours_max: 30
  citations_prioritaires:
    - plateforme_rdv_hds
    - annuaire_sante_ameli
    - ars_pays_de_la_loire
    - federations_professionnelles
    - reseaux_sante_locaux
    - presse_locale
  netlinking_paye: PROSCRIT
```

```yaml
# ── MACHINE-READABLE: RGPD ──
rgpd:
  donnees_sante: sensibles_art9
  hebergeur_hds: false
  stockage_messages: INTERDIT
  champ_texte_libre_formulaire: INTERDIT
  google_fonts_cdn: INTERDIT
  analytics: sans_cookie_ou_consentement_prealable
  canal_rdv_recommande: plateforme_externe_hds
  pages_noindex:
    - /mentions-legales/
    - /politique-de-confidentialite/
```

```yaml
# ── MACHINE-READABLE: MIGRATION ──
migration:
  source: wordpress_elementor
  archive: wpress
  contenu_reel_dans: wp_postmeta._elementor_data
  meta_source: yoast
  domaine_conserve: true
  urls_performantes_conservees: true
  redirect_type: 301
  chaines_redirection: INTERDIT
  gel_contenu_apres_bascule_jours: 30
  source_de_verite_decision_url: google_search_console_16_mois
```

---

> **Ce fichier fait autorité.** En cas de conflit avec une autre documentation, avec une habitude issue
> du projet Clickzou, ou avec une suggestion d'outil, **c'est ce document qui tranche**.
> Les points marqués `[À COMPLÉTER]` sont bloquants pour la phase concernée et doivent être résolus
> par l'inventaire `.wpress` ou par un échange avec Vincent.
