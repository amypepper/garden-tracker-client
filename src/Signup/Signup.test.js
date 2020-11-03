import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";

it("renders without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
