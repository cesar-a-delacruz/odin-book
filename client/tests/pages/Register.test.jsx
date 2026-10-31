import { describe, test, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react";
import setRoute from "../setRoute";
import userEvent from "@testing-library/user-event";

describe("Register", () => {
  test("loads correctly", async () => {
    await act(async () => {
      setRoute("/register");
    });
    await waitFor(() => {
      const form = document.querySelector("form");
      expect(form).toBeInTheDocument();
    });
  });
  test("submitUser", async () => {
    await act(async () => {
      setRoute("/register");
    });
    await waitFor(async () => {
      const user = userEvent.setup();

      const username = document.getElementById("username");
      await user.type(username, "fakeuser00");
      const fullname = document.getElementById("fullname");
      await user.type(fullname, "fakeuser00");
      const password = document.getElementById("password");
      await user.type(password, "fakeuser00");
      const confirm = document.getElementById("confirm");
      await user.type(confirm, "fakeuser00");

      const registerButton = document.querySelector("form button");
      await user.click(registerButton);
    });
    const alert = await screen.findByText("User registered successfully.");

    expect(alert).toBeInTheDocument();
  });
});
