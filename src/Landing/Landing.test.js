import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Landing from "./Landing";

it("renders without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
