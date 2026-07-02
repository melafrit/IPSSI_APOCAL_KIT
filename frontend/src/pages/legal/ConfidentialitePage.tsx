import { Link } from 'react-router-dom';
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Responsable du traitement',
    content: (
      <>
        <p>
          Le responsable du traitement des données personnelles est <strong>EduTutor IA</strong>,
          édité par l&apos;équipe 27 dans le cadre du projet pédagogique APOCAL&apos;IPSSI 2026.
        </p>
        <p>
          Contact données personnelles :{' '}
          <a href="mailto:contact@elafrit.com" className="text-indigo-600 underline">
            contact@elafrit.com
          </a>
        </p>
      </>
    ),
  },
  {
    title: 'Données personnelles collectées',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Identité et compte</strong> : adresse e-mail (identifiant), prénom, nom de famille.
        </li>
        <li>
          <strong>Contenus pédagogiques</strong> : textes collés ou fichiers PDF de cours (≤ 5 Mo)
          fournis pour générer des quiz.
        </li>
        <li>
          <strong>Activité</strong> : titres de quiz, questions générées, réponses soumises, scores
          et dates de passage.
        </li>
        <li>
          <strong>Technique</strong> : logs techniques minimaux (horodatage, erreurs) pour la
          sécurité et le bon fonctionnement du service.
        </li>
      </ul>
    ),
  },
  {
    title: 'Finalités du traitement',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Créer et gérer votre compte utilisateur (inscription, connexion, profil).</li>
        <li>Générer des quiz de révision à partir de vos supports de cours.</li>
        <li>Corriger vos réponses et afficher votre score ainsi que votre historique.</li>
        <li>Envoyer les e-mails transactionnels (validation de compte, réinitialisation de mot de passe).</li>
        <li>Assurer la sécurité du service et répondre à vos demandes liées au RGPD.</li>
      </ul>
    ),
  },
  {
    title: 'Base légale',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Exécution du contrat</strong> (art. 6.1.b RGPD) : fourniture du service EduTutor IA.
        </li>
        <li>
          <strong>Consentement</strong> (art. 6.1.a) : inscription et dépôt volontaire de contenus de
          cours.
        </li>
        <li>
          <strong>Intérêt légitime</strong> (art. 6.1.f) : sécurité, prévention des abus et amélioration
          technique du service.
        </li>
      </ul>
    ),
  },
  {
    title: 'Durée de conservation',
    content: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Compte actif</strong> : conservé tant que le compte existe.
          </li>
          <li>
            <strong>Quiz et historique</strong> : conservés 3 ans après le dernier passage, puis
            supprimés.
          </li>
          <li>
            <strong>Cours déposés (PDF / texte)</strong> : conservés 12 mois après la dernière
            utilisation, puis supprimés.
          </li>
          <li>
            <strong>Compte supprimé</strong> : données effacées sous 30 jours (sauf obligation légale
            de conservation).
          </li>
        </ul>
        <p className="mt-2">
          Politique détaillée : voir <code className="text-xs">docs/legal/politique-retention.md</code>{' '}
          dans le dépôt GitHub de l&apos;équipe.
        </p>
      </>
    ),
  },
  {
    title: 'Destinataires des données',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>L&apos;équipe technique habilitée d&apos;EduTutor IA (accès restreint).</li>
        <li>
          <strong>Ollama</strong> (modèle LLM local) : traitement des textes de cours sur le serveur
          hébergeant l&apos;application — les données ne sont pas envoyées à un fournisseur cloud
          externe en configuration par défaut.
        </li>
        <li>
          <strong>Brevo</strong> : envoi des e-mails transactionnels (adresse e-mail uniquement).
        </li>
        <li>Hébergeur du serveur (OVH ou environnement de démonstration pédagogique).</li>
      </ul>
    ),
  },
  {
    title: 'Transferts hors UE',
    content: (
      <p>
        En configuration par défaut (<strong>Ollama local</strong>), les contenus de cours et les
        données de compte sont traités au sein de l&apos;infrastructure de l&apos;éditeur, sans
        transfert vers des pays tiers. Si un autre fournisseur LLM cloud est activé (OpenAI, etc.),
        un transfert hors UE peut intervenir : dans ce cas, l&apos;équipe documente le choix dans un
        ADR et informe les utilisateurs avant activation.
      </p>
    ),
  },
  {
    title: 'Vos droits',
    content: (
      <>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            <strong>Accès</strong> et <strong>portabilité</strong> : export de vos données depuis la
            page Profil (bouton « Exporter mes données »).
          </li>
          <li>
            <strong>Rectification</strong> : modification de vos informations depuis la page Profil.
          </li>
          <li>
            <strong>Effacement</strong> : suppression de votre compte depuis la page Profil.
          </li>
          <li>
            <strong>Opposition</strong> et <strong>limitation</strong> : sur demande par e-mail.
          </li>
        </ul>
        <p className="mt-2">
          Délai de réponse : <strong>1 mois</strong> maximum à compter de la réception de votre
          demande.
        </p>
      </>
    ),
  },
  {
    title: 'Cookies',
    content: (
      <p>
        EduTutor IA utilise des cookies strictement nécessaires au fonctionnement (session
        d&apos;authentification) et, le cas échéant, la préférence de thème (clair / sombre). Pour
        plus de détails, consultez notre{' '}
        <Link to="/legal/cookies" className="text-indigo-600 underline">
          politique de cookies
        </Link>
        .
      </p>
    ),
  },
  {
    title: 'Contact & réclamation',
    content: (
      <>
        <p>
          Pour toute question relative à vos données personnelles :{' '}
          <a href="mailto:contact@elafrit.com" className="text-indigo-600 underline">
            contact@elafrit.com
          </a>
        </p>
        <p className="mt-2">
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
          auprès de la{' '}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            CNIL
          </a>
          .
        </p>
      </>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalScaffold
      title="Politique de confidentialité"
      intro="Comment les données personnelles des utilisateurs d'EduTutor IA sont collectées, utilisées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD)."
      sections={SECTIONS}
      completed
      lastUpdated="1 juillet 2026"
    />
  );
}
