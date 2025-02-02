import React, { useState, useEffect } from "react";
import axios from "axios";
import "./quiz.css"; // Importing CSS for styling

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        if (response.data?.questions && Array.isArray(response.data.questions)) {
          setQuestions(response.data.questions);
        } else {
          throw new Error("API response does not contain 'questions' array.");
        }
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
      });
  }, []);

  const handleAnswer = (option) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(option);
      setIsAnswerSubmitted(true);
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: option.description,
      }));

      const correctAnswer = questions[currentQuestionIndex]?.options.find(o => o.is_correct)?.description;
      if (option.description === correctAnswer) {
        setStreak(prevStreak => prevStreak + 1);
        updateBadges(streak + 1);
      } else {
        setStreak(0);
      }
    }
  };

  const updateBadges = (newStreak) => {
    const newBadges = [];
    if (newStreak >= 3) newBadges.push("🔥 Streak Master!");
    if (score >= 20) newBadges.push("🏆 Quiz Champion!");
    setBadges(newBadges);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSubmitted(false);
      setSelectedOption(null);
    } else {
      setIsQuizFinished(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = question.options.find(option => option.is_correct)?.description;
      if (userAnswer === correctAnswer) {
        totalScore += 4;
      }
    });
    setScore(totalScore);
    updateBadges(totalScore);
  };

  if (!questions.length) return <p className="loading">⏳ Loading quiz...</p>;

  if (isQuizFinished) {
    return (
      <div>
        <div className="logo-bar">🎓 Quiz App</div>
        <div className="quiz-container">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {questions.length * 4}.</p>
          <div className="badges">
            {badges.map((badge, index) => (
              <p key={index} className="badge">{badge}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion?.options.find(option => option.is_correct)?.description;

  return (
    <div>
      <div className="logo-bar">🎓 Quiz App</div>
      <div className="quiz-wrapper">
        <div className="quiz-container">
          <h2>{currentQuestion?.description || "No question available"}</h2>
          <p className="streak">🔥 Streak: {streak}</p>
          <ul>
            {currentQuestion?.options?.map((option, index) => {
              const isSelected = selectedOption === option;
              return (
                <li key={index} className="option-item">
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={option.description}
                      checked={isSelected}
                      onChange={() => handleAnswer(option)}
                      disabled={isAnswerSubmitted}
                    />
                    {option.description}
                  </label>
                  {isAnswerSubmitted && isSelected && (
                    <span className={option.description === correctAnswer ? "correct" : "incorrect"}>
                      {option.description === correctAnswer ? " ✔ Correct" : " ✖ Incorrect"}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {isAnswerSubmitted && (
            <div>
              <p className="correct-answer">Correct Answer: <strong>{correctAnswer}</strong></p>
              <button onClick={handleNext} className="next-button">
                {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
