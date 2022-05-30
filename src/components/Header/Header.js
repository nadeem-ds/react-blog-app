import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import StateContext from "../Context/StateContext";
import HeaderFormLoggedOut from "./HeaderFormLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";

const Header = () => {
  const appState = useContext(StateContext);
  return (
    <div>
      {/* <h2>Header</h2> */}
      <header className="header-bar bg-primary mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-white">
              Home(NadDev)
            </Link>
          </h4>
          {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderFormLoggedOut />}
        </div>
      </header>
    </div>
  );
};

export default Header;
