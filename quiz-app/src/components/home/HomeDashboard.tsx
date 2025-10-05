// src/components/HomeDashboard.tsx
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import QuizList from '../dashboard/QuizList';
import { useNavigate } from 'react-router-dom';
import PerformanceChart from '../dashboard/PerformanceChart';
import { BriefcaseIcon, UserGroupIcon, StarIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function HomeDashboard() {
  const dark = useSelector((state: RootState) => state.theme.dark);
  const navigate = useNavigate();

  const handleViewQuizzes = () => {
    window.alert('This would show the quizzes table for ordinary users.');
  };
  return (
    <div className={`p-6 mt-10 ${dark ? 'bg-gray-900 text-gray-100' : ''}`}>
        <h1 className="text-3xl font-bold mb-6">Welcome User</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleViewQuizzes}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          View Quizzes
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Example Stat Card */}
        <div className={`rounded-xl shadow p-5 flex flex-col items-start ${dark ?
          'bg-gray-800' : 'bg-white'}`}>
          <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <BriefcaseIcon className="h-5 w-5 inline-block mr-1" /> 
            Total Quizzes
          </span>
          <span className="text-2xl font-bold mt-2">24</span>
        </div>
        {/* Add more cards as needed */}
        <div className={`rounded-xl shadow p-5 flex flex-col items-start ${dark ?
          'bg-gray-800' : 'bg-white'}`}>
          <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <UserGroupIcon className="h-5 w-5 inline-block mr-1" />
            Active Users
          </span>
          <span className="text-2xl font-bold mt-2">120</span>
        </div>
        <div className={`rounded-xl shadow p-5 flex flex-col items-start ${dark ?
          'bg-gray-800' : 'bg-white'}`}>
          <span className={`text-sm ${dark ?
            'text-gray-400' : 'text-gray-500'}`}>
              <StarIcon className="h-5 w-5 inline-block mr-1" />
              Completed Quizzes
            </span>
          <span className="text-2xl font-bold mt-2">320</span>
        </div>
        <div className={`rounded-xl shadow p-5 flex flex-col items-start ${dark ?
          'bg-gray-800' : 'bg-white'}`}>
          <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            <ScaleIcon className="h-5 w-5 inline-block mr-1" />
            Pending Reviews
          </span>
          <span className="text-2xl font-bold mt-2">5</span>
        </div>
      </div>
      { /* Performance Chart Section */}
      <div className="mt-10">
        <PerformanceChart />
      </div>
      {/* Quizzes List */}
      <div className="mt-10">
          <QuizList onSelectQuiz={(quizId: string) => navigate(`/quiz/${quizId}`)} />
          {/* Add more activity items */}
      </div>
    </div>
  );
}