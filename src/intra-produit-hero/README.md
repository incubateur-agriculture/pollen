# intra-produit-hero — Produit · En-tête

## Description

En-tête de la page "fiche produit" : identité du produit affiché et ses trois montants clés.

Le widget combine trois choses :

- un en-tête DSFR (`DsfrHeader`) 
- un sélecteur de produit
- la fiche du produit sélectionné : son nom en titre, sa date de création, la date du dernier comité,
  un lien vers le relevé de décisions des comités (affiché seulement si l'URL est renseignée), et
  trois cartes de montants — restant à engager, restant à consommer, budget disponible.

## Colonnes Grist attendues

Toutes les colonnes sont obligatoires dans le panneau de configuration du widget.

| Mapping du widget | Type attendu | Colonne Grist source usuelle | Utilisation |
| --- | --- | --- | --- |
| `nom` | Texte | `Nom` | Titre de la fiche et libellé des options du sélecteur |
| `dateCreation` | Texte déjà formaté | `Date_de_creation` (via une formule de mise en forme) | Phrase « Existe depuis le … » |
| `montantRestantAE` | Numérique | `Montant_restant_a_engager` | Carte « Montant restant à engager » |
| `montantRestantCP` | Numérique | `Montant_restant_a_consommer` | Carte « Montant restant à consommer » |
| `montantBudgetDisponible` | Numérique | `Montant_budget_disponible` | Carte « Budget disponible » |
| `comiteLien` | Texte (URL) | `Releve_de_decision_des_comites` | `href` du lien « au relevé de décisions des comités » |
| `comiteDate` | Texte déjà formaté | `Date_dernier_comite` (via une formule de mise en forme) | Phrase « Dernier comité le … » |

Points d'attention :

- quand une date n'est pas renseignée, le widget affiche `(non renseigné)`
- `dateCreation` et `comiteDate` sont affichées telles quelles, sans reformatage côté widget
- `comiteLien` doit contenir une URL complète (`https://…`)
- un montant vide ou absent affiche `-`
- le sélecteur liste les produits dans l'ordre de tri de la table source, sans filtrage
  supplémentaire

## URL

L'url pour utiliser ce widget est `https://incubateur-agriculture.github.io/pollen/intra-produit-hero/`