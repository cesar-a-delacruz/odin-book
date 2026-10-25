import TextFormField from "@/components/TextFormField";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

const field = {
  type: "textarea",
  id: "description",
  placeholder: "some text...",
};
const value = "user";

describe("TextFormField", () => {
  test("loads field correctly", async () => {
    render(
      <TextFormField field={field} value={value} changeHandler={() => {}} />,
    );

    await waitFor(() => {
      const field = document.getElementById("description");
      expect(field.value).toBe("user");
      expect(field.placeholder).toBe("some text...");
    });
  });
});
