// src/GameEngine.ts
import { CORRECT_MOVEMENT_PATHS, START_SQUARES } from './constants';
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
// export const throwShells = (): number => {
//   // Let's simulate 5 shells. 1 = open, 0 = closed.
//   const openShells = Array.from({ length: 5 }, () => Math.round(Math.random())).reduce((sum, val) => sum + val, 0);

//   if (openShells === 0 || openShells === 5) {
//     return 8; // Ashta
//   }
//   if (openShells === 4) {
//     return 4; // Chamma
//   }
//   return openShells; // 1, 2, or 3
// };

/**
 * FOR TESTING: This version has a higher probability of rolling 4 or 8.
 * REMEMBER TO REVERT THIS LATER.
 */
export const throwShells = (): number => {
  const random = Math.random();
  if (random < 0.4) {
    return 4; // 40% chance of rolling a 4
  } else if (random < 0.6) {
    return 8; // 20% chance of rolling an 8
  }
  
  // 40% chance for other numbers
  const openShells = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
  return openShells;
};

export const calculatePossibleMoves = (
  gameState: GameState,
  playerId: number,
  rollValue: number
): Map<number, number> => {
  const possibleMoves = new Map<number, number>();
  const player = gameState.players[playerId];
  const playerPath = CORRECT_MOVEMENT_PATHS[playerId];
  const startSquare = START_SQUARES[playerId];

  if (!playerPath) return possibleMoves;

  // 1. Check for possible moves for pawns already on the board
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

  // 2. Check for deployment moves if roll is 4 (Chamma) or 8 (Ashta)
  if (rollValue === 4 || rollValue === 8) {
    const unDeployedPawn = player.pawns.find(p => p.status === 'un-deployed');
    if (unDeployedPawn) {
      // We use a special negative number to signify a deployment move.
      // The pawnId will be the key, and the target will be its start square.
      // But to differentiate from a normal move to the start square, we'll handle this uniquely.
      // Let's use a convention: a move to the start square for an un-deployed pawn is a deployment.
      // For now, we'll represent this by mapping the un-deployed pawn's ID to the start square.
      possibleMoves.set(unDeployedPawn.id, startSquare);
    }
    // Ashta (8) allows deploying two pawns, but we'll handle that logic later.
    // For now, one deployment is enough to build the feature.
  }

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
  const newState = JSON.parse(JSON.stringify(currentState));
  
  const player = newState.players.find(p => p.id === playerId);
  if (!player) return newState;

  const pawnToMove = player.pawns.find(p => p.id === pawnId);
  if (!pawnToMove) return newState;
  
  // If the pawn was un-deployed, its status changes to on-board
  if (pawnToMove.status === 'un-deployed') {
    pawnToMove.status = 'on-board';
  }

  pawnToMove.position = targetSquare;

  // TODO: Capturing logic

  newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
  return newState;
};
