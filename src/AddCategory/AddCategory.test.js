import React from "react";
import ReactDOM from "react-dom";
import AddCategory from "./AddCategory";

import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <AddCategory />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div); //cleanup
});
