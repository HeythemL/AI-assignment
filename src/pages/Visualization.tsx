import { useEffect, useState } from "react";
import Button from "../components/Button";
import Maze from "../components/Maze";
import useMaze from "../hooks/useMaze";
import { Link } from "react-router";
import { generateMaze } from "../utils/generateMaze";
import { isValidCell } from "../utils/generateMaze";

const Game = () => {
  const { maze, setMaze, currentCell, setCurrentCell } = useMaze(12);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const algorithms = ["BFS", "DFS", "A*"];
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const actions = ["Run Simulation", "Reset"];
  const [solutionPath, setSolutionPath] = useState<{ x: number; y: number }[]>(
    []
  );
  const [visitedCells, setVisitedCells] = useState<{ x: number; y: number }[]>(
    []
  );
const [animationTime, setAnimationTime] = useState(250); // Default speed

  const runSimulationAction = () => {
    if (solutionPath.length > 0) {
      setSimulationRunning(true);
      const interval = setInterval(() => {
        if (solutionPath.length > 0) {
          setCurrentCell({ X: solutionPath[0].x, Y: solutionPath[0].y });
          solutionPath.shift();
        } else {
          setSimulationRunning(false);
          clearInterval(interval);
        }
      }, 100);
    }
  };

  const resetAction = () => {
    setSelectedAlgorithm("");
    setCurrentCell({ X: 1, Y: 1 });
    setSolutionPath([]);
    setVisitedCells([]);
    setMaze(generateMaze(12,8));
  };

  const BfsAlgorithm = () => {
    //initialize
    const visited: { x: number; y: number }[] = [];
    const queue: { x: number; y: number }[] = [];
    const parents = new Map();
    parents.set("6 0", null);
    queue.push({ x: 6, y: 0});
    let found = false;

    //iterate
    while (queue.length > 0 && !found) {
      const curr = queue.shift()!;
      visited.push(curr);
      if (maze[curr.x][curr.y] === "E") {
        found = true;
        break;
      }
      const neighbors = [
        { x: curr.x + 1, y: curr.y },
        { x: curr.x, y: curr.y + 1 },
        { x: curr.x, y: curr.y - 1 },
        { x: curr.x - 1, y: curr.y },
      ];
      for (const neighbor of neighbors) {
        if (
          isValidCell(neighbor.x, neighbor.y, maze[0].length, maze.length) &&
          maze[neighbor.x][neighbor.y] !== "1" &&
          !visited.some((v) => v.x === neighbor.x && v.y === neighbor.y)
        ) {
          queue.push(neighbor);
          parents.set(`${neighbor.x} ${neighbor.y}`, curr);
        }
      }
    }

    //construct solution
    if (found) {
      const solutionPath: { x: number; y: number }[] = [];
      let last = visited[visited.length - 1];
      while (last !== null) {
        solutionPath.unshift(last);
        last = parents.get(`${last.x} ${last.y}`);
      }

      let visitedCurr = 0;
      const visitedBuilder = setInterval(() => {
        if (visitedCurr < visited.length - 1) {
          setSimulationRunning(true);
          setVisitedCells((prev) => [...prev, visited[visitedCurr]]);
          visitedCurr++;
        } else {
          clearInterval(visitedBuilder);
          setSimulationRunning(false);

          // Start solution path animation after visited cells animation is done
          let solutionCurr = 0;
          const solutionBuilder = setInterval(() => {
            if (solutionCurr < solutionPath.length - 1) {
              setSimulationRunning(true);
              setSolutionPath((prev) => [...prev, solutionPath[solutionCurr]]);
              solutionCurr++;
            } else {
              clearInterval(solutionBuilder);
              setSimulationRunning(false);
            }
          }, animationTime);
        }
      }, animationTime);
    }
  };

  const DfsAlgorithm = () => {
    //initialize
    const visited: { x: number; y: number }[] = [];
    const stack: { x: number; y: number }[] = [];
    const parents = new Map();
    parents.set("6 0", null);
    stack.push({ x: 6, y: 0});
    let found = false;

    //iterate
    while (stack.length > 0 && !found) {
      const curr = stack.pop()!;
      visited.push(curr);
      if (maze[curr.x][curr.y] === "E") {
        found = true;
        break;
      }
      const neighbors = [
        { x: curr.x + 1, y: curr.y },
        { x: curr.x, y: curr.y + 1 },
        { x: curr.x, y: curr.y - 1 },
        { x: curr.x - 1, y: curr.y },
      ];
      for (const neighbor of neighbors) {
        if (
          isValidCell(neighbor.x, neighbor.y, maze[0].length, maze.length) &&
          maze[neighbor.x][neighbor.y] !== "1" &&
          !visited.some((v) => v.x === neighbor.x && v.y === neighbor.y)
        ) {
          stack.push(neighbor);
          parents.set(`${neighbor.x} ${neighbor.y}`, curr);
        }
      }
    }

    //construct solution
    if (found) {
      const solutionPath: { x: number; y: number }[] = [];
      let last = visited[visited.length - 1];
      while (last !== null) {
        solutionPath.unshift(last);
        last = parents.get(`${last.x} ${last.y}`);
      }

      let visitedCurr = 0;
      const visitedBuilder = setInterval(() => {
        if (visitedCurr < visited.length - 1) {
          setSimulationRunning(true);
          setVisitedCells((prev) => [...prev, visited[visitedCurr]]);
          visitedCurr++;
        } else {
          clearInterval(visitedBuilder);
          setSimulationRunning(false);

          // Start solution path animation after visited cells animation is done
          let solutionCurr = 0;
          const solutionBuilder = setInterval(() => {
            if (solutionCurr < solutionPath.length - 1) {
              setSimulationRunning(true);
              setSolutionPath((prev) => [...prev, solutionPath[solutionCurr]]);
              solutionCurr++;
            } else {
              clearInterval(solutionBuilder);
              setSimulationRunning(false);
            }
          }, animationTime);
        }
      }, animationTime);
    }
  };

  const AStarAlgorithm = () => {
    // Initit
    const visited: { x: number; y: number }[] = []; // nodes already evaluated
    const openSet: { x: number; y: number; f: number; g: number; h: number }[] =
      []; // nodees to be evaluated
    const parents = new Map(); // for backtracking
    const gScore = new Map(); // cost from srart
    const fScore = new Map(); // stores f = g  +  h

    // Find End (x,y)
    let endPosition = { x: 0, y: 0 };
    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] === "E") {
          endPosition = { x: i, y: j };

          break;
        }
      }
    }

    // Heuristic function (Manhattan distance)
    // calculate with the law of |x1-x2| + |y1-y2}
    // usees the endPosition to calculate it
    const heuristic = (x: number, y: number) => {
      return Math.abs(x - endPosition.x) + Math.abs(y - endPosition.y);
    };

    // set up for start node (parents = null , g = 0 , calulate h )
    const start = { x: 6, y: 0 };
    const startKey = `6 0`;
    parents.set(startKey, null);
    gScore.set(startKey, 0);
    const h = heuristic(start.x, start.y);
    const g = 0;
    fScore.set(startKey, h + g);
    openSet.push({ x: start.x, y: start.y, f: h, g: 0, h });

    let found = false;

    // Loop
    while (openSet.length > 0 && !found) {
      // Sort by fScore
      openSet.sort((a, b) => a.f - b.f);

      // Get the node with lowest fScore
      const current = openSet.shift()!;
      const currentKey = `${current.x} ${current.y}`;

      // Add to visited list
      visited.push({ x: current.x, y: current.y });

      // Check if we reached the end
      if (maze[current.x][current.y] === "E") {
        found = true;
        break;
      }

      // neighbors
      const neighbors = [
        { x: current.x + 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 },
        { x: current.x - 1, y: current.y },
      ];

      for (const neighbor of neighbors) {
        // Skip if not valid or is a wall
        if (
          !isValidCell(neighbor.x, neighbor.y, maze[0].length, maze.length) ||
          maze[neighbor.x][neighbor.y] === "1"
        ) {
          continue;
        }

        const neighborKey = `${neighbor.x} ${neighbor.y}`;

        // Calculate new gScore
        const new_gScore = gScore.get(currentKey) + 1;

        // If this path is better than previous one
        if (!gScore.has(neighborKey) || new_gScore < gScore.get(neighborKey)) {
          // Update path and scores
          parents.set(neighborKey, { x: current.x, y: current.y });
          gScore.set(neighborKey, new_gScore);
          const h = heuristic(neighbor.x, neighbor.y);
          const f = new_gScore + h;
          fScore.set(neighborKey, f);

          // Add to open set if not already there
          if (
            !openSet.some(
              (node) => node.x === neighbor.x && node.y === neighbor.y
            )
          ) {
            openSet.push({
              x: neighbor.x,
              y: neighbor.y,
              f,
              g: new_gScore,
              h,
            });
          }
        }
      }
    }

    // Construct solution path
    if (found) {
      const solutionPath: { x: number; y: number }[] = [];
      let last = visited[visited.length - 1];
      while (last !== null) {
        solutionPath.unshift(last);
        last = parents.get(`${last.x} ${last.y}`);
      }

      let visitedCurr = 0;
      const visitedBuilder = setInterval(() => {
        if (visitedCurr < visited.length - 1) {
          setSimulationRunning(true);
          setVisitedCells((prev) => [...prev, visited[visitedCurr]]);
          visitedCurr++;
        } else {
          clearInterval(visitedBuilder);
          setSimulationRunning(false);

          // Start solution path animation after visited cells animation is done
          let solutionCurr = 0;
          const solutionBuilder = setInterval(() => {
            if (solutionCurr < solutionPath.length - 1) {
              setSimulationRunning(true);
              setSolutionPath((prev) => [...prev, solutionPath[solutionCurr]]);
              solutionCurr++;
            } else {
              clearInterval(solutionBuilder);
              setSimulationRunning(false);
            }
          }, animationTime);
        }
      }, animationTime);
    }
  };

  useEffect(() => {
    setSolutionPath([]);
    setVisitedCells([]);
    setCurrentCell({ X: 6, Y: 0 });

    if (selectedAlgorithm === "BFS") {
      BfsAlgorithm();
    }
    if (selectedAlgorithm === "DFS") {
      DfsAlgorithm();
    }
    if (selectedAlgorithm === "A*") {
      AStarAlgorithm();
    }
  }, [selectedAlgorithm]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <Link to="/">
        <button className="mt-4 absolute px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-100 transition">
          Back
        </button>
      </Link>
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
          <div className="bg-gray-100 rounded-xl shadow-md p-8 pb-4 w-full lg:top-6 lg:self-start">
            
            <p className="mt-2 text-red-500">
              *Choose the search algorithm you'd like to use, the simulation of it will start automatically.*
            </p>
            
            {/* Algorithm Selection */}
            <div className="flex justify-around">
              <div className="flex items-center my-2">
                <h2 className="font-semibold text-xl text-gray-700 pr-3">Algorithm</h2>
                <div className="flex flex-wrap gap-2">
                  {algorithms.map((algorithm) => (
                    <Button
                      key={algorithm}
                      disabled={simulationRunning}
                      text={algorithm}
                      className={`px-3 py-1 font-semibold text-sm rounded-lg transition-all ${
                        selectedAlgorithm === algorithm
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      action={() => setSelectedAlgorithm(algorithm)}
                    />
                  ))}
                </div>

                {/* Reset Button */}
                <div className="ml-10">
                  <Button
                    text="Reset"
                    disabled={simulationRunning}
                    className={`px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all ${
                      simulationRunning ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    action={resetAction}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 my-2">
                <h2 className="font-semibold text-gray-700">
                  Animation Time (Higher = Slower)
                </h2>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={animationTime}
                  onChange={(e) => setAnimationTime(Number(e.target.value))}
                  className="w-40 cursor-pointer"
                />
              </div>
            </div>


            <div>
              <div className="flex gap-3 justify-center">
                {[
                  { color: "bg-gray-700", label: "Wall" },
                  { color: "bg-white border border-gray-300", label: "Graph Nodes" },
                  { color: "bg-green-300", label: "Solution Path" },
                  { color: "bg-blue-300", label: "Visited Cells" },
                  { color: "bg-blue-500", label: "Start Node" },
                  { color: "bg-red-500", label: "Goal Node" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${color}`}></div>
                    <span className="text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 flex items-center justify-center rounded-xl shadow-md p-4 w-full mt-4">
          <div className="overflow-auto">
            <Maze
              maze={maze}
              currentCell={currentCell}
              solutionPath={solutionPath}
              visitedPath={visitedCells}
            />
          </div>
        </div>
      </div>
  );
};

export default Game;
