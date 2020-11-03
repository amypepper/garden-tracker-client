import React from "react";
import ReactDOM from "react-dom";
import AddActivity from "./AddActivity";

import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <AddActivity />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div); //cleanup
});
