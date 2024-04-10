import NavDropdown from "react-bootstrap/NavDropdown";

const Languages = (props) => {
  return (
    <>
      <NavDropdown
        className="mx-3 languages"
        title="Languages"
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Languages;
