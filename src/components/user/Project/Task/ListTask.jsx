import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ListTask.scss";
import _ from "lodash";

const ListTask = (props) => {
  const location = useLocation();
  const { project } = location.state;

  const [dataProject, setDataProject] = useState({});

  // useEffect(() => {
  //   if (!_.isEmpty(project)) {
  //     setDataProject(project);
  //   }
  // }, [project]);

  return (
    <div className="task-container my-3">
      <div className="project-title">
        <span>Project: {project.name}</span>
      </div>
      <div className="project-description">
        <label>Description</label>
        <textarea
          className="form-control"
          value={project.description}
          disabled
        />
      </div>
      <div className="task-list mt-5">
        <div className="l-child">
          <div className="title">To Do</div>
          <div></div>
        </div>
        <div className="l-child">
          <div className="title">In progress</div>
          <div></div>
        </div>
        <div className="l-child">
          <div className="title">Dones</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default ListTask;
