import { describe, test, expect, vi } from "vitest";
import { screen, waitFor, render } from "@testing-library/react";
import * as fetchData from "@/utils/js/fetchData";
import CommentList from "@/components/CommentList";
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

const postId = "01a157a8-4ae2-75ab-ae36-40b71085113d";
const path = "comment/post/";

describe("CommentList", () => {
  test("loads comments", async () => {
    await act(async () => {
      render(<CommentList endpoint={`${path}${postId}`} />);
    });

    await waitFor(() => {
      const comments = document.querySelector("body > div > div");
      expect(comments.children.length).toBe(2);
    });
  });

  test("displays error message when fetchData fails", async () => {
    vi.spyOn(fetchData, "fetchData").mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          error: "Failed to find any comment.",
        });
      }),
    );
    let list;
    await act(() => {
      list = render(
        <ErrorBoundary fallbackRender={(props) => <ErrorMessage {...props} />}>
          <CommentList endpoint={`${path}${postId}`} />
        </ErrorBoundary>,
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText("Failed to find any comment."),
      ).toBeInTheDocument();
    });
  });
});
