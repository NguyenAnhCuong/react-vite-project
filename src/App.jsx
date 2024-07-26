import { useState } from "react";
import "./App.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
import UserHeader from "./components/user/UserHeader";
import UserSidebar from "./components/user/userSidebar";

const App = () => {
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
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
