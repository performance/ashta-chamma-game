// src/App.tsx

import { useState } from 'react';
import { Board } from './components/Board';
import { PlayerDashboard } from './components/PlayerDashboard';
import type { GameState } from './types';
import { initializeGameState } from './GameEngine';

// A mock game state for initial rendering. We will make pawns appear on board later.
const createInitialState = (): GameState => {
  const state = initializeGameState(4); // Start with 4 players
  // For testing, let's put one pawn on the board and one as ripe for Player 1
  state.players[0].pawns[0].status = 'on-board';
  state.players[0].pawns[0].position = 15; // Example position
  state.players[0].pawns[1].status = 'ripe';
  return state;
};


function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());

  return (
    <main className="bg-gray-100 min-h-screen w-full flex items-center justify-center p-4">
      {/* Player Dashboards on the Left */}
      <div className="flex flex-col space-y-4 mr-8">
        {gameState.players.slice(0, 2).map(player => (
          <PlayerDashboard key={player.id} player={player} />
        ))}
      </div>

      {/* Main Game Area */}
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-blue-700">అష్టా చమ్మా</h1>
        </div>
        <Board gameState={gameState} />
      </div>
      
      {/* Player Dashboards on the Right */}
      <div className="flex flex-col space-y-4 ml-8">
        {gameState.players.slice(2, 4).map(player => (
          <PlayerDashboard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}

export default App;