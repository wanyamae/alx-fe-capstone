import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setCurrentQuiz, type Quiz } from '../../store/quizSlice';
import QuizList from './QuizList';
import PerformanceChart from './PerformanceChart';
// import HomeDashboard from './HomeDashboard';

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state: RootState) => state.quiz.allQuizzes);

  const handleSelectQuiz = (quizId: string) => {
    const selectedQuiz = quizzes.find((quiz: Quiz) => quiz.id === quizId);
    if (selectedQuiz) {
      dispatch({ type: 'quiz/restartQuiz' });
      dispatch(setCurrentQuiz(selectedQuiz));
      // TODO: navigate to quiz page if needed
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">My Dashboard</h1>
  {/* Dashboard stats and welcome can be added here if needed */}
  <QuizList onSelectQuiz={handleSelectQuiz} />
  <PerformanceChart />
    </div>
  );
};

export default UserDashboard;
