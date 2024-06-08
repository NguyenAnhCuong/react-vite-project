import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

const ModalViewCompany = (props) => {
  const { show, setShow, dataCompany } = props;

  const handleClose = () => {
    setShow(false);
    setCompanyName("");
    setCompanyDescription("");
    setLocation("");
    setCompanyPhone("");
    setImage(null);
    setPreviewImg("");
  };

  useEffect(() => {
    if (!_.isEmpty(dataCompany)) {
      setCompanyName(dataCompany.companyName || "");
      setCompanyDescription(dataCompany.companyDescription || "");
      setLocation(dataCompany.location || "");
      setCompanyPhone(dataCompany.companyPhone || "");
      if (dataCompany.logo) {
        setPreviewImg(dataCompany.logo);
      }
    }
  }, [dataCompany]);

  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div className="form-group col-8">
                <label>Company Name</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="my-1">
              <div className="form-group col-12">
                <label>Company Description</label>
                <textarea
                  disabled
                  placeholder="Enter Company Description"
                  className="form-control"
                  value={companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  rows="4"
                  cols="50"
                />
              </div>
            </div>
            <div className="d-flex gap-5 my-1">
              <div className="form-group col-5">
                <label>Company Phone</label>
                <input
                  disabled
                  type="number"
                  placeholder="Enter Phone"
                  className="form-control"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
              <div className="form-group col-5">
                <label>Location</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-12 my-3">
              <label className="form-label label-upload" htmlFor="uploadImage">
                <FcPlus />
                Upload Image
              </label>
              <input
                disabled
                type="file"
                hidden
                id="uploadImage"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImg ? (
                <img src={previewImg} alt="Preview" />
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
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalViewCompany;
