import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

it("renders without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
