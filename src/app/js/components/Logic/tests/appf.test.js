import React from "react";
import { render } from "@testing-library/react";
import Appf from "../Appf";
import "jest-dom/extend-expect";

//jest.mock("../../SideEffects/io/FetchMultipleResourceAtOnce");

test("We show a list of posts", () => {
  const { getByText } = render(<Appf />);
  expect(getByText("Loading...")).toBeInTheDocument();
});
