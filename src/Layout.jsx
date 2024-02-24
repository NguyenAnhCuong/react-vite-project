import { Route, Routes } from "react-router-dom";
// import Header from "./components/header/Header";
import App from "./App";
import UserPage from "./components/user/userPage";
import HomePage from "./components/Home/HomePage";
import Admin from "./components/admin/Admin";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default Layout;
