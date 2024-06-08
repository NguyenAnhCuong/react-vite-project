import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getListCompany, postJob } from "../../../utils/api/ApiServices";
import Select from "react-select";
import { toast } from "react-toastify";

const UpdateJob = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [listCompany, setListCompany] = useState([]);
  const [selectCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetchListCompany();
  }, []);

  const handleClose = () => {
    setShow(false);
    setJobTitle("");
    setJobDescription("");
    setSalary("");
    setDeadline("");
  };

  const fetchListCompany = async () => {
    const res = await getListCompany();
    if (res && res.data.ec === 0) {
      console.log(res.data.dt);
      let newUser = res.data.dt.map((item) => {
        return {
          value: item.companyId,
          label: `${item.companyId}-${item.companyName}`,
        };
      });
      setListCompany(newUser);
    } else {
      return;
    }
  };

  const handlePostJob = async () => {
    const res = await postJob(
      jobTitle,
      jobDescription,
      salary,
      deadline,
      selectCompany.value
    );
    if (res && res.data.ec === 0) {
      toast.success(res.data.em);
      handleClose();
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
        Add New Job
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
              <div className="form-group col-4">
                <label>Deadline</label>
                <input
                  type="datetime-local"
                  placeholder="yyyy/mm/dd"
                  className="form-control"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="form-group col-4">
                <label>Job Salary</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="form-group col-3">
                <label>Company</label>
                <Select
                  value={selectCompany}
                  onChange={setSelectedCompany}
                  options={listCompany}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlePostJob()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default UpdateJob;
