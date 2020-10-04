import React from "react";
import "./Navbar.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation">
        <ul className="navbar-top">
          <li className="navbar-email">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </li>
          <li className="navbar-pw">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </li>
          <li>
            <button
              className="login-button"
              aria-label="login-button"
              type="submit"
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="login-button"
              aria-label="logout-button"
              type="submit"
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
