import { createBrowserRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../utils/routes";
import Auth from "./Auth";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: (
      <AuthRoute>
        <Auth />
      </AuthRoute>
    ),
  },
]);
