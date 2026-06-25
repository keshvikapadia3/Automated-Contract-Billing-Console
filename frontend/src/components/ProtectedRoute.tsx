import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn, token } = useSelector(
    (state: RootState) => state.auth
  );

  // extra safety: token-based validation (future JWT support)
  const isAuthenticated = isLoggedIn && !!token;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;