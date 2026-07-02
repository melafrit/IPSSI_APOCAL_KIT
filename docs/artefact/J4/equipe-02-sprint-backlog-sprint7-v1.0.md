# Sprint Backlog + Burndown
### Sprint 7 — Finalisation Release 2 · Post-J4 · Démo prête

**APOCAL'IPSSI · PERTURBATION J4 · ARTEFACT SPRINT 7**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 02 |
| **Membres** | Adja Fatou SAGNA, Ousmane NDIAYE, Houda OUADAH, Danielle Jamila KOAGNE NGANKAM, Wicramachine SERGIO, Krishmini KULAKRISHNA, Mohammed DERKAOUI |
| **Sprint concerné** | Sprint 7 — Jeudi PM (14h00 – 17h00) |
| **Capacité** | 21 h-pers (3h × 7 membres) |
| **Version** | v1.0 |
| **Date de remise** | 03/07/2026 17h00 |
| **Statut** | Validé PO |

---

## Objectif du Sprint 7

> **Finalisation Release 2 avec intégration des 3 axes J4 : accessibilité RGAA · internationalisation · scalabilité**
>
> Stories engagées : **US-I18N-01** (interface multilingue FR/EN) · **US-A11Y-01** (RGAA niveau A) · **US-A11Y-02** (navigation clavier) · **US-SCALE-03** (tests de charge k6) · **US-16** (identification lacunes)
>
> Capacité : 21 h-pers · Vélocité cible : 6–8 SP · 🚀 Release 2 17h00

---

## Sprint Backlog — Tâches techniques

> 💡 **Contrainte J4** — Le sprint intègre les 3 axes de la perturbation. RGAA et i18n sont des MUST livrables avant Release 2 pour satisfaire les critères d'adoption plateforme publique.

| ID | Tâche | Story | Assigné·e | SP | Statut |
|----|-------|-------|-----------|-----|--------|
| T7-01 | Externaliser tous les textes React en fichiers `messages/fr.json` + `messages/en.json` via `react-intl` | US-I18N-01 | Danielle J. KOAGNE NGANKAM | 3 | In Progress |
| T7-02 | Ajouter le sélecteur de langue (`<LanguageSwitcher>`) dans le header React, persisté en `localStorage` | US-I18N-01 | Adja Fatou SAGNA | 2 | In Progress |
| T7-03 | Ajouter `role="main"`, `aria-label`, `alt` et `aria-live` sur tous les composants critiques (quiz, résultats, nav) | US-A11Y-01 | Houda OUADAH | 2 | In Progress |
| T7-04 | Audit navigation clavier : tester Tab/Entrée/Espace sur tous les formulaires + corriger les pièges de focus | US-A11Y-02 | Krishmini KULAKRISHNA | 2 | Ready |
| T7-05 | Écrire script k6 `load_test.js` : 500 users simultanés, seuil p50 < 15 s, intégré dans GitHub Actions | US-SCALE-03 | Ousmane NDIAYE | 2 | Ready |
| T7-06 | Implémenter US-16 : algorithme d'identification des lacunes (regrouper erreurs par thème sur 3+ quiz) | US-16 | Wicramachine SERGIO | 3 | Ready |
| T7-07 | Ajouter NFR accessibilité RGAA + charge 1000 users dans la DoD partagée (README + PR template) | ACT-10 | Mohammed DERKAOUI | 1 | Ready |
| T7-08 | Préparer la démo Release 2 : scénario Lucia (i18n ES → quiz en espagnol + navigation clavier) | Démo | Toute l'équipe | 1 | Ready |
| **TOTAL** | | | | **16 SP brut** | |

> 📌 **Vélocité réaliste 6–8 SP** : T7-01 + T7-02 + T7-03 + T7-04 + T7-07 = **10 SP Must/Should** livrés en priorité. T7-05, T7-06 en parallèle si capacité disponible.

---

## Burndown Sprint 7

> 📐 Sprint de 3h (14h00–17h00) · Scope : 16 SP brut, 8 SP priorité haute

| Heure | SP restants (idéal) | SP restants (réel) |
|-------|---------------------|--------------------|
| 14h00 (début) | 16 | 16 |
| 14h45 | 12 | — |
| 15h30 | 8 | — |
| 16h15 | 4 | — |
| 17h00 (fin Release 2) | 0 | — |

---

## Burnup Global — Mise à jour post-J4

> 📊 **Impact des perturbations sur le scope total** — Visible sur le burnup, le scope a augmenté à chaque jour.

