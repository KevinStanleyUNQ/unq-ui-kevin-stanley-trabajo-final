import React from "react";
import GameToken from "../../GameToken/GameToken";
import "./Board8x8.css";

const Board8x8 = ({ animating, handleMemoClick, memoBlocks }) => {
  
  return (
    <div className="board-8x8">
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

export default Board8x8;
