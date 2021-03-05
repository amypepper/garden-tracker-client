import React from "react";
import { Link } from "react-router-dom";

import ActivityList from "../ActivityList/ActivityList";
import CategoryItem from "../CategoryItem/CategoryItem";
import Context from "../Context";
import "./Dashboard.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import TokenService from "../services/token-service";

const { API_BASE_URL } = require("../config");

export default class Dashboard extends React.Component {
  static contextType = Context;

  state = {
    isFetching: false,
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

      this.setState({ isFetching: true });

      fetch(`${API_BASE_URL}/api/categories`, options)
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          return res.json();
        })
        .then((categories) => {
          fetch(`${API_BASE_URL}/api/activities`, options)
            .then((res) => {
              if (!res.ok) {
                return Promise.reject(res.statusText);
              }
              return res.json();
            })
            .then((activities) =>
              this.context.getDataAfterLogin(categories, activities)
            );
        })
        .catch((err) => {
          console.error(err);
          this.setState({ isFetching: false });
        });
      this.setState({ isFetching: false });
    } else {
      return null;
    }
  }

  render() {
    const { categories = [] } = this.context || {};

    return (
      <>
        <div className="flex-wrapper-column sidebar-wrapper dashboard">
          <section className="flex-wrapper-column sidebar add-links">
            <Link to="/add/categories">Add Category</Link>{" "}
            <span className="menu-divider">|</span>
            <Link to="/add/activities">Add Activity</Link>
          </section>

          <section className="flex-wrapper-column folder-nav accordion">
            <h3 className="folder-nav">Your Dashboard</h3>
            <p aria-label="instructions" className="instructions">
              To get started, add a category or two to place your activities in.
              Then you may create as many activities as you like!
            </p>

            <p>{this.state.isFetching ? "Getting your info..." : ""}</p>

            <h4 className="category-list-title">Categories</h4>
            <ul className="flex-wrapper-column sidebar">
              {categories.map((category, i) => (
                <li key={i}>
                  <Link key={`link-${i}`} to={`/categories/${category.id}`}>
                    <CategoryItem
                      key={i}
                      {...category}
                      history={this.props.history}
                      match={this.props.match}
                    />
                  </Link>
                  <DeleteButton
                    key={`button-${i}`}
                    category={category}
                    history={this.props.history}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="main-wrapper">
          <h4 className="activity-list-title">All Activities</h4>
          <ActivityList {...this.props} />
        </div>
      </>
    );
  }
}
