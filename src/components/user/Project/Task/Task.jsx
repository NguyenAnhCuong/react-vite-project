const Task = (props) => {
  const { dataTask } = props;

  return (
    <>
      <div className="l-child">
        <div className="title">To Do</div>
        <div className="content"></div>
      </div>
      <div className="l-child">
        <div className="title">In progress</div>
        <div className="content"></div>
      </div>
      <div className="l-child">
        <div className="title">Dones</div>
        <div className="content"></div>
      </div>
    </>
  );
};
export default Task;
