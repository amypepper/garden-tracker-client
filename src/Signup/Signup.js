import React from "react";
import AuthAPIService from "../services/auth-api-service";
import "./Signup.css";

export default class Signup extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = e.target;
    this.setState({ error: null });

    if (password.value !== confirmPassword.value) {
      return this.setState({ error: "Passwords do not match" });
    }
    AuthAPIService.postUser({
      email: email.value,
      password: password.value,
    })
      .then((user) => {
        this.props.history.push("/login");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <section>
        <h3>Get Started</h3>
        <form
          className="form"
          aria-label="signup-form"
          onSubmit={this.handleSubmit}
        >
          {this.state.error && <p className="error">{this.state.error}</p>}
          <fieldset aria-label="email">
            <div className="flex-wrapper-column">
              <label className="signup-email" htmlFor="new-email">
                email
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                id="new-email"
              />
            </div>
          </fieldset>
          <fieldset aria-label="password">
            <div className="flex-wrapper-column">
              <label htmlFor="new-password" className="signup-pw">
                password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="new password"
                name="password"
              />

              <label htmlFor="confirm-password" className="signup-confirm-pw">
                confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="type password again"
                name="confirmPassword"
              />
            </div>
          </fieldset>
          <fieldset aria-label="signup">
            <button className="signup" type="submit" aria-label="signup">
              Sign Up
            </button>
          </fieldset>
        </form>
      </section>
    );
  }
}
