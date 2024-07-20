import { useEffect, useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import ListUser from "./ListUser";
import { FcPlus } from "react-icons/fc";
import { getAllListUserPaginate } from "../../../utils/api/userServices";
import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
  const limit = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  useEffect(() => {
    fetchListUser(1);
  }, []);

  const fetchListUser = async (page) => {
    let res = await getAllListUserPaginate(limit, page);
    if (res && res.EC === 0) {
      setListUser(res.data);
      setPageCount(res.totalPages);
    } else {
      return;
    }
  };

  const handleCloseModalCreateUser = (value) => {
    setShowModalCreateUser(value);
  };

  const handleShowModalUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
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
          <ListUser
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            fetchListUser={fetchListUser}
            listUser={listUser}
            handleShowModalUpdateUser={handleShowModalUpdateUser}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={handleCloseModalCreateUser}
          fetchListUser={fetchListUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUser={fetchListUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resetDataUpdate={resetDataUpdate}
        />
      </div>
    </div>
  );
};
export default ManageUser;
