export default function Dialog({ name, ref, children }) {
  return (
    <dialog ref={ref}>
      <div>
        {name && <h2>{name}</h2>}
        <button
          onClick={(event) => {
            event.currentTarget.parentElement.parentElement.close();
            event.stopPropagation();
          }}
        >
          X
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
}
