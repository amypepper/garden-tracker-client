import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import DeleteButton from "./DeleteButton";

it("renders without errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <DeleteButton />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
