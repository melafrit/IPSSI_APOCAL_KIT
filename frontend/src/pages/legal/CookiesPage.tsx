/** Politique de gestion des cookies. */
import { REGLEMENTATION_URL } from './LegalScaffold';

export default function CookiesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Politique de gestion des cookies</h1>
      <p className="text-slate-600 mb-8">
        Les cookies et technologies de stockage utilisés par le site, et comment les gérer.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">1. Qu'est-ce qu'un cookie ?</h2>
          <p className="text-sm text-slate-700">
            Un cookie est un petit fichier texte déposé par un site sur votre navigateur lors de sa
            visite. Il permet au site de conserver des informations (préférences, état de connexion)
            d'une page à l'autre ou d'une visite à l'autre. Sur ce site, nous n'utilisons pas de
            cookies au sens strict : nous utilisons le <strong>stockage local du navigateur</strong>{' '}
            (<code className="bg-slate-100 px-1 rounded">localStorage</code>), qui fonctionne sur un
            principe similaire mais reste stocké uniquement en local, sans être envoyé
            automatiquement au serveur à chaque requête.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">2. Cookies et stockage utilisés</h2>
          <p className="text-sm text-slate-700 mb-2">Le site dépose deux éléments dans le stockage local de votre navigateur :</p>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li>
              <code className="bg-slate-100 px-1 rounded">apocal_token</code> — le jeton
              d'authentification qui vous garde connecté(e).
            </li>
            <li>
              <code className="bg-slate-100 px-1 rounded">theme</code> — votre préférence
              d'affichage (clair / sombre).
            </li>
          </ul>
          <p className="text-sm text-slate-700 mt-2">
            Aucun cookie tiers (publicité, réseaux sociaux, mesure d'audience externe) n'est déposé
            par ce site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">3. Finalité de chaque cookie</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li>
              <strong>apocal_token</strong> : strictement nécessaire au fonctionnement du site — il
              permet de vous identifier et de vous maintenir connecté(e) entre deux pages, sans avoir
              à ressaisir vos identifiants.
            </li>
            <li>
              <strong>theme</strong> : purement fonctionnel — il mémorise votre choix d'affichage
              pour vous l'appliquer automatiquement à votre prochaine visite.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">4. Consentement</h2>
          <p className="text-sm text-slate-700">
            Ces deux éléments sont des cookies/stockages <strong>strictement nécessaires</strong> au
            fonctionnement du service (authentification et préférence d'affichage). Conformément à la
            réglementation, les cookies strictement nécessaires ne requièrent pas de consentement
            préalable et ne sont donc pas soumis à une bannière de consentement. Aucun cookie non
            essentiel (publicité, mesure d'audience, réseaux sociaux) n'est utilisé par le site à ce
            jour.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">5. Durée de conservation</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            <li>
              <strong>apocal_token</strong> : conservé jusqu'à déconnexion volontaire, expiration du
              jeton côté serveur, ou suppression manuelle du stockage du navigateur.
            </li>
            <li>
              <strong>theme</strong> : conservé jusqu'à modification de votre préférence ou
              suppression manuelle du stockage du navigateur.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">6. Gérer ou refuser les cookies</h2>
          <p className="text-sm text-slate-700">
            Vous pouvez à tout moment supprimer ces données depuis les outils de développement de
            votre navigateur (Application / Stockage → Local Storage) ou en effaçant les données de
            navigation du site depuis les réglages de votre navigateur. Notez que la suppression du
            jeton <code className="bg-slate-100 px-1 rounded">apocal_token</code> vous déconnectera
            automatiquement du site.
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