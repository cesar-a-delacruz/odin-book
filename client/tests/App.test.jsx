import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
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
describe("Navigation", () => {
  let app;

  test("/post", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(async () => {
      const feed = document.querySelector("main > div section:nth-child(2)");

      expect(feed).toBeInTheDocument();
      const post = feed.children.item(0);
      const user = userEvent.setup();

      await user.click(post);
      expect(document.title.includes("Post")).toBe(true);
    });
  });

  test("/profile", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(async () => {
      const feed = document.querySelector("main > div section:nth-child(2)");

      expect(feed).toBeInTheDocument();
      const post = feed.children.item(0);
      const postUser = post.children.item(0);
      const user = userEvent.setup();

      await user.click(postUser);
      expect(document.title.includes("Profile")).toBe(true);
    });
  });

  test("/", async () => {
    await act(async () => {
      app = setRoute();
    });
    await waitFor(async () => {
      const feed = document.querySelector("main > div section:nth-child(2)");

      expect(feed).toBeInTheDocument();
      const post = feed.children.item(0);
      const user = userEvent.setup();
      await user.click(post);
      expect(document.title.includes("Post")).toBe(true);

      const heading = document.querySelector("h1");
      await user.click(heading);
      expect(document.title.includes("Home")).toBe(true);
    });
  });
});
