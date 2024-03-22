import { useState } from "react";

const ListUser = (props) => {
  const { listUser, setListUser } = props;

  return (
    <>
      <table className="table table-hover table-bordered mx-3 my-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-info mx-2">View</button>
                    <button className="btn btn-warning mx-2">Update</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser === 0 && (
            <tr>
              <td colSpan={"5"}>Not Found Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default ListUser;
