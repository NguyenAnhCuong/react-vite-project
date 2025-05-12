import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { doLogOut } from "../../redux/action/userAction";
// import { LogOut } from "../utils/api/ApiServices";
import { toast } from "react-toastify";
import Languages from "./Languages";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Profile from "./Profile";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { t } = useTranslation();
  const [showModalProfile, setShowModalProfile] = useState(false);

  const handleLogOut = async () => {
    if (!account.email) {
      toast.error("Invalid email");
      return;
    }
    toast.success("Logout success");
    dispatch(doLogOut());
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-container">
        <Container>
          <NavLink to="/" className={"navbar-brand"}>
            <span className="title">React</span>
            <span className="title-hover" style={{ marginLeft: "5px" }}>
              Vite
            </span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-center w-100">
              <NavLink to={"/"} className="nav-link nav-item-custom mx-2">
                {t("header.page.home")}
              </NavLink>
              <NavLink to={"/user"} className="nav-link nav-item-custom mx-2">
                {t("header.page.user")}
              </NavLink>
              <NavLink to={"/admin"} className="nav-link nav-item-custom mx-2">
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
                  <NavDropdown.Item className="dropdown-item-custom" onClick={() => setShowModalProfile(true)}>
                    {t("header.setting.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdown-item-custom" onClick={() => handleLogOut()}>
                    {t("header.setting.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Languages />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={showModalProfile} setShow={setShowModalProfile} />
    </>
  );
};
export default Header;
