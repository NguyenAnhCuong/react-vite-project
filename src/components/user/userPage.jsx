import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./userPage.scss";
import UserSidebar from "./userSidebar";
import UserHeader from "./UserHeader";

const UserPage = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="userpage-header">
        <UserHeader />
      </div>
      <div className="userpage-content">
        <div className="userpage-sidebar">
          <UserSidebar collapsed={collapsed} />
        </div>
        <div className="userpage-rightside">
          <div className="userpage-main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
