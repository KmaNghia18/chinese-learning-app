const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
function getToken() { if (typeof window === 'undefined') return null; return localStorage.getItem('cl_token'); }
async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string,string> = { 'Content-Type': 'application/json', ...(options.headers as any||{}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}
export const api = {
  register: (b:object) => apiFetch('/auth/register',{method:'POST',body:JSON.stringify(b)}),
  login: (b:object) => apiFetch('/auth/login',{method:'POST',body:JSON.stringify(b)}),
  me: () => apiFetch('/auth/me'),
  getLessons: (lvl?:string) => apiFetch(`/lessons${lvl?`?hsk_level=${lvl}`:''}`),
  getLesson: (id:number) => apiFetch(`/lessons/${id}`),
  getVocabulary: (p?:Record<string,string>) => apiFetch(`/vocabulary${p?'?'+new URLSearchParams(p).toString():''}`),
  getDueVocab: () => apiFetch('/vocabulary/review/due'),
  getStats: () => apiFetch('/progress/stats'),
  reviewVocab: (vid:number,correct:boolean) => apiFetch('/progress/review',{method:'POST',body:JSON.stringify({vocabulary_id:vid,correct})}),
  updateLessonProgress: (lid:number,status:string) => apiFetch('/progress/lesson',{method:'POST',body:JSON.stringify({lesson_id:lid,status})}),
  getQuizQuestions: (lvl:string,count=10,topic='all') => apiFetch(`/quiz/questions?hsk_level=${lvl}&count=${count}&topic=${topic}`),
  submitQuiz: (b:object) => apiFetch('/quiz/submit',{method:'POST',body:JSON.stringify(b)}),
  getQuizHistory: () => apiFetch('/quiz/history'),
  getQuizTopics: (lvl:string) => apiFetch(`/quiz/topics?hsk_level=${lvl}`),
  getWritingWords: (lvl:string,topic='all',count=20) => apiFetch(`/quiz/writing?hsk_level=${lvl}&topic=${topic}&count=${count}`),
  searchVocabulary: (q:string,limit=12) => apiFetch(`/vocabulary?search=${encodeURIComponent(q)}&limit=${limit}`),
  getListeningQuiz: (lvl:string,count=10,topic='all') => apiFetch(`/quiz/listening?hsk_level=${lvl}&count=${count}&topic=${topic}`),
  getToneQuiz: (lvl:string,count=10) => apiFetch(`/quiz/tones?hsk_level=${lvl}&count=${count}`),
  getReverseQuiz: (lvl:string,count=10,topic='all') => apiFetch(`/quiz/reverse?hsk_level=${lvl}&count=${count}&topic=${topic}`),
  getStreakStats: () => apiFetch('/progress/streak'),
  getFlashcards: (lvl?:string,limit=20) => apiFetch(`/vocabulary?${lvl?`hsk_level=${lvl}&`:''}limit=${limit}&offset=${Math.floor(Math.random()*50)}`),
};
