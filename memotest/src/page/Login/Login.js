import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import BoardContext from "../../context/boardContext";
import PlayerOneContext from "../../context/playerOneContext";
import "./Login.css";

const Login = () => {
  const { playerOneContext, setPlayerOneContext } =
    useContext(PlayerOneContext);

  const { boardContext, setBoardContext } = useContext(BoardContext);

  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");

  const [multiplayer, setMultiplayer] = useState(false);

  const navigate = useNavigate();

  const handlePlayerOne = (e) => {
    setPlayerOne(e.target.value);
  };

  const handlePlayerTwo = (e) => {
    setPlayerTwo(e.target.value);
  };

  const handlePlay = () => {
    setPlayerOneContext({ ...playerOneContext, displayname: playerOne });
    navigate("/game");
  };

  const chooseOnePlayer = () => {
    setMultiplayer(false);
    setPlayerTwo("");
  };

  const chooseTwoPlayers = () => {
    setMultiplayer(true);
  };

  const pickBoard4x4 = () => {
    handlePlay();
    setBoardContext({
      ...boardContext,
      isBoard4x4: true,
      isBoard5x5: false,
      isBoard8x8: false,
    });
  };

  const pickBoard5x5 = () => {
    handlePlay();
    setBoardContext({
      ...boardContext,
      isBoard4x4: false,
      isBoard5x5: true,
      isBoard8x8: false,
    });
  }

  const pickBoard8x8 = () => {
    handlePlay();
    setBoardContext({
      ...boardContext,
      isBoard4x4: false,
      isBoard5x5: false,
      isBoard8x8: true,
    });
  }
  
  

  return (
    <div className="form-players">
      <div className="choose-multiplayer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={chooseOnePlayer}
        >
          Jugar Solo
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={chooseTwoPlayers}
        >
          Jugadador Vs Jugador
        </button>
      </div>
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
        {multiplayer && (
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
        )}
      </form>
      <div className="choose-board">
        <div className="choose-board-title">
          <label>Jugar con el Tablero</label>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={pickBoard4x4}
        >
          Tablero 4x4
        </button>
        <button type="button" className="btn btn-primary"  onClick={pickBoard5x5}>
          Tablero 5x5
        </button>
        <button type="button" className="btn btn-primary"  onClick={pickBoard8x8}>
          Tablero 8x8
        </button>
      </div>
    </div>
  );
};

export default Login;
