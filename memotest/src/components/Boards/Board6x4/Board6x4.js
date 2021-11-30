import React from "react";
import GameToken from "../../GameToken/GameToken";
import "./Boards6x4.css";

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
