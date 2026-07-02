# Product Backlog — Repriorisé post-perturbation J4
### Intégration des axes : Scalabilité · Accessibilité RGAA · Internationalisation (i18n)

**APOCAL'IPSSI · PERTURBATION J4 · ARTEFACT BACKLOG**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 02 |
| **Membres** | Adja Fatou SAGNA, Ousmane NDIAYE, Houda OUADAH, Danielle Jamila KOAGNE NGANKAM, Wicramachine SERGIO, Krishmini KULAKRISHNA, Mohammed DERKAOUI |
| **Sprint concerné** | Sprint 6 (J4 Perturbation — Scalabilité) |
| **Version** | v1.0 (Post-perturbation J4) |
| **Date de remise** | 03/07/2026 12h30 |
| **Statut** | Validé PO |

> 💡 Ce document repriorise le Product Backlog initial (v1.0 cadrage) en intégrant les 3 axes de la perturbation J4 : scalabilité horizontale, conformité RGAA 4.1 et internationalisation (FR/EN/ES).

---

## 1. Nouvelles User Stories J4 (ajout de scope)

> ⚡ **Déclenchées par la perturbation J4** — Buzz national : EduTutor IA vise désormais 10 000 MAU et une adoption européenne.

### 1.1. Axe Scalabilité `[scale]`

| ID | User Story | Persona | SP | MoSCoW | Sprint cible |
|----|------------|---------|-----|--------|--------------|
| US-SCALE-01 | En tant que système, je dois traiter les générations de quiz en file d'attente async (Celery + Redis) avec 3 workers minimum, pour éviter le blocage sous charge. | Système | 5 | **MUST** | Sprint 6 ✅ |
| US-SCALE-02 | En tant que système, je dois mettre en cache les quiz statiques (Nginx, TTL 1h) pour réduire la latence sous pic de charge. | Système | 3 | **MUST** | Sprint 6 ✅ |
| US-SCALE-03 | En tant que DevOps, je dois avoir des tests de charge automatisés (k6) dans la pipeline CI/CD pour détecter les régressions de performance. | Équipe | 5 | **SHOULD** | Sprint 7 |
| US-SCALE-04 | En tant que système, je dois disposer d'une architecture horizontalement scalable (Docker Swarm ou Kubernetes) pour absorber des pics à 5 000 users simultanés. | Système | 13 | **SHOULD** | Release 2 |
| US-SCALE-05 | En tant qu'administrateur, je dois avoir un LLM de secours configurable (feature flag `LLM_FALLBACK`) pour basculer en cas de défaillance d'Ollama. | Admin | 5 | **COULD** | Release 2 |

### 1.2. Axe Accessibilité `[a11y]`

| ID | User Story | Persona | SP | MoSCoW | Sprint cible |
|----|------------|---------|-----|--------|--------------|
| US-A11Y-01 | En tant que Lucia (malvoyante, Séville), je dois pouvoir naviguer dans EduTutor IA avec un lecteur d'écran (NVDA/VoiceOver) avec une conformité RGAA 4.1 niveau A. | Lucia | 8 | **MUST** | Sprint 6/7 |
| US-A11Y-02 | En tant que Lucia, je dois avoir une navigation au clavier complète (Tab, Entrée, Espace) sans piège de focus, pour utiliser le site sans souris. | Lucia | 5 | **MUST** | Sprint 7 |
| US-A11Y-03 | En tant que Lucia, je dois avoir des contrastes de couleurs conformes WCAG AA (≥ 4,5:1) sur tous les textes, pour lire confortablement. | Lucia | 3 | **MUST** | Sprint 6 ✅ |
| US-A11Y-04 | En tant qu'administrateur, je dois pouvoir générer une déclaration d'accessibilité RGAA 4.1 publiable sur le site. | Admin | 3 | **SHOULD** | Release 2 |

### 1.3. Axe Internationalisation `[i18n]`

