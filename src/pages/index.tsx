import { createBrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/auth",
    element: (
      <Auth />
    ),
  },
]);
