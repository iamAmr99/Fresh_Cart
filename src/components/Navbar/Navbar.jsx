import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import logo from '../Assets/imgs/freshcart-logo.svg'
import { useContext } from 'react';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';


export default function Navbar() {
  let { counter } = useContext(CounterContext);
  let { userToken, setUserToken  } = useContext(UserContext);
  let navigate = useNavigate()
  function logOut(params) {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
}
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken !== null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
              </>
              : ''}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            {userToken !== null ?
              <>
                <li className="nav-item">
                  <span onClick={()=>logOut()} className="nav-link cursor-pointer" >Logout</span>
                </li>
              </> : <>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            }

          </ul>
        </div>
      </div>
    </nav>
  </>
}