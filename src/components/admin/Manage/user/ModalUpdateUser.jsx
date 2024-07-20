import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { postUpdateUser } from "../../../utils/api/userServices";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setImage("");
    setRole("USER");
    setName("");
    setPreviewImg("");
    props.resetDataUpdate();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setImage("");
      setRole(dataUpdate.role);
      setName(dataUpdate.name);
      if (dataUpdate.image) {
        setPreviewImg(`${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitUpdateUser = async () => {
    const res = await postUpdateUser(dataUpdate.id, name, email, image, role);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchListUser(props.currentPage);
    } else {
      toast.error(res.error);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group col-5">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group col-5">
                <label>Role</label>
                <select
                  value={role}
                  className="form-select"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value={"ADMIN"}>ADMIN</option>
                </select>
              </div>
            </div>
            <div className="form-group col-12 mt-2">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
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
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
