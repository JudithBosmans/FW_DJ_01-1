import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ErrorPage from "./error_page";

import App from "./components/App";
import Overview from "./components/Overview.js";
import Specification from "./components/Specification.js";

import Game from "./components/Game.js";

import Avatar from "./components/Avatar.js";
import PicAvatar from "./components/PicAvatar.js";
import AvatarLoad from "./components/AvatarLoad.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Avatar",
    element: <Avatar />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Overview",
    element: <Overview />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Specification",
    element: <Specification />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/Game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/PicAvatar",
    element: <PicAvatar />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/AvatarLoad",
    element: <AvatarLoad />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
