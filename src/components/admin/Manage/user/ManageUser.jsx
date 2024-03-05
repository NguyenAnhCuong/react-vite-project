import { useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import ListUser from "./ListUser";
import { FcPlus } from "react-icons/fc";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const handleCloseModalCreateUser = (value) => {
    setShowModalCreateUser(value);
  };

  return (
    <div className="manageuser-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new-user">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus
              style={{ margin: "2px", marginRight: "5px" }}
              size={"1.1rem"}
            />
            Add New User
          </button>
        </div>

        <div className="table-user container-fluid">
          <ListUser />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          // setShow={setShowModalCreateUser}
          setShow={handleCloseModalCreateUser}
        />
      </div>
    </div>
  );
};
export default ManageUser;
