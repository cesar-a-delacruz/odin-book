import { useState } from "react";
import styles from "./styles/TextForm.module.css";
import { clean } from "@/utils/js/objects";

export default function TextForm({ attributes, hiddenData }) {
  const [data, setData] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(true);

  return (
    <div className={styles.textForm}>
      <textarea
        className={styles.content}
        id={attributes.id}
        placeholder={attributes.placeholder || ""}
        onChange={(e) =>
          changeHandler(e.currentTarget.id, e.currentTarget.value)
        }
        value={data[attributes.id]}
      ></textarea>
      {hiddenData.map((h) => (
        <input type="hidden" id={h.id} value={h.value} />
      ))}
      <div className={styles.actions}>
        <button disabled={disableSubmit}>...</button>
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
