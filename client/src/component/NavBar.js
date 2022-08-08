import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext.js";
import Logout from "./Log/Logout";

const NavBar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.reducer.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="icons">
          <div className="icons-bis">
            <NavLink to="/" exact className="active-nav">
              <img src="./img/icons/home.svg" alt="home" />
            </NavLink>
            <br />
            <NavLink to="/trending" exact className="active-nav">
              <img src="./img/icons/rocket.svg" alt="trending" />
            </NavLink>
            <br />
            <NavLink to="/profil" exact className="active-nav">
              <img src="./img/icons/user.svg" alt="user" />
            </NavLink>
          </div>
        </div>
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/panda.png" alt="panda-logo" />
              <h3>Panda</h3>
            </div>
          </NavLink>
        </div>

        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Welcome, {userData.username}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
