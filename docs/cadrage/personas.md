# Fiches Personas — EduTutor IA

**APOCAL'IPSSI — Cadrage matinal · Artefact 2 sur 7**
Les 3 utilisateurs cibles d'EduTutor IA · Édition 2026 · Semaine immersive Scrum

## Identification du document

| Champ | Valeur |
|---|---|
| Équipe n° | *22 |
| Membres | Alain-Patrick, Kyllian, Yacine, Antoine, Tom, Baptiste, Cleg  |
| Sprint concerné | Cadrage |
| Version | v1.0 (initiale) |
| Date de remise | 29/06/2026 |
| Statut | Draft |

> Convention de nommage du fichier : `equipe-22-persona-v1.0.md`

## Préambule

Une persona représente un utilisateur type, construit à partir de données réelles (entretiens, statistiques, observations) et non d'intuitions. Elle sert à trancher les arbitrages produit : « est-ce que Léa utiliserait vraiment cette fonctionnalité ? » remplace « est-ce que c'est bien ? ».

Ce document contient 3 personas couvrant les 3 cibles du Product Vision Board : l'étudiant·e (cible primaire), l'enseignant·e (cible secondaire, approfondie lors de la perturbation J1) et l'établissement scolaire (cible tertiaire B2B). Chaque persona comporte 6 dimensions, plus une section anti-persona.

---

## 1. Persona primaire — Étudiant·e du supérieur

### 1.1. Identité

| Champ | Valeur |
|---|---|
| Nom / Prénom | Léa Martin |
| Âge | 20 ans |
| Profession | Étudiante en L2 droit, Paris II Panthéon-Assas |
| Localisation | Paris 5ᵉ · trajet quotidien RER B 35 min |
| Situation | Boursière échelon 4, colocation à 3 personnes |

### 1.2. Contexte d'usage

