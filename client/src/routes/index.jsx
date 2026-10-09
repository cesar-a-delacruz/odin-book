import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Default from "@/layouts/Default";
import Home from "@/pages/Home";

export default createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
    ],
  },
]);
