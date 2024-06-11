import { useEffect, useState } from "react";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import ModalCreateCompany from "./ModalCreateCompany";
import ListCompany from "./ListCompany";
import { getListCompany } from "../../../utils/api/ApiServices";
import ModalViewCompany from "./ModalViewCompany";
import ModalDeleteCompany from "./ModalDeleteCompany";
import ModalUpdateCompany from "./ModalUpdateCompany";

const ManageCompany = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listCompany, setListCompany] = useState([]);
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpadte, setShowModalUpdate] = useState(false);

  useEffect(() => {
    fetchListCompany();
  }, []);

  const fetchListCompany = async () => {
    const res = await getListCompany();
    if (res && res.data && res.data.ec === 0) {
      setListCompany(res.data.dt);
    }
  };

  const handleCloseModalCreateUser = (value) => {
    setShowModalCreateUser(value);
  };

  const handleViewCompany = (company) => {
    setShowModalView(true);
    setDataView(company);
  };
  const handleUpdateCompany = (company) => {
    setShowModalUpdate(true);
    setDataUpdate(company);
  };
  const handleDeleteCompany = (company) => {
    setShowModalDelete(true);
    setDataDelete(company);
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
          <ListCompany
            fetchListCompany={fetchListCompany}
            listCompany={listCompany}
            handleViewCompany={handleViewCompany}
            handleDeleteCompany={handleDeleteCompany}
            handleUpdateCompany={handleUpdateCompany}
          />
        </div>
        <ModalCreateCompany
          fetchListCompany={fetchListCompany}
          show={showModalCreateUser}
          // setShow={setShowModalCreateUser}
          setShow={handleCloseModalCreateUser}
        />
        <ModalViewCompany
          show={showModalView}
          setShow={setShowModalView}
          dataCompany={dataView}
        />
        <ModalUpdateCompany
          fetchListCompany={fetchListCompany}
          dataCompany={dataUpdate}
          show={showModalUpadte}
          setShow={setShowModalUpdate}
        />
        <ModalDeleteCompany
          fetchListCompany={fetchListCompany}
          show={showModalDelete}
          setShow={setShowModalDelete}
          dataCompany={dataDelete}
        />
      </div>
    </div>
  );
};
export default ManageCompany;
