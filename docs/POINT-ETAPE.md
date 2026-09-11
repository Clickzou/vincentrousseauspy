# POINT D'ÉTAPE — 8 septembre 2026

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
- **`/rendez-vous-psychologue-nantes/`** — page de conversion. Canaux dans l'ordre du § 9.3 :
  téléphone en tête, bloc « plateforme » prêt mais masqué tant que `priseRdv.plateforme`
  vaut `null`, formulaire en dernier
- **`/merci-pour-votre-demande/`** — confirmation, `noindex`. C'est l'événement de
  conversion mesurable (§ 9.5), sans aucune donnée personnelle
- **`/psychotherapeute-nantes/`** — le plus gros gisement de la refonte (~6 600 rech./mois,
  aujourd'hui en position 9 portée par l'accueil). Les affirmations juridiques sur le titre
  sont **sourcées sur Légifrance et l'ARS**, vérifiées le 2026-09-08, via le nouveau
  composant `src/components/seo/Sources.tsx`
  - Liens contextuels ajoutés depuis les cartes de titres de l'accueil, et entrée
    « La psychothérapie » ajoutée à la navigation
- **`/psychanalyste-nantes/`** — URL conservée, la mieux positionnée du site (2e).
  Le texte de fond de Vincent y remonte depuis l'accueil WordPress (cf. § 6 ci-dessous)
- **`/consultations/`** — déroulé, première séance, cadre, confidentialité. Récupère le
  « Qui, quand et où ? » qui occupait à tort `/psychanalyste-nantes/`. **Aucun bloc FAQ**,
  pour ne pas concurrencer `/aide-faq/` : les mêmes sujets, un autre format
