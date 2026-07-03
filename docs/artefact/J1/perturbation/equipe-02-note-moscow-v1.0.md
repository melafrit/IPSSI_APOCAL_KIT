# Note de décision MoSCoW
### Justifier par écrit une priorisation suite à un changement de scope

**APOCAL'IPSSI · TEMPLATE PERTURBATION · J1 (PRODUIT)**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 2 |
| **Membres** | Danielle Jamila KOAGNE NGANKAM, Krishmini KULAKRISHNA, Wicramachine SERGIO, Houda OUADAH, Adja Fatou SAGNA, Mohammed DERKAOUI, Ousmane NDIAYE |
| **Sprint concerné** | J1 (Perturbation Produit) |
| **Version** | v2.0 |
| **Date de remise** | 29/06/2026 17h00 |
| **Statut** | Validé PO |

> 💡 Convention de nommage du fichier : `Equipe-02-Note de Décision Moscow-v2.docx`

---

## PRÉAMBULE

### Pourquoi cet artefact ?

Une note de décision MoSCoW formalise un arbitrage de priorisation. Sans note écrite, l'arbitrage devient un vœu pieux que personne ne respecte. Cette note est exigée chaque fois qu'une perturbation modifie le scope (perturbation J1 produit, J4 crise utilisateur) ou qu'une décision majeure doit être justifiée devant le Product Owner.

Ce modèle est pré-rempli avec un cas d'usage : la perturbation J1, qui voit l'arrivée de Mme Sophie Lefèvre (persona enseignante) avec des besoins métier spécifiques qui modifient le scope initialement prévu.

> 💡 **Mode d'emploi** — La note MoSCoW se rédige À CHAUD, dès qu'une décision est prise, pas en fin de sprint « pour le dossier ». Elle se relit avec le PO en moins de 5 minutes. Si elle est plus longue, c'est qu'elle dérive en compte-rendu.

---

## 1. Contexte de la décision

### 1.1. Perturbation concernée

- **Perturbation :** J1 — Mme Lefèvre arrive dans le tableau (lundi 14h00, page Perturbations J1)
- **Date d'émission de la note :** 29/06/2026 17h00
- **Rédacteur·trice :** Krishmini KULAKRISHNA

### 1.2. Situation factuelle (résumé)

Mme Sophie Lefèvre (42 ans, professeure de Communication en BTS, lycée privé sous contrat à Lyon) est intervenue en revue produit lundi 14h00. Elle expose 4 besoins métier qui n'étaient pas au backlog initial parce que la cible primaire (étudiant·e) n'avait pas révélé ces problèmes :

- Compte enseignant avec gestion multi-classes (28 étudiants / classe en BTS Communication)
- Export Word/PDF des quiz générés (impression en salle des profs)
- Dashboard de classe pour suivre qui a répondu (engagement / lacunes communes)
- Génération automatique d'un barème + grille d'évaluation par quiz

**Total estimé : ~29 SP.** Capacité restante de la semaine après cadrage : ~50 SP déjà engagés sur le backlog initial. Sans arbitrage, le sprint dérape.

---

## 2. Tableau MoSCoW étendu (scoring effort × impact)

> 💡 **Objectif** — Trancher chacune des stories candidates en MUST / SHOULD / COULD / WON'T, avec un score chiffré qui rend la décision défendable en revue.
>
> 📐 **Format** — 6 colonnes : Story · Niveau · Effort (SP) · Impact (1-5) · Score = Impact/Effort × 10 · Justification

