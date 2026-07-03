/**
 * Mentions légales.
 */
import { REGLEMENTATION_URL } from './LegalScaffold';

export default function MentionsLegalesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Mentions légales</h1>
      <p className="text-slate-600 mb-8">
        Informations légales obligatoires identifiant l'éditeur et l'hébergeur du site.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">1. Éditeur du site</h2>
          <p className="text-sm text-slate-700">
            Le site EduTutor IA est édité, dans le cadre d'un projet pédagogique de la formation
            Bachelor DEV d'IPSSI, par : <strong>Equipe 2: Krishmini KULAKRISHNA, Danielle Jamila KOAGNE NGANKAM, Ousmane NDIAYE, Houda OUADAH, Mohammed DERKAOUI, Wicramachine SERGIO</strong>.
            <br />
            Statut : projet étudiant réalisé dans un cadre pédagogique (non commercial).
            <br />
            Adresse : [adresse du siège].
            <br />
            Email de contact : [adresse email de contact].
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">2. Directeur de la publication</h2>
          <p className="text-sm text-slate-700">
            Le directeur de la publication est <strong>Mohammed DERKAOUI</strong>,
            en sa qualité de représentant de l'équipe projet.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">3. Hébergeur</h2>
          <p className="text-sm text-slate-700">
            Le site est hébergé par : <strong>[Nom de l'hébergeur]</strong>
            <br />
            Adresse : [Adresse de l'hébergeur]
            <br />
            Téléphone : [Téléphone de l'hébergeur]
            <br />
            
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">4. Propriété intellectuelle</h2>
          <p className="text-sm text-slate-700">
            L'ensemble du contenu de ce site (textes, structure, code source, interface graphique)
            est réalisé par l'équipe projet dans le cadre de la formation Bachelor DEV d'IPSSI et
            reste la propriété de ses auteurs, sauf mention contraire. Toute reproduction, même
            partielle, à des fins autres que pédagogiques est interdite sans autorisation préalable.
            Le site peut s'appuyer sur des bibliothèques open source tierces, chacune régie par sa
            propre licence.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">5. Contact</h2>
          <p className="text-sm text-slate-700">
            Pour toute question relative au site, à son contenu ou à vos données personnelles, vous
            pouvez nous contacter à l'adresse suivante : <strong>[adresse email de contact]</strong>.
          </p>
        </section>
      </div>

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200">
        Pour en savoir plus sur vos droits et la réglementation applicable, consultez le{' '}
        <a
          href={REGLEMENTATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 underline hover:no-underline"
        >
          cours « Réglementation des données »
        </a>
        . Dernière mise à jour : à adapter selon la date de mise en ligne du site.
      </p>
    </article>
  );
}