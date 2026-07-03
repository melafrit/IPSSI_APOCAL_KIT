import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '@/api/llm';
import { getQuiz } from '@/api/quizzes';
import { getApiErrorMessage } from '@/api/errors';

export default function UploadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<'pdf' | 'text'>('text');
  const [pdf, setPdf] = useState<File | null>(null);
  const [sourceText, setSourceText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // États pour le suivi de la progression asynchrone
  const [progressStep, setProgressStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed' | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadingStartedAtRef = useRef<number>(0);
  const pulseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ensureMinimumLoadingTime = async () => {
    const minVisibleDurationMs = 1200;
    const elapsed = Date.now() - loadingStartedAtRef.current;
    const waitMs = Math.max(0, minVisibleDurationMs - elapsed);
    if (waitMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    if (pulseRef.current) {
      clearInterval(pulseRef.current);
      pulseRef.current = null;
    }
  };

  const getProgressPercent = (step: number, qStatus: typeof status) => {
    if (qStatus === 'processing' && step === 3) {
      const elapsedSeconds = (Date.now() - loadingStartedAtRef.current) / 1000;
      return Math.min(85, 60 + Math.floor(elapsedSeconds * 3));
    }

    if (step === 1) return 20;
    if (step === 2) return 40;
    if (step === 3) return 60;
    if (step === 4) return 90;
    if (step === 5) return 100;
    return 10;
  };

  // Nettoyage de l'intervalle lors du démontage du composant
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  const startPolling = (quizId: number) => {
    const tick = async () => {
      try {
        const quiz = await getQuiz(quizId);
        const step = quiz.progress_step ?? 0;
        const qStatus = quiz.status ?? 'pending';

        if (qStatus === 'processing' && step === 3 && !pulseRef.current) {
          pulseRef.current = setInterval(() => {
            setProgressPercent((current) => Math.min(85, current + 1));
          }, 800);
        }

        if (!(qStatus === 'processing' && step === 3) && pulseRef.current) {
          clearInterval(pulseRef.current);
          pulseRef.current = null;
        }

        setProgressStep(step);
        setProgressPercent(getProgressPercent(step, qStatus));
        setStatus(qStatus);

        if (qStatus === 'completed') {
          stopPolling();
          await ensureMinimumLoadingTime();
          navigate(`/quiz/${quizId}`);
        } else if (qStatus === 'failed') {
          stopPolling();
          setError(quiz.error_message || 'Échec de la génération du quiz.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Erreur lors du polling du statut du quiz:', err);
      }
    };

    tick();
    pollingRef.current = setInterval(tick, 1000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    loadingStartedAtRef.current = Date.now();
    setProgressStep(1);
    setProgressPercent(10);
    setStatus('pending');
    
    try {
      const quiz = await generateQuiz({
        title,
        pdf: mode === 'pdf' ? (pdf ?? undefined) : undefined,
        source_text: mode === 'text' ? sourceText : undefined,
      });
      startPolling(quiz.id);
    } catch (err) {
      stopPolling();
      setError(getApiErrorMessage(err, 'Échec de la génération.'));
      setLoading(false);
    }
  };

  if (loading) {
    const steps = [
      { num: 1, label: 'Extraction et préparation du texte' },
      { num: 2, label: 'Analyse du cours par l\'IA' },
      { num: 3, label: 'Génération des 10 questions (Llama 3.2)' },
      { num: 4, label: 'Validation et enregistrement du quiz' },
      { num: 5, label: 'Finalisation' },
    ];

    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="card space-y-8 p-8 text-center bg-white shadow-xl border border-slate-100 rounded-2xl">
          {/* En-tête */}
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Création de votre quiz en cours
            </h2>
            <p className="text-slate-500 text-sm">
              L'intelligence artificielle analyse votre cours et rédige des questions personnalisées.
            </p>
          </div>

          {/* Logo animé */}
          <div className="relative flex items-center justify-center h-20 w-20 mx-auto">
            <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-indigo-400 opacity-25"></span>
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 border border-indigo-100 text-2xl">
              🤖
            </div>
          </div>

          {/* Barre de progression */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 px-1">
              <span>Progression</span>
              <span className="text-indigo-600 font-mono text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50">
              <div
                className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full transition-all duration-500 ease-out shadow-inner"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Liste des étapes */}
          <div className="text-left space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Étapes de génération
            </h3>
            <div className="space-y-3">
              {steps.map((s) => {
                const isCompleted = progressStep > s.num || status === 'completed';
                const isActive = progressStep === s.num && status !== 'completed' && status !== 'failed';
                
                let icon = '⚪';
                let textClass = 'text-slate-400';
                if (isCompleted) {
                  icon = '🟢';
                  textClass = 'text-slate-700 font-medium line-through decoration-slate-300';
                } else if (isActive) {
                  icon = '⚡';
                  textClass = 'text-indigo-600 font-semibold animate-pulse';
                }

                return (
                  <div key={s.num} className="flex items-center gap-3 text-sm transition-all duration-300">
                    <span className="flex-shrink-0 text-lg leading-none">{icon}</span>
                    <span className={textClass}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            La génération dure environ 5 secondes avec un modèle cloud, ou jusqu'à 3 minutes en local sur CPU.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Créer un nouveau quiz</h1>
      <p className="text-slate-600 mb-6">
        Uploade un PDF ou colle un texte. EduTutor IA génère 10 questions QCM.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Titre du cours</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Histoire — Révolution française"
            className="input"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setMode('text')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📝 Texte collé
            </button>
            <button
              type="button"
              onClick={() => setMode('pdf')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📄 PDF
            </button>
          </div>

          {mode === 'text' ? (
            <textarea
              required
              rows={10}
              minLength={200}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Collez ici le texte de votre cours (au moins 200 caractères)…"
              className="input"
            />
          ) : (
            <input
              type="file"
              accept=".pdf,application/pdf"
              required
              onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
              className="input"
            />
          )}
          {mode === 'text' && (
            <p className="text-xs text-slate-500 mt-1">
              {sourceText.length} / 200 caractères minimum
            </p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          🚀 Générer le quiz
        </button>

        <p className="text-xs text-slate-500 text-center">
          La génération peut prendre de 1 à 5 minutes selon votre machine (bien plus rapide avec un
          GPU ou un modèle cloud).
        </p>
      </form>
    </div>
  );
}
