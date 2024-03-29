import { useSelector } from "react-redux";
import { RootState } from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../AppShell/Appshell";
import PickCarPage from "../features/Car/PickCarPage/PickCarPage";
import OrderDetailPage from "../features/Order/OrderDetailPage";
import UserPage from "../features/User/Pages/UserPage";
import EmailConfirmationPage from "../features/User/Pages/EmailConfirmationPage";
import AdminCarPage from "../features/Admin/Car/AdminCarPage";
import AdminUserManagmentPage from "../features/Admin/User/AdminUserManagmentPage/AdminUserManagmentPage";

const Root: React.FC = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.authService.claims.role == "Admin"
  );
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<PickCarPage />} />
          <Route path="/orderDetail" element={<OrderDetailPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/confirmEmail" element={<EmailConfirmationPage />} />
          <Route
            path="/admin/car"
            element={isAdmin ? <AdminCarPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/admin/user"
            element={
              isAdmin ? <AdminUserManagmentPage /> : <Navigate to={"/"} />
            }
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default Root;
