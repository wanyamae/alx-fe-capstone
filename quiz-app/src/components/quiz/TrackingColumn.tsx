import React from 'react';
import type { TrackingColumnProps } from '../../interface';


const TrackingColumn: React.FC<TrackingColumnProps> = ({ questions, answered, current, onNavigate }) => {
  return (
    <>
      {/* Desktop/Tablet: Vertical column */}
      <div className="hidden sm:block w-48 p-4 border-r bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-bold mb-4">Progress</h3>
        <ul className="space-y-2">
          {questions.map((q, idx) => (
            <li key={q.id}>
              <a
                type="button"
                className={`w-full flex items-center px-2 py-1 rounded transition-colors text-left font-medium
                  ${current === idx ? 'bg-blue-300 text-green-500' : answered[idx] !== undefined ? (answered[idx] ? 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100' : 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100') : 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100'}
                  hover:bg-blue-200 dark:hover:bg-blue-700`}
                onClick={() => onNavigate(idx)}
              >
                Q{idx + 1}: {answered[idx] !== undefined ? (answered[idx] ? 'Answered' : 'Skipped') : 'Unanswered'}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile: Horizontal row */}
      <div className="sm:hidden flex w-full overflow-x-auto gap-2 p-2 bg-gray-50 dark:bg-gray-900 justify-center">
        {questions.map((q, idx) => (
          <button
            type="button"
            key={q.id}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-2
              ${current === idx ? 'border-blue-500 bg-blue-500 text-white' 
              : answered[idx] !== undefined ? (answered[idx] ? 'bg-green-500 text-white border-green-500' 
                : 'bg-red-300 text-red-700 border-red-500') : 'bg-gray-200 text-gray-700 border-gray-300'}
              transition-colors`}
            onClick={() => onNavigate(idx)}
            aria-label={`Go to question ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default TrackingColumn;
