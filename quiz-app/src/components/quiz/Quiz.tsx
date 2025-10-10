import { useEffect, useState } from 'react';
import AnswersColumn from './AnswersColumn';
import TrackingColumn from './TrackingColumn';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { tick, setCurrentQuiz, selectAnswer, nextQuestion, restartQuiz, finishQuiz, setCurrent, addAttemptedQuiz } from '../../store/quizSlice';
import quizData from '../../data.json';

const Quiz = () => {
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz.currentQuiz);
  const user = useSelector((state: RootState) => state.auth.user);
  const current = useSelector((state: RootState) => state.quiz.current);
  // Handler to navigate to a specific question
  const handleNavigate = (index: number) => {
    dispatch(setCurrent(index));
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
    // Load first quiz from data.json into Redux on mount
    if (Array.isArray(quizData) && quizData.length > 0) {
      dispatch(setCurrentQuiz(quizData[0]));
    }
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
    // Check last answer before finishing
    const lastIdx = current;
    const lastAnswer = answered[lastIdx];
    if (lastAnswer && lastAnswer === questions[lastIdx]?.answer) {
      dispatch({ type: 'quiz/incrementScore' });
    }
    dispatch(finishQuiz());
    // Store attempted quiz in Redux
    dispatch(addAttemptedQuiz({
      id: quiz.id,
      title: quiz.title,
      score,
      date: new Date().toISOString(),
      username: user?.username || 'Guest',
    }));
    setShowAnswers(false); // Show performance/results page after finish
  };

  const handleRestart = () => {
    dispatch(restartQuiz());
    if (Array.isArray(quizData) && quizData.length > 0) {
      dispatch(setCurrentQuiz(quizData[0]));
    }
    setShowAnswers(false);
  };

  return (
    <div
      className={`flex flex-col w-full mt-16 mx-auto p-6 rounded-xl shadow
      ${dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}
    >
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
            <h2 className="text-xl font-bold">{quiz.title}</h2>
          </div>
          {showResult ? (
            showAnswers ? (
              <AnswersColumn questions={questions} answered={answered} />
            ) : (
              <div
                className={`rounded-2xl shadow-xl p-8 flex flex-col items-center mb-8
                  ${score / questions.length >= 0.8
                    ? 'bg-gradient-to-br from-green-200 to-green-500 dark:from-green-900 dark:to-green-700'
                    : score / questions.length <= 0.2
                    ? 'bg-gradient-to-br from-red-200 to-red-500 dark:from-red-900 dark:to-red-700'
                    : 'bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700'}
                `}
              >
                <h3 className="text-3xl font-extrabold mb-2 text-center">
                  {score / questions.length >= 0.8 && '🎉 Excellent!'}
                  {score / questions.length <= 0.2 && '😢 Try Again!'}
                  {score / questions.length > 0.2 && score / questions.length < 0.8 && 'Quiz Complete!'}
                </h3>
                <div className="text-5xl font-black mb-2 text-gray-900 dark:text-gray-100">
                  {score} <span className="text-2xl font-bold">/ {questions.length}</span>
                </div>
                <div className="mb-4 text-lg text-gray-700 dark:text-gray-200 text-center">
                  {score / questions.length >= 0.8 && 'You aced it!'}
                  {score / questions.length <= 0.2 && 'Don’t give up, try again!'}
                  {score / questions.length > 0.2 && score / questions.length < 0.8 && 'Good effort! Review your answers below.'}
                </div>
                <button className="mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" onClick={() => setShowAnswers(true)}>
                  Show Correct Answers
                </button>
                <button className="mt-4 ml-4 px-4 py-2 rounded bg-gray-500 text-white font-semibold hover:bg-gray-600 transition" onClick={handleRestart}>
                  Restart Quiz
                </button>
              </div>
            )
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">
                  Question {current + 1} of {questions.length}
                </span>
                <span className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900
                text-blue-700 dark:text-blue-200 font-mono"
                >
                  {timer}s
                </span>
              </div>
              <p className="mt-2 text-lg">
                {questions[current]?.question}
              </p>
              <div className="flex flex-col gap-2 mt-4 mb-2">
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
                  className="px-4 py-2 rounded bg-yellow-400 text-white font-semibold
                  hover:bg-yellow-500"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button
                  className="px-4 py-2 rounded bg-green-500 text-white font-semibold
                  hover:bg-green-600"
                  onClick={current < questions.length - 1 ? handleNext : handleFinish}
                  disabled={
                    !selected && !answered[current] ||
                    (current === questions.length - 1 && 
                      Object.values(answered).some(a => a === ''))
                  }
                >
                  {current < questions.length - 1 ? 'Submit' : 'Finish'}
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
