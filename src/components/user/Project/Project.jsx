import "./Project.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { CiSearch, CiShare2 } from "react-icons/ci";
import { VscFeedback } from "react-icons/vsc";
import ListProject from "./ListProject";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { getListProject } from "../../utils/api/projectServices";
import ModalAddNewProject from "./Modal/ModalAddNewProject";
import ModalDelete from "./Modal/ModalDelete";
import ModalUpdateProject from "./Modal/ModalUpdate";

const Project = (props) => {
  const [listProject, setListProject] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [showModalAddNew, setShowModalAddNew] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  useEffect(() => {
    fetchListProject();
  }, []);

  const fetchListProject = async () => {
    let res = await getListProject();
    if (res && res.EC === 0) {
      setListProject(res.data);
    }
  };

  const handleShowModalUpdate = (project) => {
    setDataUpdate(project);
    setShowModalUpdate(true);
  };

  const handleShowModalDelete = (project) => {
    setDataDelete(project);
    setShowModalDelete(true);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  return (
    <div className="manage-project">
      <div className="header">
        <div className="title">Project List</div>
        <div className="feedback">
          <VscFeedback size={"1.3rem"} />
          <span style={{ marginLeft: "5px" }}>Feedback</span>
        </div>
      </div>
      <div className="menu-list">
        <div>
          <Row>
            <Col>
              <div className="search-box">
                <Form className="box d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search list"
                    className="me-2 search-input"
                    aria-label="Search"
                    style={{ width: "280px" }}
                  />
                  <CiSearch className="search-icon" size={"1.1rem"} />
                </Form>
              </div>
            </Col>
          </Row>
        </div>
        <div className="d-flex gap-2">
          <div className="add-new-project">
            <button
              className="btn btn-success"
              onClick={() => setShowModalAddNew(true)}
            >
              <FcPlus size={"1.5rem"} />
              <span style={{ marginLeft: "5px" }}>Add new project</span>
            </button>
          </div>
          <div className="share">
            <CiShare2 size={"1.3rem"} />
            <span style={{ marginLeft: "5px" }}>Share</span>
          </div>
        </div>
      </div>
      <div className="project-table">
        <ListProject
          listProject={listProject}
          handleShowModalDelete={handleShowModalDelete}
          handleShowModalUpdate={handleShowModalUpdate}
        />
      </div>
      <ModalAddNewProject
        show={showModalAddNew}
        setShow={setShowModalAddNew}
        fetchListProject={fetchListProject}
      />
      <ModalUpdateProject
        show={showModalUpdate}
        setShow={setShowModalUpdate}
        fetchListProject={fetchListProject}
        dataUpdate={dataUpdate}
        resetDataUpdate={resetDataUpdate}
      />
      <ModalDelete
        show={showModalDelete}
        setShow={setShowModalDelete}
        fetchListProject={fetchListProject}
        dataDelete={dataDelete}
      />
    </div>
  );
};
export default Project;
