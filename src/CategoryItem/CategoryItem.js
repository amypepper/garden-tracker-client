import React from "react";
import { Link } from "react-router-dom";

import DeleteButton from "../DeleteButton/DeleteButton";

export default class CategoryItem extends React.Component {
  render() {
    return (
      <li>
        <Link to={`/categories/${this.props.id}`}>
          <h4>{this.props.title}</h4>
        </Link>

        <DeleteButton
          category={{ ...this.props }}
          history={{ ...this.props.history }}
        />
      </li>
    );
  }
}
