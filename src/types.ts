// src/types.ts

/** A pawn can be in one of these four states */
export type PawnStatus = 'un-deployed' | 'on-board' | 'captured' | 'ripe';

/** Represents a single pawn on the board */
export interface Pawn {
  id: number; // Unique ID within a player (e.g., 0, 1, 2, 3)
  status: PawnStatus;
  position?: number; // Optional: index on the board (0-48). Only present if status is 'on-board'.
}

/** Represents a player in the game */
export interface Player {
  id: number; // Unique ID for the player (e.g., 0, 1, 2, 3)
  color: string; // e.g., 'red', 'blue', 'green', 'yellow'
  pawns: Pawn[]; // An array of 4 Pawn objects
  hasUnlockedGate: boolean; // Tracks if the player has met the "capture gate" condition
}

/** Represents the entire state of the game at any moment */
export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  board: any[]; // We will define this more clearly in a later story
}