import styles from "@/utils/css/modules/authPage.module.css";
import { create } from "@/fieldsets/userFieldsets";
import Form from "@/components/Form";
import requestHandler from "@/handlers/requestHandler";
import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertContext";

export default function Register() {
  document.title = `${import.meta.env.VITE_TITLE}: Register`;
  const { setAlert } = useContext(AlertContext);

  return (
    <div className={styles.authPage}>
      <Form
        initialData={{}}
        fieldsets={create}
        submit={{ text: "Register", handler: submitUser, disable: false }}
      />
    </div>
  );

  async function submitUser(data) {
    if (data.password !== data.confirm)
      return alert("The passwords don't match.");

    const response = await requestHandler.post(data, "user");
    let alert = { text: "User registered successfully.", type: "success" };
    if (response.error) alert = { text: response.error, type: "error" };
    setAlert(alert);

    return response;
  }
}
