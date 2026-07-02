# Product Vision Board — EduTutor IA

> **Artefact de cadrage #1** · Semaine APOCAL'IPSSI 2026  
> Rédigé par : Dina  
> Date : 29 juin 2026  
> Méthode : Roman Pichler (5 composants) + Vision Statement Geoffrey Moore

---

## 🌟 Vision Statement

> *Formule Geoffrey Moore — Crossing the Chasm*

**Pour** les étudiant·e·s du supérieur qui peinent à réviser efficacement à partir de leurs cours et documents,  
**EduTutor IA** est une application web pédagogique  
**qui** génère automatiquement des quiz personnalisés (QCM) à partir des propres supports de l'utilisateur (PDF ou texte libre) via une IA locale souveraine.  
**Contrairement à** Quizlet AI, Wilgo ou Khanmigo qui produisent des résumés génériques à partir de contenus tiers,  
**notre produit** ancre chaque question directement dans le document fourni par l'enseignant, garantit une conformité RGPD totale (aucune donnée hors UE) et offre une traçabilité pédagogique vérifiable question par question.

---

## 👥 Target Groups (Groupes cibles)

| Segment | Description | Profil |
|---|---|---|
| **Étudiant·e du supérieur** *(cible primaire)* | 18-28 ans, BTS, Licence, Master. Veut réviser ses propres cours avant les examens. N'a pas le temps de créer ses fiches lui-même. | Utilisateur quotidien de l'application |
| **Enseignant·e** *(cible primaire — suite perturbation J1)* | Ex. Mme Sophie Lefèvre, 42 ans, prof de BTS Communication à Lyon, 28 étudiants. Veut suivre la progression de sa classe, repérer les décrocheurs en 3 clics, envoyer des conseils ciblés. **Repositionnée cible primaire au même niveau que l'étudiant par décision PO (J1).** | Utilisateur superviseur / espace enseignant |
| **Administrateur plateforme** *(interne)* | Équipe EduTutor. Gère la configuration du LLM, les utilisateurs, la modération et les KPIs produit. | Back-office |

---

## 💡 Needs — Besoins par groupe cible

### Étudiant·e (cible primaire)
- « En tant qu'étudiant·e, j'ai besoin de **générer un quiz depuis mon cours en PDF** pour tester mes connaissances sans effort de création. »
- « En tant qu'étudiant·e, j'ai besoin de **voir mes erreurs détaillées après chaque quiz** pour savoir précisément ce que je n'ai pas compris. »
- « En tant qu'étudiant·e, j'ai besoin d'**un historique de mes scores** pour mesurer ma progression dans le temps. »

### Enseignant·e — Mme Lefèvre *(cible primaire — perturbation J1)*
- « En tant qu'enseignant·e, j'ai besoin de **visualiser les scores de mes 28 étudiants** pour identifier ceux qui décrochent avant l'examen. »
- « En tant qu'enseignant·e, j'ai besoin de **repérer les décrocheurs en 3 clics** (tri/alerte sur scores faibles) pour intervenir rapidement. »
- « En tant qu'enseignant·e, j'ai besoin d'**envoyer des conseils ciblés** à un étudiant en difficulté sans quitter l'outil. »

### Administrateur
- « En tant qu'administrateur, j'ai besoin de **configurer le fournisseur LLM** (Ollama local par défaut) pour garantir la souveraineté des données. »
- « En tant qu'administrateur, j'ai besoin de **gérer les comptes utilisateurs** (création, suspension, suppression) pour assurer la qualité du service. »

---

## 📦 Product — Fonctionnalités clés (must-have Release 1)

> Niveau stratégique uniquement — les détails sont dans le Product Backlog.

| # | Fonctionnalité | Valeur |
|---|---|---|
| F1 | **Auth complète par email** : inscription, validation par lien, connexion, reset mot de passe, page profil | Sécurité & confiance |
| F2 | **Saisie de cours** : upload PDF ≤ 5 Mo ou texte ≥ 200 caractères | Ancrage pédagogique |
| F3 | **Génération automatique de 10 QCM** via LLM local (Ollama — Llama 3.1 8B ou Phi-3-mini) | Différenciateur IA souveraine |
| F4 | **Soumission & correction automatique** : 1 bonne réponse par QCM | Apprentissage actif |
| F5 | **Score /10 + détail bonnes/mauvaises réponses** | Feedback immédiat |
| F6 | **Historique persisté des quiz** par utilisateur (date, cours, score) | Suivi de progression |

