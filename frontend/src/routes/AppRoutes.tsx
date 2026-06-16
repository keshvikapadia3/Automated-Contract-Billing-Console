import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ContractPage from "../pages/ContractPage";
import PointPage from "../pages/PointPage";
import InvoicePage from "../pages/InvoicePage";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route
          path="dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="contracts"
          element={<ProtectedRoute><ContractPage /></ProtectedRoute>}
        />
        <Route
          path="points"
          element={<ProtectedRoute><PointPage /></ProtectedRoute>}
        />
        <Route
          path="invoice"
          element={<ProtectedRoute><InvoicePage /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;