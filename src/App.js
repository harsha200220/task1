import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.js";
import Quiz from "./components/quiz.js";
import Result from "./components/results.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
