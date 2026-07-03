# Blameless Post-Mortem : Le buzz national
### Scalabilité, accessibilité RGAA et internationalisation — Perturbation J4

**APOCAL'IPSSI · TEMPLATE PERTURBATION · J4 (SCALABILITÉ)**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 2 |
| **Membres** | Danielle Jamila KOAGNE NGANKAM, Krishmini KULAKRISHNA, Wicramachine SERGIO, Houda OUADAH, Adja Fatou SAGNA, Mohammed DERKAOUI, Ousmane NDIAYE |
| **Sprint concerné** | Sprint 6 (Perturbation J4 — Scalabilité) |
| **Version** | v1.0 (initiale) |
| **Date de remise** | 03/07/2026 12h30 |
| **Statut** | Validé PO |

> 💡 Convention de nommage du fichier : `equipe-02-blameless-postmortem-j4-v1.0.docx`

---

## PRÉAMBULE

### Contexte de la perturbation J4

Jeudi 10h00, la perturbation J4 est déclenchée : « Le succès qui change tout ». EduTutor IA a fait l'objet d'un article dans un média national. Des milliers d'utilisateurs s'inscrivent simultanément. La plateforme doit désormais :

1. **Passer à l'échelle** (scalabilité horizontale)
2. **Devenir accessible** (conformité RGAA 4.1)
3. **Gérer plusieurs langues** (français + anglais au minimum)

Ce post-mortem blameless (modèle Google SRE) trace ce qui s'est passé, les décisions prises, et les leçons apprises — sans chercher à désigner un responsable.

> 💡 **Philosophie blameless** — L'objectif est d'améliorer les systèmes et les processus, pas de punir des individus. Les incidents révèlent des failles systémiques, pas des incompétences personnelles.

---

## 1. Résumé de l'incident

| Champ | Valeur |
|---|---|
| **Date/heure début** | Jeudi 03/07/2026 · 10h00 |
| **Date/heure fin** | Jeudi 03/07/2026 · 12h30 |
| **Durée** | ~2h30 |
| **Sévérité** | P1 — Service dégradé pour tous les utilisateurs |
| **Déclencheur** | Perturbation J4 : article média national, afflux massif d'utilisateurs |
| **Impact utilisateur** | Latence > 60 s pour 80% des requêtes · Interface inaccessible aux lecteurs d'écran · Contenu uniquement en français |

---

## 2. Chronologie détaillée (timestamped)

| Heure | Événement |
|---|---|
| 10h00 | ⚡ Perturbation J4 déclenchée : annonce d'un buzz médiatique national |
| 10h05 | Première mesure : 500 utilisateurs simultanés (vs 50 en production normale) |
| 10h08 | Latence p50 monte à 58 s (vs 12 s nominal) — seuil d'abandon atteint |
| 10h12 | Décision d'urgence : session d'équipe pour triage (méthode 5 étapes) |
| 10h15 | Identification des 3 axes : scalabilité + RGAA + i18n |
| 10h30 | Création des stories d'urgence dans le backlog (US-SCALE-01 à US-SCALE-05) |
| 10h45 | Application immédiate : mise en cache Nginx des résultats de quiz statiques |
| 11h00 | Réaffectation de 3 membres sur la scalabilité, 2 sur RGAA, 2 sur i18n |
| 11h30 | Latence ramenée à 18 s après mise en cache + optimisation requêtes Celery |
| 12h00 | Première passe RGAA : contrastes + attributs `alt` + navigation clavier |
| 12h15 | Première version anglaise des pages principales déployée en staging |
| 12h30 | Sprint Review d'urgence : démo des 3 axes, validation PO |

---

## 3. Analyse des causes (5 Pourquoi)

### 3.1. Axe Scalabilité

**Symptôme :** Latence × 5 sous charge 500 utilisateurs simultanés.

