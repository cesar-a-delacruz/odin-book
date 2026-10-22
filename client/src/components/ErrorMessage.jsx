import styles from "./styles/ErrorMessage.module.css";
import { useRouteError } from "react-router-dom";
import { getErrorMessage } from "react-error-boundary";
import { CircleAlert } from "lucide-react";

export default function ErrorMessage({ error, resetErrorBoundary }) {
  const routeError = useRouteError();

  return (
    <div className={styles.error}>
      <CircleAlert />
      <p>{error ? getErrorMessage(error) : routeError.message}</p>
    </div>
  );
}
