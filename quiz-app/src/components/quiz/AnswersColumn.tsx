import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { restartQuiz, setCurrentQuiz } from '../../store/quizSlice';
import type { AnswersColumnProps } from '../../interface';


const AnswersColumn: React.FC<AnswersColumnProps> = ({ questions, answered }) => {
  const dispatch = useDispatch();
  const currentQuiz = useSelector((state: RootState) => state.quiz.currentQuiz);

  const handleRestart = () => {
    dispatch(restartQuiz());
    dispatch(setCurrentQuiz(currentQuiz));
  };

  const quizTitle = useSelector((state: RootState) => state.quiz.currentQuiz.title);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">{quizTitle}</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Answers</h3>
          <ul className="space-y-2">
            {questions.map((q, idx) => (
              <li key={q.id} className="p-2 rounded border bg-blue-50 text-blue-900">
                <span className="font-medium">Q{idx + 1}:</span> {answered[idx] || <span className="italic text-gray-400">Skipped</span>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Correct Answers</h3>
          <ul className="space-y-2">
            {questions.map((q, idx) => (
              <li key={q.id} className="p-2 rounded border bg-green-50 text-green-900">
                <span className="font-medium">Q{idx + 1}:</span> {q.answer}
              </li>
            ))}
          </ul>
          <button className="mt-6 px-4 py-2 rounded bg-blue-500 text-white" onClick={handleRestart}>Restart Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default AnswersColumn;
