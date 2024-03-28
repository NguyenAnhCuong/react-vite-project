import { Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
import App from "./App";
import UserPage from "./components/user/userPage";
import HomePage from "./components/Home/HomePage";
import Admin from "./components/admin/Admin";
import DashBoard from "./components/admin/Manage/dashboard/DashBoard";
import ManageUser from "./components/admin/Manage/user/ManageUser";
import AddNewUser from "./components/admin/Manage/user/AddNewUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route path={"addnewusers"} element={<AddNewUser />} />
          <Route path={"manageusers"} element={<ManageUser />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        closeOnClick
        pauseOnFocusLoss
        draggablepa
      />
    </>
  );
};

export default Layout;
