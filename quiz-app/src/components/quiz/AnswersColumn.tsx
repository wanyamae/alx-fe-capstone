import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { restartQuiz, setCurrentQuiz } from '../../store/quizSlice';
import type { AnswersColumnProps } from '../../interface';
import { CheckBadgeIcon, HashtagIcon, XMarkIcon } from '@heroicons/react/24/outline';


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
      <div className="max-w-xl mx-auto">
        <ul className="space-y-2">
          {questions.map((q, idx) => {
            const userAnswer = answered[idx];
            const isCorrect = userAnswer === q.answer;
            const isSkipped = !userAnswer;
            return (
              <li
                key={q.id}
                className={`flex items-center p-3 rounded border text-lg font-medium transition-all
                  ${isCorrect ? 'bg-green-100 text-green-900 border-green-300' : isSkipped ? 'bg-gray-100 text-gray-600 border-gray-300' : 'bg-red-100 text-red-900 border-red-300'}`}
              >
                <span className="mr-2 text-xl">
                  {isCorrect ? <CheckBadgeIcon className="w-6 h-6 text-green-500" /> : isSkipped ? <HashtagIcon className="w-6 h-6 text-gray-500" /> : <XMarkIcon className="w-6 h-6 text-red-500" />}
                </span>
                <span className="mr-2 font-semibold">Q{idx + 1}:</span>
                <span>
                  {userAnswer
                    ? userAnswer
                    : <span className="italic text-gray-400">Skipped</span>
                  }
                  {!isCorrect && (
                    <span className={isSkipped ? 'text-blue-700 ml-2' : 'text-green-700 ml-2'}>
                      (Correct: {q.answer})
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
        <button className="mt-8 px-4 py-2 rounded bg-blue-500 text-white block mx-auto" onClick={handleRestart}>Restart Quiz</button>
      </div>
    </div>
  );
};

export default AnswersColumn;
