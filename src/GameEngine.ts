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