// src/App.tsx (పూర్తి ఫైల్‌ను రీప్లేస్ చేయండి)

import { useState } from 'react';
import type { GameState, Pawn as PawnType } from './types';
import { initializeGameState, throwShells, calculatePossibleMoves, executeMove } from './GameEngine';
import { Board } from './components/Board';
import { PlayerDashboard } from './components/PlayerDashboard';
import { Controls } from './components/Controls';
import { ShellsDisplay } from './components/ShellsDisplay';

const createInitialState = (): GameState => {
  const state = initializeGameState(4);
  state.players[0].pawns[0].status = 'on-board';
  state.players[0].pawns[0].position = 4;
  state.players[1].pawns[0].status = 'on-board';
  state.players[1].pawns[0].position = 31;
  return state;
};

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [rollValue, setRollValue] = useState<number | null>(null);
  const [selectedPawn, setSelectedPawn] = useState<{playerId: number, pawnId: number} | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Map<number, number>>(new Map());
  const [highlightedPath, setHighlightedPath] = useState<number[]>([]);

  const resetTurnState = () => {
    setRollValue(null);
    setSelectedPawn(null);
    setPossibleMoves(new Map());
  };

  const handleThrowShells = () => {
    if (rollValue !== null) return;
    const value = throwShells();
    setRollValue(value);
    const moves = calculatePossibleMoves(gameState, gameState.currentPlayerIndex, value);
    setPossibleMoves(moves);
    // If no moves are possible, automatically end the turn after a short delay
    if (moves.size === 0) {
      setTimeout(() => {
        setGameState(prevState => ({
          ...prevState,
          currentPlayerIndex: (prevState.currentPlayerIndex + 1) % prevState.players.length
        }));
        resetTurnState();
      }, 1500);
    }
  };

  const handlePawnClick = (playerId: number, pawnId: number) => {
    if (playerId !== gameState.currentPlayerIndex || rollValue === null) return;
    if (possibleMoves.has(pawnId)) {
      setSelectedPawn({ playerId, pawnId });
    } else {
      console.log("This pawn cannot be moved with the current roll.");
    }
  };

  const handleSquareClick = (squareIndex: number) => {
    if (!selectedPawn) return;

    const targetSquare = possibleMoves.get(selectedPawn.pawnId);
    if (targetSquare === squareIndex) {
      const newState = executeMove(
        gameState,
        selectedPawn.playerId,
        selectedPawn.pawnId,
        targetSquare
      );
      setGameState(newState);
      resetTurnState(); // Reset for the next player's turn
    }
  };

  const handleShowPath = (path: number[]) => {
    setHighlightedPath(path);
    // 3 సెకన్ల తర్వాత పాత్‌ను క్లియర్ చేయండి
    setTimeout(() => setHighlightedPath([]), 3000); 
  };
  const canThrow = rollValue === null;
  const currentPlayerId = gameState.currentPlayerIndex;

  // This is a placeholder for now
  const getCapturedByPlayer = () => { return []; };

  return (
    <main className="bg-gray-100 min-h-screen w-full flex items-center justify-center p-4">
      <div className="flex flex-col space-y-4 mr-8">
        {gameState.players.slice(0, 2).map(player => (
          <PlayerDashboard 
            key={player.id} 
            player={player} 
            isCurrentPlayer={player.id === currentPlayerId}
            capturedPawns={getCapturedByPlayer()}
            onShowPath={handleShowPath}
          />
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-blue-700">అష్టా చమ్మా</h1>
        </div>
        <Board
          gameState={gameState}
          onPawnClick={handlePawnClick}
          onSquareClick={handleSquareClick} // Pass the new handler
          selectedPawn={selectedPawn}
          possibleMoves={possibleMoves}
          highlightedPath={highlightedPath} 
        />
        <div className="flex items-center space-x-8 mt-6">
          <ShellsDisplay rollValue={rollValue} />
          <Controls onThrowShells={handleThrowShells} canThrow={canThrow} />
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 ml-8">
        {gameState.players.slice(2, 4).map(player => (
          <PlayerDashboard 
            key={player.id} 
            player={player} 
            isCurrentPlayer={player.id === currentPlayerId}
            capturedPawns={getCapturedByPlayer()}
            onShowPath={handleShowPath}
          />
        ))}
      </div>
    </main>
  );
}

export default App;