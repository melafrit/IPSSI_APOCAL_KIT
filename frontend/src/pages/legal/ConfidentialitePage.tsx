/** Politique de conservation des données personnelles. */
export default function ConfidentialitePage() {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Politique de conservation des données</h1>
        <p className="text-slate-600">
          Cette page résume les durées de conservation appliquées par EduTutor IA, les motifs
          juridiques associés et les modalités de suppression prévues par le RGPD.
        </p>
      </header>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">1. Durées de conservation</h2>
        <p className="text-slate-600">
          Les données de compte sont conservées tant que le compte reste actif. Les quiz, réponses et
          scores sont conservés jusqu’à la suppression du compte ou à une demande d’effacement.
          Les demandes SAR et leur audit trail sont conservées 3 ans pour démontrer la conformité.
          Les journaux techniques utiles à la sécurité sont conservés 12 mois maximum.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">2. Motifs juridiques</h2>
        <p className="text-slate-600">
          Le traitement repose principalement sur l’exécution du contrat de service (création de
          compte, génération de quiz, suivi de progression), le consentement lorsque l’utilisateur
          envoie du contenu à analyser, l’intérêt légitime pour la sécurité et la prévention des abus,
          et l’obligation légale pour répondre aux demandes RGPD.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">3. Suppression et exercice des droits</h2>
        <p className="text-slate-600">
          Les demandes d’effacement sont traitées via le compte utilisateur ou par contact direct
          avec le DPO fictif. Lorsque la suppression est recevable, les données sont effacées ou
          anonymisées, sauf conservation imposée par une obligation légale. Les droits d’accès,
          rectification, limitation, opposition et portabilité sont rappelés dans la réponse SAR et
          peuvent être exercés à l’adresse dpo@edututor-ia.local.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="text-slate-600">
          Référent données fictif : DPO EduTutor IA, dpo@edututor-ia.local. En cas de doute, un
          utilisateur peut également écrire à support@edututor-ia.local pour obtenir une copie de ses
          données ou signaler une erreur de traitement.
        </p>
      </section>
    </article>
  );
}
