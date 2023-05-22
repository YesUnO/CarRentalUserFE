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
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostGoogleLoginPage from "../features/Auth/pages/PostGoogleLoginPage";

const Root: React.FC = () => {
    const isAdmin = useSelector((state: RootState) => state.authService.role == "Admin");
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
    return (
      <GoogleOAuthProvider clientId={googleClientId as string}>
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route path="/externalAuth" element={<PostGoogleLoginPage />} />
              <Route path="/" element={<PickCarPage />} />
              <Route path="/orderDetail" element={<OrderDetailPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/confirmEmail" element={<EmailConfirmationPage />} />
              <Route path="/admin/car" element={isAdmin ? <AdminCarPage /> : <Navigate to={"/"} />} />
              <Route path="/admin/user" element={isAdmin ? <AdminUserManagmentPage /> : <Navigate to={"/"} />} />
            </Routes>
          </AppShell>
        </BrowserRouter>
        </GoogleOAuthProvider>
    );
  };

  export default Root;