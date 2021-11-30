import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import PlayerOneContext from "../../context/playerOneContext.js";
import Board4x4 from "./Board4x4/Board4x4.js";
import Board6x4 from "./Board6x4/Board6x4.js";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./BoardGame.css";
import BoardContext from "../../context/boardContext.js";

const BoardGame = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { playerOneContext, setPlayerOneContext } =
    useContext(PlayerOneContext);
  const { boardContext, setBoardContext } = useContext(BoardContext);

  const navigate = useNavigate();

  const emojiList4x4 = [..."😜😁😒😊😂🤣😍😎"];
  const emojiList5x5 = [..."😜😁😒😊😂🤣😍😎👀✨🌹💋"]
  const emojiList8x8 = [..."😜😁😒😊😂🤣😍😎👀✨🎁🤔"]

  useEffect(() => {
    const shuffledEmojiList = shuffle();
    setShuffledMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  }, []);

  useEffect(() => {
    if (playerOneContext.displayname === "") {
      navigate("/");
    }
  });

  useEffect(() => {
    setShowModal(true);
  }, [playerOneContext.isWinner]);

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setselectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  const retryGame = () => {
    setPlayerOneContext({ ...playerOneContext, isWinner: false });
    const shuffledEmojiList = shuffleArray([...emojiList4x4, ...emojiList4x4]);
    setShuffledMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  };

  const redirectToLogin = () => {
    window.location.reload();
  };

  const shuffle = () => {
    let arrayShuffle = [];
    if(boardContext.isBoard4x4){
      arrayShuffle = shuffleArray([...emojiList4x4, ...emojiList4x4]);
    }
    else if(boardContext.isBoard5x5){
      arrayShuffle = shuffleArray([...emojiList5x5, ...emojiList5x5]);
    }
    else{
      arrayShuffle = shuffleArray([...emojiList8x8, ...emojiList8x8]);
    }

    return arrayShuffle;
  }
  

  return (
    <>
      <main className="displayName-players">
        <h1>Es turno del Jugador Uno: {playerOneContext.displayname}</h1>
        {boardContext.isBoard4x4 && (
          <Board4x4
            memoBlocks={shuffledMemoBlocks}
            animating={animating}
            handleMemoClick={handleMemoClick}
          />
        )}
        
        {boardContext.isBoard5x5 && (
          <Board6x4
            memoBlocks={shuffledMemoBlocks}
            animating={animating}
            handleMemoClick={handleMemoClick}
          />
        )}
        {boardContext.isBoard8x8 && (
          <Board4x4
            memoBlocks={shuffledMemoBlocks}
            animating={animating}
            handleMemoClick={handleMemoClick}
          />
        )}
        {playerOneContext.isWinner && (
          <Modal isOpen={showModal}>
            <ModalHeader>
              <h4 className="displayname-winner">
                El Ganador es: {playerOneContext.displayname}
              </h4>
            </ModalHeader>
            <ModalBody>
              <button className="btn btn-primary" onClick={retryGame}>
                Volver a Jugar
              </button>
              <button className="btn btn-primary" onClick={redirectToLogin}>
                Empezar Nuevo Juego
              </button>
            </ModalBody>
          </Modal>
        )}
        
        {/* playerTwoContext.isWinner && (
          <Modal isOpen={showModal}>
            <ModalHeader>
              <h4 className="displayname-winner">
                El Ganador es: {playerTwoContext.displayname}
              </h4>
            </ModalHeader>
            <ModalBody>
              <button className="btn btn-primary" onClick={retryGame}>
                Volver a Jugar
              </button>
              <button className="btn btn-primary" onClick={redirectToLogin}>
                Empezar Nuevo Juego
              </button>
            </ModalBody>
          </Modal> */}
      </main>
    </>
  );
};

export default BoardGame;

