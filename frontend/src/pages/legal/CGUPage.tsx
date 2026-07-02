/**
 * Conditions Générales d'Utilisation.
 *
 * ⚠️ Les valeurs entre crochets [ ] sont des informations que seule votre
 * équipe connaît (juridiction, contact). Remplacez-les avant mise en ligne.
 */
import { REGLEMENTATION_URL } from './LegalScaffold';

export default function CGUPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Conditions Générales d'Utilisation</h1>
      <p className="text-slate-600 mb-8">
        Les règles d'utilisation du service EduTutor IA, acceptées par chaque utilisateur.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">1. Objet</h2>
          <p className="text-sm text-slate-700">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et
            l'utilisation du service <strong>EduTutor IA</strong>, une plateforme permettant à un
            utilisateur de déposer un document (PDF ou texte), de générer automatiquement un quiz à
            partir de ce contenu grâce à un modèle d'intelligence artificielle, de répondre à ce quiz
            et de suivre sa progression dans le temps. Le service propose également un espace
            enseignant permettant de suivre les élèves et de leur adresser des suggestions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">2. Acceptation des conditions</h2>
          <p className="text-sm text-slate-700">
            La création d'un compte et l'utilisation du service impliquent l'acceptation pleine et
            entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas
            utiliser le service. Ces CGU sont accessibles à tout moment depuis le pied de page du
            site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">3. Accès au service</h2>
          <p className="text-sm text-slate-700">
            Le service est accessible depuis un navigateur web disposant d'une connexion Internet.
            Certaines fonctionnalités (génération de quiz, dépôt de documents, historique, espace
            enseignant) nécessitent d'être connecté(e) à un compte. L'accès peut être temporairement
            interrompu pour maintenance, mise à jour, ou en cas de panne, sans que la responsabilité
            de l'éditeur puisse être engagée. Le service est fourni dans le cadre d'un projet
            pédagogique et ne fait l'objet d'aucune garantie de disponibilité continue.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">4. Compte utilisateur</h2>
          <p className="text-sm text-slate-700">
            La création d'un compte se fait par adresse email et mot de passe, avec confirmation de
            l'adresse email par un lien envoyé automatiquement. Vous êtes seul(e) responsable de la
            confidentialité de votre mot de passe et de toute activité effectuée depuis votre compte.
            Vous vous engagez à fournir des informations exactes lors de l'inscription et à informer
            l'éditeur en cas d'utilisation non autorisée de votre compte. Un compte peut avoir l'un
            des rôles suivants : élève, enseignant, ou administrateur, chacun disposant de
            fonctionnalités différentes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">5. Comportements interdits</h2>
          <p className="text-sm text-slate-700 mb-2">Il est interdit d'utiliser le service pour :</p>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li>déposer des contenus illicites, offensants, diffamatoires ou protégés par des droits dont vous ne détenez pas les droits ;</li>
            <li>tenter de contourner les mesures de sécurité, d'accéder à des comptes ou données d'autres utilisateurs, ou de perturber le fonctionnement du service ;</li>
            <li>utiliser le service à des fins commerciales ou dans un cadre autre que pédagogique, sans autorisation ;</li>
            <li>usurper l'identité d'un tiers ou fournir de fausses informations lors de l'inscription.</li>
          </ul>
          <p className="text-sm text-slate-700 mt-2">
            Tout manquement peut entraîner la suspension ou la suppression du compte concerné.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">6. Contenu généré par IA</h2>
          <p className="text-sm text-slate-700">
            Les quiz proposés sur la plateforme sont générés automatiquement par un modèle
            d'intelligence artificielle à partir des documents que vous fournissez. Ce contenu est
            fourni <strong>« en l'état »</strong> : malgré les vérifications mises en place, les
            questions, réponses ou corrections générées peuvent contenir des erreurs, imprécisions ou
            approximations. Il appartient à l'utilisateur de faire preuve d'esprit critique face aux
            contenus générés et de ne pas les considérer comme une source pédagogique faisant
            autorité à elle seule.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">7. Responsabilité</h2>
          <p className="text-sm text-slate-700">
            Le service est fourni dans le cadre d'un projet étudiant réalisé à des fins pédagogiques,
            sans garantie de résultat, de disponibilité ou d'absence d'erreur. L'éditeur ne saurait
            être tenu responsable des dommages directs ou indirects résultant de l'utilisation du
            service, de l'indisponibilité de celui-ci, ou de l'exactitude des contenus générés par
            l'IA. L'utilisateur reste responsable des documents qu'il dépose et de l'usage qu'il fait
            du service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">8. Propriété intellectuelle</h2>
          <p className="text-sm text-slate-700">
            La structure du site, son code source, son design et sa marque sont la propriété de
            l'équipe projet, sauf mention contraire (voir les{' '}
            <a href="/legal/mentions-legales" className="text-indigo-700 underline hover:no-underline">
              mentions légales
            </a>
            ). Les documents que vous déposez (PDF, textes) restent votre propriété : vous garantissez
            disposer des droits nécessaires pour les utiliser sur le service et en autorisez le
            traitement par l'IA dans le seul but de générer votre quiz. Les quiz générés à partir de
            vos documents vous sont mis à disposition pour votre usage personnel dans le cadre du
            service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">9. Modification des CGU</h2>
          <p className="text-sm text-slate-700">
            L'éditeur se réserve le droit de modifier les présentes CGU à tout moment, notamment pour
            les adapter aux évolutions du service ou de la réglementation. Les utilisateurs seront
            informés de toute modification substantielle. La poursuite de l'utilisation du service
            après modification vaut acceptation des nouvelles CGU.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">10. Droit applicable et litiges</h2>
          <p className="text-sm text-slate-700">
            Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de
            résolution amiable, les tribunaux compétents seront ceux du ressort de{' '}
            <strong>[ville / juridiction compétente]</strong>.
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