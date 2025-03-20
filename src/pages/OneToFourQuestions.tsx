import { Link } from "react-router";
import { useState } from "react";
import GraphImg from "../imgs/Graph.png"
export default function OneToFourQuestions() {

  const [showBFSDetails, setShowBFSDetails] = useState(false);
  const [showDFSDetails, setShowDFSDetails] = useState(false);
  const [showAStarDetails, setShowAStarDetails] = useState(false);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl w-fit font-bold my-10 text-gray-800 border-b">
        AI Assignment 1CS - Laouici Heythem G04
      </h1>
      <h1 className="text-2xl font-bold mb-4">Questions 1 to 4</h1>

      {/* Answer 1 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Answer 1:</h2>
        <p>
          The search space is represented as a **graph**, where each node corresponds to a possible
          position of the robot. The edges between nodes represent possible movements based on the
          robot's allowed actions. The directions **"left"** and **"right"** correspond to the
          left and right sides of the robot, respectively.
        </p>
        <img src={GraphImg} className="w-full h-auto" />

      </div>

      {/* Answer 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Answer 2:</h2>
        <p>
          <span className="text-[18px] font-semibold">**Search Problem Formulation**</span> <br />
          🔹 <span className="font-semibold">Initial State:</span> Position of the robot (**Node A**) and positions of other nodes. <br />
          🔹 <span className="font-semibold">Actions:</span> Left, Right (relative to the robot), Up, Down. <br />
          🔹 <span className="font-semibold"> Model:</span> RESULT(Current State, Action). <br />
          🔹 <span className="font-semibold"> Path:</span> 1/C (where C can be a cost function based on movement difficulty). <br />
          🔹 <span className="font-semibold"> State: </span> Reach **Node B**.
        </p>
      </div>

            {/* Answer 3 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Answer 3:</h2>

        {/* BFS Solution */}
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Breadth-First Search (BFS):</h3>
        <p className="mb-2">
          <strong>Explored Path:</strong> A → 1 → 2 → 3 → 4 → 5 → 10 → 6 → 7 → 11 → 12 → 8 → 9 → 13 → 14 → 15 → 17 → 16 → 18 → 20 → 19 → 21 → B
        </p>
        <p className="">
          <strong>Solution Path:</strong> A → 1 → 2 → 3 → 5 → 6 → 8 → 13 → 14 → 17 → 20 → 21 → B
        </p>

        {/* Button to toggle details */}
        <button
          onClick={() => setShowBFSDetails(!showBFSDetails)}
          className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 transition"
        >
          {showBFSDetails ? "Hide Details" : "Show Details"}
        </button>

        {/* Collapsible BFS Steps */}
        {showBFSDetails && (
          <div className="mt-4 p-3 bg-gray-100 border rounded-md">
            <p className="font-semibold">BFS Steps:</p>
            <pre className="text-sm whitespace-pre-wrap">
              {`Step 0: Initialize queue with start node A
                Step 1: Add neighbors of A to queue: 1
                Step 2: Dequeue node 1
                Step 3: Add neighbors of 1 to queue: 2
                Step 4: Dequeue node 2
                Step 5: Add neighbors of 2 to queue: 3, 4
                Step 6: Dequeue node 3
                Step 7: Add neighbors of 3 to queue: 5
                Step 8: Dequeue node 4
                Step 9: Add neighbors of 4 to queue: 10
                Step 10: Dequeue node 5
                Step 11: Add neighbors of 5 to queue: 6, 7
                Step 12: Dequeue node 10
                Step 13: Add neighbors of 10 to queue: 11, 12
                Step 14: Dequeue node 6
                Step 15: Add neighbors of 6 to queue: 8
                Step 16: Dequeue node 7
                Step 17: Add neighbors of 7 to queue: 9
                Step 18: Dequeue node 11
                Step 19: Dequeue node 12
                Step 20: Add neighbors of 12 to queue: 13
                Step 21: Dequeue node 8
                Step 22: Dequeue node 9
                Step 23: Dequeue node 13
                Step 24: Add neighbors of 13 to queue: 14
                Step 25: Dequeue node 14
                Step 26: Add neighbors of 14 to queue: 15, 17
                Step 27: Dequeue node 17
                Step 28: Add neighbors of 17 to queue: 18, 20
                Step 29: Dequeue node 15
                Step 30: Add neighbors of 15 to queue: 16
                Step 31: Dequeue node 18
                Step 32: Add neighbors of 18 to queue: 19
                Step 33: Dequeue node 20
                Step 34: Add neighbors of 20 to queue: 21
                Step 35: Dequeue node 16
                Step 36: Dequeue node 19
                Step 37: Dequeue node 21
                Step 38: Add neighbors of 21 to queue: B
                Step 39: Dequeue node B → Goal Reached 🎯`}
            </pre>
          </div>
        )}
        {/* DFS Solution */}
        <h3 className="text-lg font-semibold text-gray-600 mt-6 mb-2">Depth-First Search (DFS):</h3>
        <p className="mb-2">
          <strong>Explored Path:</strong> A → 1 → 2 → 4 → 10 → 12 → 13 → 14 → 15 → 16 → 17 → 18 → 19 → 20 → 21 → B
        </p>
        <p className="mb-4">
          <strong>Solution Path:</strong> A → 1 → 2 → 4 → 10 → 12 → 13 → 14 → 17 → 20 → 21 → B
        </p>

        {/* Button to toggle DFS details */}
        <button
          onClick={() => setShowDFSDetails(!showDFSDetails)}
          className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 transition"
        >
          {showDFSDetails ? "Hide Details" : "Show Details"}
        </button>

        {/* Collapsible DFS Steps */}
        {showDFSDetails && (
          <div className="mt-4 p-3 bg-gray-100 border rounded-md">
            <p className="font-semibold">DFS Steps:</p>
            <pre className="text-sm whitespace-pre-wrap">
              {`Step 0: Initialize stack with start node A
                Step 1: Add neighbors of A to stack: 1
                Step 2: Pop node 1 from stack
                Step 3: Add neighbors of 1 to stack: 2
                Step 4: Pop node 2 from stack
                Step 5: Add neighbors of 2 to stack: 4, 3
                Step 6: Pop node 4 from stack
                Step 7: Add neighbors of 4 to stack: 10
                Step 8: Pop node 3 from stack
                Step 9: Add neighbors of 3 to stack: 5
                Step 10: Pop node 5 from stack
                Step 11: Add neighbors of 5 to stack: 7, 6
                Step 12: Pop node 7 from stack
                Step 13: Add neighbors of 7 to stack: 9
                Step 14: Pop node 6 from stack
                Step 15: Add neighbors of 6 to stack: 8
                Step 16: Pop node 8 from stack
                Step 17: Pop node 9 from stack
                Step 18: Pop node 10 from stack
                Step 19: Add neighbors of 10 to stack: 12, 11
                Step 20: Pop node 12 from stack
                Step 21: Add neighbors of 12 to stack: 13
                Step 22: Pop node 11 from stack
                Step 23: Pop node 13 from stack
                Step 24: Add neighbors of 13 to stack: 14
                Step 25: Pop node 14 from stack
                Step 26: Add neighbors of 14 to stack: 17, 15
                Step 27: Pop node 15 from stack
                Step 28: Add neighbors of 15 to stack: 16
                Step 29: Pop node 17 from stack
                Step 30: Add neighbors of 17 to stack: 20, 18
                Step 31: Pop node 20 from stack
                Step 32: Add neighbors of 20 to stack: 21
                Step 33: Pop node 18 from stack
                Step 34: Add neighbors of 18 to stack: 19
                Step 35: Pop node 19 from stack
                Step 36: Pop node 21 from stack
                Step 37: Add neighbors of 21 to stack: B
                Step 38: Pop node B → Goal Reached 🎯`}
            </pre>
          </div>
        )}
           
      </div>



      {/* Answer 4 */}
        <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Answer 4:</h2>
        {/* A* Search Solution */}
        <h3 className="text-lg font-semibold text-gray-600 mt-6 mb-2">A* (A-Star) Search:</h3>
        <p><strong>Explored Path:</strong> A → 1 → 2 → 3 → 5 → 6 → 8 → 13 → 14 → 15 → 17 → 18 → 20 → 21 → B</p>
        <p><strong>Optimal Solution Path:</strong> A → 1 → 2 → 3 → 5 → 6 → 8 → 13 → 14 → 17 → 20 → 21 → B</p>

        <button
          onClick={() => setShowAStarDetails(!showAStarDetails)}
          className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 transition"
        >
          {showAStarDetails ? "Hide Details" : "Show Details"}
        </button>

        {showAStarDetails && (
          <div className="mt-4 p-3 bg-gray-100 border rounded-md">
            <p className="font-semibold">A* Steps:</p>
            <pre className="text-sm whitespace-pre-wrap">
              {`Step 0: Initialize priority queue with (A, f(A) = g(A) + h(A) = 0 + 8 = 8)
                Step 1: Expand A → Add neighbor (1, f(1) = 1 + 6 = 7)
                Step 2: Expand 1 → Add neighbor (2, f(2) = 2 + 6 = 8)
                Step 3: Expand 2 → Add neighbor (3, f(3) = 3 + 6 = 9)
                Step 4: Expand 3 → Add neighbor (5, f(5) = 4 + 4 = 8)
                Step 5: Expand 5 → Add neighbor (6, f(6) = 5 + 12 = 17)
                Step 6: Expand 6 → Add neighbor (8, f(8) = 6 + 15 = 21)
                Step 7: Expand 8 → Add neighbor (13, f(13) = 7 + 6 = 13)
                Step 8: Expand 13 → Add neighbor (14, f(14) = 8 + 5 = 13)
                Step 9: Expand 14 → Add neighbors (17, f(17) = 9 + 6 = 15) & (15, f(15) = 9 + 4 = 13)
                Step 10: Expand 15 → Add neighbor (16, f(16) = 10 + 8 = 18)
                Step 11: Expand 17 → Add neighbors (18, f(18) = 10 + 3 = 13) & (20, f(20) = 10 + 5 = 15)
                Step 12: Expand 18 → Add neighbor (19, f(19) = 11 + 5 = 16)
                Step 13: Expand 20 → Add neighbor (21, f(21) = 11 + 2 = 13)
                Step 14: Expand 21 → Add neighbor (B, f(B) = 12 + 0 = 12)
                Step 15: Expand B → Goal Reached 🎯`}
            </pre>
          </div>
        )}      
        </div>
        <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Answer 5:</h2>
      {/* Button to navigate to the Visualization page */}
      <Link to="/visu">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Visualization
        </button>
      </Link>
    </div>
      </div>

  );
}
