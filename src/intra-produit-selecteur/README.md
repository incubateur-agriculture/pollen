# intra-produit-selecteur — Produit · Sélecteur

## Description

Liste déroulante DSFR (`DsfrSelect`) permettant de choisir la ligne « courante » d'une table, avec
le libellé « Sélectionner le produit à afficher ».

Le widget lit **tous** les enregistrements visibles de la table source et en fait les options du
menu. Choisir une option déplace le curseur Grist sur l'enregistrement correspondant
(`setCursorPos`) : tous les widgets liés à celui-ci par « Sélectionner par » se mettent alors à
jour. Inversement, si le curseur bouge ailleurs, le menu se resynchronise sur la ligne courante.

> À utiliser quand on veut le sélecteur seul ; pour améliorer le produit nous l'avons ensuite inclu direction dans le widget [`intra-produit-hero`](../intra-produit-hero/README.md).

## Colonnes Grist attendues

Une seule colonne, obligatoire, dans le panneau de configuration du widget.

| Mapping du widget | Type attendu | Colonne Grist source usuelle | Utilisation |
| --- | --- | --- | --- |
| `name` | Texte | `Nom` | Libellé de chaque option de la liste déroulante |

Points d'attention :

- L'ordre des options reprend l'ordre de tri de la table source, et la liste respecte ses filtres :
  c'est au niveau de la table Grist qu'on règle ce qui est proposé.

## URL

L'url pour utiliser ce widget est `https://incubateur-agriculture.github.io/pollen/intra-produit-selecteur/`