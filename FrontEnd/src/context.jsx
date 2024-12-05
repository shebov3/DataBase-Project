import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext)


const AppContext = (props) => {
  const [searchData, setSearchData] = useState('')
  const [gameId, setGameId] = useState(null)
  const [userName, setUserName] = useState(localStorage.getItem('name'))
  return (
    <GlobalContext.Provider value={{ searchData, setSearchData, gameId, setGameId, userName, setUserName }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default AppContext;