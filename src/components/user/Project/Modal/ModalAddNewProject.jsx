import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewProject } from "../../../utils/api/projectServices";

const ModalAddNewProject = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmitCreateProject = async () => {
    const res = await postCreateNewProject(
      name,
      description,
      startDate,
      endDate
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchListProject();
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
          <Modal.Title>Modal Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>Start Date</label>
                <input
                  type="date"
                  placeholder=""
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group col-5">
                <label>End Date</label>
                <input
                  type="date"
                  placeholder=""
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group col-12 mt-4">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateProject()}>
            Create New
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddNewProject;
