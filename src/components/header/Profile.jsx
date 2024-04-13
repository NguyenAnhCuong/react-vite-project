import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import UserInfo from "./Profile/UserInfo";
import ChangePassword from "./Profile/ChangePassword";
import History from "./Profile/History";

const Profile = (props) => {
  const { show, setShow } = props;
  const { t } = useTranslation();
  const [key, setKey] = useState("home");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.profile.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="home" title={t("modal.profile.userInfo")}>
              <UserInfo handleClose={handleClose} />
            </Tab>
            <Tab eventKey="password" title={t("modal.profile.changePass")}>
              <ChangePassword handleClose={handleClose} />
            </Tab>
            <Tab eventKey="history" title={t("modal.profile.history")}>
              <History handleClose={handleClose} />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
