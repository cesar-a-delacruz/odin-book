import { ThemeProvider } from "@/contexts/ThemeContext";
import { render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "@/routes";

export default function setRoute(initialRoute = "/") {
  return render(
    <ThemeProvider>
      <RouterProvider
        router={createMemoryRouter(routes.routes, {
          initialEntries: [initialRoute],
        })}
      />
    </ThemeProvider>,
  );
}
