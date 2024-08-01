import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ListTask.scss";
import _ from "lodash";
import ModalCreateTask from "../Modal/ModalCreateTask";
import { getListTask } from "../../../utils/api/taskServices";
import Task from "./Task";
import ModalUpdateTask from "../Modal/ModalUpdateTask";
import ModalDeleteTask from "../Modal/ModalDeleteTask";
import ViewTask from "../Modal/ViewTask";

const ListTask = (props) => {
  const location = useLocation();
  const { project } = location.state;

  const [dataTask, setDataTask] = useState([]);
  const [viewTask, setViewTask] = useState({});
  const [updateTask, setUpdateTask] = useState({});
  const [deleteTask, setDeleteTask] = useState({});
  const [showModalViewTask, setShowModalViewTask] = useState(false);
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalUpdateTask, setShowModalUpdateTask] = useState(false);
  const [showModalDeleteTask, setShowModalDeleteTask] = useState(false);

  useEffect(() => {
    fetchListTask();
  }, [project]);

  const fetchListTask = async () => {
    let res = await getListTask(project.id);
    if (res && res.EC === 0) {
      setDataTask(res.data);
    }
  };

  const handleUpdateTask = (task) => {
    setUpdateTask(task);
    setShowModalUpdateTask(true);
  };

  const handleDeleteTask = (task) => {
    setDeleteTask(task);
    setShowModalDeleteTask(true);
  };

  const handleViewTask = (task) => {
    setViewTask(task);
    setShowModalViewTask(true);
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
        <Task
          dataTask={dataTask}
          handleViewTask={handleViewTask}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
      <ModalCreateTask
        open={showModalCreateTask}
        setOpen={setShowModalCreateTask}
        projectId={project.id}
        fetchListTask={fetchListTask}
      />
      <ModalUpdateTask
        dataUpdateTask={updateTask}
        open={showModalUpdateTask}
        setOpen={setShowModalUpdateTask}
        projectId={project.id}
        fetchListTask={fetchListTask}
      />
      <ModalDeleteTask
        dataDeleteTask={deleteTask}
        open={showModalDeleteTask}
        setOpen={setShowModalDeleteTask}
        projectId={project.id}
        fetchListTask={fetchListTask}
      />
      <ViewTask
        open={showModalViewTask}
        setOpen={setShowModalViewTask}
        dataViewTask={viewTask}
      />
    </div>
  );
};
export default ListTask;
