# Release Planning
### Planning des 7 sprints demi-journée et des 2 releases d'EduTutor IA

**APOCAL'IPSSI · CADRAGE MATINAL · ARTEFACT 5 SUR 7**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 02 |
| **Membres** | Adja Fatou SAGNA, Ousmane NDIAYE, Houda OUADAH, Danielle Jamila KOAGNE NGANKAM, Wicramachine SERGIO, Krishmini KULAKRISHNA, Mohammed DERKAOUI |
| **Sprint concerné** | Cadrage |
| **Version** | v1.0 |
| **Date de remise** | 29/06/2026 16h00 |
| **Statut** | Validé PO |

> 💡 Convention de nommage du fichier : `equipe-02-release-planning-v1.0.xlsx`

---

## RELEASE PLANNING : SEMAINE APOCAL'IPSSI 2026
### 7 sprints × demi-journée + cadrage matinal + soutenance vendredi

> 💡 **Objectif** — Vue d'ensemble de la semaine : objectif et stories engagées par sprint, capacité réaliste, vélocité cible.
>
> 📐 **Format** — 9 lignes (Cadrage + 7 sprints + Soutenance) × 8 colonnes. Tag US-XX en colonne stories pour traçabilité Product Backlog.
>
> ✅ **Bon** — « Sprint 1 : Objectif = setup MVP F1 + F2 · Capacité 28 h-pers · Vélocité 10 SP · Stories US-01, US-02 »
>
> ❌ **À éviter** — « Sprint 1 : faire du progrès » (ni mesurable, ni vérifiable en revue de sprint)

---

| Sprint | Jour | Horaires | Capacité (h-pers) | Vélocité cible (SP) | Objectif sprint | Stories engagées | Release / Jalon |
|--------|------|----------|-------------------|---------------------|-----------------|------------------|-----------------|
| **Cadrage** | Lundi matin | 9h00 – 13h30 | 24,5 | n.c. | Produire les 7 artefacts agiles (Vision, Personas, Customer Journey, Story Map, Release Planning, Product Backlog, Sprint Backlog) | n.c. | 📋 Validation PO 14h00 |
| **Sprint 1** | Lundi PM | 14h00 – 18h00 | 28 | 10 | Authentification utilisateur : inscription, connexion et gestion de profil | US-01 (inscription), US-06 (connexion/profil) | 🟦 Sprint Review 18h |
| **Sprint 2** | Mardi matin | 9h00 – 12h30 | 24,5 | 10 | Upload et génération : gestion des cours et création du premier quiz | US-02 (upload PDF/texte), US-08 (bibliothèque), US-03 (génération quiz) | ⚡ Perturbation J2 à 10h |
| **Sprint 3** | Mardi PM | 14h00 – 18h00 | 28 | 10 | Correction et scoring : évaluation automatique des quiz | US-04 (soumission + correction), US-05 (score /10) | 🟦 Sprint Review 18h |
| **Sprint 4** | Mercredi matin | 9h00 – 12h30 | 24,5 | 8 | Sécurité et paramètres : récupération de compte et timer | US-07 (reset password), US-10 (mode chronométré) | ⚡ Perturbation J3 à 10h |
| **Sprint 5** | Mercredi PM | 14h00 – 18h00 | 28 | 8 | Connexion sociale et suivi : login OAuth + dashboard | US-13 (Google/Apple), US-11 (dashboard progression) | ⚡ J3-bis 14h · 🚀 Release 1 (MVP) 17h45 |
| **Sprint 6** | Jeudi matin | 9h00 – 12h30 | 24,5 | 8 | Personnalisation et conformité : paramètres avancés + RGPD | US-09 (difficulté/nb questions), US-12 (export RGPD), US-17 (suppression compte), US-14 (import URL) | ⚡ Perturbation J4 à 10h |
| **Sprint 7** | Jeudi PM | 14h00 – 17h00 | 21 | 6–8 | Finalisation Release 2 + post-mortem J4 + démo prête | US-16 (identification lacunes), US-15 (questions ouvertes IA) | 🚀 Release 2 17h |
| **Soutenance** | Vendredi | Selon planning | n.c. | n.c. | Pitch (15 min) + démo live MVP + Release 2 + retour réflexif sur les 5 perturbations + Q/R jury | n.c. | 🎤 Soutenance + délibération |
| **TOTAL semaine** | | | **203 h-pers** | **~ 50–60 SP** | Capacité totale = 203 h-pers (équipe de 7 personnes) | | |

