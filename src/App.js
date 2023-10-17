import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from './components/Home/Home.jsx';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart.jsx";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import CounterContextProvider from './Context/CounterContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Product from './components/Product/Product';
import  CartContextProvider  from './Context/CartContext';
import { Toaster } from "react-hot-toast";

let routers = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
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