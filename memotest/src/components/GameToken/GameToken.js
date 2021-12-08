import { useContext, useState } from "react";
import BoardContext from "../../context/boardContext";
import PlayerOneContext from "../../context/playerOneContext";
import "./GameToken.css";

const GameToken = ({ animating, handleMemoClick, memoBlock }) => {
  
  
  const { playerOneContext, setPlayerOneContext } =
    useContext(PlayerOneContext);

  const { boardContext } = useContext(BoardContext);

  const [allFlipped, setAllFlipped] = useState([]);

  const pickTokenCard = () => {
    let cardsFlipped = document.getElementsByClassName(
      "memo-block-inner memo-block-flipped"
    );
    setAllFlipped(cardsFlipped);
    verifyIfIsWinner();
    return !memoBlock.flipped && !animating && handleMemoClick(memoBlock);
  };

  const verifyIfIsWinner = () => {

    const conditionWinBoard4x4 = allFlipped.length + 1 === 16 && boardContext.isBoard4x4;
    const conditionWinBoard6x4 = allFlipped.length + 1 === 24 && boardContext.isBoard6x4;
    const conditionWinBoard8x8 = allFlipped.length + 1 === 64 && boardContext.isBoard8x8;
    
    if (conditionWinBoard4x4) {
      setPlayerOneContext({ ...playerOneContext, isWinner: true });
    }
    else if(conditionWinBoard6x4){
      setPlayerOneContext({ ...playerOneContext, isWinner: true });
    }
    else if(conditionWinBoard8x8){
      setPlayerOneContext({ ...playerOneContext, isWinner: true });
    }

   
  };

  return (
    <div className="memo-block" onClick={pickTokenCard}>
      <div
        className={`memo-block-inner ${
          memoBlock.flipped && "memo-block-flipped"
        }`}
      >
        <div className="memo-block-front"></div>
        <div className="memo-block-back">{memoBlock.emoji}</div>
      </div>
    </div>
  );
};
export default GameToken;
