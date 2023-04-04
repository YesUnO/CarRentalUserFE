import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppShell from "./AppShell/Appshell";
import Trash from "./Pages/trash/Trash";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="" element={<Trash />}></Route>
        </Routes>
      </AppShell>
    </BrowserRouter>
  </React.StrictMode>
);
