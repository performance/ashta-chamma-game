// src/GameEngine.ts
// import { MOVEMENT_PATHS } from './constants'; 
import { CORRECT_MOVEMENT_PATHS } from './constants'; 
// import type { GameState } from './types';
import type { GameState, Player, Pawn } from './types';

// Predefined colors for players
const PLAYER_COLORS = ['red', 'blue', 'green', 'yellow'];

/**
 * Initializes and returns a new game state for a given number of players.
 * @param playerCount The number of players for the game (2-4).
 * @returns A new GameState object.
 */
export const initializeGameState = (playerCount: number): GameState => {
  const players: Player[] = [];

  for (let i = 0; i < playerCount; i++) {
    const pawns: Pawn[] = [];
    for (let j = 0; j < 4; j++) {
      pawns.push({
        id: j,
        status: 'un-deployed',
      });
    }

    players.push({
      id: i,
      color: PLAYER_COLORS[i],
      pawns: pawns,
      hasUnlockedGate: false,
    });
  }

  return {
    players: players,
    currentPlayerIndex: 0,
    board: [], // Board layout will be handled later
  };
};

/**
 * Simulates a throw of 5 shells and returns the score based on the rules.
 * Ashta (8 points): All 5 open OR all 5 closed.
 * Chamma (4 points): Exactly 4 open.
 * Others: Number of open shells.
 * @returns The score (1, 2, 3, 4, or 8).
 */
export const throwShells = (): number => {
  // Let's simulate 5 shells. 1 = open, 0 = closed.
  const openShells = Array.from({ length: 5 }, () => Math.round(Math.random())).reduce((sum, val) => sum + val, 0);

  if (openShells === 0 || openShells === 5) {
    return 8; // Ashta
  }
  if (openShells === 4) {
    return 4; // Chamma
  }
  return openShells; // 1, 2, or 3
};


export const calculatePossibleMoves = (
  gameState: GameState,
  playerId: number,
  rollValue: number
): Map<number, number> => {
  const possibleMoves = new Map<number, number>();
  const player = gameState.players[playerId];
  // ఇక్కడ కూడా సరైన వేరియబుల్‌ను వాడండి
  const playerPath = CORRECT_MOVEMENT_PATHS[playerId]; 

  if (!playerPath) return possibleMoves;

  player.pawns.forEach(pawn => {
    if (pawn.status === 'on-board' && pawn.position !== undefined) {
      const pathIndex = playerPath.indexOf(pawn.position);
      
      if (pathIndex !== -1) {
        const newPathIndex = pathIndex + rollValue;
        if (newPathIndex < playerPath.length) {
          const targetSquare = playerPath[newPathIndex];
          possibleMoves.set(pawn.id, targetSquare);
        }
      }
    }
  });

  return possibleMoves;
};

/**
 * Executes a move and returns the new game state.
 * @param currentState The current state of the game.
 * @param playerId The ID of the player making the move.
 * @param pawnId The ID of the pawn being moved.
 * @param targetSquare The board index where the pawn is moving to.
 * @returns A new GameState object reflecting the move.
 */
export const executeMove = (
  currentState: GameState,
  playerId: number,
  pawnId: number,
  targetSquare: number
): GameState => {
  // Create a deep copy of the state to avoid direct mutation
  const newState = JSON.parse(JSON.stringify(currentState));
  
  const player = newState.players.find(p => p.id === playerId);
  if (!player) return newState; // Should not happen

  const pawnToMove = player.pawns.find(p => p.id === pawnId);
  if (!pawnToMove) return newState; // Should not happen
  
  // Update the pawn's position
  pawnToMove.position = targetSquare;

  // TODO: Implement capturing logic here in a future story.
  // For now, we just move the pawn.

  // After moving, the turn should go to the next player.
  // TODO: Bonus turn logic will be added later.
  newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;

  return newState;
};
