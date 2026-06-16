import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import type { RootState } from "../app/store";
import type React from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({
  children,
}: Props) => {
  const isLoggedIn = useSelector(
    (state: RootState) =>
      state.auth.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;