import axios from 'axios'
import { createContext } from 'react'

export let cartContext = createContext()
let userToken = localStorage.getItem('userToken')
let headers = {
    token:userToken
}
function addToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers }).then((response) => response).catch((error) => error);
}
function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers }).then((response) => response).catch((error) => error)
}
function getLoggedUserCart() {
    return axios.gte(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers
    }).then((response) => response).catch((err) => err)
}
export default function cartContextProvider(props) {
    return <cartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem }}>
        {props.children}
    </cartContext.Provider>
}

