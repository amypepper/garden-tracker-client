import React from "react";
import "./Signup.css";

export default class extends React.Component {
  render() {
    return (
      <section>
        <h3>Get Started</h3>
        <form className="form" aria-label="signup-form">
          <fieldset aria-label="email">
            <div className="flex-wrapper">
              <label className="signup-email" htmlFor="new-email">
                email
              </label>
              <input type="email" placeholder="email" id="new-email" />
            </div>
          </fieldset>
          <fieldset aria-label="password">
            <div className="flex-wrapper">
              <label htmlFor="new-password" className="signup-pw">
                password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="new password"
              />

              <label htmlFor="confirm-password" className="signup-confirm-pw">
                confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="type password again"
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
