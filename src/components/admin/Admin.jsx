import SideBar from "./SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div
        className="admin-sidebar"
        // style={{ width: "21%" }}
      >
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content" style={{ width: "80vw" }}>
        <div className="admin-header">
          <FaBars size={"1.5rem"} onClick={() => setCollapsed(!collapsed)} />
        </div>

        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
