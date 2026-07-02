# Note de décision MoSCoW — Perturbation J1 (persona Mme Lefèvre)

**Auteur** : Équipe 05 (Valentin LOUVET · Amine KAOUTAR · Erwann HILLION · Alexandre BONJOUR · Evan AFONSO · Bastien ROUVIERE · Aya SGHAIER)
**Date** : 30/06/2026
**Version** : v1.0
**Statut** : En revue PO

## Contexte

Le sponsor a introduit lors de la perturbation J1 un persona secondaire : **Mme Sophie Lefèvre**, 42 ans, professeure BTS Communication à Lyon (28 étudiants). Besoin exprimé : *« suivre la progression des élèves en révision, identifier les décrocheurs, leur envoyer des conseils personnalisés »*.

La question posée à l'équipe : **le scope enseignant doit-il être MUST, SHOULD ou COULD pour la Release 1 (MVP, mercredi 17h45) ?**

## Décision retenue : **SHOULD pour la Release 2**

L'équipe priorise les 3 nouvelles stories enseignant comme suit :

| Story | Priorité | Sprint | Justification |
|-------|----------|--------|---------------|
| US-21 Dashboard classe | **SHOULD** | S6 (jeudi AM) | Valeur sponsor forte, complexité modérée (13 SP), réutilise le modèle d'historique de F6 |
| US-22 Filtrer & marquer | **SHOULD** | S6 (jeudi AM) | Indispensable pour matérialiser le « repérage décrocheurs » demandé par Mme Lefèvre |
| US-23 Message template | **COULD** | S7 (jeudi PM) | « Conseils personnalisés » est secondaire au repérage ; à traiter si vélocité réelle ≥ 8 SP au sprint 6 |

## Analyse capacité

- **Scope initial Release 1** : 6 MUST (F1-F6) = ~25 SP sur sprints S1-S5 (capacité ~133 h-pers).
- **Vélocité cible** : 8-10 SP / sprint demi-journée (cf. release-planning.xlsx).
- **Ajout enseignant en MUST** = +29 SP soit ~3 sprints supplémentaires, **impossible** sans dépriorisation d'une feature MVP. Or les 6 MUST sont contractuelles avec le PO.
- **Décision** : aucune story F1-F6 n'est dépriorisée. Le scope enseignant est embarqué en Release 2 (sprints 6-7, jeudi).

## Rationale du choix « SHOULD » (vs MUST / COULD)

**Pourquoi pas MUST** : la cible enseignant émerge ce lundi soir, sans validation marché, sans engagement contractuel d'un établissement. L'embarquer en MVP ferait sauter au moins 1 feature étudiant (F6 historique ou F5 détail score), ce qui casse la démo Release 1 et la valeur perçue auprès de la cible primaire (étudiants, 2,7M en France).

**Pourquoi pas COULD** : un signal aussi fort du sponsor (introduction d'un nouveau persona avec un usage précis) mérite mieux qu'un « nice-to-have ». SHOULD = engagement à livrer en R2, à confirmer en revue Sprint 5.

**Pourquoi SHOULD** : l'équipe s'engage sur 2 stories (US-21, US-22) en R2 pour matérialiser la prise en compte du persona, en gardant US-23 en marge selon vélocité observée. Les 3 stories restent visibles dans le backlog avec critères d'acceptation INVEST.

## Impacts traçables

**Convention de dépôt** : les artefacts de cadrage v1.0 dans `docs/cadrage/` restent intacts. Les versions v2.0 issues de la perturbation J1 vivent dans le présent dossier `docs/perturbations/j1/`.

- `./product-backlog.xlsx` v2.0 — +3 stories (US-21, US-22, US-23), TOTAL 137 → 166 SP, statut « En revue PO ».
- `./story-map.xlsx` v2.0 — US-21/22 ajoutés en SHOULD, US-23 en COULD, colonne « Consulter résultats ».
- `./product-backlog-change-log.md` — change log v2.0.
- `docs/cadrage/persona.docx` et `customer-journey.docx` : **non touchés** (Mme Lefèvre déjà présente dès v1.0).
- `docs/cadrage/release-planning.xlsx` : **non touché**, S6-S7 disposent de 45,5 h-pers > 21 SP estimés.
- `docs/cadrage/sprint-backlog.xlsx` Sprint 1 : **non touché** (focus F1 + F2 conservé).

## Critères de réévaluation

Cette décision sera ré-arbitrée :
- À la Sprint Review de S5 (mercredi 17h45) : si l'équipe a une marge ≥ 5 SP, on peut tirer US-22 plus tôt.
- À J4 (jeudi matin) : si Mme Lefèvre remonte des erreurs factuelles graves (post-mortem), une story de fiabilisation pourrait passer devant US-23.

## Validation

| Rôle | Nom | Décision |
|------|-----|----------|
| Product Owner (externe) | _à renseigner_ | _en attente revue_ |
| Scrum Master | _à désigner en équipe_ | _en attente revue_ |
| Équipe (7 membres) | Équipe 05 | ✅ Consensus atteint en cadrage J1, 30/06/2026 |
