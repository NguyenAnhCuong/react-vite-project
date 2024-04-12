import SideBar from "./SideBar";
import "./Admin.scss";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import PerfectScrollbar from "react-perfect-scrollbar";
import Languages from "../header/Languages";
import { LogOut } from "../utils/api/ApiServices";
import { useDispatch, useSelector } from "react-redux";
import { doLogOut } from "../../redux/action/userAction";
import { useTranslation } from "react-i18next";

const Admin = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const handleLogOut = async () => {
    let res = await LogOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogOut());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="admin-container">
      <div
        className="admin-sidebar"
        // style={{ width: "21%" }}
      >
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars className="left" size={"1.5rem"} />
          </span>
          <div className="right">
            <Languages />
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>{t("admin.setting.profile")}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogOut()}>
                {t("admin.setting.logout")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
