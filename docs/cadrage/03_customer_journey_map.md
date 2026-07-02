# Customer Journey Map — EduTutor IA

**Projet :** APOCAL'IPSSI 2026
**Équipe :** Groupe 6
**Auteur :** Kahil MOKHTARI
**Date :** 29 juin 2026

---

## Persona de référence — Lucas Moreau (cible primaire imposée)

**Profil :** 21 ans, L3 Informatique, Université Paris-Saclay. Job étudiant le week-end, révise seul sur son laptop Windows (8 Go RAM). Budget nul pour les abonnements. Utilise actuellement ChatGPT (limité) et Quizlet (trop générique). Connexion Wi-Fi instable en résidence universitaire.

**Objectif principal :** Transformer ses cours en quiz d'entraînement rapidement, sans effort de préparation, pour identifier ses lacunes avant les partiels.

---

## Vue d'ensemble du parcours

```
[1] Découverte → [2] Inscription & Validation → [3] Premier quiz → [4] Utilisation régulière → [5] Recommandation ou Abandon
```

---

## Étape 1 — Découverte

**Contexte :** À J-10 de ses partiels, Lucas cherche une alternative à ses méthodes de révision actuelles. Il tombe sur EduTutor IA via un post Discord de sa promo.

| | Détail |
|---|---|
| **Canaux** | Discord de la promo · Bouche-à-oreille · Résultat Google "quiz IA à partir de mes cours" |
| **Actions** | Lit la landing page · Regarde la section "Comment ça marche" · Vérifie que c'est gratuit · Cherche si ses données de cours partiront sur des serveurs |
| **Pensées** | *"Est-ce que ça va vraiment générer des questions sur MON cours de Réseaux ?"* · *"C'est gratuit, y'a forcément un catch."* · *"ChatGPT invente des trucs qui ne sont pas dans mon cours — est-ce que c'est pareil ?"* |
| **Émotions** | Curiosité · Scepticisme · Légère méfiance |
| **Frictions** | Absence de preuve sociale visible (pas d'avis, pas de compteur utilisateurs) · Pas de mention explicite RGPD en page d'accueil · Doute sur la pertinence des questions générées |
| **Opportunité** | Ajouter un badge "Vos cours restent sur notre serveur — RGPD by design" · Démo interactive en landing page · Témoignage d'un étudiant |

---

## Étape 2 — Inscription et validation de l'email

**Contexte :** Convaincu d'essayer, Lucas crée son compte. Il est entre deux cours — il a 5 minutes.

| | Détail |
|---|---|
| **Page** | `/signup` → email de validation → `/login` |
| **Actions** | Saisit son email universitaire + mot de passe · Soumet le formulaire (`SignupPage.tsx`) · Ouvre sa boîte mail · Cherche l'email de validation · Clique le lien · Est redirigé vers `/login` avec le message "Compte activé" |
| **Pensées** | *"J'espère que ça ne va pas spammer ma boîte."* · *"C'est rapide, bien."* · *"L'email est dans mes spams..."* · *"Ok, mon compte est activé — pas de vérification obligatoire pour accéder apparemment"* (la validation est "soft" : le compte fonctionne même sans clic, mais un bandeau `VerifyEmailBanner` s'affiche) |
| **Émotions** | Neutre → Légère satisfaction (30 secondes et c'est fait) → Micro-frustration si l'email arrive en spam |
| **Frictions** | Email de validation classé en spam (domaine inconnu) · Si le lien de validation expire (> 24h), l'utilisateur ne sait pas comment en redemander un · Pas de connexion via compte universitaire (pas de SSO dans le MVP) |
| **Opportunité** | Message "Vérifiez vos spams" affiché dès la page de confirmation · Bouton "Renvoyer l'email" sans avoir à se reconnecter · Le bandeau `VerifyEmailBanner` est déjà en place dans le code — s'assurer qu'il est visible et non ignorable |

---

## Étape 3 — Premier quiz

**Contexte :** Lucas est sur son dashboard pour la première fois. Il a 45 minutes avant son prochain TP. Il uploade son cours de Réseaux (PDF de 45 pages, 3,2 Mo).

### Sous-étape 3a — Upload du cours

| | Détail |
|---|---|
| **Page** | `/upload` (`UploadPage.tsx`) |
| **Actions** | Clique "Nouveau quiz" · Voit deux options : upload PDF ou saisie texte · Choisit PDF · Glisse son fichier · Voit le message de confirmation avec le nombre de pages extraites |
| **Pensées** | *"3,2 Mo — c'est dans la limite des 5 Mo, bien."* · *"Combien de pages ça va extraire ?"* · *"Est-ce que pypdf va bien lire les tableaux et les formules de mon cours ?"* |
| **Émotions** | Curiosité · Légère anxiété si l'upload est lent |
| **Frictions** | Pas de retour visuel sur la qualité d'extraction · Si le PDF a beaucoup d'images, l'extraction peut être partielle sans que l'étudiant le sache |
| **Opportunité** | Afficher "X pages extraites, Y caractères" pour rassurer · Message d'avertissement si moins de 500 caractères extraits |

### Sous-étape 3b — Génération du quiz

| | Détail |
|---|---|
| **Page** | `/upload` → appel API → `QuizPage.tsx` |
| **Actions** | Clique "Générer le quiz" · Attend (loader) · Voit les 10 QCM apparaître |
| **Pensées** | *"35 secondes... c'est long mais ça va."* · *"Est-ce que l'IA est vraiment en train de lire mon cours ?"* · *"Ces questions sont vraiment tirées de mes slides ?"* |
| **Émotions** | Attente anxieuse les 10 premières secondes → Soulagement quand le quiz apparaît → Surprise positive si les questions sont pertinentes |
| **Frictions** | Loader sans message contextuel (l'étudiant ne sait pas ce qui se passe : extraction ? génération ? Ollama lent ?) · Si la génération dépasse 60 s, l'utilisateur peut penser que ça a planté · Aucun moyen d'annuler une génération en cours |
| **Opportunité** | Loader progressif avec états : "Extraction du texte...", "Envoi au modèle IA...", "Génération des questions..." · Afficher une estimation "~30-40 secondes" · Bouton "Annuler" visible |

### Sous-étape 3c — Passage du quiz et résultats

| | Détail |
|---|---|
| **Page** | `QuizPage.tsx` → soumission → page résultats |
| **Actions** | Lit les 10 questions · Sélectionne ses réponses (radio buttons, 1 seule par question) · Clique "Soumettre" · Voit son score 7/10 · Voit le détail question par question (correct/incorrect + bonne réponse) |
| **Pensées** | *"La question 4 est exactement sur le chapitre que j'ai du mal."* · *"7/10 — je pensais mieux maîtriser le routage OSPF."* · *"Je vois exactement où j'ai merdé — c'est utile."* |
| **Émotions** | Engagement pendant le quiz · Légère surprise face à ses erreurs · Satisfaction d'avoir un feedback précis · Envie de recommencer sur les questions ratées |
| **Frictions** | Soumission possible sans répondre à toutes les questions (pas de validation front) · Pas de lien direct vers "rejouer mes erreurs" (`ReviewMistakesPage` existe mais peut ne pas être connectée au flux) · Score calculé côté serveur via `selected_index` — vérifier que c'est bien le cas |
| **Opportunité** | Surligner en rouge les questions sans réponse avant soumission · Lien direct vers `ReviewMistakesPage` depuis la page résultats · Message motivant selon le score : "Excellent !", "Bon début !", "Il reste du travail !" |

---

## Étape 4 — Utilisation régulière

**Contexte :** Lucas revient 2 à 3 fois par semaine pendant les 2 semaines de révision avant ses partiels. Il varie les matières et commence à consulter son historique.

| | Détail |
|---|---|
| **Pages** | `DashboardPage.tsx` · `HistoryPage.tsx` · `UploadPage.tsx` (nouveau quiz) |
| **Actions** | Uploade de nouveaux cours (Algo, BDD, Systèmes) · Consulte son historique (`HistoryPage`) avec la liste de ses quiz (titre, date, score `/10`) · Identifie les matières sous 6/10 · Reteste ces matières le lendemain · Consulte le `DashboardPage` pour avoir une vue d'ensemble |
| **Pensées** | *"En Réseaux je suis passé de 5/10 à 8/10 en 4 jours — ça marche."* · *"Dommage qu'il n'y ait pas de moyen de filtrer l'historique par matière."* · *"Le mode sombre c'est bien pour réviser le soir."* |
| **Émotions** | Sentiment de progression et de contrôle · Engagement croissant · Légère frustration sur les fonctionnalités manquantes |
| **Frictions** | Historique peu lisible quand il dépasse 10-15 entrées (pas de pagination ni de filtrage) · `DashboardPage` peu informatif sans données suffisantes · Pas de graphe de progression · Pour régénérer un quiz sur le même cours, il faut re-uploader le PDF |
| **Opportunité** | Filtrage de l'historique par titre ou score (Release 2) · Widget "Score moyen cette semaine" sur le Dashboard · Sauvegarde du `source_text` pour re-générer sans re-uploader |

---

## Étape 5 — Satisfaction & Recommandation ou Abandon

### Scénario A — Satisfaction et recommandation

**Contexte :** Lucas obtient 14/20 en Réseaux alors que la moyenne de sa promo est 10/20.

| | Détail |
|---|---|
| **Actions** | Partage EduTutor IA sur le Discord de sa promo · Recommande l'outil à ses camarades de TD · Revient pour les prochains examens |
| **Pensées** | *"Cet outil m'a permis de repérer exactement les deux chapitres où j'avais des lacunes. Sans ça, j'aurais passé du temps sur ce que je savais déjà."* |
| **Émotions** | Satisfaction forte · Fierté · Envie de partager |
| **Impact produit** | Croissance organique par bouche-à-oreille dans les promos |

### Scénario B — Abandon

**Contexte :** La génération échoue sur son PDF de droit constitutionnel (beaucoup de tableaux, peu de texte extractible).

| | Détail |
|---|---|
| **Déclencheur** | PDF avec images ou tableaux → extraction vide → génération échoue ou produit des questions hors sujet |
| **Actions** | Retourne sur ChatGPT ou Quizlet · Ne revient pas |
| **Pensées** | *"C'est prometteur mais pas fiable sur tous mes cours."* |
| **Émotions** | Déception modérée · Perte de confiance |
| **Mitigation** | Message d'erreur explicite : "Texte insuffisant extrait de ce PDF — essayez de coller le texte directement" · Laisser l'option texte libre visible comme alternative immédiate |

---

## Synthèse des frictions — Priorisation MVP

| # | Friction | Étape | Impact | À traiter en MVP ? |
|---|----------|-------|--------|-------------------|
| F1 | Email de validation classé en spam sans avertissement | 2 | Moyen | **Oui** — message "vérifiez vos spams" |
| F2 | Loader de génération sans message contextuel | 3b | Élevé | **Oui** — états progressifs du loader |
| F3 | PDF avec peu de texte extrait → quiz hors sujet sans alerte | 3a | Élevé | **Oui** — validation quantité texte extrait |
| F4 | Soumission possible sans répondre à toutes les questions | 3c | Moyen | **Oui** — validation front avant submit |
| F5 | Pas de lien direct vers "rejouer mes erreurs" depuis les résultats | 3c | Moyen | **Oui** — lien `ReviewMistakesPage` |
| F6 | Historique illisible au-delà de 10 entrées (pas de filtre) | 4 | Moyen | Non — Release 2 |
| F7 | Pas de graphe de progression dans le temps | 4 | Faible | Non — Release 2 |
| F8 | Obligation de re-uploader le PDF pour régénérer un quiz | 4 | Faible | Non — Release 2 |

---

## Persona secondaire — Mme Isabelle Lefèvre (enseignante)

*Émerge via la Perturbation J1 — lundi 14h*

**Profil :** 42 ans, Enseignante en BTS Communication, Lyon. Responsable d'une classe de 28 élèves. Prépare ses évaluations manuellement (3h pour 10 questions). Besoin principal : suivre la progression de sa classe et repérer les élèves décrocheurs. Exige que les données de ses élèves restent dans l'établissement.

| Étape | Actions | Émotions | Frictions clés |
|-------|---------|----------|----------------|
| **Découverte** | Entendu parler par un collègue · Lit la doc · Vérifie la conformité RGPD avec son DSI | Méfiance institutionnelle · Intérêt si souveraineté confirmée | Pas de page dédiée enseignants · Pas de case "RGPD / hébergement local" visible |
| **Prise en main** | Uploade un chapitre de son manuel · Génère un quiz de 10 questions · Évalue la qualité pédagogique des questions | Surprise si questions correctes · Déception si questions trop faciles ou hors programme | Pas de contrôle sur le niveau de difficulté · Pas de validation/modification des questions avant distribution |
| **Signalement d'erreur** | Remarque des erreurs factuelles dans les questions générées (Perturbation J4) · Veut signaler l'erreur à l'équipe technique | Frustration · Perte de confiance dans le produit | Pas de mécanisme de feedback dans le MVP → déclenche la Perturbation J4 et le modèle `QuestionReport` |
| **Usage régulier** | Génère des QCM pour ses TD · Exporte les questions · Partage avec ses étudiants | Gain de temps réel (3h → 5 min) · Satisfaction pédagogique si qualité OK | Pas d'export Word/PDF dans le MVP · Pas de gestion de cohorte |
| **Satisfaction / Recommandation** | Si qualité bonne : recommande EduTutor IA à ses collègues · Continue à générer ses QCM. Si qualité insuffisante : abandonne l'outil · Revient à la préparation manuelle | Fierté et gain de crédibilité si l'outil tient ses promesses · Déception et méfiance renforcée si qualité insuffisante | Pas de mécanisme de retour structuré · Pas de canal de recommandation entre collègues intégré au produit |

**Besoins non couverts par le MVP → Release 2 :**
- Validation et modification des questions avant usage
- Modèle `QuestionReport` pour signaler les erreurs factuelles
- Export des questions (Word, PDF)
- Gestion de cohorte / partage avec des étudiants
