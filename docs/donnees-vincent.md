# DONNÉES FACTUELLES — VINCENT ROUSSEAU

**Source** : contenu Elementor du site actuel, extrait de la base (`tools/extract_elementor.py`).
**Date d'extraction** : 2026-09-07.
**Statut** : à faire confirmer par Vincent avant mise en production — ces données datent du site actuel.

> Ces valeurs alimentent le JSON-LD, la page auteur, les mentions légales et le footer.
> **Source unique** : toute modification se fait ici, jamais en dur dans un composant.

---

## 1. IDENTITÉ PROFESSIONNELLE

| Champ | Valeur |
|---|---|
| Nom | Vincent Rousseau |
| Titres | **Psychologue clinicien** · **Psychothérapeute** · **Psychanalyste** |
| Se présente sous | « Psychologue clinicien - psychanalyste » |
| **N° ADELI** | **44 93 1444 2** — déclaré auprès de la Direction des Affaires Départementales et Sociales de Loire-Atlantique |
| **N° SIRET** | **511 87 30 36 000 55** — activité libérale déclarée à l'URSSAF de Loire-Atlantique |
| Diplôme | **Master professionnel de psychologie clinique, psychopathologie et santé mentale — enfants, adolescents et adultes** |
| Université | **Université Paul Valéry Montpellier III** |
| Rattachements | **Association lacanienne internationale (ALI)** · **École psychanalytique de Bretagne (EPB)** |

> ⚠️ **À vérifier avec Vincent** : le répertoire **ADELI est en cours de remplacement par le RPPS**
> pour les psychologues. S'il dispose déjà d'un numéro RPPS, c'est celui-ci qu'il faut afficher (ou les
> deux pendant la transition). Le n° ADELI ci-dessus reste valable tant que la bascule n'est pas faite.

> ⚠️ **Lacune actuelle** : le n° ADELI figure sur la page d'accueil et sur `/dispositions-legales/`,
> **mais pas dans les mentions légales**. À corriger en v2 — c'est une mention attendue.

---

## 2. CABINET

| Champ | Valeur |
|---|---|
| Adresse | **10 bis rue de la Havane, 44000 Nantes** |
| Repères | Derrière la Manufacture des Tabacs · proche Gare Nord et Jardin des Plantes |
| Tramway | **Ligne 1, arrêt « Manufacture »** |
| Stationnement | Places payantes facilement accessibles à proximité |
| Accès voiture | Oui |
| Google Maps | `https://goo.gl/maps/DQ4LPE52wByQV3i29` |

> **À obtenir** : coordonnées GPS précises (pour le `geo` du JSON-LD) et **accessibilité PMR**
> (information absente du site actuel, attendue par une partie du public).

---

## 3. CONTACT

| Canal | Valeur |
|---|---|
| Téléphone | **06 52 30 75 86** (`tel:+33652307586`) |
| E-mail | **vincentrousseau.psy@gmail.com** |
| Prise de RDV en ligne | **Aucune plateforme** — uniquement un formulaire Elementor |

> ⚠️ **Point RGPD (§ 2.4 du master)** : les pages `/contact-…/` et `/rendez-vous-…/` utilisent un
> formulaire Elementor dont les soumissions sont **stockées en base** (tables `e_submissions`,
> `e_submissions_values`). Sur un site de psychologue, ces messages contiennent des données de santé.
> **À ne pas reproduire en v2** : formulaire sans champ libre, sans stockage, ou renvoi vers une
> plateforme hébergée HDS.

> **Adresse e-mail** : une adresse Gmail pour recevoir des demandes de patients est un point faible
> (confidentialité, image professionnelle). Recommander une adresse sur le domaine.

---

## 4. HORAIRES & MODALITÉS

| Champ | Valeur |
|---|---|
| Jours | **Du lundi au vendredi** |
| Horaires | **9 h – 20 h** |
| Modalité | **Sur rendez-vous, en présentiel uniquement** (pas de visio) |
| Durée de séance | 45 min à 1 h *(mentionné indirectement dans la FAQ — à confirmer)* |
| Confidentialité | Rappelée explicitement sur le site |

---

## 5. PUBLICS REÇUS — POINT STRUCTURANT

| Public | Reçu ? |
|---|---|
| **Adultes** | ✅ Oui |
| **Jeunes adultes** (à partir de 18 ans) | ✅ Oui |
| Adolescents | ❌ **Non** |
| Enfants | ❌ **Non** |
| Couples | ❌ **Non** |

