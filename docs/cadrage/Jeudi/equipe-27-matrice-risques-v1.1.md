# Matrice des risques — EduTutor IA (Équipe 27)
> Livrable perturbation J4 · APOCAL'IPSSI 2026 · Version 1.1 · 02/07/2026  
> Critères d'acceptation couverts : CA-J4-3 · CA-J4-4

---

## Contexte

Suite au passage télé et à l'adoption nationale d'EduTutor IA, trois axes critiques émergent :
- **Scalabilité** : les serveurs ont failli tomber lors du pic de trafic
- **Accessibilité RGAA** : condition non négociable imposée par l'État français
- **Internationalisation (i18n)** : levée de fonds en vue d'une expansion européenne

---

## Matrice des risques (Probabilité × Impact)

**Échelle :**
- Probabilité : 1 = Faible · 2 = Moyenne · 3 = Élevée
- Impact : 1 = Faible · 2 = Moyen · 3 = Fort
- Exposition = Probabilité × Impact (≥ 6 = prioritaire 🔴)

| # | Risque | Cause probable | Probabilité | Impact | Exposition | Priorité |
|---|---|---|---|---|---|---|
| R1 | Saturation des serveurs au pic de trafic | Serveur unique, base de données non répliquée | 3 | 3 | **9** | 🔴 Critique |
| R2 | Rejet RGAA par l'État (accessibilité non conforme) | Contrastes faibles, pas de navigation clavier, absence d'alternatives textuelles | 3 | 3 | **9** | 🔴 Critique |
| R3 | Interface inutilisable pour les utilisateurs non francophones | Textes codés en dur en français, aucun sélecteur de langue | 3 | 2 | **6** | 🔴 Critique |
| R4 | Coût cloud hors budget après la levée de fonds | Ressources surdimensionnées sans surveillance active | 2 | 3 | **6** | 🔴 Critique |
| R5 | Panne du fournisseur LLM (Ollama indisponible) | Dépendance à un seul fournisseur local | 1 | 3 | **3** | 🟡 Modéré |
| R6 | Hallucinations du LLM sur des textes en langue étrangère | Modèle peu performant sur les contenus non francophones | 2 | 2 | **4** | 🟡 Modéré |
| R7 | Fuite de données entre utilisateurs sous forte charge | Endpoint d'export mal filtré lors des pics de trafic | 1 | 3 | **3** | 🟡 Modéré |

---

## Actions préventives par risque prioritaire

Pour chaque risque d'exposition ≥ 6, une action préventive est proposée et estimée pour intégration dans le Product Backlog par l'équipe.

| Risque | Action préventive | Étiquette | MoSCoW | Estimation |
|---|---|---|---|---|
| R1 — Saturation serveurs | Test de charge + autoscaling + réplica lecture PostgreSQL | [scale] | **MUST** | 13 pts |
| R2 — Rejet RGAA | Audit RGAA complet + correction des 10 critères prioritaires (contrastes, focus clavier, alternatives textuelles) | [a11y] | **MUST** | 8 pts |
| R3 — Interface non multilingue | Externalisation de tous les textes dans des fichiers de langue (i18n) + sélecteur de langue | [i18n] | **MUST** | 8 pts |
| R3 — LLM non multilingue | Ajout d'un paramètre de langue dans le prompt système du LLM à la volée | [i18n] | **SHOULD** | 5 pts |
| R4 — Coût cloud | Alerte budgétaire + dimensionnement des ressources + cache Redis | [scale] | **SHOULD** | 5 pts |
| R5 — Panne LLM | Fournisseur LLM de secours + file d'attente + mode dégradé | [risk] | **COULD** | 5 pts |
| R6 — Hallucinations | Tests de qualité du LLM sur des textes en espagnol + seuil de rejet automatique | [risk] | **COULD** | 3 pts |

---

## Décision MoSCoW issue de l'analyse des risques

| Priorité | Risques concernés | Justification |
|---|---|---|
| **MUST** | R1, R2, R3 | Conditions non négociables : adoption par l'État impossible sans scalabilité, RGAA et i18n |
| **SHOULD** | R4, R6 | À traiter si la vélocité le permet en Release 3 |
| **COULD** | R5, R7 | Reportés en Release 3+ : probabilité faible à court terme |

---

*Document produit dans le cadre du projet EduTutor IA — APOCAL'IPSSI 2026 — Équipe 27*  
*Référence méthodologique : Matrice probabilité × impact — cours Agile Mohamed EL AFRIT*
