import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ListTask.scss";
import _ from "lodash";
import ModalCreateTask from "../Modal/ModalCreateTask";
import { getListTask } from "../../../utils/api/taskServices";
import Task from "./Task";

const ListTask = (props) => {
  const location = useLocation();
  const { project } = location.state;

  const [dataTask, setDataTask] = useState([]);
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);

  useEffect(() => {
    fetchListTask();
  }, [project]);

  const fetchListTask = async () => {
    let res = await getListTask(project.id);
    if (res && res.EC === 0) {
      setDataTask(res.data);
    }
  };

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
      <div className="mt-5">
        <button
          className="btn btn-success"
          onClick={() => {
            setShowModalCreateTask(true);
          }}
        >
          Add New Task
        </button>
      </div>
      <div className="task-list mt-3">
        <Task dataTask={dataTask} />
      </div>
      <ModalCreateTask
        open={showModalCreateTask}
        setOpen={setShowModalCreateTask}
        projectId={project.id}
        fetchListTask={fetchListTask}
      />
    </div>
  );
};
export default ListTask;
