
import { AcademicCapIcon, DevicePhoneMobileIcon, SunIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';


const About: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <section className="max-w-3xl mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col items-center animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <AcademicCapIcon className="h-10 w-10 text-blue-600 dark:text-blue-300" />
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">About Quiz App</h1>
      </div>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-200 text-center max-w-2xl">
        Welcome{user && user.username !== 'Guest' ? `, ${user.username}` : ''}! <span className="font-semibold text-blue-600 dark:text-blue-300">Quiz App</span> is your modern, interactive platform for testing knowledge, tracking progress, and having fun. Whether you’re a guest or a registered user, you’ll enjoy a seamless, beautiful experience.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-6">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900">
          <ChartBarIcon className="h-7 w-7 text-blue-500 dark:text-blue-200" />
          <span className="font-medium text-gray-800 dark:text-gray-100">Track your performance over time</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900">
          <SunIcon className="h-7 w-7 text-yellow-500 dark:text-yellow-200" />
          <span className="font-medium text-gray-800 dark:text-gray-100">Switch between light and dark mode</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900">
          <UserGroupIcon className="h-7 w-7 text-green-500 dark:text-green-200" />
          <span className="font-medium text-gray-800 dark:text-gray-100">Compete and collaborate with friends</span>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900">
          <DevicePhoneMobileIcon className="h-7 w-7 text-purple-500 dark:text-purple-200" />
          <span className="font-medium text-gray-800 dark:text-gray-100">Enjoy a responsive, mobile-friendly design</span>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Built with <span className="font-semibold">React</span>, <span className="font-semibold">Redux</span>, <span className="font-semibold">Vite</span>, and <span className="font-semibold">Tailwind CSS</span>.<br />
        <span className="italic">Your learning journey, beautifully designed.</span>
      </div>
    </section>
  );
};

export default About;
