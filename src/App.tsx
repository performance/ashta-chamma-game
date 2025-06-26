// src/App.tsx (Complete and Corrected)

import { useState } from 'react';
import type { GameState, Pawn as PawnType } from './types';
import { initializeGameState, throwShells, calculatePossibleMoves } from './GameEngine';
import { Board } from './components/Board';
import { PlayerDashboard } from './components/PlayerDashboard';
import { Controls } from './components/Controls';
import { ShellsDisplay } from './components/ShellsDisplay';

const createInitialState = (): GameState => {
  const state = initializeGameState(4);
  state.players[0].pawns[0].status = 'on-board';
  state.players[0].pawns[0].position = 4;
  state.players[1].pawns[0].status = 'captured';
  return state;
};

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [rollValue, setRollValue] = useState<number | null>(null);
  const [selectedPawn, setSelectedPawn] = useState<{playerId: number, pawnId: number} | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Map<number, number>>(new Map());

  const handleThrowShells = () => {
    if (rollValue !== null) return;
    const value = throwShells();
    setRollValue(value);
    const moves = calculatePossibleMoves(gameState, gameState.currentPlayerIndex, value);
    setPossibleMoves(moves);
  };

  const handlePawnClick = (playerId: number, pawnId: number) => {
    if (playerId !== gameState.currentPlayerIndex || rollValue === null) return;
    if (possibleMoves.has(pawnId)) {
      setSelectedPawn({ playerId, pawnId });
    } else {
      console.log("This pawn cannot be moved with the current roll.");
    }
  };

  const canThrow = rollValue === null;
  const currentPlayerId = gameState.currentPlayerIndex;

  const getCapturedByPlayer = (capturingPlayerId: number) => {
      const captured: { pawn: PawnType; originalPlayerId: number }[] = [];
      if (capturingPlayerId === 0 && gameState.players[1].pawns[0].status === 'captured') {
          captured.push({pawn: gameState.players[1].pawns[0], originalPlayerId: 1});
      }
      return captured;
  }

  return (
    <main className="bg-gray-100 min-h-screen w-full flex items-center justify-center p-4">
      {/* Player Dashboards on the Left */}
      <div className="flex flex-col space-y-4 mr-8">
        {gameState.players.slice(0, 2).map(player => (
          <PlayerDashboard 
            key={player.id} 
            player={player} 
            isCurrentPlayer={player.id === currentPlayerId}
            capturedPawns={getCapturedByPlayer(player.id)}
          />
        ))}
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-blue-700">అష్టా చమ్మా</h1>
        </div>
        <Board
          gameState={gameState}
          onPawnClick={handlePawnClick}
          selectedPawn={selectedPawn}
          possibleMoves={possibleMoves}
        />
        <div className="flex items-center space-x-8 mt-6">
          <ShellsDisplay rollValue={rollValue} />
          <Controls onThrowShells={handleThrowShells} canThrow={canThrow} />
        </div>
      </div>
      
      {/* Player Dashboards on the Right */}
      <div className="flex flex-col space-y-4 ml-8">
        {gameState.players.slice(2, 4).map(player => (
          <PlayerDashboard 
            key={player.id} 
            player={player} 
            isCurrentPlayer={player.id === currentPlayerId}
            capturedPawns={getCapturedByPlayer(player.id)}
          />
        ))}
      </div>
    </main>
  );
}

export default App;