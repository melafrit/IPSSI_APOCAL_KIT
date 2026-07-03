# Story Map
### Carte 2D du produit EduAI, activités utilisateur × niveaux MoSCoW

**APOCAL'IPSSI · CADRAGE MATINAL · ARTEFACT 4 SUR 7**

Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum
Auteur : Mohamed Amine EL AFRIT · Licence CC BY-NC-SA 4.0

---

## IDENTIFICATION DU DOCUMENT

> À compléter par l'équipe avant chaque remise

| Champ | Valeur |
|---|---|
| **Équipe n°** | 2 |
| **Membres** | Krishmini KULAKRISHNA, Houda OUADAH, Ousmane NDIAYE, Wicramachine SERGIO, Adja Fatou SAGNA, Danielle Jamila KOAGNE NGANKAM, Mohammed DERKAOUI |
| **Sprint concerné** | Cadrage |
| **Version** | V2.0 |
| **Date de remise** | 30/06/2026 15h30 |
| **Statut** | Validé PO |

> 💡 Convention de nommage du fichier : `equipe-XX-nom-document-vY.Z.xlsx` (ex. `equipe-03-product-backlog-v1.0.xlsx`)

---

## STORY MAP : EduAI
### 6 activités utilisateur × 4 niveaux MoSCoW

| | |
|---|---|
| 💡 **Objectif** | Visualiser le scope d'EduAI en 2D : qui fait quoi (colonnes) × quand (lignes). MVP en haut, abandonné en bas. |
| 📐 **Format** | 6 activités utilisateur en colonnes, 4 niveaux MoSCoW en lignes. Chaque cellule contient une story tagguée (US-XX) ou un placeholder à compléter. |
| ✅ **Bon** | « MVP / Uploader un cours : F2 Upload PDF ≤ 5 Mo ou texte ≥ 200 car. » |
| ❌ **À éviter** | « MVP / Uploader un cours : faire un super upload » (vague, non chiffré, intestable) |

---

### Carte 2D

