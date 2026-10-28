import { describe, test, expect, vi } from "vitest";
import { screen, waitFor, render } from "@testing-library/react";
import * as fetchData from "@/utils/js/fetchData";
import CommentList from "@/components/CommentList";
import { act } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/ErrorMessage";
import requestHandler from "@/handlers/requestHandler";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => {},
    useRouteError: () => {},
  };
});

const userProfile = (await requestHandler.get("user")).data[0];
const post = (await requestHandler.get(`post/user/${userProfile.id}`)).data[3];
const postId = post.id;
const path = "comment/post/";

describe("CommentList", () => {
  test("loads comments", async () => {
    await act(async () => {
      render(<CommentList endpoint={`${path}${postId}`} />);
    });

    await waitFor(() => {
      const comments = document.querySelector("body > div > div > div");
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
