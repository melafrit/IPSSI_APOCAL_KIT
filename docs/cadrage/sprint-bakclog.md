# Sprint Backlog

## Sprint 1

### Informations générales

* **Sprint :** Sprint 1
* **Date :** Lundi 29 juin 2026
* **Équipe :** Équipe 22
* **Scrum Master :** Baptiste MAES
* **Product Owner :** Tom Lau
* **Capacité :** 28 h-personnes
* **Vélocité cible :** 8 à 10 Story Points

---

## Objectif du Sprint

Ce premier sprint a pour objectif de mettre en œuvre les deux premières fonctionnalités du MVP d'EduTutor IA :

* **F1 :** création d'un compte utilisateur.
* **F2 :** dépôt d'un support de cours au format PDF ou texte.

À l'issue du sprint, un étudiant doit pouvoir créer son compte, importer son cours et préparer la génération de quiz personnalisés qui sera développée lors du sprint suivant.

---

## User Stories sélectionnées

### US-01 — Création d'un compte

> En tant qu'étudiant, je souhaite créer un compte afin de sauvegarder mes quiz et retrouver mon historique.

| ID     | Tâche technique                                                   | Responsable      | Estimation |
| ------ | ----------------------------------------------------------------- | ---------------- | ---------- |
| T-01.1 | Création du modèle `User` Django et migration                     | Baptiste MAES    | 1 h        |
| T-01.2 | Développement de l'API `POST /signup` avec validation des données | Antoine Vauthier | 2 h        |
| T-01.3 | Développement de la page React d'inscription                      | Kyllian Vignocan | 3 h        |
| T-01.4 | Tests unitaires Backend et Frontend                               | Tom Lau          | 1 h        |

### US-02 — Dépôt d'un cours

> En tant qu'étudiant, je souhaite déposer un cours au format PDF ou texte afin de générer un quiz personnalisé.

| ID     | Tâche technique                                            | Responsable        | Estimation |
| ------ | ---------------------------------------------------------- | ------------------ | ---------- |
| T-02.1 | Création du modèle `Course` et relation avec l'utilisateur | Alainpatrick Gomas | 1 h        |
| T-02.2 | Développement de l'API d'upload PDF et extraction du texte | Baptiste MAES      | 3 h        |
| T-02.3 | Développement de la saisie de texte et validation          | Cleg Loufoua       | 1 h        |
| T-02.4 | Développement de l'interface React d'import de cours       | Yacine Djebbouri   | 3 h        |
| T-02.5 | Tests fonctionnels et mise à jour de la documentation      | Antoine Vauthier   | 1 h        |

---

## Charge de travail

| Élément              | Valeur |
| -------------------- | ------ |
| Charge estimée       | 16 h   |
| Capacité de l'équipe | 28 h   |
| Marge disponible     | 12 h   |

La marge restante permettra de couvrir les activités de configuration, les revues de code, le pair programming ainsi que la résolution d'éventuels problèmes techniques.

---

## Répartition de l'équipe

| Membre             | Charge |
| ------------------ | ------ |
| Baptiste MAES      | 4 h    |
| Antoine Vauthier   | 3 h    |
| Kyllian Vignocan   | 3 h    |
| Tom Lau            | 1 h    |
| Alainpatrick Gomas | 1 h    |
| Cleg Loufoua       | 1 h    |
| Yacine Djebbouri   | 3 h    |

---

## État initial du Sprint

Au démarrage du Sprint 1, toutes les tâches sont placées dans la colonne **Todo**.

* Todo
* In Progress
* Blocked
* Done

---

## Burndown prévisionnel

| Heure | Idéal | Réel |
| ----- | ----: | ---: |
| 14h00 |  16 h | 16 h |
| 15h00 |  12 h | 13 h |
| 16h00 |   8 h |  8 h |
| 17h00 |   4 h |  3 h |
| 18h00 |   0 h |  0 h |

---

## Sprint Review

La démonstration de fin de sprint devra permettre de valider :

* la création d'un compte utilisateur ;
* le dépôt d'un support de cours au format PDF ou texte ;
* le stockage des données en base ;
* le bon fonctionnement de l'interface utilisateur ;
* la disponibilité d'une base fonctionnelle pour le développement de la génération de quiz au Sprint 2.

---

## Definition of Done

Une tâche est considérée comme terminée lorsqu'elle :

* est développée ;
* passe les tests unitaires et fonctionnels ;
* respecte les conventions de codage du projet ;
* a été relue par au moins un membre de l'équipe ;
* est validée via Pull Request puis fusionnée dans la branche principale.

---

## Risques identifiés

* Difficultés d'intégration entre le frontend React et le backend Django.
* Temps de traitement des fichiers PDF pouvant impacter les performances.
* Disponibilité variable des membres de l'équipe pendant le sprint.
* Risques liés à la configuration de l'environnement de développement.
* Évolution éventuelle des exigences fonctionnelles lors des perturbations prévues pendant la semaine APOCALIPSSI.
