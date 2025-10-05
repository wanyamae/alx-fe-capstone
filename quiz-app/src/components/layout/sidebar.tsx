import type { SidebarProps } from "../../interface";
import { useSelector, useDispatch } from 'react-redux';
import { toggleDark } from '../../store/themeSlice';
import type { RootState } from '../../store';
import { MoonIcon, SunIcon, HomeModernIcon, ExclamationTriangleIcon, PhoneIcon, ChevronLeftIcon, ChevronRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ className = "" }: SidebarProps) {
  const dark = useSelector((state: RootState) => state.theme.dark);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleDarkMode = () => {
    dispatch(toggleDark());
    document.documentElement.classList.toggle('dark', !dark);
  };

  return (
  <aside className={`hidden md:flex fixed top-0 left-0 h-screen ${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm flex-col p-6 z-20 transition-all duration-300 ${className}`}>
      <nav className="flex-1">
        {!collapsed && (
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Quiz App</h1>
        )}
        <ul className="space-y-2">
          <li>
            <a href="/" className="flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">
              <HomeModernIcon className="h-6 w-6 mr-2" />
              {!collapsed && 'Home'}
            </a>
          </li>
          <li>
            <a href="/about" className="flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">
              <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
              {!collapsed && 'About'}
            </a>
          </li>
          <li>
            <a href="/contact" className="flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">
              <PhoneIcon className="h-6 w-6 mr-2" />
              {!collapsed && 'Contact'}
            </a>
          </li>
          <li>
            <Link
              to="/quiz"
              role="button"
              className="flex items-center px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-900 dark:text-gray-100 font-medium transition-colors"
            >
              <AcademicCapIcon className="h-6 w-6 mr-2" />
              {!collapsed && 'Take Quiz'}
            </Link>
          </li>
        </ul>
            {/* Dark Mode Toggle */}
        <button
          onClick={handleToggleDarkMode}
          className="mt-6 flex items-center gap-2 px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          {!collapsed && <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </nav>
      {/* Collapse button only on desktop */}
      <div className="hidden md:flex">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 flex items-center justify-center px-2 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </button>
      </div>
      <footer className={`mt-6 text-sm text-gray-500 dark:text-gray-400 text-center ${collapsed ? 'hidden' : ''}`}>
        &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
      </footer>
    </aside>
  );
}

export default Sidebar;