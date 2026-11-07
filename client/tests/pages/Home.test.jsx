import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import * as fetchData from "@/utils/js/fetchData";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("loads feed section", async () => {
    await act(async () => {
      setRoute();
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(2)");
      expect(section.children.length).toBe(4);
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
      setRoute();
    });
    const message = await screen.findByText("Failed to find any post.");
    expect(message.innerHTML).toBe("Failed to find any post.");
  });
  test("submitFollower", async () => {
    await act(async () => {
      setRoute();
    });
    await waitFor(async () => {
      const user = userEvent.setup();
      const followButton = document.querySelector(
        "section:nth-of-type(3) button",
      );
      await user.click(followButton);
    });
    const alert = await screen.findByText("User followed successfully.");

    expect(alert).toBeInTheDocument();
  });
});
