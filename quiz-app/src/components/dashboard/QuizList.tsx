
import { useEffect, useState } from 'react';
import { fetchOpenTDBCategories } from '../../api/opentdbCategories';
import type { OpenTDBCategory } from '../../api/opentdbCategories';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import type { Quiz } from '../../store/quizSlice';
import { fetchQuizzesByCategory } from '../../store/quizSlice';

interface QuizListProps {
  onSelectQuiz: (quizId: string) => void;
}

type CompletedQuiz = {
  id: string;
  title: string;
  score: number;
  date: string;
  username: string;
};


const QuizList: React.FC<QuizListProps> = ({ onSelectQuiz }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const attempted = useSelector((state: RootState) => {
    const all = (state.quiz.attemptedQuizzes as CompletedQuiz[]) || [];
    if (!user || user.username === 'Guest') return all;
    return all.filter((q: CompletedQuiz) => q.username === user.username);
  });

  // State for OpenTDB categories and selected category
  const [categories, setCategories] = useState<OpenTDBCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<OpenTDBCategory | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const quizzes = useSelector((state: RootState) => state.quiz.allQuizzes as Quiz[]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOpenTDBCategories().then(setCategories);
  }, []);

  // Fetch quizzes for selected category using Redux
  useEffect(() => {
    if (selectedCategory) {
      setError(null);
      dispatch(fetchQuizzesByCategory(selectedCategory))
        .unwrap()
        .catch((err: string) => setError(err));
    }
  }, [selectedCategory, dispatch]);

  // (shuffle and decodeHtml are now handled in Redux async thunk)

  return (
    <div className="mb-2">
      <h2 className="text-xl font-bold mb-4">Quiz Groups (Categories)</h2>
      <ul className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat: OpenTDBCategory) => (
          <li
            key={cat.id}
            className={`px-3 py-1 rounded cursor-pointer ${selectedCategory?.id === cat.id ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'} text-sm font-semibold`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-4">Available Quizzes</h2>
      {selectedCategory ? (
        <>
          {error && <div className="text-red-600 dark:text-red-400 mb-2">{error}</div>}
          <ul className="space-y-2">
            {quizzes.length === 0 && !error && (
              <li className="text-gray-500 dark:text-gray-300">No quizzes found for this category.</li>
            )}
            {quizzes.map((quiz: Quiz) => {
              const attempt = attempted.find((a: CompletedQuiz) => a.id === quiz.id);
              return (
                <li key={quiz.id} className={`flex justify-between items-center p-4 rounded shadow ${attempt ? 'bg-green-50 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
                  <span className="font-semibold">{quiz.title}</span>
                  {attempt ? (
                    <div className="flex items-center gap-2">
                      <span className="text-green-700 dark:text-green-200 font-bold">Completed (Score: {attempt.score})</span>
                      <button
                        className="px-3 py-1 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition"
                        onClick={() => onSelectQuiz(`${quiz.id}|${selectedCategory?.id || ''}`)}
                      >
                        Retake Quiz
                      </button>
                    </div>
                  ) : (
                    <button
                      className="px-4 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600"
                      onClick={() => onSelectQuiz(`${quiz.id}|${selectedCategory?.id || ''}`)}
                    >
                      Take Quiz
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <div className="text-gray-500 dark:text-gray-300">Select a quiz group above to view available quizzes.</div>
      )}
      {/* Optionally, show a summary of all attempts below */}
      {attempted.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">Quiz Attempts</h2>
          <ul className="space-y-2">
            {attempted.map((quiz: CompletedQuiz) => (
              <li key={quiz.id + quiz.date} className="flex justify-between items-center p-4 rounded shadow bg-green-50 dark:bg-green-900">
                <span className="font-semibold">{quiz.title}</span>
                <span className="text-green-700 dark:text-green-200">Score: {quiz.score} | {new Date(quiz.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default QuizList;