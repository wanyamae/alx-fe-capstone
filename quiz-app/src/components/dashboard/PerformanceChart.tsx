import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

type CompletedQuiz = {
  id: string;
  title: string;
  score: number;
  date: string;
};

const PerformanceChart: React.FC = () => {
  const completed = useSelector((state: RootState) => state.quiz.completedQuizzes as CompletedQuiz[]);

  // Example: Calculate scores for chart
  const scores = completed.map((quiz) => quiz.score);
  const labels = completed.map((quiz) => quiz.title);

  // Simple bar chart using divs (replace with chart.js or similar for real app)
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
      <div className="flex items-end gap-4 h-40">
        {scores.map((score, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className="w-8 bg-blue-500 rounded"
              style={{ height: `${score * 2}px` }}
              title={`Score: ${score}`}
            ></div>
            <span className="mt-2 text-xs text-center">{labels[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
