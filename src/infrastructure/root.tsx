import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../AppShell/Appshell";
import PickCarPage from "../features/Car/PickCarPage/PickCarPage";
import OrderDetailPage from "../features/Order/OrderDetailPage";
import UserPage from "../features/User/UserPage";
import EmailConfirmationPage from "../features/User/components/EmailConfirmationPage";
import AdminCarPage from "../features/Admin/Car/AdminCarPage";
import AdminUserManagmentPage from "../features/Admin/User/AdminUserManagmentPage/AdminUserManagmentPage";

const Root: React.FC = () => {
    const isAdmin = useSelector((state: RootState) => state.authService.role == "Admin");
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<PickCarPage />} />
              <Route path="/orderDetail" element={<OrderDetailPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/confirmEmail" element={<EmailConfirmationPage />} />
              <Route path="/admin/car" element={isAdmin ? <AdminCarPage /> : <Navigate to={"/"} />} />
              <Route path="/admin/user" element={isAdmin ? <AdminUserManagmentPage /> : <Navigate to={"/"} />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
      </Provider>
  
    );
  };

  export default Root;