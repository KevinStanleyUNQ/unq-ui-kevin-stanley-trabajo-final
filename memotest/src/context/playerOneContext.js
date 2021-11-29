import React, { createContext, useState } from "react";

const PlayerOneContext = createContext();

const PlayerOneProvider = ({ children }) => {  
  const [playerOneContext, setPlayerOneContext] = useState({
    displayname: "",
    isWinner: false,
  });

  const data = { playerOneContext, setPlayerOneContext};

  return <PlayerOneContext.Provider value={data}>{children}</PlayerOneContext.Provider>;
};

export { PlayerOneProvider };
export default PlayerOneContext;
