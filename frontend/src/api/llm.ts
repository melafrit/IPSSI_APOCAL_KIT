import { api } from './client';
import type { Quiz } from './quizzes';

export type LLMPing = {
  backend: 'ollama' | 'mock';
  model: string;
  ollama_alive: boolean;
  model_loaded?: boolean;
  message: string;
};

export async function ping(): Promise<LLMPing> {
  const { data } = await api.get<LLMPing>('/llm/ping/');
  return data;
}

/**
 * Lance la génération d'un quiz à partir d'un PDF ou d'un texte.
 * Renvoie immédiatement le quiz créé (status: pending).
 * La génération LLM se déroule en arrière-plan (polling nécessaire).
 */
export async function generateQuiz(input: {
  title: string;
  pdf?: File;
  source_text?: string;
}): Promise<Quiz> {
  const form = new FormData();
  form.append('title', input.title);
  if (input.pdf) form.append('pdf', input.pdf);
  if (input.source_text) form.append('source_text', input.source_text);

  const { data } = await api.post<Quiz>('/llm/generate-quiz/', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    // Le backend répond maintenant immédiatement (201) sans attendre le LLM.
    // Un timeout court suffit.
    timeout: 10_000,
  });
  return data;
}
