import FormField from "@/components/FormField";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

const properties = { type: "text", id: "name", label: "Name" };
const value = "user";
const readOnly = true;

describe("FormField", () => {
  test("loads field correctly", async () => {
    render(
      <FormField
        properties={properties}
        value={value}
        readOnly={readOnly}
        changeHandler={() => {}}
      />,
    );

    await waitFor(() => {
      const fieldChildren = document.querySelectorAll("div > div > *");
      expect(fieldChildren.length).toBe(2);

      const label = fieldChildren.item(0);
      const field = fieldChildren.item(1);

      expect(label.innerHTML).toBe("Name:");
      expect(field.type).toBe("text");
      expect(field.value).toBe("user");
      expect(field.disabled).toBe(true);
    });
  });

  test("loads hidden field correctly", async () => {
    render(
      <FormField
        properties={{ ...properties, type: "hidden" }}
        value={""}
        readOnly={false}
        changeHandler={() => {}}
      />,
    );

    await waitFor(() => {
      const fieldChildren = document.querySelectorAll("div > div > *");
      expect(fieldChildren.length).toBe(0);

      const field = document.querySelector("input");

      expect(field.type).toBe("hidden");
      expect(field.value).toBe("");
      expect(field.disabled).toBe(false);
    });
  });
});
