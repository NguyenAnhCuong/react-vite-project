import { Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
import App from "./App";
import UserPage from "./components/user/userPage";
import HomePage from "./components/Home/HomePage";
import Admin from "./components/admin/Admin";
import DashBoard from "./components/admin/Manage/dashboard/DashBoard";
import ManageUser from "./components/admin/Manage/user/ManageUser";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path={"manageusers"} element={<ManageUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default Layout;
