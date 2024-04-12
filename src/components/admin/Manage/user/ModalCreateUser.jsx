import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { postCreateNewUser } from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalCreateUser = (props) => {
  const { t } = useTranslation();
  const { show, setShow } = props;
  // const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setImage("");
    setRole("USER");
    setUsername("");
    setPreviewImg("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitCreateUser = async () => {
    //validate
    //api

    const res = await postCreateNewUser(email, password, username, role, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      // await props.fetchListUser();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manageuser.modal.create.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div class="form-group col-5">
                <label>{t("admin.manageuser.modal.create.email")}</label>
                <input
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder={t(
                    "admin.manageuser.modal.create.placeholder.email"
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-group col-5">
                <label>{t("admin.manageuser.modal.create.password")}</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder={t(
                    "admin.manageuser.modal.create.placeholder.password"
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>{t("admin.manageuser.modal.create.username")}</label>
                <input
                  type="text"
                  placeholder={t(
                    "admin.manageuser.modal.create.placeholder.username"
                  )}
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div class="form-group col-5">
                <label>{t("admin.manageuser.modal.create.role.title")}</label>
                <select
                  class="form-select"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">
                    {t("admin.manageuser.modal.create.role.user")}
                  </option>
                  <option value={"ADMIN"}>
                    {t("admin.manageuser.modal.create.role.admin")}
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group col-12 mt-2">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                {t("admin.manageuser.modal.create.uploadImage")}
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUpload(e)}
              />
            </div>
            <div className="form-group col-12 mt-2 img-preview">
              {previewImg ? (
                <img src={previewImg} />
              ) : (
                <span>{t("admin.manageuser.modal.create.preview")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.manageuser.modal.create.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            {t("admin.manageuser.modal.create.btn.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalCreateUser;
