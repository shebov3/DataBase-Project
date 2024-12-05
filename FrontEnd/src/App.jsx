import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'
import Home from './pages/Home'


function App() {
  const navigate = useNavigate()
  const { searchData, setSearchData, gameId, setGameId, userName, setUserName } = useGlobalContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home setGameId={setGameId} gameId={gameId} />} />
      </Routes>

    </>
  )
}

export default App
