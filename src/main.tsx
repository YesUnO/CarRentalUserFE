import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppShell from "./AppShell/Appshell";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './infrastructure/store';
import UserPage from "./features/User/UserPage";
import AdminPage from "./features/Admin/AdminPage";
import PickCarPage from "./features/Car/PickCarPage/PickCarPage";
import OrderDetailPage from "./features/Order/OrderDetailPage";
import AdminUserManagmentPage from "./features/Admin/User/AdminUserManagmentPage/AdminUserManagmentPage";


const Root: React.FC = () => {
  const isAdmin = useSelector((state: RootState) => state.authService.role == "Admin");
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<PickCarPage />} />
          <Route path="/orderDetail" element={<OrderDetailPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to={"/"} />} />
          <Route path="/admin/user" element={isAdmin ? <AdminUserManagmentPage /> : <Navigate to={"/"} />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
