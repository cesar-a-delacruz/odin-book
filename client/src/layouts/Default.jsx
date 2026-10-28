import "@/utils/css/layouts.css";
import styles from "./styles/Default.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Menu from "@/components/Menu";
import MenuContext from "@/contexts/MenuContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import {
  BookUserIcon,
  LogOutIcon,
  SunMoonIcon,
  UserIcon,
  UserXIcon,
} from "lucide-react";

export default function Default() {
  const { changeTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const pageLocation = useLocation();

  useEffect(() => {
    document.documentElement.scroll({ top: 0, behavior: "smooth" });
  }, [pageLocation.pathname]);

  return (
    <div className={`layout ${styles.default}`}>
      <header>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <BookUserIcon />
          <h1>{import.meta.env.VITE_TITLE}</h1>
        </div>

        <MenuContext
          value={{
            options: [
              {
                text: "Change theme",
                handler: changeTheme,
                icon: <SunMoonIcon />,
              },
              {
                text: "View profile",
                handler: () => {
                  window.history.replaceState({}, "");
                  navigate("/profile", { state: { id: "profile" } });
                },
                icon: <UserIcon />,
              },
              {
                text: "Logout",
                handler: () => {
                  location.replace("/login");
                },
                icon: <LogOutIcon />,
              },
              {
                text: "Delete account",
                handler: () => {},
                icon: <UserXIcon />,
              },
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
