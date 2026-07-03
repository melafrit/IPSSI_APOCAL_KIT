# ADR-0002 : Architecture Decision Record
### Migration du modèle LLM par défaut : Llama 3.1 8B → Llama 3.2 3B

**APOCAL'IPSSI · TEMPLATE PERTURBATION · J2 (TECHNIQUE)**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 2 |
| **Membres** | Danielle Jamila KOAGNE NGANKAM, Krishmini KULAKRISHNA, Wicramachine SERGIO, Houda OUADAH, Adja Fatou SAGNA, Mohammed DERKAOUI, Ousmane NDIAYE |
| **Sprint concerné** | Sprint 2 (Perturbation J2 — Technique) |
| **Version** | v1.0 (Création initiale) |
| **Date de remise** | 30/06/2026 13h00 |
| **Statut** | Validé PO |

> 💡 Convention de nommage du fichier : `Equipe-02-ADR-Pertubation J2-0002-v1.0.docx`

---

## PRÉAMBULE

Un ADR (Architecture Decision Record) est un document court qui trace une décision technique structurante du projet. Format inventé par Michael Nygard en 2011, devenu un standard de l'industrie. Permet à l'équipe (et aux successeurs) de comprendre pourquoi une décision a été prise, dans quel contexte, avec quelles alternatives écartées, et avec quelles conséquences assumées.

> 💡 **Mode d'emploi** — Un ADR pèse 1 à 2 pages maximum. Format Nygard : Contexte → Décision → Conséquences. Les ADR sont numérotés (ADR-0001, ADR-0002...) et stockés dans `/docs/adr/` du repo.

---

## 1. Métadonnées

| Champ | Valeur |
|---|---|
| **Numéro** | ADR-0002 |
| **Titre** | Migration du modèle LLM par défaut : Llama 3.1 8B → Llama 3.2 3B |
| **Statut** | ☑ Accepté |
| **Date** | 2026-06-30 14h30 (perturbation J2) |
| **Auteurs** | Équipe 2 complète |
| **Version** | v1.0 |
| **Supersedes** | ADR-0001 (Choix initial Llama 3.1 8B en cadrage matinal) |

---

## 2. Contexte

### 2.1. Situation factuelle

Mardi 30 juin 2026 à 10h00, la perturbation J2 est révélée : la latence de génération d'un quiz de 10 QCM est jugée inacceptable. Mesures effectuées par l'équipe (script `benchmark.sh`, 5 runs, environnement Sprint 1) :

| Métrique | Valeur mesurée |
|---|---|
| Latence p50 (médiane) | 42,3 s |
| Latence p95 | 51,2 s |
| Modèle utilisé | Llama 3.1 8B via Ollama local (ADR-0001) |
| Ressenti utilisateur (3 beta-testeurs) | « beaucoup trop long, j'abandonne » |
| Métriques d'engagement | -34% de quiz complétés vs session de référence |

### 2.2. Impact si on ne décide rien

- MVP Release 1 (mercredi 17h45) risque d'être rejeté en démo PO pour cause d'UX dégradée.
- Adoption B2B (Mme Lefèvre) compromise : 28 étudiants ne supportent pas 42 s d'attente.
- Concurrents directs (Wilgo, Leo) annoncent des temps < 5 s, désavantage concurrentiel majeur.
- Risque d'abandon massif en production : seuil d'abandon utilisateur mesuré à 15 s (étude Nielsen Norman).

### 2.3. Contraintes du projet

- Stack imposée : Ollama local uniquement, aucune API externe autorisée (OpenAI, Anthropic, Mistral cloud).
- Décision attendue avant la fin du Sprint 3 (mardi 18h), vitre de tir de ~6h.
- Maintien de la conformité RGPD.
- RAM serveur limitée à 8 Go (contrainte matérielle).

---

## 3. Options envisagées

| Option | Avantages | Inconvénients | Coût (effort/risque) |
|---|---|---|---|
| **A. Ne rien faire** (statu quo Llama 3.1 8B) | 0 effort, qualité maintenue (8,2/10) | 42,3 s latence inacceptable, MVP risque d'être rejeté | Faible effort / risque élevé sur démo PO |
| **B. Optimiser le prompt seul** | Pas de changement de stack, gain attendu ~20% | Gain insuffisant (33,8 s p50 estimé), reste > 15 s | Faible effort / risque modéré (pas une vraie solution) |
| **C. Migrer vers Llama 3.2 3B** *(CHOIX RETENU)* | Latence 12,4 s p50 (-71%), RAM -5 GB, même famille Meta (prompts compatibles), qualité 8,0/10 (-2%) | Qualité légèrement inférieure au 8B, mais largement acceptable pour QCM pédagogiques | Effort FAIBLE (config Ollama 30 min) / risque qualité MINIME |
| **D. Migrer vers Phi-3-mini (3,8B)** | Latence 8,2 s p50 (-81%), RAM -6 GB | Qualité 6,9/10 (-16%), 4 questions ambiguës/50 vs 1/50, famille Microsoft (moins cohérence prompts) | Faible effort / risque qualité ÉLEVÉ |

---

## 4. Décision retenue

> **Option C — Migration vers Llama 3.2 3B** comme modèle LLM par défaut, avec feature flag pour rollback rapide vers Llama 3.1 8B si la qualité dégrade en production.

### 4.1. Justification du choix

L'option C (Llama 3.2 3B) est retenue car elle offre le meilleur compromis qualité/latence parmi les options conformes à la stack imposée :

