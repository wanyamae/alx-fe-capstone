import Sidebar from './components/layout/sidebar';
import MobileNavbar from './components/layout/MobileNavbar';
import TopBar from './components/layout/TopBar';
import HomeDashboard from './components/home/HomeDashboard';
import type { RootState } from './store';

import { useEffect, useState } from 'react';
import Quiz from './components/quiz/Quiz';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from './store/pageSlice';


function App() {
  const dark = useSelector((state: RootState) => state.theme.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage('Dashboard'));
  }, [dispatch]);

  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const handler = () => setShowQuiz(true);
    window.addEventListener('show-quiz', handler);
    return () => window.removeEventListener('show-quiz', handler);
  }, []);

  return (
    <>
      <TopBar />
      <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
        <MobileNavbar />
        {/* Main content */}
        <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
          {showQuiz ? <Quiz /> : <HomeDashboard />}
        </main>
      </div>
    </>
  );
}

export default App;
