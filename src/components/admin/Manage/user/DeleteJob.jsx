import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  deleteJob,
  getAllJob,
  getJobById,
} from "../../../utils/api/ApiServices";
import Select from "react-select";
import { toast } from "react-toastify";

const DeleteJob = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [listJob, setListJob] = useState([]);
  const [selectJob, setSelectedJob] = useState("");

  useEffect(() => {
    fetchListJob();
  }, []);

  useEffect(() => {
    fetchJob();
  }, [selectJob]);

  const handleClose = () => {
    setShow(false);
    setJobTitle("");
    setJobDescription("");
    setSalary("");
    setDeadline("");
    setSelectedJob("");
  };

  const fetchListJob = async () => {
    const res = await getAllJob();
    if (res && res.data.ec === 0) {
      console.log(res.data.dt);
      let newUser = res.data.dt.map((item) => {
        return {
          value: item.jobId,
          label: `${item.jobId}-${item.jobTitle}-companyId ${item.companyId}`,
        };
      });
      setListJob(newUser);
    } else {
      return;
    }
  };

  const fetchJob = async () => {
    const res = await getJobById(selectJob.value);
    if (res && res.data.ec === 0) {
      setJobTitle(res.data.dt.jobTitle);
      setJobDescription(res.data.dt.jobDescription);
      setSalary(res.data.dt.salary);
      setDeadline(res.data.dt.deadline);
    } else {
      return;
    }
  };

  const handleDeleteJob = async () => {
    const res = await deleteJob(selectJob.value);
    if (res && res.data.ec === 0) {
      toast.success(res.data.em);
      handleClose();
      fetchListJob();
    } else {
      toast.error(res.data.em);
      return;
    }
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ margin: "10px 20px" }}
        onClick={handleShow}
      >
        Delete Job
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group col-8">
              <label>Job</label>
              <Select
                value={selectJob}
                onChange={setSelectedJob}
                options={listJob}
              />
            </div>
            <div className="d-flex gap-5">
              <div className="form-group col-8">
                <label>Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
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
                  rows="4"
                  cols="50"
                />
              </div>
            </div>
            <div className="d-flex gap-3">
              <div className="form-group col-5">
                <label>Deadline</label>
                <input
                  type="datetime-local"
                  placeholder="yyyy/mm/dd"
                  className="form-control"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="form-group col-5">
                <label>Job Salary</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteJob()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteJob;
