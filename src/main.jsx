import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import DashboardMahasiswa from "./pages/dashboardMhs";
import DashboardDosen from "./pages/dashboardDosen";

const router = createBrowserRouter([
  { path: "/", element: <div>hello</div> },
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboardMahasiswa", element: <DashboardMahasiswa /> },
  { path: "/dashboardDosen", element: <DashboardDosen /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
