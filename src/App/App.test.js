import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Jest from "@testing-library/jest-dom";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

it("renders without errors", () => {
  const wrapper = mount(
    <BrowserRouter initialEntries={["/"]}>
      <App />
    </BrowserRouter>
  );
  const div = document.createElement("div");
  ReactDOM.render(wrapper, div);
  ReactDOM.unmountComponentAtNode(div);
});
