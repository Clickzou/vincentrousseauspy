# AUDIT DE POSITIONNEMENT — 8 septembre 2026

Source : `docs/seo/positions-actuelles.csv`, relevé des 6 et 7 septembre 2026, 38 mots-clés.
Toutes les valeurs ci-dessous sont tirées de ce fichier, aucune n'est estimée.

---

## 0. CORRECTION D'UNE ERREUR PROPAGÉE DANS LE PROJET

Quatre fichiers affirmaient que `/psychanalyste-nantes/` **se classait 2e sur
« psychanalyste nantes »**. C'est faux.

| | Réalité mesurée |
|---|---|
| `/psychanalyste-nantes/` | **24e** sur « rousseau vincent » (70 rech./mois), et sur rien d'autre |
| « psychanalyste nantes », **2e** | porté par **l'accueil** |

L'erreur a été corrigée dans `sitemap-data.ts`, `psychanalyste-nantes/page.tsx`,
`Navigation.tsx` et le § 6 du point d'étape.

**Elle n'invalide pas la refonte, elle la renforce** : il ne s'agissait pas d'enrichir une
page déjà bien classée, mais de créer une page là où il n'y avait qu'un slug vide.

---

## 1. LE CONSTAT CENTRAL — UNE SEULE PAGE PORTE TOUT

| URL portante | Mots-clés |
|---|---|
| **`/` (accueil)** | **33** sur 38 |
| `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` | 3, **aucun classé** |
| `/psychanalyste-nantes/` | 1, en 24e position |
| `/contact-psychologue-clinicien-nantes/` | 1, en 37e position |

Volume total suivi : **16 030 recherches/mois**, dont **14 130 déjà en top 10**.

L'accueil tente de répondre à onze intentions différentes — psychologue, psychothérapeute,
psychanalyste, psychiatre, tarifs, avis, marque, motif clinique. C'est ce qui explique qu'il
plafonne en 4-5 sur « psychologue nantes » et en 9 sur le cluster psychothérapeute : une
page qui parle de tout n'est la meilleure réponse à rien.

---

## 2. RÉPARTITION CIBLE — QUELLE PAGE POUR QUEL MOT-CLÉ

### `/` — cluster « psychologue » · ~6 500 rech./mois

`psychologue nantes` (5 400, **pos. 5**) · `psychologue sur nantes` (210, 5) ·
`nantes psychologue` (210, 5) · `psychologues nantes` (140, 5) · `psy nantes` (270, 7) ·
`psy a nantes` (10, 5) · `psychologue à nantes` (0, 5) · `nantes psychologie` (210, **14**) ·
`psychologue clinicien nantes` (170, **4**) · `psychologue nantes nord` (30, 4) ·
`psychologue nantes avis` (50, 4)

> L'accueil doit **perdre** les autres clusters au profit des pages dédiées, mais garder
> celui-ci. C'est le seul où il est légitime.

### `/psychotherapeute-nantes/` — ~6 650 rech./mois · **le plus gros gisement**

`psychotérapeute nantes` (6 600, **pos. 9**, graphie fautive) ·
`psychothérapeute nantes` (10, 9) · `psychotherapeute nantes` (10, 9) ·
`psychothérapeute nantes avis` (30, 7) · `psychologue psychothérapeute nantes` (10, 4)

> Aujourd'hui **entièrement porté par l'accueil**. La page existe depuis le 8 septembre et
> n'a pas encore été explorée. C'est le premier indicateur à surveiller après la bascule.

### `/psychanalyste-nantes/` — ~490 rech./mois

