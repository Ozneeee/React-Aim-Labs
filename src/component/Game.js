import "../App.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Game

function Game() {
  const [score, setScore] = useState(0);
  let { username } = useParams();
  const [time, setTime] = useState(-3500);
  const [running, setRunning] = useState(true);

  const { number } = useSpring({
    reset: false,
    from: { number: 3 },
    number: 0,
    delay: 800,
    config: {
      duration: 3000,
    },
    onRest: () => {
      startGame();
    },
  });

  const startGame = () => {
    const preGame = document.querySelector(".pre-game-container");
    const game = document.querySelector(".game-container");
    const target = document.querySelector(".target");
    preGame.style.visibility = "hidden";
    game.style.visibility = "visible";
    target.style.visibility = "visible";
  };

  const changeCoord = () => {
    const target = document.querySelector(".target");
    target.style.top = `${getRndInteger(5, 95)}%`;
    target.style.left = `${getRndInteger(5, 95)}%`;
    setScore(score + 1);
  };

  const gameOver = () => {
    const redScreen = document.querySelector(".game-container");
    const target = document.querySelector(".target");
    const endScreen = document.querySelector(".endScreen");
    redScreen.style.visibility = "hidden";
    target.style.visibility = "hidden";
    endScreen.style.visibility = "visible";
    setRunning(false);
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="Game">
      <div className="pre-game-container">
        <h1>Bienvenue {username}</h1>
        <animated.div className="countdown">
          {number.to((n) => n.toFixed(0))}
        </animated.div>
      </div>
      <div onClick={gameOver} className="game-container">
        <div className="stats-container">
          <div className="stopwatch">
            {" "}
            Time :{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            {("0" + ((time / 10) % 100)).slice(-2)}
          </div>
          <div>Score : {score}</div>
        </div>
      </div>
      <div onClick={changeCoord} className="target"></div>
      <div className="endScreen">
        <h1>Game Over !</h1>
        <button onClick={() => window.location.reload()}>Restart</button>
        <div>
          Your score is : {score} made in{" "}
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          {("0" + ((time / 10) % 100)).slice(-2)} seconds
        </div>
      </div>
    </div>
  );
}

export default Game;
