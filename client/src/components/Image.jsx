import styles from "./styles/Image.module.css";
import { useRef } from "react";
import Dialog from "@/components/Dialog";

export default function Image({ src, alt, className }) {
  const previewDialog = useRef();

  return (
    <div className={styles.image}>
      <img
        src={src}
        alt={alt}
        onClick={(event) => {
          previewDialog.current.showModal();
          event.stopPropagation();
        }}
        className={className}
        fetchPriority="high"
      />
      <Dialog ref={previewDialog}>
        <img src={src} alt={alt} />
      </Dialog>
    </div>
  );
}
