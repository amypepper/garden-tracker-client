import React from "react";
import { Route } from "react-router-dom";

import ActivityItem from "../ActivityItem/ActivityItem";
import ActivityList from "../ActivityList/ActivityList";
import AddActivity from "../AddActivity/AddActivity";
import AddCategory from "../AddCategory/AddCategory";
import "./App.css";
import CategoryItem from "../CategoryItem/CategoryItem";
import Context from "../Context";
import Dashboard from "../Dashboard/Dashboard";
import Landing from "../Landing/Landing";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import Signup from "../Signup/Signup";
import TokenService from "../services/token-service";

const { API_BASE_URL } = require("../config");

export default class App extends React.Component {
  state = {
    user: {},
    activities: [],
    categories: [],

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
    filterCategories: (userCategories) => {
      return this.setState({ categories: userCategories });
    },
    loginUser: (user) => {
      return this.setState({ user });
    },
  };

  componentDidMount() {
    // Step 1 - check if the user has a token
    // Step 2 - if they do, make the api call to the /api/users to get their info
    // Step 3 - put that info in state
    // Step 4 - make the fetch call for activities
    // - else do nothing

    /*if(TokenService.hasAuthToken()){
      fetch().then(res=>res.json()).then(user=>this.setState({user}, ()=> {
        fetch().then(res=>res.json()).then(activities=>this.setState({activites}))
      }))
    }*/

    if (TokenService.hasAuthToken()) {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TokenService.hasAuthToken()}`,
          Accept: "application/json",
        },
      };

      fetch(`${API_BASE_URL}/api/users`, options)
        .then((res) => res.json())
        .then((user) =>
          this.setState({ user }, () => {
            fetch(`${API_BASE_URL}/api/categories`, options)
              .then((res) => {
                if (!res.ok) {
                  return Promise.reject(res.statusText);
                }
                return res.json();
              })
              .then((categories) => {
                this.setState({ categories }, () => {
                  fetch(`${API_BASE_URL}/api/activities`, options)
                    .then((res) => {
                      if (!res.ok) {
                        return Promise.reject(res.statusText);
                      }
                      return res.json();
                    })
                    .then((activities) => this.setState({ activities }))

                    .catch((err) => console.error(err));
                });
              });
          })
        )
        .catch((err) => console.error(err));
    }
  }

  // send the authToken to an endpoint in the backend that is protected
  // by requireAuth, and uses req.user.id to filter the activites
  // all fetch calls after login should just send authToken, the BE should determine who the user is, not the FE

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <header className="App-header">
            <Route path="/" component={Navbar} />
          </header>

          <main className="App-main">
            <Route exact path="/" component={Landing} />
            <PublicOnlyRoute path="/signup" component={Signup} />
            <PublicOnlyRoute path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />

            {/********************* CATEGORY PAGES **************************/}
            <PrivateRoute
              path="/categories/:categoryid"
              component={(rProps) => {
                const selectedCategory =
                  this.state.categories.find(
                    (category) =>
                      Number(rProps.match.params.categoryid) === category.id
                  ) || {};
                return (
                  <div>
                    <CategoryItem {...rProps} {...selectedCategory} />
                    <ActivityList {...rProps} />
                  </div>
                );
              }}
            />

            <PrivateRoute path="/add/categories" component={AddCategory} />

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
                  ) || {};
                if (selectedActivity) {
                  return <ActivityItem {...selectedActivity} {...rProps} />;
                } else {
                  return {};
                }
              }}
            />

            <PrivateRoute
              exact
              path="/add/activities"
              component={AddActivity}
            />

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
