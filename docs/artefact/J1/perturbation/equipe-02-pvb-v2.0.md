# Product Vision Board
### La direction du produit EduTutor IA en 6 sections

**APOCAL'IPSSI · CADRAGE · ARTEFACT 1 SUR 7**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

| Champ | Valeur |
|---|---|
| **Équipe n°** | 2 |
| **Membres** | Danielle Jamila KOAGNE NGANKAM, Krishmini KULAKRISHNA, Wicramachine SERGIO, Houda OUADAH, Adja Fatou SAGNA, Mohammed DERKAOUI, Ousmane NDIAYE |
| **Sprint concerné** | Cadrage (J1) |
| **Version** | v2.0 (Post-perturbation J1) |
| **Date de remise** | 29/06/2026 17h30 |
| **Statut** | En itération |

> 💡 Convention de nommage du fichier : `Equipe-02-PVB-v2.0-Post-pertubation J1.docx`

---

## PRÉAMBULE

### Pourquoi cet artefact ?

Le Product Vision Board, formalisé par Roman Pichler, condense en une seule page la direction stratégique du produit. Il répond à cinq questions : quelle est l'ambition long terme (Vision) ? pour qui (Target Group) ? pour quels besoins (Needs) ? avec quel produit (Product) ? et comment saurons-nous que c'est un succès (Business Goals) ?

Pour le projet EduTutor IA, vous compléterez les amorces fournies par les indications spécifiques à votre équipe. Une section supplémentaire, « Différenciateurs vs concurrents », vous prépare directement à la soutenance.

> 💡 **Mode d'emploi** — Travaillez en binôme minimum. La Vision Board n'est jamais validée à 18h00 le jour 1, elle évolue au fil de la semaine. Recommitez à chaque révision majeure (perturbation J1, J3, J4) avec un nouveau numéro de version.

---

## 1. Vision

### 1.1. Vision EduTutor IA : version équipe

> Permettre à chaque étudiante du supérieur de transformer n'importe quel cours en quiz de révision personnalisé en moins de 5 minutes, et offrir aux enseignant·e·s un gain de 10h/mois de préparation de supports d'évaluation avec suivi de classe, le tout sans qu'aucune donnée pédagogique ne quitte le territoire européen.

---

## 2. Target Group (cibles utilisateurs)

### 2.1. Cible primaire, Étudiant·e du supérieur

| Champ | Valeur |
|---|---|
| **Profil** | Léa Martin, 20 ans, L2 droit Paris II. Smartphone Android personnel (Samsung A53). Révise 8h/semaine, dont 3h perdues à chercher des fiches. |
| **Volume FR** | ~2,7M d'étudiants dans le supérieur (Chiffres MESR 2024) |
| **Pain point** | 5h à 15h/semaine à chercher des supports |
| **Critère clé** | Gratuit / freemium + confidentialité des cours déposés + rapidité (< 5 min par quiz) |

### 2.2. Cible secondaire, Enseignant·e (persona émergente J1 : Mme Lefèvre)

> Mme Sophie Lefèvre, 42 ans, enseignante en BTS Communication à Lyon, représente la cible B2B la plus crédible.

| Champ | Valeur |
|---|---|
| **Profil** | Mme Sophie Lefèvre, 42 ans. Enseignante |
| **Volume FR** | ~770 000 enseignants tous niveaux (Éducation nationale 2024) |
| **Pain point** | ~12h/mois en correction et préparation de supports d'évaluation variés |
| **Critère clé** | Interface ultrasimple + conformité RGPD contractuelle + export Word/PDF des quiz + suivi de classe |

### 2.3. Cible tertiaire, Établissement scolaire (acheteur B2B)

| Champ | Valeur |
|---|---|
| **Profil** | M. David Chen, 51 ans, directeur des études d'un lycée privé à Lyon. Décide pour 1 200 élèves |
| **Volume FR** | ~7 500 lycées + ~3 500 établissements supérieurs |
| **Pain point** | Budget edtech contraint (~12 000 €/an, soit 10€/élève) + obligation RGPD non négociable |
| **Critère clé** | Hébergement UE souverain + facturation prévisible + appel d'offres < 6 mois |

---

## 3. Needs (besoins résolus)

### 3.1. Besoins de la cible primaire (Étudiant)

