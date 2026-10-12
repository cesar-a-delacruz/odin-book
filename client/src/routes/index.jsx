import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Default from "@/layouts/Default";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import Profile from "@/pages/Profile";
import Auth from "@/layouts/Auth";
import Register from "@/pages/Register";

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
      {
        path: "post",
        element: <Post />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth />,
    children: [{ path: "register", element: <Register /> }],
  },
]);