- **`/tarifs-et-remboursement/`** — honoraires, mutuelles, « Mon soutien psy ». Conditions
  du dispositif **vérifiées sur ameli.fr le 2026-09-08** et sourcées en bas de page.
  La participation de Vincent est un **interrupteur à trois états** (`monSoutienPsy.partenaire`,
  aujourd'hui `null`) : la page dit quelque chose de juste dans les trois cas, elle peut donc
  être mise en ligne sans attendre sa réponse
- **`/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/`** — URL conservée.
  Tableau comparatif des 5 appellations, puis le texte de Vincent avec ses références
  universitaires (Lagache 1949, Pedinielli 1994). **5 sources Légifrance vérifiées une à une
  le 2026-09-08.** C'est la page qui capte les requêtes « psychiatre… » : elle dit donc
  explicitement, en toutes lettres, que Vincent n'est pas psychiatre et ne prescrit pas
- **`/contact-psychologue-clinicien-nantes/`** — URL conservée. **Sans formulaire** : sur
  WordPress, cette page et `/rendez-vous-…/` sont identiques et se cannibalisent. Ici, elle
  dit comment joindre Vincent et **ce qui ne se traite pas par écrit**
- **`/psychologue-clinicien-nantes/`** — URL conservée, « Pourquoi consulter ? ». Le texte
  de Vincent avec Dolto et Rückert. Angle propre : ce qu'est un symptôme et le moment où il
  cesse de « tenir » — à ne pas laisser dériver vers la liste de motifs de
  `/psychotherapeute-nantes/`
- **`/cabinet-nantes/`** — accès, tram, stationnement, repères. **Aucune carte embarquée** :
  un iframe Google Maps transmet l'IP du visiteur avant consentement (§ 2.4)
- **`/blog/` et `/blog/[slug]/`** — moteur complet : registre typé (`src/lib/content/blog.ts`),
  un module par article, rendu par blocs (`CorpsArticle`) donc aucun `dangerouslySetInnerHTML`,
  génération statique, 404 sur slug inconnu. Schéma `Article` déclaré ici et nulle part ailleurs
  - **Article 1** : « Ce qu'un psychologue a le droit de dire, et à qui » — secret
    professionnel, 3 sources primaires (articles 226-13 et 226-14 du code pénal). Sujet choisi
    parce qu'aucune page ne le traite en profondeur et qu'il ne cannibalise rien
  - **Article 2** : « Pourquoi je reçois uniquement au cabinet » — mot-clé
    « consultation psychologue à distance », que ne cible aucune page. Argumente une phrase
    qui n'était qu'énoncée sur trois pages. **Faits tirés d'ameli.fr, pas d'une opinion** :
    le dispositif public impose le premier entretien en présentiel et plafonne le distanciel
    à 20 % de l'activité conventionnée. Le reste est présenté comme un choix de cadre assumé,
    avec orientation vers un confrère — la publicité comparative est proscrite (§ 2.2)
  - Le champ `motCle` de chaque article documente sa cible : **le vérifier avant d'en ajouter un**
- **`/mentions-legales/`** — URL conservée, `noindex`. **Le n° ADELI y figure enfin** (il était
  sur l'accueil et sur `/dispositions-legales/`, mais pas là où on le cherche), ainsi que le
  SIRET, le diplôme, les titres et le directeur de publication. **Hébergeur corrigé** :
  Vercel, plus o2switch
- **`/politique-de-confidentialite/`** — `noindex`. Décrit surtout **ce qui n'est PAS
  collecté** : aucun cookie, aucune base, aucun analytics, aucun contenu tiers embarqué.
  ⚠️ Toute évolution technique (analytics, carte, plateforme de RDV) oblige à la corriger
- **`/plan-du-site/`** — indexable, **engendré** depuis `PAGES` et le registre du blog.
  Jamais écrit à la main : un plan recopié diverge en trois mois. Les pages `noindex` en
  sont exclues

### Le formulaire de rappel — architecture RGPD (§ 2.4)

| Fichier | Rôle |
|---|---|
| `src/lib/content/rendez-vous.ts` | **Valeurs fermées** : créneaux et type de demande |
| `src/app/rendez-vous-psychologue-nantes/actions.ts` | Action serveur : revalide tout, piège à robots |
| `src/app/rendez-vous-psychologue-nantes/FormulaireRappel.tsx` | Formulaire, fonctionne sans JavaScript |
| `src/lib/email/envoi.ts` | Resend en REST (pas de paquet npm), **zéro persistance** |
| `.env.example` | `RESEND_API_KEY`, `EMAIL_EXPEDITEUR`, `EMAIL_DESTINATAIRE` |

Quatre champs saisissables au total : nom, téléphone, e-mail facultatif, et deux listes
de cases à cocher. **Aucune zone de texte libre, et il ne faut jamais en ajouter** — la
page l'explique d'ailleurs au visiteur dans un encadré dédié. Tant que la clé Resend
n'est pas renseignée, le formulaire affiche un message qui renvoie au téléphone : rien
n'est perdu en silence.

---

## 2. CE QUI RESTE À CONSTRUIRE

**Les 17 URLs du registre répondent 200. Plus aucune 404.** Vérifié le 2026-09-08 en
interrogeant une à une les URLs de `src/lib/sitemap-data.ts`.

Le site est complet au sens de l'arborescence cible. Ce qui reste n'est plus de la
construction de pages :

| Chantier | Note |
|---|---|
| **Validation clinique par Vincent** | Bloquant absolu (§ 3). Toutes les pages sont écrites « sous réserve » |
| **Analytics sans cookie** | Plausible ou Umami. **Corriger `/politique-de-confidentialite/` en même temps** — elle affirme aujourd'hui qu'aucune mesure d'audience n'existe |
| **Déploiement Vercel** | Et confirmation de l'adresse légale de l'hébergeur, aujourd'hui tirée d'annuaires |
| **Clé Resend et domaine d'envoi** | Sans elle, le formulaire renvoie au téléphone |
| **Citation René Char et CTA final de l'accueil** | Les deux blocs les plus faibles du site |
| **Troisième article de blog** | 2 par mois maximum : le quota de septembre est atteint. Vérifier `motCle` avant d'écrire |

**Maillage de `/psychologue-clinicien-nantes/` — fait.** Quatre liens contextuels : la carte
« Ce qui amène à consulter » de l'accueil (qui était la seule des trois portes d'entrée à
n'ouvrir sur rien, contrairement à ce qu'annonçait son propre commentaire),
`/consultations/`, `/psychotherapeute-nantes/` et l'article de blog.

**Au passage, un défaut de conception du blog corrigé** : le type `Bloc` ne stockait que du
texte brut, donc **un article ne pouvait contenir aucun lien interne**. Il captait du trafic
et le gardait, à rebours du § 7.2 qui veut qu'un article alimente les pages du site. Le type
`p` accepte désormais un `lien` interne — et seulement interne : une source externe va dans
le bloc `sources`, où elle est attribuée à son éditeur et vérifiable.

### Autres chantiers
- **Citation René Char et CTA final** : passés en pleine largeur mais jamais redesignés — les deux blocs les plus faibles de l'accueil
- ~~**Redirections** : les 7 articles de démo anglais → 410~~ **fait**, via `src/middleware.ts`.
  Les redirections restantes sont passées de `permanent: true` (qui produit un 308) à
  `statusCode: 301`, conformément au § 3.3.
  Reste une chaîne inévitable : une URL sans slash final est d'abord normalisée en 308 par
  `trailingSlash: true` avant d'être redirigée. Sans conséquence — WordPress servait déjà
  avec le slash, donc toutes les URLs indexées le portent et ne subissent qu'un seul saut
- **Clé Resend et domaine d'envoi** à créer, puis à saisir dans les variables Vercel
  (cf. `.env.example`). Sans elles, le formulaire renvoie au téléphone
- **Analytics sans cookie** (Plausible ou Umami) — cf. § 2.4 du master.
  Objectif unique : clic `tel:` + arrivée sur `/merci-pour-votre-demande/`
- **Déploiement Vercel**

---

## 3. EN ATTENTE DE VINCENT — BLOQUANT POUR LA MISE EN LIGNE

1. **Validation de tous les textes cliniques.** Sa responsabilité professionnelle est engagée (§ 7.1).
2. ~~**Mon soutien psy** : est-il partenaire du dispositif ?~~ **RÉPONDU LE 2026-09-10 :
   OUI**, il est affilié. `monSoutienPsy.partenaire` est passé à `true`, et les pages
   tarifs et FAQ l'affirment désormais. **Reste à lui signaler** : la séance relevant du
   dispositif est à 50 €, tarif conventionnel, donc **non modulable** — contrairement à
   ses séances hors dispositif.
3. **ADELI ou RPPS** : le répertoire ADELI est en cours de remplacement pour les psychologues.
4. ~~**Accessibilité PMR**~~ **RÉPONDU LE 2026-09-10** : rampe d'accès à l'entrée du
   bâtiment, cabinet au 2e étage desservi par un ascenseur. ⚠️ Cela **corrige** la
   réponse du 8 septembre (« plain-pied »), qui était fausse et figurait sur trois pages.
5. **Coordonnées GPS** du cabinet, pour le `geo` du JSON-LD.
6. **Visuels** : valider le choix Matisse / Kandinsky (cf. § 5 ci-dessous).
7. **Promesses de rappel** : « je rappelle systématiquement » et « je ne laisse pas de
   message détaillé sur une messagerie vocale » (page de rendez-vous). Le délai de réponse,
   lui, est validé — cf. § 5.
8. **Inscription au registre national des psychothérapeutes.** `/psychotherapeute-nantes/`
   l'affirme et explique au visiteur que la liste de l'ARS est publique — c'est un signal de
   confiance fort, mais il devient un risque si l'inscription n'est pas à jour. À confirmer
   avant mise en ligne. Idéalement, récupérer aussi le département d'inscription.
9. ~~**Durée d'une séance.**~~ **RÉPONDU LE 2026-09-11 : 45 minutes**, première séance
   comprise. `seance.duree` est à jour et `dureeConfirmee` passe à `true`.
10. **Plateforme de RDV hébergée HDS** : Vincent n'en a aucune aujourd'hui. Le master la
   place en canal n° 2 (§ 9.3). Le bloc est déjà codé et n'attend que
   `priseRdv.plateforme = { nom, url }`.

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
| **Aucun champ de texte libre dans le formulaire** | Il collecterait des données de santé (art. 9 RGPD) sur un hébergement non agréé HDS. Refuser toute demande d'ajout |
| **Aucun stockage des demandes** | Un e-mail, puis plus rien. Ni base, ni fichier, ni log du contenu |
| **Délai de réponse : « en moins de 24 heures »** | Validé à « sous 48 heures ouvrées » le 2026-09-08, puis **raccourci à la demande de Vincent le 2026-09-11**. Engagement public (§ 9.4) : ne pas le modifier sans son accord |
| **`/dispositions-legales/` est redirigée en 301 vers les mentions légales** | Elle portait ADELI et SIRET, désormais à leur place. Elle était `noindex`, donc sans référencement à transférer |
| **Le plan du site est engendré, jamais écrit** | Un plan recopié à la main diverge du registre et finit par lister des URLs mortes |
| **Les 7 articles de démo sont en 410, pas en 301** | Aucun équivalent sur le nouveau site. Sept URLs sans rapport pointant vers `/blog/` seraient requalifiées en soft 404. Le 410 provoque un retrait rapide de l'index |
| **`lastModified` du sitemap : uniquement pour les articles** | Il valait `new Date()` pour toutes les pages, ce qui déclarait le site entier modifié à chaque passage du robot. Une date absente vaut mieux qu'une date fausse |
| **Aucune carte Google Maps embarquée** | Un iframe transmet l'IP du visiteur à Google avant consentement (§ 2.4), comme les polices en CDN. Lien externe uniquement |
| **Un seul formulaire sur tout le site** | Sur `/rendez-vous-…/`. La page contact n'en a pas : deux formulaires dispersent la conversion et dupliquent le risque RGPD |
| **Pas de comparaison de tarifs avec d'autres praticiens** | L'accueil WordPress écrit « un psychanalyste facture généralement entre 30 et 80 euros ». C'est de la publicité comparative, proscrite (§ 2.2). Non reprise |
| **Toute affirmation juridique ou clinique est sourcée** | Composant `Sources`, sources primaires uniquement (Légifrance, ARS, Ameli, HAS). En YMYL c'est la responsabilité de Vincent qui est engagée, avant le référencement |

---

## 6. CE QU'A RÉVÉLÉ LA REPRISE DE `/psychanalyste-nantes/`

La page WordPress `/psychanalyste-nantes/` **ne parle pas de psychanalyse**. Elle
s'intitule « Qui, quand et où ? » et ne contient que des informations pratiques : horaires,
adresse, tram, stationnement. Le texte de fond de Vincent — « La psychanalyse en détails »,
le meilleur du site — est enterré sur la page d'accueil.

> ⚠️ **Correction du 2026-09-08.** Ce paragraphe affirmait que cette page « se classe 2e
> sur *psychanalyste nantes* ». **C'est faux**, et l'erreur avait été recopiée dans le
> registre des URLs, dans l'en-tête de la page et dans le composant de navigation.
> Vérification faite sur `positions-actuelles.csv` : `/psychanalyste-nantes/` ne ressort
> que **24e sur « rousseau vincent »**. C'est **l'accueil** qui est 2e sur
> « psychanalyste nantes ». Cela ne change pas la décision — faire coïncider l'URL et son
> sujet reste juste — mais cela en change le motif : il ne s'agissait pas de nourrir une
> page déjà bien classée, il s'agissait de créer une page là où il n'y avait qu'un slug.

La refonte fait coïncider l'URL et son sujet : le texte remonte sur la page, et les
informations pratiques repartent vers `/consultations/` et `/cabinet-nantes/`. **Ne pas
oublier de les y replacer** — elles sont exactes et utiles, elles ne sont simplement pas
à leur place.

**Deux formulations du site actuel ont été écartées, à ne pas réintroduire :**

| Texte d'origine | Pourquoi il est écarté |
|---|---|
| La psychanalyse s'adresse au sujet « qu'il soit enfant, adolescent ou adulte », et la liste des motifs cite « les difficultés au sein des couples ou problèmes avec les enfants/adolescents » | Vincent ne reçoit **que des adultes**. Le site actuel se contredit lui-même d'une page à l'autre |
| « Une méthode éprouvée visant à apporter des changements durables » | Promesse de résultat, proscrite par le § 2.2. La page assume au contraire qu'un symptôme peut persister sous forme résiduelle |

---

## 7. AUDIT DE REPRISE DE L'ACCUEIL WORDPRESS — 2026-09-08

Passe bloc par bloc sur les **69 blocs** de `docs/contenu-actuel/home-main.md`, faite après
qu'un paragraphe eut été perdu sans être signalé. Chaque bloc a désormais une destination
ou une raison documentée d'avoir été écarté.

**Repris** : hero · « La psychanalyse, c'est quoi ? » · « Ce qui amène à consulter » ·
« Vous souhaitez venir ? » · adresse et plan · « La psychanalyse en détails » (3 § sur 3) ·
les trois titres professionnels · citation René Char · double titre · ADELI, SIRET, diplôme ·
les 2 PDF · liens utiles · les 12 questions/réponses (fusionnées dans `/aide-faq/`, la page
auteur, `/consultations/` et `/tarifs-et-remboursement/`) · bouton de rendez-vous.

**Trois manques trouvés et corrigés :**

| Bloc | Sort |
|---|---|
| 3<sup>e</sup> § de « La psychanalyse en détails » — « sa propre opacité », « le X qui indique l'emplacement de l'inconscient » | **Perdu par erreur.** Remis sur `/psychanalyste-nantes/`, en clôture de « Ce que l'on écoute en séance » |
| Bouton « Un "psy" c'est quoi ? » de l'accueil | **Lien perdu.** La page pédagogique n'était liée que par une seule page, alors qu'elle porte les requêtes « psychiatre… ». Rétabli sous les trois titres |
| Lien « Code de déontologie » (`/LE-CODE.html`) | **404 depuis la refonte du site cible.** Corrigé vers `/codes-de-deontologie/` |

**Écartés volontairement** — à ne pas réintroduire :

| Texte d'origine | Motif |
|---|---|
| « une méthode éprouvée visant à apporter des changements durables » | Promesse de résultat (§ 2.2) |
| « Contrairement à certaines approches psychothérapeutiques adoptant un modèle plus mécanique » | Publicité comparative (§ 2.2). Remplacé par « une thérapie dite de fond », qui distingue sans hiérarchiser |
| « une séance de 45 min à 1 h peut coûter entre 50 et 70 € […] un psychanalyste facture entre 30 et 80 € » | Comparaison tarifaire avec d'autres praticiens (§ 2.2) |
| « qu'il soit enfant, adolescent ou adulte », « difficultés au sein des couples ou problèmes avec les enfants/adolescents » | Vincent ne reçoit que des adultes. Le site actuel se contredit d'une page à l'autre |
| « Je recommande de privilégier un profil professionnel pouvant afficher un numéro ADELI » | Conseil qui vise implicitement les confrères sans numéro. Le fond est conservé, mais retourné en information vérifiable sur la page pédagogique : quels titres sont contrôlables, et auprès de qui |

**Contrôle des liens externes** (2026-09-08) : les 19 liens sortants testés un à un.
Un seul mort, corrigé. Les 403 de Légifrance sont un blocage anti-robot — les pages ont été
ouvertes et vérifiées, elles sont exactes.

**Les deux PDF s'ouvrent désormais dans un nouvel onglet**, sur l'accueil comme sur
`/psychanalyste-nantes/` : le retour depuis un lecteur PDF est laborieux, surtout sur mobile.

---

## 8. DOUBLON À ARBITRER — `/psychologue-clinicien-nantes/`

**Décision client du 2026-09-08** : le texte « Pourquoi consulter ? Qu'est-ce que je
propose ? » doit figurer sur la page « Qui je suis ». Il y est.

**Conséquence** : ce texte est désormais sur DEUX pages du site, puisqu'il constitue
l'intégralité de `/psychologue-clinicien-nantes/` — l'URL qu'il occupait déjà sur WordPress,
derrière l'entrée de menu « À propos ».

**Fait vérifié** : `/psychologue-clinicien-nantes/` n'apparaît dans **aucun** des 38
mots-clés suivis. Elle ne porte aucune position mesurée.

| Option | Effet |
|---|---|
| **301 vers `/vincent-rousseau-psychologue/`** *(recommandé)* | Un seul texte, une seule URL, signaux consolidés sur le pivot E-E-A-T. Rien de mesurable n'est perdu |
| Laisser les deux en ligne | Deux pages identiques se concurrencent ; Google en choisit une, arbitrairement |
| Réécrire `/psychologue-clinicien-nantes/` sur un autre angle | Suppose d'inventer du contenu clinique que Vincent devra valider |

⚠️ La réserve du § 4 de l'audit s'applique : 38 mots-clés sont un échantillon. Sans Search
Console, on ignore la longue traîne réellement captée par cette URL. **Le plus prudent est
donc de créer la Search Console d'abord, d'observer quelques semaines, puis de trancher.**

Cf. `docs/seo/audit-positions-2026-09-08.md`.

> **Mise à jour du 2026-09-11** : Vincent a entièrement réécrit le texte de
> `/psychologue-clinicien-nantes/`. Les deux pages ne portent plus le même texte mot pour
> mot — la page auteur garde l'ancienne version —, mais elles traitent toujours le même
> sujet, dans le même ordre. Le doublon est atténué, pas levé : l'arbitrage reste à faire.

---

## 9. RAPPELS TECHNIQUES

- **Palette et polices** extraites du CSS Elementor d'origine, pas estimées à l'œil.
  Roboto (titres et texte), Yesteryear (signature), Abhaya Libre (citations uniquement).
- **Contrastes vérifiés par calcul WCAG**, pas à l'œil. Toute nouvelle couleur de texte
  doit être testée sur les six fonds du site.
- **Ne jamais ajouter une classe Tailwind dont la couleur n'existe pas** dans
  `tailwind.config.ts` : Tailwind ne signale rien, la classe est simplement ignorée.
  C'est ce qui avait cassé le bandeau d'urgence 3114 (`alerte`, `sable`, `brume`).
- **`.wpress` et `_wp_extract/` sont exclus de Git** — 523 Mo et des données personnelles
  (soumissions de formulaires, abonnés newsletter).

---

## 10. SÉANCE DU 8 SEPTEMBRE 2026 — ÉTAT À LA REPRISE

Dépôt à jour et synchronisé (`main` = `origin/main`), **déploiement Vercel vert**.
Tout ce qui suit est mesuré.

### 10.1 Le site est en ligne

Premier déploiement réussi. Les précédents échouaient tous — voir § 10.6.

- Production : `vincentrousseauspy` sur Vercel, scope `clickzous-projects`
- Les URL de déploiement renvoient un **302 vers `vercel.com/sso-api`** : c'est la
  protection Vercel, normale tant qu'aucun domaine personnalisé n'est rattaché.
  **C'est la seule étape technique qui reste avant l'ouverture au public.**

### 10.2 Audits produits

| Document | Contenu |
|---|---|
| `docs/seo/audit-positions-2026-09-08.md` § 5 à 8 | Données Sistrix : positions, concurrence, empreinte de 50 mots-clés, SERP de `psychologue nantes` |
| `docs/seo/audit-technique-v2-2026-09-08.md` | Audit des 16 pages du nouveau site |
| Rapport client | Publié comme page privée, avant/après, à destination de Vincent |

**Le constat qui commande tout le reste** (§ 8.1 de l'audit de positions) : sur les
vingt résultats de `psychologue nantes`, **deux seulement sont des sites de
praticiens**. Le site n'est pas 3ᵉ derrière deux confrères, il est **premier de sa
catégorie**. Le travail à la bascule est donc **défensif**.

### 10.3 Corrections mesurées

| Avant | Après |
|---|---|
| 8 titres sur 16 au-delà de 60 caractères | **0** |
| 11 descriptions au-delà de 160 caractères | **0** |
| Questions de FAQ non déclarées comme titres | `h3` sur l'accueil, `h2` sur `/aide-faq/` |
| 3 intitulés visuellement titres mais codés en `<p>` | Corrigés |
| `/cabinet-nantes/` : 416 mots, aucun quartier nommé | 556 mots, quartier réel nommé |

Le suffixe de titre est passé de `— Vincent Rousseau, psychologue à Nantes` (40
caractères) à `— Vincent Rousseau, Nantes` (26). Deux règles nouvelles : une page
dont le titre contient déjà la ville pose son titre en `absolute` ; la ville
appartient aux pages locales, pas aux pages informationnelles (les articles gardent
la signature de l'auteur et perdent la ville).

### 10.4 Ajouts fonctionnels

- **Consentement aux cookies** prêt et conforme CNIL. Tant que `NEXT_PUBLIC_GA_ID`
  est vide — état actuel — aucune bannière, aucun script, aucun cookie. La politique
  de confidentialité et les mentions légales **dépendent de cette variable** et
  basculent d'elles-mêmes le jour du branchement.
- **Search Console** traitée séparément (`GOOGLE_SITE_VERIFICATION`) : simple balise
  `meta`, sans cookie, **sans consentement requis**. Peut être posée immédiatement.
- `/llms.txt`, généré depuis `site-config`. Norme non confirmée lue par les
  fournisseurs — pari à prix nul, pas une optimisation.
- **Retour en haut de page** sur les 16 pages.
- **Signature d'agence** en pied de page, accueil uniquement.
- `npm run build:check` compile dans `.next-check/` : le build de vérification ne
  détruit plus les chunks du serveur de développement.

### 10.5 Données obtenues de Vincent

- **Accessibilité : rampe d'accès à l'entrée, cabinet au 2e étage desservi par
  ascenseur** (corrigé le 2026-09-10 ; la mention « plain-pied » du 8 septembre
  était erronée). L'invitation à appeler est conservée : la largeur des portes et
  les sanitaires restent inconnus, et on n'étend pas la promesse au non-vérifié.
- **Coordonnées** relevées auprès d'OpenStreetMap, qui ne connaît pas le numéro 10
  bis : c'est le centre de la rue de la Havane. Suffisant pour `LocalBusiness`.
  La requête a confirmé le quartier : **Coulmiers — Jardin des Plantes**, dans
  **Malakoff — Saint-Donatien**.

### 10.6 ⚠️ VERCEL BLOQUE LES VERSIONS VULNÉRABLES DE NEXT.JS

Neuf déploiements consécutifs en échec, sur plus de deux heures. **Le build
réussissait entièrement** — 25 pages générées — et l'échec survenait après :

```
Build Completed in /vercel/output [26s]
Deploying outputs...
Vulnerable version of Next.js detected, please update immediately.
status ● Error
```

Next 15.5.2 portait une faille **critique** : exécution de code à distance dans le
protocole React flight, et exposition du code source des Server Actions — que le
formulaire de rappel utilise. Résolu par la montée en **15.5.25**, dernière du même
palier mineur.

**Comment diagnostiquer ce cas** : le tableau de bord n'affiche que le message de
commit. Le vrai journal s'obtient par
`npx vercel inspect <url-du-déploiement> --logs --scope clickzous-projects`.

Reste une `postcss` 8.4.31 signalée « high », **épinglée à l'intérieur de Next** et
non remplaçable sans surcharge. Elle n'intervient qu'à la compilation du CSS, sur du
CSS que nous écrivons : les deux failles supposent un CSS fourni par un tiers. Une
surcharge forcée ferait courir plus de risque au build qu'elle n'en retire.

### 10.7 Décisions actées ce jour

- **Le silo « motifs de consultation » est suspendu.** Sur 127 idées de mots-clés,
  aucune requête locale par symptôme, et `motifs consultation psychologue` a un
  volume de 0. Le master est annoté au § 8.5. Voir audit de positions § 5.4 et 7.2.
- **`alt=""` sur les œuvres décoratives** — dérogation au master, actée et bornée :
  elle vaut pour les œuvres d'art, et elles seules. Une photo de Vincent ou du
  cabinet porterait une information et devrait recevoir un `alt` descriptif.
- **Aucun témoignage de patient sur le site**, jamais.

### 10.8 Ce qui reste

**Technique** — rattacher le domaine définitif (lève le 302), puis renseigner
`GOOGLE_SITE_VERIFICATION` et, si Vincent l'accepte, `NEXT_PUBLIC_GA_ID`.

**Hors site, par ordre de rendement**
1. Vérifier et reprendre la **fiche Google Business Profile**. Quatre relevés
   distincts convergent vers cette action.
2. Créer la **Search Console**. Aucun historique rétroactif : chaque semaine de
   retard est perdue.
3. S'inscrire dans les **cinq annuaires gratuits** du top 20.
4. Obtenir une **photographie** du cabinet ou de Vincent.

**Contenu** — l'informationnel des pages existantes (`/psychanalyste-nantes/` et
`/psychologue-clinicien-nantes/`, ≈ 900 recherches/mois chacune) n'a pas été traité.
Le premier suppose une décision éditoriale de Vincent : ses meilleurs volumes sont
`psychanalyse effets négatifs` et `critique de la psychanalyse`. Le second attend
l'arbitrage du § 8 ci-dessus.

### 10.9 ⚠️ À VÉRIFIER EN PREMIER À LA REPRISE — le survol du sous-menu

Le sous-menu « PSYCHOLOGUE » se fermait quand la souris descendait à peine sous
le bouton, rendant les quatre entrées difficiles à cliquer. **Signalé deux fois,
corrigé deux fois, et la seconde correction n'a pas été confirmée par le
client.** C'est le premier point à tester à la reprise.

**Ce qui a été vérifié, et qui est bon :** la structure du DOM (le panneau est
un descendant de l'entrée, donc le survoler ne doit pas déclencher de sortie),
et la génération par Tailwind de `lg:relative`, `lg:absolute`, `lg:top-full`,
`lg:pt-1`, `lg:-mt-px`. La géométrie devrait être continue. Elle ne l'était pas.

**Première correction** (`1913d7a`) : le décalage de 4 px sous le bouton était
une marge *extérieure*, donc du vide. Devenu marge *intérieure* d'un conteneur
transparent qui touche le bouton d'un côté et le panneau de l'autre.
Insuffisant.

**Seconde correction** (`07abcf7`) : trois défenses superposées, l'interaction
étant rendue tolérante plutôt que géométriquement parfaite.

1. le conteneur remonte d'un pixel sur le bouton (`lg:-mt-px`) — ils se
   chevauchent au lieu de se toucher ;
2. la fermeture est différée de 250 ms ;
3. entrer sur le panneau annule la fermeture en cours.

**Si le défaut persiste : passer du survol au clic.** C'est moins élégant, mais
infaillible, et c'est la raison pour laquelle beaucoup de sites sérieux le font.
Le bouton porte déjà `onClick` et `aria-expanded` : il n'y a que les deux
gestionnaires `onPointerEnter` / `onPointerLeave` du `<li>` à retirer.

---

## 11. SÉANCE DU 11 SEPTEMBRE 2026 — CORRECTIFS DU « WORD 3 »

Source : `Refonte site Internet Vincent Rousseau word3.docx`, à la racine, non versionné
(comme les deux précédents). Neuf pages concernées.

### 11.1 ⚠️ Le document a été rédigé sur une version antérieure au 10 septembre

Plusieurs « textes initiaux » qu'il cite sont ceux d'avant les correctifs du 10 (Word 1
et 2). **Règle appliquée** : les corrections du 11 remplacent le texte, mais les ajouts du
10 qu'elles effaceraient sans le vouloir sont conservés — la gratuité de la première
séance à côté de tout prix, l'affiliation à Mon Soutien Psy, la réserve sur le tarif
conventionnel, le moyen de paiement. Chaque cas est commenté dans le code.

### 11.2 Données changées dans `site-config`

| Donnée | Avant | Après |
|---|---|---|
| `priseRdv.delaiReponse` | sous 48 heures ouvrées | **en moins de 24 heures** |
| `seance.duree` | de 45 minutes à une heure (non confirmée) | **45 minutes** (confirmée) |
| `seance.rythme` (ex-`rythmeCourant`) | le plus courant : une séance par semaine | **hebdomadaire** |
| `praticien.titreCourt` | trait d'union | tiret demi-cadratin |

Le délai se répercute seul sur neuf emplacements (contact, rendez-vous, formulaire, page
de remerciement, politique de confidentialité, `llms.txt`, deux meta descriptions).

### 11.3 Pages révisées

- `/psychologue-clinicien-nantes/` : texte entièrement réécrit par Vincent. Le lien vers
  « les situations qui conduisent le plus souvent à consulter » menait en haut de
  `/psychotherapeute-nantes/` ; il vise désormais `#quand-consulter`.
- `/psychologue-clinicien-psychotherapeute-psychiatre-psychanalyste/` : chapeau et
  paragraphe sur les formations.
- `/psychotherapeute-nantes/` et `/psychanalyste-nantes/` : quatre passages chacune au plus.
- `/consultations/` : révision quasi complète (cartes, première séance, cadre, repères,
  confidentialité).
- `/tarifs-et-remboursement/` : tous les blocs, dans la formulation de Vincent.
- `/contact-…/` : textes des cartes, et **suppression de « Ce que vous pouvez me
  demander »** — Vincent demandait si le bloc servait le référencement. Réponse : non. La
  page se classe sur son nom (requête de navigation), et « vérifier mes titres » est déjà
  assuré par la ligne ADELI et le lien vers la page auteur.
- `/rendez-vous-…/` : chapeau, bloc téléphone, deux étapes.
- `/blog/` : nouveau chapeau, et **nouvelle rubrique « Contributions scientifiques »**
  (3 publications chez érès, registre `src/lib/content/publications.ts`, déclarées en
  `ScholarlyArticle`). Signal E-E-A-T de premier rang.

### 11.4 Écarts assumés par rapport au document — à faire valider par Vincent

1. **« Pour garantir l'efficacité de l'accompagnement »** (`/consultations/`, « Le cadre
   thérapeutique ») n'est pas repris : promesse de résultat, § 2.2. Le reste de la phrase
   est intact.
2. **« Les consultations ne sont pas prises en charge par l'Assurance Maladie »** devient
   « Hors dispositif « Mon Soutien Psy », … ». Sans cette restriction la phrase est fausse :
   Vincent est affilié, et le dispositif rembourse 60 %.
3. **Tarifs** : la gratuité de la première séance est rétablie dans le chapeau, et la
   réserve sur le tarif conventionnel (50 €, non modulable, gratuité non applicable) est
   conservée. Elle attend toujours sa validation depuis le 10.
4. Les émojis 🚇 🚗 de la carte « Où » ne sont pas repris : le site signale ses rubriques
   par des intitulés et des icônes dessinées.

### 11.5 Questions ouvertes pour Vincent

1. **La vidéo NotebookLM** du blog : le fichier n'a pas été transmis. À l'arrivée,
   l'héberger sur le site ; si elle passe par YouTube, la charger au clic (comme
   `PlanDiffere`), sinon Google reçoit l'IP du visiteur avant tout consentement.
2. **« En moins de 24 heures »** ne dit plus « ouvrées » : lu à la lettre, le délai court
   le week-end. Est-ce voulu ?
3. **Le rythme** : la carte « Quand ? » de `/consultations/` le dit adaptable (« en règle
   générale… la fréquence la plus adaptée »), le bloc « Le cadre thérapeutique » de la
   même page le dit fixe. Laquelle des deux formulations fait foi ?
4. **« Formations de l'inconscient »** (`/psychanalyste-nantes/`) : la liste affichée
   dessous comprend « les répétitions », qui n'en est pas une au sens classique, et
   n'a pas le mot d'esprit. À lui de dire si la liste doit suivre le nouvel intitulé.

**Point d'agence, non soumis** : le H1 de `/consultations/` devient « Le déroulé, le
cadre et la première séance » et perd le mot « consultations ». Le `title` le garde, la
perte est faible ; si on veut la rattraper, « Les consultations : le déroulé, le cadre
et la première séance » tient sur deux lignes.
