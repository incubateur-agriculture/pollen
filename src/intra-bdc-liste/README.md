# intra-bdc-liste — BDC · Liste

## Description

Liste des bons de commande d'un produit, sous forme de cartes cliquables, pour le tableau de bord
intrapreneur.

Le widget affiche **tous** les enregistrements visibles de la table source (après filtres et,
le cas échéant, après le lien avec un widget de sélection de produit). Chaque carte présente :

- un badge « BDC Clôturé » si le bon de commande est clôturé ;
- le nom du bon de commande ;
- deux tags : attributaire et marché ;
- une jauge DSFR (`gauge-chart`) allant de 0 au montant total, positionnée sur le montant consommé.
  La légende de gauche indique « Depuis le … » (ou « BDC pas encore reçu » si la date est vide),
  celle de droite « Restant à consommer … € », remplacée par « Restant non consommé … € » quand le
  BDC est clôturé.

Un clic sur une carte déplace le curseur Grist sur l'enregistrement correspondant
(`setCursorPos`) : la carte se met en surbrillance et les widgets liés à celui-ci — typiquement
[`intra-bdc-infos`](../intra-bdc-infos/README.md) — se mettent à jour. C'est donc le widget
« source » à choisir dans le champ « Sélectionner par » des autres widgets.

Si la table source ne contient aucune ligne, le widget affiche « Aucun bon de commande ».

## Colonnes Grist attendues

Toutes les colonnes sont obligatoires dans le panneau de configuration du widget.

| Mapping du widget | Type attendu | Colonne Grist source usuelle | Utilisation |
| --- | --- | --- | --- |
| `nom` | Texte | `Nom_pour_intra` | Titre de la carte |
| `attributaire` | Texte | `Attributaire` (colonne d'affichage : `Nom` de l'entreprise) | Tag attributaire |
| `marche` | Texte / Choix | `Marche` | Tag marché |
| `montantTotal` | Numérique | `Montant_TTC` | Cible (valeur maximale) de la jauge |
| `montantConsomme` | Numérique | `Consomme` | Valeur affichée par la jauge |
| `montantRestant` | Numérique | `Restant_a_consommer` | Légende « Restant à consommer … € » |
| `dateBdc` | Texte déjà formaté | `Date_du_bon_de_commande_formatee` | Légende « Depuis le … » |
| `cloture` | Booléen | `BDC_Cloture` | Badge « BDC Clôturé » et libellé de la légende de droite |

Points d'attention :

- `dateBdc` est affichée telle quelle : mapper une colonne texte déjà formatée
  (`Date_du_bon_de_commande_formatee` renvoie du `JJ/MM/AAAA`), pas une colonne Date brute.
- `montantConsomme` doit être cohérent avec `montantTotal`, sinon la jauge dépasse sa cible.
- L'ordre des cartes reprend l'ordre de tri de la table source : c'est là qu'il faut le régler.

## URL

L'url pour utiliser ce widget est `https://incubateur-agriculture.github.io/pollen/intra-bdc-liste/index.html`