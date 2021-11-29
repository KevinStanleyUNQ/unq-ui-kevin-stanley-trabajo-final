import React, { useContext, useState }from "react";
import { useNavigate } from "react-router";
import PlayerOneContext from "../../context/playerOneContext";
import "./Login.css";

const Login = () => {

    const { playerOneContext, setPlayerOneContext } = useContext(PlayerOneContext);

    const [playerOne, setPlayerOne] = useState("");
    const [playerTwo, setPlayerTwo] = useState("");

    const navigate = useNavigate();


    const handlePlayerOne = (e) => {
        setPlayerOne(e.target.value);
    }

    const handlePlayerTwo = (e) => {
        setPlayerTwo(e.target.value);
    }
    
    
    const handlePlay = () => {
        setPlayerOneContext({...playerOneContext, displayname: playerOne})
        navigate("/board");
    }
    


  return (
    <div className="form-players">
      <form className="players-nickname" onSubmit={handlePlay}>
        <div className="mb-3">
          <label className="form-label" id="playerOneName">
            Jugador Uno Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="playerOneName"
            name="playerOneName"
            value={playerOne}
            onChange={handlePlayerOne}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" id="playerTwoName">
            Jugador Dos Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="playerTwoName"
            name="playerTwoName"
            value={playerTwo}
            onChange={handlePlayerTwo}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          ¡Jugar!
        </button>
      </form>
    </div>
  );
};

export default Login;