`psychanalyste nantes` (50, **pos. 2 — sur l'accueil**) · `psychanalyse nantes` (50, 5) ·
`psychanalyste loire atlantique` (320, **10**) ·
`psychologue psychanalyste nantes` (50, **1**) ·
`psychologue clinicien-psychanalyste nantes` (0, **1**)

> ⚠️ **Le risque n° 1 de la bascule est ici.** Deux positions 1 et une position 2 sont
> portées par l'accueil, dont on vient de retirer le texte long sur la psychanalyse.
> L'accueil conserve volontairement une section condensée et un lien : ne pas la supprimer.

### `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` — ~1 390 rech./mois

`psychiatre nantes` (480, **non classé**) · `psychiatres nantes` (390, non classé) ·
`psychiatre nantes avis` (50, non classé) · `psychiatre psychanalyste nantes` (70, 4) ·
`psychiatre psychothérapeute nantes` (30, 7) · `psychopraticien nantes` (320, **7**) ·
`psycho analyste clinicien` (50, non classé) · `psycho-analyste clinicien` (50, non classé)

> **920 rech./mois en « psychiatre… » sur lesquelles le site ne ressort pas du tout.** La
> page pédagogique est le seul moyen de les viser sans revendiquer un titre non détenu.
> `psychopraticien nantes` (320, pos. 7) est un cas à part : la page explique pourquoi
> l'appellation ne garantit rien — on répond à la requête sans revendiquer le terme.

### `/tarifs-et-remboursement/` — 40 rech./mois, forte intention

`tarif psychologue nantes` (20, 5, **Aperçu IA**) · `psychologue nantes tarif` (20, 4)

> Volume faible, intention maximale, et un Aperçu IA à alimenter. La page existe depuis le
> 8 septembre.

### `/vincent-rousseau-psychologue/` — cluster de marque · ~600 rech./mois

`vincent rousseau` (480, **37e sur `/contact-…/`**) · `vincent rousseau nantes` (40, **1**) ·
`vincent rousseau psychologue` (10, **1**) · `rousseau vincent` (70, 24e sur `/psychanalyste-…/`)

> Quatre requêtes de marque réparties sur **trois URLs différentes**. `vincent rousseau`
> (480/mois) est la plus grosse et la plus mal servie — 37e, avec une homonymie à combattre.
> La page auteur doit devenir l'entité de référence.

### Hors périmètre

`tableau psychologue` (110) et `emploi psychologue nantes 44` (10) : hors sujet, à sortir du
suivi. `dépendance affective nantes` (0, pos. 8, Aperçu IA) : amorce du futur silo motifs.

---

## 3. PRÉCONISATIONS, PAR ORDRE D'IMPACT

| # | Action | Pourquoi |
|---|---|---|
| 1 | **Créer la Search Console avant la bascule** | Elle n'existe pas. Elle ne rétroagit pas : chaque semaine perdue est un mois d'historique en moins pour mesurer l'effet de la refonte |
| 2 | **Surveiller le cluster psychanalyse en priorité** | Positions 1, 1 et 2 portées par l'accueil, dont on a déplacé le texte. Relevé hebdomadaire pendant 6 semaines |
| 3 | **Trancher le doublon `/psychologue-clinicien-nantes/`** | Depuis le 8 septembre, son texte est aussi sur la page auteur (demande client). Elle n'a **aucune position mesurée** : la rediriger en 301 vers la page auteur consoliderait les signaux sans rien perdre de mesurable. Voir § 9 du point d'étape. **Sistrix confirme** : `psychologue clinicien nantes` est bien en position 3 avec 50 rech./mois, mais porté par l'accueil, pas par cette page |
| 4 | **Consolider la marque sur la page auteur** | 600 rech./mois éparpillées sur trois URLs, la principale en 37e position |
| 5 | **Google Business Profile** | 24 des 38 mots-clés déclenchent un Local pack. Aucun contenu ne compense l'absence de fiche maîtrisée |
| 6 | **Ne pas toucher à l'accueil sur le cluster « psychologue »** | Position 3 à 5 selon la source, 49 % des clics mesurés. C'est l'actif principal du site — confirmé au § 5.10 |
| 7 | **Écrire « psychothérapeute » correctement, partout** | Les 6 600 rech./mois attribuées à la graphie fautive sont un artefact d'agrégation. Reproduire la faute coûterait la crédibilité d'un praticien qui détient le titre |

---

## 4. CE QUE CET AUDIT NE DIT PAS

- **38 mots-clés, c'est un échantillon.** Sans Search Console, la longue traîne réellement
  captée est inconnue. Les pages « non positionnées » le sont *sur ces 38 requêtes*.
- **Les positions datent des 6-7 septembre 2026**, avant toute mise en ligne de la v2.
  Elles décrivent le site WordPress, pas le nouveau.
- **Aucune donnée de trafic réel** : la colonne `trafic_prevu` est une estimation de
  l'outil, pas une mesure.

---

# 5. DONNÉES SISTRIX — 8 septembre 2026

Trois exports fournis par le client : positions en SERP, et 127 idées de mots-clés en deux
pages. **Première source indépendante du CSV de l'agence.** Elle infirme une recommandation
faite plus haut dans ce document.

## 5.1 Divergence des volumes entre outils — à retenir avant tout le reste

| Mot-clé | CSV agence | Sistrix « positions » | Sistrix « idées » |
|---|---|---|---|
| `psychologue nantes` | 5 400 | **2 100** | — |
| `psy nantes` | 270 | **800** | — |
| `psychanalyste nantes` | 50 | **80** | **248** |
| `psychologue nantes avis` | 50 | — | **122** |
| `psychothérapeute nantes` | 10 | **100** | — |

Écarts d'un facteur 2 à 5, y compris **entre deux vues du même outil** (`psychanalyste
nantes` : 80 contre 248). Les positions divergent aussi : `psychologue nantes` est donné en
position 5 par l'agence le 7 septembre, en position 3 par Sistrix le 8. Pour une requête
locale, la position dépend du lieu d'où la mesure est faite — les deux peuvent être exactes.

**Conséquence méthodologique : aucune décision ne doit reposer sur un volume absolu.** Seul
l'ordre relatif est stable, et les deux outils s'accordent sur cet ordre. C'est exactement ce
qui rend la Search Console prioritaire : c'est la seule source non modélisée, et elle n'a
aucun historique rétroactif.

## 5.2 Les 15 premières positions Sistrix

| Mot-clé | Pos. | Clics | Vol. | URL |
|---|---|---|---|---|
| psychologue nantes | 3 | **213** | 2 100 | `/` |
| psy nantes | 3 | 80 | 800 | `/` |
| psychanalyste nantes | 1 | 26 | 80 | `/` |
| cabinet psychanalyste | 1 | 19 | 60 | `/` |
| psychothérapie nantes | 2 | 16 | 100 | `/` |
| psychologue homme nantes | 2 | 15 | 100 | `/` |
| psychologue psychanalyste nantes | 1 | 14 | 40 | `/` |
| psychothérapeute nantes | 4 | 10 | 100 | `/` |
| vincent rousseau nantes | 1 | 10 | 30 | `/` |
| psychologue psychanalyste | 16 (−6) | 8 | 1 300 | `/` |
| psychologues nantes | 3 | 6 | 50 | `/` |
| psychologue clinicien nantes | 3 | 5 | 50 | `/` |
| psychologue nantes zola | 6 | 5 | 90 | `/` |
| psychologue humaniste nantes | 7 | 4 | 100 | `/` |
| psychologue confiance en soi nantes | 6 | 4 | 80 | `/` |

**15 lignes sur 15 pointent vers l'accueil.** Confirmation directe du constat de la section 1,
par une source indépendante. 60 mots-clés seulement en top-100.

`psychologue nantes` représente **49 % des clics visibles** (213 sur 435).

## 5.3 L'arithmétique qui réordonne les priorités

213 clics pour 2 100 recherches en position 3 = **CTR de 10,1 %**, conforme aux courbes
usuelles. En position 1, le CTR attendu est de 27 à 30 %, soit **≈ 590 clics**, un gain de
**+375 clics/mois**.

À comparer avec le silo « motifs » envisagé : six pages à 80 recherches/mois, atteignant la
position 3, produiraient **48 clics/mois** au total.

**Le rapport est de 8 pour 1 en faveur du seul mot-clé principal.**

> ⚠️ **HYPOTHÈSE INVALIDÉE — voir § 6.1.** L'export « Concurrents » montre que quatre
> des cinq premiers concurrents sont des annuaires (Doctolib, psychologue.net, Resalib,
> PagesJaunes). La position 1 organique est vraisemblablement hors d'atteinte, et la
> position 3 est le plafond. Le gain se joue dans le **Local pack**, donc sur la fiche
> Google Business Profile — pas sur le site.

## 5.4 ⚠️ LE SILO « MOTIFS DE CONSULTATION » N'EST PAS SOUTENU PAR LA DONNÉE

Recommandation antérieure **abandonnée**. Sur **127 idées de mots-clés**, il n'existe **aucune
requête locale par symptôme** : ni stress, ni deuil, ni burn-out, ni anxiété, ni dépression,
ni angoisse, ni phobie, ni sommeil, associés à Nantes. Le CSV de l'agence (38 mots-clés) n'en
contient aucune non plus.

`motifs consultation psychologue` : **volume 0.**

Deux exceptions, et ce sont des exceptions :

- `psychologue confiance en soi nantes` — 80, position 6. **Une seule requête ne fait pas un
  silo.**
- `dépendance affective nantes` — volume 0, position 8 (CSV agence).

**Ce que la demande locale exprime réellement**, c'est un **titre** (`psychologue`, `psy`,
`psychanalyste`, `psychothérapeute`, `psychiatre`) ou une **modalité technique** (`emdr`,
`hypnose`, `tcc`, `thérapie de couple`, `thérapie familiale`) — jamais un symptôme. Or aucune
des modalités qui ressortent n'est celle de Vincent : `psychologue emdr nantes` (139),
`psychologue hypnose nantes` (146), `psychologue nantes tcc` (31), `thérapie de couple nantes`
(262), `thérapie familiale nantes` (108), `somatothérapie nantes` (42). Les cibler serait
mentir sur la pratique.

Même remarque pour `psychologue humaniste nantes` (100, position 7) : le site s'y positionne,
mais l'approche de Vincent est psychanalytique. **Position acquise à ne pas renforcer.**

## 5.5 Le vrai gisement inexploité — l'informationnel, sur des pages déjà écrites

Volumes nationaux, intention « Savoir », sur des pages qui existent déjà dans la v2.

**`/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` ≈ 7 800/mois**
`différence entre psychologue et psychiatre` 3 648 · `différence psychologue psychiatre`
2 397 · `différence psychologue psychothérapeute` 623 · `psychologue ou psychiatre` 385 ·
`psychologue et psychiatre` 221 · `qui aller voir psychologue ou psychiatre` 108 · `différence
entre psychothérapie et psychanalyse` 51 · `psychanalyste titre protégé` 31

**`/tarifs-et-remboursement/` ≈ 3 300/mois**
`psychologue remboursement` 1 078 · `psychothérapeute remboursement` 1 053 · `psychologue
prix` 986 · `psychiatre ou psychologue remboursé` 165 · `psychanalyste tarif` 163

**`/psychanalyste-nantes/` ≈ 900/mois**
`les phases d'une psychanalyse` 221 · `approche psychodynamique` 173 · `les principes de la
psychanalyse` 173 · `psychanalyse effets négatifs` 147 · `critique de la psychanalyse` 71 ·
`durée psychanalyse` 70 · `les bienfaits d'une psychanalyse` 53

**`/psychologue-clinicien-nantes/` ≈ 900/mois**
`qu'est-ce qu'un psychologue` 316 · `rôle du psychologue` 270 · `quel est le rôle d'un
psychologue` 173 · `dans quel cas consulter un psychologue` 133 · `que soigne un psychologue`
117 · `que fait un psychologue` 46

**Réserve honnête :** ce trafic est national et ne convertit pas en rendez-vous. Sa valeur est
d'autorité thématique et de longue traîne, au bénéfice indirect du mot-clé principal. Son coût
est faible — il s'agit d'optimiser des pages écrites, non d'en créer. `psychanalyse effets
négatifs` et `critique de la psychanalyse` sont à traiter de front : les éluder serait
contraire au principe E-E-A-T retenu au § 3 du master.

## 5.6 Les avis — troisième confirmation indépendante

- `psychologue nantes avis` — **122** (Sistrix), 50 et **position 4** (CSV agence)
- `psychothérapeute nantes avis` — 10, **CPC 10,80 €**, soit **cinq fois le CPC le plus élevé
  du reste de la liste** (2,30 €)
- `psychanalyse active avis` — 76
- Le CSV de l'agence liste **« Avis » parmi les SERP features de `psychologue nantes`**

Le public cherche explicitement des avis sur les psychologues nantais, et un annonceur paie
10,80 € le clic pour cette intention. **Le levier est la fiche Google Business Profile, pas le
site :** les avis « self-serving » publiés par un établissement sur son propre site sont
exclus des consignes Google sur les données structurées — aucune étoile en SERP, gain nul.
S'y ajoute l'obstacle déontologique : un témoignage de patient est une donnée de santé au sens
de l'article 9 du RGPD, et le praticien qui le sollicite est à l'origine de la divulgation.
**Aucun témoignage de patient sur le site.**

État de la fiche Google Business Profile : **non vérifié à ce jour.** À faire avant toute
production de contenu.

## 5.7 `psychologue nantes zola` — faux positif instructif

Position 6, volume 90. **Le cabinet n'est pas dans ce quartier** : 10 bis rue de la Havane,
derrière la Manufacture des Tabacs, côté Gare Nord et Jardin des Plantes. Créer une page
« Zola » serait une page-passerelle mensongère.

L'enseignement est ailleurs : **les requêtes par quartier existent et ont du volume.**
`/cabinet-nantes/` est la page la plus mince du site (404 mots) et ne cite aucun repère de
quartier dans son contenu. C'est elle qui doit porter les repères réels — Manufacture des
Tabacs, Jardin des Plantes, Gare Nord, ligne 1 arrêt Manufacture. `psychologue nantes nord`
(30, position 4) va dans le même sens.

## 5.8 Piège à écarter — les communes limitrophes

`psychologue vertou` 271 · `psychologue bouaye` 211 · `psychologue orvault` 186 · `psychologue
44` 109

Volume réel, intention commerciale. **Mais une page par commune où le praticien n'exerce pas
est une page-passerelle**, précisément le motif que Google sait détecter et sanctionner. Au
plus : une mention honnête de la zone de consultation sur `/cabinet-nantes/`, avec les temps
de trajet réels. Pas de page dédiée.

## 5.9 Deux signaux mineurs, non exploités

- `psychologue homme nantes` — 100, **position 2**, 15 clics. Une partie du public cherche
  explicitement un psychologue homme. Aucune page du site ne le mentionne. Un mot sur
  `/vincent-rousseau-psychologue/` suffirait.
- `psychologue psychanalyste` (national, sans ville) — 1 300, **position 16, en recul de 6
  places**. Seul mouvement négatif de l'export. Deuxième volume de toute la liste après
  `psychologue nantes`.

## 5.10 Risque de migration à surveiller

Ces positions décrivent **le site WordPress en ligne**, dont l'accueil porte 15 requêtes sur
15. La v2 répartit ce contenu sur des pages dédiées. La dé-cannibalisation est juste sur le
fond, mais **l'accueil ne doit pas être dépouillé des termes qu'il tient** (positions 1 à 3),
tant que les nouvelles pages n'ont pas acquis leur propre autorité. Confirme la préconisation
6 de la section 3.

## 5.11 Ordre d'action révisé

1. **Vérifier la fiche Google Business Profile** — existence, revendication, avis. Trois
   sources convergentes, coût nul, aucun contenu à écrire.
2. **Créer la Search Console.** Aucun historique rétroactif : chaque semaine de retard est une
   semaine de données perdue.
3. **Relever qui occupe les positions 1 et 2 sur `psychologue nantes`.** Détermine si +375
   clics/mois est atteignable ou hors de portée.
4. **Étoffer `/cabinet-nantes/`** avec les repères de quartier réels (404 mots aujourd'hui).
5. **Optimiser l'informationnel sur les pages existantes** — différences entre « psy »,
   remboursement, psychanalyse.
6. **Ne rien écrire sur les motifs de consultation.** Sauf, éventuellement, `confiance en
   soi` — une requête, à traiter comme une section, pas comme un silo.

---

# 6. CONCURRENCE SISTRIX — 8 septembre 2026

Export « Concurrents » (vue domaine), 358 domaines en concurrence. **Ce n'est pas la SERP
de `psychologue nantes`**, qui reste à relever, mais il tranche déjà une question posée
au § 5.3.

| # | Domaine | Concurrence | Indice de visibilité |
|---|---|---|---|
| 1 | **doctolib.fr** | 187,1 % | 59,67 |
| 2 | psychologuenantes-vincentrousseau.fr | 100 % (référence) | **0,00** |
| 3 | **psychologue.net** | 75,6 % | 22,95 |
| 4 | resalib.fr | 42,0 % | 2,26 |
| 5 | **pagesjaunes.fr** | 41,2 % | 418,29 |
| 6 | grenoble-psychologues.fr | 25,9 % | 0,01 |
| 7 | amandine-caulle.fr | 25,6 % | 0,03 |
| 8 | sante-mentale-ain.fr | 20,8 % | 0,02 |
| 9 | vincianedevaux-psychologue.com | 17,0 % | 0,03 |
| 10 | mappy.com | 16,9 % | 325,02 |
| 11 | psychanalyse-rivalin.fr | 12,7 % | 0,00 |
| 12 | **psychologueanantes.fr** | 12,7 % | 0,00 |
| 13 | wiese-psy-nantes.com | 12,0 % | 0,00 |
| 14 | psychotherapie-nantes.fr | 11,6 % | 0,00 |
| 15 | spp.asso.fr | 10,5 % | 1,39 |
| 16 | psychologue-marionthelisson.com | 9,9 % | 0,00 |
| 17 | psychologytoday.com | 9,9 % | 0,34 |

## 6.1 ⚠️ CORRECTION DU § 5.3 — les +375 clics/mois sont probablement hors d'atteinte

Le calcul du § 5.3 reste juste comme arithmétique : en position 1, `psychologue nantes`
vaudrait ≈ 590 clics au lieu de 213. **Son hypothèse ne l'est pas.** Quatre des cinq
premiers concurrents sont des annuaires ou des plateformes de réservation — Doctolib,
psychologue.net, Resalib, PagesJaunes — auxquels s'ajoute Mappy en 10ᵉ. Ce sont des
agrégateurs portant des centaines de fiches de praticiens et une autorité sans commune
mesure. **Aucun contenu ne les déloge des deux premières places organiques.**

La position 3 est donc vraisemblablement **le plafond organique**, et le site y est déjà.
Le § 5.3 doit se lire ainsi : *si* la position 1 était accessible, elle vaudrait +375
clics ; cet export indique qu'elle ne l'est pas.

**Où se trouve réellement le gain :** `psychologue nantes` déclenche un **Local pack**
(source : `serp_features` du CSV agence), qui s'affiche **au-dessus** des résultats
organiques, annuaires compris. C'est le seul emplacement où un praticien isolé passe
devant Doctolib. Il ne dépend pas du site mais de la **fiche Google Business Profile**.

Quatrième source convergente vers la même action, après les trois du § 5.6. La fiche n'est
toujours pas vérifiée.

## 6.2 Indice de visibilité 0,00 — ce que cela impose au § 5.5

Le domaine est **sous le seuil d'affichage de Sistrix**. C'est normal pour un cabinet
individuel, mais cela recadre la préconisation du § 5.5 sur l'informationnel national.

Sur `différence entre psychologue et psychiatre` (3 648/mois), les concurrents sont
Doctolib (59,67), psychologue.net (22,95), psychologytoday.com et les grands sites santé.
**Espérer ce trafic à court terme serait malhonnête.**

Une nuance en sens inverse, toutefois : `grenoble-psychologues.fr` (indice 0,01) et
`sante-mentale-ain.fr` (0,02) partagent respectivement 25,9 % et 20,8 % du jeu de
mots-clés. Des sites sans autorité mesurable se positionnent donc bien sur une partie de
ces requêtes. L'informationnel n'est pas fermé — il est lent.

**Conclusion :** le travail informationnel du § 5.5 se justifie comme **soutien de
pertinence thématique aux requêtes locales**, pas comme un gisement de trafic national. Il
a été fait sur des pages existantes, à coût faible ; ce serait un mauvais calcul d'en
créer de nouvelles pour cette seule raison.

## 6.3 Les concurrents réels, praticien contre praticien

Indices proches de zéro, donc sites locaux de même nature :

`psychanalyse-rivalin.fr` · **`psychologueanantes.fr`** · `wiese-psy-nantes.com` ·
`psychotherapie-nantes.fr` · `psychologue-marionthelisson.com` ·
`vincianedevaux-psychologue.com` · `amandine-caulle.fr`

**`psychologueanantes.fr` mérite un examen** : c'est un nom de domaine de correspondance
exacte sur le mot-clé principal. Aucun des autres n'a cet avantage.

`grenoble-psychologues.fr` et `sante-mentale-ain.fr` ne sont pas nantais : leur
recouvrement porte sur les requêtes informationnelles nationales, pas locales. Même chose
pour `spp.asso.fr` (Société psychanalytique de Paris) et `psychologytoday.com`, qui
occupent le terrain de la psychanalyse — ce qui rend `/psychanalyste-nantes/` plus
difficile qu'il n'y paraît sur ses requêtes nationales.

## 6.4 Ce qui manque encore

**La SERP de `psychologue nantes` elle-même** : qui occupe les positions 1 et 2, et où se
situe le Local pack. Dans Sistrix, elle s'ouvre par l'**icône œil** à droite de la ligne
du mot-clé, dans le tableau des positions — pas par l'onglet Concurrents, qui raisonne au
niveau du domaine.
