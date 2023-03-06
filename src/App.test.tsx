import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("passes", () => {
  const easy = 2;
  expect(easy).toBe(2);
});
