import { useState } from "react";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import ModalCreateCompany from "./ModalCreateCompany";
import ListCompany from "./ListCompany";

const ManageCompany = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const handleCloseModalCreateUser = (value) => {
    setShowModalCreateUser(value);
  };

  return (
    <div className="manageuser-container">
      <div className="title">Manage Company</div>
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
            Add New Company
          </button>
        </div>

        <div className="table-user container-fluid">
          <ListCompany />
        </div>
        <ModalCreateCompany
          show={showModalCreateUser}
          // setShow={setShowModalCreateUser}
          setShow={handleCloseModalCreateUser}
        />
      </div>
    </div>
  );
};
export default ManageCompany;
