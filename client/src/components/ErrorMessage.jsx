import styles from "./styles/ErrorMessage.module.css";
import { useRouteError } from "react-router-dom";
import { getErrorMessage } from "react-error-boundary";

export default function ErrorMessage({ error, resetErrorBoundary }) {
  const routeError = useRouteError();

  return (
    <div className={styles.error}>
      <div className={styles.icon}>...</div>
      <div className={styles.text}>
        <h3>Something went wrong:</h3>
        <p>{error ? getErrorMessage(error) : routeError.message}</p>
      </div>
    </div>
  );
}
