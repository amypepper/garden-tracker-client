import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Landing from "./Landing";

Enzyme.configure({ adapter: new Adapter() });

it("renders without errors", () => {
  const wrapper = mount(
    <BrowserRouter initialEntries={["/"]}>
      <Landing />
    </BrowserRouter>
  );
  const div = document.createElement("div");
  ReactDOM.render(wrapper, div);
  ReactDOM.unmountComponentAtNode(div);
});
