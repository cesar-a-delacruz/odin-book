import "@/utils/css/layouts.css";
import styles from "./styles/Default.module.css";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Menu from "@/components/Menu";
import MenuContext from "@/contexts/MenuContext";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Default() {
  const { changeTheme } = useContext(ThemeContext);

  return (
    <div className={`layout ${styles.default}`}>
      <header>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE}
        </h1>

        <MenuContext
          value={{
            options: [
              { text: "Change theme", handler: changeTheme },
              {
                text: "View profile",
                handler: () => {
                  window.history.replaceState({}, "");
                  location.assign("/profile");
                },
              },
              {
                text: "Logout",
                handler: () => {
                  location.replace("/login");
                },
              },
              { text: "Delete account", handler: () => {} },
            ],
            render: true,
          }}
        >
          <Menu />
        </MenuContext>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>
          Developed by{" "}
          <a href="https://github.com/cesar-a-delacruz">César De La Cruz</a>
        </p>
      </footer>
    </div>
  );
}