---

## 📌 Légende

| Symbole | Signification |
|---|---|
| 🟦 Sprint Review | Démo des stories à la fin du sprint + validation PO |
| ⚡ Perturbation | Événement imprévu déclenché par l'équipe pédagogique, voir page Perturbations du site |
| 🚀 Release | Livraison incrément potentiellement déployable (tag Git + démo enregistrable) |
| 🎤 Soutenance | Pitch + démo + retour réflexif + Q/R jury (vendredi) |

---

## BURNUP GLOBAL : SEMAINE APOCAL'IPSSI 2026
### Trajectoire des story points livrés vs scope total sur les 7 sprints

> 💡 **Burnup vs Burndown** — Le BURNUP trace les SP livrés cumulés (montant), avec une ligne distincte pour le scope total (qui peut bouger). Différent du burndown qui trace seulement le restant.
>
> ✅ **Avantage Burnup** — Visible quand le scope augmente (perturbations qui ajoutent du travail), un simple burndown masquerait ce signal.
>
> 📐 **Lecture** — Idéal : ligne droite progressive. Réel : à reporter après chaque Sprint Review. Si l'écart Réel-Idéal se creuse → alerte.

| Sprint | Fin de sprint | SP livrés (idéal) | SP livrés (réel) | Scope total |
|--------|---------------|-------------------|------------------|-------------|
| Sprint 0 | Lun 13h30 | 0 | — | 56 (scope initial) |
| Sprint 1 | Lun 18h | 8 | — | 56 |
| Sprint 2 | Mar 12h30 | 16 | — | 56 |
| Sprint 3 | Mar 18h | 24 | — | 56 |
| Sprint 4 | Mer 12h30 | 32 | — | 56 |
| Sprint 5 | Mer 18h | 40 | — | 56 + [perturbations cumulées] |
| Sprint 6 | Jeu 12h30 | 48 | — | 56 + [...] |
| Sprint 7 | Jeu 17h | 56 | — | 56 + [...] |

> 📊 **Graphique** — Tracer 3 séries : idéal (pointillés), réel (plein), scope (filled area). À mettre à jour après chaque Sprint Review.

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| Les 7 sprints sont planifiés avec jour, horaires et capacité (h-pers) chiffrée | ☑ Oui | 7 sprints + cadrage + soutenance, capacité de 21 à 28 h-pers |
| L'équipe taille est explicite (7 personnes), pas de capacité "floue" | ☑ Oui | 7 personnes, 203 h-pers total |
| Chaque sprint a un objectif clair, mesurable, livrable en démo | ☑ Oui | Objectifs nommés et liés aux US |
| Chaque sprint liste au moins 1 user story engagée (tag US-XX du Product Backlog) | ☑ Oui | US-XX listés pour chaque sprint |
| La Release 1 (MVP) est explicitement positionnée à la fin du Sprint 5 (mercredi 17h45) | ☑ Oui | Sprint 5 — 🚀 Release 1 (MVP) 17h45 |
| La Release 2 est explicitement positionnée à la fin du Sprint 7 (jeudi 17h) | ☑ Oui | Sprint 7 — 🚀 Release 2 17h |
| Les 5 perturbations sont positionnées sur le planning aux bons créneaux | ☑ Oui | J2 (Mar 10h), J3 (Mer 10h), J3-bis (Mer 14h), J4 (Jeu 10h) + J1 déjà traité |
| La feuille Burnup global est remplie avec un scope initial chiffré (~50-60 SP) | ☑ Oui | Scope initial = 56 SP |
| Le Release Planning a été co-construit en équipe (toutes les voix entendues) | ☑ Oui | 7 membres présents au cadrage |

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
