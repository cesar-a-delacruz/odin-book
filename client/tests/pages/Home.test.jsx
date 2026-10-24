import { describe, test, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import * as fetchData from "@/utils/js/fetchData";

describe("Home", () => {
  let app;

  test("loads feed section", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(2)");
      expect(section.children.length).toBe(4);
    });
  });

  test("loads followed section", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(1)");
      expect(section.children.length).toBe(2);

      const followedUsers = section.children.item(1);
      expect(followedUsers.children.length).toBe(4);
    });
  });

  test("loads more section", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(3)");
      expect(section.children.length).toBe(2);

      const moreUsers = section.children.item(1);
      expect(moreUsers.children.length).toBe(4);
    });
  });

  test("displays error message when fetchData fails", async () => {
    vi.spyOn(fetchData, "fetchData").mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          error: "Failed to find any post.",
        });
      }),
    );

    await act(async () => {
      app = setRoute();
    });
    const message = await screen.findByText("Failed to find any post.");
    expect(message.innerHTML).toBe("Failed to find any post.");
  });
});
