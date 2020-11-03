import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CategoryItem from "./CategoryItem";

it("renders without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <CategoryItem />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
