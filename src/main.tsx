import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppShell from "./AppShell/Appshell";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './infrastructure/store';
import UserPage from "./features/User/UserPage";
import AdminPage from "./features/Admin/AdminPage";
import PickCarPage from "./features/Car/PickCarPage";
import OrderDetailPage from "./features/Order/OrderDetailPage";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<UserPage />}></Route>
            <Route path="/orderDetail" element={<OrderDetailPage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Routes>
        </AppShell>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
