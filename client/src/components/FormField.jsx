export default function FormField({
  properties,
  value,
  changeHandler,
  readOnly,
}) {
  const { label, ...props } = properties;

  return props.type === "hidden" ? (
    <>{renderInput()}</>
  ) : (
    <div>
      {label && <label htmlFor={props.id}>{label}:</label>}
      {renderInput()}
    </div>
  );

  function renderInput() {
    switch (props.type) {
      case "textarea":
        return (
          <textarea
            {...props}
            value={value || ""}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
            disabled={readOnly}
          ></textarea>
        );
      case "file":
        return (
          <>
            <input
              {...props}
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.currentTarget.files[0];

                const container = document.getElementById(
                  props.id + "Container",
                );
                container.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
                changeHandler(e.currentTarget.id, e.currentTarget.files[0]);
              }}
              accept="image/*"
              disabled={readOnly}
            />
            <div
              id={`${props.id}Container`}
              style={{
                backgroundImage: value ? `url(${value})` : "none",
              }}
              onClick={() => {
                const input = document.getElementById(`${props.id}`);
                input.click();
              }}
              tabIndex={0}
            >
              <div style={{ display: readOnly ? "none" : "flex" }}>
                Upload and image
              </div>
            </div>
          </>
        );
      default:
        return (
          <input
            {...props}
            value={value || ""}
            onChange={(e) =>
              changeHandler(e.currentTarget.id, e.currentTarget.value)
            }
            disabled={readOnly}
          />
        );
    }
  }
}
