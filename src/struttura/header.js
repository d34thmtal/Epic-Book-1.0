import React from 'react';
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faGauge, faTruckFast, faGlobe, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import InputSearch from '../componenti/inputsearch';

function Header() {
    
    return (
    <header>
      <div className="px-3 py-2 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            <img src={logo} className="logoHeader" alt="logo" />
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <a href="#" className="nav-link text-secondary text-center">
                <FontAwesomeIcon icon={faHouse} size="xl" /><br/>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white text-center">
                <FontAwesomeIcon icon={faGauge} size="xl" /><br/>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white text-center">
                <FontAwesomeIcon icon={faTruckFast} size="xl" /><br/>
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white text-center">
                <FontAwesomeIcon icon={faGlobe} size="xl" /><br/>
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white text-center" data-bs-toggle="modal" data-bs-target="#modalcart">
                <FontAwesomeIcon icon={faBasketShopping} size="xl" /><br/>
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">


          <div className="text-end">
            <button type="button" className="btn btn-light text-dark me-2">Login</button>
            <button type="button" className="btn btn-primary">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
    );
    
}

export default Header;