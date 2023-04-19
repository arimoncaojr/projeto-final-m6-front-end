import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/Dashboard/dashboard";
import { HomePage } from "../pages/Home/homepage";
import { LoginPage } from "../pages/Login/login";
import { RegisterPage } from "../pages/Register/register";
import { ModalPostsCreate } from "../components/ModalPostsCreate";

export const RoutesMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ModalPostsCreate />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
};
