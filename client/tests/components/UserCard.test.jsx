import { describe, test, expect, vi, afterEach } from "vitest";
import { screen, waitFor, render } from "@testing-library/react";
import * as fetchData from "@/utils/js/fetchData";
import UserCard from "@/components/UserCard";
import { act } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import requestHandler from "@/handlers/requestHandler";
import userEvent from "@testing-library/user-event";
import { AlertProvider } from "@/contexts/AlertContext";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: () => {},
  };
});

const userProfile = (await requestHandler.get("user")).data[0];
const path = "user/";
const username = userProfile.username;

describe("UserCard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("loads user", async () => {
    await act(async () => {
      render(
        <AlertProvider>
          <UserCard endpoint={`${path}${username}`} />
        </AlertProvider>,
      );
    });

    await waitFor(() => {
      const users = document.querySelector("body > div > div");
      expect(users.children.length).toBe(3);
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
        <AlertProvider>
          <ErrorBoundary
            fallbackRender={(props) => <ErrorMessage {...props} />}
          >
            <UserCard endpoint={`${path}${username}`} />
          </ErrorBoundary>
        </AlertProvider>,
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Failed to find any user.")).toBeInTheDocument();
    });
  });
  // test("submitFollower", async () => {
  //   await act(() => {
  //     render(
  //       <AlertProvider>
  //         <UserCard endpoint={`${path}${username}`} />
  //       </AlertProvider>,
  //     );
  //   });
  //   await waitFor(async () => {
  //     const user = userEvent.setup();
  //     const followButton = document.querySelector("button");
  //     await user.click(followButton);
  //   });
  //   const alert = await screen.findByText("User followed successfully.");

  //   expect(alert).toBeInTheDocument();
  // });
});
