import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ErrorPage from "./error_page";

import App from "./components/App";
import Avatar from "./components/Avatar.js";
import Overview from "./components/Overview.js";
import Specification from "./components/Specification.js";
import Test from "./components/Test.js";

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
    path: "/Test",
    element: <Test />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
