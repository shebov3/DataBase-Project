import { Route, Routes } from 'react-router-dom'
import { useGlobalContext } from './context'
import Home from './pages/Home'
import ShowNavBar from './components/ShowNavBar'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import Product from './pages/Product'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Register from './pages/Register'


function App() {
  const { searchData, setSearchData, gameId, setGameId, userData, setUserData } = useGlobalContext();

  return (
    <>
      <ShowNavBar>
        <NavBar searchData={searchData} setSearchData={setSearchData} userData={userData} setUserData={setUserData} />
      </ShowNavBar>
      <Routes>
        <Route path="/" element={<Home setGameId={setGameId} gameId={gameId} />} />
        <Route path="/Products/:category" element={<Products setGameId={setGameId} />} />
        <Route path="/search" element={<Products searchData={searchData} setGameId={setGameId} />} />
        <Route path="/product/:gameId" element={<Product />} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </>
  )
}

export default App
