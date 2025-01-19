import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './public/componentes/Navbar/Navbar'
import { Rodape } from './public/componentes/Rodape/Rodape'
import HomeScreen from "./public/screens/HomeScreen/HomeScreen"
import { CarrinhoProvider } from './public/Context/CarrinhoContext'

function App() {

  return (
    <>
      <CarrinhoProvider>
        <Navbar />
        <Outlet />
      </CarrinhoProvider>
      <Rodape />
    </>
  )
}

export default App
