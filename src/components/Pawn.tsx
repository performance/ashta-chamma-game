// src/components/Pawn.tsx

interface PawnProps {
  color: string; // Tailwind background color class, e.g., 'bg-red-500'
}

export const Pawn = ({ color }: PawnProps) => {
  return (
    <div className={`w-10 h-10 rounded-full ${color} border-2 border-gray-800 shadow-md`}>
      {/* This div represents a single pawn */}
    </div>
  );
};