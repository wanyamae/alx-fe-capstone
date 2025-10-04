import './App.css';
import MobileNavbar from './components/layout/MobileNavbar';
import Sidebar from './components/layout/sidebar';

function App() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar className="hidden md:flex md:w-64 md:flex-shrink-0" />
      <MobileNavbar />

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64 mt-12 md:mt-0">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz App</h1>
        {/* ...your app details/content... */}
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </main>
    </div>
  );
}

export default App;
