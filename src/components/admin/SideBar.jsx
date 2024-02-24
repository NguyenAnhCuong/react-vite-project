import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SideBar = (props) => {
  return (
    <div className="">
      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
};
export default SideBar;
