import { createBrowserRouter } from "react-router-dom";
import PlayerControls from "../components/Layouts/PlayerControls";
import { AuthRoute, ProtectedRoute } from "../utils/routes";
import AlbumPage from "./Album";
import Auth from "./Auth";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PlayerControls>
          <Home />
        </PlayerControls>
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
        <PlayerControls>
          <AlbumPage />
        </PlayerControls>
      </ProtectedRoute>
    ),
  },
]);
