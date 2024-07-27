import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogOut } from "../utils/api/userServices";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";

const UserHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogOut = async () => {
    let res = await postLogOut(account.email);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogOut());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ borderBottom: "1px solid gray", height: "70px" }}
    >
      <Container>
        <NavLink to="/" className={"navbar-brand"}>
          React-Vite
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} className="nav-link">
              User
            </NavLink>
            {account && account.role === "ADMIN" && (
              <NavLink to={"/admin"} className="nav-link">
                Admin
              </NavLink>
            )}
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <NavDropdown.Item
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </NavDropdown.Item>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default UserHeader;
