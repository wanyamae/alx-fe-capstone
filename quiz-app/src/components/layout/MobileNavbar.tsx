
import { useSelector, useDispatch } from 'react-redux';
import { toggleNavbar, closeNavbar } from '../../store/navbarSlice';
import type { RootState } from '../../store';
import { Bars3Icon } from '@heroicons/react/24/outline';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileNavbar() {
  const open = useSelector((state: RootState) => state.navbar.open);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="flex items-center justify-between bg-white px-4 py-2 shadow-md md:hidden w-full fixed top-0 left-0 z-10">
        <div className="font-bold text-lg">Quiz App</div>
        <button
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => dispatch(toggleNavbar())}
          aria-label="Toggle navigation"

        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>
      {open && (
        <div className="md:hidden fixed top-12 left-0 w-full bg-white shadow-lg z-20 flex flex-col justify-between" style={{height: 'calc(100vh - 3rem)'}}>
          <ul className="flex flex-col">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => dispatch(closeNavbar())}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <footer className="mt-auto px-4 py-3 border-t text-center text-xs text-gray-500 bg-gray-50">
            &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
          </footer>
        </div>
      )}
    </>
  );
}
