import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateProject } from "../../../utils/api/projectServices";
import _ from "lodash";

const ModalUpdateProject = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    props.resetDataUpdate();
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name || "");
      setDescription(dataUpdate.description || "");
      setStartDate(
        dataUpdate.start_date || new Date().toISOString().split("T")[0]
      );
      setEndDate(dataUpdate.end_date || new Date().toISOString().split("T")[0]);
    }
  }, [dataUpdate]);

  const handleSubmitUpdateProject = async () => {
    const res = await putUpdateProject(
      dataUpdate.id,
      name,
      description,
      startDate,
      endDate
    );
    console.log(dataUpdate);
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
          <Modal.Title>Modal Update Project</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSubmitUpdateProject()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateProject;
