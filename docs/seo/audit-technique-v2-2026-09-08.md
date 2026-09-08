# AUDIT TECHNIQUE DU NOUVEAU SITE — 8 septembre 2026

Audit du site v2 en local, avant mise en ligne. Complète
`audit-positions-2026-09-08.md`, qui porte sur les positions du site WordPress
actuel : celui-ci porte sur la construction du nouveau.

**Méthode.** 16 pages du sitemap parcourues et analysées automatiquement :
en-têtes HTTP, balises, plan de titres, données structurées, images, nombre de
mots. Plus des contrôles manuels sur les redirections, les codes 410, le
sitemap, `robots.txt` et la lisibilité par les moteurs génératifs. Tout ce qui
suit est mesuré, pas estimé.

---

## 1. Tableau de bord

| URL | title | desc. | h1 | mots | img | JSON-LD |
|---|---|---|---|---|---|---|
| `/` | 39 | 150 | 1 | 1 371 | 7 | LocalBusiness, MedicalBusiness, Person |
| `/vincent-rousseau-psychologue/` | 52 | 131 | 1 | 1 083 | 2 | + BreadcrumbList |
| `/psychotherapeute-nantes/` | **66** | **171** | 1 | 1 129 | 1 | + BreadcrumbList |
| `/psychanalyste-nantes/` | **63** | **192** | 1 | 1 103 | 1 | + BreadcrumbList |
| `/psychologue-clinicien-nantes/` | **71** | **228** | 1 | 785 | 1 | + BreadcrumbList |
| `/psychologue-clinicien-psychotherapeute-…/` | **102** | 160 | 1 | 1 428 | 1 | + BreadcrumbList |
| `/consultations/` | 58 | **213** | 1 | 944 | 0 | + BreadcrumbList |
| `/tarifs-et-remboursement/` | **64** | **162** | 1 | 875 | 0 | + BreadcrumbList |
| `/cabinet-nantes/` | 60 | **208** | 1 | **416** | 0 | + BreadcrumbList |
| `/rendez-vous-psychologue-nantes/` | 60 | **213** | 1 | 730 | 0 | + BreadcrumbList |
| `/contact-psychologue-clinicien-nantes/` | 48 | **186** | 1 | 527 | 0 | + BreadcrumbList |
| `/aide-faq/` | **61** | **161** | 1 | 1 045 | 0 | + FAQPage |
| `/blog/` | 45 | **183** | 1 | **332** | 0 | + BreadcrumbList |
| `/plan-du-site/` | 53 | 93 | 1 | **294** | 0 | + BreadcrumbList |
| `/blog/consultation-psychologue-a-distance/` | **81** | **225** | 1 | 1 003 | 0 | + Article |
| `/blog/secret-professionnel-psychologue/` | **90** | **210** | 1 | 1 228 | 0 | + Article |

**Ce qui est sain d'emblée :** 16 pages sur 16 en 200, **un seul `h1` partout**,
**aucun title en double, aucune description en double**, canonique
auto-référente sur chaque page, données structurées présentes partout et
`FAQPage` correctement réservé à une seule page.

---

## 2. Plan de titres — page par page

C'était la demande explicite. Voici l'état **après les corrections du § 3**.

**Aucun saut de niveau sur aucune des 16 pages.** Aucun `h1` manquant ni
dupliqué. Aucune page n'enchaîne un `h1` sur un `h3`.

### `/` — accueil
```
h1  Psychologue à Nantes
  h2  En quelques mots
    h3  Ce qui amène à consulter · Comment ça se passe · Venir au cabinet
  h2  Mes titres professionnels
    h3  Psychologue clinicien · Psychothérapeute · Psychanalyste
    h3  Formation et enregistrement          ← ajouté
  h2  La psychanalyse, c'est quoi ?
  h2  Ressources et liens utiles
    h3  En savoir plus · Liens utiles
  h2  Questions fréquentes
    h3  les 7 questions                      ← ajoutées
  h2  Vous souhaitez prendre rendez-vous ?   ← ajouté
```

### `/vincent-rousseau-psychologue/`
```
h1  Vincent Rousseau, psychologue à Nantes
  h2  Ma pratique
  h2  Pourquoi consulter ? Qu'est-ce que je propose ?
  h2  Les trois titres sous lesquels j'exerce
    h3  Psychologue clinicien · Psychothérapeute · Psychanalyste  ← ajoutés
  h2  Formation et enregistrement
  h2  Ce que je ne fais pas
  h2  Me joindre
```

### Les autres pages

