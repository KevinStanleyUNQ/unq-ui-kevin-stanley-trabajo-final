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

  const [showError, setShowError] = useState({
    show: false,
    text: "",
  });

  const navigate = useNavigate();

  const handlePlayerOne = (e) => {
    setPlayerOne(e.target.value);
  };


  const handlePlay = () => {
    if (playerOne.trim() !== "") {
      setPlayerOneContext({ ...playerOneContext, displayname: playerOne });
      navigate("/game");
    } else {
      setTimeout(() => {
        setShowError({ show: true, text: "Por favor ingrese un Nombre" });
      }, 0);
      setTimeout(() => {
        setShowError({ show: false, text: "" });
      }, 3000);
    }
  };

  const chooseOnePlayer = () => {
    setBoardContext({ ...boardContext, multiplayer: false });
  };

 

  const pickBoard4x4 = () => {
    handlePlay();
    setBoardContext({
      ...boardContext,
      isBoard4x4: true,
      isBoard6x4: false,
      isBoard8x8: false,
    });
  };

  const pickBoard6x4 = () => {
    handlePlay();
    setBoardContext({
      ...boardContext,
      isBoard4x4: false,
      isBoard6x4: true,
      isBoard8x8: false,
    });
  };

  const pickBoard8x8 = () => {
    handlePlay();
    setBoardContext({
      ...boardContext,
      isBoard4x4: false,
      isBoard6x4: false,
      isBoard8x8: true,
    });
  };

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
      </div>
      <form className="players-nickname" onSubmit={handlePlay}>
        <div className="mb-3">
          <label className="form-label" id="playerOneName">
            Jugador Uno Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="playerOneName"
            name="playerOneName"
            value={playerOne}
            onChange={handlePlayerOne}
          />
        </div>
        {showError.show && (
          <div className="modal-error">
            <h5 className="error-text">{showError.text}</h5>
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={pickBoard6x4}
        >
          Tablero 6x4
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={pickBoard8x8}
        >
          Tablero 8x8
        </button>
      </div>
    </div>
  );
};

export default Login;
