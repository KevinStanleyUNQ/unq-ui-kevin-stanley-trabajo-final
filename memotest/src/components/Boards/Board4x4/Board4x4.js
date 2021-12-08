import React from "react";
import GameToken from "../../GameToken/GameToken";
import "./Board4x4.css";

const Board4x4 = ({ animating, handleMemoClick, memoBlocks }) => {
  return (
    <div className="board">
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

export default Board4x4;
