import { useState } from "react";
import styles from "./styles/TextForm.module.css";
import { clean } from "@/utils/js/objects";
import TextFormField from "./TextFormField";

export default function TextForm({ fields = [], initialData, actions = [] }) {
  const [data, setData] = useState(initialData);
  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <div className={styles.textForm}>
      {fields.map((f) => (
        <TextFormField
          field={f}
          value={data[f.id]}
          changeHandler={changeHandler}
          key={f.id}
        />
      ))}
      <div className={styles.actions}>
        <button disabled={disableSubmit}>...</button>
        {actions.map((a) => (
          <button disabled={disableSubmit} key={a.icon}>
            {a.icon}
          </button>
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
