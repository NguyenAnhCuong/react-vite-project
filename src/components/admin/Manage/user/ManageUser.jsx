import { useEffect, useState } from "react";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import ListUser from "./ListUser";
import { FcPlus } from "react-icons/fc";
import {
  getAllUser,
  getUserWithPaginate,
} from "../../../utils/api/ApiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ListUserPaginate from "./ListUserPaginate";
import { useTranslation } from "react-i18next";

const ManageUser = (props) => {
  const { t } = useTranslation();
  const LIMIT_USER = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const handleCloseModalCreateUser = (value) => {
    setShowModalCreateUser(value);
  };

  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1);
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  return (
    <div className="manageuser-container">
      <div className="title">{t("admin.manageuser.title")}</div>
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
            {t("admin.manageuser.btnAddNew")}
          </button>
        </div>

        <div className="table-user container-fluid">
          {/* <ListUser
            handleClickDeleteUser={handleClickDeleteUser}
            handleClickUpdateUser={handleClickUpdateUser}
            listUser={listUser}
            setListUser={setListUser}
          /> */}
          <ListUserPaginate
            handleClickDeleteUser={handleClickDeleteUser}
            handleClickUpdateUser={handleClickUpdateUser}
            listUser={listUser}
            pageCount={pageCount}
            setListUser={setListUser}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          // setShow={setShowModalCreateUser}
          setShow={handleCloseModalCreateUser}
          fetchListUser={fetchListUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resetDataUpdate={resetDataUpdate}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
        />
      </div>
    </div>
  );
};
export default ManageUser;
