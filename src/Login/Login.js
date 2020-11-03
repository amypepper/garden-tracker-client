import React from "react";
import AuthAPIService from "../services/auth-api-service";
import TokenService from "../services/token-service";
// import { API_BASE_URL } from "../config";
import "./Login.css";

export default class Login extends React.Component {
  state = {
    error: null,
  };
  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.setState({ error: null });
    const user = { email: email.value, password: password.value };
    AuthAPIService.loginUser(user)
      .then((loginResponse) => {
        TokenService.saveAuthToken(loginResponse.authToken);
        this.props.history.push("/dashboard");
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
              <label className="login-email" htmlFor="new-email">
                email
              </label>
              <input
                type="email"
                placeholder="email"
                id="new-email"
                name="email"
                onChange={(e) => console.log(e)}
              />
            </div>
          </fieldset>
          <fieldset aria-label="password">
            <div className="flex-wrapper-column">
              <label htmlFor="new-password" className="login-pw">
                password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="new password"
                name="password"
                onChange={(e) => console.log(e)}
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