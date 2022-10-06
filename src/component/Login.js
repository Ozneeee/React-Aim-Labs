import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function Login() {
  const [game, setGame] = useState(false);
  let navigate = useNavigate();

  const changeInput = () => {
    const playerName = document.querySelector("#playerName").value;
    if (playerName.length > 2) {
      setGame(true);
    } else {
      setGame(false);
    }
  };

  const toggleGame = (e) => {
    e.preventDefault();
    const playerName = document.querySelector("#playerName").value;
    if (playerName.length > 2) {
        navigate(`/game/${playerName}`);
    } else {
      console.log("Pseudo Invalide");
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h3>Mouse Aim Games !</h3>
        <form>
          <label htmlFor="playerName">Your name :</label>
          <input
            onChange={changeInput}
            type="text"
            name="playerName"
            id="playerName"
            placeholder="Player 1"
            maxLength={16}
          />
          <button
            style={
              game
                ? { cursor: "pointer", background: "#236623", opacity: 1 }
                : { cursor: "not-allowed", background: "red", opacity: 0.4 }
            }
            type="submit"
            onClick={toggleGame}
          >
            JOUER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
