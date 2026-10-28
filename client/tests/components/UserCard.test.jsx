import { describe, test, expect, vi } from "vitest";
import { screen, waitFor, render } from "@testing-library/react";
import * as fetchData from "@/utils/js/fetchData";
import UserCard from "@/components/UserCard";
import { act } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import requestHandler from "@/handlers/requestHandler";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: () => {},
  };
});

const userProfile = (await requestHandler.get("user")).data[0];
const path = "user/";
const userId = userProfile.id;

describe("UserCard", () => {
  test("loads user", async () => {
    await act(async () => {
      render(<UserCard endpoint={`${path}${userId}`} />);
    });

    await waitFor(() => {
      const users = document.querySelector("body > div > div");
      expect(users.children.length).toBe(2);
    });
  });

  test("displays error message when fetchData fails", async () => {
    vi.spyOn(fetchData, "fetchData").mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          error: "Failed to find any user.",
        });
      }),
    );
    await act(() => {
      render(
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <UserCard endpoint={`${path}${userId}`} />
        </ErrorBoundary>,
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Failed to find any user.")).toBeInTheDocument();
    });
  });
});
