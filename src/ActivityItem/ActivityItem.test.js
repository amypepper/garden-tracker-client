import React from "react";
import ReactDOM from "react-dom";
import ActivityItem from "./ActivityItem";

import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <ActivityItem />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div); //cleanup
});
