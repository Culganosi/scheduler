import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
  // The it function is an alias to the test function.
  it("does something it is supposed to do", () => {
    // ...
  });
  //To skip a test, use xit or test.skip: 
  xit("does something it is supposed to do", () => {
    // ...
  });
});
