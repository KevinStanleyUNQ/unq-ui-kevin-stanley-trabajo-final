import React, { useContext, useState, useEffect } from "react";
import PlayerOneContext from "../../../context/playerOneContext";
import GameToken from "../../GameToken/GameToken";
import "./Boards6x4.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { redirectToLogin, shuffleArray } from "../../../utils/functionsGlobal";

const Board6x4 = ({ animating, handleMemoClick, memoBlocks }) => {

  return (
    <div className="board-6x4">
      {memoBlocks.map((memoBlock, i) => {
        return (
          <GameToken
            key={`${i}_${memoBlock.emoji}`}
            animating={animating}
            handleMemoClick={handleMemoClick}
            memoBlock={memoBlock}
          />
        );
      })}
    </div>
  );
};

export default Board6x4;
