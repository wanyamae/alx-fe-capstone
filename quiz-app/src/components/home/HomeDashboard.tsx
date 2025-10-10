// src/components/HomeDashboard.tsx

import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import QuizList from '../dashboard/QuizList';
import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, UserGroupIcon, StarIcon, ScaleIcon } from '@heroicons/react/24/outline';


export default function HomeDashboard() {
  const dark = useSelector((state: RootState) => state.theme.dark);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Get attempted quizzes from quiz state, filtered by user
  type AttemptedQuiz = {
    id: string;
    title: string;
    score: number;
    date: string;
    username: string;
  };
  const attemptedQuizzes = useSelector((state: RootState) => {
    const all = (state.quiz.attemptedQuizzes as AttemptedQuiz[]) || [];
    if (!user || user.username === 'Guest') return all;
    return all.filter((q) => q.username === user.username);
  });
  const attempted = attemptedQuizzes.length;

  // For completed quizzes, use allQuizzes or attemptedQuizzes as needed
  const quizzes = useSelector((state: RootState) => state.quiz.allQuizzes || []);
  return (
    <div className={`p-6 mt-10 ${dark ? 'bg-gray-900 text-gray-100' : ''}`}>
        <h1 className="text-3xl font-bold mb-6">Welcome {user ? user.username : 'Guest'}</h1>
      {/* <div className="flex justify-end mb-4">
        <button
          onClick={handleViewQuizzes}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          View Quizzes
        </button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Modern vibrant stat cards */}
        <div className="rounded-2xl shadow-lg p-5 flex flex-col items-start bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700">
          <span className="text-sm text-blue-700 dark:text-blue-200 flex items-center gap-1">
            <BriefcaseIcon className="h-5 w-5 inline-block mr-1 text-blue-500 dark:text-blue-300" />
            Attempted Quizzes
          </span>
          <span className="text-3xl font-extrabold mt-2 text-blue-900 dark:text-blue-100">{attempted}</span>
        </div>
        <div className="rounded-2xl shadow-lg p-5 flex flex-col items-start bg-gradient-to-br from-green-100 to-green-300 dark:from-green-900 dark:to-green-700">
          <span className="text-sm text-green-700 dark:text-green-200 flex items-center gap-1">
            <UserGroupIcon className="h-5 w-5 inline-block mr-1 text-green-500 dark:text-green-300" />
            Completed Quizzes
          </span>
          <span className="text-3xl font-extrabold mt-2 text-green-900 dark:text-green-100">{quizzes.length}</span>
        </div>
        <div className="rounded-2xl shadow-lg p-5 flex flex-col items-start bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700">
          <span className="text-sm text-yellow-700 dark:text-yellow-200 flex items-center gap-1">
            <StarIcon className="h-5 w-5 inline-block mr-1 text-yellow-500 dark:text-yellow-300" />
            Completed Quizzes
          </span>
          <span className="text-3xl font-extrabold mt-2 text-yellow-900 dark:text-yellow-100">320</span>
        </div>
        <div className="rounded-2xl shadow-lg p-5 flex flex-col items-start bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-900 dark:to-purple-700">
          <span className="text-sm text-purple-700 dark:text-purple-200 flex items-center gap-1">
            <ScaleIcon className="h-5 w-5 inline-block mr-1 text-purple-500 dark:text-purple-300" />
            Pending Reviews
          </span>
          <span className="text-2xl font-bold mt-2">5</span>
        </div>
      </div>
      { /* Performance Chart Section */}
      <div className="mt-10">
      </div>
      {/* Quizzes List */}
      <div className="mt-10">
          <QuizList onSelectQuiz={(quizId: string) => navigate(`/quiz/${quizId}`)} />
          {/* Add more activity items */}
      </div>
    </div>
  );
}