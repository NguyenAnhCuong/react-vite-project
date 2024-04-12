import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../utils/api/ApiServices";
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = (props) => {
  const { t } = useTranslation();
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteQuiz = async () => {
    let res = await deleteQuizForAdmin(dataDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props.fetchListQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t("admin.managequiz.listquiz.modal.delete.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("admin.managequiz.listquiz.modal.delete.text")}.Name=
          <b>{dataDelete && dataDelete.name ? dataDelete.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("admin.managequiz.listquiz.modal.delete.btn.close")}
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            {t("admin.managequiz.listquiz.modal.delete.btn.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
