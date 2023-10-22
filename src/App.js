import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from './components/Home/Home.jsx';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import CounterContextProvider from './Context/CounterContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Product from './components/Product/Product';
import  CartContextProvider  from './Context/CartContext';
import { Toaster } from "react-hot-toast";


let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'cart', element: <ProtectedRoute> <Cart/></ProtectedRoute> },
      { path: 'product/:id', element: <ProtectedRoute> <Product /> </ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  }
])

function App() {
  return <CartContextProvider>
    <CounterContextProvider>
      <RouterProvider router={routers}> </RouterProvider>
      <Toaster/>
    </CounterContextProvider>
  </CartContextProvider>

}

export default App;