| Niveau MoSCoW | 1. S'inscrire | 2. Uploader un cours | 3. Générer un quiz | 4. Passer le quiz | 5. Consulter résultats | 6. Gérer son compte (RGPD) |
|---|---|---|---|---|---|---|
| **MUST — MVP Release 1** | **US-01** Inscription email + mot de passe (Django Auth) | **US-02** Uploader un PDF ≤ 5 Mo OU saisie texte ≥ 200 caractères | **US-03** Génération automatique de 10 QCM via Llama 3.1 8B | **US-04** Soumettre les réponses et obtenir la correction | **US-05** Afficher le score /10 · **US-21** Consulter les scores des étudiants | **US-06** Connexion · Déconnexion · Modifier son profil |
| **SHOULD — Release 2** | **US-07** Réinitialiser le mot de passe par email | — | — | **US-10** Mode chronométré (10-30 s configurable) | **US-11** Dashboard progression par chapitre des étudiants · **US-NEW-04** Génération automatique de barème | **US-12** Export RGPD complet (JSON + CSV, Art. 15 / 20) · **US-23** Envoyer des conseils personnalisés aux étudiants |
| **COULD — Release 2** | **US-13** Connexion Google/Apple | **US-14** Importer un cours depuis une URL (article web, blog) | **US-15** Questions ouvertes corrigées par IA | Mode flashcards type Anki (révision espacée) | **US-16** Identifier automatiquement les chapitres à retravailler · **US-22** Visualiser le tableau de bord de la classe | **US-17** Suppression compte + données (RGPD Art. 17, droit à l'oubli) |
| **WON'T (this time)** | **US-18** SSO entreprise (SAML / OIDC) | **US-08** Bibliothèque personnelle de cours uploadés · Importer un fichier audio/vidéo avec transcription | **US-09** Choisir la difficulté et le nombre de questions · **US-19** Quiz multijoueur | **US-20** Chat IA conversationnel (chatbot type Khanmigo) | Statistiques temps réel | Personnalisation thème UI |

---

### 📌 Légende

| Niveau | Définition |
|---|---|
| **MUST** | Sans cette story, le produit n'a pas de sens. Engagement Sprint 1-5. |
| **SHOULD** | Important, à inclure si capacité disponible. Engagement Sprint 6-7. |
| **COULD** | Bonus apprécié si temps en surplus. Sprint 7 si la R1 a été vite. |
| **WON'T** | Décision EXPLICITE de ne pas faire cette release. À documenter. |

> ✍️ **À vous** — Adaptez chaque cellule à VOTRE équipe : tag US-XX, ajout de stories supplémentaires (insertion de lignes), suppression des stories que vous ne reprenez pas.

---

## Backlog des User Stories

| ID | User Story | MoSCoW | Activité |
|---|---|---|---|
| US-01 | En tant qu'étudiant·e, je veux créer un compte avec email et mot de passe, afin de sauvegarder mes quizz et y revenir. | MUST | 1. S'inscrire |
| US-02 | En tant qu'étudiant·e, je veux uploader un PDF ou saisir un texte de cours, afin de ne pas avoir à recopier mon support. | MUST | 2. Uploader un cours |
| US-03 | En tant qu'étudiant·e, je veux générer un quiz de 10 QCM en moins de 60 s, afin de réviser rapidement un chapitre. | MUST | 3. Générer un quiz |
| US-04 | En tant qu'étudiant·e, je veux soumettre mes réponses et obtenir une correction automatique, afin de savoir où je me situe. | MUST | 4. Passer le quiz |
| US-05 | En tant qu'étudiant·e, je veux voir mon score /10 et le détail bonnes/mauvaises réponses, afin de mesurer ma progression. | MUST | 5. Consulter résultats |
| US-06 | En tant qu'étudiant·e, je veux consulter l'historique de mes quizz passés, afin de suivre mon évolution dans le temps. | MUST | 5. Consulter résultats |
| US-07 | En tant qu'étudiant·e, je veux réinitialiser mon mot de passe via email, afin de récupérer mon compte sans support. | SHOULD | 1. S'inscrire |
| US-08 | En tant qu'étudiant·e, je veux une bibliothèque de mes cours uploadés, afin de retrouver vite mes PDF d'un semestre. | SHOULD | 2. Uploader un cours |
| US-09 | En tant qu'étudiant·e, je veux choisir le niveau de difficulté et le nombre de questions (5–20), afin d'adapter à mon temps. | SHOULD | 3. Générer un quiz |
| US-10 | En tant qu'étudiant·e, je veux un mode timer optionnel par question, afin de m'entraîner aux conditions d'examen. | SHOULD | 4. Passer le quiz |
| US-11 | En tant qu'étudiant·e, je veux un dashboard de progression par chapitre, afin de cibler mes révisions sur mes lacunes. | SHOULD | 5. Consulter résultats |
| US-12 | En tant qu'utilisateur·trice, je veux exporter mes données en JSON et CSV, afin d'exercer mon droit d'accès Art. 15 RGPD. | SHOULD | 6. Gérer son compte |
| US-21 | En tant qu'enseignante, je veux consulter les scores de mes étudiants afin d'identifier ceux qui ont besoin d'aide. | SHOULD | 5. Consulter résultats |
| US-22 | En tant qu'enseignante, je veux visualiser un tableau de bord de la progression de ma classe afin de suivre les performances globales. | SHOULD | 5. Consulter résultats |
| US-23 | En tant qu'enseignante, je veux envoyer des conseils de révision à mes étudiants afin de les accompagner avant les examens. | SHOULD | 6. Gérer son compte |
| US-13 | En tant qu'étudiant·e, je veux me connecter via Google ou Apple OAuth, afin d'éviter de gérer un énième mot de passe. | COULD | 1. S'inscrire |
| US-14 | En tant qu'étudiant·e, je veux importer un cours depuis une URL web, afin d'enrichir mes sources de révision. | COULD | 2. Uploader un cours |
| US-15 | En tant qu'enseignant·e, je veux générer des questions ouvertes corrigées par le LLM, afin de varier les types d'évaluation. | COULD | 3. Générer un quiz |
| US-16 | En tant qu'étudiant·e, je veux que l'app identifie mes lacunes par chapitre, afin de me concentrer sur ce qui pèche. | COULD | 5. Consulter résultats |
| US-17 | En tant qu'utilisateur·trice, je veux supprimer mon compte et mes données, afin d'exercer mon droit à l'oubli Art. 17 RGPD. | COULD | 6. Gérer son compte |
| US-18 | En tant que DSI d'établissement, je veux un SSO entreprise SAML/OIDC, afin d'intégrer EduTutor à mon AD/ENT. | WON'T | 1. S'inscrire |
| US-19 | En tant qu'étudiant·e, je veux discuter avec un chatbot IA pour explorer un sujet, afin d'apprendre par dialogue. | WON'T | 3. Générer un quiz |
| US-20 | En tant qu'étudiant·e, je veux affronter d'autres étudiants en mode compétition, afin d'ajouter du fun à la révision. | WON'T | 4. Passer le quiz |

---

## ✅ Grille d'auto-évaluation

> À remplir par l'équipe avant soumission au PO

| Critère qualité | Auto-évaluation | Commentaire / preuve |
|---|---|---|
| 6 activités utilisateur clairement nommées en colonnes (axe parcours) | ■ Oui | US-01 à US-06 = F1 (inscription), F2 (upload), F3 (quiz), F4 (correction), F5 (score), F6 (historique) |
| 4 niveaux MoSCoW présents en lignes (MUST / SHOULD / COULD / WON'T) | ■ Oui | 6 stories SHOULD : reset MDP, bibliothèque, difficulté/nb questions, timer, dashboard, export RGPD |
| MVP MUST contient bien les 6 features F1-F6 imposées (vérifiable au Vision Board) | ■ Oui | |
| SHOULD R2 contient au moins 3 stories alignées avec les 10 pistes Release 2 officielles | ■ Oui | |
| COULD R2 contient au moins 3 stories nice-to-have crédibles | ■ Oui | |
| WON'T contient au moins 2 stories explicitement reportées avec justification | ■ Oui | |
| Chaque story est tagguée avec un ID (US-XX) pour traçabilité Product Backlog | ■ Oui | US-01 à US-20 |
| La Story Map a été co-créée en équipe (toutes les voix entendues, pas un solo) | ■ Oui | |
| La cohérence MVP F1-F6 ↔ Vision Board ↔ Customer Journey est vérifiée | ■ Oui | US-01 à US-06 alignées avec le parcours étudiant du Vision Board et du Customer Journey |

---

*Mohamed Amine EL AFRIT · APOCAL'IPSSI 2026 · CC BY-NC-SA 4.0*
