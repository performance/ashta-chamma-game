// src/components/ShellsDisplay.tsx

import { Dices } from 'lucide-react';

interface ShellsDisplayProps {
  rolls: number[]; // ఇప్పుడు ఒక సంఖ్యల శ్రేణి
}

export const ShellsDisplay = ({ rolls }: ShellsDisplayProps) => {
  if (rolls.length === 0) {
    return (
      <div className="flex items-center justify-center w-32 h-24 bg-gray-200 rounded-lg shadow-inner">
        <Dices size={48} className="text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-32 h-24 bg-white rounded-lg shadow-lg border-2 border-blue-500">
      <div className="flex space-x-2">
        {rolls.map((roll, index) => (
          <span 
            key={index} 
            className={`text-5xl font-bold ${index === 0 ? 'text-blue-700' : 'text-gray-400'}`}
          >
            {roll}
          </span>
        ))}
      </div>
    </div>
  );
};