import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import PlayerOneContext from "../../context/playerOneContext.js";
import Board4x4 from "./Board4x4/Board4x4.js";
import Board6x4 from "./Board6x4/Board6x4.js";
import Board8x8 from "./Board8x8/Board8x8.js";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./BoardGame.css";
import BoardContext from "../../context/boardContext.js";
import { redirectToLogin, shuffleArray } from "../../utils/functionsGlobal.js";

const BoardGame = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { playerOneContext, setPlayerOneContext } =
    useContext(PlayerOneContext);
  const { boardContext } = useContext(BoardContext);

  const navigate = useNavigate();

  const emojiList4x4 = [..."😜😁😒😊😂🤣😍😎"];
  const emojiList6x4 = [..."😜😁😒😊😂🤣😍😎👀✨🌹💋"];
  const emojiList8x8 = [
    ..."😜😁😒😊😂🤣😍😎👀✨🎁🤔🌹💋🎶🐱‍🚀🎂😈👹👽👻🤖💩😱🥵🥶🤪😴😣🤑",
  ];

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
    if (boardContext.isBoard4x4) {
      reloadBoard(emojiList4x4);
    } else if (boardContext.isBoard6x4) {
      reloadBoard(emojiList6x4);
    } else {
      reloadBoard(emojiList8x8);
    }
  };

  const reloadBoard = (emojiList) => {
    setPlayerOneContext({ ...playerOneContext, isWinner: false });
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  };

  const shuffle = () => {
    let arrayShuffle = [];
    if (boardContext.isBoard4x4) {
      arrayShuffle = shuffleArray([...emojiList4x4, ...emojiList4x4]);
    } else if (boardContext.isBoard6x4) {
      arrayShuffle = shuffleArray([...emojiList6x4, ...emojiList6x4]);
    } else {
      arrayShuffle = shuffleArray([...emojiList8x8, ...emojiList8x8]);
    }
    return arrayShuffle;
  };

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

        {boardContext.isBoard6x4 && (
          <Board6x4
            memoBlocks={shuffledMemoBlocks}
            animating={animating}
            handleMemoClick={handleMemoClick}
          />
        )}
        {boardContext.isBoard8x8 && (
          <Board8x8
            memoBlocks={shuffledMemoBlocks}
            animating={animating}
            handleMemoClick={handleMemoClick}
          />
        )}
        {playerOneContext.isWinner && (
          <Modal isOpen={showModal}>
            <ModalHeader>
                El Ganador es: {playerOneContext.displayname}
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
