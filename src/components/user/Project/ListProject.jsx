import { useNavigate } from "react-router-dom";

const ListProject = (props) => {
  const { listProject } = props;
  const navigate = useNavigate();

  return (
    <>
      <table className="table table-hover table-bordered my-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Start date</th>
            <th scope="col">End date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listProject &&
            listProject.length > 0 &&
            listProject.map((project, index) => {
              return (
                <tr key={`project-${index + 1}`}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.start_date}</td>
                  <td>{project.end_date}</td>
                  <td>
                    <button
                      className="btn btn-info mx-2"
                      onClick={() => {
                        navigate("/task", { state: { project } });
                      }}
                    >
                      View List Task
                    </button>
                    <button className="btn btn-warning mx-2" onClick={() => {}}>
                      Update
                    </button>
                    <button className="btn btn-danger mx-2" onClick={() => {}}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listProject && listProject.length === 0 && (
            <tr>
              <td colSpan={"5"}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default ListProject;
