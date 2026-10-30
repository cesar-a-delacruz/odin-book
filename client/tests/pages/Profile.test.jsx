import { describe, test, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import * as fetchData from "@/utils/js/fetchData";
import requestHandler from "@/handlers/requestHandler";

const userProfile = (await requestHandler.get("user")).data[0];
const path = `/profile/${userProfile.username}`;

describe("Profile", () => {
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
});
