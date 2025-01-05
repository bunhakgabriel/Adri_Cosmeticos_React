import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './public/componentes/Navbar/Navbar'
import { Rodape } from './public/componentes/Rodape/Rodape'
import HomeScreen from "./public/screens/HomeScreen/HomeScreen"

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Rodape />
    </>
  )
}

export default App
