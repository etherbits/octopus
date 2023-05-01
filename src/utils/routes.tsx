import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userAtom } from "../pages/Auth";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [user] = useAtom(userAtom);

  if (!user?.token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export const AuthRoute: React.FC<Props> = ({ children }) => {
  const [user] = useAtom(userAtom);

  if (user?.token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