| ID | User Story | Persona | SP | MoSCoW | Sprint cible |
|----|------------|---------|-----|--------|--------------|
| US-I18N-01 | En tant que Lucia (Séville), je dois pouvoir utiliser EduTutor IA en espagnol (interface + messages d'erreur), via un sélecteur de langue persisté dans mon profil. | Lucia | 8 | **MUST** | Sprint 7 |
| US-I18N-02 | En tant que Lucia, je dois recevoir les questions de quiz dans ma langue (LLM prompt multilingue), pour réviser efficacement. | Lucia | 5 | **SHOULD** | Sprint 7 |
| US-I18N-03 | En tant que Léa (Paris), je dois avoir la langue mémorisée entre mes sessions (localStorage + back-end profil), pour ne pas reconfigurer à chaque connexion. | Léa | 2 | **SHOULD** | Sprint 7 |

---

## 2. Product Backlog complet — Version repriorisée post-J4

### Légende

| Symbole | Signification |
|---|---|
| ✅ Done | Story livrée et validée en Sprint Review |
| 🔄 In Progress | Story en cours dans le sprint actuel |
| 📋 Ready | Story prête pour le prochain sprint (DoR validée) |
| ⏸ Deferred | Story reportée post-Release 2 |
| ❌ Dropped | Story retirée définitivement du scope |

---

### Epic 1 : Authentification & Profil utilisateur

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-01 | En tant qu'étudiant, je veux m'inscrire avec email + mot de passe pour accéder à la plateforme. | 3 | MUST | ✅ Done | Sprint 1 |
| US-06 | En tant qu'étudiant, je veux me connecter/déconnecter et accéder à mon profil (pseudo, email). | 3 | MUST | ✅ Done | Sprint 1 |
| US-07 | En tant qu'étudiant, je veux réinitialiser mon mot de passe par email en cas d'oubli. | 2 | SHOULD | ✅ Done | Sprint 4 |
| US-13 | En tant qu'étudiant, je veux me connecter via Google ou Apple OAuth pour un accès simplifié. | 5 | COULD | ✅ Done | Sprint 5 |
| US-12 | En tant qu'étudiant RGPD, je veux exporter toutes mes données personnelles (Art. 15 RGPD). | 5 | MUST | ✅ Done | Sprint 6 |
| US-17 | En tant qu'étudiant RGPD, je veux supprimer mon compte et toutes mes données (Art. 17 RGPD). | 3 | MUST | ✅ Done | Sprint 6 |

### Epic 2 : Génération de quiz

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-02 | En tant qu'étudiant, je veux uploader un PDF (≤ 5 Mo) ou saisir un texte (≥ 200 chars) comme base de cours. | 5 | MUST | ✅ Done | Sprint 2 |
| US-03 | En tant qu'étudiant, je veux générer automatiquement un quiz de 10 QCM à partir de mon cours via le LLM. | 8 | MUST | ✅ Done | Sprint 2 |
| US-04 | En tant qu'étudiant, je veux soumettre mes réponses et obtenir une correction automatique. | 5 | MUST | ✅ Done | Sprint 3 |
| US-05 | En tant qu'étudiant, je veux voir mon score /10 avec le détail des bonnes/mauvaises réponses. | 3 | MUST | ✅ Done | Sprint 3 |
| US-08 | En tant qu'étudiant, je veux accéder à une bibliothèque de mes cours uploadés pour les réutiliser. | 5 | SHOULD | ⏸ Deferred | Release 3 |
| US-14 | En tant qu'étudiant, je veux importer un cours depuis une URL (lien Notion, Wikipedia). | 5 | COULD | ⏸ Deferred | Release 3 |
| US-15 | En tant qu'étudiant avancé, je veux générer des questions ouvertes (réponse libre) en plus des QCM. | 8 | SHOULD | 📋 Ready | Sprint 7 |

### Epic 3 : Historique & Progression

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-11 | En tant qu'étudiant, je veux accéder à un dashboard de progression (scores par cours, courbe temporelle). | 5 | SHOULD | ✅ Done | Sprint 5 |
| US-16 | En tant qu'étudiant, je veux que le système identifie mes lacunes par thème et me propose des révisions ciblées. | 8 | SHOULD | 📋 Ready | Sprint 7 |
| US-09 | En tant qu'étudiant, je veux choisir la difficulté et le nombre de questions du quiz. | 3 | COULD | ⏸ Deferred | Release 3 |
| US-10 | En tant qu'étudiant, je veux un mode chronométré (timer par question). | 3 | WONT | ❌ Dropped | — |

### Epic 4 : Fonctionnalités Enseignant (post-J1)

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-NEW-02 | En tant que Mme Lefèvre (enseignante), je veux exporter un quiz en PDF/Word pour distribution en classe. | 3 | SHOULD | 🔄 In Progress | Sprint 6 |
| US-NEW-01 | En tant que Mme Lefèvre, je veux gérer plusieurs classes et assigner des quiz par groupe. | 5 | SHOULD | 📋 Ready | Sprint 7 |
| US-NEW-04 | En tant que Mme Lefèvre, je veux générer automatiquement une grille de correction (barème) associée au quiz. | 8 | COULD | ⏸ Deferred | Release 3 |
| US-NEW-03 | En tant que M. Chen (directeur), je veux un dashboard de classe avec scores moyens et taux de complétion. | 13 | COULD | ⏸ Deferred | Release 3 |

### Epic 5 : Scalabilité `[scale]` (post-J4)

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-SCALE-01 | Workers Celery async (3 workers) pour file d'attente quiz. | 5 | MUST | ✅ Done | Sprint 6 |
| US-SCALE-02 | Cache Nginx des quiz statiques (TTL 1h). | 3 | MUST | ✅ Done | Sprint 6 |
| US-SCALE-03 | Tests de charge k6 en CI/CD (seuil 15 s p50 sous 500 users). | 5 | SHOULD | 📋 Ready | Sprint 7 |
| US-SCALE-04 | Architecture horizontale (Docker Swarm / K8s) pour 5 000 users simultanés. | 13 | SHOULD | ⏸ Deferred | Release 2 |
| US-SCALE-05 | LLM fallback provider (feature flag `LLM_FALLBACK`). | 5 | COULD | ⏸ Deferred | Release 2 |

### Epic 6 : Accessibilité RGAA 4.1 `[a11y]` (post-J4)

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-A11Y-03 | Contrastes WCAG AA (≥ 4,5:1) sur tous les textes. | 3 | MUST | ✅ Done | Sprint 6 |
| US-A11Y-01 | Navigation lecteur d'écran NVDA/VoiceOver, RGAA 4.1 niveau A. | 8 | MUST | 📋 Ready | Sprint 7 |
| US-A11Y-02 | Navigation clavier complète (Tab, Entrée, Espace), sans piège de focus. | 5 | MUST | 📋 Ready | Sprint 7 |
| US-A11Y-04 | Déclaration d'accessibilité publiable. | 3 | SHOULD | ⏸ Deferred | Release 2 |

### Epic 7 : Internationalisation `[i18n]` (post-J4)

| ID | User Story | SP | MoSCoW | Statut | Sprint |
|----|------------|-----|--------|--------|--------|
| US-I18N-01 | Interface multilingue FR/EN/ES avec `react-intl` et sélecteur de langue. | 8 | MUST | 📋 Ready | Sprint 7 |
| US-I18N-02 | Quiz générés dans la langue sélectionnée (LLM prompt multilingue). | 5 | SHOULD | 📋 Ready | Sprint 7 |
| US-I18N-03 | Langue mémorisée en profil (localStorage + back-end). | 2 | SHOULD | 📋 Ready | Sprint 7 |

---

## 3. Récapitulatif MoSCoW post-J4

| Niveau | Stories | SP total |
|--------|---------|---------|
| **MUST** | US-SCALE-01/02 ✅, US-A11Y-01/02/03 (03 ✅), US-I18N-01 | 32 SP (12 done) |
| **SHOULD** | US-SCALE-03/04, US-NEW-01/02, US-15, US-16, US-I18N-02/03, US-A11Y-04 | 49 SP |
| **COULD** | US-SCALE-05, US-NEW-04, US-09, US-08, US-14 | 29 SP |
| **WONT** | US-10 | 3 SP |

**Scope total post-J4 :** 56 SP (initial) + 29 SP (J1) + 37 SP (J4) = **122 SP identifiés**
**Livrés à fin Sprint 6 :** ~48 SP estimés (sprints 1-6 complétés)
**Scope Release 2 (Sprint 7) :** 6-8 SP ciblés

---

## 4. Persona élargie J4 — Lucia (internationale + malvoyante)

> **CA-J4-2** — Persona internationale et en situation de handicap, exigée par le site J4.

| Champ | Valeur |
|---|---|
| **Prénom** | Lucia Fernández |
| **Âge** | 17 ans |
| **Localisation** | Séville, Espagne |
| **Handicap** | Malvoyante (acuité visuelle 10% œil gauche, 20% œil droit) |
| **Équipement** | Lecteur d'écran NVDA (Windows) + zoom ×2 systématique |
| **Contexte** | Lycéenne en terminale scientifique, prépare la sélectividad (bac espagnol) |
| **Pain point** | 90% des edtech sont inaccessibles aux lecteurs d'écran · Interface uniquement en français |
| **Besoin clé** | Navigation 100% clavier · Quiz en espagnol · Contrastes élevés · Audio feedback |
| **Quote** | *"Je veux réviser comme tout le monde, pas adapter mes outils à chaque site."* |

---

## ✅ Grille d'auto-évaluation

| Critère (CA-J4) | Auto-évaluation | Preuve |
|---|---|---|
| CA-J4-1 : Story map & Vision board intégrant les 3 axes | ⬜ Partiel | Backlog intègre les 3 axes ; Story map J4 à créer |
| CA-J4-2 : Persona élargie (international + handicap) | ☑ Oui | Lucia, 17 ans, Séville, malvoyante — section 4 |
| CA-J4-3 : ≥ 5 risques analysés (matrice P×I) | ☑ Oui | Voir `equipe-02-analyse-risques-j4-v1.0.md` |
| CA-J4-4 : Risques prioritaires + actions préventives estimées | ☑ Oui | Voir `equipe-02-analyse-risques-j4-v1.0.md` |
| CA-J4-5 : Product backlog repriorisé MoSCoW + release planning | ☑ Oui | Ce document — section 2 + récap MoSCoW section 3 |
| CA-J4-6 : Sprints précédents conservés + next sprint backlog | ☑ Oui | Section 2 (tous sprints) + `equipe-02-sprint-backlog-sprint7-v1.0.md` |
| CA-J4-7 : Burndown & burnup à jour | ☑ Oui | Voir `equipe-02-sprint-backlog-sprint7-v1.0.md` section Burnup |

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
