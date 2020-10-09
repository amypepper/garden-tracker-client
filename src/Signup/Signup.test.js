import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";

Enzyme.configure({ adapter: new Adapter() });

it("renders without errors", () => {
  const wrSignuper = mount(
    <BrowserRouter initialEntries={["/"]}>
      <Signup />
    </BrowserRouter>
  );
  const div = document.createElement("div");
  ReactDOM.render(wrSignuper, div);
  ReactDOM.unmountComponentAtNode(div);
});
