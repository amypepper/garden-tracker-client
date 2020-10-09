import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Landing from "../Landing/Landing";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {["/", "/dashboard"].map((path, i) => (
            <Route key={i} path={path} component={Navbar} />
          ))}

          <h1>Garden Tracker</h1>
          <h2>Help your plants thrive.</h2>
        </header>
        <main className="App-main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/" component={Signup} />
        </main>
      </div>
    );
  }
}
