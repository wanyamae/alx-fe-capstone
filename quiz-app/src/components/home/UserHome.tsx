
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

type Quiz = {
  id: number;
  name: string;
  date: string;
  score: number;
};

export default function UserHome() {
  const quizzes = useSelector((state: RootState) => (state.user?.quizzes as Quiz[]) || []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Quizzes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-2 text-left">Quiz Name</th>
              <th className="px-4 py-2 text-left">Date Taken</th>
              <th className="px-4 py-2 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2">{quiz.name}</td>
                <td className="px-4 py-2">{quiz.date}</td>
                <td className="px-4 py-2">{quiz.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
