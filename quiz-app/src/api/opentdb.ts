// src/api/opentdb.ts
// Utility to fetch and map OpenTDB quizzes to app format

export interface OpenTDBQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export async function fetchOpenTDBQuiz(amount = 10): Promise<Quiz> {
  const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);
  const data = await res.json();
  if (data.response_code !== 0) throw new Error('Failed to fetch quiz');
  // Map to app's Quiz format
  return {
    id: 'opentdb-' + Date.now(),
    title: 'Open Trivia Quiz',
    questions: data.results.map((q: OpenTDBQuestion, idx: number) => ({
      id: idx,
      question: decodeHtml(q.question),
      options: shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHtml)),
      answer: decodeHtml(q.correct_answer),
    })),
  };
}

function shuffle(array: string[]) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
