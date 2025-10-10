import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { Quiz } from '../../store/quizSlice';

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
  const quizzes = useSelector((state: RootState) => state.quiz.allQuizzes as Quiz[]);
  const user = useSelector((state: RootState) => state.auth.user);
  const attempted = useSelector((state: RootState) => {
    const all = (state.quiz.attemptedQuizzes as CompletedQuiz[]) || [];
    if (!user || user.username === 'Guest') return all;
    return all.filter(q => q.username === user.username);
  });

  return (
    <div className="mb-2">
      <h2 className="text-xl font-bold mb-4">Available Quizzes</h2>
      <ul className="space-y-2">
        {quizzes.map((quiz) => {
          const attempt = attempted.find(a => a.id === quiz.id);
          return (
            <li key={quiz.id} className={`flex justify-between items-center p-4 rounded shadow ${attempt ? 'bg-green-50 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
              <span className="font-semibold">{quiz.title}</span>
              {attempt ? (
                <div className="flex items-center gap-2">
                  <span className="text-green-700 dark:text-green-200 font-bold">Completed (Score: {attempt.score})</span>
                  <button
                    className="px-3 py-1 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition"
                    onClick={() => onSelectQuiz(quiz.id)}
                  >
                    Retake Quiz
                  </button>
                </div>
              ) : (
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600"
                  onClick={() => onSelectQuiz(quiz.id)}
                >
                  Take Quiz
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {/* Optionally, show a summary of all attempts below */}
      {attempted.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4">Quiz Attempts</h2>
          <ul className="space-y-2">
            {attempted.map((quiz) => (
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