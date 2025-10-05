
import Sidebar from './components/layout/sidebar';
import MobileNavbar from './components/layout/MobileNavbar';
import TopBar from './components/layout/TopBar';
import HomeDashboard from './components/home/HomeDashboard';
import UserHome from './components/home/UserHome';
import Quiz from './components/quiz/Quiz';
import UserDashboard from './components/dashboard/UserDashboard';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { useEffect } from 'react';
import quizData from './data.json';
import { setAllQuizzes } from './store/quizSlice';
import { Routes, Route } from 'react-router-dom';



function App() {
  const dark = useSelector((state: RootState) => state.theme.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllQuizzes(quizData));
  }, [dispatch]);

  return (
    <>
      <TopBar />
      <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}> 
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
        <MobileNavbar />
        {/* Main content: routed pages */}
        <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/user" element={<UserHome />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
