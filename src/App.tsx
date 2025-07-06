// src/App.tsx (Using useReducer)

import { useReducer } from 'react';
import { gameReducer, initialState  } from './reducer';
import type { Action } from './reducer';
import { Board } from './components/Board';
import { PlayerDashboard } from './components/PlayerDashboard';
import { Controls } from './components/Controls';
import { ShellsDisplay } from './components/ShellsDisplay';

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleThrowShells = () => dispatch({ type: 'THROW_SHELLS' });
  const handlePawnClick = (playerId: number, pawnId: number) => {
    dispatch({ type: 'SELECT_PAWN', payload: { playerId, pawnId } });
  };
  const handleSquareClick = (squareIndex: number) => {
    dispatch({ type: 'MOVE_PAWN', payload: { squareIndex } });
  };

  const currentPlayerId = state.currentPlayerIndex;
  const getCapturedByPlayer = () => []; // Placeholder

  return (
    <main className="bg-gray-100 min-h-screen w-full flex items-center justify-center p-4">
      <div className="flex flex-col space-y-4 mr-8">
        {state.players.slice(0, 2).map(p => (
          <PlayerDashboard key={p.id} player={p} isCurrentPlayer={p.id === currentPlayerId} capturedPawns={[]} onShowPath={()=>{}} onPawnClick={handlePawnClick} possibleMoves={state.possibleMoves} selectedPawn={state.selectedPawn} />
        ))}
      </div>
      
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">అష్టా చమ్మా</h1>
        <Board gameState={state} onPawnClick={handlePawnClick} onSquareClick={handleSquareClick} selectedPawn={state.selectedPawn} possibleMoves={state.possibleMoves} highlightedPath={[]} />
        <div className="flex items-center space-x-8 mt-6">
          <ShellsDisplay rolls={state.rolls} />
          <Controls onThrowShells={handleThrowShells} canThrow={state.rolls.length === 0} />
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 ml-8">
        {state.players.slice(2, 4).map(p => (
          <PlayerDashboard key={p.id} player={p} isCurrentPlayer={p.id === currentPlayerId} capturedPawns={[]} onShowPath={()=>{}} onPawnClick={handlePawnClick} possibleMoves={state.possibleMoves} selectedPawn={state.selectedPawn} />
        ))}
      </div>
    </main>
  );
}

export default App;