import React from "react";
import { Link } from "react-router-dom";

import ActivityList from "../ActivityList/ActivityList";
import CategoryItem from "../CategoryItem/CategoryItem";
import Context from "../Context";

export default class Dashboard extends React.Component {
  static contextType = Context;
  render() {
    const { categories = [] } = this.context || {};
    return (
      <>
        <div className="flex-wrapper-column sidebar-wrapper dashboard">
          <section className="flex-wrapper-column sidebar links">
            <Link to="/add/categories">Add Category</Link>
            <Link to="/add/activities">Add Activity</Link>
          </section>

          <section className="flex-wrapper-column folder-nav accordion">
            <h3 className="folder-nav">Categories</h3>
            <ul className="flex-wrapper-column sidebar">
              {categories.map((category, i) => (
                <CategoryItem key={i} {...category} />
              ))}
            </ul>
          </section>
        </div>

        <div className="main-wrapper">
          <h3>All Activities</h3>
          <ActivityList {...this.props.match} />
        </div>
      </>
    );
  }
}
