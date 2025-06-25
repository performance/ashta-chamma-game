// src/components/ShellsDisplay.tsx

import { Dices } from 'lucide-react';

interface ShellsDisplayProps {
  rollValue: number | null;
}

export const ShellsDisplay = ({ rollValue }: ShellsDisplayProps) => {
  if (rollValue === null) {
    return (
      <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-lg shadow-inner">
        <Dices size={48} className="text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-24 h-24 bg-white rounded-lg shadow-lg border-2 border-blue-500">
      <span className="text-5xl font-bold text-blue-700">{rollValue}</span>
    </div>
  );
};