import React from "react";

import ActivityItem from "../ActivityItem/ActivityItem";
import "./ActivityList.css";
import Context from "../Context";

export default class ActivityList extends React.Component {
  static contextType = Context;

  getActivities = () => {
    const { activities = [] } = this.context || [];
    if (this.props.match && this.props.match.path !== "/dashboard") {
      const filteredActivities =
        activities.filter(
          (activity) =>
            activity.categoryid === Number(this.props.match.params.categoryid)
        ) || [];
      return filteredActivities.map((activity, i) => (
        <ActivityItem
          key={i}
          {...activity}
          history={{ ...this.props.history }}
        />
      ));
    } else {
      return activities.map((activity, i) => (
        <ActivityItem
          key={i}
          {...activity}
          history={{ ...this.props.history }}
        />
      ));
    }
  };
  render() {
    console.log(this.props);
    return <ul className="ActivityList">{this.getActivities()}</ul>;
  }
}
