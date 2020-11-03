import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import TokenService from "../services/token-service";

export default class Navbar extends React.Component {
  logout = () => {
    TokenService.clearAuthToken();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className="navbar" role="navigation">
        <section className="logo">
          <Link to="/">
            <h1>Garden Tracker</h1>
          </Link>
          <h2 className="tagline">Help your plants thrive.</h2>
        </section>
        <ul className="navbar-top">
          {TokenService.hasAuthToken() ? (
            <>
              <li className="navbar-li">
                <button
                  className="login button"
                  aria-label="logout-button"
                  type="submit"
                  onClick={() => this.logout()}
                >
                  Log Out
                </button>
              </li>
              <li>
                <Link className="dashboard-link" to="/dashboard">
                  <button className="dashboard button">Dashboard</button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button
                    className="login button"
                    aria-label="login-button"
                    type="submit"
                  >
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button
                    className="signup button"
                    aria-label="signup-button"
                    type="submit"
                  >
                    Signup
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}