| # | Pourquoi ? |
|---|---|
| 1 | La latence a explosé → parce que le LLM tourne en instance unique synchrone |
| 2 | Instance unique → parce que l'architecture ne prévoyait pas de workers Celery multiples |
| 3 | Pas de workers multiples → parce que le Release Planning était calibré pour 50 users max |
| 4 | Calibré 50 users → parce que le MVP ne visait pas un déploiement national |
| 5 | Déploiement national non prévu → **cause racine : absence d'hypothèse de traction virale dans le Risk Register** |

### 3.2. Axe RGAA

**Symptôme :** Interface incompatible avec les lecteurs d'écran (NVDA/VoiceOver).

| # | Pourquoi ? |
|---|---|
| 1 | Non compatible NVDA → parce que les `<div>` ne sont pas des éléments sémantiques |
| 2 | Pas de sémantique → parce que les composants React n'utilisent pas les rôles ARIA |
| 3 | Pas de rôles ARIA → parce que la DoD ne mentionnait pas l'accessibilité |
| 4 | DoD sans accessibilité → parce que RGAA n'était pas dans les NFR initiales |
| 5 | NFR RGAA absentes → **cause racine : l'accessibilité non identifiée comme exigence légale (loi du 11/02/2005)** |

### 3.3. Axe Internationalisation

**Symptôme :** Interface 100% française, blocant les utilisateurs non-francophones.

| # | Pourquoi ? |
|---|---|
| 1 | Pas d'anglais → parce que les templates front sont codés en dur en français |
| 2 | Codés en dur → parce que `i18n` / `react-intl` n'était pas intégré dès le Sprint 1 |
| 3 | Pas de `i18n` dès S1 → parce que non-requis dans les US initiales |
| 4 | Non-requis → parce que la cible initiale était uniquement le marché FR |
| 5 | Marché FR uniquement → **cause racine : Vision Board v1.0 ne mentionnait pas d'ambition internationale** |

---

## 4. Actions correctives

### 4.1. Actions immédiates (Sprint 6 — jeudi matin)

| ID | Action | Responsable | Délai | Statut |
|---|---|---|---|---|
| ACT-01 | Ajouter 3 workers Celery + Redis queue pour la génération de quiz async | Wicramachine SERGIO | Jeudi 12h | ✅ Fait |
| ACT-02 | Mettre en cache Nginx les quiz statiques (TTL 1h) | Mohammed DERKAOUI | Jeudi 11h | ✅ Fait |
| ACT-03 | Ajouter `lang`, `alt`, `aria-label` sur tous les éléments UI critiques (RGAA niveau A) | Houda OUADAH + Adja Fatou SAGNA | Jeudi 12h | ✅ Fait |
| ACT-04 | Intégrer `react-intl` + fichier `messages/fr.json` + `messages/en.json` | Danielle J. KOAGNE NGANKAM | Jeudi 12h | ✅ Fait |
| ACT-05 | Créer US-SCALE-01 à US-SCALE-05 dans le backlog + MoSCoW note de scope | Krishmini KULAKRISHNA | Jeudi 10h30 | ✅ Fait |

### 4.2. Actions à moyen terme (Release 2 — Sprint 7)

| ID | Action | Horizon | Priorité |
|---|---|---|---|
| ACT-06 | Audit RGAA 4.1 complet (niveaux A + AA) avec outil axe DevTools | R2 | SHOULD |
| ACT-07 | Mise à l'échelle horizontale : Docker Swarm ou Kubernetes (selon infra) | R2 | SHOULD |
| ACT-08 | Load testing automatisé (k6) dans la pipeline CI/CD | R2 | SHOULD |
| ACT-09 | Intégration langue espagnole (3ᵉ langue cible Europe) | R2 | COULD |
| ACT-10 | Ajouter NFR « accessibilité » et « charge 1000 users » dans la DoD partagée | R2 | MUST |

### 4.3. Actions systémiques (éviter la récurrence)

