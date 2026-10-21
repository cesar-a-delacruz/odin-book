import styles from "./styles/Loader.module.css";
import { ClipLoader } from "react-spinners";

export default function Loader({ loadingText }) {
  const rootStyles = getComputedStyle(document.documentElement);
  const color = rootStyles.getPropertyValue("--color-text-1").trim();

  return (
    <div className={styles.loader}>
      <ClipLoader color={color} className={styles.spinner} />
      <p className={styles.text}>{loadingText}</p>
    </div>
  );
}