- Latence ramenée à 12,4 s p50 (-71%) : sous le seuil d'abandon utilisateur de 15 s.
- Qualité préservée à 8,0/10 (-2% seulement) : largement au-dessus du seuil cible ≥ 7.
- Même famille Meta que Llama 3.1 8B : compatibilité des prompts existants, migration sans réécriture.
- RAM réduite de 5 GB (8B → 3B) : permet d'envisager plus d'utilisateurs simultanés.
- Option D (Phi-3-mini) écartée : perte de qualité trop importante (-16%) et famille Microsoft moins cohérente.
- Option cloud écartée : violation RGPD, non négociable pour la cible B2B éducation.

### 4.2. Mesures de mitigation des inconvénients

1. **Feature flag `LLM_MODEL`** en variable d'environnement : permet rollback en 5 minutes vers Llama 3.1 8B si problème.
2. **Validation post-LLM systématique** : parsing JSON strict (4 options, 1 correcte, longueur > 10 caractères), re-prompt automatique si invalide (max 2 essais).
3. **Audit qualité hebdomadaire** : 50 quiz tirés au hasard, scoring manuel par 2 reviewers, KPI « % erreurs factuelles » suivi dans le dashboard.
4. **Veille active des nouveaux modèles** (Llama 3.3, Mistral Small 3.1, Phi-4), révision ADR si meilleur compromis identifié.

---

## 5. Conséquences

### 5.1. Conséquences positives (gains mesurés)

| Métrique | Avant | Après | Gain |
|---|---|---|---|
| Latence p50 | 42,3 s | 12,4 s | -71% |
| Latence p95 | 51,2 s | 16,8 s | -67% |
| RAM serveur | ~8 GB | ~3 GB | -5 GB libérés |
| Coût électrique serveur | base | -35% estimé | — |

- Démo PO Sprint 5 sécurisée (latence sous 15 s pour 100% des quiz)
- Compatibilité prompts : même famille Meta, pas de réécriture nécessaire

### 5.2. Conséquences négatives (coûts assumés)

- Qualité moyenne du quiz : 8,2/10 → 8,0/10 (perte 2% seulement, acceptable)
- Taux de questions ambiguës : 1/50 → 2/50 (×2), nécessite validation renforcée
- Dépendance accrue à la validation post-LLM (point de défaillance unique si bug parser)
- Risque de re-migration si Llama 3.2 3B déprécié par Meta (sunset modèle)

---

## 6. KPIs à surveiller post-décision

| KPI | Seuil cible | Seuil d'alerte | Action si dépassement |
|---|---|---|---|
| Latence p50 génération quiz | < 15 s | > 20 s pendant 3 jours | Déclencher ADR de re-migration (test Phi-4 ou Mistral Small 3.1) |
| Latence p95 génération quiz | < 20 s | > 25 s pendant 3 jours | Audit infrastructure Ollama + GPU si applicable |
| Score qualité moyen (audit hebdo 50 quiz) | ≥ 7,8/10 | < 7,5/10 sur 2 semaines | Améliorer prompt (few-shot exemples) + revue ADR |
| Taux d'échec validation post-LLM | < 5% | > 10% sur 1 semaine | Audit code parser + ajout règles de validation |
| Signalements utilisateurs (erreur factuelle) | < 2/semaine | > 5/semaine | Déclencher revue produit avec PO |

> 📅 **Date de revue planifiée :** 2 semaines après mise en production (soit semaine S+2 post-MVP), avec PO et équipe IA. Une re-décision implique un nouvel ADR-XXXX qui supersede celui-ci.

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| L'ADR a un numéro unique et un statut explicite (Accepté / Proposé / Remplacé) | ☑ Oui | ADR-0002, statut Accepté. Remplace ADR-0001. |
| Le contexte décrit la situation factuelle avec des chiffres mesurés | ☑ Oui | Latence p50 = 42,3 s, p95 = 51,2 s, basées sur 5 runs via script. |
| Au moins 3 options sont listées, incluant l'option « ne rien faire » | ☑ Oui | 4 options listées (A à D), incluant le statu quo. |
| La décision retenue est annoncée en 1 phrase claire | ☑ Oui | Option C clairement identifiée et nommée (Llama 3.2 3B) |
| La justification s'appuie sur les critères du contexte (latence, qualité, contrainte stack) | ☑ Oui | Justification basée sur compromis qualité (-2%) et latence (-71%). |
| Les mesures de mitigation des inconvénients sont listées | ☑ Oui | 4 mesures : feature flag, parsing JSON strict, audit hebdo, veille technique. |
| Les conséquences positives ET négatives sont chiffrées | ☑ Oui | +71% latence (gain), -2% qualité (perte assumée), -5 GB RAM libérée. |
| Au moins 3 KPIs sont définis avec seuil cible + seuil d'alerte + action | ☑ Oui | 5 KPIs définis avec seuils d'action clairs. |
| Une date de revue de l'ADR est fixée | ☑ Oui | Planifiée à S+2 post-MVP. |
| L'ADR tient en 1 à 2 pages, relisible en moins de 5 minutes | ☑ Oui | Format synthétique respecté. |

---

## 📚 Références et conventions

- Michael Nygard, Documenting Architecture Decisions (2011) : https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- ADR GitHub, Collection de modèles et exemples : https://github.com/joelparkerhenderson/architecture-decision-record
- ThoughtWorks Tech Radar, ADR "Adopt" : https://www.thoughtworks.com/en-us/radar/techniques/lightweight-architecture-decision-records
- APOCAL'IPSSI, Perturbation J2 : https://mohamedelafrit.com/teaching/APOCALIPSSI/pages/perturbations.php

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