- Générer en moins de 5 min un quiz de révision sur n'importe quel chapitre d'un cours fourni
- Identifier ses lacunes par chapitre avant un examen (sans correcteur humain)
- Réviser hors-ligne (transports, lieu sans wifi)
- Retrouver et rejouer ses anciens quiz via un historique persisté
- Obtenir un retour immédiat sur ses erreurs avec explications pédagogiques

### 3.2. Besoins de la cible secondaire (Enseignant·e - Mme Lefèvre)

**Besoins émergents J1 :**

- Préparer des supports d'évaluation variés (quiz, QCM, questions ouvertes) en gain de temps mesurable
- Adapter automatiquement le niveau de difficulté au niveau de la classe
- Suivre l'engagement de la classe (qui a répondu, score moyen, lacunes communes)
- Exporter le quiz en format imprimable (PDF/Word) pour distribution en classe
- Réduire de 50% son temps de création d'évaluations mensuelles
- Générer automatiquement une grille de correction analytique (barème) en moins de 3 minutes

### 3.3. Besoins de la cible tertiaire (Établissement)

- Disposer d'un outil edtech RGPD conforme, sans transfert de données hors UE
- Tarification prévisible par élève / par an, sans surprise
- Adhésion d'au moins 30% des profs dès la première année
- Déployer la solution sur 2 classes pilotes dès le premier mois

---

## 4. Product (le produit en 3-5 traits)

### 4.1. Caractéristiques signature d'EduTutor IA

- Génération de 10 QCM en moins de 60 s à partir d'un cours fourni (PDF ou texte)
- Fonctionnement 100% local via Ollama (Llama 3.2 3B), souveraineté des données
- Interface mobile-first et hors-ligne friendly
- Questions pédagogiques traçables à leur source (préparation RAG en Release 2)
- Mode enseignant : suivi de classe + export PDF/Word des quiz + corrigés

### 4.2. MVP must-have (Release 1) : rappel imposé

| Feature | Description |
|---|---|
| **F1** | Inscription et connexion utilisateur (Django Auth standard) |
| **F2** | Saisie d'un cours : upload PDF ≤ 5 Mo ou texte ≥ 200 caractères |
| **F3** | Génération automatique d'un quiz de 10 QCM via LLM local |
| **F4** | Soumission et correction automatique (une bonne réponse par QCM) |
| **F5** | Affichage du score /10 + détail bonnes/mauvaises réponses |
| **F6** | Historique persisté des quizz par utilisateur (date, cours, score) |

### 4.3. Pistes Release 2 envisagées

> Mise à jour v2.0 : Les candidates suivantes intègrent les besoins de Mme Lefèvre

| Piste R2 | Justification |
|---|---|
| **Export PDF/Word du quiz + corrigé** | Répond directement au besoin de Mme Lefèvre (distribution en classe) et valorise l'angle enseignant-first. |
| **Tableau de bord enseignant (suivi de classe)** | Permet à Mme Lefèvre de voir qui a répondu, scores moyens, étudiants en difficulté. Essentiel pour adoption B2B. |
| **RAG (Retrieval-Augmented Generation) avec traçabilité source** | Renforce le différenciateur "pédagogie ancrée" et prépare la conformité J3-bis. |

---

## 5. Business Goals (objectifs de succès)

### 5.1. Objectifs d'adoption

- Adoption : atteindre 1 000 étudiants actifs hebdomadaires (WAU) d'ici T+6 mois
- Rétention : ≥ 40% des utilisateurs reviennent dans la semaine après inscription
- Usage : 500 quiz générés/jour d'ici T+4 mois
- **Adoption enseignant : 50 enseignants actifs hebdomadaires d'ici T+6 mois** *(nouveau KPI post-J1)*

### 5.2. Objectifs de satisfaction

- Satisfaction : NPS > 30 d'ici T+9 mois (cible standard edtech)
- Qualité contenu : < 5% de quiz signalés "erreur factuelle" par les utilisateurs
- Performance : temps moyen de génération d'un quiz < 60 secondes (P95)
- **Satisfaction enseignant : 80% des enseignants testeurs recommandent l'outil à un collègue** *(nouveau KPI post-J1)*

### 5.3. Objectifs business (long terme)

- Conversion B2B : au moins 10 établissements scolaires sous contrat dans 12 mois
- Coût acquisition : CAC < 8€ par utilisateur converti
- Modèle économique : freemium étudiant (3 quiz/jour gratuit) + licence B2B établissement (10€/élève/an)

---

## 6. Différenciateurs vs concurrents

