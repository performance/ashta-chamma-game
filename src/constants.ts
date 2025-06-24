// src/constants.ts

export const BOARD_SIZE = 7;
export const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

// Indices of the safe squares on the 7x7 board (0-48)
export const SAFE_SQUARES = new Set([
  3,  // Player 0 Start
  21, // Player 1 Start
  45, // Player 2 Start
  27, // Player 3 Start
  8, // Inner corner
  12, // Inner corner
  36, // Inner corner
  40, // Inner corner
  24, // Center Home square
]);

// Player starting squares
export const START_SQUARES: { [key: number]: number } = {
  0: 3,  // Player 0 (top-middle)
  1: 21, // Player 1 (middle-left)
  2: 45, // Player 2 (bottom-middle)
  3: 27, // Player 3 (middle-right)
};

// Player colors for easy access
export const PLAYER_COLORS: { [key: number]: string } = {
  0: 'bg-red-500',
  1: 'bg-blue-500',
  2: 'bg-green-500',
  3: 'bg-yellow-400',
};

export const PLAYER_BORDERS: { [key: number]: string } = {
    0: 'border-red-500',
    1: 'border-blue-500',
    2: 'border-green-500',
    3: 'border-yellow-400',
};