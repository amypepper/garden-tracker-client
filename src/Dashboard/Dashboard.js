import React from "react";
import { Link } from "react-router-dom";

import ActivityList from "../ActivityList/ActivityList";
import CategoryItem from "../CategoryItem/CategoryItem";
import Context from "../Context";
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  static contextType = Context;

  render() {
    const { categories = [] } = this.context || {};
    console.log(this.props);
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

            <h4 className="category-list-title">Categories</h4>
            <ul className="flex-wrapper-column sidebar">
              {categories.map((category, i) => (
                <li>
                  <Link key={i} to={`/categories/${category.id}`}>
                    <CategoryItem
                      key={i}
                      {...category}
                      history={this.props.history}
                      match={this.props.match}
                    />
                  </Link>
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
