import { useContext, useState } from "react";
import PlayerOneContext from "../../context/playerOneContext";
import "./GameToken.css";

const GameToken = ({ animating, handleMemoClick, memoBlock }) => {

    const {playerOneContext, setPlayerOneContext} = useContext(PlayerOneContext);

    const [allFlipped, setAllFlipped] = useState([]);

    const pickTokenCard = () => {
        let cardsFlipped = document.getElementsByClassName("memo-block-inner memo-block-flipped");
        setAllFlipped(cardsFlipped);
        console.log(cardsFlipped);
        if(allFlipped.length + 1 === 16){
            setPlayerOneContext({...playerOneContext, isWinner: true})
            console.log("Hay un ganador");
        }
        return !memoBlock.flipped && !animating && handleMemoClick(memoBlock)
    }
    

  return (
    <div
      className="memo-block"
      onClick={pickTokenCard}
    >
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
