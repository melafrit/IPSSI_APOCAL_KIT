# Fiche Persona — Mme Sophie Lefèvre (v2.0, post-perturbation J1)

**APOCAL'IPSSI — Perturbation J1 · Cible secondaire enseignante**
Projet EduTutor IA · Édition 2026 · Semaine immersive Scrum

## Identification du document

| Champ | Valeur |
|---|---|
| Équipe n° | *22* |
| Membres |Alain-Patrick GOMAS *(co-construction persona, ≥ 2 membres)* |
| Sprint concerné | Perturbation J1 |
| Version | **v2.0 (révision majeure suite à perturbation J1)** |
| Date de remise | 29/06/2026 — *[ HHhMM ]* |
| Statut | Draft |
| Dépôt | `/docs/perturbations/j1/` |

> Convention de nommage : `equipe-XX-persona-lefevre-v2.0.md`
> Les personas étudiant (Léa Martin) et établissement (M. David Chen) sont **conservés à l'identique** dans `/docs/cadrage/` — non écrasés (CA-J1-7).

---

## Ce qui change depuis le cadrage (v1.0 → v2.0)

| | v1.0 (cadrage matinal) | v2.0 (post-perturbation J1) |
|---|---|---|
| Rôle vis-à-vis du produit | Créatrice de supports : génère et exporte des quiz | **+ Pilote de la progression de sa classe** : suit, repère, accompagne |
| Besoin central ajouté | — | Voir les scores des 28 étudiants, repérer les décrocheurs, leur envoyer des conseils |
| Priorité produit | Cible évoquée | Cible secondaire à intégrer dans la Release 1 (voir note de décision MoSCoW) |

Le besoin de **génération/export de quiz** reste valable ; la perturbation y **ajoute** une brique de **suivi pédagogique de classe**. On enrichit, on ne remplace pas.

---

## Fiche persona (6+ dimensions)

### 1. Identité & rôle
Mme Sophie Lefèvre, **42 ans**, professeure de Communication en **BTS** (lycée privé sous contrat, Lyon 6ᵉ). Encadre **28 étudiants** en BTS Communication 1ʳᵉ année. Mariée, 2 enfants (12 et 15 ans), ~2 700 € net/mois. Trajet voiture 25 min.
**Rôle produit :** utilisatrice enseignante qui veut désormais **piloter la révision de sa classe**, pas seulement produire des quiz.

### 2. Objectifs (jobs-to-be-done, SMART)
- Voir en un coup d'œil les **scores de ses 28 étudiants** après chaque quiz (vue classe), sans tableur manuel
- **Repérer les décrocheurs en ≤ 3 clics** (ex. score < 5/10 sur 2 quiz consécutifs)
- **Envoyer un conseil ciblé** à un étudiant en difficulté en moins de 5 minutes
- *(conservé)* Générer un quiz personnalisé sur n'importe quel chapitre en moins de 5 minutes
- *(conservé)* Exporter un quiz en Word/PDF imprimable en moins de 2 minutes

### 3. Besoins
- Un **dashboard enseignant** : score moyen de la classe, distribution, liste d'étudiants triable par score
- Une **mise en évidence des décrocheurs** (alerte visuelle, filtre « en difficulté »)
- Un **canal de feedback** pour adresser un message/conseil aux étudiants concernés
- Une **conformité RGPD** sur les données de ses 28 étudiants (cohérent avec l'angle local-first, lien avec la perturbation J3-bis)

### 4. Contraintes
- Réseau d'établissement lent (salle info en 4G partagée) → l'app doit rester fluide en conditions dégradées
- Pas d'ordinateur dédié en classe : laptop personnel branché au vidéoprojecteur
- ~12h/semaine déjà absorbées par cours + préparation + correction → **zéro temps pour apprendre un outil complexe**
- Données de 28 étudiants à manipuler → exigence RGPD non négociable (lien cible établissement / M. Chen)

### 5. Frustrations / pain points (chiffrés)
- Corrige 28 copies × 3 quiz/semaine = **~12h de correction par mois**
- Créer 1 quiz cohérent lui prend **~90 minutes** ; recréer des variantes anti-triche = **~2h/semaine perdues**
- Pour repérer un décrocheur aujourd'hui, elle **compile les notes à la main dans Excel (~30 min/semaine)**
- Les outils existants sont **non-pédagogiques** : ils résument, mais ne montrent jamais *qui* décroche
- Aucune visibilité sur l'engagement réel des étudiants entre deux cours

### 6. Expérience / niveau tech
- **À l'aise avec le numérique mais pas développeuse** : power user Word/Excel, autonome sur Moodle et Pronote
- A testé ChatGPT 2 fois ; **allergique aux installations en ligne de commande** → exige une interface zéro configuration
- Suit l'edtech via X/Twitter et la newsletter du Café Pédagogique

### 7. Critères de succès personnels (au point de vue persona)
- « Si je repère mes décrocheurs en 3 clics, j'utilise l'outil chaque semaine. »
- « Si je vois les scores de mes 28 sans ouvrir un tableur, c'est gagné. »
- « Si ça plante 1 fois en cours devant 28 ados, je n'y reviens jamais. »
- « Si je peux envoyer un conseil à un élève en difficulté sans quitter l'app, je le recommande à mes collègues. »

---

## Annexe — Matière pour les autres livrables J1

*À transmettre à l'équipe pour rester cohérent (les artefacts ci-dessous sont la responsabilité d'autres membres).*

### Pistes de user stories enseignant (format INVEST) → pour le Product Backlog (Antoine)
1. **US-E1** — En tant qu'enseignante, je veux voir le tableau des scores de mes 28 étudiants après un quiz, afin de repérer rapidement le niveau de la classe. — *MoSCoW : SHOULD*
2. **US-E2** — En tant qu'enseignante, je veux que l'app signale les étudiants sous 5/10 sur 2 quiz consécutifs, afin d'identifier les décrocheurs sans tableur. — *MoSCoW : SHOULD*
3. **US-E3** — En tant qu'enseignante, je veux envoyer un message de conseil à un étudiant en difficulté, afin de l'aider sans attendre le prochain cours. — *MoSCoW : COULD*

### Trame Customer Journey 5 étapes → pour Kyllian
Découverte (le sponsor lui parle de l'outil) → Adoption (1ʳᵉ génération de quiz pour sa classe) → Utilisation hebdomadaire (consultation du dashboard de scores) → Satisfaction / frustration (repère un décrocheur, ou bute sur le réseau lent) → Fidélisation (envoi de conseils, recommandation à ses collègues). Noter actions / pensées / émotions à chaque étape.

### Recommandation pour la note de décision MoSCoW
Position défendable : **cible enseignant en SHOULD pour la Release 1** (pas MUST). Les 6 MUST imposés (F1-F6) restent la priorité du MVP à livrer mercredi 17h45 ; les stories enseignant s'ajoutent en SHOULD car elles apportent une vraie valeur B2B mais ne doivent pas mettre en péril le socle étudiant. À argumenter par l'estimation en points et l'impact sur la capacité des sprints (c'est ce que le PO attend pour pouvoir négocier).
