// src/components/Board.tsx

import { BOARD_SIZE, SAFE_SQUARES, START_SQUARES, PLAYER_BORDERS } from '../constants';
import { X } from 'lucide-react';

export const Board = () => {
  const squares = [];
  
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const isSafe = SAFE_SQUARES.has(i);
    
    // Check if the current square is a starting square for any player
    let playerStartKey = -1;
    for (const key in START_SQUARES) {
        if (START_SQUARES[key] === i) {
            playerStartKey = parseInt(key);
            break;
        }
    }

    // Dynamically build the class string
    const squareClasses = [
        'w-16 h-16',
        'flex justify-center items-center',
        'border', // Apply border style by default
    ];

    if (playerStartKey !== -1) {
        // If it's a player start square, add their specific border color and thickness
        squareClasses.push(PLAYER_BORDERS[playerStartKey]);
        squareClasses.push('border-4');
    } else {
        // Otherwise, add the default gray border
        squareClasses.push('border-gray-400');
    }

    squares.push(
      <div
        key={i}
        className={squareClasses.join(' ')}
      >
        {isSafe && <X size={24} className="text-gray-500" />}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-7 gap-1 bg-gray-200 p-2 rounded-lg shadow-md`}>
      {squares}
    </div>
  );
};