import { api } from './client';

export type TeacherSuggestion = {
  id: number;
  author_name: string;
  recipient_name: string;
  title: string;
  message: string;
  created_at: string;
  read_at: string | null;
};

export type TeacherStudentSummary = {
  id: number;
  name: string;
  email: string;
  quizzes_taken: number;
  average_score: number | null;
  last_score: number | null;
  accuracy: number | null;
  mistakes_count: number;
  recent_mistakes: Array<{
    quiz_id: number;
    quiz_title: string;
    index: number;
    prompt: string;
  }>;
  weak_quizzes: Array<{
    id: number;
    title: string;
    score: number | null;
  }>;
  suggestions_count: number;
  latest_activity: string | null;
};

export type TeacherStudentsResponse = {
  count: number;
  students: TeacherStudentSummary[];
};

export type TeacherStudentDetail = {
  student: TeacherStudentSummary;
  suggestions: TeacherSuggestion[];
};

export async function listTeacherStudents(q = ''): Promise<TeacherStudentsResponse> {
  const { data } = await api.get<TeacherStudentsResponse>('/accounts/teacher/students/', {
    params: q ? { q } : {},
  });
  return data;
}

export async function getTeacherStudent(id: number): Promise<TeacherStudentDetail> {
  const { data } = await api.get<TeacherStudentDetail>(`/accounts/teacher/students/${id}/`);
  return data;
}

export async function createTeacherSuggestion(
  studentId: number,
  input: { title: string; message: string },
): Promise<TeacherSuggestion> {
  const { data } = await api.post<TeacherSuggestion>(
    `/accounts/teacher/students/${studentId}/suggestions/`,
    input,
  );
  return data;
}

export async function getMyTeacherSuggestions(): Promise<TeacherSuggestion[]> {
  const { data } = await api.get<TeacherSuggestion[]>('/accounts/me/suggestions/');
  return data;
}