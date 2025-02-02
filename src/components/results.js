import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const getBadge = () => {
    if (score >= 80) return "🏆 Gold";
    if (score >= 50) return "🥈 Silver";
    return "🥉 Bronze";
  };
  

  return (
    <div className="result">
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {score}</h2>
      <h3>Your Badge: {getBadge()}</h3>
      <button onClick={() => navigate("/")}>Play Again</button>
    </div>
  );
}

export default Result;
