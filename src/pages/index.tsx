import { createBrowserRouter } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../utils/routes";
import AlbumPage from "./Album";
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
  {
    path: "/album/:id",
    element: (
      <ProtectedRoute>
        <AlbumPage />
      </ProtectedRoute>
    )
  }
]);
