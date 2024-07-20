import { Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Home/HomePage";
import Admin from "./components/admin/Admin";
import DashBoard from "./components/admin/Manage/dashboard/DashBoard";
import ManageUser from "./components/admin/Manage/user/ManageUser";
import AddNewUser from "./components/admin/Manage/user/AddNewUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageProject from "./components/admin/Manage/Project/ManageProject";
import ManageTask from "./components/admin/Manage/Project/ManageTask";
import UserDashboard from "./components/user/DashBoard/UserDashboard";
import Project from "./components/user/Project/Project";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<UserDashboard />} />
          <Route path={"project"} element={<Project />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path={"addnewusers"} element={<AddNewUser />} />
          <Route path={"manageusers"} element={<ManageUser />} />
          <Route path={"manageprojects"} element={<ManageProject />} />
          <Route path={"managetasks"} element={<ManageTask />} />
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
