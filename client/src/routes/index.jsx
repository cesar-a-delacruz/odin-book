import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Default from "@/layouts/Default";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import Profile from "@/pages/Profile";
import Auth from "@/layouts/Auth";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ErrorMessage from "@/components/ErrorMessage";

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
        errorElement: <ErrorMessage />,
      },
      {
        path: "post",
        element: <Post />,
        errorElement: <ErrorMessage />,
      },
      {
        path: "profile/:username?",
        element: <Profile />,
        errorElement: <ErrorMessage />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
