import { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="manageuser-container">
      <div className="title">Manage User</div>
      <div className="btn-add-new-user">
        <button className="btn btn-primary" onClick={() => setShow(true)}>
          Add New User
        </button>
      </div>

      <div className="table-user container-fluid">
        <table className="table table-hover table-bordered mx-3 my-3 w-100">
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
              <td>Mark</td>
              <td>123456</td>
              <td>User</td>
              <td>
                <button className="btn btn-info">View</button>
                <button className="btn btn-warning">Update</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <ModalCreateUser setShow={setShow} show={show} />
      </div>
    </div>
  );
};
export default ManageUser;
