import { useLocation } from "react-router-dom";

const ListTask = (props) => {
  const location = useLocation();
  const { project } = location.state;

  return <div>task</div>;
};
export default ListTask;
