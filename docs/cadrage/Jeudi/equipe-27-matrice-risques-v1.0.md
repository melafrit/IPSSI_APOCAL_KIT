# Analyse des risques — EduTutor IA (Équipe 27)
> Livrable perturbation J4 · APOCAL'IPSSI 2026 · Version 1.0 · 02/07/2026

---

## Contexte

Suite au passage télé et à l'adoption nationale d'EduTutor IA, 3 axes critiques émergent :
- **Scalabilité** : les serveurs ont failli tomber hier soir
- **Accessibilité RGAA** : condition non négociable de l'État français
- **Internationalisation (i18n)** : levée de fonds pour expansion européenne

---

## Matrice des risques (Probabilité × Impact)

**Échelle :**
- Probabilité : 1 = Faible · 2 = Moyenne · 3 = Élevée
- Impact : 1 = Faible · 2 = Moyen · 3 = Fort
- Exposition = Probabilité × Impact (≥ 6 = prioritaire 🔴)

| # | Risque | Cause probable | Probabilité | Impact | Exposition | Priorité |
|---|---|---|---|---|---|---|
| R1 | Saturation des serveurs au pic de trafic | Un seul serveur, base non répliquée | 3 | 3 | **9** | 🔴 Critique |
| R2 | Rejet RGAA par l'État (accessibilité non conforme) | Contrastes faibles, pas de navigation clavier, pas d'alternatives textuelles | 3 | 3 | **9** | 🔴 Critique |
| R3 | Interface inutilisable pour utilisateurs non francophones | Textes codés en dur en français, aucun sélecteur de langue | 3 | 2 | **6** | 🔴 Critique |
| R4 | Coût cloud hors budget après levée de fonds | Ressources surdimensionnées sans monitoring | 2 | 3 | **6** | 🔴 Critique |
| R5 | Panne du fournisseur LLM (Ollama indisponible) | Dépendance à un seul fournisseur local | 1 | 3 | **3** | 🟡 Modéré |
| R6 | Hallucinations LLM en langue étrangère | Modèle peu performant sur textes non-français | 2 | 2 | **4** | 🟡 Modéré |
| R7 | Fuite de données inter-utilisateurs à l'échelle | Endpoint export mal filtré sous forte charge | 1 | 3 | **3** | 🟡 Modéré |

---

## Actions préventives → Product Backlog

| Risque | Action préventive | Tag | MoSCoW | Estimation |
|---|---|---|---|---|
| R1 — Saturation serveurs | Test de charge + autoscaling + réplica lecture PostgreSQL | [scale] | **MUST** | 13 pts |
| R2 — Rejet RGAA | Audit RGAA complet + correction des 10 critères prioritaires (contrastes, focus, alt) | [a11y] | **MUST** | 8 pts |
| R3 — Interface non multilingue | Externaliser tous les textes en fichiers de langue (i18n) + sélecteur de langue | [i18n] | **MUST** | 8 pts |
| R3 — LLM non multilingue | Paramètre de langue dans le prompt système du LLM à la volée | [i18n] | **SHOULD** | 5 pts |
| R4 — Coût cloud | Budget d'alerte + dimensionnement des ressources + cache Redis | [scale] | **SHOULD** | 5 pts |
| R5 — Panne LLM | Fournisseur LLM de secours + file d'attente + mode dégradé | [risk] | **COULD** | 5 pts |
| R6 — Hallucinations | Tests de qualité LLM sur textes espagnols + seuil de rejet | [risk] | **COULD** | 3 pts |

**Total nouvelles stories ajoutées au backlog : +47 pts**

---

## User Stories ajoutées (format INVEST)

| ID | User Story | Tag | MoSCoW | Points |
|---|---|---|---|---|
| US-21 | En tant qu'utilisateur malvoyant, je veux naviguer au clavier sur toute l'interface, afin de ne pas avoir besoin de souris. | [a11y] | MUST | 5 pts |
| US-22 | En tant qu'utilisateur, je veux que tous les contrastes respectent WCAG AA (≥ 4.5:1), afin de lire confortablement. | [a11y] | MUST | 3 pts |
| US-23 | En tant qu'utilisateur Erasmus, je veux choisir la langue de l'interface (FR/EN/ES), afin de réviser dans ma langue. | [i18n] | MUST | 8 pts |
| US-24 | En tant qu'étudiant international, je veux que les quiz soient générés dans ma langue, afin de comprendre les questions. | [i18n] | SHOULD | 5 pts |
| US-25 | En tant qu'admin, je veux monitorer la charge serveur en temps réel, afin d'anticiper les pics de trafic. | [scale] | MUST | 13 pts |

---

## Décision MoSCoW suite à J4

Suite à l'analyse des risques, voici les arbitrages :

- **MUST** : R1, R2, R3 → traités en priorité absolue (conditions non négociables État)
- **SHOULD** : R4, R6 → intégrés si capacité disponible en Release 3
- **COULD** : R5, R7 → reportés Release 3+

---

*Document produit dans le cadre du projet EduTutor IA — APOCAL'IPSSI 2026 — Équipe 27*
*Référence : Matrice probabilité × impact — cours Agile Mohamed EL AFRIT*
