import React from "react";

import { API_BASE_URL } from "../config";
import Context from "../Context";
import TokenService from "../services/token-service";

export default class DeleteButton extends React.Component {
  static contextType = Context;

  handleDelete = (e) => {
    e.preventDefault();
    const id = this.props.activity
      ? this.props.activity.id
      : this.props.category.id;
    const route = this.props.activity ? "activities" : "categories";

    const deleteOptions = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.hasAuthToken()}`,
      },
    };

    fetch(`${API_BASE_URL}/api/${route}/${id}`, deleteOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
      })
      .then((res) => {
        if (this.props.activity) {
          this.context.deleteActivity(id);
          this.props.history.push("/activities");
        } else {
          this.context.deleteCategory(id);
          this.props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <div className="DeleteButton">
        <button onClick={(e) => this.handleDelete(e)}>Delete</button>
      </div>
    );
  }
}
