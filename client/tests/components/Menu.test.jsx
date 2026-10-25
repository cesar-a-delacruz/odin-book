import { describe, test, expect, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import Menu from "@/components/Menu";
import MenuContext from "@/contexts/MenuContext";

const options = [
  { text: "edit", icon: "...", handler: () => {} },
  { text: "delete", icon: "...", handler: () => {} },
];

describe("Menu", () => {
  test("loads correctly", async () => {
    await act(async () => {
      render(
        <MenuContext value={{ options: options, render: true }}>
          <Menu selectionHandler={() => {}} />
        </MenuContext>,
      );
    });

    await waitFor(() => {
      const menuContainer = document.querySelector("body > div > div");
      const menu = menuContainer.children.item(0);

      expect(menu.children.length).toBe(2);
    });
  });

  test("hides options", async () => {
    await act(async () => {
      render(
        <MenuContext
          value={{
            options: [options[0], { ...options[1], hide: true }],
            render: true,
          }}
        >
          <Menu selectionHandler={() => {}} />
        </MenuContext>,
      );
    });

    await waitFor(() => {
      const menuContainer = document.querySelector("body > div > div");
      const menu = menuContainer.children.item(0);
      expect(menu.children.length).toBe(1);
    });
  });

  test("shows and hides", async () => {
    await act(async () => {
      render(
        <MenuContext
          value={{
            options: options,
            render: true,
          }}
        >
          <Menu selectionHandler={() => {}} />
        </MenuContext>,
      );
    });

    await waitFor(async () => {
      const menuContainer = document.querySelector("body > div > div");
      const menu = menuContainer.children.item(0);
      const button = menuContainer.children.item(1);

      const user = userEvent.setup();
      await user.click(button);
      expect(menu.style.display).toBe("block");
      await user.click(button);
      expect(menu.style.display).toBe("none");

      const menuOption = menu.children.item(0);
      await user.click(button);
      expect(menu.style.display).toBe("block");
      await user.click(menuOption);
      expect(menu.style.display).toBe("none");
    });
  });

  test("empty when render is false", async () => {
    await act(async () => {
      render(
        <MenuContext value={{ options: options, render: false }}>
          <Menu selectionHandler={() => {}} />
        </MenuContext>,
      );
    });

    await waitFor(() => {
      const container = document.querySelector("body > div");
      expect(container.children.length).toBe(0);
    });
  });
});
