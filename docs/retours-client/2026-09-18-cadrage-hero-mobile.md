# Retour client — cadrage du hero sur téléphone

**Destinataire :** Vincent Rousseau · **Date :** 18 septembre 2026
**Commit :** `7cc621c` · **En ligne :** oui
**Suite :** voir « Après envoi » en bas de page — le dernier paragraphe du
message était fondé sur un malentendu, corrigé le soir même.

> Texte destiné à être copié tel quel dans un mail. Il est volontairement
> sans vocabulaire technique : les détails d'implémentation sont dans le
> message de commit et dans les commentaires de `src/lib/content/oeuvres.ts`.

---

Bonjour Vincent,

Un point rapide sur la page d'accueil.

**Le tableau de la page d'accueil, sur téléphone.** Vous aviez raison : on ne voyait que du feuillage. L'explication est simple — un écran de téléphone est haut et étroit, alors que *La Charmeuse de serpents* est un tableau large. Le site en gardait donc seulement la bande centrale… qui est précisément la partie la plus végétale de la toile. La charmeuse, la lune et l'échassier, eux, sont dans le tiers gauche : ils passaient hors cadre.

C'est corrigé. Sur téléphone, le site cadre maintenant sur la scène elle-même : on voit la joueuse de flûte en entier, la lune, l'oiseau et le plan d'eau. Sur ordinateur et sur tablette, rien ne change — l'affichage y était déjà correct.

**Un second point, découvert à cette occasion.** En vérifiant que le texte blanc restait bien lisible sur ce nouveau cadrage, je me suis aperçu que la lisibilité sur téléphone était en réalité un peu juste depuis le début — le texte y occupe beaucoup plus de hauteur que sur un ordinateur, et il débordait de la zone assombrie prévue pour lui. J'ai renforcé cet assombrissement, sur téléphone uniquement. Le texte repasse au-dessus du seuil d'accessibilité recommandé, sans que le tableau en souffre.

Ces deux modifications sont en ligne.

**Une proposition que je n'ai pas retenue.** L'idée d'échanger *La Charmeuse* avec la *Nature morte au géranium* de la page « psychanalyse » aurait en fait aggravé les choses : le géranium est un tableau encore plus large, dont on n'aurait vu qu'un tiers sur téléphone. Et il figure déjà dans le défilement de la page d'accueil. J'ai donc préféré garder *La Charmeuse* en ouverture — c'est votre premier choix — et corriger le cadrage. Si vous souhaitez malgré tout déplacer *La Charmeuse* vers la page « psychanalyse » pour une raison de sens, c'est faisable en quelques minutes.

Bien à vous,

---

## Pour mémoire — les chiffres derrière le second point

Contraste du texte blanc sur *La Charmeuse*, mesuré sur un écran de 390 px de large.

| Zone | Seuil WCAG AA | Avant | Après |
|---|---|---|---|
| H1 (66 px gras) | 3.0 | 11.62 | 5.86 |
| Paragraphe (18 px) | 4.5 | 4.24 ❌ | 4.81 ✅ |

La mesure précédente, notée dans `src/app/page.tsx`, portait sur la géométrie
du texte **en grand écran** : elle ne couvrait pas ce cas.

---

## Après envoi — le malentendu sur l'échange des tableaux

Le paragraphe « Une proposition que je n'ai pas retenue » partait d'une
mauvaise lecture de la demande. Vincent ne proposait pas de mettre le
géranium en page d'accueil : il voulait

- le **géranium** en tête de `/aide-faq/`, à la place de la « Lutte de
  l'Indien et du gorille » — une scène de combat qu'il jugeait trop dure
  pour ouvrir une page de questions pratiques ;
- **La Charmeuse de serpents** en illustration de la section « La
  psychanalyse », sur `/psychanalyste-nantes/`, là où était le géranium.

L'accueil n'était pas concerné, et l'objection du format 1.78 ne s'appliquait
donc pas : sur ces deux pages, l'œuvre est montrée dans sa proportion d'origine
(`OeuvreIllustration`) ou dans un cadre presque carré. L'échange a été fait tel
que demandé. La Charmeuse apparaît désormais à deux endroits — carrousel de
l'accueil et page psychanalyse ; répétition assumée, c'est son premier choix.
