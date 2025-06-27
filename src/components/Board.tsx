// src/components/Board.tsx (పూర్తి ఫైల్‌ను రీప్లేస్ చేయండి)

import { CORRECT_MOVEMENT_PATHS, SAFE_SQUARES, START_SQUARES, PLAYER_BORDERS, PLAYER_COLORS, TOTAL_SQUARES } from '../constants';
import type { GameState } from '../types';
import { Pawn } from './Pawn';
import { X } from 'lucide-react';

interface BoardProps {
  gameState: GameState;
  onPawnClick: (playerId: number, pawnId: number) => void;
  onSquareClick: (squareIndex: number) => void; // New prop
  selectedPawn: { playerId: number; pawnId: number } | null;
  possibleMoves: Map<number, number>; 
  highlightedPath: number[];
}

export const Board = ({ gameState, onPawnClick, onSquareClick, selectedPawn, possibleMoves, highlightedPath }: BoardProps) => {
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
    const isHighlighted = highlightedPath.includes(i);
    const pathIndex = highlightedPath.indexOf(i);

    const playerStartKey = Object.keys(START_SQUARES).find(key => START_SQUARES[parseInt(key)] === i);
    const isPossibleMoveTarget = selectedPawn && possibleMoves.get(selectedPawn.pawnId) === i;

    const squareClasses = [
      'w-16 h-16', 'flex justify-center items-center', 'border', 'relative', 'transition-colors',
      isPossibleMoveTarget ? 'cursor-pointer' : ''
    ];

    if (playerStartKey) {
        squareClasses.push(PLAYER_BORDERS[parseInt(playerStartKey)], 'border-4');
    } else {
        squareClasses.push('border-gray-400');
    }
    
    if (isPossibleMoveTarget) {
      squareClasses.push('bg-green-300 ring-4 ring-green-500');
    }

    if (isHighlighted) {
        squareClasses.push('bg-purple-300'); // పాత్ హైలైట్ కోసం రంగు
    }
    return (
      <div 
        key={i} 
        className={squareClasses.join(' ')}
        onClick={() => onSquareClick(i)} // Add onClick to the square itself
      >
        {isHighlighted && (
                    <span className="absolute text-xs font-bold text-purple-800 top-0 left-1">{pathIndex}</span>
                )}
        {isSafe && !pawnsOnSquare.length && <X size={24} className="text-gray-500" />}
        <div className="flex flex-wrap justify-center items-center gap-1">
          {pawnsOnSquare.map(({ playerId, pawnId }) => {
            const isCurrentPlayerPawn = gameState.currentPlayerIndex === playerId;
            const isSelected = selectedPawn?.playerId === playerId && selectedPawn?.pawnId === pawnId;
            
            let pawnContainerClasses = 'scale-75 transition-all';
            if (isCurrentPlayerPawn) pawnContainerClasses += ' cursor-pointer';
            if (isSelected) pawnContainerClasses += ' ring-4 ring-yellow-400 rounded-full';

            return (
              <div 
                key={`${playerId}-${pawnId}`} 
                className={pawnContainerClasses}
                style={{ opacity: isCurrentPlayerPawn ? 1 : 0.5 }}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent square's onClick from firing
                    if (isCurrentPlayerPawn) onPawnClick(playerId, pawnId);
                }}
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