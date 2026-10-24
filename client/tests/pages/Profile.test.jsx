import { describe, test, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import * as fetchData from "@/utils/js/fetchData";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: { id: "01a157a8-4ac1-76da-b758-e2e64ae36e81" },
    }),
  };
});
const path = "/profile";

describe("Profile", () => {
  let app;

  test("loads posts section", async () => {
    await act(async () => {
      app = setRoute(path);
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(2)");
      expect(section.children.length).toBe(3);
    });
  });

  test("loads user section", async () => {
    await act(async () => {
      app = setRoute(path);
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(1)");
      expect(section.children.length).toBe(1);

      const user = section.children.item(0);
      expect(user.children.length).toBe(2);
    });
  });

  test("loads comments section", async () => {
    await act(async () => {
      app = setRoute(path);
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(3)");
      expect(section.children.length).toBe(2);

      const comments = section.children.item(1);
      expect(comments.children.length).toBe(2);
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
      app = setRoute(path);
    });
    const message = await screen.findByText("Failed to find any post.");
    expect(message.innerHTML).toBe("Failed to find any post.");
  });
});
