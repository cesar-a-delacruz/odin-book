import { describe, test, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "./setRoute";

describe("App", () => {
  let app;

  test("loads layout", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(() => {
      const layout = document.querySelector("div.layout");
      expect(layout).toBeInTheDocument();
    });

    expect(app.container.querySelector("div.layout").children.length).toBe(3);
  });
});
