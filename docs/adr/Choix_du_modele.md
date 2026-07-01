# ADR-002 · Choix du modèle LLM pour la génération de quiz

## Contexte

Lors du bêta-test du jour 2, un utilisateur a signalé une latence élevée lors de la génération de quiz (environ 45 secondes pour 10 questions). Cette latence est jugée trop importante car elle dégrade l'expérience utilisateur en donnant l'impression que l'application est bloquée.

À ce stade du projet, un seul modèle est utilisé : **Llama 3.1 8B**, exécuté en local. Aucune comparaison expérimentale avec d'autres modèles n'a été réalisée dans le cadre du projet.

## Options envisagées

* Conserver le modèle actuel (Llama 3.1 8B).
* Évaluer ultérieurement des modèles plus légers afin d'améliorer les performances.

## Décision

Nous décidons de **conserver temporairement Llama 3.1 8B** pour la génération des quiz.

Le choix d'un éventuel autre modèle est reporté à une phase ultérieure, après la réalisation de tests comparatifs sur des critères tels que la latence, la qualité des questions générées et les ressources matérielles nécessaires.

## Justification

À ce stade, nous ne disposons pas de résultats expérimentaux permettant de comparer objectivement plusieurs modèles.

Changer de modèle sans évaluation préalable pourrait entraîner une baisse de la qualité des quiz ou des comportements inattendus. Il est donc préférable de conserver le modèle actuel jusqu'à la réalisation d'un benchmark dédié.

## Conséquences

### Positives

* Stabilité de la solution actuellement déployée.
* Aucune modification de l'architecture existante.
* Les futures décisions pourront être fondées sur des mesures objectives.

### Négatives

* La latence reste élevée.
* L'expérience utilisateur peut être impactée lors de la génération des quiz.

### À surveiller

* Réaliser un benchmark comparant plusieurs modèles LLM.
* Mesurer la qualité pédagogique des quiz générés.
* Étudier des optimisations telles que le streaming, le caching ou l'utilisation de modèles plus légers.

---

**Date :** 30/06/2026

**Statut :** Accepté
