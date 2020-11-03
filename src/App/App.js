import React from "react";
import { Route } from "react-router-dom";

import AddActivity from "../AddActivity/AddActivity";
import AddCategory from "../AddCategory/AddCategory";
import "./App.css";
import Context from "../Context";
import Dashboard from "../Dashboard/Dashboard";
import data from "../dummy-data";
import Landing from "../Landing/Landing";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import CategoryItem from "../CategoryItem/CategoryItem";
import ActivityList from "../ActivityList/ActivityList";
import ActivityItem from "../ActivityItem/ActivityItem";

const { API_TOKEN, API_BASE_URL } = require("../config");

export default class App extends React.Component {
  state = {
    activities: [...data.activities],
    categories: [...data.categories],

    addActivity: (newActivity) => {
      return this.setState({
        activities: [...this.state.activities, newActivity],
      });
    },
    addCategory: (newCategory) => {
      return this.setState({
        categories: [...this.state.categories, newCategory],
      });
    },
    deleteActivity: (activityId) => {
      return this.setState({
        activities: this.state.activities.filter(
          (activity) => activity.id !== activityId
        ),
      });
    },
    deleteCategory: (categoryId) => {
      return this.setState({
        categories: this.state.categories.filter(
          (category) => category.id !== categoryId
        ),
      });
    },
  };

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    };
    fetch(`${API_BASE_URL}/api/activities`, options)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then((activities) => this.setState({ activities }));

    fetch(`${API_BASE_URL}/api/categories`, options)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })

      .then((categories) => this.setState({ categories }));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <Route path="/" component={Navbar} />
          </header>

          <main className="App-main">
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />

            {/********************* CATEGORY PAGES **************************/}
            <Route
              path="/categories/:categoryid"
              render={(rProps) => {
                const selectedCategory =
                  this.state.categories.find(
                    (category) =>
                      Number(rProps.match.params.categoryid) === category.id
                  ) || [];
                return (
                  <>
                    <CategoryItem {...rProps} {...selectedCategory} />
                    <ActivityList {...rProps} />
                  </>
                );
              }}
            />

            <Route path="/add/categories" component={AddCategory} />

            {/* <Route path="/edit/categories/c2">
              <h3>Edit Category</h3>
              <form className="edit-category" aria-label="edit-category">
                <fieldset className="category-form">
                  <div className="flex-wrapper-column">
                    <label htmlFor="edit-category" className="edit-category">
                      Category Name
                    </label>
                    <input type="text" value="Feeding" id="edit-category" />
                  </div>
                </fieldset>
  
                <fieldset>
                  <button type="submit" aria-label="save">
                    Save
                  </button>
                  <button type="reset" aria-label="cancel">
                    Cancel
                  </button>
                </fieldset>
              </form>
            </Route> */}

            {/********************* ACTIVITY PAGES **************************/}

            <Route
              path="/activities/:activityid"
              render={(rProps) => {
                const selectedActivity =
                  this.state.activities.find(
                    (activity) =>
                      activity.id === Number(rProps.match.params.activityid)
                  ) || [];
                if (selectedActivity) {
                  return <ActivityItem {...selectedActivity} {...rProps} />;
                } else {
                  return null;
                }
              }}
            />

            <Route exact path="/add/activities" component={AddActivity} />

            {/* <Route path="/edit/activities/4">
              <section>
                <h3>Edit Activity</h3>
                <form className="edit-activity" aria-label="edit-activity">
                  <fieldset className="activity-form">
                    <div className="flex-wrapper-column">
                      <label htmlFor="edit-activity">Activity Name</label>
                      <input
                        type="text"
                        id="edit-activity"
                        value="watered lavender"
                      />
                      <label htmlFor="edit-date">Date</label>
                      <input type="date" id="edit-date" value="2020-09-30" />
                      <label htmlFor="edit-note">Notes (optional)</label>
                      <textarea id="edit-note" cols="30" rows="10"></textarea>
  
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        className="category-options"
                        value="Watering"
                      >
                        <option value="Watering">Watering</option>
                        <option value="Feeding">Feeding</option>
                        <option value="Pruning">Weeding</option>
                      </select>
                    </div>
                  </fieldset>
  
                  <fieldset>
                    <button type="submit" aria-label="save">
                      Save
                    </button>
                    <button type="reset" aria-label="cancel">
                      Cancel
                    </button>
                  </fieldset>
                </form>
              </section>
            </Route> */}
          </main>

          {/********************* FOOTER **************************/}
          <footer role="contentinfo" className="footer">
            <a className="footer-link" href="mailto:amycarlsonpepper@gmail.com">
              Email
            </a>{" "}
            |{" "}
            <a
              className="footer-link"
              href="https://github.com/amypepper"
              target="blank"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/amylynnpepper/"
              target="blank"
            >
              LinkedIn
            </a>
          </footer>
        </div>
      </Context.Provider>
    );
  }
}