| Sprint | Fin de sprint | SP livrés (réel cumulé) | Scope total (avec perturbations) | Événement |
|--------|---------------|-------------------------|----------------------------------|-----------|
| Sprint 0 — Cadrage | Lun 13h30 | 0 | 56 | Scope initial |
| Sprint 1 — Auth | Lun 18h | 10 | 56 | ✅ US-01 + US-06 |
| Sprint 2 — Upload+Gen | Mar 12h30 | 20 | 56 | ✅ US-02 + US-03 · ⚡ J2 (latence) |
| Sprint 3 — Correction | Mar 18h | 30 | 77 | ✅ US-04 + US-05 · ⚡ J1 +21 SP |
| Sprint 4 — Sécurité | Mer 12h30 | 38 | 77 | ✅ US-07 + US-10 · ⚡ J3 (sécurité) |
| Sprint 5 — OAuth+Dashboard | Mer 18h | 46 | 77 | ✅ US-13 + US-11 · ⚡ J3-bis (RGPD) · 🚀 R1 MVP |
| Sprint 6 — RGPD+Scale | Jeu 12h30 | 55 | 114 | ✅ US-12 + US-17 + SCALE-01/02 · ⚡ J4 +37 SP |
| Sprint 7 — Finalisation | Jeu 17h | 63 | 114 | 🚀 Release 2 · US-I18N + A11Y + SCALE-03 |

> 📌 **Lecture** : Le scope est passé de 56 SP (cadrage) à 114 SP (post-J4), soit +104%. La courbe réelle reste proche de l'idéal grâce aux arbitrages MoSCoW (reportes en Release 3+).

---

## Stories reportées (hors Sprint 7, pour Release 3+)

> Ces stories sont **exclues de la Release 2** suite aux arbitrages MoSCoW post-J4 :

| ID | Description | SP | Raison du report |
|----|-------------|-----|-----------------|
| US-I18N-02 | Quiz générés dans la langue du LLM | 5 | Capacité Sprint 7 insuffisante |
| US-I18N-03 | Langue mémorisée en profil back-end | 2 | Non critique pour Release 2 |
| US-A11Y-04 | Déclaration d'accessibilité publiable | 3 | Post-déploiement prod |
| US-SCALE-04 | Architecture K8s / Docker Swarm | 13 | Hors cadre semaine APOCAL |
| US-SCALE-05 | LLM fallback provider | 5 | Post-Release 2 |
| US-NEW-04 | Génération barème auto (enseignant) | 8 | Capacité Sprint 7 insuffisante |
| US-16 | Identification lacunes (si T7-06 non terminée) | 3 | Best-effort Sprint 7 |

---

## Definition of Ready (DoR) — Sprint 7

Une story est PRÊTE si :

- [ ] Formulée en verbe d'action assignable à 1 personne
- [ ] Estimée en SP (max 3 SP = max ~4h)
- [ ] Dépendances identifiées (ex : T7-01 avant T7-02)
- [ ] Axe J4 associé (RGAA / i18n / scale)

## Definition of Done (DoD) — Sprint 7 (enrichie post-J4)

Une tâche est DONE si :

- [ ] Code écrit et reviewé (PR approuvée ≥ 1 membre)
- [ ] Tests pytest / Playwright correspondants passent en CI (GitHub Actions au vert)
- [ ] Pas de violation RGAA niveau A détectée (axe DevTools ou WAVE)
- [ ] Interface testée avec au moins 1 langue de traduction active (FR/EN)
- [ ] Load test k6 : p50 < 15 s sous 500 users (si applicable)
- [ ] Démontrable en Release 2 Review (scénario Lucia ou scénario Léa)

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| L'objectif du sprint intègre explicitement les 3 axes J4 | ☑ Oui | RGAA · i18n · scale mentionnés dans l'objectif |
| Les tâches sont décomposées en actions ≤ 3 SP chacune | ☑ Oui | T7-01 à T7-08 : 1 à 3 SP max |
| Chaque tâche est assignée à un membre identifié | ☑ Oui | 7 membres couverts |
| Le burndown Sprint 7 est initialisé (16 → 0 sur 3h) | ☑ Oui | Tableau burndown section 3 |
| Le burnup global montre l'impact des perturbations sur le scope | ☑ Oui | Scope 56 → 114 SP (+104%), section 4 |
| Les stories reportées sont listées avec raison explicite | ☑ Oui | Section "Stories reportées" avec justification |
| La DoD a été enrichie avec les critères J4 (RGAA + i18n + k6) | ☑ Oui | DoD section finale |
| Le scénario démo Release 2 inclut la persona Lucia (J4) | ☑ Oui | T7-08 — scénario Lucia |

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
