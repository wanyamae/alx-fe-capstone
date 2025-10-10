// src/components/home/QuizCategories.tsx
import { useEffect, useState } from 'react';
import { fetchOpenTDBCategories } from '../../api/opentdbCategories';
import type { OpenTDBCategory } from '../../api/opentdbCategories';

export default function QuizCategories() {
  const [categories, setCategories] = useState<OpenTDBCategory[]>([]);
  useEffect(() => {
    fetchOpenTDBCategories().then(setCategories);
  }, []);
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Quiz Groups (Categories)</h2>
      <ul className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <li key={cat.id} className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
