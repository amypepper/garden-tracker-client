import React from "react";

import { Link } from "react-router-dom";

export default class CategoryItem extends React.Component {
  render() {
    return (
      <li>
        <Link to={`/categories/${this.props.id}`}>
          <h4>{this.props.title}</h4>
        </Link>

        <button>Delete</button>
      </li>
    );
  }
}
