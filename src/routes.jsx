import App from './App.jsx';
import CarrinhoScreen from './public/screens/CarrinhoScreen/CarrinhoScreen.jsx';
import HomeScreen from './public/screens/HomeScreen/HomeScreen.jsx'
import PainelAdmScreen from './public/screens/PainelAdm/PainelAdmScreen.jsx';
import ProdutosScreen from './public/screens/ProdutosScreen/ProdutosScreen.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <h1>ERRO 404! Página não encontrada.</h1>,
    children: [
      {
        path: '/',
        element: <HomeScreen />
      },
      {
        path: '/produtos',
        element: <ProdutosScreen />
      },
      {
        path: '/carrinho',
        element: <CarrinhoScreen />
      }
    ]
  },
  {
    path: '/painel-adm',
    element: <PainelAdmScreen />
  }
]

export default routes;