# RÃ©sultats du benchmark LLM â€” Perturbation J2 (ADR-002)

- Cours de rÃ©fÃ©rence : `scripts/cours_reference.txt` (4625 caractÃ¨res)
- Runs : latence=5, qualitÃ©=2 Â· Seuil p95 â‰¤ 15s
- Poids composite : {'latence': 0.4, 'qualite': 0.4, 'ressources': 0.2}
- Machine : *[ Ã  complÃ©ter : CPU / GPU / RAM ]* Â· Date : *[ Ã  complÃ©ter ]*

## Phase initiale â€” comparaison des mÃ©thodes

| ModÃ¨le | Latence p50 (s) | Latence p95 (s) | QualitÃ© auto /10 | QualitÃ© testeurs /5 | Ressources (Go) | Composite /100 |
|---|---|---|---|---|---|---|
| llama3.1:8b | - | - | - | *[ Ã  noter ]* | 4.9 | 0.0 |
| llama3.2:3b | - | - | 8.3 | *[ Ã  noter ]* | 2.0 | 60.0 |
| phi3:mini | - | - | - | *[ Ã  noter ]* | 2.2 | 18.9 |
## Observation d'exécution

Les mesures de latence p50/p95 n'ont pas abouti sur cette machine pour les trois modèles à cause de timeouts.  
Le seul modèle ayant produit un résultat de qualité exploitable est `llama3.2:3b` avec une qualité automatique de 8.3/10 et un score composite de 60.0/100.

Décision provisoire : retenir `llama3.2:3b` comme candidat prioritaire, car il est plus léger que `llama3.1:8b` et a produit le meilleur résultat exploitable dans l'environnement local.
> La colonne **QualitÃ© testeurs /5** se remplit Ã  la main (â‰¥ 3 testeurs, mÃªme cours). Le score **QualitÃ© auto /10** est un proxy structurel automatique.

## MÃ©thode de rÃ©fÃ©rence retenue (ADR-002)

MÃ©thode unique conservÃ©e pour toutes les comparaisons ultÃ©rieures : **composite**.
