
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = async() => {
    await dispatch(logout());
    navigate('/login');
  };
  const page = useSelector((state: RootState) => state.page.name);
  const dark = useSelector((state: RootState) => state.theme.dark);
  const [search, setSearch] = useState('');

  // Example search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search action here
  };

  return (
    <header className={`flex items-center justify-between px-4 py-2 shadow-md w-full fixed top-0 left-0 z-30 ${dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="flex items-center gap-2">
        <UserCircleIcon className="h-8 w-8" />
        <span className="font-semibold">{user ? user.username : 'Guest'}</span>
        <span className="ml-4 px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm font-medium">{page}</span>
        {user && (
          <span
            onClick={handleLogout}
            className="cursor-pointer ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </span>
        )}
      </div>
      <form className="flex items-center gap-2 w-full max-w-xs" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search quizzes..."
          className={`px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${dark ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
        />
        <button type="submit" className={`p-2 rounded border ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'border-blue-500 bg-blue-500 hover:bg-blue-600'} text-white`}>
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>
    </header>
  );
}
