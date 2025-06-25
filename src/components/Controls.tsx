// src/components/Controls.tsx

interface ControlsProps {
  onThrowShells: () => void;
  canThrow: boolean;
}

export const Controls = ({ onThrowShells, canThrow }: ControlsProps) => {
  return (
    <div className="mt-4">
      <button
        onClick={onThrowShells}
        disabled={!canThrow}
        className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Throw Shells
      </button>
    </div>
  );
};