> Formulation exacte du site : *« Je reçois toute personne qui le demande à partir de 18 ans »* et
> *« Je ne propose pas de séances pour les couples, enfants et adolescents. »*

> ⚠️ **Conséquence sur l'arborescence** : les pages `/consultations/adolescent/` et
> `/consultations/couple/` envisagées dans le brouillon du master sont **supprimées**. Cibler ces
> requêtes serait à la fois inutile (Vincent ne peut pas honorer les demandes) et déontologiquement
> problématique. Le silo « publics » se réduit à une seule page : l'adulte.

---

## 6. HONORAIRES

| Champ | Valeur |
|---|---|
| **Première séance** | **Gratuite** (décision du 2026-09-10) |
| **Tarif des séances suivantes** | **Entre 40 € et 60 € la séance** |
| Règlement | Chèque ou espèces. Pas de carte bancaire. |
| Modulation | *« Le tarif des consultations tient compte de vos propres moyens financiers »* |
| Remboursement CPAM | Non systématique |
| Mutuelles | Remboursement partiel possible selon contrat |
| Mon soutien psy | **Vincent est affilié au dispositif** (confirmé le 2026-09-10). Séance à 50 €, tarif conventionnel non modulable. Accès direct, sans passage par un médecin. |

> **Opportunité (§ 5.5 de l'inventaire)** : le site n'a **aucune page tarifs**, alors que
> `tarif psychologue nantes` et `psychologue nantes tarif` sont en position 4-5 et que l'un des deux
> déclenche un **Aperçu IA**. Le tarif modulé selon les moyens est un vrai différenciateur, à présenter
> sobrement (sans vocabulaire commercial, § 2.2 du master).

---

## 7. APPROCHE

- **Référentiel : la psychanalyse** (orientation lacanienne — cf. rattachement ALI)
- Approche **généraliste**, adaptée à la singularité de chaque personne
- Se distingue explicitement des thérapies brèves (TCC) : travail « de fond »
- Premier entretien = clarification de la demande et définition du cadre

---

## 8. MOTIFS DE CONSULTATION MENTIONNÉS

Liste effectivement citée sur le site — **base de départ pour le silo « motifs » (§ 4 du master)** :

phobies · TOC · symptômes de dépression · mal-être diffus et préoccupations existentielles · deuil ·
anxiété généralisée · troubles du comportement alimentaire · stress chronique ou passager · confiance
en soi · addictions · **dépendance affective** · difficultés de couple ou avec les enfants ·
insomnie et troubles du sommeil · troubles sexuels · comportements répétitifs d'échec ou de mise en
danger · difficultés psychosociales

> **Confirmation par la donnée** : `dépendance affective nantes` ressort déjà en **position 8** dans le
> suivi SE Ranking. Ce motif est un candidat naturel pour une des 6-10 pages du silo.

> **À arbitrer avec Vincent** : quels motifs correspondent réellement au gros de sa patientèle ?
> Le silo doit refléter sa pratique, pas la liste exhaustive de la page d'accueil.

---

## 9. RESSOURCES & LIENS EXISTANTS

| Ressource | URL |
|---|---|
| PDF — *Efficacité de la psychanalyse* (Visentini) | `/wp-content/uploads/2023/11/20-04-efficacite_psychanalyse_Visentini.pdf` |
| PDF — *24 questions sur la psychanalyse* | `/wp-content/uploads/2023/11/24-questions-sur-la-psychanalyse.pdf` |
| Code de déontologie des psychologues | `codededeontologiedespsychologues.fr` |
| Syndicat National des Psychologues | `psychologues.org` |
| Association lacanienne internationale | ALI |
| École psychanalytique de Bretagne | EPB |

> Les deux PDF sont des **actifs à conserver** : contenu de fond, potentiellement citable, et ils
> justifient des liens entrants. À migrer avec leurs URLs si elles reçoivent des liens.

---

## 10. INCOHÉRENCES DÉTECTÉES SUR LE SITE ACTUEL

| Problème | Détail | Correction v2 |
|---|---|---|
| **Liens internes cassés** | La FAQ renvoie vers une « page des services » et une « page à propos » qui **n'existent pas** dans les 12 pages du site | Créer les pages ou supprimer les renvois |
| **Crédentiels enterrés** | Le parcours et les diplômes sont sur `/dispositions-legales/`, page à vocation juridique | **Page auteur dédiée** (`/vincent-rousseau-psychologue/`) — pivot E-E-A-T du § 4 du master |
| **ADELI absent des mentions légales** | Présent ailleurs, pas là où on l'attend | Ajouter |
| **Doublon de pages légales** | `/mentions-legales/` et `/dispositions-legales/` se recouvrent partiellement | Fusionner ou clarifier les rôles |
| **Deux services de cartographie** | Google Maps sur la home, **Mappy** sur contact et RDV | Uniformiser |
| **E-mail Gmail** | `vincentrousseau.psy@gmail.com` | Adresse sur le domaine |
| **Formulaire stockant en base** | Elementor Forms → `e_submissions` | Cf. § 3 ci-dessus |

---

## 11. VISUELS — DROITS D'AUTEUR (POINT BLOQUANT)

**Vérifié le 2026-09-07** en ouvrant les fichiers sources de `_wp_extract/uploads/2023/11/`.

L'identité visuelle du site repose sur des reproductions de peintures modernistes. Trois des quatre
œuvres identifiées sont **encore protégées par le droit d'auteur en France** (70 ans après la mort de
l'auteur), et deux fichiers portent **le filigrane visible d'un site tiers**.

| Fichier | Œuvre | Artiste | Décès | Domaine public (FR) | Statut |
|---|---|---|---|---|---|
| `IMG-20231102-WA0010.jpg` | *Le Carnaval d'Arlequin* (1924-25) | **Joan Miró** | 1983 | **2054** | ❌ Protégée — **filigrane « WahooArt.com » visible** — utilisée en **hero de la page d'accueil** |
| `IMG-20231109-WA0010.jpg` | *The Concert* | **Marc Chagall** | 1985 | **2056** | ❌ Protégée — **filigrane « WahooArt.com » visible** |
| `IMG-20231109-WA0009.jpg` | Œuvre signée, datée 1939-1943 | **Marc Chagall** | 1985 | **2056** | ❌ Protégée |
| `IMG-20220106-WA0014.jpg` | *Nature morte d'après « La Desserte » de Jan Davidsz. de Heem* (1915) | **Henri Matisse** | 1954 | **2025** | ✅ **Domaine public depuis le 1ᵉʳ janvier 2025** |

### Deux problèmes distincts

1. **Droit d'auteur.** Miró et Chagall sont représentés en France par l'**ADAGP**, qui gère activement
   les droits de reproduction et de représentation. Diffuser ces œuvres sur le site professionnel d'un
   praticien libéral, sans licence, constitue une contrefaçon. Le risque est faible mais réel, et il
   pèse sur Vincent personnellement.
2. **Filigrane d'un tiers.** Les fichiers Miró et Chagall proviennent manifestement de `WahooArt.com`
   et **conservent le filigrane de copyright de ce site**, aujourd'hui affiché en pleine largeur sur la
   page d'accueil. Indépendamment du droit d'auteur, c'est un défaut de crédibilité visible par tout
   visiteur attentif — sur un site dont l'argument central est le sérieux professionnel.

### Décision pour la v2

**Ne pas reprendre les œuvres protégées.** La direction artistique — peinture moderniste, chaleureuse,
cultivée, cohérente avec la psychanalyse — est un **vrai actif à conserver**. Elle se distingue
avantageusement des clichés du secteur (photos de détresse en banque d'images, cerveaux stylisés),
que le master interdit par ailleurs (§ 8.5). Trois voies possibles :

| Option | Détail | Effort |
|---|---|---|
| **A. Domaine public** *(recommandée)* | Puiser dans les œuvres dont l'auteur est mort avant 1956 : **Matisse (2025)**, Klee (1940), Kandinsky (1944), Mondrian (1944), Delaunay, Vallotton, Klimt, Schiele, Redon, Munch… Sources en haute définition et sans filigrane : Rijksmuseum, Art Institute of Chicago, Met Museum, Wikimedia Commons. Même registre esthétique, zéro risque. | Faible |
| **B. Licence ADAGP** | Demander une autorisation pour les œuvres actuellement utilisées. Payant, annuel, à renouveler. | Moyen, coût récurrent |
| **C. Création originale** | Illustrations commandées ou générées dans le même esprit. Identité 100 % propriétaire, et **contenu non copiable** — ce que les core updates 2026 récompensent (§ 12.3). | Élevé |

> **À valider avec Vincent avant toute intégration de visuel.** C'est sa responsabilité qui est
> engagée, et le choix esthétique lui appartient.
