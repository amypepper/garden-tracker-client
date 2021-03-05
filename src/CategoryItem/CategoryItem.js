import React from "react";

import "./CategoryItem.css";

export default function CategoryItem(props) {
  return <h4 className="category-title">{props.title}</h4>;
}
