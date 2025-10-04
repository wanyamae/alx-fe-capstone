import type { SidebarProps } from "../../interface";


function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm flex flex-col p-6 z-20 ${className}`}>
      <nav className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Quiz App</h1>
        <ul className="space-y-2">
          <li>
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">Home</a>
          </li>
          <li>
            <a href="/about" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">About</a>
          </li>
          <li>
            <a href="/contact" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium">Contact</a>
          </li>
        </ul>
       
      </nav>
       <footer className="fixed-bottom mt-6 text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Quiz App. All rights reserved.
        </footer>
    </aside>
  );
}

export default Sidebar;