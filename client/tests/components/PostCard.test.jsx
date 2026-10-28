import { describe, test, expect, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { act } from "react";
import requestHandler from "@/handlers/requestHandler";
import PostCard from "@/components/PostCard";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => {},
  };
});

const userProfile = (await requestHandler.get("user")).data[0];
const post = (await requestHandler.get(`post/user/${userProfile.id}`)).data[3];
const path = "post";
const postId = post.id;

describe("PostCard", () => {
  test("loads correctly", async () => {
    await act(async () => {
      const post = await requestHandler.get(`${path}/${postId}`);
      render(<PostCard data={post.data} />);
    });

    await waitFor(() => {
      const postCard = document.querySelector("body > div > div");
      expect(postCard.children.length).toBe(4);
    });
  });
});
