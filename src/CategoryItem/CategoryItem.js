import React from "react";

import "./CategoryItem.css";
import DeleteButton from "../DeleteButton/DeleteButton";

export default function CategoryItem(props) {
  return (
    <>
      <h4 className="category-title">{props.title}</h4>

      <DeleteButton category={{ ...props }} history={props.history} />
    </>
  );
}
