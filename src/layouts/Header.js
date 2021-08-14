import React, { useContext } from 'react';
import StateContext from "../context/StateContext";
import { Link } from "react-router-dom";
import HeaderLoggedOut from "../components/HeaderLoggedOut";
import HeaderLoggedIn from "../components/HeaderLoggedIn";


function Header({ loggedIn }) {
  const AppContext = useContext(StateContext);

  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            ComplexApp
          </Link>
        </h4>
        {AppContext.loggedIn ? <HeaderLoggedIn/> : <HeaderLoggedOut/>}
      </div>
    </header>
  );
}

export default Header;