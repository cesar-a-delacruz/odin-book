import Form from "@/components/Form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

const fieldsets = [
  {
    fields: [
      { type: "text", id: "name" },
      { type: "textarea", id: "description" },
    ],
  },
];

const initialData = { name: "user", description: "sample text" };

describe("Form", () => {
  test("loads fieldsets and data correctly", async () => {
    render(
      <Form
        initialData={initialData}
        fieldsets={fieldsets}
        submit={{ text: "Submit", handler: () => {}, disable: true }}
      />,
    );

    await waitFor(() => {
      const fieldsets = document.querySelectorAll("fieldset");
      expect(fieldsets.length).toBe(1);

      const fields = fieldsets.item(0).querySelectorAll("div > *:not(label)");
      const nameField = fields.item(0);
      const descriptionField = fields.item(1);

      expect(nameField.id).toBe("name");
      expect(descriptionField.id).toBe("description");
      expect(nameField.value).toBe("user");
      expect(descriptionField.value).toBe("sample text");
    });
  });

  test("loads button correctly", async () => {
    render(
      <Form
        initialData={{}}
        fieldsets={[]}
        submit={{ text: "Submit", handler: () => {}, disable: true }}
      />,
    );

    const sumbitButton = await screen.findByText("Submit");
    expect(sumbitButton.type).toBe("submit");
    expect(sumbitButton.disabled).toBe(true);
  });

  test("fields change", async () => {
    const user = userEvent.setup();
    render(
      <Form
        initialData={{}}
        fieldsets={fieldsets}
        submit={{ text: "Submit", handler: () => {}, disable: true }}
      />,
    );

    await waitFor(async () => {
      const nameInput = document.getElementById("name");

      await user.type(nameInput, "u");
      expect(nameInput.value).toBe("u");

      await user.type(nameInput, "s");
      expect(nameInput.value).toBe("us");
    });
  });
});
