import React from "react";

import DeleteButton from "../DeleteButton/DeleteButton";

export default class CategoryItem extends React.Component {
  render() {
    return (
      <li>
        <h4>{this.props.title}</h4>

        <DeleteButton
          category={{ ...this.props }}
          history={this.props.history}
        />
      </li>
    );
  }
}
