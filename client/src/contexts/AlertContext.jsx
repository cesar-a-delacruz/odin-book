import { createContext, useState } from "react";

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ text: "", type: "" });

  return <AlertContext value={{ alert, setAlert }}>{children}</AlertContext>;
}
