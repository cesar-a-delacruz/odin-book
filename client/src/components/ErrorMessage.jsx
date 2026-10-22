import styles from "./styles/ErrorMessage.module.css";
import { useRouteError } from "react-router-dom";

export default function ErrorMessage() {
  const error = useRouteError();

  return (
    <div className={styles.error}>
      <div className={styles.icon}>...</div>
      <div className={styles.text}>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
