import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation">
        <ul className="navbar-top">
          <li className="navbar-email">
            <label htmlFor="login-email">Email</label>
            <input className="navbar-input" id="login-email" type="email" />
          </li>
          <li className="navbar-pw">
            <label htmlFor="login-password">Password</label>
            <input
              className="navbar-input"
              id="login-password"
              type="password"
            />
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
          <li>
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
