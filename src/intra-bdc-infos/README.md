# intra-bdc-infos — BDC · Informations

## Description

Fiche détaillée du bon de commande sélectionné, pour le tableau de bord intrapreneur.

Le widget n'affiche qu'un seul enregistrement à la fois : celui sur lequel se trouve le curseur
de la table source. Il est donc conçu pour être lié (« Sélectionner par ») au widget
[`intra-bdc-liste`](../intra-bdc-liste/README.md), qui déplace le curseur au clic.

Contenu affiché :

- le nom du bon de commande en titre ;
- trois tags : attributaire, marché, numéro Chorus ;
- la date de réception du BDC (`(?)` si elle n'est pas renseignée) ;
- un message d'information si le BDC est clôturé, précisant que le montant restant est expiré ;
- trois cartes de montants : total, consommé, et reste à consommer. La carte « reste à consommer »
  change de couleur selon la part du montant total qui reste : vert à partir de 50 %, jaune en
  dessous de 50 %, orange en dessous de 25 %, rouge en dessous de 10 %, et gris quand il ne reste
  exactement rien. Son libellé devient « Restant non consommé » quand le BDC est clôturé ;
- la date et l'auteur de la dernière modification.

Aucune écriture dans Grist : le widget est en lecture seule (il ne déplace même pas le curseur).

## Colonnes Grist attendues

Toutes les colonnes sont obligatoires dans le panneau de configuration du widget.

| Mapping du widget | Type attendu | Colonne Grist source usuelle | Utilisation |
| --- | --- | --- | --- |
| `nom` | Texte | `Nom_pour_intra` | Titre de la fiche |
| `chorus` | Texte | `Numero_chorus` | Tag « n° chorus … » |
| `attributaire` | Texte | `Attributaire` (colonne d'affichage : `Nom` de l'entreprise) | Tag attributaire |
| `marche` | Texte / Choix | `Marche` | Tag marché |
| `montantTotal` | Numérique | `Montant_TTC` | Carte « Montant total » et calcul des seuils de couleur |
| `montantConsomme` | Numérique | `Consomme` | Carte « Montant consommé » |
| `montantRestant` | Numérique | `Restant_a_consommer` | Carte « Reste à consommer » et couleur de la carte |
| `dateBdc` | Texte déjà formaté | `Date_du_bon_de_commande_formatee` | Phrase « Bon de commande réceptionné le … » |
| `derniereModification` | Texte déjà formaté | `Derniere_modification` | Phrase « Dernière mise à jour … » |
| `cloture` | Booléen | `BDC_Cloture` | Affiche le message de clôture et change le libellé de la 3ᵉ carte |

Points d'attention :

- `dateBdc` et `derniereModification` sont affichées telles quelles, sans reformatage côté widget.
- un montant vide ou absent affiche `-`.
- Les seuils de couleur comparent `montantRestant` à `montantTotal` : les deux doivent venir du même
  enregistrement pour que la couleur ait du sens.

## URL

L'url pour utiliser ce widget est `https://incubateur-agriculture.github.io/pollen/intra-bdc-infos/index.html`