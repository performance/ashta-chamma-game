// src/components/Board.tsx (Simplified Version)

import { BOARD_SIZE, SAFE_SQUARES, START_SQUARES, PLAYER_BORDERS, PLAYER_COLORS, TOTAL_SQUARES } from '../constants';
import type { GameState } from '../types';
import { Pawn } from './Pawn';
import { X } from 'lucide-react';

interface BoardProps {
  gameState: GameState;
  onPawnClick: (playerId: number, pawnId: number) => void;
  selectedPawn: { playerId: number; pawnId: number } | null;
  possibleMoves: Map<number, number>;
}

export const Board = ({ gameState, onPawnClick, selectedPawn, possibleMoves }: BoardProps) => {
  const pawnMap = new Map<number, { pawnId: number, playerId: number }[]>();
  gameState.players.forEach(player => {
    player.pawns.forEach(pawn => {
      if (pawn.status === 'on-board' && pawn.position !== undefined) {
        if (!pawnMap.has(pawn.position)) pawnMap.set(pawn.position, []);
        pawnMap.get(pawn.position)!.push({ pawnId: pawn.id, playerId: player.id });
      }
    });
  });

  const squares = Array.from({ length: TOTAL_SQUARES }, (_, i) => {
    const isSafe = SAFE_SQUARES.has(i);
    const pawnsOnSquare = pawnMap.get(i) || [];
    
    const playerStartKey = Object.keys(START_SQUARES).find(key => START_SQUARES[parseInt(key)] === i);
    const isPossibleMoveTarget = selectedPawn && possibleMoves.get(selectedPawn.pawnId) === i;

    const squareClasses = ['w-16 h-16', 'flex justify-center items-center', 'border', 'relative', 'transition-colors'];
    if (playerStartKey) {
        squareClasses.push(PLAYER_BORDERS[parseInt(playerStartKey)], 'border-4');
    } else {
        squareClasses.push('border-gray-400');
    }
    if (isPossibleMoveTarget) {
      squareClasses.push('bg-green-300 ring-4 ring-green-500');
    }

    return (
      <div key={i} className={squareClasses.join(' ')}>
        {isSafe && !pawnsOnSquare.length && <X size={24} className="text-gray-500" />}
        <div className="flex flex-wrap justify-center items-center gap-1">
          {pawnsOnSquare.map(({ playerId, pawnId }) => {
            const isSelected = selectedPawn?.playerId === playerId && selectedPawn?.pawnId === pawnId;
            const isCurrentPlayerPawn = gameState.currentPlayerIndex === playerId;

            // Simplified class logic
            let pawnContainerClasses = 'scale-75 transition-all cursor-pointer';
            if (isSelected) {
              pawnContainerClasses += ' ring-4 ring-yellow-400 rounded-full';
            }

            return (
              <div 
                key={`${playerId}-${pawnId}`} 
                className={pawnContainerClasses}
                onClick={() => isCurrentPlayerPawn && onPawnClick(playerId, pawnId)}
              >
                <Pawn color={PLAYER_COLORS[playerId]} />
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className={`grid grid-cols-7 gap-1 bg-gray-200 p-2 rounded-lg shadow-md`}>
      {squares}
    </div>
  );
};