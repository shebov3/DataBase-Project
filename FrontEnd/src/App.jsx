import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './context'
import Home from './pages/Home'
import ShowNavBar from './components/ShowNavBar'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import Product from './pages/Product'


function App() {
  const { searchData, setSearchData, gameId, setGameId, userName, setUserName } = useGlobalContext();

  return (
    <>
      <ShowNavBar>
        <NavBar searchData={searchData} setSearchData={setSearchData} userName={userName} />
      </ShowNavBar>
      <Routes>
        <Route path="/" element={<Home setGameId={setGameId} gameId={gameId} />} />
        <Route path="/Products/:category" element={<Products setGameId={setGameId} />} />
        <Route path="/search" element={<Products searchData={searchData} setGameId={setGameId} />} />
        <Route path="/product/:category" element={<Product gameId={gameId} />} />
      </Routes>

    </>
  )
}

export default App
