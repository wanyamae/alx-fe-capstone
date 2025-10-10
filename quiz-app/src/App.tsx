import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/sidebar';
import MobileNavbar from './components/layout/MobileNavbar';
import TopBar from './components/layout/TopBar';
import HomeDashboard from './components/home/HomeDashboard';
import UserHome from './components/home/UserHome';
import Quiz from './components/quiz/Quiz';
import UserDashboard from './components/dashboard/UserDashboard';
import About from './components/home/About';
import Contact from './components/contact/Contact';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setPage } from './store/pageSlice';
import quizData from './data.json';
import { setAllQuizzes } from './store/quizSlice';
import RequireAuth from './components/auth/RequireAuth';
import Login from './components/auth/Login';

function App() {
  const dark = useSelector((state: RootState) => state.theme.dark);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(setAllQuizzes(quizData));
  }, [dispatch]);

  useEffect(() => {
    // Map pathnames to page names
    const pageMap: Record<string, string> = {
      '/': 'Home',
      '/about': 'About',
      '/dashboard': 'Dashboard',
      '/quiz': 'Quiz',
      '/user': 'User',
      '/login': 'Login',
      '/contact': 'Contact',
    };
    // For dynamic routes like /quiz/:id
    let pageName = pageMap[location.pathname];
    if (!pageName && location.pathname.startsWith('/quiz/')) {
      pageName = 'Quiz';
    }
    dispatch(setPage(pageName || ''));
  }, [location, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={
          <div className={`flex items-center justify-center min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Login />
          </div>
        } />
        <Route path="/" element={
          <RequireAuth>
            <>
              <TopBar />
              <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
                <MobileNavbar />
                <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                  <HomeDashboard />
                </main>
              </div>
            </>
          </RequireAuth>
        } />
        <Route path="/about" element={
          <RequireAuth>
            <>
              <TopBar />
              <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
                <MobileNavbar />
                <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                  <About />
                </main>
              </div>
            </>
          </RequireAuth>
        } />
        <Route path="/contact" element={
          <RequireAuth>
            <>
              <TopBar />
              <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
                <MobileNavbar />
                <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                  <Contact />
                </main>
              </div>
            </>
          </RequireAuth>
        } />
        <Route path="/dashboard" element={
          <>
            <TopBar />
            <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
              <MobileNavbar />
              <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              </main>
            </div>
          </>
        } />
        <Route path="/quiz" element={
          <>
            <TopBar />
            <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
              <MobileNavbar />
              <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                <RequireAuth>
                  <Quiz />
                </RequireAuth>
              </main>
            </div>
          </>
        } />
        <Route path="/quiz/:id" element={
          <>
            <TopBar />
            <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
              <MobileNavbar />
              <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                <RequireAuth>
                  <Quiz />
                </RequireAuth>
              </main>
            </div>
          </>
        } />
        <Route path="/user" element={
          <>
            <TopBar />
            <div className={`flex min-h-screen w-full ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
              <MobileNavbar />
              <main className="flex-1 p-6 md:ml-64 mt-20 md:mt-0">
                <RequireAuth>
                  <UserHome />
                </RequireAuth>
              </main>
            </div>
          </>
        } />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