### 6.1. Cartographie des concurrents

| Concurrent | Positionnement | Limite identifiée |
|---|---|---|
| **Wilgo.ai** | Compagnon IA français pour étudiants | Cloud, dépendance OpenAI, données hors UE |
| **Leo (iamleo.ai)** | Tuteur IA Bac/sup ancré sur programmes français | Cible étudiants uniquement, pas d'angle enseignant |
| **Quizlet AI** | Cartes mémoire et quiz IA, pionnier US | Pas d'ancrage cours fourni, focus marché US |
| **Khanmigo** | Tuteur IA Khan Academy, lancé 2023 | US-first, conformité RGPD UE floue |

### 6.2. Nos 3 différenciateurs argumentés

1. **Prompts métier enseignants** : Les concurrents sont « étudiant-first ». EduTutor inverse la tendance et se veut « enseignant-first » en produisant des supports d'évaluation prêts à distribuer, ouvrant la porte au B2B établissement.
2. **Pédagogie ancrée (RAG sur cours fourni)** : Les LLM bruts hallucinent. EduTutor s'engage à ancrer ses générations dans le manuel fourni, garantissant la fiabilité.
3. **RGPD, local-first** : Contrairement aux concurrents qui utilisent le cloud (OpenAI / Anthropic), EduTutor tourne en local. Aucune donnée ne sort du serveur, un prérequis non négociable pour l'Éducation Nationale.

---

## ✅ Grille d'auto-évaluation

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| La Vision tient en 1 phrase mémorable et survit aux Releases | ☑ Oui | Validée. Intègre le double bénéfice : étudiant (< 5 min) et enseignant (gain de 10h/mois). |
| Les 3 niveaux de cibles sont décrits avec profil + volume + pain point | ☑ Oui | Cible secondaire mise à jour avec Mme Lefèvre (770k profs, 12h/mois correction). |
| Au moins 3 besoins par cible sont formulés en verbes d'action mesurables | ☑ Oui | 5 besoins étudiant, 6 besoins enseignant, 4 besoins établissement |
| Le produit est décrit en 3 à 5 caractéristiques signature | ☑ Oui | 4 traits listés, avec l'ajout crucial du "Mode enseignant (suivi + export)". |
| Les 6 features F1-F6 du MVP sont rappelées et 2-3 pistes Release 2 sont identifiées | ☑ Oui | F1-F6 listées + 3 pistes R2 (Export, Dashboard, RAG). |
| Les Business Goals comportent au moins 3 KPI chiffrés et datés | ☑ Oui | Ajout des KPI spécifiques post-J1 : 50 enseignants actifs WAU et 80% de recommandation. |
| Les 4 concurrents sont cartographiés avec positionnement + limite identifiée | ☑ Oui | Wilgo, Leo, Quizlet, Khanmigo |
| Les 3 différenciateurs EduTutor IA sont argumentés au-delà du slogan | ☑ Oui | Le différenciateur #1 détaille l'angle "Enseignant-first" qui répond aux besoins de Mme Lefèvre. |
| Le document a été relu et validé par l'équipe complète | ☑ Oui | 7 membres : toutes les voix entendues |

---

## 📚 Références et conventions

### Références incontournables

- Cours Agile/Scrum (Mohamed EL AFRIT) : mohamedelafrit.com/teaching/Master_Classe_Agile/cours.html
- Scrum Guide officiel FR : scrumguides.org/docs/scrumguide/v2020/2020-ScrumGuideFrench.pdf
- Site APOCAL'IPSSI : mohamedelafrit.com/teaching/APOCALIPSSI

### Références spécifiques à ce document

- Roman Pichler, Product Vision Board (canvas original) : https://www.romanpichler.com/tools/product-vision-board/
- Wilgo.ai, concurrent français : https://wilgo.ai/
- Leo (iamleo.ai), concurrent français : https://iamleo.ai/fr
- Quizlet AI, concurrent US historique : https://quizlet.com/
- Khanmigo, concurrent Khan Academy : https://www.khanmigo.ai/

### Convention de versionnement

- v1.0 : version initiale produite lors du cadrage matinal
- v1.1, v1.2 : révisions mineures (typo, ajout d'item) après revue PO
- v2.0 : révision majeure suite à une perturbation (changement de scope)
- Chaque version est commitée séparément avec message Git explicite
- Le statut « Validé PO » nécessite une trace écrite (commentaire, mail, Teams)

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
