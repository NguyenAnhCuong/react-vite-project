import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeleteUser } from "../../../utils/api/ApiServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ModalDeleteUser = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let res = await DeleteUser(dataDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      // await props.fetchListUser();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("admin.manageuser.modal.delete.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.manageuser.modal.delete.text")}.Email=
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.manageuser.modal.delete.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            {t("admin.manageuser.modal.delete.btn.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
