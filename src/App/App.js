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
      return this.setState(
        {
          categories: this.state.categories.filter(
            (category) => category.id !== categoryId
          ),
        },
        () =>
          this.setState({
            activities: this.state.activities.filter(
              (activity) => activity.categoryid !== categoryId
            ),
          })
      );
    },
    getDataAfterLogin: (categories, activities) => {
      return this.setState({ categories }, () => {
        return this.setState({ activities });
      });
    },
    loginUser: (user) => {
      this.setState({ user });
    },
  };

  componentDidMount() {
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
    } else {
      return null;
    }
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
                  <>
                    <CategoryItem {...rProps} {...selectedCategory} />
                    <ActivityList {...rProps} />
                  </>
                );
              }}
            />

            <PrivateRoute path="/add/categories" component={AddCategory} />

            {/********************* ACTIVITY PAGES **************************/}

            <PrivateRoute
              path="/activities/:activityid"
              component={(rProps) => {
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
