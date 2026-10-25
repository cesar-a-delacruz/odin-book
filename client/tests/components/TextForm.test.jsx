import TextForm from "@/components/TextForm";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

const fieldsets = [
  { type: "textarea", id: "description" },
  { type: "file", id: "image" },
];

const actions = [{ icon: "..." }, { icon: "x" }];

describe("TextForm", () => {
  test("loads fields correctly", async () => {
    render(<TextForm initialData={{}} fields={fieldsets} />);

    await waitFor(() => {
      const fields = document.querySelectorAll("div > div > *:not(last-child)");
      const descriptionField = fields.item(0);
      const fileField = fields.item(1);

      expect(descriptionField.id).toBe("description");
      expect(fileField.id).toBe("image");
    });
  });

  test("loads actions correctly", async () => {
    render(<TextForm initialData={{}} actions={actions} />);

    await waitFor(() => {
      const actions = document.querySelectorAll(
        "div > div > div:last-child > button:not(:first-child)",
      );
      const action1 = actions.item(0);
      const action2 = actions.item(1);

      expect(action1.innerHTML).toBe("...");
      expect(action2.innerHTML).toBe("x");
    });
  });

  test("fields change", async () => {
    const user = userEvent.setup();
    render(<TextForm initialData={{}} fields={fieldsets} />);

    await waitFor(async () => {
      const descriptionField = document.getElementById("description");

      await user.type(descriptionField, "u");
      expect(descriptionField.value).toBe("u");

      await user.type(descriptionField, "s");
      expect(descriptionField.value).toBe("us");
    });
  });
});
