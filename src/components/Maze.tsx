
const Maze = ({
  maze,
  currentCell,
  solutionPath,
  visitedPath
}: {
  maze: string[][];
  currentCell: {
    X: number;
    Y: number;
  };
  solutionPath: { x: number; y: number }[];
  visitedPath: { x: number; y: number }[];
}) => {
  return (
    <div className="flex flex-col">
      {maze.map((row, rowIdx) => (
        <div className="flex" key={rowIdx}>
          {row.map((column, colIdx) => (
            <div
              className={`aspect-square w-6 min-w-6 md:min-w-8  md:w-14 flex justify-center items-center   ${
                (column === "1" && "bg-gray-700") || "border border-gray-400"
              }
                ${maze[rowIdx][colIdx] === "B" && "bg-white"}
                ${
                  solutionPath.some(
                    (cell) => cell.x === rowIdx && cell.y === colIdx
                  ) ? "bg-green-300" : visitedPath.some(
                    (cell) => cell.x === rowIdx && cell.y === colIdx
                  ) ? "bg-blue-300" : ""
                }
            `}
              key={colIdx}
            >
              {currentCell?.X === rowIdx && currentCell.Y === colIdx && (
                <p className="bg-blue-500 text-white w-full h-full p-2 font-semibold">A</p>
              )}
              {maze[rowIdx][colIdx] === "E" && (
                <p className="bg-red-500 text-white w-full h-full p-2 font-semibold">B</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
