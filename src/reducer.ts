// src/reducer.ts

import type { GameState, Pawn } from './types';
import { initializeGameState, throwShells, calculatePossibleMoves, executeMove } from './GameEngine';

export type Action =
    { type: 'THROW_SHELLS' }
  | { type: 'SELECT_PAWN'; payload: { playerId: number; pawnId: number } }
  | { type: 'MOVE_PAWN'; payload: { squareIndex: number } };

export const initialState: GameState & {
  rolls: number[];
  selectedPawn: { playerId: number; pawnId: number } | null;
  possibleMoves: Map<number, number>;
} = {
  ...initializeGameState(4),
  rolls: [],
  selectedPawn: null,
  possibleMoves: new Map(),
};

export function gameReducer(state: typeof initialState, action: Action): typeof initialState {
  switch (action.type) {
    case 'THROW_SHELLS': {
      if (state.rolls.length > 0) return state; // Already thrown

      const value = throwShells();
      const newRolls = value === 8 ? [4, 4] : [value];
      const moves = calculatePossibleMoves(state, state.currentPlayerIndex, newRolls[0]);

      if (moves.size === 0) {
        // No moves possible for the entire roll sequence, so advance turn
        return {
            ...state,
            rolls: [], // Keep rolls empty
            currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
        };
      }

      return { ...state, rolls: newRolls, possibleMoves: moves };
    }

    case 'SELECT_PAWN': {
      const { playerId, pawnId } = action.payload;
      if (playerId !== state.currentPlayerIndex || state.rolls.length === 0) {
        return state;
      }
      if (state.possibleMoves.has(pawnId)) {
        return { ...state, selectedPawn: action.payload };
      }
      return state;
    }

    case 'MOVE_PAWN': {
      const { squareIndex } = action.payload;
      if (!state.selectedPawn || state.rolls.length === 0) return state;

      const targetSquare = state.possibleMoves.get(state.selectedPawn.pawnId);
      if (targetSquare !== squareIndex) return state; // Not a valid move

      // Execute the move
      const stateAfterMove = executeMove(state, state.selectedPawn.playerId, state.selectedPawn.pawnId, targetSquare);
      
      const remainingRolls = state.rolls.slice(1);

      if (remainingRolls.length === 0) {
        // Last move of the turn, advance to next player
        return {
          ...initialState, // Reset everything
          players: stateAfterMove.players, // Keep the updated players
          currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
        };
      } else {
        // More moves left (case of 8)
        const nextMoves = calculatePossibleMoves(stateAfterMove, state.currentPlayerIndex, remainingRolls[0]);
        return {
          ...state,
          players: stateAfterMove.players,
          rolls: remainingRolls,
          selectedPawn: null,
          possibleMoves: nextMoves,
        };
      }
    }

    default:
      return state;
  }
}