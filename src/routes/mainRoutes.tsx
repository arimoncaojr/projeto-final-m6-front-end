import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/homepage";
import { LoginPage } from "../pages/Login/login";
import { RegisterPage } from "../pages/Register/register";
import { DatailPostPage } from "../pages/DatailPost/datailPost";
import { ProfilePage } from "../pages/Profile/profile";
import { ResetPassword } from "../pages/ResetPassword/resetPassword";

export const RoutesMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<DatailPostPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};
