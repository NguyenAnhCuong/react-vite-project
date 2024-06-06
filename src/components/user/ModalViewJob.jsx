import _ from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";

const ModalViewJob = (props) => {
  const { show, setShow, jobData } = props;
  // const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setJobTitle("");
    setJobDescription("");
    setSalary("");
    setDeadline("");
    props.resetJobData();
  };

  useEffect(() => {
    if (_.isEmpty(!jobData)) {
      setJobTitle(jobData.jobTitle);
      setJobDescription(jobData.jobDescription);
      setDeadline(jobData.deadline);
      setSalary(jobData.salary);
    }
  }, [jobData]);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        className="modal-view-job"
        show={show}
        onHide={handleClose}
        size="xxl"
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Job Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="d-flex gap-5">
              <div class="form-group col-8">
                <label>Job Title</label>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="">
              <div className="form-group col-12">
                <label>Job Description</label>
                <textarea
                  placeholder="Enter Job Description"
                  className="form-control"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled
                  rows="4"
                  cols="50"
                />
              </div>
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-5">
                <label>Deadline</label>
                <input
                  type="text"
                  placeholder="Enter UserName"
                  className="form-control"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  disabled
                />
              </div>
              <div className="form-group col-5">
                <label>Job Salary</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Password"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  disabled
                />
              </div>
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
export default ModalViewJob;
