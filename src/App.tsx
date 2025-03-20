import OneToFourQuestions from "./pages/OneToFourQuestions";
import Visualization from "./pages/Visualization";
import { Routes, Route } from "react-router";

function App() {
  return (
      <Routes>
        <Route path="/" element={<OneToFourQuestions />} />
        <Route path="/visu" element={<Visualization />} />
      </Routes>
  );
}

export default App;
