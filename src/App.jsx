import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './public/componentes/Navbar/Navbar'
import { Rodape } from './public/componentes/Rodape/Rodape'
import HomeScreen from "./public/screens/HomeScreen/HomeScreen"
import { CarrinhoProvider } from './public/Context/CarrinhoContext'

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Força o scroll para o topo sem animação assim que a rota muda
    window.scrollTo({
      top: 0,
      behavior: "auto",  // Usa "auto" em vez de "smooth" para evitar a animação
    });
  }, [location.pathname]);

  return null;
};

function App() {

  return (
    <>
      <ScrollToTop />
      <CarrinhoProvider>
        <Navbar />
        <Outlet />
        <Rodape />
      </CarrinhoProvider>
    </>
  )
}

export default App
