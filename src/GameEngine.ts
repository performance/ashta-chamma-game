// src/GameEngine.ts

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

// src/GameEngine.ts లో జోడించండి

import { MOVEMENT_PATH, BOARD_SIZE, TOTAL_SQUARES, START_SQUARES } from './constants';
import type { Pawn, GameState, Player } from './types'; // import type వాడండి

// Helper function to rotate board index for different players
const rotateIndex = (index: number, player: number): number => {
  if (player === 0) return index;
  const row = Math.floor(index / BOARD_SIZE);
  const col = index % BOARD_SIZE;
  let newRow, newCol;
  switch (player) {
    case 1: // 90 deg clockwise
      newRow = col;
      newCol = BOARD_SIZE - 1 - row;
      break;
    case 2: // 180 deg
      newRow = BOARD_SIZE - 1 - row;
      newCol = BOARD_SIZE - 1 - col;
      break;
    case 3: // 270 deg clockwise (or 90 deg counter-clockwise)
      newRow = BOARD_SIZE - 1 - col;
      newCol = row;
      break;
    default:
      return index;
  }
  return newRow * BOARD_SIZE + newCol;
};

export const calculatePossibleMoves = (
  gameState: GameState,
  playerId: number,
  rollValue: number
): Map<number, number> => { // Returns a map of { pawnId: targetSquareIndex }
  const possibleMoves = new Map<number, number>();
  const player = gameState.players[playerId];

  player.pawns.forEach(pawn => {
    if (pawn.status === 'on-board' && pawn.position !== undefined) {
      const pathIndex = MOVEMENT_PATH.findIndex(p => rotateIndex(p, playerId) === pawn.position);
      
      if (pathIndex !== -1) {
        const newPathIndex = pathIndex + rollValue;
        if (newPathIndex < MOVEMENT_PATH.length) {
          const targetSquare = rotateIndex(MOVEMENT_PATH[newPathIndex], playerId);
          possibleMoves.set(pawn.id, targetSquare);
        }
      }
    }
  });

  return possibleMoves;
};