| Page | Structure |
|---|---|
| `/psychotherapeute-nantes/` | h1 + 6 h2, dont 3 h3 sous « Un titre protégé » |
| `/psychanalyste-nantes/` | h1 + 7 h2, dont 5 h3 sous « Ce que l'on écoute en séance » |
| `/psychologue-clinicien-nantes/` | h1 + 5 h2, sans h3 |
| `/psychologue-clinicien-psychotherapeute-…/` | h1 + 9 h2, sans h3 |
| `/consultations/` | h1 + 5 h2, dont 6 h3 |
| `/tarifs-et-remboursement/` | h1 + 5 h2, dont 3 h3 |
| `/cabinet-nantes/` | h1 + 4 h2, dont 3 h3 |
| `/rendez-vous-psychologue-nantes/` | h1 + 2 h2, dont 6 h3 |
| `/contact-psychologue-clinicien-nantes/` | h1 + 3 h2, dont 4 h3 |
| `/aide-faq/` | h1 + 15 h2 (14 questions + 1 conversion) |
| `/blog/` | h1 + 2 h2 (un par article) |
| `/plan-du-site/` | h1 + 6 h2 |
| Articles de blog | h1 + 4 à 6 h2 |

**Une remarque sur `/aide-faq/`.** Ses 14 questions sont des `h2` et non des
`h3`, parce que la liste suit directement le `h1` sans titre de section
intermédiaire. C'est juste, mais cela donne une page à 15 `h2` de même rang. Si
l'on voulait la structurer par thème — prix, déroulé, cadre — les questions
passeraient en `h3` sous trois `h2`. Ce n'est pas un défaut, c'est une option.

---

## 3. Ce qui a été corrigé pendant cet audit

### 3.1 Les questions de FAQ n'étaient pas des titres

Elles n'étaient que du texte dans le `<summary>`. Le plan s'arrêtait à
« Questions fréquentes », sans rien dessous. Corrigé : `h3` sur l'accueil, `h2`
sur `/aide-faq/`, le rang dépendant de la profondeur réelle.

**Note sur HeadingsMap.** L'extension ne liste que la question dépliée. C'est
son comportement à elle : elle ignore le contenu des `<details>` fermés. Les
sept `h3` sont bien dans le HTML servi — vérifié — et le `<summary>` est visible
en permanence, donc ni Google ni un lecteur d'écran ne les manque. Pour s'en
convaincre : déplier une question la fait apparaître dans l'extension.

### 3.2 Des intitulés visuellement titres, mais pas déclarés

Balayage des 16 pages à la recherche des `<p>` et `<span>` en gras qui ouvrent
un bloc. Trois cas avérés, tous repérés par incohérence entre deux pages :

| Page | Intitulé | Était | Devient |
|---|---|---|---|
| `/vincent-rousseau-psychologue/` | Psychologue clinicien, Psychothérapeute, Psychanalyste | `<p>` | `h3` |
| `/` | Formation et enregistrement | `<p>` | `h3` |
| `/` | Vous souhaitez prendre rendez-vous ? | `<p>` | `h2` |

Les deux premiers étaient déjà des titres **sur l'autre page qui montre le même
contenu** : ce sont des oublis, pas des choix.

### 3.3 Ce qui a été laissé tel quel, et pourquoi

Le balayage remonte 121 intitulés. La grande majorité ne doit **pas** devenir
un titre :

