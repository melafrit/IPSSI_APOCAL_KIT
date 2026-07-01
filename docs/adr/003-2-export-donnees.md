# ADR-003-2 · Choix du dropdown d'export des données

## Contexte

Le bouton d'export des données utilisateur ne doit pas seulement proposer un téléchargement technique. Il doit aussi refléter clairement le périmètre des droits RGPD accessibles à l'utilisateur.

Nous devons donc faire correspondre les choix du dropdown avec les catégories de données réellement exportables :

* les informations personnelles ;
* les données d'utilisation de l'application ;
* l'export complet qui regroupe les deux précédents périmètres.

## Options envisagées

* Conserver un dropdown basé sur les formats techniques d'export.
* Afficher un export unique sans choix.
* Proposer des choix alignés sur le périmètre RGPD des données exportées.

## Décision

Nous décidons que le dropdown d'export affichera trois choix métiers :

* `Informations personnelles`
* `Données d'utilisation de l'app`
* `Tout exporter`

Un seul format de sortie est conservé : `JSON`.

## Justification

Ce choix est plus lisible pour l'utilisateur qu'une liste de formats techniques.

Les libellés du dropdown décrivent directement le contenu exporté et s'alignent sur le périmètre des droits RGPD. L'utilisateur comprend immédiatement ce qu'il récupère, sans avoir à interpréter une distinction entre JSON, CSV ou ZIP.

Le format JSON unique simplifie aussi la maintenance et évite de multiplier les représentations d'un même export.

## Conséquences

### Positives

* UI plus claire et plus conforme au langage métier.
* Export plus simple à maintenir côté front et côté back.
* Cohérence entre les libellés affichés et le contenu réellement fourni.

### Négatives

* On abandonne les formats CSV et ZIP.
* Toute évolution future du périmètre devra conserver cette logique métiers plutôt que revenir à des libellés techniques.

### À surveiller

* Garder le dropdown synchronisé avec le périmètre d'export côté backend.
* Revoir l'ADR si de nouvelles catégories RGPD doivent être exposées.

---

**Date :** 01/07/2026

**Statut :** Accepté
