import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { doLogOut } from "../../redux/action/userAction";
import { LogOut } from "../utils/api/ApiServices";
import { toast } from "react-toastify";
import Languages from "./Languages";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className={"navbar-brand"}>
          React-Vite
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} className="nav-link">
              {t("header.page.home")}
            </NavLink>
            <NavLink to={"/user"} className="nav-link">
              {t("header.page.user")}
            </NavLink>
            <NavLink to={"/admin"} className="nav-link">
              {t("header.page.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn btn-success mx-3"
                  onClick={() => navigate("/login")}
                >
                  {t("header.auth.login")}
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => navigate("/register")}
                >
                  {t("header.auth.signup")}
                </button>
              </>
            ) : (
              <NavDropdown
                title={t("header.setting.setting")}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  {t("header.setting.profile")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("header.setting.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Languages />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
