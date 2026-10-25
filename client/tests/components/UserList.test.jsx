import { describe, test, expect, vi } from "vitest";
import { screen, waitFor, render } from "@testing-library/react";
import * as fetchData from "@/utils/js/fetchData";
import UserList from "@/components/UserList";
import { act } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => {},
    useRouteError: () => {},
  };
});

describe("UserList", () => {
  test("loads users", async () => {
    await act(async () => {
      render(<UserList endpoint={"user"} />);
    });

    await waitFor(() => {
      const users = document.querySelector("body > div > div");
      expect(users.children.length).toBe(4);
    });
  });

  test("loads with action", async () => {
    await act(async () => {
      render(
        <UserList
          endpoint={"user"}
          action={{ text: "Follow", icon: "...", handler: () => {} }}
        />,
      );
    });

    waitFor(() => {
      const user = document.querySelector("body > div > div").children.item(0);
      const action = user.querySelector("div:last-of-type");
      expect(action.textContent).toBe("...");
      const actionText = action.querySelector("span");
      expect(actionText.innerHTML).toBe("Follow");
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
          <UserList endpoint={"user"} />
        </ErrorBoundary>,
      );
    });
    await waitFor(() => {
      expect(screen.getByText("Failed to find any user.")).toBeInTheDocument();
    });
  });
});
