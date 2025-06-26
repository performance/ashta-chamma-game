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

// The full path a pawn takes, starting from outside the board (index -1)
// The path is defined for Player 0. It will be rotated for other players.
export const MOVEMENT_PATH = [
  // Outer Ring (Clockwise)
  3, 4, 5, 6, 13, 20, 27, 34, 41, 40, 39, 38, 31, 24,
  // This is the "gate" square (index 14 in this path). It's square 17 on the board.
  17, 10,
  // Second Ring (Counter-Clockwise)
  11, 12, 19, 26, 33, 32, 31, 24,
  // This is the "gate" to the third ring. It's square 25 on the board.
  25, 18,
  // Third Ring (Clockwise)
  19, 20, 21, 22, 23, 24, // End at home square
];