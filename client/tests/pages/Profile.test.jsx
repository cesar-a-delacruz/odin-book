import { describe, test, expect, vi, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import * as fetchData from "@/utils/js/fetchData";
import requestHandler from "@/handlers/requestHandler";
import userEvent from "@testing-library/user-event";

const userProfile = (await requestHandler.get("user")).data[0];
const path = `/profile/${userProfile.username}`;

describe("Profile", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("loads posts section", async () => {
    await act(async () => {
      setRoute(path);
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(2)");
      expect(section.children.length).toBe(5);
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
      setRoute(path);
    });
    const message = await screen.findByText("Failed to find any post.");
    expect(message.innerHTML).toBe("Failed to find any post.");
  });
  test("submitPost", async () => {
    await act(async () => {
      setRoute(path);
    });
    await waitFor(async () => {
      const user = userEvent.setup();

      const content = document.getElementById("content");
      await user.type(content, "fake content");

      const postButton = document.querySelector(
        "section:nth-of-type(2) > div:first-of-type button",
      );
      await user.click(postButton);
    });
    const alert = await screen.findByText("Post published successfully.");

    expect(alert).toBeInTheDocument();
  });
});
