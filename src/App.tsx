// src/App.tsx

import { useState } from 'react';
import type { GameState } from './types'; // Use 'import type'
import { initializeGameState, throwShells } from './GameEngine';
import { Board } from './components/Board';
import { PlayerDashboard } from './components/PlayerDashboard';
import { Controls } from './components/Controls';
import { ShellsDisplay } from './components/ShellsDisplay';


// A mock game state for initial rendering.
const createInitialState = (): GameState => {
  const state = initializeGameState(4);
  state.players[0].pawns[0].status = 'on-board';
  state.players[0].pawns[0].position = 15;
  state.players[0].pawns[1].status = 'ripe';
  return state;
};


function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [rollValue, setRollValue] = useState<number | null>(null);

  const handleThrowShells = () => {
    const value = throwShells();
    setRollValue(value);
    // In the next story, we'll use this value to calculate possible moves.
  };

  // A player can throw if it's their turn and they haven't rolled yet.
  const canThrow = rollValue === null;

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
        
        {/* Game Controls and Display */}
        <div className="flex items-center space-x-8 mt-6">
          <ShellsDisplay rollValue={rollValue} />
          <Controls onThrowShells={handleThrowShells} canThrow={canThrow} />
        </div>
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