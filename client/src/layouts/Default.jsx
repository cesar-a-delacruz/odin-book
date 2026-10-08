import "@/utils/css/layouts.css";
import styles from "./styles/Default.module.css";
import { Outlet } from "react-router-dom";
import Menu from "@/components/Menu";
import MenuContext from "@/contexts/MenuContext";

export default function Default() {
  return (
    <div className={`layout ${styles.default}`}>
      <header>
        <h1 onClick={() => location.assign("/")}>
          {import.meta.env.VITE_TITLE}
        </h1>

        <MenuContext
          value={{
            options: [
              { text: "View profile", handler: () => {} },
              { text: "Logout", handler: () => {} },
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
