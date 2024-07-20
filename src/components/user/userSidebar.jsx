import avata from "../../assets/defaultavata.png";
import { FaGem, FaList, FaGithub, FaHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const UserSidebar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ResizableBox
      width={250}
      height={100}
      axis="x"
      minConstraints={[200, Infinity]}
      maxConstraints={[500, Infinity]}
      resizeHandles={["e"]}
    >
      <div>
        <div className="sidebar-header">
          <div className="avata">
            <img className="image" src={avata} />
          </div>
          <div>
            <span className="username">React vite</span>
          </div>
        </div>
        <div className="sidebar-midder">
          <div className="sidebar-component" onClick={() => navigate("/")}>
            <div>
              <MdDashboard size={"1.5rem"} className="icon" />
            </div>
            <div>
              <span className="font-name">Dashboard</span>
            </div>
          </div>
          <div
            className="sidebar-component"
            onClick={() => navigate("project")}
          >
            <div>
              <FaList size={"1.5rem"} className="icon" />
            </div>
            <div>
              <span className="font-name">Project</span>
            </div>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="sidebar-component">
            <div>
              <FaGear size={"1.5rem"} className="icon" />
            </div>
            <div>
              <span className="font-name">Setting</span>
            </div>
          </div>
        </div>
      </div>
    </ResizableBox>
  );
};

export default UserSidebar;
