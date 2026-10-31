import { ThemeProvider } from "@/contexts/ThemeContext";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "@/routes";
import { AlertProvider } from "@/contexts/AlertContext";

export default function setRoute(initialRoute = "/") {
  return render(
    <ThemeProvider>
      <AlertProvider>
        <RouterProvider
          router={createMemoryRouter(routes.routes, {
            initialEntries: [initialRoute],
          })}
        />
      </AlertProvider>
    </ThemeProvider>,
  );
}
