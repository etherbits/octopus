import { Navigate } from "react-router-dom";
import useUserListStore from "../stores/user";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = useUserListStore((state) => state.currentUser);

  if (!user?.token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export const AuthRoute: React.FC<Props> = ({ children }) => {
  const user = useUserListStore((state) => state.currentUser);

  if (user?.token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
