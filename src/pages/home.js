import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="home" >
      <h1>Welcome to the Quiz!</h1>
      <button onClick={() => navigate("/quiz")}>Start Quiz</button>
    </div>
  );
}

export default Home;
