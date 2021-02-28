import React from "react";
import AuthAPIService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import { API_BASE_URL } from "../config";
import "./Login.css";
import Context from "../Context";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
  };

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({ error: null });
    const user = { email: this.state.email, password: this.state.password };

    AuthAPIService.loginUser(user)
      .then((loginResponse) => {
        TokenService.saveAuthToken(loginResponse.authToken);
      })
      .then((res) => {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TokenService.hasAuthToken()}`,
            Accept: "application/json",
          },
        };
        fetch(`${API_BASE_URL}/api/users`, options)
          .then((res) => {
            if (!res.ok) {
              return Promise.reject(res.statusText);
            }
            return res.json();
          })
          .then((user) => {
            this.context.loginUser(user);
            this.props.history.push("/dashboard");
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <section>
        <h3>Login</h3>
        <form
          className="form"
          aria-label="login-form"
          onSubmit={this.handleLogin}
        >
          {this.state.error && <p className="error">{this.state.error}</p>}
          <fieldset aria-label="email">
            <div className="flex-wrapper-column">
              <label className="login-email" htmlFor="login-email">
                email
              </label>
              <input
                type="email"
                placeholder="email"
                id="login-email"
                name="login-email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
          </fieldset>
          <fieldset aria-label="password">
            <div className="flex-wrapper-column">
              <label htmlFor="login-password" className="login-password">
                password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="password"
                name="login-password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
          </fieldset>
          <fieldset aria-label="login">
            <button className="login" type="submit" aria-label="login">
              Login
            </button>
          </fieldset>
        </form>
      </section>
    );
  }
}
