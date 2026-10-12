import "@/utils/css/layouts.css";
import styles from "./styles/Auth.module.css";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className={`layout ${styles.auth}`}>
      <div className={styles.content}>
        <aside>
          <h1 onClick={() => location.assign("/")}>
            {import.meta.env.VITE_TITLE}
          </h1>
          <p>
            {location.pathname.includes("register") ? (
              <>
                Already have an account? login <a href="/login">here</a>
              </>
            ) : (
              <>
                Don't have an account? register <a href="/register">here</a>
              </>
            )}
          </p>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
      <footer>
        <p>
          Developed by{" "}
          <a href="https://github.com/cesar-a-delacruz">César De La Cruz</a>
        </p>
      </footer>
    </div>
  );
}
