import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listQuizzes, type QuizSummary } from '@/api/quizzes';

export default function HistoryPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pollHandle: ReturnType<typeof setInterval> | null = null;

    const fetchHistory = async () => {
      try {
        const res = await listQuizzes();
        if (!cancelled) {
          setQuizzes(res.results);
        }

        const hasInProgress = res.results.some(
          (q) => q.status === 'pending' || q.status === 'processing',
        );

        if (hasInProgress && !pollHandle) {
          pollHandle = setInterval(fetchHistory, 1500);
        }

        if (!hasInProgress && pollHandle) {
          clearInterval(pollHandle);
          pollHandle = null;
        }
      } catch {
        if (!cancelled) {
          setError("Impossible de charger l'historique.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      cancelled = true;
      if (pollHandle) {
        clearInterval(pollHandle);
      }
    };
  }, []);

  if (loading) return <p className="text-slate-500">Chargement…</p>;
  if (error) return <p className="text-rose-600">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mon historique</h1>
          <p className="text-slate-500 text-sm">
            {quizzes.length === 0
              ? "Aucun quiz pour l'instant — créez votre premier !"
              : `${quizzes.length} quiz au compteur.`}
          </p>
        </div>
        <Link to="/upload" className="btn-primary">
          + Nouveau quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-slate-600 mb-4">Pas encore de quiz dans votre historique.</p>
          <Link to="/upload" className="btn-primary">
            Créer mon premier quiz
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {quizzes.map((q) => (
            <Link
              key={q.id}
              to={`/quiz/${q.id}`}
              className="card hover:border-indigo-500 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-slate-500">
                  #{q.id} · {new Date(q.created_at).toLocaleDateString('fr-FR')}
                </span>
                {q.status === 'completed' && q.score !== null && (
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-sm font-bold ${
                      q.score >= 7
                        ? 'bg-emerald-100 text-emerald-700'
                        : q.score >= 4
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {q.score} / 10
                  </span>
                )}
                {q.status === 'completed' && q.score === null && (
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-mono">
                    pas encore passé
                  </span>
                )}
                {q.status === 'pending' && (
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-mono">
                    en file d'attente
                  </span>
                )}
                {q.status === 'processing' && (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-mono animate-pulse">
                    génération {Math.min(100, Math.max(0, q.progress_step * 20))}%
                  </span>
                )}
                {q.status === 'failed' && (
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-xs font-mono">
                    échec
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{q.title}</h3>
              <p className="text-sm text-slate-500">
                {q.nb_questions} question{q.nb_questions > 1 ? 's' : ''}
                {q.status !== 'completed' ? ' enregistrée(s) pour l’instant' : ''}
              </p>
              {q.status === 'failed' && q.error_message && (
                <p className="text-xs text-rose-700 mt-2 line-clamp-2">{q.error_message}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
