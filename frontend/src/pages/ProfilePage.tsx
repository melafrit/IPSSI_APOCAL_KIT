/**
 * Page "Mon profil".
 *
 * Trois zones :
 *   1. Mes informations  : modifier prénom / nom / email
 *   2. Mot de passe       : changer son mot de passe (ancien requis)
 *   3. Zone de danger     : supprimer définitivement son compte
 *
 * [Note pédagogique] Changer son email = re-valider (le bandeau « email non
 * confirmé » réapparaîtra). La suppression est une action DESTRUCTIVE : on la
 * protège par une confirmation au mot de passe.
 *
 * [TODO J3-bis RGPD] Ajouter ici un bouton « Exporter mes données » (droit à la
 *   portabilité) — placeholder présent plus bas, à implémenter pendant la semaine.
 * [TODO J4] Ajouter un bouton « Signaler un contenu / un quiz » — placeholder.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { changePassword, deleteAccount, exportMyData, updateProfile } from '@/api/auth';
import { getApiErrorMessage } from '@/api/errors';

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // --- Zone 1 : informations ---
  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [infoErr, setInfoErr] = useState<string | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);

  // --- Zone 2 : mot de passe ---
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  // --- Zone 3 : suppression ---
  const [delPwd, setDelPwd] = useState('');
  const [delConfirm, setDelConfirm] = useState(false);
  const [delErr, setDelErr] = useState<string | null>(null);
  const [delLoading, setDelLoading] = useState(false);

  // --- Zone RGPD : export ---
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState<'personal' | 'usage' | 'all' | null>(null);
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const [exportErr, setExportErr] = useState<string | null>(null);

  const exportScopes = [
    ['personal', 'Informations personnelles'],
    ['usage', "Données d'utilisation de l'app"],
    ['all', 'Tout exporter'],
  ] as const;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        exportMenuRef.current &&
        event.target instanceof Node &&
        !exportMenuRef.current.contains(event.target)
      ) {
        setExportMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExportMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInfo = async (e: FormEvent) => {
    e.preventDefault();
    setInfoMsg(null);
    setInfoErr(null);
    setInfoLoading(true);
    try {
      await updateProfile({ first_name: firstName, last_name: lastName, email });
      await refresh();
      setInfoMsg('Profil mis à jour.');
    } catch (err) {
      setInfoErr(getApiErrorMessage(err, 'Mise à jour impossible.'));
    } finally {
      setInfoLoading(false);
    }
  };

  const handlePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    setPwdErr(null);
    if (newPwd !== confirmPwd) {
      setPwdErr('Les deux nouveaux mots de passe ne correspondent pas.');
      return;
    }
    setPwdLoading(true);
    try {
      const detail = await changePassword(oldPwd, newPwd);
      setPwdMsg(detail);
      setOldPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } catch (err) {
      setPwdErr(getApiErrorMessage(err, 'Changement de mot de passe impossible.'));
    } finally {
      setPwdLoading(false);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    setDelErr(null);
    setDelLoading(true);
    try {
      await deleteAccount(delPwd);
      await refresh(); // token effacé -> l'utilisateur passe à null
      navigate('/', { replace: true });
    } catch (err) {
      setDelErr(getApiErrorMessage(err, 'Suppression impossible.'));
      setDelLoading(false);
    }
  };

  const handleExport = async (scope: 'personal' | 'usage' | 'all') => {
    setExportErr(null);
    setExportMsg(null);
    setExportMenuOpen(false);
    setExportLoading(scope);
    try {
      const filename = await exportMyData(scope);
      setExportMsg(`Export téléchargé : ${filename}`);
    } catch (err) {
      setExportErr(getApiErrorMessage(err, "Export impossible pour l'instant."));
    } finally {
      setExportLoading(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>

      {/* Zone 1 : informations */}
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Mes informations</h2>
        {infoMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {infoMsg}
          </div>
        )}
        {infoErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {infoErr}
          </div>
        )}
        <form onSubmit={handleInfo} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email{' '}
              {user && !user.email_verified && (
                <span className="text-amber-600 font-normal">(non confirmé)</span>
              )}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <p className="text-xs text-slate-500 mt-1">
              Changer d'email nécessitera une nouvelle confirmation par mail.
            </p>
          </div>
          <button type="submit" disabled={infoLoading} className="btn-primary">
            {infoLoading ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </form>
      </section>

      {/* Zone 2 : mot de passe */}
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Changer mon mot de passe</h2>
        {pwdMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {pwdMsg}
          </div>
        )}
        {pwdErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {pwdErr}
          </div>
        )}
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mot de passe actuel
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className="input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirmer</label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <button type="submit" disabled={pwdLoading} className="btn-primary">
            {pwdLoading ? 'Modification…' : 'Modifier le mot de passe'}
          </button>
        </form>
      </section>

      {/* Placeholders RGPD / signalement (à compléter pendant la semaine) */}
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Mes données</h2>
        <p className="text-sm text-slate-500 mb-4">
          Téléchargez une copie de vos données personnelles dans le format de votre choix.
        </p>
        {exportMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {exportMsg}
          </div>
        )}
        {exportErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {exportErr}
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="relative w-full sm:w-[18rem]" ref={exportMenuRef}>
            <button
              type="button"
              onClick={() => setExportMenuOpen((value) => !value)}
              disabled={exportLoading !== null}
              className="btn-secondary w-full justify-between"
              aria-expanded={exportMenuOpen}
              aria-haspopup="menu"
            >
              <span>{exportLoading ? 'Export en cours…' : 'Exporter mes données'}</span>
              <span aria-hidden="true" className="text-xs">
                {exportMenuOpen ? '▴' : '▾'}
              </span>
            </button>
            {exportMenuOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
              >
                {exportScopes.map(([scope, label]) => (
                  <button
                    key={scope}
                    type="button"
                    role="menuitem"
                    onClick={() => handleExport(scope)}
                    disabled={exportLoading !== null}
                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            disabled
            title="À implémenter (J4) — signalement de contenu"
            className="btn-secondary w-full opacity-60 cursor-not-allowed sm:w-[18rem]"
          >
            Signaler un contenu (bientôt)
          </button>
        </div>
      </section>

      {/* Zone 3 : danger */}
      <section className="card border-2 border-rose-200">
        <h2 className="text-lg font-semibold text-rose-700 mb-2">Zone de danger</h2>
        <p className="text-sm text-slate-600 mb-4">
          La suppression de votre compte est <strong>définitive</strong> et efface toutes vos
          données (quiz, historique). Cette action est irréversible.
        </p>
        {delErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {delErr}
          </div>
        )}
        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirmez avec votre mot de passe
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={delPwd}
              onChange={(e) => setDelPwd(e.target.value)}
              className="input"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={delConfirm}
              onChange={(e) => setDelConfirm(e.target.checked)}
            />
            Je comprends que cette action est irréversible.
          </label>
          <button
            type="submit"
            disabled={delLoading || !delConfirm}
            className="px-4 py-2 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {delLoading ? 'Suppression…' : 'Supprimer définitivement mon compte'}
          </button>
        </form>
      </section>
    </div>
  );
}
