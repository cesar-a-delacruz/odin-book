import styles from "./styles/TextFormField.module.css";

export default function TextFormField({ field, value, changeHandler }) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          className={styles.text}
          id={field.id}
          placeholder={field.placeholder || ""}
          onChange={(e) =>
            changeHandler(e.currentTarget.id, e.currentTarget.value)
          }
        ></textarea>
      );
    case "file":
      return (
        <input
          className={styles.file}
          type={field.type}
          id={field.id}
          value={value}
          onChange={(e) =>
            changeHandler(e.currentTarget.id, e.currentTarget.files[0])
          }
        />
      );
    case "hidden":
      return <input type={field.type} id={field.id} value={value} />;
  }
}