| Story candidate | Niveau | Effort (SP) | Impact (1-5) | Score | Justification |
|---|---|---|---|---|---|
| **US-NEW-01** : Compte enseignant + multi-classes | SHOULD | 5 | 4 | 8,0 | Cible B2B clé, faisable en Sprint 6 si retrait COULD prévu. |
| **US-NEW-02** : Export Word/PDF des quiz | SHOULD | 3 | 5 | 16,7 | Bloquant pour adoption B2B (Mme Lefèvre l'a clairement exprimé). Faisable Sprint 6. |
| **US-NEW-03** : Dashboard de classe (qui a répondu) | COULD | 8 | 3 | 3,8 | Apport intéressant mais lourd. Reportable Release 3+, non-critique pour décision B2B. |
| **US-NEW-04** : Génération automatique de barème | SHOULD | 13 | 2 | 1,5 | Fonction importante pour les enseignants. Intégrée pour répondre aux besoins de Mme Lefèvre. |

> 📊 **Formule du score :** (Impact × 10) / Effort. Un score > 10 = story très rentable (haute priorité). Un score < 3 = story coûteuse pour peu d'impact (à différer).

---

## 3. Contrepartie obligatoire (ce qui sort du sprint)

> **Principe non négociable :** vélocité fixée à ~56 SP sur la semaine, capacité 7 personnes × 7 sprints. Toute story qui entre doit être compensée par une story équivalente qui sort. Sans cette discipline, le sprint dérape, les développeurs s'épuisent, la qualité chute.

### 3.1. Stories ajoutées / Stories reportées

| Story ajoutée | + SP | Story reportée (contrepartie) | - SP |
|---|---|---|---|
| US-NEW-01 : Compte enseignant + multi-classes | +5 | US-09 : Choix niveau difficulté + nb questions | -5 |
| US-NEW-02 : Export Word/PDF des quiz | +3 | US-08 : Bibliothèque multi-cours (report S7) | -5 |
| US-NEW-04 : Génération automatique de barème | +13 | US-10 : Mode chronométré + US-14 : Import URL + US-15 : Questions ouvertes | -13 |

**Bilan net : +21 SP ajoutés / -23 SP reportés = -2 SP de marge supplémentaire pour absorber les autres perturbations.**

---

## 4. Impact sur les Releases

### 4.1. Release 1 (MVP mercredi 17h45)

**Statut : INCHANGÉE.** Les 6 features F1-F6 imposées restent garanties. Le scope MVP est sacré.

### 4.2. Release 2 (jeudi 17h45)

**Statut : MODIFIÉE.** Stories ajoutées : US-NEW-01 + US-NEW-02 + US-NEW-04 (21 SP). Stories reportées : US-09 + US-08 (10 SP).

Détail du nouveau scope R2 :

- US-07 : Reset password (déjà prévu)
- US-NEW-02 : Export Word/PDF (nouveau, MUST adoption B2B)
- US-11 : Dashboard progression chapitre (déjà prévu)
- US-NEW-01 : Compte enseignant + multi-classes (nouveau)
- US-12 : Export RGPD (déjà prévu, lié J3-bis)
- US-NEW-04 : Génération automatique barème (Should)

### 4.3. Stories décalées au backlog post-soutenance

- **US-08** : Bibliothèque multi-cours (reportée car remplacée par US-NEW-01 plus prioritaire)
- **US-09** : Choix niveau difficulté + nb questions (reportée car remplacée par US-NEW-02)
- **US-NEW-03** : Dashboard de classe (Could, reportable Release 3)

---

## 5. Validation Product Owner

| Champ | Valeur |
|---|---|
| **Product Owner** | [ Prénom NOM, rôle ] |
| **Date / heure validation** | 29/06/2026 17h00 |
| **Canal de validation** | Réunion orale · Message Teams |
| **Trace / preuve** | Capture Teams jointe · Email cité · Procès-verbal de réunion |
| **Statut** | Validé |

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| La perturbation déclenchante est explicitement nommée (J1, J3, J3-bis, J4) | ☑ Oui | J1 — Mme Lefèvre arrive dans le tableau |
| La situation factuelle est décrite sans interprétation ni émotion | ☑ Oui | Faits chiffrés : 4 besoins, ~29 SP |
| Au moins 3 stories candidates sont listées avec un niveau MoSCoW assigné | ☑ Oui | 4 stories candidates listées |
| Chaque story candidate a un score Impact/Effort chiffré (formule explicite) | ☑ Oui | Scores 1,5 à 16,7 |
| La contrepartie obligatoire est documentée pour CHAQUE story ajoutée | ☑ Oui | 3 contreparties documentées |
| Le bilan net SP (ajout - retrait) est calculé et raisonnable | ☑ Oui | -2 SP de marge |
| L'impact sur Release 1 et Release 2 est explicité section par section | ☑ Oui | R1 inchangée, R2 modifiée |
| Les stories décalées sont listées pour traçabilité backlog futur | ☑ Oui | US-08, US-09, US-NEW-03 |
| La validation PO est tracée (date, canal, preuve) | ☐ Partiel | Canal et date tracés, capture à joindre |
| La note tient en 1 à 2 pages (relisible en moins de 5 minutes) | ☑ Oui | Format synthétique respecté |

---

## 📚 Références et conventions

- Cours Agile/Scrum (Mohamed EL AFRIT) : mohamedelafrit.com/teaching/Master_Classe_Agile/cours.html
- Méthode MoSCoW, DSDM Consortium : https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html
- Roman Pichler, Effort vs Value Prioritization : https://www.romanpichler.com/blog/agile-product-roadmaps/
- APOCAL'IPSSI, Perturbation J1 : https://mohamedelafrit.com/teaching/APOCALIPSSI/pages/perturbations.php

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
