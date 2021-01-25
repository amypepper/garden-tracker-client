import React from "react";
import { Link } from "react-router-dom";

import "./ActivityItem.css";
import Context from "../Context";
import DeleteButton from "../DeleteButton/DeleteButton";

export default class ActivityItem extends React.Component {
  static contextType = Context;

  getCategoryName = () => {
    const { categories = [] } = this.context || {};
    const targetCategory = categories.find(
      (category) => category.id === this.props.categoryid
    );

    return targetCategory ? targetCategory.title : null;
  };

  render() {
    const date = new Date(this.props.datecompleted);
    return (
      <li className="ActivityItem">
        <Link to={`/activities/${this.props.id}`} className="activity-title">
          <h4 className="activity-title">{this.props.title}</h4>
        </Link>
        <p>
          <span className="bold-span">Date completed</span>:{" "}
          {date.toDateString()}
        </p>
        <p>
          <span className="bold-span">Time completed</span>:{" "}
          {this.props.timecompleted}
        </p>
        <p>
          <span className="bold-span">Notes</span>: {this.props.notes}
        </p>
        <p>
          <span className="bold-span">Category</span>: {this.getCategoryName()}
        </p>

        <DeleteButton
          activity={{ ...this.props }}
          history={this.props.history}
        />
      </li>
    );
  }
}
