import styles from "@/utils/css/modules/authPage.module.css";
import { login } from "@/fieldsets/userFieldsets";
import Form from "@/components/Form";

export default function Login() {
  document.title = `${import.meta.env.VITE_TITLE}: Login`;

  return (
    <div className={styles.authPage}>
      <Form
        initialData={{}}
        fieldsets={login}
        submit={{ text: "Login", handler: () => {}, disable: false }}
      />
    </div>
  );
}
