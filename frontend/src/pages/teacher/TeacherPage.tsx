import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { createTeacherSuggestion, getTeacherStudent, listTeacherStudents, type TeacherStudentSummary } from '@/api/teacher';
import { getApiErrorMessage } from '@/api/errors';

function scoreBadge(score: number | null): string {
  if (score === null) return 'bg-slate-100 text-slate-500';
  if (score >= 7) return 'bg-emerald-100 text-emerald-700';
  if (score >= 4) return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

export default function TeacherPage() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState<TeacherStudentSummary[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudentSummary | null>(null);
  const [studentSuggestions, setStudentSuggestions] = useState(
    [] as Awaited<ReturnType<typeof getTeacherStudent>>['suggestions'],
  );
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formMessageState, setFormMessageState] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listTeacherStudents(query)
      .then((data) => {
        setStudents(data.students);
        setSelectedId((current) =>
          data.students.some((student) => student.id === current) ? current : data.students[0]?.id ?? null,
        );
      })
      .catch((err) => setError(getApiErrorMessage(err, 'Impossible de charger les élèves.')))
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedStudent(null);
      setStudentSuggestions([]);
      return;
    }

    setDetailLoading(true);
    getTeacherStudent(selectedId)
      .then((data) => {
        setSelectedStudent(data.student);
        setStudentSuggestions(data.suggestions);
        setFormTitle(`Suggestion pour ${data.student.name}`);
        setFormMessage('');
      })
      .catch((err) => setError(getApiErrorMessage(err, 'Impossible de charger le détail.')))
      .finally(() => setDetailLoading(false));
  }, [selectedId]);

  const selectedSummary = useMemo(
    () => students.find((student) => student.id === selectedId) ?? selectedStudent,
    [selectedId, selectedStudent, students],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedId) return;
    setFormMessageState(null);
    try {
      const suggestion = await createTeacherSuggestion(selectedId, {
        title: formTitle,
        message: formMessage,
      });
      setStudentSuggestions((current) => [suggestion, ...current]);
      setSelectedStudent((current) =>
        current ? { ...current, suggestions_count: current.suggestions_count + 1 } : current,
      );
      setFormMessageState('Suggestion enregistrée.');
      setFormMessage('');
    } catch (err) {
      setFormMessageState(getApiErrorMessage(err, 'Impossible d’enregistrer la suggestion.'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-indigo-50 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Espace professeur
            </p>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Identifier les lacunes et guider les élèves</h1>
            <p className="text-slate-600 mt-3 max-w-2xl">
              Sélectionnez un élève, inspectez ses scores, ses erreurs récurrentes et laissez une
              recommandation ciblée pour l’aider à progresser.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/80 border border-slate-200 px-4 py-3">
              <div className="text-slate-500">Élèves</div>
              <div className="text-2xl font-bold text-slate-900">{students.length}</div>
            </div>
            <div className="rounded-2xl bg-white/80 border border-slate-200 px-4 py-3">
              <div className="text-slate-500">Sélection</div>
              <div className="text-2xl font-bold text-slate-900">{selectedId ?? '—'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <section className="card space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Liste des élèves</h2>
              <p className="text-sm text-slate-500">Classement par niveau de performance.</p>
            </div>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un élève"
              className="input max-w-full w-full md:w-56"
            />
          </div>

          {loading ? (
            <p className="text-slate-500">Chargement…</p>
          ) : error ? (
            <p className="text-rose-600">{error}</p>
          ) : students.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
              Aucun élève trouvé pour cette recherche.
            </div>
          ) : (
            <div className="space-y-3 max-h-[34rem] overflow-auto pr-1">
              {students.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => setSelectedId(student.id)}
                  className={`w-full text-left rounded-2xl border p-4 transition ${
                    selectedId === student.id
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-slate-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.email}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${scoreBadge(student.average_score)}`}>
                      {student.average_score !== null ? `${student.average_score}/10` : '—'}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-500">
                    <span>{student.quizzes_taken} quiz</span>
                    <span>{student.mistakes_count} erreurs</span>
                    <span>{student.suggestions_count} note{student.suggestions_count > 1 ? 's' : ''}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-6">
          <div className="card">
            {detailLoading || !selectedSummary ? (
              <p className="text-slate-500">Chargement du détail…</p>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                  <div>
                    <p className="text-sm text-slate-500">Élève sélectionné</p>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedSummary.name}</h2>
                    <p className="text-sm text-slate-500">{selectedSummary.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Metric label="Moyenne" value={selectedSummary.average_score !== null ? `${selectedSummary.average_score}/10` : '—'} />
                    <Metric label="Précision" value={selectedSummary.accuracy !== null ? `${selectedSummary.accuracy}%` : '—'} />
                    <Metric label="Dernier score" value={selectedSummary.last_score !== null ? `${selectedSummary.last_score}/10` : '—'} />
                    <Metric label="Erreurs" value={String(selectedSummary.mistakes_count)} />
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900 mb-3">Lacunes repérées</h3>
                    {selectedSummary.recent_mistakes.length === 0 ? (
                      <p className="text-sm text-slate-500">Aucune erreur enregistrée.</p>
                    ) : (
                      <ul className="space-y-3">
                        {selectedSummary.recent_mistakes.map((mistake) => (
                          <li key={`${mistake.quiz_id}-${mistake.index}`} className="rounded-xl bg-slate-50 p-3">
                            <div className="text-xs text-slate-500">Quiz #{mistake.quiz_id} · Question {mistake.index}</div>
                            <div className="text-sm text-slate-800 mt-1">{mistake.prompt}</div>
                            <div className="text-xs text-slate-500 mt-1">{mistake.quiz_title}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900 mb-3">Quiz à renforcer</h3>
                    {selectedSummary.weak_quizzes.length === 0 ? (
                      <p className="text-sm text-slate-500">Aucun quiz terminé pour le moment.</p>
                    ) : (
                      <ul className="space-y-3">
                        {selectedSummary.weak_quizzes.map((quiz) => (
                          <li key={quiz.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                            <div>
                              <div className="text-sm font-medium text-slate-900">{quiz.title}</div>
                              <div className="text-xs text-slate-500">Quiz #{quiz.id}</div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${scoreBadge(quiz.score)}`}>
                              {quiz.score !== null ? `${quiz.score}/10` : '—'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Recommandations envoyées</h3>
              {studentSuggestions.length === 0 ? (
                <p className="text-sm text-slate-500">Aucune suggestion pour cet élève.</p>
              ) : (
                <div className="space-y-3">
                  {studentSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h4 className="font-medium text-slate-900">{suggestion.title}</h4>
                        <span className="text-xs text-slate-400">
                          {new Date(suggestion.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">{suggestion.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="card">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Envoyer une suggestion</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(event) => setFormTitle(event.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formMessage}
                    onChange={(event) => setFormMessage(event.target.value)}
                    className="input resize-y"
                    placeholder="Expliquez la lacune, la méthode de travail et une action concrète à faire avant le prochain quiz."
                  />
                </div>
                {formMessageState && <p className="text-sm text-slate-600">{formMessageState}</p>}
                <button type="submit" disabled={!selectedId} className="btn-primary w-full">
                  Envoyer à l'élève sélectionné
                </button>
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-200 px-3 py-2 min-w-24">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}