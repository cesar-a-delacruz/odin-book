import { createContext } from "react";
import Cookies from "js-cookie";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  if (!Cookies.get("theme")) {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "ligth";
    Cookies.set("theme", theme, { expires: 30 });
  }

  document.documentElement.setAttribute("data-theme", Cookies.get("theme"));

  return <ThemeContext value={{ changeTheme }}>{children}</ThemeContext>;

  function changeTheme() {
    const newTheme = Cookies.get("theme") === "dark" ? "ligth" : "dark";
    Cookies.set("theme", newTheme, { expires: 30 });
    document.documentElement.setAttribute("data-theme", newTheme);
  }
}
