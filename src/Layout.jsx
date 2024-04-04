import { Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
import App from "./App";
import UserPage from "./components/user/userPage";
import HomePage from "./components/Home/HomePage";
import Admin from "./components/admin/Admin";
import DashBoard from "./components/admin/Manage/dashboard/DashBoard";
import ManageUser from "./components/admin/Manage/user/ManageUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ManageQuiz from "./components/admin/Manage/Quiz/ManageQuiz";
import DetailQuiz from "./components/user/DetailQuiz";
import ManageQuestion from "./components/admin/Manage/Question/ManageQuestion";

const NotFound = () => {
  return (
    <div className="alert alert-danger container mt-3">
      404.Not found data with your current URL
    </div>
  );
};

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path={"managequestion"} element={<ManageQuestion />} />
          <Route path={"manageusers"} element={<ManageUser />} />
          <Route path={"managequiz"} element={<ManageQuiz />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
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
