const ListProject = (props) => {
  const { listProject } = props;

  return (
    <>
      <table className="table table-hover table-bordered my-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
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
                  <td>{project.email}</td>
                  <td>{project.password}</td>
                  <td>{project.role}</td>
                  <td>
                    <button className="btn btn-info mx-2" onClick={() => {}}>
                      View
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
