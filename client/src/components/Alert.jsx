import { useContext, useEffect, useState } from "react";
import styles from "./styles/Alert.module.css";
import {
  CheckCircle2Icon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import { AlertContext } from "@/contexts/AlertContext";

export default function Alert() {
  const { text, type } = useContext(AlertContext).alert;
  const [display, setDisplay] = useState("");

  let timeout;
  useEffect(() => {
    setDisplay("flex");
    return () => {
      timeout = setTimeout(() => {
        setDisplay("none");
      }, 5000);
    };
  }, [text]);

  if (!text) return <></>;

  let icon, background, border;
  switch (type) {
    case "error":
      icon = <XCircleIcon />;
      border = "var(--border-error)";
      background = "var(--color-error-background)";
      break;
    case "success":
      icon = <CheckCircle2Icon />;
      border = "var(--border-success)";
      background = "var(--color-success-background)";
      break;
    default:
      icon = <InfoIcon />;
      break;
  }
  return (
    <div
      className={styles.alert}
      style={{
        display: display,
        backgroundColor: background,
        border: border,
      }}
    >
      {icon}
      <p>{text}</p>
      <XIcon
        className={styles.close}
        onClick={() => {
          setDisplay("none");
          clearTimeout(timeout);
        }}
      />
    </div>
  );
}
