import React from "react";
import ReactDOM from "react-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

Enzyme.configure({ adapter: new Adapter() });

it("renders without errors", () => {
  const wrNavbarer = mount(
    <BrowserRouter initialEntries={["/"]}>
      <Navbar />
    </BrowserRouter>
  );
  const div = document.createElement("div");
  ReactDOM.render(wrNavbarer, div);
  ReactDOM.unmountComponentAtNode(div);
});
