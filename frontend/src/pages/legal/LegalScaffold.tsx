import type { ReactNode } from 'react';

export const REGLEMENTATION_URL = 'https://mohamedelafrit.com/teaching/Reglementation_des_Donnees';

export type LegalSection = {
  title: string;
  hint?: string;
  content?: ReactNode;
};

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
  completed?: boolean;
  lastUpdated?: string;
  children?: ReactNode;
};

export default function LegalScaffold({
  title,
  intro,
  sections,
  completed = false,
  lastUpdated,
  children,
}: Props) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">{intro}</p>

      {!completed && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-400 rounded text-sm text-amber-900 dark:text-amber-100">
          <p className="font-semibold mb-1">📝 Page à compléter par votre équipe</p>
          <p>
            Ce document est un <strong>modèle vierge</strong>. Remplacez chaque indication en
            italique par le contenu réel de votre projet. Besoin d'aide ?{' '}
            <a
              href={REGLEMENTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 dark:text-indigo-300 underline hover:no-underline font-medium"
            >
              Consultez le cours « Réglementation des données »
            </a>
            .
          </p>
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section, i) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {i + 1}. {section.title}
            </h2>
            {section.content ? (
              <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
                {section.content}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">À compléter — {section.hint}</p>
            )}
          </section>
        ))}
      </div>

      {children}

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        Dernière mise à jour : {lastUpdated ?? <em>à compléter</em>}. Document rédigé dans le cadre
        pédagogique APOCAL'IPSSI 2026 — Équipe 27.
      </p>
    </article>
  );
}
