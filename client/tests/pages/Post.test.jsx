import { describe, test, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import * as fetchData from "@/utils/js/fetchData";
import requestHandler from "@/handlers/requestHandler";
import userEvent from "@testing-library/user-event";

const userProfile = (await requestHandler.get("user")).data[0];
const post = (await requestHandler.get(`post/user/${userProfile.username}`))
  .data[0];

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: { id: post.id },
    }),
  };
});
const path = "/post";

describe("Post", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("loads post section", async () => {
    await act(async () => {
      setRoute(path);
    });
    await waitFor(() => {
      const section = document.querySelector("section:nth-of-type(1)");
      expect(section.children.length).toBe(1);
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
  test("submitComment", async () => {
    await act(async () => {
      setRoute(path);
    });
    await waitFor(async () => {
      const user = userEvent.setup();

      const content = document.getElementById("content");
      await user.type(content, "fake content");

      const commentButton = document.querySelector(
        "section > div button:first-of-type",
      );
      await user.click(commentButton);
    });
    const alert = await screen.findByText("Comment published successfully.");

    expect(alert).toBeInTheDocument();
  });
});