- **Les `<dt>` des listes de définitions** (Horaires, Accès, Tarif, Où, Combien,
  Durée d'une séance…). `<dt>` est déjà l'élément sémantiquement juste. Les
  passer en titres serait une régression.
- **Les surtitres** (« Vos questions », « Mon approche », « Titre protégé par la
  loi », « 14 questions · Prix, remboursement »). Ils *annoncent* un titre, ils
  n'en sont pas un.
- **Les numéros d'étapes** (1, 2, 3, 01, 02, 03) : décoratifs.
- **Les libellés de l'en-tête** (Téléphone, Adresse, courriel), présents sur
  toutes les pages.
- **« Besoin d'une aide immédiate ? »**, la bannière d'urgence. Cas discutable :
  c'est bien un bloc autonome. Mais lui donner un titre l'ajouterait au plan de
  huit pages, entre deux sections de contenu, sans rien apporter à qui parcourt
  la page. Laissé délibérément — à rediscuter si vous préférez l'inverse.

---

## 4. Les titles sont trop longs — cause unique

**Huit pages sur seize dépassent 60 caractères.** La cause est unique : le
suffixe global du gabarit, `— Vincent Rousseau, psychologue à Nantes`, qui pèse
**40 caractères** à lui seul.

Il ne reste donc que ~20 caractères utiles pour viser 60. **Aucun title du site
ne peut y arriver.** Le pire est la page pédagogique, à **102 caractères** :

> Psychologue ou psychiatre : les différences entre les « psy » **— Vincent Rousseau, psychologue à Nantes**

Google coupe vers 60. Tout ce qui suit est perdu, et sur les pages de blog c'est
le sujet même de l'article qui saute.

**Préconisation :** réduire le suffixe à **`— Vincent Rousseau, Nantes`**
(26 caractères), et le supprimer là où le title contient déjà « Nantes ».
Changement global, réversible, non appliqué : c'est un arbitrage d'identité
autant que de SEO, il vous revient.

---

## 5. Onze descriptions sur seize dépassent 160 caractères

Même conséquence : la fin est coupée en SERP. Les plus longues —
`/psychologue-clinicien-nantes/` (228), `/blog/consultation-…/` (225),
`/consultations/` (213), `/rendez-vous-…/` (213) — perdent souvent leur appel à
l'action final.

À l'inverse, `/plan-du-site/` (93) est un peu courte, mais c'est une page en
`noindex` : sans importance.

Correction simple, page par page. Non faite : douze réécritures qui méritent
d'être relues, pas expédiées.

---

## 6. ⚠️ Tous les `alt` sont vides

**12 images, 12 `alt=""`.** Sur `/`, `/vincent-rousseau-psychologue/`,
`/psychotherapeute-nantes/`, `/psychanalyste-nantes/`,
`/psychologue-clinicien-nantes/` et la page pédagogique.

**C'est un conflit assumé dans le code, pas un oubli.** Chaque image porte un
commentaire disant qu'elle est décorative, donc `alt` vide — ce qui est la
règle d'accessibilité correcte pour une image purement décorative. Mais le
master SEO impose « alt descriptif systématique, jamais vide ».

**Mon avis, et il va contre le master :** ces images sont des œuvres du domaine
public choisies pour l'ambiance. Elles n'illustrent pas le propos, elles
l'accompagnent. Leur donner un `alt` descriptif obligerait à écrire « tableau de
Matisse représentant une nature morte » — une information sans valeur pour un
lecteur d'écran au milieu d'un texte sur la psychanalyse, et sans valeur pour
Google sur des requêtes de psychologue à Nantes. **Le `figcaption` sous chaque
image porte déjà le crédit de l'œuvre, en texte lisible par tous.**

La règle du master a été écrite pour des sites où les images illustrent le
contenu. Ici elles ne l'illustrent pas. **Je recommande de maintenir les `alt`
vides et de noter l'exception dans le master**, plutôt que de remplir douze
attributs pour satisfaire une règle inadaptée au cas.

Décision à prendre : c'est le seul point où je propose de déroger au document
de référence.

---

## 7. Trois pages minces

| Page | Mots | Commentaire |
|---|---|---|
| `/cabinet-nantes/` | **416** | Le vrai sujet. Voir ci-dessous. |
| `/blog/` | 332 | Page de listing à deux articles : normal, s'étoffera |
| `/plan-du-site/` | 294 | `noindex`, sans objet |

**`/cabinet-nantes/` est la seule qui pose problème**, et l'audit de positions
converge : six requêtes géographiques ont du volume (`psychologue nantes zola`
90, `psychologue nantes sud` 20, `nantes nord` 10, `chantenay` 10, `route de
vannes` 10), **et aucune ne correspond au quartier réel du cabinet**. La page
qui devrait porter les repères de la Manufacture des Tabacs, du Jardin des
Plantes et de la Gare Nord est la plus courte du site.

C'est l'action de contenu au meilleur rapport effort/gain de tout le dossier.

---

## 8. Redirections, 410, 404

| Contrôle | Résultat |
|---|---|
| `/dispositions-legales/` | **301** → `/mentions-legales/` |
| `/politique-de-cookies-ue/` | **301** → `/politique-de-confidentialite/` |
| `/home-main/` | **301** → `/` |
| Sept slugs de démonstration WordPress | **410 Gone** |
| URL inexistante | **404** |

**Aucune chaîne de redirection.** La forme sans slash final renvoie un 308 de
normalisation avant le 301 — mais les URLs réellement indexées par Google
portent toutes le slash final (WordPress servait en `/%postname%/`), elles
touchent donc directement le 301.

Le choix du 410 plutôt que d'une redirection est le bon : ces sept articles de
démonstration n'ont pas d'équivalent, et les rediriger vers l'accueil aurait
produit des soft-404.

---

## 9. Sitemap et robots.txt

- **16 URLs**, toutes en 200, aucune page en `noindex` dans le sitemap.
- `lastmod` au 8 septembre 2026 pour toutes : honnête, c'est la date réelle de
  rédaction. À faire évoluer par page ensuite.
- `robots.txt` : `Allow: /`, `Disallow: /api/`, `Host` et `Sitemap` déclarés.

---

## 10. Référencement par les IA

C'est le point le plus solide du site, et de loin.

### 10.1 Ce qui est déjà en place

**Les robots d'IA sont explicitement autorisés.** `robots.txt` nomme un par un
`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`,
`Google-Extended`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `CCBot`,
`Applebot-Extended`. C'est rare et c'est décisif : `Google-Extended` bloqué,
par exemple, exclut le site des réponses de Gemini sans rien changer au
référencement classique.

**Le contenu est dans le HTML, sans JavaScript.** Le site est statique. Les
robots d'IA exécutent mal ou pas du tout le JavaScript : un site rendu côté
client leur est largement invisible. Ici, tout est lisible au premier octet.

**Les réponses de la FAQ restent dans le DOM même repliées.** Les accordéons
sont des `<details>` natifs, pas du JavaScript qui injecte le contenu au clic.
Un moteur génératif lit les 14 réponses sans avoir à cliquer.

**Les questions sont maintenant des titres** (§ 3.1). C'est ce qui permet de
rattacher sans ambiguïté une question à sa réponse.

**Les affirmations sont sourcées vers des sources primaires** — Légifrance,
ameli.fr — avec un composant `Sources` dédié. C'est exactement ce qu'un modèle
cherche pour décider s'il peut citer une page sur un sujet de santé.

**Chaque page porte une signature d'auteur et une date de mise à jour.**
Attribution et fraîcheur, les deux critères d'E-E-A-T qu'un modèle sait lire.

**Les données structurées sont complètes et correctes** : `LocalBusiness` +
`MedicalBusiness` + `Person` sur toutes les pages, `BreadcrumbList` sur les
pages internes, `Article` sur les billets, `FAQPage` sur une seule page.

### 10.2 Ce que j'ai ajouté

**`/llms.txt`** — fiche de synthèse en markdown : identité, titres, adresse,
tarifs, pages principales, numéros d'urgence. Généré depuis `site-config`, donc
impossible à désynchroniser.

**À prendre pour ce que c'est.** La norme llmstxt.org date de 2024 et **aucun
grand fournisseur n'a documenté qu'il la lisait** — ni OpenAI, ni Anthropic, ni
Google. Ce fichier n'apporte aucun gain démontré. Il est écrit parce qu'il coûte
trente lignes et qu'il sera déjà là si la norme s'impose. C'est un pari à prix
nul, pas une optimisation.

### 10.3 La vraie limite

Elle n'est pas technique. Un modèle cite ce qu'il trouve **et ce qui fait
autorité ailleurs**. Le site a un indice de visibilité de 0,00 et 60 mots-clés
en top-100 : sur une question générale — « quelle différence entre un
psychologue et un psychiatre » — il sera devancé par Doctolib, psychologue.net
et les grands sites santé, qui ont l'autorité que ce site n'a pas.

**Là où il peut être cité, c'est sur les questions locales** — « psychologue à
Nantes », « psychanalyste Nantes », « tarif psychologue Nantes ». Sur celles-là
il est premier des praticiens, sa page est structurée, sourcée et signée, et
c'est ce qui décide.

---

## 11. Ce qui reste à décider

| # | Sujet | Qui décide |
|---|---|---|
| 1 | Raccourcir le suffixe des titles à `— Vincent Rousseau, Nantes` | Vous |
| 2 | `alt` vides : maintenir l'exception ou suivre le master | Vous (§ 6) |
| 3 | Réécrire les onze descriptions trop longues | À faire, page par page |
| 4 | Étoffer `/cabinet-nantes/` avec les repères réels | À faire (§ 7) |
| 5 | Structurer `/aide-faq/` par thèmes | Option, pas un défaut |
| 6 | Bannière d'urgence : lui donner un titre ou non | Vous (§ 3.3) |

Et les trois actions hors site, inchangées depuis l'audit de positions :
vérifier la fiche Google Business Profile, créer la Search Console — sans
historique rétroactif —, s'inscrire dans les annuaires gratuits du top 20.
