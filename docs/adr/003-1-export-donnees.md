# ADR-003-1 · Périmètre de l'export des données utilisateur

## Contexte

Le bouton d'export des données utilisateur a été ajouté dans la page profil afin de répondre au besoin de portabilité des données.

La question à trancher est le périmètre exact des données exportées. Il faut éviter un export trop large qui exposerait des données non utiles au compte, mais aussi un export trop restreint qui ne couvrirait pas les données réellement produites par l'utilisateur dans l'application.

## Options envisagées

* Exporter uniquement les informations de profil.
* Exporter uniquement les données d'utilisation de l'application.
* Exporter les informations personnelles et les données d'utilisation de l'application.
* Exporter l'ensemble des données techniques et applicatives du compte.

## Décision

Nous décidons que l'export des données utilisateur contient :

* les informations personnelles du compte ;
* les données d'utilisation de l'application liées à ce compte ;
* les quiz, cours, scores, réponses et métadonnées associées à ces quiz.

## Justification

Ce périmètre correspond au besoin réel de portabilité pour l'utilisateur.

Les informations personnelles permettent d'identifier le compte exporté et de conserver les données de base du profil. Les données d'utilisation de l'application constituent la production principale de l'application pour cet utilisateur, elles doivent donc être incluses dans l'export afin que celui-ci soit exploitable et réutilisable.

Limiter l'export à ces éléments évite d'exposer des données internes inutiles tout en respectant l'objectif fonctionnel du bouton.

## Conséquences

### Positives

* Export simple à comprendre pour l'utilisateur.
* Conformité plus claire avec la portabilité des données.
* Périmètre stable et facile à maintenir.

### Négatives

* L'export ne contient pas les données purement techniques ou de diagnostic.
* Si de nouveaux objets métier liés au compte apparaissent, il faudra réévaluer le périmètre d'export.

### À surveiller

* Ajouter au besoin les nouveaux objets métier liés au compte dans le même cadre de décision.
* Garder l'export cohérent dans son unique format `JSON`.

---

**Date :** 01/07/2026

**Statut :** Accepté
