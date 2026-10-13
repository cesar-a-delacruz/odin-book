import { useState } from "react";
import styles from "./styles/TextForm.module.css";
import { clean } from "@/utils/js/objects";

export default function TextForm({ fields = [], initialData, actions = [] }) {
  const [data, setData] = useState(initialData);
  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <div className={styles.textForm}>
      {fields.map((f) =>
        f.type === "textarea" ? (
          <textarea
            className={styles.content}
            id={f.id}
            placeholder={f.placeholder || ""}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
            key={f.id}
          ></textarea>
        ) : (
          <input
            type={f.type}
            id={f.id}
            value={f.type === "hidden" ? initialData[f.id] : ""}
            style={{ display: "none" }}
            key={f.id}
          />
        ),
      )}
      <div className={styles.actions}>
        <button disabled={disableSubmit}>...</button>
        {actions.map((a) => (
          <button disableddisabled={disableSubmit}>{a.icon}</button>
        ))}
      </div>
    </div>
  );

  function changeHandler(id, value) {
    const newData = clean({
      ...data,
      [id]: value,
    });
    setData(newData);
    if (!newData.content) setDisableSubmit(true);
    else setDisableSubmit(false);
  }
}
