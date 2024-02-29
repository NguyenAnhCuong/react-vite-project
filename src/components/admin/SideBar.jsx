import tenko from "../../assets/tenko.jpg";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";

import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();

  return (
    <>
      <ProSidebar
        image={tenko}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <FaGem size={"2rem"} className="mx-2" />
          <span className="title">React Vite</span>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaHeart />} onClick={() => navigate("/admin")}>
              Dashboard
            </MenuItem>
            <SubMenu title="Manage" icon={<FaList />}>
              <MenuItem onClick={() => navigate("addnewusers")}>
                Add New User
              </MenuItem>
              <MenuItem onClick={() => navigate("manageusers")}>
                Mange User
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <FaGithub size={"1.5rem"} />
            <span
              style={{
                marginLeft: "5px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Source code
            </span>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};
export default SideBar;