---

## 📊 Business Goals — Objectifs mesurables (SMART)

| Objectif | Métrique | Horizon |
|---|---|---|
| **Adoption** | 500 étudiant·e·s inscrit·e·s | 6 mois après launch |
| **Engagement** | Taux de rétention ≥ 60 % | À 3 mois |
| **Satisfaction** | Score moyen ≥ 4/5 sur les quiz générés | Continu dès MVP |
| **Souveraineté** | 0 donnée utilisateur hors UE (RGPD) | Dès le 1er jour |
| **Bouche-à-oreille** | NPS (Net Promoter Score) ≥ 40 | À 6 mois |
| **B2B éducation** | 10 établissements partenaires pilotes | 12 mois |

---

## 🆚 Positionnement concurrentiel

| Concurrent | Point fort | Faiblesse vs EduTutor |
|---|---|---|
| Wilgo | Compagnon IA FR pour étudiants | Contenu générique, pas ancré dans le cours de l'étudiant |
| Quizlet AI | Base utilisateurs massive | OpenAI → données hors UE, non RGPD |
| Khanmigo | Tuteur interactif Khan Academy | Cible US, pas de souveraineté des données FR |
| Leo | Ancré programme officiel FR | Pas d'upload de cours personnels |

**Avantage différenciant EduTutor IA :**  
1. Prompts métier enseignant-first (pas étudiant-first)  
2. Ancrage dans le document fourni → pas d'hallucination non traçable  
3. Ollama local → 100 % RGPD, prérequis contractuel B2B éducation FR

---

## 📐 Contraintes techniques imposées

| Contrainte | Valeur |
|---|---|
| Stack back | Django + DRF + PostgreSQL |
| Stack front | React Vite + TypeScript + Tailwind |
| IA par défaut | Ollama local (Llama 3.1 8B ou Phi-3-mini) |
| Déploiement | Docker Compose |
| Données | Aucune sortie hors UE |
| Tout changement LLM | ADR obligatoire (cf. J2) |

---

## 📋 Récapitulatif visuel (une page)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PRODUCT VISION BOARD — EduTutor IA                   │
│                           29 juin 2026                                  │
├──────────────────────────────┬──────────────────────────────────────────┤
│  🌟 VISION STATEMENT         │  👥 TARGET GROUPS                        │
│                              │                                          │
│  Pour les étudiant·e·s du   │  1. Étudiant·e supérieur (primaire)      │
│  supérieur qui peinent à     │     18-28 ans, révision examens          │
│  réviser, EduTutor IA est    │                                          │
│  une app web qui génère des  │  2. Mme Lefèvre (primaire — J1)          │
│  quiz depuis leurs propres   │     42 ans, suivi 28 étudiants           │
│  cours via IA locale RGPD.   │                                          │
│  Contrairement aux MOOC IA,  │  3. Administrateur (interne)             │
│  chaque question est ancrée  │     Config LLM, gestion users            │
│  dans le document source.    │                                          │
├──────────────────────────────┼──────────────────────────────────────────┤
│  💡 NEEDS (Besoins)          │  📦 PRODUCT (Fonctionnalités clés)       │
│                              │                                          │
│  Étudiant :                  │  F1 : Auth email complète                │
│  • Générer quiz depuis PDF   │  F2 : Upload PDF/texte                   │
│  • Voir ses erreurs          │  F3 : Génération 10 QCM via Ollama       │
│  • Suivre sa progression     │  F4 : Correction automatique             │
│                              │  F5 : Score /10 + détail réponses        │
│  Enseignant :                │  F6 : Historique quiz                    │
│  • Dashboard élèves          │                                          │
│  • Repérer décrocheurs       │                                          │
│                              │                                          │
│  Admin :                     │                                          │
│  • Config LLM souverain      │                                          │
│  • Gestion utilisateurs      │                                          │
├──────────────────────────────┴──────────────────────────────────────────┤
│  📊 BUSINESS GOALS                                                      │
│                                                                         │
│  • 500 inscrits à 6 mois   • Rétention ≥ 60 % à 3 mois                │
│  • Satisfaction ≥ 4/5      • 0 donnée hors UE (RGPD)   • NPS ≥ 40     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

*Product Vision Board rédigé selon la méthode Roman Pichler — Vision Statement selon Geoffrey Moore (Crossing the Chasm)*  
*Dépôt : `/docs/cadrage/product-vision-board.md` — Tag : v0.1 — 29/06/2026*
