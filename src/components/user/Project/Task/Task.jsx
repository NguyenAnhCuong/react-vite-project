import { FaTrashAlt, FaPen } from "react-icons/fa";

const Task = (props) => {
  const { dataTask, editing } = props;

  return (
    <>
      <div className="l-child">
        <div className="title">To Do</div>
        <div className="content">
          {dataTask &&
            dataTask.length > 0 &&
            dataTask.map((task, index) => {
              if (task.status === "pending") {
                return (
                  <div className="task-child" key={`task-${index + 1}`}>
                    <span
                      className="t-name"
                      onClick={() => props.handleViewTask(task)}
                    >
                      {task.name}
                    </span>
                    <span
                      onClick={() => {
                        props.handleDeleteTask(task);
                      }}
                    >
                      <FaTrashAlt className="trash-icon" size={"1.2rem"} />
                    </span>
                    <span onClick={() => props.handleUpdateTask(task)}>
                      <FaPen size={"1.2rem"} className="pen-icon" />
                    </span>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="l-child">
        <div className="title">In progress</div>
        <div className="content">
          {dataTask &&
            dataTask.length > 0 &&
            dataTask.map((task, index) => {
              if (task.status === "in_progress") {
                return (
                  <div className="task-child" key={`task-${index + 1}`}>
                    <span
                      className="t-name"
                      onClick={() => props.handleViewTask(task)}
                    >
                      {task.name}
                    </span>
                    <span
                      onClick={() => {
                        props.handleDeleteTask(task);
                      }}
                    >
                      <FaTrashAlt className="trash-icon" size={"1.2rem"} />
                    </span>
                    <span onClick={() => props.handleUpdateTask(task)}>
                      <FaPen size={"1.2rem"} className="pen-icon" />
                    </span>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div className="l-child">
        <div className="title">Dones</div>
        <div className="content">
          {dataTask &&
            dataTask.length > 0 &&
            dataTask.map((task, index) => {
              if (task.status === "completed") {
                return (
                  <div className="task-child" key={`task-${index + 1}`}>
                    <span
                      className="t-name"
                      onClick={() => props.handleViewTask(task)}
                    >
                      {task.name}
                    </span>
                    <span
                      onClick={() => {
                        props.handleDeleteTask(task);
                      }}
                    >
                      <FaTrashAlt className="trash-icon" size={"1.2rem"} />
                    </span>
                    <span onClick={() => props.handleUpdateTask(task)}>
                      <FaPen size={"1.2rem"} className="pen-icon" />
                    </span>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};
export default Task;