- Smartphone Android personnel (Samsung A53), wifi domestique fluide, 4G dans le RER
- Laptop emprunté à la BU 2 fois/semaine (pas d'ordinateur perso)
- Travaille en silence chez elle ou en BU, écoute parfois du Lo-Fi via Spotify
- Révise principalement en soirée (19h-22h) et le dimanche après-midi
- Révise environ 10h/semaine en moyenne, qui montent à ~15h en période de partiels

### 1.3. Compétences numériques

- Power user smartphone (Instagram, TikTok, BlaBlaCar, Doctolib, ENT université)
- Autonome sur Moodle et l'ENT, importe des fichiers PDF/Word sans souci
- A testé ChatGPT 4-5 fois pour des résumés, sans usage régulier
- Allergique aux installations en ligne de commande et aux paramétrages techniques
- Abandonne tout outil qui demande plus de 2 minutes de configuration avant de servir

### 1.4. Frustrations / pain points (chiffrés)

- Perd ~3h/semaine à chercher des fiches de révision en ligne, de qualité aléatoire
- Les fiches trouvées sont rarement à jour avec le programme de sa promo (le cours change chaque année)
- Se sent surchargée à 3 semaines des partiels, sans plan de révision personnalisé
- Ne sait pas mesurer si elle « connaît » un chapitre ou si elle « croit » le connaître
- Procrastine ~2 soirs sur 5 car créer un support de révision de qualité lui paraît une corvée

### 1.5. Objectifs (jobs-to-be-done, SMART)

- Générer un quiz de révision sur n'importe quel chapitre de son cours en moins de 5 minutes
- Identifier ses lacunes par chapitre 2 semaines avant les partiels (vs 3 jours aujourd'hui)
- Gagner ~2h/semaine sur la recherche de supports (vs 3h aujourd'hui)
- Transformer ses 35 min de RER quotidiennes en sessions de quiz utiles, même sans connexion stable

### 1.6. Critères de succès personnels (au point de vue persona)

- « Si je gagne au moins 1h/semaine sur ma préparation, j'adopte. »
- « Si ça plante 1 fois en bibliothèque devant mes amies, je n'y reviens jamais. »
- « Si je peux l'utiliser dans le RER sans wifi, c'est un game changer. »
- « Si je peux générer un quiz depuis mon téléphone en moins d'une minute, je l'utilise tous les jours. »

---

## 2. Persona secondaire — Enseignant·e (persona émergente J1)

> Mme Lefèvre n'est pas la cible initiale ; elle représente la cible B2B la plus crédible et sera approfondie lors de la perturbation J1.

### 2.1. Identité

| Champ | Valeur |
|---|---|
| Nom / Prénom | Mme Sophie Lefèvre |
| Âge | 42 ans |
| Profession | Professeure de Communication en BTS, lycée privé sous contrat |
| Localisation | Lyon · trajet voiture 25 min · établissement Lyon 6ᵉ |
| Situation | Mariée, 2 enfants (12 et 15 ans), salaire ~2 700 € net/mois |

### 2.2. Contexte d'usage

- 28 étudiants dans sa classe de BTS Communication 1ʳᵉ année
- 6h de cours/semaine + ~3h de préparation + ~3h de correction = ~12h/semaine
- Salle informatique disponible mais réseau lent (4G partagée pour les étudiants)
- Smartphones Android personnels chez les étudiants (modèles 2018-2023)
- Pas d'ordinateur dédié en classe : utilise son laptop personnel branché au vidéoprojecteur, connexion établissement bridée

### 2.3. Compétences numériques

- Power user Word + Excel, autonome sur Moodle et Pronote
- Pas développeuse, allergique aux installations en ligne de commande
- Découvre l'IA générative (a testé ChatGPT 2 fois)
- Suit l'actualité edtech via X/Twitter et la newsletter du Café Pédagogique
- A besoin d'une interface zéro configuration : n'a jamais utilisé d'API ni paramétré un modèle

### 2.4. Frustrations / pain points (chiffrés)

- Corrige 28 copies × 3 quiz/semaine = ~12h de correction par mois
- Préparation chronophage : créer 1 quiz cohérent lui prend ~90 minutes
- Pas de variation des questions : les étudiants se passent les réponses entre deux cours
- Frustrée d'avoir des quiz « plats » alors qu'elle aimerait varier types et difficultés
- Doit recréer manuellement des variantes pour éviter la triche : ~2h perdues/semaine

### 2.5. Objectifs (jobs-to-be-done, SMART)
- Générer 1 quiz personnalisé en moins de 5 minutes sur n'importe quel chapitre
- Personnaliser le niveau, le nombre de questions et le type (QCM / vrai-faux / questions ouvertes)
- Suivre l'engagement de la classe (taux de réponse, score moyen, lacunes communes)
- Exporter un quiz en Word/PDF imprimable en moins de 2 minutes pour la salle des profs

### 2.6. Critères de succès personnels (au point de vue persona)

- « Si je gagne 1h/semaine sur ma préparation, j'adopte définitivement. »
- « Si ça plante 1 fois en cours devant 28 ados, je n'y reviens jamais. »
- « Si je peux exporter en Word pour l'imprimer en salle des profs, c'est parfait. »
- « Si je peux vérifier qu'aucune question n'est fausse avant de la donner à mes élèves, je fais confiance à l'outil. »

---

## 3. Persona tertiaire — Établissement scolaire (acheteur B2B)

> La personne qui décide de l'achat est différente de l'utilisateur : en éducation B2B, c'est souvent un·e responsable pédagogique ou directeur·rice des études.

### 3.1. Identité

| Champ | Valeur |
|---|---|
| Nom / Prénom | M. David Chen |
| Âge | 51 ans |
| Profession | Directeur des études d'un lycée privé sous contrat (1 200 élèves) |
| Localisation | Lyon 6ᵉ · même établissement que Mme Lefèvre |
| Situation | Marié, enfants grands, 25 ans d'expérience dans l'enseignement |

### 3.2. Contexte d'achat

- Budget edtech ~12 000 €/an pour le lycée (10 € / élève × 1 200)
- Cycle d'achat de 6 mois minimum (validation pédagogique + DPO + comptabilité)
- Décide en concertation avec 3 acteurs : conseil pédagogique, DPO, gestionnaire financier
- Choisit les outils edtech 1 fois/an, en mai/juin pour la rentrée de septembre
- Exige une démonstration de conformité RGPD écrite et une clause de réversibilité des données avant toute signature

### 3.3. Compétences numériques

- Utilisateur courant d'ENT/Pronote, gère les comptes profs et élèves
- Pas technique, fait confiance au DSI mutualisé du réseau d'établissements
- Lit les CGV/CGU, exige des engagements RGPD écrits
- Juge un outil sur ses garanties juridiques et de pérennité, pas sur ses fonctionnalités

### 3.4. Frustrations / pain points

- A déjà signé pour 2 outils edtech qui ont fermé en cours d'année (risque de pérennité)
- Son DPO refuse systématiquement les outils utilisant OpenAI ou des LLM US (transferts hors UE)
- Subit la pression du conseil d'administration pour démontrer une « stratégie IA pédagogique »
- Les profs râlent quand on impose un nouvel outil : besoin d'adhésion préalable
- Aucun outil testé jusqu'ici ne garantit l'hébergement local des données : blocage systématique du DPO

### 3.5. Objectifs (jobs-to-be-done)

- Disposer d'un outil edtech IA conforme RGPD, signable sans risque juridique
- Bénéficier d'une tarification prévisible par élève / par an (pas de surprise au renouvellement)
- Obtenir l'adhésion d'au moins 30 % des profs dès la première année (sinon échec budgétaire)
- Déployer un outil validé par le DPO en moins d'un cycle d'achat (< 6 mois)

### 3.6. Critères de succès personnels (au point de vue persona)

- « Si le DPO valide les CGV en 30 min de lecture, c'est un signal positif. »
- « Si 5 profs me demandent spontanément d'élargir l'usage, je signe le renouvellement. »
- « Si je peux dire au CA qu'on est en avance sur l'IA sans mentir, c'est gagné. »
- « Si le DPO valide l'architecture local-first sans réserve, je signe pour tout l'établissement. »

---

## 4. Anti-personas (qui n'est PAS cible)

Clarifier qui le produit ne sert pas volontairement permet de trancher les arbitrages MoSCoW : si une feature ne sert que des non-cibles, c'est un Won't have.

### 4.1. Anti-persona du persona Étudiant

Élève de primaire ou de collège (< 15 ans). EduTutor exige un cours fourni au format PDF ou texte de niveau supérieur. L'autonomie nécessaire (uploader, contextualiser, interpréter) n'est pas alignée avec ce profil. Ne pas chercher à l'attirer.

### 4.2. Anti-persona du persona Enseignant

Enseignant·e du primaire ou retraité·e en autoformation. Le besoin de générer des supports d'évaluation à grande échelle (28 étudiants × 3 quiz) n'existe pas dans ces contextes. Ne pas chercher à élargir l'offre.

### 4.3. Anti-persona du persona Établissement

École internationale tournée vers OpenAI / Anthropic, sans contrainte RGPD. Notre différenciation est précisément le local-first et la souveraineté des données. Une école qui valorise un partenariat OpenAI n'achètera jamais EduTutor, et inversement : ce n'est pas un marché à courir.

---

## Grille d'auto-évaluation

À remplir par l'équipe avant de soumettre le livrable au Product Owner.

| Critère qualité | Auto-évaluation |
|---|---|
| Les 3 personas sont nommés concrètement (prénom + nom + âge) |  Oui |
| Chaque persona comporte les 6 dimensions complétées |  Oui |
| Le contexte précise un volume horaire et un environnement physique |  Oui |
| Les compétences numériques sont nuancées (pas juste « bon en info ») |  Oui |
| Les frustrations sont chiffrées au moins 3 fois sur 5 par persona |  Oui |
| Les objectifs respectent au moins partiellement le format SMART |  Oui |
| Les critères de succès sont formulés au point de vue persona (au « je ») |  Oui |
| Les 3 anti-personas sont décrits avec justification |  Oui |
| Le document a été relu et validé par l'équipe complète | ☐ *[ à valider ]* |
