import styles from "./styles/Register.module.css";
import { create } from "@/fieldsets/userFieldsets";
import Form from "@/components/Form";

export default function Register() {
  document.title = `${import.meta.env.VITE_TITLE}: Register`;

  return (
    <div className={styles.registerPage}>
      <Form
        initialData={{}}
        fieldsets={create}
        submit={{ text: "Register", handler: () => {}, disable: false }}
      />
    </div>
  );
}
