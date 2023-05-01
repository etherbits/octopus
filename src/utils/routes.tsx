import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { tokenAtom } from "../pages/Auth";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [token] = useAtom(tokenAtom);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export const AuthRoute: React.FC<Props> = ({ children }) => {
  const [token] = useAtom(tokenAtom);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
