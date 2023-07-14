import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { AuthRoute, ProtectedRoute } from "../utils/routes";
import AlbumPage from "./Album";
import Auth from "./Auth";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DefaultLayout>
          <Home />
        </DefaultLayout>
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
    path: "/album/:id?",
    element: (
      <ProtectedRoute>
        <DefaultLayout>
          <AlbumPage />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/artist/:id?",
    element: (
      <ProtectedRoute>
        <DefaultLayout>
          <AlbumPage />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
]);