| ID | Action systémique | Pourquoi |
|---|---|---|
| SYS-01 | Ajouter un Risk Register au Product Backlog dès le cadrage | La traction virale n'était pas un risque identifié |
| SYS-02 | Inclure RGAA dans la DoD dès Sprint 1 pour tout nouveau composant React | Rétrofitter l'accessibilité coûte 5× plus cher |
| SYS-03 | Prévoir un scenario de charge dans le Release Planning (paliers 50 / 500 / 5000 users) | Architecture scalable dès le départ |
| SYS-04 | Mettre à jour le Vision Board (PVB v4.0) pour inclure l'ambition internationale | Aligner la vision sur la réalité du buzz |

---

## 5. Leçons apprises

### Ce qui a bien fonctionné

- La méthode de triage en 5 étapes (60 s pause → identifier → MoSCoW → exécuter → retro) a été appliquée rapidement
- La répartition des 3 axes entre sous-groupes a permis de paralléliser efficacement
- Le feature flag LLM_MODEL (ADR-0002) a évité une crise supplémentaire sur la qualité

### Ce qui n'a pas fonctionné

- Le Risk Register était vide → risque de traction virale non anticipé
- RGAA absent de la DoD → dette technique accessibilité accumulée depuis Sprint 1
- Pas d'`i18n` dès le départ → refactoring coûteux en urgence

### Ce qu'on ferait différemment

- Intégrer RGAA + i18n + capacity planning dans la DoD dès le cadrage
- Faire un test de charge dès Sprint 2 avec k6 (10 min, pas une semaine entière)
- Mettre à jour le Vision Board à chaque perturbation majeure (J1, J3, J4)

---

## 6. Mise à jour du Product Vision Board (v4.0)

Suite à la perturbation J4, le PVB est mis à jour :

- **Vision :** extension de la cible géographique → Europe francophone + anglophone
- **Target Group :** ajout d'une cible tertiaire internationale (établissements hors France)
- **Product :** ajout de « Interface multilingue (FR/EN) » et « Accessible RGAA 4.1 AA »
- **Business Goals :** nouveau KPI → « 10 000 utilisateurs actifs mensuels d'ici T+9 mois »

> Fichier : `docs/artefact/J4/equipe-02-pvb-v4.0.md` (à créer lors du Sprint 7)

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| La chronologie timestampée couvre toute la durée de l'incident | ☑ Oui | 10h00 → 12h30, 12 événements tracés |
| L'analyse 5 Pourquoi est appliquée sur les 3 axes (scalabilité, RGAA, i18n) | ☑ Oui | 3 × 5 Pourquoi, causes racines identifiées |
| Les actions immédiates sont assignées avec délai et statut | ☑ Oui | 5 actions ACT-01 à ACT-05, toutes Done |
| Les actions à moyen terme sont liées à Release 2 | ☑ Oui | 5 actions R2 avec priorité MoSCoW |
| Les actions systémiques évitent la récurrence (pas juste du curatif) | ☑ Oui | 4 actions systémiques SYS-01 à SYS-04 |
| Les leçons apprises distinguent ce qui a fonctionné vs ce qui n'a pas fonctionné | ☑ Oui | 3 sections : bien / pas bien / autrement |
| Le document est blameless (pas de désignation individuelle) | ☑ Oui | Causes systémiques, pas personnelles |
| La mise à jour du PVB est mentionnée et localisée | ☑ Oui | PVB v4.0 référencé |

---

## 📚 Références

- Google SRE Book, Postmortem Culture : https://sre.google/sre-book/postmortem-culture/
- RGAA 4.1, Référentiel Général d'Accessibilité pour les Administrations : https://accessibilite.numerique.gouv.fr/
- Loi du 11/02/2005, accessibilité des services numériques : https://www.legifrance.gouv.fr/
- k6, outil de load testing : https://k6.io/
- APOCAL'IPSSI, Perturbation J4 : https://mohamedelafrit.com/teaching/APOCALIPSSI/pages/perturbations.php

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
