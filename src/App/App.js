import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route path="/" component={Navbar} />
          <h1>Garden Tracker</h1>
          <h2>Help your plants thrive.</h2>
        </header>
        <main className="App-main">
          <section>
            <h3>Track your activities</h3>
            <p>[placeholder for screenshot of the activity list view]</p>
            <p>
              View a history of your plant care activities by logging in and
              clicking on "View all activities."
            </p>
            <p>
              You can sort the list by date, filter by plant name or activity
              category.
            </p>
          </section>
          <section>
            <h3>Organize your activities</h3>
            <p>[placeholder for category list view]</p>
            <p>
              Sort your activities into categories; you can add, remove or
              rename categories at any time.
            </p>
            <p>
              View all notes in a given category by clicking on the category
              name in the lefthand sidebar.
            </p>
          </section>
          <Route path="/" component={Signup} />
        </main>
      </div>
    );
  }
}
