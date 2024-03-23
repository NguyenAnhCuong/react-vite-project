import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { UpdateUser, postCreateNewUser } from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;
  // const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setImage("");
    setRole("USER");
    setUsername("");
    setPreviewImg("");
    props.resetDataUpdate();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setImage("");
      setRole(dataUpdate.role);
      setUsername(dataUpdate.username);
      if (dataUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitCreateUser = async () => {
    //validate
    //api

    const res = await UpdateUser(dataUpdate.id, username, role, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchListUser();
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
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div class="form-group col-5">
                <label>Email address</label>
                <input
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-group col-5">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  value={password}
                  disabled
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>UserName</label>
                <input
                  type="text"
                  placeholder="Enter UserName"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div class="form-group col-5">
                <label>Role</label>
                <select
                  class="form-select"
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
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
