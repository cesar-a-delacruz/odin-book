import { XIcon } from "lucide-react";
import styles from "./styles/Dialog.module.css";

export default function Dialog({ name, ref, children }) {
  return (
    <dialog ref={ref}>
      <div className={styles.top}>
        {name && <h2>{name}</h2>}
        <XIcon
          onClick={(event) => {
            event.currentTarget.parentElement.parentElement.close();
            event.stopPropagation();
          }}
        />
      </div>
      <div className={styles.bottom}>{children}</div>
    </dialog>
  );
}
