export function isValidCell(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && x < height && y >= 0 && y < width;
}

export const generateMaze = (width: number = 12, height: number = 8): string[][] => {
  // Initialize maze grid filled with "0" (open paths)
  const mazeGrid = Array.from({ length: height }, () => Array(width).fill("0"));

  // Define specific barrier cells (walls) exactly as needed
  const barriers = new Set([
    "0,1", "1,1", "3,0", "4,0", "5,0", "5,1", "5,2",
    "0,3", "0,6", "0,7", "0,5", "0,10", "1,3",
    "1,7", "1,9", "1,10", "2,3", "2,5", "2,9", "2,10",
    "3,2", "3,3", "3,5", "3,7", "3,9", "3,10", "4,5",
    "4,7", "5,4", "5,5", "5,7", "5,8", "5,9", "5,10",
    "5,11", "6,4", "6,5", "7,4", "7,5"
  ]);

  // Place barriers in the maze
  for (const barrier of barriers) {
    const [x, y] = barrier.split(",").map(Number);
    if (isValidCell(x, y, width, height)) {
      mazeGrid[x][y] = "1"; // "1" represents a wall
    }
  }

  // Set start and end positions
  mazeGrid[6][0] = "B"; // Start position at (6,0)
  mazeGrid[0][11] = "E"; // End position at (0,11)

  return mazeGrid;
};
