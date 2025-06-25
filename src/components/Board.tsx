// src/components/Board.tsx

import { BOARD_SIZE, SAFE_SQUARES, START_SQUARES, PLAYER_BORDERS, PLAYER_COLORS } from '../constants';
import type { GameState } from '../types';
import { Pawn } from './Pawn';
import { X } from 'lucide-react';

interface BoardProps {
  gameState: GameState;
}

export const Board = ({ gameState }: BoardProps) => {
  const squares = [];
  
  // Create a map of positions to pawns for quick lookup
  const pawnMap = new Map<number, { pawnId: number, playerId: number }[]>();
  gameState.players.forEach(player => {
    player.pawns.forEach(pawn => {
      if (pawn.status === 'on-board' && pawn.position !== undefined) {
        if (!pawnMap.has(pawn.position)) {
          pawnMap.set(pawn.position, []);
        }
        pawnMap.get(pawn.position)!.push({ pawnId: pawn.id, playerId: player.id });
      }
    });
  });

  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const isSafe = SAFE_SQUARES.has(i);
    const pawnsOnSquare = pawnMap.get(i) || [];
    
    let playerStartKey = -1;
    for (const key in START_SQUARES) {
        if (START_SQUARES[key] === i) {
            playerStartKey = parseInt(key);
            break;
        }
    }

    const squareClasses = ['w-16 h-16', 'flex justify-center items-center', 'border', 'relative'];

    if (playerStartKey !== -1) {
        squareClasses.push(PLAYER_BORDERS[playerStartKey], 'border-4');
    } else {
        squareClasses.push('border-gray-400');
    }

    squares.push(
      <div key={i} className={squareClasses.join(' ')}>
        {isSafe && !pawnsOnSquare.length && <X size={24} className="text-gray-500" />}
        <div className="flex flex-wrap justify-center items-center gap-1">
          {pawnsOnSquare.map(({ playerId, pawnId }) => (
            <div key={`${playerId}-${pawnId}`} className="scale-75">
              <Pawn color={PLAYER_COLORS[playerId]} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-7 gap-1 bg-gray-200 p-2 rounded-lg shadow-md`}>
      {squares}
    </div>
  );
};