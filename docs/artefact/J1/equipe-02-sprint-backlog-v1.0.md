# Sprint Backlog + Burndown
### Sprint 1 — Authentification utilisateur (US-01 · US-06)

**APOCAL'IPSSI · CADRAGE MATINAL · ARTEFACT 7 SUR 7**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 02 |
| **Membres** | Adja Fatou SAGNA, Ousmane NDIAYE, Houda OUADAH, Danielle Jamila KOAGNE NGANKAM, Wicramachine SERGIO, Krishmini KULAKRISHNA, Mohammed DERKAOUI |
| **Sprint concerné** | Sprint 1 — Lundi PM (14h00 – 18h00) |
| **Version** | v1.0 |
| **Date de remise** | 29/06/2026 16h00 |
| **Statut** | Validé PO |

---

## Objectif du Sprint 1

> **Authentification utilisateur : inscription, connexion et gestion de profil**
>
> Stories engagées : **US-01** (inscription email + mot de passe) · **US-06** (connexion / déconnexion / profil)
>
> Capacité : 28 h-pers · Vélocité cible : 10 SP

---

## Sprint Backlog — Tâches techniques

> 💡 **Objectif** — Décomposer les user stories du sprint en tâches unitaires (max 4h). Une tâche = une action concrète assignable à 1 personne.
>
> 📐 **Format** — ID · Tâche · Story parent · Assigné·e · SP estimé · Statut

| ID | Tâche | Story | Assigné·e | SP | Statut |
|----|-------|-------|-----------|-----|--------|
| T-01 | Initialiser le projet Django (settings, .env, Docker Compose) | US-01 | Wicramachine SERGIO | 1 | Done |
| T-02 | Créer le modèle `User` Django + migration PostgreSQL | US-01 | Mohammed DERKAOUI | 2 | Done |
| T-03 | Implémenter l'endpoint `POST /api/auth/register/` (email + password) | US-01 | Krishmini KULAKRISHNA | 3 | Done |
| T-04 | Envoyer l'email de confirmation à l'inscription (SendGrid / SMTP) | US-01 | Ousmane NDIAYE | 1 | Done |
| T-05 | Implémenter l'endpoint `POST /api/auth/login/` (JWT access + refresh) | US-06 | Houda OUADAH | 1 | Done |
| T-06 | Implémenter `POST /api/auth/logout/` (blacklist refresh token) | US-06 | Adja Fatou SAGNA | 3 | Done |
| T-07 | Créer les pages React : `/signup` et `/login` (formulaires + validation) | US-01 | Danielle J. KOAGNE NGANKAM | 1 | Done |
| T-08 | Créer la page React `/profil` (affichage + modification email/pseudo) | US-06 | Wicramachine SERGIO | 3 | Done |
| T-09 | Écrire les tests pytest (inscription, login, logout, token invalide) | US-01 + US-06 | Mohammed DERKAOUI | 1 | Done |
| **TOTAL** | | | | **16 SP** | |

---

## Burndown Sprint 1

> 📐 **Format** — SP restants à chaque point de contrôle du sprint. Idéal = décroissance linéaire de 16 à 0 sur 4h.

| Heure | SP restants (idéal) | SP restants (réel) |
|-------|---------------------|--------------------|
| 14h00 (début) | 16 | 16 |
| 15h00 | 12 | — |
| 16h00 | 8 | — |
| 17h00 | 4 | — |
| 18h00 (fin) | 0 | — |

> 📊 **Graphique** — Tracer 2 séries : idéal (pointillés gris) et réel (plein bleu). Si réel > idéal → sprint en retard, discuter en stand-up.

---

## Definition of Ready (DoR) — Sprint 1

Une tâche est PRÊTE si :

- [ ] Tâche formulée en action concrète et assignable (verbe + livrable)
- [ ] Tâche estimée en SP (max 3 SP = max ~4h)
- [ ] Dépendances identifiées (T-02 avant T-03, etc.)
- [ ] Story parente identifiée (US-01 ou US-06)

## Definition of Done (DoD) — Sprint 1

Une tâche est DONE si :

- [ ] Code écrit et reviewé (PR approuvée par au moins 1 membre)
- [ ] Tests pytest correspondants passent en CI (GitHub Actions au vert)
- [ ] Pas de TODO/FIXME sans ticket de suivi
- [ ] Démontrable en Sprint Review (endpoint curl ou page web fonctionnelle)

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| L'objectif du sprint est formulé en 1 phrase liée à au moins 1 story (US-XX) | ☑ Oui | US-01 + US-06 explicitement liées |
| Les 9 tâches techniques sont décomposées en actions concrètes (max 4h) | ☑ Oui | 9 tâches, SP de 1 à 3 |
| Chaque tâche est assignée à un membre de l'équipe | ☑ Oui | 7 membres, répartition équilibrée |
| Les SP par tâche sont estimés et cohérents avec la vélocité cible (10 SP utiles) | ☑ Oui | 16 SP brut → ~10 SP livrés réalistes |
| Le burndown est initialisé avec le scope du sprint (16 SP) | ☑ Oui | Ligne idéale 16 → 0 |
| La DoR et la DoD du sprint sont rappelées | ☑ Oui | Sections dédiées |
| Le sprint backlog a été co-construit lors du Sprint Planning (toutes les voix entendues) | ☑ Oui | 7 membres présents |

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
