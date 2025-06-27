// src/constants.ts (Cleaned up version)

export const BOARD_SIZE = 7;
export const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

export const SAFE_SQUARES = new Set([
  3, 21, 45, 27, // Player home squares (These are also start squares)
  8, 12, 36, 40, // Inner corners
  24,             // Central home square
]);

export const START_SQUARES: { [key: number]: number } = {
  0: 3,  // Red
  1: 21, // Blue
  2: 45, // Green
  3: 27, // Yellow
};

// Base path for Player 0 (Red, starts at top)
const P0_PATH = [
             3,  4,  5,  6, 
    13, 20, 27, 34, 41, 48, 
    47, 46, 45, 44, 43, 42, 
    35, 28, 21, 14,  7,  0,
     1,  2,
     9,  8, 15, 22, 29, 36, 37, 38, 39, 40,
     33, 26, 19, 12,
     11, 10,
     17, 18, 25, 32, 31, 30, 23, 24
];

// Helper to rotate a board index 90 degrees clockwise for our specific grid
const rotate_90_clockwise = (index: number): number => {
    const x = index % BOARD_SIZE;
    const y = Math.floor(index / BOARD_SIZE);
    // Rotation formula for a 2D grid
    const newX = BOARD_SIZE - 1 - y;
    const newY = x;
    return newY * BOARD_SIZE + newX;
}

const P1_PATH = P0_PATH.map(rotate_90_clockwise); // Player 1 (Blue)
const P2_PATH = P1_PATH.map(rotate_90_clockwise); // Player 2 (Green)
const P3_PATH = P2_PATH.map(rotate_90_clockwise); // Player 3 (Yellow)

export const CORRECT_MOVEMENT_PATHS: { [key: number]: number[] } = {
  0: P0_PATH,
  1: P1_PATH,
  2: P2_PATH,
  3: P3_PATH,
};

export const PLAYER_COLORS: { [key: number]: string } = {
  0: 'bg-red-500', 1: 'bg-blue-500', 2: 'bg-green-500', 3: 'bg-yellow-400'
};

export const PLAYER_BORDERS: { [key: number]: string } = {
  0: 'border-red-500', 1: 'border-blue-500', 2: 'border-green-500', 3: 'border-yellow-400'
};