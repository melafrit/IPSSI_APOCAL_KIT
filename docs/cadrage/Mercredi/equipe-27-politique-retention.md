# Politique de rétention des données — EduTutor IA (Équipe 27)

> Livrable perturbation J3-bis · APOCAL'IPSSI 2026 · Version 1.0 · 01/07/2026

---

## 1. Principes généraux

EduTutor IA applique trois principes fondamentaux du RGPD :

- **Minimisation** : seules les données strictement nécessaires au service sont collectées et conservées.
- **Limitation de la conservation** : chaque donnée a une durée de vie définie et ne peut être conservée au-delà.
- **Intégrité et confidentialité** : les données sont protégées contre tout accès non autorisé pendant toute leur durée de conservation.

À l'expiration des délais ci-dessous, les données sont **supprimées définitivement** ou **anonymisées de façon irréversible**.

---

## 2. Durées de conservation par catégorie

| Catégorie | Durée | Base légale (Art. 6 RGPD) | Action à échéance |
|---|---|---|---|
| Compte utilisateur actif | Tant que le compte existe | Exécution du contrat (Art. 6.1.b) | — |
| Compte supprimé par l'utilisateur | 30 jours (délai technique) | Intérêt légitime (Art. 6.1.f) | Suppression définitive |
| Quiz, réponses et scores | 3 ans après le dernier passage | Intérêt légitime (Art. 6.1.f) | Suppression |
| Cours déposés (PDF / texte) | 12 mois après dernière utilisation | Consentement (Art. 6.1.a) | Suppression |
| Logs techniques de connexion | 90 jours | Obligation légale (Art. 6.1.c) | Rotation / suppression |
| E-mails transactionnels (logs SMTP) | 12 mois | Obligation légale (Art. 6.1.c) | Suppression |
| Demandes d'accès SAR (DataRequest) | 3 ans | Obligation légale (Art. 6.1.c) | Suppression (prescription civile) |
| Signalements utilisateur | 3 ans | Obligation légale (Art. 6.1.c) | Suppression (prescription civile) |

---

## 3. Procédure de suppression

### 3.1 Suppression automatique
Une tâche planifiée (`cron job` / management command Django) s'exécute **chaque nuit** et identifie automatiquement les enregistrements dont la durée de conservation est expirée, puis les supprime de façon irréversible.

### 3.2 Suppression sur demande (Art. 17 RGPD — Droit à l'oubli)
L'utilisateur peut demander la suppression de ses données de deux façons :
1. **Via son espace profil** → bouton "Supprimer mon compte" (suppression immédiate).
2. **Via email** à contact@elafrit.com — délai de réponse : **30 jours maximum** (Art. 12 RGPD).

### 3.3 Export préalable à la suppression (Art. 20 RGPD — Droit à la portabilité)
Avant toute suppression, l'utilisateur peut récupérer l'intégralité de ses données via le bouton **"Exporter mes données"** (format JSON / CSV) disponible dans son espace profil.

---

## 4. Données non supprimées immédiatement

Les demandes d'accès SAR et les signalements sont conservés **3 ans** même après suppression du compte, conformément à la prescription civile française (Art. 2224 Code civil), afin de constituer une preuve de conformité en cas de litige avec la CNIL.

---

## 5. Contact

**Délégué à la Protection des Données (DPO fictif)** : contact@elafrit.com
Délai de réponse garanti : **1 mois maximum** (Art. 12 RGPD)

---

*Document produit dans le cadre du projet EduTutor IA — APOCAL'IPSSI 2026 — Équipe 27*
*Références légales : RGPD Art. 6, 12, 13, 17, 20 — Recommandations CNIL 2024*
