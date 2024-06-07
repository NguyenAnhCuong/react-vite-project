import { Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
import App from "./App";
import UserPage from "./components/user/userPage";
import HomePage from "./components/Home/HomePage";
import Admin from "./components/admin/Admin";
import DashBoard from "./components/admin/Manage/dashboard/DashBoard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobPage from "./components/user/JobPage";
import ManageCompany from "./components/admin/Manage/user/ManageCompany";
import AddNewJob from "./components/admin/Manage/user/AddNewJob";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:id" element={<JobPage />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path={"addnewusers"} element={<AddNewJob />} />
          <Route path={"manageusers"} element={<ManageCompany />} />
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
