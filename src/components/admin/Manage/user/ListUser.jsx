const ListUser = (props) => {
  return (
    <>
      <table className="table table-hover table-bordered mx-3 my-3">
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
          <tr>
            <td>1</td>
            <td>Mark@gmail.com</td>
            <td>123456</td>
            <td>User</td>
            <td>
              <button className="btn btn-info mx-2">View</button>
              <button className="btn btn-warning mx-2">Update</button>
              <button className="btn btn-danger mx-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default ListUser;
