import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { setCurrentQuiz, selectAnswer, nextQuestion, restartQuiz, finishQuiz } from '../../store/quizSlice';
import quizData from '../../data.json';

export default function Quiz() {
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz.currentQuiz);
  const current = useSelector((state: RootState) => state.quiz.current);
  const selected = useSelector((state: RootState) => state.quiz.selected);
  const showResult = useSelector((state: RootState) => state.quiz.showResult);
  const score = useSelector((state: RootState) => state.quiz.score);
  const timer = useSelector((state: RootState) => state.quiz.timer);
  const questions = quiz.questions;

  useEffect(() => {
    // Load quiz questions into Redux on mount
    dispatch(setCurrentQuiz({ title: 'Sample Quiz', questions: quizData }));
  }, [dispatch]);

  useEffect(() => {
    if (timer > 0 && !showResult) {
      const interval = setInterval(() => dispatch({ type: 'quiz/tick' }), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !showResult) {
      dispatch(finishQuiz());
    }
  }, [timer, showResult, dispatch]);

  const handleSelect = (option: string) => {
    dispatch(selectAnswer(option));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handleRestart = () => {
    dispatch(restartQuiz());
    dispatch(setCurrentQuiz({ title: 'Sample Quiz', questions: quizData }));
  };

  // Analogue timer SVG parameters
  const radius = 32;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = timer / 60;
  const strokeDashoffset = circumference * (1 - percent);

  return (
    <div className="max-w-xl mt-16 mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">Quiz</h2>
      {showResult ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Score: {score} / {questions.length}</h3>
          <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white" onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {/* Analogue Timer */}
          <div className="flex justify-center md:col-span-2">
            <svg height={radius * 2} width={radius * 2} className="block">
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#3b82f6"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s linear' }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <text
                x={radius}
                y={radius + 6}
                textAnchor="middle"
                fontSize="1.5rem"
                fill="#1e293b"
                className="dark:fill-gray-100"
              >
                {timer}s
              </text>
            </svg>
          </div>
          {/* Question and options */}
          <div className="md:col-span-3">
            <div className="mb-4">
              <span className="font-medium">Question {current + 1} of {questions.length}</span>
              <p className="mt-2 text-lg">{questions[current]?.question}</p>
            </div>
            <div className="flex flex-col gap-2">
              {questions[current]?.options.map((opt: string) => (
                <button
                  key={opt}
                  className={`px-4 py-2 rounded border ${selected === opt ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              className="mt-6 px-4 py-2 rounded bg-green-500 text-white disabled:opacity-50"
              onClick={handleNext}
              disabled={!selected}
            >
              {current < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
