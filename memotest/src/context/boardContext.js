import React, { createContext, useState } from "react";

const BoardContext = createContext();

const BoardProvider = ({ children }) => {  
  const [boardContext, setBoardContext] = useState({
    isBoard4x4: true,
    isBoard5x5: false,
    isBoard8x8: false,
    thereIsAWinner: false
  });

  const data = { boardContext, setBoardContext};

  return <BoardContext.Provider value={data}>{children}</BoardContext.Provider>;
};

export { BoardProvider };
export default BoardContext;
