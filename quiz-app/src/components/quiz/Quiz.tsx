import { useEffect, useState } from 'react';
import AnswersColumn from './AnswersColumn';
import TrackingColumn from './TrackingColumn';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { tick, setCurrentQuiz, selectAnswer, nextQuestion, restartQuiz, finishQuiz } from '../../store/quizSlice';
import { toggleDark } from '../../store/themeSlice';
import quizData from '../../data.json';

const Quiz = () => {
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz.currentQuiz);
  const current = useSelector((state: RootState) => state.quiz.current);
  // Handler to navigate to a specific question
  const handleNavigate = (index: number) => {
    dispatch({ type: 'quiz/setCurrent', payload: index });
  };
  const selected = useSelector((state: RootState) => state.quiz.selected);
  const showResult = useSelector((state: RootState) => state.quiz.showResult);
  const score = useSelector((state: RootState) => state.quiz.score);
  const timer = useSelector((state: RootState) => state.quiz.timer);
  const dark = useSelector((state: RootState) => state.theme.dark);
  const questions = quiz.questions;
  // Track answered questions in Redux
  const answered = useSelector((state: RootState) => state.quiz.answered || {});
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    // Load quiz questions into Redux on mount
    dispatch(setCurrentQuiz({ title: 'Sample Quiz', questions: quizData }));
  }, [dispatch]);

  useEffect(() => {
    if (timer > 0 && !showResult) {
      const interval = setInterval(() => dispatch(tick()), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !showResult) {
      dispatch(finishQuiz());
    }
  }, [timer, showResult, dispatch]);

  const handleSelect = (option: string) => {
    dispatch(selectAnswer(option));
    dispatch({ type: 'quiz/answerQuestion', payload: { index: current, answer: option } });
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handleSkip = () => {
    dispatch({ type: 'quiz/answerQuestion', payload: { index: current, answer: '' } });
    dispatch(nextQuestion());
  };

  const handleFinish = () => {
    dispatch(finishQuiz());
    setShowAnswers(true);
  };

  const handleRestart = () => {
    dispatch(restartQuiz());
    dispatch(setCurrentQuiz({ title: 'Sample Quiz', questions: quizData }));
    setShowAnswers(false);
  };

  return (
    <div className={`flex flex-col w-full mt-16 mx-auto p-6 rounded-xl shadow ${dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Mobile Tracking Row */}
      <div className="sm:hidden mb-4">
        <TrackingColumn
          questions={questions}
          answered={answered}
          current={current}
          onNavigate={handleNavigate}
        />
      </div>
      <div className="flex w-full">
        {/* Desktop Tracking Column */}
        <div className="hidden sm:block">
          <TrackingColumn
            questions={questions}
            answered={answered}
            current={current}
            onNavigate={handleNavigate}
          />
        </div>
        {/* Main Quiz Column */}
        <div className="flex-1 px-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Quiz</h2>
            <button
              className={`px-3 py-1 bg-blue-500 rounded transition-colors ${dark ? 'bg-blue-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
              onClick={() => {
                dispatch(toggleDark());
                document.documentElement.classList.toggle('dark', !dark);
              }}
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          {showResult ? (
            showAnswers ? (
              <AnswersColumn questions={questions} answered={answered} />
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Final Score: {score} / {questions.length}</h3>
                <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white" onClick={() => setShowAnswers(true)}>
                  Show Correct Answers
                </button>
                <button className="mt-4 ml-4 px-4 py-2 rounded bg-gray-500 text-white" onClick={handleRestart}>
                  Restart Quiz
                </button>
              </div>
            )
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Question {current + 1} of {questions.length}</span>
                <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-mono">{timer}s</span>
              </div>
              <p className="mt-2 text-lg">{questions[current]?.question}</p>
              <div className="flex flex-col gap-2 mt-4">
                {questions[current]?.options.map((opt: string) => (
                  <button
                    key={opt}
                    className={`px-4 py-2 rounded border font-semibold transition-colors
                      ${selected === opt
                        ? 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-700'
                        : 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-700'}
                      outline outline-2 outline-blue-400 focus:outline focus:outline-blue-500
                      ${answered[current] === opt ? 'ring-2 ring-blue-400' : ''}`}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  className="px-4 py-2 rounded bg-yellow-400 text-white font-semibold hover:bg-yellow-500"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button
                  className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600"
                  onClick={current < questions.length - 1 ? handleNext : handleFinish}
                  disabled={
                    !selected && !answered[current] ||
                    (current === questions.length - 1 && Object.values(answered).some(a => a === ''))
                  }
                >
                  {current < questions.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
